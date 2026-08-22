/* import type { PageServerLoad } from './$types';

import noticias from '../data/noticias.json';
import { piezas } from '../data/piezas';

function createSlug(text: string) {
	return text
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-');
}

export const load = (() => {
	const notes = noticias.noticias.map((noticia) => {
		const id = createSlug(noticia.titulo);
		return {
			id,
			href: `/blog/${id}`,
			image: noticia.imagen,
			title: noticia.titulo,
			category: 'Noticias',
			blurb: noticia.bajada,
			author: noticia.autor,
			date: noticia.fecha,
			body: noticia.body
		};
	});

	const allItems = [...notes, ...piezas].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);

	return {
		notes: allItems
	};
}) satisfies PageServerLoad;
 */

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
