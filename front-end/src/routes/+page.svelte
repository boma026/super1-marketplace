<script lang="ts">
	import { featuredServices } from '../utils/featured';

	let search = '';

	// filtro local
	$: filteredServices =
		search.trim().length === 0
			? featuredServices
			: featuredServices.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
</script>

<div class="mx-auto max-w-5xl p-6">
	<h1 class="mb-4 text-3xl font-bold">Serviços</h1>

	<!-- Campo de busca -->
	<input
		type="text"
		placeholder="Buscar serviços..."
		bind:value={search}
		class="mb-6 w-full rounded-lg border px-4 py-2"
	/>

	<!-- serviços -->
	<div class="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
		{#each filteredServices as item}
			<a
				href={`/service/${item.name.toLowerCase().replace(/\s+/g, '-')}`}
				class="flex cursor-pointer flex-col items-center rounded-lg border p-3 shadow-sm transition hover:shadow-md"
			>
				<img src={item.imageUrl} alt={item.name} class="mb-2 h-24 w-24 rounded-md object-cover" />
				<span class="font-medium">{item.name}</span>
			</a>
		{/each}
	</div>
</div>
