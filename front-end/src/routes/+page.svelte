<script lang="ts">
	import { featuredServices } from "../utils/featured";

	let search = "";

	// filtro local
	$: filteredServices =
		search.trim().length === 0
			? featuredServices
			 : featuredServices.filter((item) =>
					item.name.toLowerCase().includes(search.toLowerCase())
			  );
</script>

<div class="max-w-5xl mx-auto p-6">
	<h1 class="text-3xl font-bold mb-4">Serviços</h1>

	<!-- Campo de busca -->
	<input
		type="text"
		placeholder="Buscar serviços..."
		bind:value={search}
		class="border rounded-lg px-4 py-2 w-full mb-6"
	/>

	<!-- Grid dos serviços -->
	<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
		{#each filteredServices as item}
			<a
				href={`/service/${item.name.toLowerCase().replace(/\s+/g, "_")}`}
				class="flex flex-col items-center border rounded-lg p-3 shadow-sm hover:shadow-md transition cursor-pointer"
			>
				<img
					src={item.imageUrl}
					alt={item.name}
					class="w-24 h-24 object-cover rounded-md mb-2"
				/>
				<span class="font-medium">{item.name}</span>
			</a>
		{/each}
	</div>
</div>
