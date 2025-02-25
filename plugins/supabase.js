import { createClient } from '@supabase/supabase-js';

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();

    const supabase = createClient(config.public.supabaseUrl, config.public.supabaseAnonKey);

    // Injeta o Supabase no contexto do Nuxt
    nuxtApp.provide('supabase', supabase);
});
