<script>
	import { page, listItem, target, todoList } from '../stores.js';
	import { Circle, Plus } from 'lucide-svelte';
	import Todo from '../components/Todo.svelte';
	import { onMount } from 'svelte';

	page.update((value) => 'To-Do');

	$: dragItem = $listItem;
	$: todos = $todoList;

	listItem.subscribe((value) => {
		dragItem = value;
	});

	todoList.subscribe((value) => {
		todos = value;
	});

	function dragOver(ev) {
		ev.preventDefault();
	}

	function dropHandler(ev) {
		ev.preventDefault();
		if (ev.target.classList.contains('dropzone')) {
			let status = 0;
			switch (ev.target.parentElement.id) {
				case 'inProgress':
					status = 1;
					break;

				case 'complete':
					status = 2;
					break;
			}
			todoList.update((value) => {
				return value.map((item) => {
					if (item.id == dragItem.id) {
						return { ...item, status: status };
					}
					return item;
				});
			});
			ev.target.appendChild(dragItem);
		}
	}

	function openModal(ev) {
		modal.showModal();
		target.update((value) => ev.target.parentElement.getElementsByTagName('ul')[0]);
	}

	function openEditModal(ev) {
		console.log(modal);
		modal.showModal();
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="list" id="notStarted" on:dragover={dragOver} on:drop={dropHandler}>
	<div>
		<span>Not started</span>
		<Circle fill="#ffafbe" strokeWidth="0" size="20" />
	</div>
	<ul class="dropzone">
		{#each todos as li}
			{#if li.status == 0}
				<Todo
					title={li.title}
					dueDate={li.dueDate}
					dueTime={li.dueTime}
					id={li.id}
					details={li.details}
					on:openModal={openEditModal} />
			{/if}
		{/each}
	</ul>
	<button on:click={openModal}>Add <Plus /></button>
</div>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="list" id="inProgress" on:dragover={dragOver} on:drop={dropHandler}>
	<div>
		<span>In progress</span>
		<Circle fill="#fff0af" strokeWidth="0" size="20" />
	</div>
	<ul class="dropzone">
		{#each $todoList as li}
			{#if li.status == 1}
				<Todo
					title={li.title}
					dueDate={li.dueDate}
					dueTime={li.dueTime}
					id={li.id}
					details={li.details}
					on:openModal={openEditModal} />
			{/if}
		{/each}
	</ul>
	<button on:click={openModal}>Add <Plus /></button>
</div>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="list" id="complete" on:dragover={dragOver} on:drop={dropHandler}>
	<div>
		<span>Complete</span>
		<Circle fill="#BCE4CC" strokeWidth="0" size="20" />
	</div>
	<ul class="dropzone">
		{#each $todoList as li}
			{#if li.status == 2}
				<Todo
					title={li.title}
					dueDate={li.dueDate}
					dueTime={li.dueTime}
					id={li.id}
					details={li.details}
					on:openModal={openEditModal} />
			{/if}
		{/each}
	</ul>
	<button on:click={openModal}>Add <Plus /></button>
</div>

<style>
	.list {
		display: flex;
		flex-direction: column;
		border-radius: 20px;
		background-color: var(--light-pink);
		flex: 1 0 0;

		max-height: 1000px;

		& > div:first-child {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			font-weight: 500;
			font-size: 18px;
		}
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 15px;
		padding: 10px;
		height: 100%;
		flex: 1 0 0;
		overflow-y: scroll;
	}

	button {
		display: flex;
		flex-direction: row;
		align-self: stretch;
		justify-content: space-between;
		padding: 10px;
		border-top: 1px solid #ffcab180;

		& > * {
			pointer-events: none;
		}
	}
</style>
