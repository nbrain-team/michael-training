export class OperationsAgent {
  async execute(_query: any): Promise<any> {
    return {
      content: 'Operations agent response placeholder',
      agent: 'operations',
      sources: [],
      contextRelevance: 0.8
    };
  }
} 