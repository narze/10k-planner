import { writable } from 'svelte/store';

type State = 'input' | 'submitted' | 'view-stats';

export const state = writable<State>('input');

export const viewOtherStats = writable<boolean>(false);
