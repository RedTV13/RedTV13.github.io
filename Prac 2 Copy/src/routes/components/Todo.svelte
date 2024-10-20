<script>
	import { listItem, target, todoList } from '../stores.js';
	import Modal from './Modal.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let timeOps = {
		hour12: true,
		timeStyle: 'short'
	};

	let dateOps = {
		month: 'short',
		day: 'numeric'
	};

	export let title = 'New task';
	export let dueDate = new Date();
	export let dueTime = new Date();
	export let details;
	export let id = new Date().getTime();

	let list = $todoList;

	function dragStart(ev) {
		listItem.update((value) => ev.target);
	}

	function edit(ev) {
		dispatch('openModal', ev);
		target.update((value) => ev.target);
		// modal.showModal();
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<li draggable="true" on:dragstart={dragStart} {id} on:click={edit}>
	<span />
	<span>
		<span>{title}</span>
		<span>
			Due: {dueDate.toLocaleDateString('en-GB', dateOps)}
			at {dueTime.toLocaleTimeString('en-GB', timeOps)}
		</span>
		<span>
			<span class="tag">tag</span>
			<span class="tag">tag</span>
		</span>
	</span>
</li>

<style>
	li {
		display: flex;
		flex-direction: row;
		gap: 15px;
		padding: 10px;
		border-radius: 15px;
		background-color: white;
		cursor: pointer;

		& * {
			pointer-events: none;
		}

		&:hover {
			box-shadow: 0px 22px 6px 0px rgba(0, 0, 0, 0%), 0px 14px 6px 0px rgba(0, 0, 0, 1%),
				0px 8px 5px 0px rgba(0, 0, 0, 3%), 0px 3px 3px 0px rgba(0, 0, 0, 4%),
				0px 1px 2px 0px rgba(0, 0, 0, 5%);
		}
	}

	li > span:first-child {
		width: 50px;
		height: 50px;
		border-radius: 10px;
		background-color: var(--pink);
	}

	li > span:last-child {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding: 0;
		align-self: stretch;
		font-size: 16px;
	}

	li > span:last-child > span:nth-child(1) {
		font-weight: bold;
		font-size: 18px;
	}

	li > span:last-child > span:nth-child(2) {
		font-weight: 500;
		font-size: 15px;
	}

	li > span:last-child > span:nth-child(3) {
		display: flex;
		flex-direction: row;
		padding: 5px 0px;
		gap: 10px;

		& .tag {
			text-align: center;
			padding: 0px 15px;
			border-radius: 15px;
			background-color: var(--pink);
			font-weight: bold;
			font-size: 14px;
			align-content: center;
			justify-content: center;
			align-items: center;
			display: flex;
		}
	}
</style>
