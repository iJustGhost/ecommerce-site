<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Goddess of Beauty | Luxury Salon</title>
	<link
		href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<!-- 1. Call the Header here -->
	<Header />

	<!-- 2. The Slot renders the content from +page.svelte -->
	<main class="pt-20 flex-grow">
		{@render children()}
	</main>

	<!-- 3. Call the Footer here -->
	<Footer />
</div>
