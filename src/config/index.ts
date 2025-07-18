import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 8000,
  nodeEnv: process.env.NODE_ENV || 'development',
  // supabase: {
  //   url: process.env.SUPABASE_URL!,
  //   anonKey: process.env.SUPABASE_ANON_KEY!
  // },
  tscApi: {
    url: process.env.TSC_API_URL!,
    token: process.env.TSC_API_TOKEN!
  }
};