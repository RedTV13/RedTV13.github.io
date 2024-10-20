<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import Logo from './components/Logo.svelte';
	import Nav from './components/Nav.svelte';
	import Modal from './components/Modal.svelte';
	import { Menu, Bell } from 'lucide-svelte';
	import { page, navOpen, todoList } from './stores.js';
	import avatar from '$lib/assets/avatar.png';

	$: pageValue = $page;
	$: navBoo = $navOpen;
	let now = formatDate(new Date());

	onMount(() => {
		const interval = setInterval(() => {
			now = formatDate(new Date());
		}, 1000);

		todoList.set([]);

		if (window.localStorage.getItem('todoList') !== null) {
			todoList.update((value) => {
				let res = JSON.parse(window.localStorage.getItem('todoList'));
				res.forEach((el) => {
					el.dueDate = new Date(el.dueDate);
					el.dueTime = new Date(el.dueTime);
				});
				return res;
			});
		}

		return () => {
			clearInterval(interval);
		};
	});

	function toggleNav() {
		navOpen.update((value) => !navBoo);
	}

	function nthNumber(n) {
		if (n > 3 && n < 21) return 'th';
		switch (n % 10) {
			case 1:
				return 'st';
			case 2:
				return 'nd';
			case 3:
				return 'rd';
			default:
				return 'th';
		}
	}

	function formatDate(d) {
		//Thursday October 10th | 10:00 AM
		let options = {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			hourCycle: 'h12'
		};
		let res = d.toLocaleString('en-GB', options);
		if (res.split(', ')[1] !== undefined) {
			let a = res.split(', ')[1].split(' ');
			let b = `${a[1]} ${a[0]}`;
			return `${res.split(', ')[0]}, ${b}${nthNumber(b)} | ${a[4]} ${a[5]}`;
		}
		return res;
	}
</script>

<head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@100..900&display=swap"
		rel="stylesheet" />
</head>

<Modal />

<div id="left-panel" class={navBoo ? '' : 'collapsed'}>
	<Logo />
	<Nav page={pageValue} />
</div>

<main>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div id="topBar">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div>
			<span on:click={toggleNav} class="cursor-pointer"><Menu /></span>{pageValue
				.charAt(0)
				.toUpperCase() + pageValue.slice(1)}
		</div>
		<div>
			<Bell />
			<span id="profile">
				<span>
					<p>User name</p>
					<p>Subheading</p>
				</span>
				<!-- svelte-ignore a11y-missing-attribute -->
				<span style="background-image: url({avatar});" />
			</span>
		</div>
	</div>
	<div class="head">
		<h1>Today</h1>
		<span class="date">{now}</span>
		<!-- Thursday October 10th | 10:00 AM -->
	</div>
	<div class="content"><slot /></div>
</main>
