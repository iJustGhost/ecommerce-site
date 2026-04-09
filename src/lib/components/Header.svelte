<header
	class="top-0 bg-white/90 backdrop-blur-md shadow-sm fixed z-50 w-full transition-all duration-300"
>
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
			<a href="#services" class="text-gray-600 hover:text-goddess-500 font-medium transition"
				>Services</a
			>
			<a href="#about" class="text-gray-600 hover:text-goddess-500 font-medium transition">About</a>
			<a href="#contact" class="text-gray-600 hover:text-goddess-500 font-medium transition"
				>Contact</a
			>
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
		<button class="md:hidden text-goddess-600 focus:outline-none">
			<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				></path>
			</svg>
		</button>
	</div>

	<!-- Mobile Menu (Hidden by default) -->
	<div class="md:hidden bg-white border-goddess-100 p-4 absolute hidden w-full border-t">
		<nav class="space-y-4 flex flex-col">
			<a href="#home" class="text-gray-600 hover:text-goddess-500">Home</a>
			<a href="#services" class="text-gray-600 hover:text-goddess-500">Services</a>
			<a href="#about" class="text-gray-600 hover:text-goddess-500">About</a>
			<a href="#contact" class="text-gray-600 hover:text-goddess-500">Contact</a>
			<a href="#book" class="text-goddess-600 font-bold">Book Now</a>
		</nav>
	</div>
</header>
