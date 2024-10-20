<script>
	import Todo from './Todo.svelte';
	import { target, todoList } from '../stores.js';
	import { onMount } from 'svelte';

	$: tg = $target;

	let title = 'New task';
	let dueDate = new Date();
	let dueTime = new Date();
	let details = '';

	$: d = dueDate.toISOString().split('T')[0];
	$: t = dueTime.toTimeString().match(/[0-9]{2}:[0-9]{2}/)[0];

	function createTask(ev) {
		let offset = (new Date(`${d}T${t}Z`).getTimezoneOffset() / 60) * -1;
		dueDate = new Date(`${d}`);
		dueTime = new Date(`${d}T${t}${offset.toString().length < 3 ? '+' + offset : offset}:00`);
		let status = 0;

		switch (tg.parentElement.id) {
			case 'inProgress':
				status = 1;
				break;

			case 'complete':
				status = 2;
				break;
		}

		let props = {
			title: title,
			dueDate: dueDate,
			dueTime: dueTime,
			status: status,
			details: details,
			id: new Date().getTime()
		};

		todoList.update((value) => {
			return [...value, props];
		});

		window.localStorage.setItem('todoList', JSON.stringify($todoList));
		modal.close();
	}

	function saveTask(ev) {
		let offset = (new Date(`${d}T${t}Z`).getTimezoneOffset() / 60) * -1;
		dueDate = new Date(`${d}`);
		dueTime = new Date(`${d}T${t}${offset.toString().length < 3 ? '+' + offset : offset}:00`);

		let props = {
			title: title,
			dueDate: dueDate,
			dueTime: dueTime,
			details: details
		};

		console.log(props);

		todoList.update((value) => {
			return value.map((item) => {
				if (item.id == target.id) {
					return { ...item, props };
				}
				return item;
			});
		});

		window.localStorage.setItem('todoList', JSON.stringify($todoList));
		modal.close();
	}

	function open() {
		console.log(tg);
		let a;
		$todoList.forEach((el) => {
			if (el.id == tg.id) {
				a = el;
			}
		});

		if (tg) {
			title = a.title;
			dueDate = a.dueDate.toISOString().split('T')[0];
			dueTime = a.dueTime.toTimeString().match(/[0-9]{2}:[0-9]{2}/)[0];
			details = a.details;
		}
		modal.showModal();
	}
</script>

<dialog id="modal" class="modal">
	<div class="modal-box">
		<form method="dialog">
			<button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
		</form>

		<div class="itemDetails">
			<input
				class="border-b text-lg font-bold"
				bind:value={title}
				placeholder="Task name"
				id="inputTitle" />
			<input type="date" class="border-b" bind:value={d} id="inputDate" />
			<input type="time" class="border-b" bind:value={t} id="inputTime" />
			<input type="textarea" bind:value={details} placeholder="Task details" id="inputDetails" />
			<button on:click={tg.tagName == 'UL' ? createTask : saveTask} class="btn btn-sm">save</button>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

<style>
	#modal {
		display: flex;
		align-items: center;
		justify-content: center;

		& .modal-box {
			display: flex;

			& .itemDetails {
				display: flex;
				flex-direction: column;
				gap: 15px;

				& input,
				& button {
					width: fit-content;

					&:focus {
						outline: none;
					}
				}
			}
		}
	}
</style>
