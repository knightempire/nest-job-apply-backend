import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkSupabaseConnection() {
  try {
    console.log('Supabase Base URL:', SUPABASE_URL);
    // Try a simple query
    const { error } = await supabase.from('jobs').select('*').limit(1);
    if (error) {
      console.log('Supabase DB is unconnected:', error.message);
    } else {
      console.log('Supabase DB is connected');
    }
  } catch (err) {
    console.log('Supabase DB is unconnected:', err);
  }
}

void checkSupabaseConnection();

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
