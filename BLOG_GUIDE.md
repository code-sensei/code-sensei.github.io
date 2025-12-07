# Blog Management Guide

This guide explains how to add, edit, and manage blog posts in your portfolio.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Adding a New Blog Post](#adding-a-new-blog-post)
3. [Blog Post Structure](#blog-post-structure)
4. [Markdown Features](#markdown-features)
5. [Images and Media](#images-and-media)
6. [Categories and Tags](#categories-and-tags)
7. [Publishing Workflow](#publishing-workflow)
8. [Compatible Markdown Editors](#compatible-markdown-editors)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)

---

## Quick Start

Your blog posts are stored in: `src/data/blog/posts.ts`

To add a new post:
1. Open `src/data/blog/posts.ts`
2. Copy an existing post object
3. Modify the content
4. Save and commit

## Adding a New Blog Post

### Step 1: Create the Blog Post Object

Add a new object to the `blogPosts` array in `src/data/blog/posts.ts`:

```typescript
{
  id: "5", // Increment the ID
  title: "Your Post Title",
  slug: "your-post-slug", // URL-friendly version of title
  excerpt: "A brief summary (150-200 characters)",
  content: `# Your Post Title

Your markdown content goes here...

## Section 1

Content for section 1...
`,
  coverImage: "/blog/your-image.jpg", // Optional
  author: {
    name: "Babangida Tsowa",
    avatar: "/profile-image.png",
    bio: "Fullstack Developer, AI Engineer & Technology Consultant",
  },
  publishedAt: "2024-01-20T10:00:00Z", // ISO 8601 format
  updatedAt: "2024-01-20T10:00:00Z", // Optional
  category: "Web Development", // Choose from existing categories
  tags: ["React", "JavaScript", "Tutorial"], // Array of tags
  readingTime: 8, // Estimated minutes
  featured: false, // true for featured posts
  published: true, // false to keep as draft
}
```

### Step 2: Generate a Slug

The slug should be:
- URL-friendly (lowercase, hyphens instead of spaces)
- Descriptive
- Unique

Example: "Building Scalable AI Systems" → `building-scalable-ai-systems`

### Step 3: Calculate Reading Time

Estimate 200-250 words per minute. You can use this formula:
```
Reading Time = (Word Count / 225) rounded up
```

### Step 4: Add Categories (if new)

If adding a new category, update the `categories` array:

```typescript
export const categories: string[] = [
  "All",
  "AI Engineering",
  "Web Development",
  "Career",
  "Leadership",
  "Technology",
  "Your New Category", // Add here
];
```

## Blog Post Structure

### Metadata Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier |
| `title` | string | Yes | Post title (50-60 chars ideal) |
| `slug` | string | Yes | URL-friendly identifier |
| `excerpt` | string | Yes | Brief summary (150-200 chars) |
| `content` | string | Yes | Full markdown content |
| `coverImage` | string | No | Path to cover image |
| `author` | object | Yes | Author information |
| `publishedAt` | string | Yes | ISO 8601 timestamp |
| `updatedAt` | string | No | Last update timestamp |
| `category` | string | Yes | Post category |
| `tags` | string[] | Yes | Array of tags |
| `readingTime` | number | Yes | Minutes to read |
| `featured` | boolean | No | Display in featured section |
| `published` | boolean | No | Draft vs published |

### Content Guidelines

**Title Best Practices:**
- Clear and descriptive
- 50-60 characters (SEO optimal)
- Include keywords naturally
- Use title case

**Excerpt Best Practices:**
- 150-200 characters
- Summarize key takeaway
- Include target keyword
- Make it compelling

## Markdown Features

Your blog supports full GitHub Flavored Markdown (GFM) with custom styling.

### Headings

```markdown
# H1 - Main Title (use once)
## H2 - Major Sections
### H3 - Subsections
#### H4 - Minor Points
```

### Text Formatting

```markdown
**Bold text**
*Italic text*
***Bold and italic***
~~Strikethrough~~
```

### Lists

**Unordered:**
```markdown
- Item 1
- Item 2
  - Nested item
  - Another nested item
```

**Ordered:**
```markdown
1. First item
2. Second item
3. Third item
```

### Links

```markdown
[Link text](https://example.com)
[Link with title](https://example.com "Hover title")
```

### Code

**Inline code:**
```markdown
Use `const variable = value` for inline code.
```

**Code blocks:**
````markdown
```typescript
function example() {
  console.log("Hello, World!");
}
```
````

Supported languages: typescript, javascript, python, bash, json, css, html, jsx, tsx, etc.

### Blockquotes

```markdown
> This is a blockquote.
> It can span multiple lines.
```

### Images

```markdown
![Alt text](/path/to/image.jpg)
![Alt text with title](/path/to/image.jpg "Image title")
```

### Tables

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

### Horizontal Rules

```markdown
---
```

### Task Lists

```markdown
- [x] Completed task
- [ ] Incomplete task
- [ ] Another task
```

## Images and Media

### Adding Images

**Option 1: Public Directory**
1. Place images in `public/blog/`
2. Reference in markdown: `![Description](/blog/image-name.jpg)`

**Option 2: External URLs**
```markdown
![Description](https://example.com/image.jpg)
```

### Image Best Practices

- Use descriptive alt text
- Optimize images (WebP format, compressed)
- Recommended sizes:
  - Cover images: 1200x630px
  - Inline images: 800px max width
- Name files descriptively: `react-performance-chart.jpg`

### Cover Images

Set in the post metadata:
```typescript
coverImage: "/blog/your-cover-image.jpg",
```

If not provided, a default image will be used.

## Categories and Tags

### Categories

Categories represent broad topics. Choose ONE category per post:

- **AI Engineering**: Machine learning, AI systems, ML ops
- **Web Development**: Frontend, backend, fullstack
- **Career**: Professional growth, leadership, advice
- **Leadership**: Management, team building, CTO insights
- **Technology**: General tech trends, tools, innovations

### Tags

Tags are specific topics. Use 3-7 tags per post:

**Good tags:**
- Specific: "React Hooks", "TypeScript"
- Relevant: Match post content
- Consistent: Use existing tags when possible
- Searchable: Think of what readers would search

**Examples:**
```typescript
tags: ["React", "Performance", "Optimization", "JavaScript", "Frontend"]
```

### Creating New Categories

1. Add to `categories` array in `posts.ts`
2. Keep category names concise (1-3 words)
3. Ensure clear differentiation from existing categories

## Publishing Workflow

### Draft Posts

Keep posts as drafts by setting:
```typescript
published: false
```

Draft posts won't appear on the blog but can be accessed directly via URL (useful for previewing).

### Publishing Checklist

Before setting `published: true`:

- [ ] Title is clear and compelling
- [ ] Excerpt is concise and engaging
- [ ] Content is well-formatted
- [ ] Code blocks use proper syntax highlighting
- [ ] Images are optimized and have alt text
- [ ] Links are valid and open in new tabs
- [ ] Reading time is accurate
- [ ] Category and tags are appropriate
- [ ] Author info is correct
- [ ] No spelling/grammar errors

### Updating Posts

1. Modify the post content
2. Update `updatedAt` timestamp:
```typescript
updatedAt: "2024-01-25T14:30:00Z"
```
3. Save and commit changes

### Featured Posts

To feature a post on the homepage:
```typescript
featured: true
```

Only the most recent 3 featured posts appear on the homepage.

## Compatible Markdown Editors

### Recommended Editors

**1. VS Code (Best for developers)**
- Install "Markdown All in One" extension
- Real-time preview
- Integrated with your workflow

**2. Typora**
- WYSIWYG markdown editor
- Clean interface
- Great for writing

**3. Mark Text**
- Free and open-source
- Live preview
- Cross-platform

**4. Obsidian**
- Powerful for note-taking
- Plugin ecosystem
- Local-first

**5. HackMD / HedgeDoc**
- Collaborative editing
- Real-time sync
- Web-based

### VS Code Setup

1. Install extensions:
   - Markdown All in One
   - Markdown Preview Enhanced
   - Code Spell Checker

2. Open preview:
   - Press `Ctrl+K V` (Windows/Linux)
   - Press `Cmd+K V` (Mac)

3. Write directly in `posts.ts` or external `.md` file, then copy content

### External File Workflow

**Option 1: Write in .md file**
```markdown
1. Create `drafts/my-post.md`
2. Write content
3. Copy to `content` field in posts.ts
4. Use template literals for multiline:
   content: `Your markdown here...`
```

**Option 2: Use online editor**
1. Write in HackMD, Notion, or Google Docs
2. Export as Markdown
3. Copy to posts.ts

## Best Practices

### Content

1. **Hook readers early**: Strong opening paragraph
2. **Use subheadings**: Break up long content
3. **Add code examples**: Practical, runnable code
4. **Include visuals**: Images, diagrams, screenshots
5. **Tell stories**: Personal experiences resonate
6. **Be specific**: Concrete examples over abstractions
7. **Edit ruthlessly**: Remove fluff, keep it concise

### SEO

1. **Title optimization**:
   - Include target keyword
   - Keep under 60 characters
   - Make it compelling

2. **Excerpt optimization**:
   - Include keyword
   - Clear value proposition
   - Call to action

3. **Tags**: Use relevant, searchable keywords

### Accessibility

1. **Alt text**: Describe images clearly
2. **Heading hierarchy**: Use proper H1→H2→H3 structure
3. **Link text**: Descriptive, not "click here"
4. **Code contrast**: Ensure readable syntax highlighting

### Performance

1. **Optimize images**: Compress before adding
2. **Limit media**: Balance visuals with load time
3. **External resources**: Minimize external dependencies

## Troubleshooting

### Post Not Appearing

**Check:**
- `published: true` is set
- ID is unique
- Slug is unique and URL-friendly
- Post is in `blogPosts` array
- No syntax errors in `posts.ts`

### Markdown Not Rendering

**Check:**
- Content is wrapped in template literals: `` `content` ``
- Special characters are properly escaped
- Code blocks use proper syntax: ````typescript````
- Closing backticks are present

### Images Not Loading

**Check:**
- Path starts with `/` for public directory
- File exists in `public/blog/`
- File name matches exactly (case-sensitive)
- Image format is supported (jpg, png, gif, webp)

### Code Highlighting Not Working

**Ensure:**
- Language is specified: ````typescript````
- Language is supported by highlight.js
- No extra spaces in language declaration

### TypeScript Errors

**Common issues:**
- Missing comma between posts
- Unclosed strings or template literals
- Invalid date format (use ISO 8601)
- Missing required fields

**Fix:**
```bash
npm run dev  # Check for errors in terminal
```

### Build Errors

**If build fails:**
1. Check syntax in `posts.ts`
2. Ensure all imports are correct
3. Verify TypeScript types match
4. Clear cache: `rm -rf node_modules/.vite`

## Advanced Features

### Custom Components (Future)

You can extend markdown rendering by modifying the `components` prop in `BlogPost.tsx`:

```typescript
<ReactMarkdown
  components={{
    // Custom component for videos
    video: ({ src }) => (
      <video controls className="w-full rounded-xl my-8">
        <source src={src} type="video/mp4" />
      </video>
    ),
    // Add more custom components
  }}
>
  {post.content}
</ReactMarkdown>
```

### Series/Related Posts

Add a `series` field to group related posts:

```typescript
series: {
  name: "React Performance Series",
  order: 1,
  total: 3
}
```

### Table of Contents

Add at the beginning of long posts:

```markdown
## Table of Contents

1. [Introduction](#introduction)
2. [Main Section](#main-section)
3. [Conclusion](#conclusion)
```

## Need Help?

- Check existing posts for examples
- Review TypeScript types in `src/types/blog.ts`
- Test locally before committing: `npm run dev`
- Commit regularly with descriptive messages

---

**Happy Blogging! 📝✨**