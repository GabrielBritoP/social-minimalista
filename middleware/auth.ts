export default defineNuxtRouteMiddleware(async (to, _from) => {
    const { $supabase } = useNuxtApp();
    const { data: session } = await $supabase.auth.getSession();

    if (!session?.session) {
        return navigateTo('/login');
    }
});
