<script>
  // aqui você implementa um simple week-availability editor
  let availability = [
    { day: 'Segunda', slots: ['09:00', '10:00', '14:00'] },
    { day: 'Terça', slots: [] }
  ];
</script>

<h1 class="text-xl font-bold">Minha disponibilidade</h1>
{#each availability as d}
  <div class="border p-2 my-2">
    <strong>{d.day}</strong>
    <div class="text-sm">{d.slots.join(', ') || 'sem horários'}</div>
  </div>
{/each}
