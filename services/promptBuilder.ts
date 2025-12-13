
import { BuilderNode } from '../types';

const serializeNode = (
  nodeId: string, 
  nodes: Record<string, BuilderNode>, 
  indentLevel: number
): string => {
  const node = nodes[nodeId];
  if (!node) return '';

  const indent = '  '.repeat(indentLevel);
  const props: string[] = [];
  
  if (node.data.label) {
    props.push(`label="${node.data.label.replace(/"/g, "'")}"`);
  }
  if (node.data.className) {
    props.push(`className="${node.data.className}"`);
  }
  
  const propsString = props.length > 0 ? ' ' + props.join(' ') : '';

  if (node.children.length === 0) {
    return `${indent}<${node.type}${propsString} />`;
  }

  const childrenString = node.children
    .map(childId => serializeNode(childId, nodes, indentLevel + 1))
    .join('\n');

  return `${indent}<${node.type}${propsString}>\n${childrenString}\n${indent}</${node.type}>`;
};

export const buildSystemPrompt = (
  nodes: Record<string, BuilderNode>, 
  rootId: string
): string => {
  const serializedTree = serializeNode(rootId, nodes, 0);

  const prompt = `
You are an expert web developer specializing in Tailwind CSS and DaisyUI.
Your task is to modify a web page structure based on a user's request.
The current page structure is represented by this simplified component tree:

\`\`\`xml
${serializedTree}
\`\`\`

The user will provide a request to change this structure.
You must respond with a JSON object containing an array of actions.
The available actions are: 'UPDATE_NODE', 'ADD_NODE', 'MOVE_NODE', 'DELETE_NODE'.

**Action Format:**

- **UPDATE_NODE**: Modify a node's data (e.g., its label or className).
  \`{ "action": "UPDATE_NODE", "nodeId": "node-id-to-update", "updates": { "label": "New Text", "className": "new-classes" } }\`

- **ADD_NODE**: Add a new component as a child of another.
  \`{ "action": "ADD_NODE", "parentId": "parent-node-id", "component": { "type": "btn", "data": { "label": "Click Me" } } }\`

- **MOVE_NODE**: Move an existing node to a new parent.
  \`{ "action": "MOVE_NODE", "nodeId": "node-id-to-move", "newParentId": "new-parent-id", "index": 0 }\`

- **DELETE_NODE**: Remove a node.
  \`{ "action": "DELETE_NODE", "nodeId": "node-id-to-delete" }\`

Also, ensure that any generated components adhere to static generation rules. Specifically, for 'Preline' components, only generate the static HTML structure with the necessary 'data-*' and 'hs-*' attributes. Do not generate <script> tags or any JavaScript for initialization.

Based on the user's request, provide a JSON array of these actions to achieve the desired change.
Only respond with the JSON array. Do not include any other text or explanation.
  `.trim();

  return prompt;
};

export interface ContentStrategy {
  textMode: 'realistic' | 'lorem' | 'headings' | 'empty';
  imageMode: 'none' | 'solid' | 'picsum' | 'custom';
}

export interface SectionConfig {
  [key: string]: any; // Loose typing for flexibility
}

interface WizardInput {
    pageType: string;
    visualStyle: string;
    description: string;
    sections: string[];
    sectionConfig: Record<string, SectionConfig>;
    contentStrategy: ContentStrategy;
}

