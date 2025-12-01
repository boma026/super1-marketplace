<script>
	let q = '';
	let services = []; // buscar do backend
	// demo local
	services = [
		{
			id: 1,
			name: 'Manicure',
			shortDescription: 'Manicure profissional',
			photos: [],
			minPrice: '25,00'
		},
		{ id: 2, name: 'Pintor', shortDescription: 'Pintura interna', photos: [], minPrice: '200,00' }
	];
</script>

<div>
	<h1 class="mb-3 text-xl font-semibold">Buscar serviços</h1>
	<input placeholder="Pesquisar..." bind:value={q} class="mb-4 w-full border p-2" />
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		{#each services as s}
			<ServiceCard service={s} />
		{/each}
	</div>
</div>
