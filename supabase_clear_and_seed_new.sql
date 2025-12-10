-- Clear all existing blog posts and seed with new research assistant article
-- Run this in Supabase SQL Editor

-- Delete all existing posts
DELETE FROM public.blog_posts;

-- Insert the new blog post about building a research assistant
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
  'How I Built a Deep Research Agent Better than ChatGPT',
  'building-smarter-research-assistant-beginners-guide',
  'Learn how to build an AI research assistant that asks better questions, remembers conversations, and conducts iterative research - no coding experience required to understand!',
  '
**Reading Time**: ~15 minutes
**Difficulty**: Beginner
**No coding experience required to understand the concepts!**

---

## What You''ll Learn

- 🤔 Why current AI research tools have limitations
- 💡 How to build an AI that asks better questions
- 🔄 What makes "iterative research" so powerful
- 🧠 How AI can remember things between conversations
- 🛠️ The basic building blocks of an AI research agent

---

## The Problem: AI Research Feels Like Ordering Coffee

Imagine you walk into a coffee shop, and before you can even think, the barista fires off five questions:

> "What size? What roast? Any milk? Sugar? Hot or iced?"

You answer quickly, they make your drink, and... it''s not quite what you wanted. Maybe you didn''t know they had oat milk. Maybe you would have chosen a different roast if you''d known they just got a new Colombian blend.

**This is exactly how most AI research tools work today.**

```
You: "Research electric cars for me"

AI: "Before I start, let me ask:
     1. Budget range?
     2. New or used?
     3. Preferred brands?
     4. Range requirements?
     5. Features you care about?"

You: [Answers all 5 questions]

AI: [Goes silent for a while...]

AI: "Here''s your complete report!"
    [Returns a long document]

You: "Wait, I didn''t know about solid-state batteries!
      Can you tell me more about those?"

AI: "Sorry, I''d need to start a new research session..."
```

**The problem?** You had to predict everything you''d want to know *before* learning anything new.

---

## The Solution: An AI That Keeps the Conversation Going

What if your AI assistant worked more like a helpful librarian?

```
You: "I want to research electric cars"

AI: "Great! Before I dive in, are you more interested in:
     - Buying one yourself?
     - Understanding the technology?
     - Environmental impact?
     - Industry trends?"

You: "I''m thinking of buying one"

AI: [Does some initial research...]

AI: "I found something interesting! There''s a new technology
     called ''solid-state batteries'' that could double the
     range of EVs in the next few years.

     Should I:
     A) Deep-dive into this new tech?
     B) Focus on cars available today?
     C) Compare both?"

You: "Ooh, tell me more about solid-state batteries!"

AI: [Continues research with new focus...]
```

See the difference? The AI:
- ✅ Asks questions **throughout** the research, not just at the start
- ✅ Shares interesting discoveries and asks if you want to explore them
- ✅ Adapts its focus based on what it finds
- ✅ Never makes you start over

**This is what we call an "Iterative Research Agent"** - and that''s what we''re going to build!

---

## Comparing: ChatGPT vs the Iterative Research Agent

Let''s look at this side by side:

| What Happens | ChatGPT Research | My Research Agent |
|--------------|-----------------|-------------------|
| **Questions Asked** | 1-5 at the very start | As many as needed, anytime |
| **During Research** | 🔇 Silent | 💬 Keeps you updated |
| **Interesting Discovery?** | Includes it or skips it | Asks: "Want me to explore this?" |
| **Confusing Term Found?** | Guesses what it means | Looks it up immediately |
| **Next Session** | Starts from scratch | Remembers everything |

---

## How Does It Work? (The Simple Version)

Think of the research agent like a really organized research assistant. Here''s what''s happening behind the scenes:

### 🧠 The Brain: An AI Language Model

This is the "thinking" part - it''s what understands your questions and writes the responses. We use a model called GPT-5-Mini (similar to what powers ChatGPT).

**Analogy**: This is like the researcher''s brain - it reads, thinks, and writes.

### 🔍 The Search Tool: Tavily

When the AI needs to find information, it searches the web using a tool called Tavily. It''s like giving your researcher access to a super-powered Google.

**Analogy**: This is like the researcher''s library card + internet connection.

### 📝 The Notebook: Memory + Files

The AI keeps two kinds of notes:
1. **Quick Memory**: For the current conversation (like short-term memory)
2. **Written Files**: Permanent notes that survive even if we close everything (like a research journal)

**Analogy**: This is like the researcher''s notepad AND their filing cabinet.

### ✅ The To-Do List

The AI maintains a checklist of what it needs to do. This keeps it organized and prevents it from forgetting tasks.

**Analogy**: This is like the researcher''s task list on their desk.

---

## The Research Process: 7 Simple Steps

Here''s how the agent conducts research, explained simply:

### Step 1: 🤔 Understand What You Want

The AI reads your question carefully. If anything is unclear, it asks for clarification. If it sees a word it doesn''t know, it looks it up first.

> **Example**: You ask about "CRISPR applications"
> AI thinks: "I know CRISPR is gene editing, but let me search to make sure I understand the latest applications before proceeding..."

