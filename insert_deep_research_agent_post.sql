-- Insert Deep Research Agent blog post
INSERT INTO public.blog_posts (
  title,
  slug,
  excerpt,
  content,
  cover_image,
  author_name,
  author_avatar,
  author_bio,
  published_at,
  category,
  tags,
  reading_time,
  featured,
  published
) VALUES (
  'Building a Deep Research Agent That Asks Questions Throughout Your Research Journey',
  'building-an-iterative-deep-research-agent-technical-deep-dive',
  'Learn how to build an AI research agent that doesn''t just ask questions upfront, but continuously clarifies and refines its research as it discovers new information - using TypeScript, LangChain, DeepAgents, and Azure OpenAI.',
  '# Building a Deep Research Agent That Asks Questions Throughout Your Research Journey

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

Traditional AI research assistants, including ChatGPT''s research mode, use what we call a "front-load" approach to understanding your needs:

![traditional ai research workflow](https://wdtiaofugxxinuohhnsn.supabase.co/storage/v1/object/sign/blog-content-images/iterative-research-agent-technical/traditional-ai-research-flow.JPG?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNTQ3ODllMS1jY2QzLTQ4NGMtOWM3Yi1jOTQ2MDY5NGRiNDIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJibG9nLWNvbnRlbnQtaW1hZ2VzL2l0ZXJhdGl2ZS1yZXNlYXJjaC1hZ2VudC10ZWNobmljYWwvdHJhZGl0aW9uYWwtYWktcmVzZWFyY2gtZmxvdy5KUEciLCJpYXQiOjE3NjY1MjMyMjgsImV4cCI6MTg2MTEzMTIyOH0.ymfY4MNUQf_VOH6txUIY-wL-fteWzeICwymyVY7JKtQ)

```
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
```

**This approach has fundamental limitations:**

1. **No Mid-Research Pivots**: You''re forced to predict all your research needs before seeing any results
2. **Unknown Unknowns**: The AI may discover important terms, concepts, or tangents you''d want to explore, but has no way to ask
3. **Context Loss**: Once the session ends, all context is lost—you start from scratch next time
4. **Opaque Reasoning**: You rarely see the AI''s thought process or search strategies

### The Solution: An Iterative Deep Research Agent

What if instead of this rigid flow, your research assistant could:

- ✅ **Ask clarifying questions throughout the research process**, not just at the start
- ✅ **Maintain persistent context** via memory and file logging across the entire session
- ✅ **Show transparent reasoning** so you understand the AI''s thought process
- ✅ **Provide tool visibility** for trust and education
- ✅ **Manage comprehensive workflows** with explicit todo tracking

This is exactly what we built with the Deep Research Agent.

---

## 2. ChatGPT vs Iterative Deep Research Agent: A Side-by-Side Comparison

### 2.1 ChatGPT''s Research Mode

```
User: "Research quantum computing"

ChatGPT:
  → Asks 1-5 clarifying questions upfront
  → User answers
  → Conducts research in one pass (hidden)
  → Returns final report
  → Session ends (context lost)
```

**Limitations in Practice:**

- ❌ **No mid-research pivots** — Can''t redirect focus based on discoveries
- ❌ **Can''t clarify new terms** — Unknown acronyms during research are skipped or guessed
- ❌ **No way to dig deeper** — Unexpected interesting findings can''t be explored
- ❌ **Context doesn''t persist** — Next session starts from zero

### 2.2 Deep Research Agent''s Iterative Approach

```
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
```

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

```
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
```

### 3.2 Core Components Explained

#### The Agent Factory

At the heart of our system is the `createDeepAgent` function from the DeepAgents library:

```typescript
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
```

**Let''s break down each parameter:**

| Parameter | Purpose | Why It Matters |
|-----------|---------|----------------|
| `name` | Unique identifier | Must follow Azure OpenAI naming conventions |
| `model` | The LLM to use | GPT-5-Mini for optimal cost/capability balance |
| `systemPrompt` | Agent instructions | Defines the iterative research workflow |
| `tools` | Available capabilities | Web search, file writing, todo management |
| `store` | Memory storage | Persists context across interactions |
| `backend` | State management | Composite of state and memory backends |

#### The Model Configuration

```typescript
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
```

**Why Azure OpenAI?**
- Enterprise-grade reliability
- Consistent API behavior
- Fine-grained access control
- Better rate limiting for production use

### 3.3 The CompositeBackend Pattern

The `CompositeBackend` is a crucial architectural decision that allows us to combine different storage strategies:

```typescript
backend: (config) => new CompositeBackend(
    new StateBackend(config),          // Primary: Agent execution state
    { "/memories/": new StoreBackend(config) },  // Route: Memory persistence
),
```

**This pattern provides:**

1. **State Isolation**: Agent execution state is separate from conversation memory
2. **Path-Based Routing**: Different paths can use different backends
3. **Scalability**: Easy to add new backends for specific use cases
4. **Persistence**: Memory survives across agent invocations

---

## 4. Implementation Guide

### 4.1 Project Setup

First, create your project structure:

```bash
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
```

### 4.2 Dependencies

```json
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
```

### 4.3 Environment Variables

```bash
# Azure OpenAI Configuration
AZURE_OPENAI_API_KEY=your_key_here
AZURE_OPENAI_API_ENDPOINT=https://your-instance.openai.azure.com/
AZURE_OPENAI_API_DEPLOYMENT_NAME=gpt-5-mini
AZURE_OPENAI_API_INSTANCE_NAME=your-instance-name

# Tavily API for Web Search
TAVILY_API_KEY=your_tavily_key_here
```

### 4.4 Building the Web Search Tool

The web search tool is the agent''s primary research capability:

```typescript
// backend/tools/web-search-tool/index.ts

import { TavilySearch, TopicType } from "@langchain/tavily";
import { tool } from "langchain";
import { z } from "zod";

/**
 * Web search tool schema
 * Defines the parameters for web search operations
 */
const webSearchSchema = z.object({
    query: z.string().describe("The search query string"),
    max_results: z.number().min(1).max(100).default(50)
        .describe("Maximum number of results to return."),
    topic: z.enum(["general", "news"]).optional()
        .describe("Topic category for search"),
    includeRawContent: z.boolean().default(false)
        .describe("Whether to include raw HTML content"),
});

/**
 * Interface for a formatted source from search results
 */
interface SearchSource {
    title: string;
    url: string;
    content: string;
    score: number;
}

/**
 * Interface for the enhanced search response
 */
interface EnhancedSearchResponse {
    query: string;
    results: SearchSource[];
    summary?: string;
    totalResults: number;
    responseTime: number;
}

/**
 * Web search tool using Tavily API
 *
 * Returns structured search results with sources formatted for easy consumption
 */
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

            // Parse and structure the response
            let parsedResponse: any;
            try {
                parsedResponse = typeof rawResponse === ''string''
                    ? JSON.parse(rawResponse)
                    : rawResponse;
            } catch {
                parsedResponse = rawResponse;
            }

            // Format sources from results
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
                error: `Search failed: ${error instanceof Error ? error.message : String(error)}`
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
```

**Key Design Decisions:**

1. **Structured Output**: Returns normalized data regardless of raw API response format
2. **Error Resilience**: Gracefully handles failures with informative error messages
3. **Flexible Parameters**: Supports topic filtering and result limits
4. **Relevance Scoring**: Includes scores for result prioritization

---

## 5. The Iterative Research Workflow

The heart of what makes this agent different is its **7-step iterative research workflow**. Unlike traditional agents that process a query in one pass, our agent follows a structured methodology that allows for continuous refinement.

### 5.1 The Seven Steps

![iterative research workflow](https://wdtiaofugxxinuohhnsn.supabase.co/storage/v1/object/sign/blog-content-images/iterative-research-agent-technical/iterative-research-workflow.PNG?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNTQ3ODllMS1jY2QzLTQ4NGMtOWM3Yi1jOTQ2MDY5NGRiNDIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJibG9nLWNvbnRlbnQtaW1hZ2VzL2l0ZXJhdGl2ZS1yZXNlYXJjaC1hZ2VudC10ZWNobmljYWwvaXRlcmF0aXZlLXJlc2VhcmNoLXdvcmtmbG93LlBORyIsImlhdCI6MTc2NjUyMzUxNSwiZXhwIjoxODYxMTMxNTE1fQ.xFHMxPVVXmw_U0bz2qg8eG8ub43frNS0oO4GdauwcbQ)

```
┌─────────────────────────────────────────────────────────────┐
│                 ITERATIVE RESEARCH WORKFLOW                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Step 1: UNDERSTAND & CLARIFY                               │
│  ├─ Read user query carefully                               │
│  ├─ Identify ambiguous or broad elements                    │
│  ├─ Research unknown terms via web_search                   │
│  ├─ Ask clarifying questions                                │
│  └─ Log to conversation_history.md                          │
│              ↓                                              │
│  Step 2: ORGANIZE & PLAN                                    │
│  ├─ Outline research plan                                   │
│  ├─ Define search strategies                                │
│  ├─ Note plan in memory and files                           │
│  └─ Update todo list                                        │
│              ↓                                              │
│  Step 3: ITERATIVE SEARCH                                   │
│  ├─ Execute targeted search queries                         │
│  ├─ Clarify new unknown terms as discovered                 │
│  ├─ Gather 20+ sources per topic                            │
│  ├─ Evaluate credibility and relevance                      │
│  └─ Update research_questions_and_search_results.md         │
│              ↓                                              │
│  Step 4: SYNTHESIS & ANALYSIS                               │
│  ├─ Review all gathered sources                             │
│  ├─ Organize by theme and perspective                       │
│  ├─ Identify consensus and contradictions                   │
│  └─ Find knowledge gaps                                     │
│              ↓                                              │
│  Step 5: DOCUMENTATION                                      │
│  ├─ Save conversation and findings                          │
│  ├─ Update both log files                                   │
│  └─ Maintain full context                                   │
│              ↓                                              │
│  Step 6: COMPOSE REPORT                                     │
│  ├─ Structure in academic format                            │
│  ├─ Include methodology section                             │
│  ├─ Full citations and references                           │
│  └─ Critical analysis                                       │
│              ↓                                              │
│  Step 7: ONGOING WORKFLOW                                   │
│  ├─ Handle follow-up questions                              │
│  ├─ Recall all prior context                                │
│  └─ Integrate new guidance seamlessly                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 Critical Clarification Points

The agent is instructed to **interrupt and ask for clarification** in these situations:

1. **Unknown Terms**: "If you encounter any unfamiliar term or acronym in the user''s request, immediately use your ''web_search'' tool to research and understand its meaning before proceeding."

2. **Ambiguous Scope**: "If the request is ambiguous or broad, break it into specific, actionable sub-questions."

3. **Mid-Research Discoveries**: When encountering significant new concepts during research, the agent can pause to ask if the user wants to explore them.

### 5.3 The Pause-and-Review Pattern

A unique aspect of the workflow is the mandatory **pause-and-review** after each step:

```
After this step, pause and review your work.
Update your todo list using the ''todo'' tool,
keeping all outstanding sub-questions or tasks listed.
Never exceed 15 items—condense/combine as needed.
```

This pattern ensures:
- No tasks are forgotten
- Progress is tracked explicitly
- The agent doesn''t get lost in recursive loops
- Work is documented at every stage

---

## 6. Persistent Context: Memory and File Logging

### 6.1 The Dual-File Strategy

The agent maintains two persistent markdown files throughout the research session:

#### File 1: `research_questions_and_search_results.md`

```markdown
# Research Session: Quantum Error Correction

## Original Query
"Research quantum computing error correction approaches"

## Clarifications
- User focus: Error correction specifically
- Scope: Both theoretical and practical approaches
- Depth: Detailed comparisons needed

## Sub-Questions
1. What are the main approaches to quantum error correction?
2. How do topological qubits differ from other approaches?
3. What are surface codes and how do they work?
4. Current implementation status of each approach?

## Search Queries Executed
| Query | Results | Top Sources |
|-------|---------|-------------|
| "quantum error correction methods 2024" | 47 | IBM, Google, Nature |
| "topological qubits vs surface codes" | 32 | Microsoft, arXiv |
| "magic state distillation practical" | 28 | Physical Review |

## Key Findings Summary
### Topological Qubits
- Approach: Uses anyons for inherent error protection
- Leader: Microsoft (Station Q)
- Status: Theoretical advantage, experimental challenges
- Sources: [1], [2], [3]

### Surface Codes
- Approach: Uses many physical qubits per logical qubit
- Leaders: Google, IBM
- Status: Most practical near-term approach
- Sources: [4], [5], [6]

## Source Credibility Assessment
| Source | Type | Credibility | Notes |
|--------|------|-------------|-------|
| Nature Paper [1] | Peer-reviewed | High | Recent (2024) |
| arXiv Preprint [4] | Pre-print | Medium | Not peer-reviewed yet |
```

#### File 2: `conversation_history.md`

```markdown
# Conversation Log

## Session Start: 2024-12-07 10:30 AM

### User [10:30]
Research quantum computing error correction approaches

### Agent [10:30]
I''d like to clarify a few things before diving into the research:
1. Are you interested in theoretical approaches, practical implementations, or both?
2. Should I focus on any specific hardware platform (superconducting, trapped ions, etc.)?
3. What''s your technical background - should I explain fundamental concepts?

### User [10:32]
Focus on practical implementations across platforms. I have a physics background,
so technical details are fine.

### Agent [10:32]
Perfect, I''ll dive deep into implementations. Let me start by researching
the current state of quantum error correction...

[Research in progress - searching for "quantum error correction practical implementations 2024"]

### Agent [10:35]
I''ve discovered an interesting distinction between "topological qubits" and
"surface codes" that seems fundamental. Both are error correction approaches,
but they work very differently:

- **Topological qubits**: Hardware-level error protection (Microsoft''s approach)
- **Surface codes**: Software-level error correction (Google/IBM approach)

Should I compare these two paradigms in detail, or focus on one?

### User [10:36]
Compare both in detail - that''s exactly what I need to understand.

### Agent [10:36]
Excellent choice. I''ll now research each approach comprehensively...
```

### 6.2 Memory Store Architecture

Beyond file logging, the agent uses `InMemoryStore` for in-session context:

```typescript
store: new InMemoryStore(),
backend: (config) => new CompositeBackend(
    new StateBackend(config),
    { "/memories/": new StoreBackend(config) },
),
```

**What Gets Stored:**

| Memory Type | Purpose | Persistence |
|-------------|---------|-------------|
| Conversation | Full dialogue history | Session + Files |
| Findings | Research results | Session + Files |
| User Preferences | Communication style, depth | Session |
| Todo State | Current task list | Session |
| Clarifications | Resolved ambiguities | Session + Files |

### 6.3 Why Both Memory AND Files?

**Memory (InMemoryStore):**
- Fast retrieval during session
- Structured data access
- Contextual recall for LLM

**Files (Markdown logs):**
- Human-readable
- Survives agent restarts
- Can be shared/exported
- External reference

---

## 7. Tool Integration and Visibility

### 7.1 The Tool Transparency Philosophy

Unlike some AI assistants that hide their research process, this agent exposes every tool call:

```typescript
// From the API response structure
const tools: ToolInfo[] = agentMessages
    .filter((msg: any) => msg.type === "tool")
    .map((msg: any) => ({
        type: msg.name || "unknown_tool",
        state: "output-available" as const,
        input: msg.input || {},
        output: JSON.stringify(msg.output || msg.content, null, 2),
    }));
```

### 7.2 What Users See

When the agent performs research, users see:

```
┌─────────────────────────────────────────────────────────────┐
│  🔧 Tool: web_search                                        │
├─────────────────────────────────────────────────────────────┤
│  Input:                                                     │
│  {                                                          │
│    "query": "quantum error correction surface codes 2024",  │
│    "max_results": 50,                                       │
│    "topic": "general"                                       │
│  }                                                          │
├─────────────────────────────────────────────────────────────┤
│  Output:                                                    │
│  {                                                          │
│    "query": "quantum error correction surface codes 2024",  │
│    "totalResults": 47,                                      │
│    "responseTime": 1.23,                                    │
│    "results": [                                             │
│      {                                                      │
│        "title": "Google Achieves Quantum Error...",         │
│        "url": "https://nature.com/...",                     │
│        "content": "In a breakthrough...",                   │
│        "score": 0.95                                        │
│      },                                                     │
│      ...                                                    │
│    ]                                                        │
│  }                                                          │
└─────────────────────────────────────────────────────────────┘
```

### 7.3 Why Visibility Matters

**For Trust:**
- Users can verify the agent is actually searching
- No "hallucinated" sources
- Transparent methodology

**For Education:**
- Users learn effective search strategies
- Understanding of research process
- Can replicate methodology manually

**For Debugging:**
- Easy to identify failed searches
- Can adjust queries based on results
- Clear error attribution

### 7.4 The Todo Tool

The todo tool enforces structured task management:

```
┌─────────────────────────────────────────────────────────────┐
│  📋 Current Todo List (7/15 items)                          │
├─────────────────────────────────────────────────────────────┤
│  ✅ [DONE] Clarify user requirements                        │
│  ✅ [DONE] Research topological qubits basics               │
│  ✅ [DONE] Research surface codes basics                    │
│  ⏳ [IN PROGRESS] Compare error rates                       │
│  ⬜ [PENDING] Research implementation challenges            │
│  ⬜ [PENDING] Find recent experimental results              │
│  ⬜ [PENDING] Compile final report                          │
└─────────────────────────────────────────────────────────────┘
```

**The 15-Item Limit Rule:**

> "To avoid infinite recursion of todo creation, your todo list may never exceed 15 items—combine, condense, or reprioritize to stay within this quota."

This constraint forces the agent to:
- Prioritize effectively
- Complete tasks before adding new ones
- Combine related tasks
- Avoid analysis paralysis

---

## 8. Building the API Layer

### 8.1 The Research API Endpoint

```typescript
// app/api/research/route.ts

import { deepResearchAgent } from "@/backend/agents/deep-research-agent";
import { NextRequest, NextResponse } from "next/server";

/**
 * Research API endpoint that processes research queries
 * using the deep research agent
 *
 * @route POST /api/research
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { query } = body;

        // Validation
        if (!query || typeof query !== "string") {
            return NextResponse.json(
                { error: "Query is required and must be a string" },
                { status: 400 }
            );
        }

        // Environment checks
        if (!process.env.AZURE_OPENAI_API_KEY) {
            return NextResponse.json(
                { error: "Server configuration error: Missing API credentials" },
                { status: 500 }
            );
        }

        console.log(`[Research API] Processing query: ${query.substring(0, 100)}...`);

        // Invoke the agent
        const startTime = Date.now();
        const response = await deepResearchAgent.invoke({
            messages: [
                {
                    role: "user",
                    content: query,
                }
            ]
        }, {
            recursionLimit: 100,  // Allow deep research chains
        });

        const duration = Date.now() - startTime;

        // Extract and format response
        const agentMessages = response.messages || [];
        const lastMessage = agentMessages[agentMessages.length - 1];

        // Extract tools used
        const tools = agentMessages
            .filter((msg: any) => msg.type === "tool")
            .map((msg: any) => ({
                type: msg.name || "unknown_tool",
                state: "output-available",
                input: msg.input || {},
                output: JSON.stringify(msg.output || msg.content, null, 2),
            }));

        // Build sources from web search results
        const sources = tools
            .filter(tool => tool.type === "web_search")
            .flatMap(tool => {
                try {
                    const output = JSON.parse(tool.output);
                    return (output.results || []).map((result: any) => ({
                        title: result.title || "Untitled",
                        url: result.url || "#",
                        description: result.content || "",
                        score: result.score || 0,
                    }));
                } catch {
                    return [];
                }
            });

        // Extract reasoning
        const reasoning = agentMessages
            .filter((msg: any) => msg.type === "thinking" || msg.type === "reasoning")
            .map((msg: any) => msg.content)
            .join("\n\n") || "Analyzed the query and formulated a research strategy.";

        return NextResponse.json({
            content: lastMessage?.content || "No response generated",
            sources: sources.slice(0, 5),
            reasoning,
            tools,
            metadata: {
                query,
                duration,
                timestamp: new Date().toISOString(),
            }
        });

    } catch (error) {
        console.error("[Research API] Error:", error);
        return NextResponse.json(
            {
                error: "Failed to process research query",
                details: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        );
    }
}
```

### 8.2 Response Structure

```typescript
interface ResearchResponse {
    // The main research output
    content: string;

    // Top 5 sources used
    sources: Array<{
        title: string;
        url: string;
        description: string;
        score: number;
    }>;

    // Agent''s reasoning process
    reasoning: string;

    // All tool calls made
    tools: Array<{
        type: string;
        state: "output-available";
        input: Record<string, unknown>;
        output: string;
    }>;

    // Request metadata
    metadata: {
        query: string;
        duration: number;  // milliseconds
        timestamp: string; // ISO 8601
    };
}
```

### 8.3 Health Check Endpoint

```typescript
/**
 * Health check endpoint
 * @route GET /api/research
 */
export async function GET() {
    const requiredEnvVars = [
        "AZURE_OPENAI_API_KEY",
        "AZURE_OPENAI_API_DEPLOYMENT_NAME",
        "AZURE_OPENAI_API_INSTANCE_NAME",
        "TAVILY_API_KEY",
    ];

    const missingVars = requiredEnvVars.filter(
        (varName) => !process.env[varName]
    );

    return NextResponse.json({
        status: missingVars.length === 0 ? "ready" : "misconfigured",
        service: "Deep Research Agent API",
        version: "1.0.0",
        ...(missingVars.length > 0 && {
            missingEnvironmentVariables: missingVars,
        }),
    });
}
```

---

## 9. Practical Examples and Use Cases

### 9.1 Example: Technical Research with Iterative Clarification

**Initial Query:**
```
"Research the best database for my application"
```

**Agent Response (Clarification):**
```
Before I can recommend the best database, I need to understand your requirements:

1. **Scale**: How much data do you expect? (MB, GB, TB, PB?)
2. **Access Patterns**: Read-heavy, write-heavy, or balanced?
3. **Data Structure**: Relational, document, key-value, graph, or time-series?
4. **Consistency**: Do you need ACID compliance or is eventual consistency acceptable?
5. **Deployment**: Cloud-managed, self-hosted, or hybrid?

Could you clarify these points?
```

**User Clarification:**
```
It''s for a social media app - lots of reads, millions of users,
mostly document-like posts, cloud-managed preferred.
```

**Agent Continues Research:**
```
Got it! I''ll research document databases optimized for read-heavy social media workloads.

🔧 Searching: "best document database social media high read scalability 2024"

Based on my initial search, I''m seeing three main contenders:
- MongoDB Atlas
- Amazon DynamoDB
- Firebase Firestore

However, I discovered that for social media specifically, some teams are using
"dual-database patterns" with a caching layer. Should I include hybrid
architectures in my research, or focus purely on single-database solutions?
```

### 9.2 Example: Research with Unknown Term Discovery

**Initial Query:**
```
"Research CRISPR applications in agriculture"
```

**Agent Mid-Research Discovery:**
```
During my research, I encountered several specialized techniques I should
clarify before proceeding:

🔧 Searching: "CRISPR base editing vs prime editing difference"

I discovered that CRISPR now encompasses multiple techniques:
- **Base Editing**: Changes single DNA letters without cutting
- **Prime Editing**: "Search and replace" for DNA
- **Traditional CRISPR-Cas9**: Cuts DNA at specific locations

Each has different agricultural applications. Should I:
A) Cover all three approaches comprehensively
B) Focus on the most practical for current agriculture (base editing)
C) Focus on the most powerful for future applications (prime editing)
```

### 9.3 Example: Multi-Session Research Continuity

**Session 1:**
```
User: "Research renewable energy storage solutions"

