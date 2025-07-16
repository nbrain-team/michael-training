#!/bin/bash

# Helper script to update Redis URL in Render services
# Usage: ./update-redis-url.sh <REDIS_URL>

REDIS_URL=$1

if [ -z "$REDIS_URL" ]; then
  echo "❌ Please provide Redis URL as argument"
  echo "Usage: ./update-redis-url.sh redis://red-abc123:6379"
  exit 1
fi

echo "📝 Update these environment variables in Render Dashboard:"
echo ""
echo "1. Go to each service in Render Dashboard"
echo "2. Click on 'Environment' tab"
echo "3. Update REDIS_URL with: $REDIS_URL"
echo ""
echo "Services to update:"
echo "✅ coaching-backend"
echo "✅ coaching-ai-engine"
echo ""
echo "Or use Render CLI:"
echo "render env set REDIS_URL=$REDIS_URL --service coaching-backend"
echo "render env set REDIS_URL=$REDIS_URL --service coaching-ai-engine" 