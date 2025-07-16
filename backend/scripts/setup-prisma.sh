#!/bin/bash

echo "🚀 Setting up Prisma with PostgreSQL"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if we're in the backend directory
if [ ! -f "package.json" ] || [ ! -d "src" ]; then
  echo -e "${YELLOW}Please run this script from the backend directory${NC}"
  exit 1
fi

# Initialize Prisma if not already done
if [ ! -d "prisma" ]; then
  echo "Initializing Prisma..."
  npx prisma init
fi

echo -e "${GREEN}✅ Prisma initialized${NC}"
echo ""
echo "Next steps:"
echo "1. Make sure DATABASE_URL is set in your .env file"
echo "2. Run: npm run generate    # Generate Prisma Client"
echo "3. Run: npm run migrate     # Create database tables"
echo "4. Run: npm run studio      # Open Prisma Studio (GUI)"
echo ""
echo "Example DATABASE_URL format:"
echo "postgresql://username:password@host:port/database?schema=public" 