### Step 2: 📋 Make a Plan

Before jumping into research, the AI outlines what it needs to find. Think of it as making a shopping list before going to the store.

> **Example Plan**:
> - [ ] Find what CRISPR is currently used for
> - [ ] Look up recent breakthroughs
> - [ ] Find challenges and limitations
> - [ ] Identify future possibilities

### Step 3: 🔍 Search and Learn

The AI performs multiple web searches, gathering information from many sources. If it finds confusing terms during research, it pauses to look them up.

> **Example**: While researching CRISPR, the AI encounters "base editing"
> AI: "I found a technique called ''base editing'' - let me quickly research what that means before continuing..."

### Step 4: 🧩 Put It All Together

After gathering information, the AI organizes everything by topic. It looks for:
- What most experts agree on
- Where experts disagree
- What''s still unknown

### Step 5: 💾 Save Everything

The AI saves all its work to two files:
1. `research_questions_and_search_results.md` - The actual research findings
2. `conversation_history.md` - Everything you''ve discussed

### Step 6: ✍️ Write the Report

Using all the gathered information, the AI writes a well-organized report with:
- A summary
- Detailed findings
- Sources and links
- Conclusions

### Step 7: 🔄 Keep Going

If you have follow-up questions, the AI remembers everything from before and continues seamlessly.

---

## What Makes This Special: The "Iterative" Part

The magic word here is **iterative**. It means "repeating and improving."

### Traditional AI Research:

```
Ask → Answer (done!)
```

### Iterative AI Research:

```
Ask → Clarify → Research → Discover → Clarify → Research →
Discover → Clarify → Research → ... → Final Answer
```

Each loop through this cycle makes the research better and more focused on what you actually need.

---

## Real Example: Planning a Trip

Let''s see how this works with a real example.

### You Say:
> "Help me research a trip to Japan"

### Traditional AI Would:
Ask about 5 questions upfront, then deliver a generic travel guide.

### The Research Agent Would:

**Round 1 - Understanding:**
> "I''d love to help with your Japan trip! To give you the best information:
> - When are you thinking of going?
> - How long would you like to stay?
> - Is this your first time visiting Japan?"

**You Say:** "First time, maybe 2 weeks in spring"

**Round 2 - Initial Research + Discovery:**
> "Perfect timing! I searched for ''Japan spring travel'' and discovered something important - there''s a specific 2-week window each spring called ''hanami'' (cherry blossom season). The dates change each year based on weather.
>
> Should I:
> A) Focus on planning around cherry blossom season specifically?
> B) Give you a general spring itinerary?
> C) Both?"

**You Say:** "Definitely cherry blossoms!"

**Round 3 - Deeper Research + New Discovery:**
> "Great choice! While researching cherry blossom spots, I found that Tokyo, Kyoto, and Osaka have blossoms at slightly different times (about 1 week apart).
>
> This means you could actually ''follow the blossoms'' by traveling south to north. Would you like me to research:
> A) A route that maximizes cherry blossom viewing?
> B) The best single city to see them?
> C) Compare both options?"

See how the AI discovered the "follow the blossoms" strategy through research, then asked if you wanted to explore it? **That''s iterative research in action!**

---

## The Two Files: Your Research Journal

The AI keeps two important files that you can look at anytime:

### File 1: Research Notes 📚
`research_questions_and_search_results.md`

```markdown
# Japan Spring Trip Research

## Your Original Question
"Help me research a trip to Japan" (first time, 2 weeks, spring)

## What We Clarified
- First-time visitor
- 2-week trip
- Focus: Cherry blossom season

## Searches Performed
1. "Japan spring travel best time" - Found 43 useful results
2. "Cherry blossom season Japan 2024" - Found 38 results
3. "Follow cherry blossoms Japan itinerary" - Found 22 results

## Key Findings
- Cherry blossoms typically bloom late March to early April
- Southern Japan blooms first, northern Japan last
- Peak viewing lasts about 1 week per location
- Most popular spots: Ueno Park (Tokyo), Maruyama Park (Kyoto)

## Sources
- japan-guide.com (reliable travel resource)
- japan.travel (official tourism site)
- [etc...]
```

### File 2: Our Conversation 💬
`conversation_history.md`

```markdown
# Conversation Log

## Session: March 15, 2024

### You Asked
"Help me research a trip to Japan"

### I Clarified
- When are you thinking of going?
- How long?
- First time?

### You Said
"First time, maybe 2 weeks in spring"

### I Discovered
Cherry blossom season is special - suggested focusing on "hanami"

### You Chose
"Definitely cherry blossoms!"

### I Discovered
Different cities bloom at different times - suggested "follow the blossoms" route

[continues...]
```

**Why two files?**
- The Research Notes are your *findings* (facts, sources, data)
- The Conversation History is your *discussion* (questions, decisions, preferences)

Together, they let you (or the AI in a future session) understand not just *what* was found, but *why* certain directions were chosen.

---

## The To-Do List: Staying Organized

