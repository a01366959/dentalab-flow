import { supabase } from '@/integrations/supabase/client';

// Example usage of the Supabase client
export async function getMessages() {
  const { data, error } = await supabase
    .from('messages')
    .select('*');

  if (error) {
    console.error('Error fetching messages:', error);
    return [];
  }

  return data;
}
