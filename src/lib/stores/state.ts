import { writable } from 'svelte/store';

type State = 'input' | 'submitted';

export const state = writable<State>('input');

export const viewOtherStats = writable<boolean>(false);
