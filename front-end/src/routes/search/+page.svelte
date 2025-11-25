<script>
  let q = '';
  let services = []; // buscar do backend
  // demo local
  services = [
    { id: 1, name: 'Manicure', shortDescription: 'Manicure profissional', photos: [], minPrice: '25,00' },
    { id: 2, name: 'Pintor', shortDescription: 'Pintura interna', photos: [], minPrice: '200,00' }
  ];
</script>

<div>
  <h1 class="text-xl font-semibold mb-3">Buscar serviços</h1>
  <input placeholder="Pesquisar..." bind:value={q} class="border p-2 w-full mb-4" />
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    {#each services as s}
      <ServiceCard service={s} />
    {/each}
  </div>
</div>
