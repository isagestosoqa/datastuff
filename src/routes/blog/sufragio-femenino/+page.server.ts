import suffrage from '../../../data/sufragio-por-pais.json';
import worldGeo from '../../../data/countries.geo.json';

export const load = () => {
	return {
		suffrage,
		worldGeo
	};
};
