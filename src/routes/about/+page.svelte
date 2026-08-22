<script lang="ts">
	const photo = 'assets/profile.jpg';
</script>

<svelte:head>
	<title>About Me | Isa Gestoso</title>
	<meta name="description" content="DataViz Journalist" />
</svelte:head>

<main class="mx-auto max-w-300 px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-18">
	<section class="grid gap-9 py-10 md:grid-cols-12 md:py-14">
		<div class="md:col-span-5">
			<div class="sticky top-25">
				<div class="bg-cc-current aspect-4/5 overflow-hidden">
					<img src={photo} alt="" class="h-full w-full object-cover grayscale" />
				</div>
			</div>
		</div>

		<div class="md:col-span-6 md:col-start-7">
			<div class="mt-9 space-y-5 text-lg leading-8 sm:text-xl sm:leading-9">
				<p>
					I am an Argentine freelance visual journalist and front-end web developer. I worked for <strong
						>Clarín</strong
					>, one of Buenos Aires' major media outlets—as a writer for the local news section, where
					I covered local issues, human rights, and culture. I also served as a journalistic
					producer for the documentary <strong>"Huellas de nuestra historia"</strong>(Traces of Our
					History), which premiered at the Mariano Moreno National Library. Photography is another
					of my interests; this led me to take a course in March 2026 on reporting in hostile
					environments, where I learned how to cover stories in conflict zones. I am now looking to
					further develop my skills as a data journalist.
				</p>
			</div>
		</div>
	</section>
</main>
