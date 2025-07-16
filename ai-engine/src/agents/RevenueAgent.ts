export class RevenueAgent {
  async execute(_query: any): Promise<any> {
    return {
      content: 'Revenue agent response placeholder',
      agent: 'revenue',
      sources: [],
      contextRelevance: 0.8
    };
  }
} 