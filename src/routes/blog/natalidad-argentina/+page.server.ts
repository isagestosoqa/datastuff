import type { PageServerLoad } from './$types';

import natalidad from '../../../data/natalidad-argentina-mundo.json';
import paises from '../../../data/natalidad-paises.json';

export const load = (() => {
	return {
		natalidad,
		paises
	};
}) satisfies PageServerLoad;
