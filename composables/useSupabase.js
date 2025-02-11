import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nvmjtwycbuszbgrtyklr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52bWp0d3ljYnVzemJncnR5a2xyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxNDkxMzksImV4cCI6MjA1NDcyNTEzOX0.WHovOtCr5itWfLZgNvASJ11mKspyX3nbpzgEq2fwFiY";

export const useSupabase = () => {
  return createClient(supabaseUrl, supabaseAnonKey);
};