To prevent the AI from getting confused or forgetting tasks, it maintains a to-do list:

```
📋 Research To-Do List (5 of 15 max)

✅ Understand user''s trip requirements
✅ Research cherry blossom timing
✅ Compare "follow blossoms" vs single city
⏳ Research accommodations near blossom spots
⬜ Find transportation options (JR Pass?)
```

**Why a maximum of 15 items?**

Without a limit, the AI might keep adding tasks forever and never finish anything. The 15-item limit forces it to:
- Finish tasks before adding new ones
- Combine related tasks together
- Focus on what''s important

It''s like having a notecard for your to-do list instead of an endless scroll - constraints help you focus!

---

## Building Blocks Simplified

If you''re curious about the technical side (but not ready for code), here are the main pieces:

### 1. The Agent Framework
Think of this as the "skeleton" that connects everything together. We use something called "DeepAgents" - it''s like a recipe that tells all the ingredients how to work together.

### 2. The Language Model
The "brain" that understands and generates text. We use GPT-5-Mini from Microsoft Azure - it''s smart but efficient (doesn''t cost too much to run).

### 3. The Search Engine
We don''t use regular Google. Instead, we use "Tavily" - a search engine specifically designed for AI agents. It returns clean, structured results that are easy for the AI to understand.

### 4. The Memory System
Two parts:
- **Quick Memory**: Like RAM in a computer - fast but temporary
- **File Storage**: Like a hard drive - permanent but slower

### 5. The Instructions
A detailed set of rules (about 100 lines) that tell the AI exactly how to behave. This is where we define the 7-step process and all the rules about asking questions and staying organized.

---

## What''s Next After Reading This?

### If you''re curious but not technical:
- Try using ChatGPT or similar tools and notice when you wish they would ask follow-up questions
- Think about research tasks where "iterative" would help you
- Check out tools like Perplexity AI which are moving in this direction

### If you want to learn more:
- Read the [technical version](./building-iterative-research-agent.md) of this article
- Learn about "prompt engineering" - the art of writing good AI instructions
- Explore LangChain documentation (beginner tutorials available)

### If you want to build something:
- Start with simple chatbot tutorials
- Learn about API basics (how programs talk to each other)
- Try the free tiers of OpenAI, Anthropic, or Google AI

---

## Key Takeaways

1. **🔄 Iterative > One-Shot**: Research gets better when you can clarify and redirect as you learn new things

2. **🧠 Memory Matters**: An AI that remembers your conversation is way more helpful than one that forgets

3. **👀 Transparency Builds Trust**: Seeing the AI''s work helps you trust (and improve) the results

4. **📋 Organization Prevents Chaos**: A simple to-do list keeps even AI from getting lost

5. **🤝 Conversation > Command**: The best research happens through dialogue, not one-way instructions

---

## Glossary: Terms We Used

| Term | Simple Explanation |
|------|-------------------|
| **Agent** | An AI program that can take actions (like searching) not just chat |
| **Iterative** | Doing something in repeated cycles, improving each time |
| **Language Model (LLM)** | AI that understands and generates human language |
| **API** | A way for programs to talk to each other |
| **Memory Store** | Where the AI keeps information it needs to remember |
| **Tool** | A capability we give the AI (like web search) |
| **Prompt** | The instructions we give to the AI |
| **Token** | How AI measures text (roughly 1 token = 3/4 of a word) |

---

## Questions? Curiosities?

Here are some questions you might be wondering about:

**Q: Is this better than ChatGPT?**
A: It''s different. ChatGPT is great for many things. The agent is specifically designed for deep, ongoing research where the direction might change as you learn.

**Q: Can I use this without knowing how to code?**
A: Not yet - it requires setting up a development environment. But understanding *how* it works helps you use any AI tool more effectively! I will also try to release a public version for use as soon as my schedule allows it. 😮‍💨

**Q: Why doesn''t ChatGPT work this way?**
A: It''s a design choice. ChatGPT is built to be general-purpose and handle millions of users. My approach requires more back-and-forth, which is better for deep research but slower for quick questions.

**Q: How expensive is this to run?**
A: Each search and AI response costs a small amount (fractions of a cent). A typical research session might cost $0.10-$0.50. Not free, but much cheaper than hiring a human researcher!

---

*Thanks for reading! If this article helped you understand AI research agents, consider sharing it with someone else who''s curious about how AI works.*

**Author**: Babangida Tsowa
**Last Updated**: December 7, 2024
**Companion Article**: [Technical Deep Dive](./building-iterative-research-agent.md)',
  '/blog/ai-research-assistant.jpg',
  'Babangida Tsowa',
  '/profile-image.png',
  'Fullstack Developer, AI Engineer & Technology Consultant',
  NOW(),
  'AI Engineering',
  ARRAY['AI', 'Research', 'Agents', 'Tutorial', 'Beginner-Friendly', 'LLM', 'Iterative Learning'],
  15,
  true,
  true
);

-- Verify the insert
SELECT id, title, slug, reading_time, featured FROM public.blog_posts;
