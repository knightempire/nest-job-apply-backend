import { Controller, Get, Post, Body } from '@nestjs/common';
import { supabase } from './app.module';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // GET / -> hi dev, db status
  @Get()
  async root() {
    // Check DB status
    let dbStatus = 'unknown';
    try {
      const { error } = await supabase.from('jobs').select('*').limit(1);
      dbStatus = error ? 'unconnected' : 'connected';
    } catch {
      dbStatus = 'unconnected';
    }
    return { message: 'hi dev', db: dbStatus };
  }

  // POST /add -> add job
  @Post('add')
  async addJob(@Body() body: any) {
    // Ensure created_time is set
    const jobToInsert = {
      ...body,
      created_time: body.created_time || new Date().toISOString(),
    };
    const { data, error } = await supabase.from('jobs').insert([jobToInsert]);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data };
  }

  // GET /get -> fetch all jobs
  @Get('get')
  async getJobs() {
    const { data, error } = await supabase.from('jobs').select('*');
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data };
  }
}
