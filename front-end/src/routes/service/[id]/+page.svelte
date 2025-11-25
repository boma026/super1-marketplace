<script lang="ts">
    import type { PageProps } from '../../$types';
    import { onMount } from 'svelte';
    let id;
    let { data }: PageProps = $props();
    let service = null;

    onMount(async () => {
        // substituir por fetch real
        service = {
        id,
        name: 'Manicure - Demo',
        description: 'Serviço completo de manicure',
        photos: [],
        variations: [
            { id: 'v1', name: 'Mãos', price: '25.50', duration: 30 },
            { id: 'v2', name: 'Pés', price: '20.00', duration: 30 }
        ],
        provider: { id: 'p1', name: 'Ana' }
        };
    });

    function goToCheckout(variationId) {
        // passar dados para checkout (via query, state, store ou API)
        const url = `/checkout?service=${id}&variation=${variationId}`;
        location.href = url;
    }
    </script>

{#if !service}
  <p>Carregando...</p>
{:else}
  <h1 class="text-2xl font-bold">{service.name}</h1>
  <p class="text-sm text-gray-600">{service.description}</p>

  <h2 class="mt-4 font-semibold">Variações</h2>
  <ul class="space-y-2">
    {#each service.variations as v}
      <li class="border p-3 flex justify-between items-center">
        <div>
          <div class="font-medium">{v.name}</div>
          <div class="text-sm text-gray-500">{v.duration} minutos • R$ {v.price}</div>
        </div>
        <button on:click={()=>goToCheckout(v.id)} class="py-2 px-4 border rounded">Contratar</button>
      </li>
    {/each}
  </ul>
{/if}
