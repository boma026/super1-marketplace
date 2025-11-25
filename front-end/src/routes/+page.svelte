<script>
  import ServiceCard from '$lib/components/ServiceCard.svelte';

  // placeholder seed - trocar depois por fetch ao backend
  let featured = [
    { id: 1, name: 'Diarista - limpeza', shortDescription: 'Limpeza residencial rápida', photos: [], minPrice: '60,00' },
    { id: 2, name: 'Eletricista', shortDescription: 'Pequenos reparos elétricos', photos: [], minPrice: '80,00' }
  ];
</script>

<section>
  <h1 class="text-2xl font-bold mb-4">Encontre um profissional</h1>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each featured as s}
      <ServiceCard service={s} />
    {/each}
  </div>
</section>
