import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createChatStream, Message } from '@/lib/ai';

// Mock the fetch function
vi.mock('node:fetch', () => ({
  default: vi.fn(),
}));

describe('AI Module', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('createChatStream', () => {
    it('should throw an error if environment variables are not set', async () => {
      // Mock environment variables to be undefined
      const originalEnv = process.env;
      vi.stubEnv('OLLAMA_URL', undefined);
      vi.stubEnv('GEMMA_MODEL', undefined);

      const messages: Message[] = [
        { role: 'user', content: 'Hello' }
      ];

      await expect(createChatStream(messages))
        .rejects
        .toThrow('OLLAMA_URL and GEMMA_MODEL must be set in environment variables');

      // Restore environment
      process.env = originalEnv;
    });

    it('should include guide context as a system message when provided', async () => {
      // Mock environment variables
      vi.stubEnv('OLLAMA_URL', 'http://localhost:11434');
      vi.stubEnv('GEMMA_MODEL', 'gemma:3b-instruct');

      // Mock the fetch response
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        body: new ReadableStream(),
      });

      const messages: Message[] = [
        { role: 'user', content: 'Help with training' }
      ];

      const guideContext = 'This is a guide about dog training';

      await createChatStream(messages, guideContext);

      // Check that fetch was called with the correct arguments
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:11434/api/chat',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
          body: expect.stringContaining('system'),
        })
      );

      // Parse the body to check that it includes the system message
      const callArg = (global.fetch as any).mock.calls[0][1];
      const bodyObj = JSON.parse(callArg.body);
      
      expect(bodyObj.messages[0].role).toBe('system');
      expect(bodyObj.messages[0].content).toContain(guideContext);
      expect(bodyObj.messages[1]).toEqual(messages[0]);
    });
  });
});
