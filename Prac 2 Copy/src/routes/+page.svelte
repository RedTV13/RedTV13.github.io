<script>
	import { Menu, Bell } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { page } from './stores.js';

	page.update((value) => 'dashboard');
</script>
