// lib/get-user.ts
import { createClient } from '../utils/supabase/server'; 
import { cache } from 'react';

export const getUser = cache(async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data.user;
});

