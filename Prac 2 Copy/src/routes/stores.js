import { writable } from 'svelte/store';

export const page = writable("dashboard"); // Active page, for nav highlighting
export const navOpen = writable(true); // Controls nav expansion
export const listItem = writable(); // List item that is being dragged
export const todoList = writable([]); // All to-do list items
export const target = writable(); // Click target when opening modal