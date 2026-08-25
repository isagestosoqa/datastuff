<script lang="ts">
	import type { PageData } from './$types';
   import NobelGenderArea from '$lib/components/charts/NBArea.svelte';
   import NobelCategoryBars from '$lib/components/charts/NBCategoryBars.svelte';
	import NobelPeaceTimeline from '$lib/components/charts/NBPeaceTimeline.svelte';
   

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Brecha de género en los premios Nobel</title>
	<meta
		name="description"
		content="Brecha de género en los premios Nobel."
	/>
</svelte:head>

<div class="fixed inset-0 z-50 hidden items-center justify-center bg-white px-8 text-center max-md:portrait:flex">
	<p class="max-w-sm text-xl font-semibold">Gira el celular</p>
</div>

<main class="mx-auto max-w-225 px-4 pb-16 sm:px-5 sm:pb-24 max-md:portrait:hidden">
	<header class="mx-auto max-w-187.5 pt-16 pb-16">
		<h1 class="mb-6 text-3xl font-bold leading-[1.05] tracking-tight md:text-7xl">
			Brecha de <span class="box-decoration-clone bg-orange-200 px-1">género</span> en los premios Nobel
		</h1>
	</header>
	<div
		class="grid items-start gap-10 md:grid-cols-[minmax(0,1.6fr)_minmax(18rem,0.8fr)] max-md:landscape:grid-cols-[minmax(0,2fr)_minmax(13rem,0.75fr)] max-md:landscape:gap-4"
	>
		<section
			class="flex flex-col gap-1 overflow-hidden pb-2 md:sticky md:top-6 max-md:landscape:sticky max-md:landscape:top-6"
		>
			<div class="w-full overflow-hidden">
				<NobelGenderArea data={data.genderOverTime} />
			</div>
			<div class="w-full overflow-hidden">
				<NobelCategoryBars data={data.categoryGender} />
			</div>
			<div class="w-full overflow-hidden">
				<NobelPeaceTimeline data={data.peaceByDecade} />
			</div>
		</section>
		<section class="max-w-152 pt-2 max-md:landscape:text-sm max-md:landscape:leading-6">
			<p class="text-md leading-8">
			Maria Salomea Skłodowska (1867-1934), más conocida como Marie Curie, fue una física y química polaca nacionalizada francesa. También fue <span class="box-decoration-clone bg-orange-200 px-1">la primer mujer en ganar un premio Nobel</span>, y no suficiente con eso, la única en ganar dos. Uno de los años con más preponderancia para las mujeres fue el 2023, cuando 4 mujeres fueron galardonadas frente a los 7 galardones masculinos. Pero más importante aún, fue que en <span class="box-decoration-clone bg-orange-200 px-1">Ciencias Económicas, Medicina y Física</span> quienes recibieron el premio fueron por primera vez mujeres desde la creación de los premios en 1901: <span class="box-decoration-clone bg-orange-200 px-1">Claudia Goldin, Katalin Karikó y Anne L'Huillier respectivamente.</span>
			Goldin, galardonada con el premio por "haber hecho avanzar nuestra comprensión de los resultados de las mujeres en el mercado laboral", fue la tercera mujer en ganar el Premio del Banco de Suecia en Ciencias Económicas en memoria de Alfred Nobel, como se denomina oficialmente, y la primera en obtenerlo sola.
			A lo largo de la historia fueron premiadas <span class="box-decoration-clone bg-orange-200 px-1">solo 65 mujeres</span>, en la mayoría de los casos en las categorías de Paz y Literatura.
			</p>
		</section>
	</div>

	<section class="border-t border-gray-200 pt-12">
		<div class="mx-auto max-w-162.5">
			<h2 class="mb-6 text-2xl font-bold">
				Cómo se hizo este análisis
			</h2>
			<p class="mb-5 text-base leading-7 text-gray-600">
				Para mejorar mis habilidades en python elegí esta temática. Los <a href="https://github.com/briancpotter/nobelpubs">datos</a> van desde el 1901 y al 2016. Primero los premios por año y género para calcular la evolución acumulada de hombres y mujeres.
			</p>
<pre class="overflow-x-auto rounded-lg bg-gray-100 p-4 text-sm leading-relaxed"><code>{`gender_by_year = (
    nobel
    .groupby(['year', 'sex'])
    .size()
    .unstack(fill_value=0)
    .reset_index()
)

if 'Male' not in gender_by_year.columns:
    gender_by_year['Male'] = 0

if 'Female' not in gender_by_year.columns:
    gender_by_year['Female'] = 0

gender_by_year = gender_by_year.sort_values('year')

gender_by_year['male'] = gender_by_year['Male'].cumsum()
gender_by_year['female'] = gender_by_year['Female'].cumsum()

gender_over_time = gender_by_year[
    ['year', 'male', 'female']
].copy()`}</code></pre>
		<p class="my-5 text-base leading-7 text-gray-600">Después calculé la proporción de mujeres en	cada categoría. 
				</p>
					<pre class="overflow-x-auto rounded-b-lg bg-gray-100 p-4 text-sm leading-relaxed"><code>{`total_by_category = (
    nobel
    .groupby('category')
    .size()
    .reset_index(name='total_winners')
)

female_by_category = (
    nobel[nobel['sex'] == 'Female']
    .groupby('category')
    .size()
    .reset_index(name='female_winners')
)

category_gender = total_by_category.merge(
    female_by_category,
    on='category',
    how='left'
)

category_gender['female_winners'] = (
    category_gender['female_winners']
    .fillna(0)
    .astype(int)
)

category_gender['female_proportion'] = (
    category_gender['female_winners']
    / category_gender['total_winners']
)

category_gender = category_gender.sort_values(
    'female_proportion',
    ascending=False
)

category_gender = category_gender.reset_index(drop=True)`}</code></pre>
			<p class="my-5 text-base leading-7 text-gray-600">
				Finalmente, se filtraron las mujeres ganadoras del Nobel de la Paz y se agruparon por década para observar cómo cambió su presencia a lo largo del tiempo.
			</p>
			<pre class="overflow-x-auto rounded-b-lg bg-gray-100 p-4 text-sm leading-relaxed"><code>{`women_peace = nobel[
    (nobel['sex'] == 'Female') &
    (nobel['category'] == 'Peace')
].copy()

women_peace['decade'] = (women_peace['year'] // 10) * 10

peace_by_decade = (
    women_peace
    .groupby('decade')
    .size()
    .reset_index(name='female_winners')
    .sort_values('decade')
    .reset_index(drop=True)
)`}</code></pre>
		</div>
	</section>
</main>
