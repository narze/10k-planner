import prisma from '$lib/prisma';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { nanoid } from 'nanoid';

export const GET: RequestHandler = async ({}) => {
	// const data = await request.json();
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
