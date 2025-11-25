<script>
  // mostrar resumo: próximas contratações, notificações rápidas
  let bookings = [
    { id: 1, client: 'João', service: 'Pintura (v2)', datetime: '2025-11-25 09:00' }
  ];
</script>

<h1 class="text-2xl font-bold">Painel do prestador</h1>

<section class="mt-4">
  <h2 class="font-semibold">Próximas contratações</h2>
  <ul>
    {#each bookings as b}
      <li class="border p-2 my-2">
        <div>{b.client} — {b.service}</div>
        <div class="text-sm text-gray-500">{b.datetime}</div>
      </li>
    {/each}
  </ul>
</section>
