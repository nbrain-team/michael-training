#!/bin/bash

# Setup script for Render deployment
echo "🚀 Setting up Executive Coaching Platform on Render"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if render CLI is installed
if ! command -v render &> /dev/null; then
    echo -e "${YELLOW}Render CLI not found. Installing...${NC}"
    curl -fsSL https://render.com/install.sh | sh
fi

# Function to check required environment variables
check_env_vars() {
    local missing_vars=()
    
    if [[ -z "${OPENAI_API_KEY}" ]]; then
        missing_vars+=("OPENAI_API_KEY")
    fi
    
    if [[ -z "${PINECONE_API_KEY}" ]]; then
        missing_vars+=("PINECONE_API_KEY")
    fi
    
    if [[ -z "${PINECONE_ENVIRONMENT}" ]]; then
        missing_vars+=("PINECONE_ENVIRONMENT")
    fi
    
    if [[ ${#missing_vars[@]} -ne 0 ]]; then
        echo -e "${RED}Missing required environment variables:${NC}"
        printf '%s\n' "${missing_vars[@]}"
        echo -e "${YELLOW}Please set these variables before deploying.${NC}"
        return 1
    fi
    
    return 0
}

# Main setup function
main() {
    echo "📋 Pre-deployment checklist:"
    
    # Check Node.js version
    node_version=$(node -v | cut -d'v' -f2)
    echo -e "✅ Node.js version: ${GREEN}v${node_version}${NC}"
    
    # Check if package-lock.json exists for all services
    for service in backend frontend ai-engine; do
        if [[ -f "${service}/package-lock.json" ]]; then
            echo -e "✅ ${service}/package-lock.json exists"
        else
            echo -e "${YELLOW}⚠️  ${service}/package-lock.json missing - running npm install${NC}"
            cd ${service} && npm install && cd ..
        fi
    done
    
    # Check environment variables
    echo -e "\n🔐 Checking environment variables..."
    if check_env_vars; then
        echo -e "${GREEN}✅ All required environment variables are set${NC}"
    else
        exit 1
    fi
    
    # Create .env.example if it doesn't exist
    if [[ ! -f ".env.example" ]]; then
        echo -e "\n📝 Creating .env.example file..."
        cp env.example .env.example
    fi
    
    echo -e "\n${GREEN}✅ Pre-deployment checks complete!${NC}"
    echo -e "\n📌 Next steps:"
    echo "1. Go to https://dashboard.render.com/new/blueprint"
    echo "2. Connect your GitHub repository: nbrain-team/michael-training"
    echo "3. Render will automatically detect the render.yaml file"
    echo "4. Set the following environment variables in Render dashboard:"
    echo "   - OPENAI_API_KEY"
    echo "   - PINECONE_API_KEY"
    echo "   - PINECONE_ENVIRONMENT"
    echo "   - STRIPE_SECRET_KEY (if using payments)"
    echo "   - SENDGRID_API_KEY (if using email)"
    echo ""
    echo "5. Click 'Apply' to deploy all services"
    echo ""
    echo -e "${YELLOW}💡 Tip: Use Render's environment groups to share variables across services${NC}"
}

# Run main function
main 