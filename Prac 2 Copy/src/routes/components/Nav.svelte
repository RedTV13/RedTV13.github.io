<script>
	import { LayoutDashboard, Timer, CheckCheck, Calendar, Settings } from 'lucide-svelte';
	export let page = 'dashboard';
</script>

<ul>
	<li class={page == 'dashboard' ? 'active' : ''}>
		<a href="/">
			<LayoutDashboard />
			<span>Dashboard</span>
		</a>
	</li>
	<li class={page == 'To-Do' ? 'active' : ''}>
		<a href="/toDo">
			<CheckCheck />
			<span>To-Do</span>
		</a>
	</li>
	<li class={page == 'calendar' ? 'active' : ''}>
		<a href="/calendar">
			<Calendar />
			<span>Calendar</span>
		</a>
	</li>
	<li class={page == 'timer' ? 'active' : ''}>
		<a href="/timer">
			<Timer />
			<span>Timer</span>
		</a>
	</li>
	<li class={page == 'settings' ? 'active' : ''}>
		<a href="/settings">
			<Settings />
			<span>Settings</span>
		</a>
	</li>
</ul>
