export class FinancialAgent {
  async execute(query: any): Promise<any> {
    return {
      content: 'Financial agent response placeholder',
      agent: 'financial',
      sources: [],
      contextRelevance: 0.8
    };
  }
} 