<script>
  let availability = [
    { day: "Segunda", slots: ["09:00", "10:00"] },
    { day: "Terça", slots: [] }
  ];

  let newHour = "";
  let selectedDay = "Segunda";

  function addSlot() {
    const day = availability.find(d => d.day === selectedDay);
    if (day) {
      day.slots.push(newHour);
      newHour = "";
    }
  }
</script>

<h1 class="text-2xl font-bold mb-4">Minha disponibilidade</h1>

<div class="border p-4 rounded-lg mb-4">
  <label for="weekday-select">Dia da semana</label>
  <select id="weekday-select" bind:value={selectedDay} class="border p-2 rounded w-full mb-2">
    {#each availability as d}
      <option>{d.day}</option>
    {/each}
  </select>

  <label for="time-input">Adicionar horário</label>
  <input id="time-input" type="time" bind:value={newHour} class="border p-2 w-full rounded" />
  <button class="mt-2 px-3 py-2 bg-blue-600 text-white rounded" on:click={addSlot}>
    Adicionar
  </button>
</div>

{#each availability as d}
  <div class="border p-3 rounded-lg mb-3">
    <strong>{d.day}</strong>
    <div class="text-sm text-gray-500 mt-1">
      {d.slots.length ? d.slots.join(", ") : "Sem horários"}
    </div>
  </div>
{/each}
