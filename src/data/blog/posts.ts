import { BlogPost } from "@/types/blog";
import {
  getBlogPosts as getSupabasePosts,
  getFeaturedPosts as getSupabaseFeatured,
  getPostBySlug as getSupabasePostBySlug,
  getPostsByCategory as getSupabasePostsByCategory,
  getPostsByTag as getSupabasePostsByTag,
  getAllTags as getSupabaseAllTags,
  getAllCategories as getSupabaseAllCategories,
} from "@/lib/api/blog";

// Static fallback data
const staticBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Scalable AI Systems: Lessons from Production",
    slug: "building-scalable-ai-systems",
    excerpt:
      "Discover the key principles and best practices I've learned while building and deploying AI systems at scale for government and enterprise clients.",
    content: `# Building Scalable AI Systems: Lessons from Production

Building AI systems that work in production is vastly different from creating proof-of-concepts. Over the past few years, I've had the privilege of working on large-scale AI projects for government agencies and enterprises. Here are the key lessons I've learned.

## 1. Start with the Problem, Not the Technology

One of the biggest mistakes I see is teams rushing to implement the latest AI model without fully understanding the business problem. Before writing a single line of code, ask:

- What specific problem are we solving?
- What does success look like?
- Can this be solved without AI?

At the Ministry of Foreign Affairs, we improved data processing efficiency by 35% not by using the most complex model, but by carefully understanding the workflow and building targeted solutions.

## 2. Data Quality Trumps Model Complexity

The quality of your data matters more than the sophistication of your model. I've seen simple models with clean data outperform complex architectures trained on messy datasets.

### Best Practices for Data Quality:

- Implement robust data validation pipelines
- Create automated data quality checks
- Document data lineage and transformations
- Regular audits and monitoring

## 3. Infrastructure Matters

Your AI system is only as good as its infrastructure. Key considerations:

- **Scalability**: Can it handle 10x traffic?
- **Monitoring**: Real-time performance tracking
- **Fallback mechanisms**: What happens when the model fails?
- **Version control**: For both code and models

## 4. Security and Privacy Are Non-Negotiable

Especially in government and healthcare sectors, security must be baked in from day one:

- End-to-end encryption
- Access control and audit logs
- Regular security assessments
- Compliance with regulations (GDPR, HIPAA, etc.)

## 5. Continuous Learning and Adaptation

AI systems need continuous improvement:

- Monitor model drift
- Collect feedback loops
- Regular retraining schedules
- A/B testing for improvements

## Conclusion

Building production AI systems requires a holistic approach that goes beyond just training models. It's about understanding the problem, ensuring data quality, building robust infrastructure, maintaining security, and continuously improving.

What challenges have you faced in building AI systems? Share your experiences in the comments!

---

*This post is based on my experience building AI solutions for organizations including the Federal Ministry of Foreign Affairs and various tech startups.*`,
    coverImage: "/blog/ai-systems.jpg",
    author: {
      name: "Babangida Tsowa",
      avatar: "/profile-image.png",
      bio: "Fullstack Developer, AI Engineer & Technology Consultant",
    },
    publishedAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    category: "AI Engineering",
    tags: [
      "AI",
      "Machine Learning",
      "Production",
      "Best Practices",
      "Architecture",
    ],
    readingTime: 8,
    featured: true,
    published: true,
  },
  {
    id: "2",
    title: "React Performance Optimization: Real-World Techniques",
    slug: "react-performance-optimization",
    excerpt:
      "Learn practical React performance optimization techniques that I've used to improve load times and user experience in production applications.",
    content: `# React Performance Optimization: Real-World Techniques

Performance is crucial for user experience. Here are proven techniques I've used to optimize React applications serving thousands of users.

## 1. Code Splitting and Lazy Loading

Don't load everything at once. Split your code:

\`\`\`typescript
import React, { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./components/Dashboard'));
const Settings = lazy(() => import('./components/Settings'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}
\`\`\`

## 2. Memoization Strategies

Use \`React.memo\`, \`useMemo\`, and \`useCallback\` wisely:

\`\`\`typescript
const ExpensiveComponent = React.memo(({ data }) => {
  const processedData = useMemo(() => {
    return heavyComputation(data);
  }, [data]);

  const handleClick = useCallback(() => {
    console.log('Clicked!');
  }, []);

  return <div onClick={handleClick}>{processedData}</div>;
});
\`\`\`

## 3. Virtual Scrolling for Large Lists

At Clafiya, we had to render lists with 1000+ items. Virtual scrolling was a game-changer:

\`\`\`typescript
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          {items[index].name}
        </div>
      )}
    </FixedSizeList>
  );
}
\`\`\`

## 4. Image Optimization

Images often account for most of your page weight:

- Use next-gen formats (WebP, AVIF)
- Lazy load images below the fold
- Use responsive images
- Compress properly

\`\`\`typescript
<img
  src="/image.jpg"
  srcSet="/image-400.jpg 400w, /image-800.jpg 800w"
  sizes="(max-width: 600px) 400px, 800px"
  loading="lazy"
  alt="Description"
/>
\`\`\`

## 5. State Management Optimization

Keep state as local as possible:

- Don't lift state unnecessarily
- Use context wisely (split contexts)
- Consider state management libraries for complex apps

## 6. Bundle Analysis

Regularly analyze your bundle:

\`\`\`bash
npm run build
npx vite-bundle-visualizer
\`\`\`

This helped me identify a library that was adding 200KB unnecessarily!

## Measuring Performance

Use the built-in tools:

\`\`\`typescript
import { Profiler } from 'react';

function onRenderCallback(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) {
  console.log(\`\${id} took \${actualDuration}ms\`);
}

<Profiler id="Dashboard" onRender={onRenderCallback}>
  <Dashboard />
</Profiler>
\`\`\`

## Conclusion

Performance optimization is an ongoing process. Start with measurements, identify bottlenecks, and apply these techniques where they matter most.

What performance techniques have worked for you?`,
    coverImage: "/blog/react-performance.jpg",
    author: {
      name: "Babangida Tsowa",
      avatar: "/profile-image.png",
      bio: "Fullstack Developer, AI Engineer & Technology Consultant",
    },
    publishedAt: "2024-01-10T14:30:00Z",
    category: "Web Development",
    tags: ["React", "Performance", "Optimization", "JavaScript", "Frontend"],
    readingTime: 6,
    featured: true,
    published: true,
  },
  {
    id: "3",
    title: "My Journey: From Student to CTO",
    slug: "journey-student-to-cto",
    excerpt:
      "Reflections on my career journey from organizing hackathons at university to becoming a CTO, and the lessons learned along the way.",
    content: `# My Journey: From Student to CTO

Looking back at my career journey, I'm amazed at how far I've come. From organizing coding competitions in university to leading technology strategy as a CTO. Here's my story.

## The Beginning: University Days

At FUTMINNA, I wasn't just focused on getting good grades. I was:

- Organizing Google Hash Code Competitions
- Leading NACOSS as Director of Software
- Co-founding FUTMINNA DevCircle
- Running workshops and bootcamps

These experiences taught me leadership, community building, and the importance of giving back.

## First Steps in the Industry

My first professional role was at Asusu Technology as a Full Stack Developer. Key lessons:

1. **Communication is crucial**: Technical skills aren't enough
2. **Learn the business**: Understand why you're building what you're building
3. **Embrace feedback**: Every code review is a learning opportunity

## The Pivot to Web3 and Blockchain

Working with Quantum Tech LLC on Web3 projects opened my eyes to decentralized technologies. I learned:

- New paradigms require new thinking
- The importance of security in decentralized systems
- How to work with global, distributed teams

## Scaling at Clafiya

At Clafiya, I led frontend development that helped secure $610,000 in Series A funding. This taught me:

- **Impact matters**: Your code directly affects business outcomes
- **Architecture for scale**: Building for 10 users vs 1000+ is different
- **Team collaboration**: Working with cross-functional teams

## Becoming a CTO

As CTO at SweetRide Nigeria, I learned that leadership is about:

- **Vision**: Setting technical direction
- **Mentorship**: Growing your team
- **Strategy**: Balancing innovation with stability
- **Execution**: Shipping products that matter

## Working with Government

My work with the Federal Ministry of Foreign Affairs taught me:

- The unique challenges of government tech
- The importance of security and compliance
- How technology can improve national capabilities
- The responsibility that comes with handling sensitive data

## Key Lessons

1. **Never stop learning**: Technology evolves rapidly
2. **Build in public**: Share your knowledge
3. **Give back**: Mentor others
4. **Focus on impact**: Not just cool tech
5. **Balance**: Technical excellence with business value

## What's Next?

I'm excited about:

- AI governance and ethics
- Digital transformation in Africa
- Mentoring the next generation
- Building solutions that matter

## My Advice to Aspiring Developers

1. Start building today
2. Contribute to open source
3. Network and attend events
4. Don't just code—understand the business
5. Be patient—success takes time

What's your career story? I'd love to hear it!`,
    coverImage: "/blog/career-journey.jpg",
    author: {
      name: "Babangida Tsowa",
      avatar: "/profile-image.png",
      bio: "Fullstack Developer, AI Engineer & Technology Consultant",
    },
    publishedAt: "2024-01-05T09:00:00Z",
    category: "Career",
    tags: ["Career", "Leadership", "CTO", "Personal Story", "Advice"],
    readingTime: 7,
    featured: false,
    published: true,
  },
  {
    id: "4",
    title: "TypeScript Best Practices for Large Projects",
    slug: "typescript-best-practices",
    excerpt:
      "Essential TypeScript patterns and practices I use to maintain type safety and code quality in large-scale applications.",
    content: `# TypeScript Best Practices for Large Projects

TypeScript has become my go-to language for building large-scale applications. Here are the patterns and practices that have served me well.

## 1. Strict Mode is Your Friend

Always enable strict mode in \`tsconfig.json\`:

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
\`\`\`

## 2. Type Inference Over Explicit Types

Let TypeScript do the work:

\`\`\`typescript
// ❌ Bad
const numbers: number[] = [1, 2, 3];

// ✅ Good
const numbers = [1, 2, 3];
\`\`\`

## 3. Use Discriminated Unions

Perfect for state management:

\`\`\`typescript
type State =
  | { status: 'loading' }
  | { status: 'success'; data: User[] }
  | { status: 'error'; error: Error };

function handleState(state: State) {
  switch (state.status) {
    case 'loading':
      return <Spinner />;
    case 'success':
      return <UserList users={state.data} />;
    case 'error':
      return <Error message={state.error.message} />;
  }
}
\`\`\`

## 4. Utility Types Are Powerful

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Omit sensitive fields
type PublicUser = Omit<User, 'password'>;

// Make all fields optional
type PartialUser = Partial<User>;

// Pick specific fields
type UserCredentials = Pick<User, 'email' | 'password'>;
\`\`\`

## 5. Generic Constraints

\`\`\`typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: 'John', age: 30 };
const name = getProperty(user, 'name'); // string
\`\`\`

## 6. Type Guards

\`\`\`typescript
interface Dog {
  bark(): void;
}

interface Cat {
  meow(): void;
}

function isDog(animal: Dog | Cat): animal is Dog {
  return (animal as Dog).bark !== undefined;
}

function makeSound(animal: Dog | Cat) {
  if (isDog(animal)) {
    animal.bark(); // TypeScript knows it's a Dog
  } else {
    animal.meow(); // TypeScript knows it's a Cat
  }
}
\`\`\`

## Conclusion

TypeScript is a powerful tool when used correctly. These practices have helped me build maintainable, bug-free applications at scale.`,
    coverImage: "/blog/typescript.jpg",
    author: {
      name: "Babangida Tsowa",
      avatar: "/profile-image.png",
      bio: "Fullstack Developer, AI Engineer & Technology Consultant",
    },
    publishedAt: "2024-01-02T11:00:00Z",
    category: "Web Development",
    tags: ["TypeScript", "JavaScript", "Best Practices", "Programming"],
    readingTime: 5,
    featured: false,
    published: true,
  },
];