export const buildTemplateWizardPrompt = (input: WizardInput, availableComponents: string[] = []): string => {
  const componentsList = availableComponents.length ? availableComponents.join(', ') : '';

    // Generate specific instructions based on Content Strategy
    let textInstructions = "";
    switch (input.contentStrategy.textMode) {
        case 'lorem':
            textInstructions = "For all paragraph text, use 'Lorem ipsum' generator text. Keep headings realistic and relevant to the page type.";
            break;
        case 'headings':
            textInstructions = "Generate realistic text for Headings only. Leave all paragraph/body text empty.";
            break;
        case 'empty':
            textInstructions = "Leave all text fields (labels) empty. Focus purely on structure.";
            break;
        case 'realistic':
        default:
            textInstructions = "Use realistic, context-aware placeholder text for all headings and paragraphs based on the Page Archetype.";
            break;
    }

    let imageInstructions = "";
    switch (input.contentStrategy.imageMode) {
        case 'none':
            imageInstructions = "Do NOT generate any 'image' or 'picsum' components. Use layout containers only.";
            break;
        case 'solid':
            imageInstructions = "Do NOT use image tags. Instead, use 'container' or 'div' components with Tailwind background color classes (e.g. bg-neutral, bg-primary/20) to represent image areas.";
            break;
        case 'picsum':
            imageInstructions = "For all images, use the 'picsum' component type. If that is not available, use 'image' type with src URL format 'https://picsum.photos/seed/{random_string}/800/600'.";
            break;
        case 'custom':
            imageInstructions = "For all images, use the 'image' component type with a standard placeholder URL like 'https://via.placeholder.com/800x600'.";
            break;
    }

    // Build Section-Specific Instructions
    const sectionInstructions = input.sections.map(section => {
        const config = input.sectionConfig[section] || {};
        let details = "";

        if (section === 'Hero') {
            if (config.layout === 'split') details += " Use a 2-column split layout (Text Left, Image Right).";
            if (config.layout === 'centered') details += " Use a centered layout with text and buttons in the middle.";
            if (config.image === 'none') details += " Do NOT include a large hero image.";
        }
        
        if (section === 'Feature Grid' || section === 'Features') {
            if (config.count) details += ` Generate exactly ${config.count} feature items/cards.`;
        }

        if (section === 'Footer') {
            if (config.style === 'simple') details += " Use a simple, single-row footer.";
            if (config.style === 'complex') details += " Use a multi-column footer with links.";
        }

        return `- **${section}**: Include this section.${details}`;
    }).join('\n');

    return `
You are an expert web developer and UI designer specializing in Tailwind CSS, DaisyUI, and modern web layouts.
Your task is to generate a complete webpage structure based on a user's high-level requirements.

**User Requirements:**
- **Page Type:** ${input.pageType}
- **Visual Style:** ${input.visualStyle}
- **Description:** ${input.description}

**Structure & Layout:**
The page MUST include the following sections, in this order:
${sectionInstructions}

**Content Strategy Instructions:**
- **Text:** ${textInstructions}
- **Images:** ${imageInstructions}

**Your Output MUST be a JSON object with the following structure:**
\`\`\`json
{
  "rootId": "root-node-id",
  "nodes": [
    {
      "id": "node-id-1",
      "type": "component-type",
      "data": { "label": "...", "className": "..." },
      "layout": { "mode": "flex", "direction": "col", "gap": 4 },
      "children": ["child-node-id-1"],
      "parentId": "parent-node-id"
    }
  ]
}
\`\`\`

**Instructions & Constraints:**
1.  The main container must have the ID "root". This will be your root node.
2.  Generate a unique, random string ID for every node (e.g., 'node-1a2b3c'). The 'root' node should also have a unique ID.
3.  Construct a full page layout based on the user's requirements, arranging the requested sections in a logical order.
4.  Use the following available component types: \`${componentsList}\`.
5.  Use DaisyUI and Tailwind CSS classes for styling.
6.  For layout, use the 'layout' property. For example, a flex container would be \`"layout": { "mode": "flex", "direction": "col", "gap": 4 }\`.
7.  The \`parentId\` for direct children of the root container should be the ID of the root node. For all other nodes, it should be the ID of their parent. The root node's \`parentId\` should be \`null\`.
8.  Ensure the generated structure is a valid tree (no circular dependencies, all children belong to a parent).
9.  Populate components with classes that match the requested visual style. For example, a 'Corporate' style should use clean lines and professional language. A 'Playful' style can use more rounded elements and vibrant colors.
10. Only respond with the JSON object. Do not include any other text, explanation, or markdown formatting.
    `.trim();
};
