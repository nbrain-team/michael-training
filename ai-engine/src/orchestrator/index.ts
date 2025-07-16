import { OpenAI } from 'openai';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { logger } from '../utils/logger';
import { RevenueAgent } from '../agents/RevenueAgent';
import { LeadershipAgent } from '../agents/LeadershipAgent';
import { OperationsAgent } from '../agents/OperationsAgent';
import { FinancialAgent } from '../agents/FinancialAgent';
import { RAGSystem } from '../rag/RAGSystem';

export interface AgentQuery {
  userId: string;
  sessionId: string;
  query: string;
  context?: any;
  goals?: string[];
  previousMessages?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

export interface AgentResponse {
  response: string;
  agent: string;
  confidence: number;
  sources?: string[];
  recommendations?: string[];
  actionItems?: string[];
  metrics?: any;
}

export class AIOrchestrator {
  private openai: OpenAI;
  private routingModel: ChatOpenAI;
  private agents: Map<string, any>;
  private ragSystem: RAGSystem;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    this.routingModel = new ChatOpenAI({
      modelName: 'gpt-4-turbo-preview',
      temperature: 0.1,
      openAIApiKey: process.env.OPENAI_API_KEY
    });

    this.ragSystem = new RAGSystem();
    this.agents = new Map();
    this.initializeAgents();
  }

  private initializeAgents() {
    this.agents = new Map([
      ['revenue', new RevenueAgent()],
      ['leadership', new LeadershipAgent()],
      ['operations', new OperationsAgent()],
      ['financial', new FinancialAgent()]
    ]);
  }

  async processQuery(query: AgentQuery): Promise<AgentResponse> {
    try {
      // 1. Enhance query with RAG context
      const context = await this.ragSystem.retrieveContext(query.query, {
        userId: query.userId,
        goals: query.goals
      });

      // 2. Determine the best agent for the query
      const selectedAgent = await this.routeQuery(query, context);
      
      // 3. Process with the selected agent
      const agent = this.agents.get(selectedAgent);
      if (!agent) {
        throw new Error(`Agent ${selectedAgent} not found`);
      }

      // 4. Execute agent with enhanced context
      const response = await agent.execute({
        ...query,
        ragContext: context,
        historicalContext: await this.getHistoricalContext(query.userId)
      });

      // 5. Post-process and enhance response
      const enhancedResponse = await this.enhanceResponse(response, query);

      // 6. Log for analytics
      await this.logInteraction(query, enhancedResponse);

      return enhancedResponse;
    } catch (error) {
      logger.error('Orchestrator error:', error);
      throw error;
    }
  }

  private async routeQuery(query: AgentQuery, context: any): Promise<string> {
    const routingPrompt = PromptTemplate.fromTemplate(`
      You are an AI routing system for an executive coaching platform.
      Analyze the following query and context to determine which specialist agent should handle it.

      Available agents:
      - revenue: Handles revenue growth, sales strategies, customer acquisition, pricing
      - leadership: Handles team management, culture, communication, hiring, performance
      - operations: Handles process optimization, efficiency, scaling, systems
      - financial: Handles financial planning, budgeting, metrics, profitability

      Query: {query}
      User Goals: {goals}
      Context: {context}

      Return ONLY the agent name (revenue, leadership, operations, or financial).
    `);

    const response = await this.routingModel.invoke(
      await routingPrompt.format({
        query: query.query,
        goals: query.goals?.join(', ') || 'Not specified',
        context: JSON.stringify(context)
      })
    );

    const agentName = response.content.toString().trim().toLowerCase();
    logger.info(`Routing to agent: ${agentName}`);
    
    return agentName;
  }

  private async enhanceResponse(
    response: any, 
    originalQuery: AgentQuery
  ): Promise<AgentResponse> {
    // Extract action items
    const actionItems = await this.extractActionItems(response.content);
    
    // Generate recommendations
    const recommendations = await this.generateRecommendations(
      response.content,
      originalQuery.goals
    );

    // Calculate confidence score
    const confidence = this.calculateConfidence(response);

    return {
      response: response.content,
      agent: response.agent,
      confidence,
      sources: response.sources || [],
      recommendations,
      actionItems,
      metrics: response.metrics
    };
  }

  private async extractActionItems(content: string): Promise<string[]> {
    const prompt = `Extract clear, actionable items from the following coaching response.
    Return as a JSON array of strings.
    
    Response: ${content}`;

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' }
    });

    try {
      const result = JSON.parse(completion.choices[0].message.content || '{}');
      return result.actionItems || [];
    } catch {
      return [];
    }
  }

  private async generateRecommendations(
    content: string, 
    goals?: string[]
  ): Promise<string[]> {
    const prompt = `Based on this coaching response and the user's goals, 
    provide 3-5 specific recommendations for next steps.
    
    Response: ${content}
    Goals: ${goals?.join(', ') || 'General business growth'}
    
    Return as a JSON array of recommendation strings.`;

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' }
    });

    try {
      const result = JSON.parse(completion.choices[0].message.content || '{}');
      return result.recommendations || [];
    } catch {
      return [];
    }
  }

  private calculateConfidence(response: any): number {
    // Implement confidence scoring based on:
    // - Number of sources
    // - Context relevance
    // - Query complexity match
    // - Historical accuracy
    
    let confidence = 0.7; // Base confidence
    
    if (response.sources && response.sources.length > 3) {
      confidence += 0.1;
    }
    
    if (response.contextRelevance > 0.8) {
      confidence += 0.1;
    }
    
    if (response.historicalAccuracy) {
      confidence += 0.1;
    }
    
    return Math.min(confidence, 1.0);
  }

  private async getHistoricalContext(_userId: string): Promise<any> {
    // Retrieve user's historical interactions, preferences, and outcomes
    // This would connect to your database
    return {
      previousTopics: [],
      successfulStrategies: [],
      preferences: {},
      companyMetrics: {}
    };
  }

  private async logInteraction(
    query: AgentQuery, 
    response: AgentResponse
  ): Promise<void> {
    // Log interaction for analytics and improvement
    logger.info('Interaction logged', {
      userId: query.userId,
      sessionId: query.sessionId,
      agent: response.agent,
      confidence: response.confidence
    });
  }

  async generateDailyBriefing(userId: string): Promise<string> {
    // Generate personalized daily briefing
    const userContext = await this.getHistoricalContext(userId);
    
    const prompt = `Generate a personalized executive briefing for a user with the following context:
    ${JSON.stringify(userContext)}
    
    Include:
    1. Progress on current goals
    2. Key metrics update
    3. Recommended focus for today
    4. Industry insights relevant to their business`;

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }]
    });

    return completion.choices[0].message.content || '';
  }
} 