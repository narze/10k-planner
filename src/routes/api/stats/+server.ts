import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ setHeaders }) => {
	setHeaders({
		age: '60', // 1 minute
		'cache-control': 'max-age=60'
	});

	const stats = await prisma.entry.groupBy({
		by: ['name'],
		_sum: {
			amount: true
		},
		_count: {
			name: true
		},
		orderBy: {
			_sum: {
				amount: 'desc'
			}
		},
		take: 100,
		having: {
			amount: {
				_sum: {
					gte: 1500
				},
				_count: {
					gte: 2
				}
			}
		}
	});

	return json({ stats });
};
