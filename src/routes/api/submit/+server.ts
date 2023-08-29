import prisma from '$lib/prisma';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();

	// 1. Check if data is array
	if (!Array.isArray(data) || !data.length) {
		throw error(400, 'Invalid data');
	}

	data.forEach((entry) => {
		const name = entry['name'] as string;
		const amount = +entry['amount'];

		// 2.
		if (!amount || !name) {
			throw error(400, 'Invalid data');
		}

		// 3.
		if (typeof name != 'string' || typeof amount != 'number') {
			throw error(400, 'Invalid data');
		}
	});

	// 4.
	const entries = data.map((entry) => ({
		name: entry.name as string,
		amount: entry.amount as number
	}));

	// Reject if any entry has amount out of range 0-10000
	const invalidAmount = entries.some((entry) => entry.amount < 0 || entry.amount > 10000);

	if (invalidAmount) {
		throw error(400, 'Invalid data');
	}

	// Reject if sum of entries is not 10000
	const sum = entries.reduce((acc, entry) => acc + entry.amount, 0);
	if (sum !== 10000) {
		throw error(400, 'Invalid data');
	}

	// No support in sqlite
	// await prisma.entry.createMany({
	// 	data: entries
	// });

	entries.forEach(async (entry) => {
		await prisma.entry.create({
			data: entry
		});
	});

	//5.
	// throw redirect(303, `/`);
	return json('OK');
};
