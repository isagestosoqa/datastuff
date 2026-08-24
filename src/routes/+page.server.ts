import type { PageServerLoad } from './$types';

import { piezas } from '../data/piezas';

export const load = (() => {
	const allItems = [...piezas].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);

	return {
		notes: allItems
	};
}) satisfies PageServerLoad;
