#!/bin/bash

# Blog Test Runner Script
# Usage: ./scripts/test.sh [quick|full|external]

set -e  # Exit on any error

echo "🧪 Blog Test Runner"
echo "==================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if bundle is available
if ! command -v bundle &> /dev/null; then
    print_error "Bundle is not installed. Please install Ruby and Bundler first."
    exit 1
fi

# Check if required gems are installed
if [ ! -f "Gemfile.lock" ]; then
    print_warning "Gemfile.lock not found. Running bundle install..."
    bundle install
fi

# Test mode (default: quick)
TEST_MODE=${1:-quick}

print_status "Running tests in '$TEST_MODE' mode..."

case $TEST_MODE in
    "quick")
        print_status "Running quick tests (posts + site building)..."
        bundle exec rake quick_test
        print_success "Quick tests completed!"
        ;;
    
    "full")
        print_status "Running full test suite..."
        bundle exec rake test
        print_success "Full test suite completed!"
        ;;
    
    "external")
        print_status "Running full tests including external link checking..."
        bundle exec rake test
        bundle exec rake test_external_links
        print_success "All tests including external links completed!"
        ;;
    
    "ci")
        print_status "Running CI-style tests..."
        
        # Create tmp directory for results
        mkdir -p tmp
        
        # Run RSpec with JSON output
        bundle exec rspec --format documentation --format json --out tmp/rspec_results.json
        
        # Build site
        bundle exec jekyll build --trace
        
        # Run HTMLProofer
        bundle exec htmlproofer _site \
            --check-html \
            --disable-external \
            --allow-hash-href \
            --ignore-status-codes "999,403,0"
        
        print_success "CI tests completed!"
        ;;
    
    "perf")
        print_status "Running performance checks..."
        bundle exec rake perf
        print_success "Performance checks completed!"
        ;;
    
    *)
        print_error "Unknown test mode: $TEST_MODE"
        echo "Available modes:"
        echo "  quick     - Fast tests (posts + building)"
        echo "  full      - Full test suite"
        echo "  external  - Include external link checking"
        echo "  ci        - CI-style testing"
        echo "  perf      - Performance checks"
        exit 1
        ;;
esac

print_success "All tests passed! ✨" 