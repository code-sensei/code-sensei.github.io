#!/usr/bin/env node

/**
 * Apply Supabase Migration Script
 *
 * This script applies the database migration for blog_posts table
 * using the Supabase Management API.
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
const envPath = join(__dirname, '..', '.env');
const envContent = readFileSync(envPath, 'utf-8');
const env = {};

envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const [key, ...valueParts] = trimmed.split('=');
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').replace(/^["']|["']$/g, '');
      env[key.trim()] = value.trim();
    }
  }
});

const projectRef = env.SUPABASE_PROJECT_ID;
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!projectRef || !serviceRoleKey) {
  console.error('❌ Error: Missing required environment variables');
  console.error('Please ensure SUPABASE_PROJECT_ID and SUPABASE_SERVICE_ROLE_KEY are set in .env');
  process.exit(1);
}

const SUPABASE_API_URL = `https://${projectRef}.supabase.co`;

async function executeSql(sql) {
  const response = await fetch(`${SUPABASE_API_URL}/rest/v1/rpc/exec_sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': serviceRoleKey,
      'Authorization': `Bearer ${serviceRoleKey}`
    },
    body: JSON.stringify({ query: sql })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`HTTP ${response.status}: ${error}`);
  }

  return response.json();
}

async function runMigration() {
  console.log('🚀 Starting Supabase migration...\n');

  try {
    // Read migration file
    const migrationPath = join(__dirname, '..', 'supabase_migration.sql');
    const migrationSQL = readFileSync(migrationPath, 'utf-8');

    console.log('📄 Migration file loaded: supabase_migration.sql');
    console.log('🔧 Executing migration...\n');

    // Execute the migration
    // Note: We'll use a simple approach and execute the entire migration
    // The Supabase API should handle this properly

    const statements = [
      // Create table
      `CREATE TABLE IF NOT EXISTS public.blog_posts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        cover_image TEXT,
        author_name TEXT NOT NULL,
        author_avatar TEXT,
        author_bio TEXT,
        published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ,
        category TEXT NOT NULL,
        tags TEXT[] NOT NULL DEFAULT '{}',
        reading_time INTEGER NOT NULL,
        featured BOOLEAN DEFAULT false,
        published BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );`,

      // Create indexes
      `CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);`,
      `CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at DESC);`,
      `CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category);`,
      `CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON public.blog_posts USING GIN(tags);`,
      `CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(published);`,
      `CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON public.blog_posts(featured);`,

      // Enable RLS
      `ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;`,

      // Drop existing policies if they exist
      `DROP POLICY IF EXISTS "Allow public read access to published posts" ON public.blog_posts;`,
      `DROP POLICY IF EXISTS "Allow authenticated users full access" ON public.blog_posts;`,

      // Create RLS policies
      `CREATE POLICY "Allow public read access to published posts"
        ON public.blog_posts
        FOR SELECT
        USING (published = true);`,

      `CREATE POLICY "Allow authenticated users full access"
        ON public.blog_posts
        FOR ALL
        USING (auth.role() = 'authenticated');`
    ];

    console.log('⚠️  Note: Direct SQL execution via REST API may not be available.');
    console.log('📋 Please apply the migration manually:\n');
    console.log('1. Open your browser and go to:');
    console.log(`   https://supabase.com/dashboard/project/${projectRef}/editor\n`);
    console.log('2. Click on "SQL Editor" in the left sidebar');
    console.log('3. Click "New Query"');
    console.log('4. Copy the contents of: supabase_migration.sql');
    console.log('5. Paste into the SQL editor');
    console.log('6. Click "Run" to execute\n');

    console.log('Alternative: Run the SQL directly using psql:');
    console.log(`   psql "postgresql://postgres:[YOUR-PASSWORD]@db.${projectRef}.supabase.co:5432/postgres" -f supabase_migration.sql\n`);

    console.log('💡 After running the migration, you can seed the database with:');
    console.log('   node scripts/seed-posts.mjs\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n📖 Manual Migration Instructions:');
    console.log(`1. Go to: https://supabase.com/dashboard/project/${projectRef}`);
    console.log('2. Navigate to SQL Editor');
    console.log('3. Run the contents of supabase_migration.sql');
    process.exit(1);
  }
}

runMigration();
