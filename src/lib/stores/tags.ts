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