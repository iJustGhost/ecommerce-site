<script>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supaBaseClient';
    import { goto } from '$app/navigation';
    import { base } from '$app/paths';

    let books = $state([]);
    let loading = $state(true);

    // 1. Check session AND fetch data on mount
    onMount(async () => {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            goto(base + '/');
            return; 
        }

        await fetchBooks();
    });

    async function fetchBooks() {
        const { data, error } = await supabase
            .from('books')
            .select('*')
            .order('preferredDate', { ascending: false });

        if (error) {
            console.error('Error fetching books:', error);
        } else {
            books = data;
        }
        loading = false;
    }

    async function deleteBook(id) {
        if (!confirm('Are you sure you want to delete this booking?')) return;

        const { error } = await supabase.from('books').delete().eq('id', id);

        if (error) {
            console.error('Error deleting:', error);
            alert('Failed to delete entry');
        } else {
            books = books.filter((book) => book.id !== id);
        }
    }

    async function handleLogout() {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            goto(base + '/');
        } else {
            console.error('Error logging out:', error);
        }
    }

    function formatDate(dateString) {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }
</script>

<!-- Force body margin to 0 -->
<style>
    :global(body) {
        margin: 0;
        padding: 0;
    }
</style>

<div class="min-h-screen bg-gray-50 pb-12 pt-0">
    <!-- Header -->
    <div class="bg-white shadow-sm sticky top-0 z-40 mt-0">
        <div class="container mx-auto px-6 py-4 flex justify-between items-center">
            <h1 class="text-2xl font-serif font-bold text-goddess-600">Admin Dashboard</h1>
            <button
                onclick={handleLogout}
                class="cursor-pointer px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-goddess-600 transition text-sm font-medium flex items-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 0h-8A1.5 1.5 0 0 0 0 1.5v9A1.5 1.5 0 0 0 1.5 13h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                    <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                </svg>
                Logout
            </button>
        </div>
    </div>

    <!-- Content -->
    <div class="container mx-auto px-6 py-8">
        {#if loading}
            <p class="text-center text-gray-500 mt-10">Loading bookings...</p>
        {:else}
            {#if books.length === 0}
                <div class="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                    <p class="text-gray-500 text-lg">No bookings found.</p>
                    <p class="text-gray-400 text-sm mt-2">New bookings will appear here.</p>
                </div>
            {:else}
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {#each books as book (book.id)}
                        <!-- Card -->
                        <div class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
                            <div class="p-6 grow flex flex-col">
                                <!-- Name & Badge -->
                                <div class="flex justify-between items-start mb-4">
                                    <h2 class="font-serif text-xl font-bold text-gray-800 truncate w-full pr-4" title={book.fullName}>
                                        {book.fullName || 'Unknown Name'}
                                    </h2>
                                </div>
                                
                                <!-- Details List -->
                                <div class="space-y-3 grow">
                                    <!-- Service -->
                                    <div class="flex items-center text-sm">
                                        <span class="text-gray-400 font-medium w-20 shrink-0">Service:</span>
                                        <span class="font-semibold text-goddess-700 truncate">
                                            {book.service || '-'}
                                        </span>
                                    </div>

                                    <!-- Phone -->
                                    <div class="flex items-center text-gray-600 text-sm">
                                        <svg class="w-4 h-4 mr-2 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                        </svg>
                                        <span class="truncate">{book.phoneNumber || '-'}</span>
                                    </div>

                                    <!-- Preferred Date -->
                                    <div class="flex items-center text-gray-500 text-xs">
                                        <svg class="w-4 h-4 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                        {formatDate(book.preferredDate)}
                                    </div>

                                    <!-- GCash Ref -->
                                    <div class="bg-green-50 border border-green-100 rounded-lg p-3 flex items-center justify-between mt-3 shadow-sm">
                                        <span class="text-[10px] text-green-600 font-bold uppercase tracking-wider shrink-0">
                                            GCash Ref
                                        </span>
                                        <span class="font-mono text-base text-green-900 font-bold tracking-widest select-all">
                                            {book.gcashRef || 'N/A'}
                                        </span>
                                    </div>

                                    <!-- Special Requests -->
                                    {#if book.specialRequests}
                                        <div class="mt-4 pt-3 border-t border-gray-100">
                                            <p class="text-xs text-gray-400 font-bold uppercase mb-1">Special Requests</p>
                                            <p class="text-gray-600 text-sm italic line-clamp-3" title={book.specialRequests}>
                                                "{book.specialRequests}"
                                            </p>
                                        </div>
                                    {/if}
                                </div>
                            </div>

                            <!-- Delete Button Area -->
                            <div class="bg-gray-50 px-6 py-3 border-t border-gray-100 mt-auto">
                                <button
                                    onclick={() => deleteBook(book.id)}
                                    class="cursor-pointer w-full flex justify-center items-center text-red-500 hover:text-red-700 hover:bg-red-50 py-2 rounded-lg transition duration-200 text-sm font-medium"
                                >
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                    Delete Entry
                                </button>
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}
        {/if}
    </div>
</div>