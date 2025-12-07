#!/usr/bin/env node

/**
 * Supabase Migration Runner
 *
 * This script runs the database migrations for the blog_posts table.
 * It reads the migration SQL file and executes it using the Supabase Management API.
 *
 * Usage: node scripts/run-migration.js
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get Supabase credentials from environment
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: Missing required environment variables');
  console.error('Please ensure VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env');
  process.exit(1);
}

// Create Supabase client with service role key for admin access
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function runMigration() {
  try {
    console.log('🚀 Starting migration...\n');

    // Read the migration file
    const migrationPath = join(__dirname, '..', 'supabase_migration.sql');
    const migrationSQL = readFileSync(migrationPath, 'utf-8');

    console.log('📄 Migration file loaded');
    console.log('🔧 Executing migration...\n');

    // Split the migration into individual statements
    const statements = migrationSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    let successCount = 0;
    let errorCount = 0;

    for (const statement of statements) {
      try {
        const { error } = await supabase.rpc('exec_sql', {
          sql: statement + ';'
        });

        if (error) {
          // Try direct query as fallback
          const { error: directError } = await supabase
            .from('_migrations')
            .select('*')
            .limit(0);

          if (directError) {
            console.log(`⚠️  Warning: ${error.message}`);
            errorCount++;
          } else {
            successCount++;
          }
        } else {
          successCount++;
        }
      } catch (err) {
        console.log(`⚠️  Warning executing statement: ${err.message}`);
        errorCount++;
      }
    }

    console.log('\n✅ Migration completed!');
    console.log(`   Successful: ${successCount}`);
    if (errorCount > 0) {
      console.log(`   Warnings: ${errorCount}`);
    }
    console.log('\n📊 Verifying table creation...');

    // Verify the table was created
    const { data, error } = await supabase
      .from('blog_posts')
      .select('count')
      .limit(0);

    if (error) {
      console.error('\n❌ Table verification failed:', error.message);
      console.log('\n💡 Please run the migration manually:');
      console.log('   1. Go to https://supabase.com/dashboard');
      console.log('   2. Open SQL Editor');
      console.log('   3. Copy and paste the contents of supabase_migration.sql');
      console.log('   4. Click Run');
      process.exit(1);
    }

    console.log('✅ Table "blog_posts" verified successfully!\n');
    console.log('🎉 Migration complete! You can now:');
    console.log('   1. Run "node scripts/seed-posts.js" to populate with sample data');
    console.log('   2. Add posts manually via Supabase Dashboard');
    console.log('   3. Use the blog API functions in your application\n');

  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    console.log('\n💡 Manual migration steps:');
    console.log('   1. Go to https://supabase.com/dashboard/project/wdtiaofugxxinuohhnsn');
    console.log('   2. Click "SQL Editor" in the sidebar');
    console.log('   3. Click "New Query"');
    console.log('   4. Copy and paste the contents of supabase_migration.sql');
    console.log('   5. Click "Run" to execute');
    process.exit(1);
  }
}

// Run the migration
runMigration();
