import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://debhtqsghwajamycacpg.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlYmh0cXNnaHdhamFteWNhY3BnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwODU4MzAsImV4cCI6MjA5NDY2MTgzMH0.jx6VGCzCCM1lzxm5ewoVPbxPvq1-dI_x0bX813o6ZoM";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);