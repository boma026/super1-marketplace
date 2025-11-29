<script>
  let bookings = [
    { id: 1, client: "João", service: "Pintura (v2)", datetime: "2025-11-25 09:00" }
  ];
</script>

<h1 class="text-2xl font-bold mb-4">Painel do Prestador</h1>

<section>
  <h2 class="font-semibold text-lg mb-2">Próximas contratações</h2>

  {#each bookings as b}
    <div class="border p-4 rounded-lg mb-3 shadow-sm">
      <div class="font-medium">{b.client} — {b.service}</div>
      <div class="text-sm text-gray-500 mt-1">{b.datetime}</div>
    </div>
  {/each}
</section>
