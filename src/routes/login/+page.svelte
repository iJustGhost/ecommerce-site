<script>
    import { goto } from '$app/navigation';
    import { supabase } from '$lib/supaBaseClient';
    import { base } from '$app/paths';
    import { onMount } from 'svelte';

    let email = $state('');
    let password = $state('');
    let error = $state('');
    let loading = $state(false);

    onMount(async () => {
        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
            goto(base + '/admin');
            return; 
        }
    });

    async function handleLogin() {
        loading = true;
        error = '';

        try {
            // 1. Attempt to sign in with Supabase Auth
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (authError) {
                error = authError.message;
            } else {
                // 2. If successful, redirect to the admin dashboard
                // Supabase stores the session automatically
                goto(base + '/admin');
            }
        } catch (err) {
            error = 'An unexpected error occurred. Please try again.';
            console.error(err);
        } finally {
            loading = false;
        }
    }
</script>

<div class="min-h-screen bg-gray-50 flex items-center justify-center p-6">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <!-- Header with Theme -->
        <div class="bg-goddess-50 p-8 text-center border-b border-goddess-100">
            <div class="text-5xl mb-2">✿</div>
            <h1 class="text-2xl font-serif font-bold text-goddess-700">Admin Access</h1>
            <p class="text-gray-500 text-sm mt-1">Please log in to manage bookings</p>
        </div>

        <!-- Login Form -->
        <div class="p-8">
            <form onsubmit={handleLogin} class="space-y-6">
                {#if error}
                    <div class="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 text-sm rounded">
                        {error}
                    </div>
                {/if}

                <!-- Email Input -->
                <div>
                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        bind:value={email}
                        class="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-goddess-500 focus:border-transparent transition"
                        placeholder="admin@example.com"
                        required
                    />
                </div>

                <!-- Password Input -->
                <div>
                    <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                        id="password"
                        type="password"
                        bind:value={password}
                        class="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-goddess-500 focus:border-transparent transition"
                        placeholder="Enter password"
                        required
                    />
                </div>

                <!-- Submit Button -->
                <div class="pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        class="cursor-pointer w-full bg-goddess-600 hover:bg-goddess-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200 flex justify-center items-center"
                    >
                        {#if loading}
                            <!-- Loading Spinner -->
                            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Signing In...
                        {:else}
                            Sign In
                        {/if}
                    </button>
                </div>
            </form>
        </div>

        <!-- Footer -->
        <div class="bg-gray-50 px-8 py-4 border-t border-gray-100 text-center">
            <a href="/" class="text-xs text-gray-500 hover:text-goddess-600 transition">
                ← Back to Home
            </a>
        </div>
    </div>
</div>