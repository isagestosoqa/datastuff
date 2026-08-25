export type Piece = {
	id: string;
	href: string;
	title: string;
	category: string;
	blurb: string;
	author: string;
	date: string;
	image?: string;
};

export const piezas: Piece[] = [
	{
		id: 'natalidad-argentina',
		href: '/blog/natalidad-argentina',
		title: '¿Solo en Argentina cae la natalidad?',
		category: '',
		blurb: 'Compará cómo fluctuó en los últimos 50 años la natalidad en el mundo.',
		author: '',
		date: ''
	},
	{
		id: 'brecha-genero-nobel',
		href: '/blog/brecha-genero-nobel',
		title: 'Brecha de género edición Premios Nobel',
		category: '',
		blurb: '',
		author: '',
		date: ''
	}
	/* 	{
		id: 'sufragio-femenino',
		href: '/blog/sufragio-femenino',
		title: '¿Qué tanto sabes del sufragio femenino?',
		category: '',
		blurb: 'Vení, animate.',
		author: 'Isabel Gestoso',
		date: '2026-08-20'
	} */
	// cada pieza nueva que arme
];
