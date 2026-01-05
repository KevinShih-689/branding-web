import { createOllama } from 'ai-sdk-ollama';

const ollama = createOllama({
  baseURL: process.env.OLLAMA_BASE_URL,
});

export default ollama;
