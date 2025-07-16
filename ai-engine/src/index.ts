import express from 'express';
import { AIOrchestrator } from './orchestrator';

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'ai-engine',
    timestamp: new Date().toISOString() 
  });
});

// Initialize AI Orchestrator
let orchestrator: AIOrchestrator;

try {
  orchestrator = new AIOrchestrator();
  console.log('AI Orchestrator initialized successfully');
} catch (error) {
  console.error('Failed to initialize AI Orchestrator:', error);
}

// AI processing endpoint
app.post('/api/process', async (req, res) => {
  try {
    if (!orchestrator) {
      throw new Error('AI Orchestrator not initialized');
    }
    
    const result = await orchestrator.processQuery(req.body);
    res.json(result);
  } catch (error) {
    console.error('Processing error:', error);
    res.status(500).json({ error: 'Processing failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`AI Engine server running on port ${PORT}`);
}); 