Agent: [Completes initial research on battery technologies]

--- Logged to research_questions_and_search_results.md ---
- Lithium-ion dominates current market
- Solid-state batteries are next generation
- Flow batteries for grid-scale
- User showed interest in grid-scale solutions
```

**Session 2 (Days Later):**
```
User: "Continue my energy storage research - focus on cost"

Agent: [Recalls previous session from files]

I see from our previous session that you were interested in grid-scale
storage solutions. I had researched:
- Flow batteries (vanadium, zinc-bromine)
- Solid-state batteries
- Lithium-ion grid systems

Should I now focus cost analysis on:
A) All three technologies for comparison
B) Just flow batteries (best for grid-scale based on our discussion)
C) Include emerging technologies like iron-air batteries

I can also pull up my previous source list if you''d like to continue
from specific papers.
```

---

## 10. Performance and Best Practices

### 10.1 Optimizing Agent Performance

**1. Recursion Limit Tuning**

```typescript
const response = await deepResearchAgent.invoke({
    messages: [{ role: "user", content: query }]
}, {
    recursionLimit: 100,  // Adjust based on research depth needed
});
```

| Use Case | Recommended Limit | Rationale |
|----------|------------------|-----------|
| Quick facts | 20-30 | Limited search depth needed |
| Standard research | 50-75 | Balanced depth and speed |
| Deep research | 100-150 | Comprehensive coverage |
| Exhaustive analysis | 200+ | Maximum thoroughness |

**2. Search Result Limits**

```typescript
max_results: z.number().min(1).max(100).default(50)
```

- **20-30**: Quick overviews
- **50**: Standard research (recommended default)
- **75-100**: When breadth is critical

**3. Memory Management**

For long sessions, consider implementing memory summarization:

```typescript
// Periodically summarize older context
if (memorySize > THRESHOLD) {
    await agent.invoke({
        messages: [{
            role: "system",
            content: "Summarize the key findings so far for context efficiency"
        }]
    });
}
```

### 10.2 Error Handling Best Practices

**1. Graceful Search Failures**

```typescript
try {
    const results = await webSearchTool.invoke(params);
    return results;
} catch (error) {
    // Return structured error, don''t crash
    return {
        query: params.query,
        results: [],
        totalResults: 0,
        error: `Search failed: ${error.message}`
    };
}
```

**2. Timeout Management**

```typescript
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 30000);

