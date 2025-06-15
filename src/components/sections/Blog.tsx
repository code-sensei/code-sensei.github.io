
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Blog = () => {
  const blogPosts = [
    {
      title: 'Building Scalable React Applications',
      excerpt: 'Learn best practices for architecting large-scale React applications that maintain performance and code quality.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop',
      date: 'March 15, 2024',
      readTime: '8 min read',
      tags: ['React', 'Architecture', 'Performance'],
    },
    {
      title: 'The Future of Web Development',
      excerpt: 'Exploring emerging trends and technologies that are shaping the future of web development.',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=250&fit=crop',
      date: 'March 8, 2024',
      readTime: '6 min read',
      tags: ['Web Development', 'Trends', 'Future'],
    },
    {
      title: 'Mastering TypeScript for Better Code',
      excerpt: 'How TypeScript can improve your development experience and help you write more maintainable code.',
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=250&fit=crop',
      date: 'February 28, 2024',
      readTime: '10 min read',
      tags: ['TypeScript', 'Code Quality', 'Development'],
    },
  ];

  return (
    <section id="blog" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Latest Blog Posts</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sharing my thoughts on web development, technology trends, and best practices
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <Card key={index} className="group hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                    {post.readTime}
                  </span>
                </div>
              </div>
              <CardHeader>
                <div className="text-sm text-muted-foreground mb-2">{post.date}</div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline">
            View All Posts
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
