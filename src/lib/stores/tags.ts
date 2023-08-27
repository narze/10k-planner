import { derived, writable } from 'svelte/store';

export const predefinedTags = [
	'อาหาร',
	'ค่าน้ำ/ค่าไฟ',
	'เติมน้ำมัน',
	'เสื้อผ้า',
	'ค่าโทร/ค่าเน็ต',
	'ยา',
	'บริจาค',
	'ซื้อขนม',
	'ค่าเดินทาง',
	'ค่าเทอม',
	'เครื่องใช้ไฟฟ้า',
	'เครื่องเขียน',
	'อื่นๆ'
];

export interface ChosenTag {
	label: string;
	value: number;
}

export const tags = writable<ChosenTag[]>([]);

export const usedAmount = derived(tags, ($tags) => {
	return $tags.reduce((acc, tag) => acc + tag.value, 0);
});

let remainingAmountValue = 10000;

export const remainingAmount = derived(usedAmount, ($usedAmount) => {
	remainingAmountValue = 10000 - $usedAmount;
	return remainingAmountValue;
});

export function addTag(label: string) {
	const tag: ChosenTag = {
		label,
		value: Math.min(500, remainingAmountValue)
	};

	tags.update((currentTags) => {
		if (currentTags.some((t) => t.label === tag.label)) {
			return currentTags;
		}

		return [...currentTags, tag];
	});
}

export function removeTag(label: string) {
	tags.update((currentTags) => {
		return currentTags.filter((t) => t.label !== label);
	});
}

export function reorderTagsByValue() {
	tags.update((currentTags) => {
		return currentTags.sort((a, b) => b.value - a.value);
	});
}