export const categories: string[] = [
  "All",
  "AI Engineering",
  "Web Development",
  "Career",
  "Leadership",
  "Technology",
];

// Helper function to use Supabase with fallback to static data
async function withFallback<T>(
  supabaseFunc: () => Promise<T>,
  fallbackFunc: () => T,
): Promise<T> {
  try {
    const result = await supabaseFunc();
    // If result is an empty array or null, use fallback
    if (Array.isArray(result) && result.length === 0) {
      return fallbackFunc();
    }
    if (result === null || result === undefined) {
      return fallbackFunc();
    }
    return result;
  } catch (error) {
    console.warn("Falling back to static data:", error);
    return fallbackFunc();
  }
}

// Export functions that try Supabase first, then fall back to static data
export async function getBlogPosts(): Promise<BlogPost[]> {
  return withFallback(getSupabasePosts, () =>
    staticBlogPosts.filter((post) => post.published),
  );
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  return withFallback(getSupabaseFeatured, () =>
    staticBlogPosts.filter((post) => post.published && post.featured),
  );
}

export async function getPostBySlug(
  slug: string,
): Promise<BlogPost | undefined> {
  const result = await withFallback(
    () => getSupabasePostBySlug(slug),
    () =>
      staticBlogPosts.find((post) => post.slug === slug && post.published) ||
      null,
  );
  return result || undefined;
}

export async function getPostsByCategory(
  category: string,
): Promise<BlogPost[]> {
  return withFallback(
    () => getSupabasePostsByCategory(category),
    () => {
      if (category === "All") {
        return staticBlogPosts.filter((post) => post.published);
      }
      return staticBlogPosts.filter(
        (post) => post.published && post.category === category,
      );
    },
  );
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  return withFallback(
    () => getSupabasePostsByTag(tag),
    () =>
      staticBlogPosts.filter(
        (post) => post.published && post.tags.includes(tag),
      ),
  );
}

export async function getAllTags(): Promise<string[]> {
  return withFallback(getSupabaseAllTags, () => {
    const tags = new Set<string>();
    staticBlogPosts.forEach((post) => {
      if (post.published) {
        post.tags.forEach((tag) => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  });
}

export async function getAllCategories(): Promise<string[]> {
  return withFallback(getSupabaseAllCategories, () => categories);
}

// Export static data for direct access if needed
export { staticBlogPosts as blogPosts };
