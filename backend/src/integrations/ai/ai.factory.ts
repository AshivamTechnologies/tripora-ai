import { config } from '../../config';
import { GeminiAiProvider } from './gemini.provider';
import { MockAiProvider } from './mock.provider';

export function getAiProvider() {
  if (config.ai.provider === 'GEMINI' || config.ai.geminiApiKey) {
    return new GeminiAiProvider(config.ai.geminiApiKey);
  }
  return new MockAiProvider();
}

export const aiProvider = getAiProvider();
