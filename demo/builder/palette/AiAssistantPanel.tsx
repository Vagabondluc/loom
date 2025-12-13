import React, { useState } from 'react';
import { Button, TextArea, Alert } from '../../../ui';
import { Sparkles, AlertTriangle } from 'lucide-react';
import { useBuilderStore } from '../store';
import { useToastStore } from '../../../stores/toastStore';
import { ai } from '../../../services/ai';
import { buildSystemPrompt } from '../../../services/promptBuilder';
import { aiActionsResponseSchema } from '../../../services/aiActionSchema';
import { Type as GenAiType } from '@google/genai';

export const AiAssistantPanel: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { nodes, rootNodeId, applyAiActions } = useBuilderStore(s => ({ 
      nodes: s.nodes, 
      rootNodeId: s.rootNodeId,
      applyAiActions: s.applyAiActions
  }));

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const systemInstruction = buildSystemPrompt(nodes, rootNodeId);

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `User Request: "${prompt}"`,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: GenAiType.ARRAY,
            items: {
                type: GenAiType.OBJECT,
                properties: {
                    action: { type: GenAiType.STRING },
                    nodeId: { type: GenAiType.STRING },
                    parentId: { type: GenAiType.STRING },
                    newParentId: { type: GenAiType.STRING },
                    index: { type: GenAiType.INTEGER },
                    updates: {
                        type: GenAiType.OBJECT,
                        properties: {
                            label: { type: GenAiType.STRING },
                            className: { type: GenAiType.STRING }
                        }
                    },
                    component: {
                        type: GenAiType.OBJECT,
                        properties: {
                            type: { type: GenAiType.STRING },
                            data: {
                                type: GenAiType.OBJECT,
                                properties: {
                                    label: { type: GenAiType.STRING },
                                    className: { type: GenAiType.STRING }
                                }
                            }
                        }
                    }
                }
            }
          }
        },
      });

      const jsonText = response.text.trim();
      const parsedJson = JSON.parse(jsonText);
      const validationResult = aiActionsResponseSchema.safeParse(parsedJson);

      if (validationResult.success) {
        applyAiActions(validationResult.data);
        useToastStore.getState().addToast({ message: "AI changes applied!", type: 'success' });
        setPrompt('');
      } else {
        console.error("AI Response Validation Error:", validationResult.error);
        setError(`AI returned an invalid action format. Details: ${validationResult.error.message}`);
      }
    } catch (e: any) {
      console.error("AI Generation Error:", e);
      setError(e.message || "An unknown error occurred while contacting the AI.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-t border-base-300 p-4 bg-base-200">
      <div className="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="checkbox" /> 
        <div className="collapse-title text-sm font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            AI Assistant
        </div>
        <div className="collapse-content">
          <div className="space-y-2">
            <TextArea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., 'Change the button text to Click Me and make it blue'"
              className="textarea-sm text-xs"
              rows={3}
              disabled={isLoading}
            />
            {error && (
              <Alert variant="error" className="text-xs p-2 gap-1" icon={<AlertTriangle className="w-4 h-4" />}>
                {error}
              </Alert>
            )}
            <Button
              size="sm"
              variant="primary"
              className="w-full"
              onClick={handleGenerate}
              loading={isLoading}
            >
              Generate Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
