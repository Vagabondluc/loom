
# @google/genai Coding Guidelines

This document outlines the guidelines for using the \`@google/genai\` library with React and TypeScript.

## General Principles

*   **Type Safety:** Adhere strictly to TypeScript type safety.
*   **Module Imports:** Use named imports at the top-level of modules. Avoid \`import type\` for enum values and \`const enum\`.
*   **Styling:** Use Tailwind CSS exclusively via CDN. No separate CSS files or CSS-in-JS.
*   **Responsive Design:** Implement mobile-first responsive design using Tailwind breakpoints. Ensure primary controls are sticky.
*   **React Best Practices:** Use functional components, hooks, and define helper components outside parent component bodies. Avoid \`ReactDOM.render\` (use \`createRoot\`).
*   **Error Handling:** Implement robust API error handling and graceful retry logic.
*   **API Key Management:** The API key (\`process.env.API_KEY\`) is externally managed. Do not prompt users for it or generate UI for its input.

## Library Naming

This library is sometimes called:
*   Google Gemini API
*   Google GenAI API
*   Google GenAI SDK
*   Gemini API
*   @google/genai

## Prohibited Imports & APIs

**Do NOT use or import the following deprecated APIs:**
*   \`GoogleGenerativeAI\` (Use \`GoogleGenAI\` instead)
*   \`google.generativeai\`
*   \`models.create\`
*   \`ai.models.create\`
*   \`models.getGenerativeModel\`
*   \`genAI.getGenerativeModel\`
*   \`ai.models.getModel\`
*   \`ai.models['model_name']\`
*   \`generationConfig\` (Use \`config\` instead)
*   \`GoogleGenAIError\`
*   \`GenerateContentRequest\` (Use \`GenerateContentParameters\` instead)
*   \`SchemaType\` (Use \`Type\` instead)

**Do NOT use deprecated models:**
*   \`gemini-1.5-flash\`
*   \`gemini-1.5-pro\`
*   \`gemini-pro\`

## Initialization

*   Always use \`const ai = new GoogleGenAI({apiKey: process.env.API_KEY});\`.
*   **Incorrect:** \`const ai = new GoogleGenAI(process.env.API_KEY);\`

## API Key

*   Obtain the API key **exclusively** from \`process.env.API_KEY\`.
*   Use this variable **directly** when initializing \`GoogleGenAI\`.
*   **Do NOT** generate UI for entering or managing the API key.

## Model Selection

*   Use full model names (e.g., \`gemini-2.5-flash-preview-09-2025\`).
*   **Common Name to Full Model Name Mapping:**
    *   \`gemini flash\`: \`gemini-flash-latest\`
    *   \`gemini lite\` or \`flash lite\`: \`gemini-flash-lite-latest\`
    *   \`gemini pro\`: \`gemini-3-pro-preview\`
    *   \`nano banana\`, \`gemini flash image\`: \`gemini-2.5-flash-image\`
    *   \`nano banana 2\`, \`nano banana pro\`, \`gemini pro image\`: \`gemini-3-pro-image-preview\`
    *   \`native audio\`, \`gemini flash audio\`: \`gemini-2.5-flash-native-audio-preview-09-2025\`
    *   \`gemini tts\`, \`gemini text-to-speech\`: \`gemini-2.5-flash-preview-tts\`
    *   \`Veo\`, \`Veo fast\`: \`veo-3.1-fast-generate-preview\`
*   **Default Model Selection (if not specified):**
    *   Basic Text: \`gemini-2.5-flash\`
    *   Complex Text (reasoning, coding): \`gemini-3-pro-preview\`
    *   General Image Gen/Edit: \`gemini-2.5-flash-image\`
    *   High-Quality Image Gen/Edit (1K, 2K, 4K) / Image Gen with \`googleSearch\`: \`gemini-3-pro-image-preview\`
    *   General Video Gen: \`veo-3.1-fast-generate-preview\`
    *   High-Quality Video Gen: \`veo-3.1-generate-preview\`
    *   Real-time Audio/Video Conversation: \`gemini-2.5-flash-native-audio-preview-09-2025\`
    *   Text-to-Speech: \`gemini-2.5-flash-preview-tts\`

## Import

*   Always use \`import {GoogleGenAI} from "@google/genai";\`.
*   **Prohibited:** \`import { GoogleGenerativeAI } from "@google/genai";\`, \`import type { GoogleGenAI} from "@google/genai";\`, \`declare var GoogleGenAI\`.

## Generate Content (Text, Image, Multi-part)

*   Use \`ai.models.generateContent\` with \`model\` and \`contents\`.
*   For multi-part content (e.g., image + text), use \`{ parts: [imagePart, textPart] }\`.

### Extracting Text Output

*   Access generated text via \`response.text\` (property, **not** a method).
*   **Incorrect:** \`response.text()\`, \`response?.response?.text\`, etc.

### System Instruction and Other Model Configs

*   Use \`config\` property for \`systemInstruction\`, \`topK\`, \`topP\`, \`temperature\`, \`responseMimeType\`, \`seed\`.

### Max Output Tokens & Thinking Config

*   If setting \`maxOutputTokens\`, also set \`thinkingConfig: { thinkingBudget: number }\` to reserve tokens for output.
    *   Example: \`maxOutputTokens: 200\`, \`thinkingBudget: 100\` (100 tokens for output).
*   \`thinkingBudget\` is for Gemini 2.5 series models only.
*   Max budget for \`gemini-3-pro-preview\` is 32768, for \`gemini-2.5-flash\` and \`flash-lite\` is 24576.
*   Set \`thinkingBudget: 0\` to disable thinking for lower latency.
*   By default, you don't need to set \`thinkingBudget\`.

### JSON Response

*   Use \`config: { responseMimeType: "application/json", responseSchema: { type: Type.ARRAY, items: ... } }\`.
*   \`Type.OBJECT\` in \`responseSchema\` cannot be empty.
*   Do not use \`SchemaType\`.

## Function Calling

*   Provide \`FunctionDeclaration\` objects in the \`tools\` config.
*   Process \`response.functionCalls\` to execute functions.
*   Send \`session.sendToolResponse\` with the function result back to the model in Live API.

## Generate Content (Streaming)

*   Use \`ai.models.generateContentStream\`.
*   Iterate \`for await (const chunk of response)\` and access \`chunk.text\`.

## Generate Images

### Image Generation/Editing Model

*   Default: \`gemini-2.5-flash-image\`.
*   High-quality (2K/4K) or with \`googleSearch\`: \`gemini-3-pro-image-preview\`.
*   Imagen models: \`imagen-4.0-generate-001\` (if explicitly requested).
*   **API Key Selection (for \`gemini-3-pro-image-preview\` and Veo models):**
    *   Mandatory step.
    *   Check \`await window.aistudio.hasSelectedApiKey()\`.
    *   If false, call \`await window.aistudio.openSelectKey()\`.
    *   Assume success after \`openSelectKey()\`.
    *   Re-create \`GoogleGenAI\` instance before each API call.
    *   Provide billing link: \`ai.google.dev/gemini-api/docs/billing\`.

### Image Configuration

*   \`aspectRatio\`: "1:1" (default), "3:4", "4:3", "9:16", "16:9".
*   \`imageSize\`: "1K" (default), "2K", "4K" (only for \`gemini-3-pro-image-preview\`).
*   **DO NOT** set \`responseMimeType\` or \`responseSchema\` for Nano Banana models.

### Examples

*   \`ai.models.generateContent\` for Nano Banana models. Iterate \`response.candidates[0].content.parts\` to find image.
*   \`ai.models.generateImages\` for Imagen models. Access \`response.generatedImages[0].image.imageBytes\`.

## Edit Images

*   Prompt with text, images, or both.
*   Follow Image Generation/Editing Model and Configuration.

## Generate Speech (Text-to-Speech)

*   Model: \`gemini-2.5-flash-preview-tts\`.
*   Config: \`responseModalities: [Modality.AUDIO]\`, \`speechConfig\`.
*   Single speaker: \`voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }\`.
*   Multi-speaker: \`multiSpeakerVoiceConfig: { speakerVoiceConfigs: [...] }\`.
*   **Audio Decoding:** Use provided \`decode\` and \`decodeAudioData\` functions. Raw PCM data. Do not use browser's native \`decodeAudioData\` for raw streams. Implement \`encode\` and \`decode\` manually.

## Generate Videos

*   Model: \`veo-3.1-fast-generate-preview\` (general), \`veo-3.1-generate-preview\` (high-quality, multi-ref, extend).
*   Config: \`numberOfVideos: 1\`, \`resolution: '720p' | '1080p'\`, \`aspectRatio: '16:9' | '9:16'\`.
*   \`referenceImages\` (up to 3): only with \`veo-3.1-generate-preview\`, \`16:9\`, \`720p\`.
*   \`video\` for extension: \`veo-3.1-generate-preview\`, \`720p\`, same aspect ratio.
*   **Polling:** Use \`ai.operations.getVideosOperation\` with delays until \`operation.done\`.
*   **Download:** Fetch \`downloadLink\` and append \`&key=${process.env.API_KEY}\`.
*   **API Key Selection:** Same as Image Generation with \`gemini-3-pro-image-preview\`.

## Live API (Real-time Conversation)

*   Model: \`gemini-2.5-flash-native-audio-preview-09-2025\`.
*   Config: \`responseModalities: [Modality.AUDIO]\`, \`speechConfig\`, \`systemInstruction\`.
*   **Session Setup:**
    *   \`ai.live.connect\`.
    *   Provide \`onopen\`, \`onmessage\`, \`onerror\`, \`onclose\` callbacks.
    *   Stream microphone audio using \`ScriptProcessorNode\`.
    *   **CRITICAL:** Call \`session.sendRealtimeInput\` **only after \`sessionPromise\` resolves**. Use \`sessionPromise.then(...)\`.
    *   **Audio Playback:** Schedule \`AudioBufferSourceNode.start\` using \`nextStartTime\` to ensure gapless playback. Stop sources and reset \`nextStartTime\` on \`interrupted\`.
*   **Video Streaming:** Send synchronized image frames (\`image/jpeg\`) and audio data.
*   **Audio Transcription:**
    *   Enable with \`outputAudioTranscription: {}\` and \`inputAudioTranscription: {}\`.
    *   Process \`message.serverContent.outputTranscription.text\` and \`message.serverContent.inputTranscription.text\`.
    *   Handle \`turnComplete\` to log/store full turns.
*   **Function Calling:**
    *   Provide \`FunctionDeclaration\` in \`tools\`.
    *   Process \`message.toolCall.functionCalls\`.
    *   Send \`session.sendToolResponse\` back to the model.
*   **Rules:**
    *   Schedule audio chunks precisely.
    *   Call \`session.close()\` when done.
    *   \`responseModalities\` MUST contain only \`Modality.AUDIO\`.
    *   Assume session active unless error/close event.
    *   **DO NOT** use browser's native \`AudioContext.decodeAudioData\` for raw PCM streams.
    *   **DO NOT** use external \`encode\`/\`decode\` libraries; implement manually.
    *   **CRITICAL:** \`session.sendRealtimeInput\` must be called *after* \`live.connect\` resolves.
    *   Use \`sessionPromise.then\` to avoid stale closures.
    *   Process audio output even if transcription/tool call is present.

## Chat

*   Use \`ai.chats.create\`.
*   \`config\` is same as \`models.generateContent\` config.
*   \`chat.sendMessage({ message: "..." })\` (not \`contents\`).
*   \`chat.sendMessageStream({ message: "..." })\` for streaming.

## Search Grounding (Google Search)

*   Model: \`gemini-2.5-flash\` (or \`gemini-3-pro-image-preview\` for image tasks with search).
*   Config: \`tools: [{googleSearch: {}}]\`.
*   **CRITICAL:** Extract and list \`response.candidates?.[0]?.groundingMetadata?.groundingChunks\` (URLs) in the UI.
*   **DO NOT** set \`responseMimeType\` or \`responseSchema\` with \`googleSearch\`.
*   Output \`response.text\` is not guaranteed to be JSON; treat as Markdown.

## Maps Grounding (Google Maps)

*   Model: \`gemini-2.5-flash\`.
*   Config: \`tools: [{googleMaps: {}}]\`, optionally \`toolConfig: { retrievalConfig: { latLng: ... } }\`.
*   May be used with \`googleSearch\`, but no other tools.
*   **CRITICAL:** Extract and list \`response.candidates?.[0]?.groundingMetadata?.groundingChunks\` (URLs) in the UI.
*   **DO NOT** set \`responseMimeType\` or \`responseSchema\` with \`googleMaps\`.
*   Output \`response.text\` is not guaranteed to be JSON; treat as Markdown.