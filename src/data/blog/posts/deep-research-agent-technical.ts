import { BlogPost } from "@/types/blog";

export const deepResearchAgentTechnical: BlogPost = {
  id: "1",
  title: "Building a Deep Research Agent That Asks Questions Throughout Your Research Journey",
  slug: "building-an-iterative-deep-research-agent-technical-deep-dive",
  excerpt:
    "Learn how to build an AI research agent that doesn't just ask questions upfront, but continuously clarifies and refines its research as it discovers new information - using TypeScript, LangChain, DeepAgents, and Azure OpenAI.",
  content: `# Building a Deep Research Agent That Asks Questions Throughout Your Research Journey

**Reading Time**: ~25 minutes
**Difficulty**: Intermediate
**Technologies**: TypeScript, LangChain, DeepAgents, Azure OpenAI, Tavily API, Next.js

---

## Table of Contents

1. [Introduction: The Research Problem](#introduction-the-research-problem)
2. [ChatGPT vs Deep Research Agent: A Side-by-Side Comparison](#chatgpt-vs-deep-research-agent-a-side-by-side-comparison)
3. [Architecture Deep Dive](#architecture-deep-dive)
4. [Implementation Guide](#implementation-guide)
5. [The Iterative Research Workflow](#the-iterative-research-workflow)
6. [Persistent Context: Memory and File Logging](#persistent-context-memory-and-file-logging)
7. [Tool Integration and Visibility](#tool-integration-and-visibility)
8. [Building the API Layer](#building-the-api-layer)
9. [Practical Examples and Use Cases](#practical-examples-and-use-cases)
10. [Performance and Best Practices](#performance-and-best-practices)
11. [Conclusion and Future Directions](#conclusion-and-future-directions)

---

## 1. Introduction: The Research Problem

> *"ChatGPT asks you 5 questions upfront. Then it goes silent. What if your research agent could keep asking clarifying questions as it discovers new information?"*

### The Core Problem

Traditional AI research assistants, including ChatGPT's research mode, use what we call a "front-load" approach to understanding your needs:

![traditional ai research workflow](https://wdtiaofugxxinuohhnsn.supabase.co/storage/v1/object/sign/blog-content-images/iterative-research-agent-technical/traditional-ai-research-flow.JPG?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNTQ3ODllMS1jY2QzLTQ4NGMtOWM3Yi1jOTQ2MDY5NGRiNDIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJibG9nLWNvbnRlbnQtaW1hZ2VzL2l0ZXJhdGl2ZS1yZXNlYXJjaC1hZ2VudC10ZWNobmljYWwvdHJhZGl0aW9uYWwtYWktcmVzZWFyY2gtZmxvdy5KUEciLCJpYXQiOjE3NjY1MjMyMjgsImV4cCI6MTg2MTEzMTIyOH0.ymfY4MNUQf_VOH6txUIY-wL-fteWzeICwymyVY7JKtQ)

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│              Traditional AI Research Flow                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   User Query                                                │
│       ↓                                                     │
│   [1-5 Clarifying Questions Upfront]                        │
│       ↓                                                     │
│   User Answers All Questions                                │
│       ↓                                                     │
│   ┌─────────────────────────────────┐                       │
│   │   BLACK BOX RESEARCH PHASE     │  ← No Interaction     │
│   │   - Web searches              │                        │
│   │   - Data gathering            │                        │
│   │   - Analysis                  │                        │
│   └─────────────────────────────────┘                       │
│       ↓                                                     │
│   Final Report                                              │
│       ↓                                                     │
│   Session Ends (Context Lost)                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
\`\`\`

**This approach has fundamental limitations:**

1. **No Mid-Research Pivots**: You're forced to predict all your research needs before seeing any results
2. **Unknown Unknowns**: The AI may discover important terms, concepts, or tangents you'd want to explore, but has no way to ask
3. **Context Loss**: Once the session ends, all context is lost—you start from scratch next time
4. **Opaque Reasoning**: You rarely see the AI's thought process or search strategies

### The Solution: An Iterative Deep Research Agent

What if instead of this rigid flow, your research assistant could:

- ✅ **Ask clarifying questions throughout the research process**, not just at the start
- ✅ **Maintain persistent context** via memory and file logging across the entire session
- ✅ **Show transparent reasoning** so you understand the AI's thought process
- ✅ **Provide tool visibility** for trust and education
- ✅ **Manage comprehensive workflows** with explicit todo tracking

This is exactly what we built with the Deep Research Agent.

---

## 2. ChatGPT vs Iterative Deep Research Agent: A Side-by-Side Comparison

### 2.1 ChatGPT's Research Mode

\`\`\`
User: "Research quantum computing"

ChatGPT:
  → Asks 1-5 clarifying questions upfront
  → User answers
  → Conducts research in one pass (hidden)
  → Returns final report
  → Session ends (context lost)
\`\`\`

**Limitations in Practice:**

- ❌ **No mid-research pivots** — Can't redirect focus based on discoveries
- ❌ **Can't clarify new terms** — Unknown acronyms during research are skipped or guessed
- ❌ **No way to dig deeper** — Unexpected interesting findings can't be explored
- ❌ **Context doesn't persist** — Next session starts from zero

### 2.2 Deep Research Agent's Iterative Approach

\`\`\`
User: "Research quantum computing"

Deep Research Agent:
  → Clarifies: "What aspects interest you most? Hardware, algorithms, or applications?"
  → User: "Focus on error correction"
  → Begins research, encounters "topological qubits"
  → Clarifies: "I discovered topological qubits—should I deep-dive into this approach?"
  → User: "Yes, and compare with other error correction approaches"
  → Continues iteratively, logging findings...
  → Encounters "surface codes" and "magic state distillation"
  → Clarifies: "These two techniques keep appearing. Want detailed comparisons?"
  → User: "Yes, focus on practicality and current implementations"
  → Logs all findings to persistent files
  → Maintains full context for follow-up sessions
\`\`\`

### 2.3 Key Differences at a Glance

| Feature | ChatGPT Research | Deep Research Agent |
|---------|------------------|---------------------|
| **Clarifying Questions** | Max 5, at start only | Unlimited, throughout process |
| **Context Between Questions** | Session-only | Persistent (memory + files) |
| **Tool Visibility** | Hidden | Fully transparent |
| **Research Approach** | Single-pass | Iterative, multi-step |
| **Unknown Term Handling** | Skips or guesses | Immediately researches & clarifies |
| **Session Persistence** | No | Yes (memory + markdown logs) |
| **Reasoning Display** | Optional | Always available |
| **Todo Management** | None | Explicit task tracking (max 15 items) |
| **File Documentation** | None | 2 persistent log files |

---

## 3. Architecture Deep Dive

### 3.1 High-Level Architecture

![high level architechture diagram](https://wdtiaofugxxinuohhnsn.supabase.co/storage/v1/object/sign/blog-content-images/iterative-research-agent-technical/high-level-architecture.JPG?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNTQ3ODllMS1jY2QzLTQ4NGMtOWM3Yi1jOTQ2MDY5NGRiNDIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJibG9nLWNvbnRlbnQtaW1hZ2VzL2l0ZXJhdGl2ZS1yZXNlYXJjaC1hZ2VudC10ZWNobmljYWwvaGlnaC1sZXZlbC1hcmNoaXRlY3R1cmUuSlBHIiwiaWF0IjoxNzY2NTIzMDk4LCJleHAiOjE4NjExMzEwOTh9.LIgQcn90xK9TGgqdn9YA2tEyIFosK1HeOMWlHiXQTo0)

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                         User Query                          │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│         Iterative Deep Research Agent (DeepAgents)          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  System Instructions (Iterative Research Workflow)   │   │
│  │  - 7-step research methodology                       │   │
│  │  - Clarification requirements                        │   │
│  │  - Todo management rules                             │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           Model: GPT-5-Mini (Azure OpenAI)           │   │
│  │  - High reasoning capability                         │   │
│  │  - Efficient token usage                             │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Tools: web_search (Tavily), todo, write_file        │   │
│  │  - Research capabilities                             │   │
│  │  - Task management                                   │   │
│  │  - Persistent logging                                │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Memory: InMemoryStore (conversation context)        │   │
│  │  - Full conversation history                         │   │
│  │  - Research findings                                 │   │
│  │  - User preferences                                  │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Backend: CompositeBackend (State + Store)           │   │
│  │  - StateBackend for agent state                      │   │
│  │  - StoreBackend for memory persistence               │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                 Persistent Documentation                    │
│  • research_questions_and_search_results.md                 │
│  • conversation_history.md                                  │
│  • Todo list (max 15 items, managed via tool)              │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### 3.2 Core Components Explained

#### The Agent Factory

At the heart of our system is the \`createDeepAgent\` function from the DeepAgents library:

\`\`\`typescript
// backend/agents/deep-research-agent/index.ts

import { TavilySearch } from "@langchain/tavily";
import { AzureChatOpenAI } from "@langchain/openai";
import { InMemoryStore } from "@langchain/langgraph";
import { createDeepAgent, CompositeBackend, StoreBackend, StateBackend } from "deepagents";
import { webSearchTool } from "@/backend/tools/web-search-tool";
import { models } from "@/backend/models";

export const deepResearchAgent = createDeepAgent({
    name: "DeepResearchAgent",
    model: models.gpt5Mini.model,
    systemPrompt: instructions,
    tools: [webSearchTool],
    store: new InMemoryStore(),
    backend: (config) => new CompositeBackend(
        new StateBackend(config),
        { "/memories/": new StoreBackend(config) },
    ),
});
\`\`\`

**Let's break down each parameter:**

| Parameter | Purpose | Why It Matters |
|-----------|---------|----------------|
| \`name\` | Unique identifier | Must follow Azure OpenAI naming conventions |
| \`model\` | The LLM to use | GPT-5-Mini for optimal cost/capability balance |
| \`systemPrompt\` | Agent instructions | Defines the iterative research workflow |
| \`tools\` | Available capabilities | Web search, file writing, todo management |
| \`store\` | Memory storage | Persists context across interactions |
| \`backend\` | State management | Composite of state and memory backends |

#### The Model Configuration

\`\`\`typescript
// backend/models/gpt-5-mini/index.ts

import { AzureChatOpenAI } from "@langchain/openai";

export const gpt5MiniModel = new AzureChatOpenAI({
    model: "gpt-5-mini",
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIEndpoint: process.env.AZURE_OPENAI_API_ENDPOINT,
    azureOpenAIApiDeploymentName: "gpt-5-mini",
    azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
    azureOpenAIApiVersion: "2024-12-01-preview",
});
\`\`\`

**Why Azure OpenAI?**
- Enterprise-grade reliability
- Consistent API behavior
- Fine-grained access control
- Better rate limiting for production use

### 3.3 The CompositeBackend Pattern

The \`CompositeBackend\` is a crucial architectural decision that allows us to combine different storage strategies:

\`\`\`typescript
backend: (config) => new CompositeBackend(
    new StateBackend(config),          // Primary: Agent execution state
    { "/memories/": new StoreBackend(config) },  // Route: Memory persistence
),
\`\`\`

**This pattern provides:**

1. **State Isolation**: Agent execution state is separate from conversation memory
2. **Path-Based Routing**: Different paths can use different backends
3. **Scalability**: Easy to add new backends for specific use cases
4. **Persistence**: Memory survives across agent invocations

---

## 4. Implementation Guide

### 4.1 Project Setup

First, create your project structure:

\`\`\`bash
deep-research-agent/
├── backend/
│   ├── agents/
│   │   └── deep-research-agent/
│   │       └── index.ts
│   ├── models/
│   │   ├── index.ts
│   │   └── gpt-5-mini/
│   │       └── index.ts
│   └── tools/
│       └── web-search-tool/
│           └── index.ts
├── app/
│   └── api/
│       └── research/
│           └── route.ts
└── package.json
\`\`\`

### 4.2 Dependencies

\`\`\`json
{
  "dependencies": {
    "@langchain/langgraph": "^0.2.x",
    "@langchain/openai": "^0.3.x",
    "@langchain/tavily": "^0.1.x",
    "deepagents": "^0.1.x",
    "langchain": "^0.3.x",
    "zod": "^3.x"
  }
}
\`\`\`

### 4.3 Environment Variables

\`\`\`bash
# Azure OpenAI Configuration
AZURE_OPENAI_API_KEY=your_key_here
AZURE_OPENAI_API_ENDPOINT=https://your-instance.openai.azure.com/
AZURE_OPENAI_API_DEPLOYMENT_NAME=gpt-5-mini
AZURE_OPENAI_API_INSTANCE_NAME=your-instance-name

# Tavily API for Web Search
TAVILY_API_KEY=your_tavily_key_here
\`\`\`

### 4.4 Building the Web Search Tool

The web search tool is the agent's primary research capability:

\`\`\`typescript
// backend/tools/web-search-tool/index.ts

import { TavilySearch, TopicType } from "@langchain/tavily";
import { tool } from "langchain";
import { z } from "zod";

const webSearchSchema = z.object({
    query: z.string().describe("The search query string"),
    max_results: z.number().min(1).max(100).default(50)
        .describe("Maximum number of results to return."),
    topic: z.enum(["general", "news"]).optional()
        .describe("Topic category for search"),
    includeRawContent: z.boolean().default(false)
        .describe("Whether to include raw HTML content"),
});

interface SearchSource {
    title: string;
    url: string;
    content: string;
    score: number;
}

interface EnhancedSearchResponse {
    query: string;
    results: SearchSource[];
    summary?: string;
    totalResults: number;
    responseTime: number;
}

export const webSearchTool = tool(
    async (input) => {
        const { query, max_results, topic, includeRawContent } = input;

        try {
            const search = new TavilySearch({
                maxResults: max_results,
                tavilyApiKey: process.env.TAVILY_API_KEY,
                includeRawContent,
                topic: topic as TopicType | undefined,
            });

            const rawResponse = await search._call({ query });

            let parsedResponse: any;
            try {
                parsedResponse = typeof rawResponse === 'string'
                    ? JSON.parse(rawResponse)
                    : rawResponse;
            } catch {
                parsedResponse = rawResponse;
            }

            const sources: SearchSource[] = (parsedResponse.results || [])
                .map((result: any) => ({
                    title: result.title || "Untitled",
                    url: result.url || "",
                    content: result.content || "",
                    score: result.score || 0,
                }));

            const enhancedResponse: EnhancedSearchResponse = {
                query: parsedResponse.query || query,
                results: sources,
                summary: parsedResponse.answer || undefined,
                totalResults: sources.length,
                responseTime: parsedResponse.response_time || 0,
            };

            return enhancedResponse;

        } catch (error) {
            return {
                query,
                results: [],
                totalResults: 0,
                responseTime: 0,
                error: \`Search failed: \${error instanceof Error ? error.message : String(error)}\`
            };
        }
    },
    {
        name: "web_search",
        description: "Search the web for information using Tavily API. " +
            "Returns structured results with URLs, titles, content excerpts, and relevance scores.",
        schema: webSearchSchema,
    }
);
\`\`\`

---

## 5. The Iterative Research Workflow

The heart of what makes this agent different is its **7-step iterative research workflow**.

### 5.1 The Seven Steps

![iterative research workflow](https://wdtiaofugxxinuohhnsn.supabase.co/storage/v1/object/sign/blog-content-images/iterative-research-agent-technical/iterative-research-workflow.PNG?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNTQ3ODllMS1jY2QzLTQ4NGMtOWM3Yi1jOTQ2MDY5NGRiNDIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJibG9nLWNvbnRlbnQtaW1hZ2VzL2l0ZXJhdGl2ZS1yZXNlYXJjaC1hZ2VudC10ZWNobmljYWwvaXRlcmF0aXZlLXJlc2VhcmNoLXdvcmtmbG93LlBORyIsImlhdCI6MTc2NjUyMzUxNSwiZXhwIjoxODYxMTMxNTE1fQ.xFHMxPVVXmw_U0bz2qg8eG8ub43frNS0oO4GdauwcbQ)

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                 ITERATIVE RESEARCH WORKFLOW                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Step 1: UNDERSTAND & CLARIFY                               │
│  Step 2: ORGANIZE & PLAN                                    │
│  Step 3: ITERATIVE SEARCH                                   │
│  Step 4: SYNTHESIS & ANALYSIS                               │
│  Step 5: DOCUMENTATION                                      │
│  Step 6: COMPOSE REPORT                                     │
│  Step 7: ONGOING WORKFLOW                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### 5.2 Critical Clarification Points

The agent is instructed to **interrupt and ask for clarification** when:

1. **Unknown Terms**: Immediately researches unfamiliar terms
2. **Ambiguous Scope**: Breaks broad requests into specific sub-questions
3. **Mid-Research Discoveries**: Asks if user wants to explore new concepts

---

## 6. Persistent Context: Memory and File Logging

### 6.1 The Dual-File Strategy

The agent maintains two persistent markdown files:

1. **research_questions_and_search_results.md** - Research findings
2. **conversation_history.md** - Full dialogue history

### 6.2 Why Both Memory AND Files?

**Memory (InMemoryStore):**
- Fast retrieval during session
- Structured data access

**Files (Markdown logs):**
- Human-readable
- Survives agent restarts
- Can be shared/exported

---

## 7. Tool Integration and Visibility

The agent exposes every tool call for transparency and trust.

### 7.1 The Todo Tool

\`\`\`
📋 Current Todo List (7/15 items)

✅ [DONE] Clarify user requirements
✅ [DONE] Research topological qubits basics
⏳ [IN PROGRESS] Compare error rates
⬜ [PENDING] Compile final report
\`\`\`

**The 15-Item Limit Rule** forces the agent to prioritize and complete tasks.

---

## 8. Building the API Layer

\`\`\`typescript
// app/api/research/route.ts

import { deepResearchAgent } from "@/backend/agents/deep-research-agent";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { query } = body;

        if (!query || typeof query !== "string") {
            return NextResponse.json(
                { error: "Query is required and must be a string" },
                { status: 400 }
            );
        }

        const response = await deepResearchAgent.invoke({
            messages: [{ role: "user", content: query }]
        }, {
            recursionLimit: 100,
        });

        const agentMessages = response.messages || [];
        const lastMessage = agentMessages[agentMessages.length - 1];

        return NextResponse.json({
            content: lastMessage?.content || "No response generated",
        });

    } catch (error) {
        return NextResponse.json(
            { error: "Failed to process research query" },
            { status: 500 }
        );
    }
}
\`\`\`

---

## 9. Practical Examples and Use Cases

### Example: Technical Research with Iterative Clarification

**Initial Query:** "Research the best database for my application"

**Agent Response:** Asks about scale, access patterns, data structure, consistency needs, and deployment preferences before researching.

---

## 10. Performance and Best Practices

### Recursion Limit Tuning

| Use Case | Recommended Limit |
|----------|------------------|
| Quick facts | 20-30 |
| Standard research | 50-75 |
| Deep research | 100-150 |

---

## 11. Conclusion and Future Directions

We built a Deep Research Agent that:
- Asks clarifying questions throughout
- Maintains persistent context
- Shows transparent reasoning
- Uses explicit todo tracking

**Key Takeaways:**
1. Iterative > Front-loaded
2. Persistence Matters
3. Transparency Builds Trust
4. Structured Workflows Prevent Chaos

---

## Resources

- **LangChain Docs**: [js.langchain.com](https://js.langchain.com)
- **DeepAgents**: [deepagents.dev](https://deepagents.dev)
- **Tavily API**: [tavily.com](https://tavily.com)
- **Azure OpenAI**: [Azure AI Services](https://azure.microsoft.com/en-us/products/ai-services/openai-service)

---

*Built with ❤️ using Next.js, TypeScript, LangChain, and DeepAgents*`,
  coverImage:
    "https://wdtiaofugxxinuohhnsn.supabase.co/storage/v1/object/sign/blog-thumbnails/building-smarter-research-assistant-beginners-guide.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNTQ3ODllMS1jY2QzLTQ4NGMtOWM3Yi1jOTQ2MDY5NGRiNDIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJibG9nLXRodW1ibmFpbHMvYnVpbGRpbmctc21hcnRlci1yZXNlYXJjaC1hc3Npc3RhbnQtYmVnaW5uZXJzLWd1aWRlLnBuZyIsImlhdCI6MTc2NjUyMzkwMywiZXhwIjoxODYxMTMxOTAzfQ.l_IehmRigf7AO65cIpNVElBCKs6PpQ1FPT6x5hwirwc",
  author: {
    name: "Babangida Tsowa",
    avatar: "/profile-image.png",
    bio: "Fullstack Developer, AI Engineer & Technology Consultant",
  },
  publishedAt: "2025-01-23T10:00:00Z",
  category: "AI Engineering",
  tags: [
    "AI",
    "LangChain",
    "DeepAgents",
    "Azure OpenAI",
    "TypeScript",
    "Next.js",
    "Research Agents",
    "AI Architecture",
    "Tutorial",
  ],
  readingTime: 25,
  featured: true,
  published: true,
};
