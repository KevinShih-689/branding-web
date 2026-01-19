import { supabase } from '@/lib/supabase/client';
import { type AuthTokenResponsePassword } from '@supabase/supabase-js';

export class AuthRepository {
  async signInWithPassword(email: string, password: string): Promise<AuthTokenResponsePassword> {
    const authResponse = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return authResponse;
  }
}