try {
    const response = await agent.invoke(input, {
        signal: controller.signal
    });
    return response;
} finally {
    clearTimeout(timeout);
}
```

**3. Retry Logic**

```typescript
async function invokeWithRetry(agent, input, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await agent.invoke(input);
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            await sleep(Math.pow(2, i) * 1000); // Exponential backoff
        }
    }
}
```

### 10.3 Security Considerations

**1. Input Sanitization**

```typescript
// Validate and sanitize user queries
if (!query || typeof query !== "string") {
    return NextResponse.json(
        { error: "Query is required and must be a string" },
        { status: 400 }
    );
}

// Length limits
if (query.length > 10000) {
    return NextResponse.json(
        { error: "Query exceeds maximum length" },
        { status: 400 }
    );
}
```

**2. API Key Protection**

```typescript
// Never expose keys in responses
if (!process.env.AZURE_OPENAI_API_KEY) {
    return NextResponse.json(
        { error: "Server configuration error" }, // Generic message
        { status: 500 }
    );
}
```

**3. Rate Limiting**

Consider implementing rate limiting at the API layer:

```typescript
// Example with a simple in-memory rate limiter
const rateLimiter = new RateLimiter({
    windowMs: 60000,  // 1 minute
    max: 10           // 10 requests per window
});
```

---

## 11. Conclusion and Future Directions

### 11.1 What We Built

We''ve created a Deep Research Agent that fundamentally differs from traditional AI research tools:

| Capability | Traditional AI | Our Deep Research Agent |
|------------|----------------|------------------------|
| Clarification | Front-loaded only | Throughout entire process |
| Context | Session-limited | Persistent via memory + files |
| Transparency | Black box | Full tool visibility |
| Task Management | None | Explicit todo tracking |
| Documentation | Manual | Automatic dual-file logging |
| Research Depth | Single-pass | Iterative multi-step |

### 11.2 Key Takeaways

1. **Iterative > Front-loaded**: Research needs evolve as discoveries are made. An agent that can ask questions throughout produces better results.

2. **Persistence Matters**: Combining in-memory storage with file logging provides both performance and durability.

3. **Transparency Builds Trust**: Showing every search query and result helps users understand and verify the research process.

4. **Structured Workflows Prevent Chaos**: The 7-step methodology with todo management keeps research focused and complete.

5. **Composable Architecture Scales**: The backend pattern allows adding new capabilities without restructuring.

### 11.3 Future Enhancements

**Near-term:**
- [ ] Real-time streaming responses
- [ ] Export to PDF/Word formats
- [ ] Research session branching
- [ ] Collaborative multi-user sessions

**Medium-term:**
- [ ] Custom tool integration (databases, APIs)
- [ ] Fine-tuned domain-specific models
- [ ] Citation format customization
- [ ] Research templates

**Long-term:**
- [ ] Multi-agent collaboration
- [ ] Automated fact-checking
- [ ] Knowledge graph integration
- [ ] Proactive research suggestions

### 11.4 Getting Started

Ready to build your own Deep Research Agent? Here''s your checklist:

1. ✅ Set up Azure OpenAI and Tavily API accounts
2. ✅ Clone the project structure
3. ✅ Configure environment variables
4. ✅ Install dependencies
5. ✅ Customize the system prompt for your use case
6. ✅ Deploy and iterate!

---

## Resources

- **LangChain Docs**: [js.langchain.com](https://js.langchain.com)
- **DeepAgents**: [deepagents.dev](https://deepagents.dev)
- **Tavily API**: [tavily.com](https://tavily.com)
- **Azure OpenAI**: [Azure AI Services](https://azure.microsoft.com/en-us/products/ai-services/openai-service)

---

*Built with ❤️ using Next.js, TypeScript, LangChain, and DeepAgents*',
  'https://wdtiaofugxxinuohhnsn.supabase.co/storage/v1/object/sign/blog-thumbnails/building-smarter-research-assistant-beginners-guide.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNTQ3ODllMS1jY2QzLTQ4NGMtOWM3Yi1jOTQ2MDY5NGRiNDIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJibG9nLXRodW1ibmFpbHMvYnVpbGRpbmctc21hcnRlci1yZXNlYXJjaC1hc3Npc3RhbnQtYmVnaW5uZXJzLWd1aWRlLnBuZyIsImlhdCI6MTc2NjUyMzkwMywiZXhwIjoxODYxMTMxOTAzfQ.l_IehmRigf7AO65cIpNVElBCKs6PpQ1FPT6x5hwirwc',
  'Babangida Tsowa',
  '/profile-image.png',
  'Fullstack Developer, AI Engineer & Technology Consultant',
  NOW(),
  'AI Engineering',
  ARRAY['AI', 'LangChain', 'DeepAgents', 'Azure OpenAI', 'TypeScript', 'Next.js', 'Research Agents', 'AI Architecture', 'Tutorial'],
  25,
  true,
  true
);
