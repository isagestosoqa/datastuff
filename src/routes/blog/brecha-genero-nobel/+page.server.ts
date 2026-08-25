import type { PageServerLoad } from './$types';

import genderOverTime from './data/gender_over_time.json';
import categoryGender from './data/category_gender.json';
import peaceByDecade from './data/peace_by_decade.json';

export const load = (() => {
	return {
		genderOverTime,
		categoryGender,
		peaceByDecade
	};
}) satisfies PageServerLoad;
