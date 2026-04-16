<script>
	let isMenuOpen = $state(false);
</script>

<header
    class="top-0 bg-white/90 backdrop-blur-md shadow-sm fixed z-50 w-full transition-all duration-300"
>
    <!-- Top Bar (Logo + Nav + Button) -->
    <div class="px-6 py-4 container mx-auto flex items-center justify-between whitespace-nowrap">
        <!-- Logo -->
        <a
            href="#"
            class="text-2xl font-serif font-bold text-goddess-600 tracking-wide gap-2 flex items-center"
        >
            <span class="text-3xl">✿</span> Goddess of Beauty
        </a>

        <!-- Desktop Navigation -->
        <nav class="md:flex space-x-8 hidden mx-8">
            <a href="#home" class="text-gray-600 hover:text-goddess-500 font-medium transition">Home</a>
            <a href="#services" class="text-gray-600 hover:text-goddess-500 font-medium transition">Services</a>
            <a href="#about" class="text-gray-600 hover:text-goddess-500 font-medium transition">About</a>
            <a href="#contact" class="text-gray-600 hover:text-goddess-500 font-medium transition">Contact</a>
        </nav>

        <!-- CTA Button -->
        <div class="md:block hidden whitespace-nowrap">
            <a
                href="#book"
                class="bg-goddess-500 text-white px-6 py-2 hover:bg-goddess-600 shadow-md hover:shadow-lg hover:-translate-y-0.5 transform rounded-full transition duration-200"
            >
                Book Appointment
            </a>
        </div>

        <!-- Mobile Menu Button (Hamburger) -->
        <!-- Using a direct inline function for the click handler -->
        <button 
            onclick={() => isMenuOpen = !isMenuOpen} 
            class="md:hidden text-goddess-600 focus:outline-none z-50 relative cursor-pointer"
            aria-label="Toggle menu"
        >
            {#if !isMenuOpen}
                <!-- Hamburger Icon -->
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            {:else}
                <!-- Close (X) Icon -->
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            {/if}
        </button>
    </div>

    <!-- Mobile Menu -->
    <!-- CHANGE 1: Using {#if isMenuOpen} instead of class:hidden -->
    <!-- CHANGE 2: Removed 'absolute' to make it flow naturally -->
    <!-- CHANGE 3: Added 'relative' and 'z-40' to ensure it sits on top -->
    {#if isMenuOpen}
        <div class="md:hidden bg-white border-t border-goddess-100 p-4 w-full shadow-lg relative z-40 animate-fade-in-down">
            <nav class="space-y-4 flex flex-col">
                <a onclick={() => isMenuOpen = false} href="#home" class="text-gray-600 hover:text-goddess-500 block py-2">Home</a>
                <a onclick={() => isMenuOpen = false} href="#services" class="text-gray-600 hover:text-goddess-500 block py-2">Services</a>
                <a onclick={() => isMenuOpen = false} href="#about" class="text-gray-600 hover:text-goddess-500 block py-2">About</a>
                <a onclick={() => isMenuOpen = false} href="#contact" class="text-gray-600 hover:text-goddess-500 block py-2">Contact</a>
                <a onclick={() => isMenuOpen = false} href="#book" class="text-goddess-600 font-bold block py-2">Book Now</a>
            </nav>
        </div>
    {/if}
</header>

<style>
    /* Simple fade in animation for the menu */
    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    .animate-fade-in-down {
        animation: fadeInDown 0.2s ease-out forwards;
    }
</style>