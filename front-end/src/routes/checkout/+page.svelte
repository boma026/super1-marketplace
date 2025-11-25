<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  let params;
  let serviceId, variationId;
  let selectedDate = '';
  let selectedTime = '';

  onMount(() => {
    const url = new URL(location.href);
    serviceId = url.searchParams.get('service');
    variationId = url.searchParams.get('variation');
    // buscar disponibilidade do provider para preencher slots
  });

  async function confirmBooking() {
    // chamar backend para criar reserva (sem pagamento)
    // exemplo: POST /bookings { serviceId, variationId, date, time, userId }
    alert('Reserva criada (simulada). Integre com o backend.');
    location.href = '/profile';
  }
</script>

<section class="max-w-xl">
  <h1 class="text-xl font-bold mb-2">Finalizar contratação</h1>
  <div class="mb-3">
    <label>Data</label>
    <input type="date" bind:value={selectedDate} class="block border p-2 w-full" />
  </div>
  <div class="mb-3">
    <label>Hora</label>
    <input type="time" bind:value={selectedTime} class="block border p-2 w-full" />
  </div>
  <button on:click={confirmBooking} class="py-2 px-4 rounded border">Confirmar (sem pagamento)</button>
</section>
