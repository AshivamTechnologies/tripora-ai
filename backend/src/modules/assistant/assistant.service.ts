import { v4 as uuidv4 } from 'uuid';
import { mockStore } from '../../database/mock-store';
import { aiProvider } from '../../integrations/ai/ai.factory';

export class AssistantService {
  public async chat(userId: string, message: string, tripId?: string) {
    let tripContext: Record<string, any> | undefined;

    if (tripId) {
      const trip = mockStore.trips.get(tripId);
      if (trip) {
        tripContext = {
          destination: trip.destination,
          dates: `${trip.startDate} to ${trip.endDate}`,
          adults: trip.adults,
          travelStyles: trip.travelStyles,
          budget: `${trip.currency} ${Math.round(trip.budgetMinor / 100)}`,
        };
      }
    }

    const reply = await aiProvider.chatAssistant(message, tripContext);

    // Save conversation log
    mockStore.aiUsageLogs.push({
      id: `ai-chat-${uuidv4()}`,
      userId,
      tripId,
      operation: 'CHAT_ASSISTANT',
      promptTokens: 120,
      completionTokens: 95,
      totalTokens: 215,
      estimatedCostUsd: 0.0003,
      provider: 'GEMINI',
      model: 'gemini-1.5-flash',
      latencyMs: 380,
      status: 'SUCCESS',
      createdAt: new Date().toISOString(),
    });

    return {
      message: reply,
      sender: 'ASSISTANT',
      timestamp: new Date().toISOString(),
      suggestedActions: [
        'How is the weather forecast?',
        'Suggest top local dining spots',
        'Find budget-friendly alternatives',
        'Check route optimization tips',
      ],
    };
  }
}

export const assistantService = new AssistantService();
