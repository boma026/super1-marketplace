<script lang="ts">
  import { onMount } from "svelte";
  import type { Booking } from "../../../type/Booking";
  import { api } from "../../../utils/api";

  let bookings: Booking[] = [];
  let loading = true;
  let errorMessage = "";

  // ---------- LOAD ----------
  const loadBookings = async () => {
  try {
    const res = await api.get(`/booking`);

    bookings = (res.data.bookings ?? []).filter(
      (b: Booking) => b.status !== "CANCELLED"
    );
  } catch (error: any) {
    console.error(error);
    errorMessage = "Erro ao carregar reservas.";

    if (error.response?.status === 401) {
      alert("Você precisa fazer login novamente.");
      window.location.href = "/auth/select-role";
      return;
    }

    if (error.response?.status === 403) {
      alert("Acesso negado. Faça login como prestador.");
      window.location.href = "/auth/select-role";
      return;
    }
  } finally {
    loading = false;
  }
};


  onMount(() => loadBookings());

  const deleteBooking = async (id: string) => {
    const ok = confirm("Tem certeza que deseja cancelar esta contratação?");
    if (!ok) return;

    try {
      console.log("oi")
      const res = await api.delete(`/booking/${id}`);
      console.log(res.data)
      // Atualiza a tela
      await loadBookings();
    } catch (err: any) {
      console.error(err);
      alert("Erro ao excluir reserva!");

      if (err.response?.status === 401) {
        alert("Você precisa fazer login novamente.");
        window.location.href = "/auth/select-role";
      }
    }
  };

  // Helpers
  const isToday = (dateStr: string) => {
    const d = new Date(dateStr);
    const t = new Date();
    return (
      d.getDate() === t.getDate() &&
      d.getMonth() === t.getMonth() &&
      d.getFullYear() === t.getFullYear()
    );
  };

  const isFuture = (dateStr: string) => {
    const d = new Date(dateStr);
    return d > new Date();
  };
</script>

<h1 class="text-2xl font-bold mb-6">Painel do Prestador</h1>

{#if loading}
  <p>Carregando...</p>
{/if}

{#if errorMessage}
  <p class="text-red-500">{errorMessage}</p>
{/if}

{#if !loading}

  <!-- HOJE -->
  <section class="mb-8">
    <h2 class="font-semibold text-lg mb-2">📅 Hoje</h2>

    {#each bookings.filter(b => isToday(b.startAt)) as b}
      <div class="border p-4 rounded-lg mb-3 shadow-sm bg-blue-50 flex justify-between items-center">
        <div>
          <div class="font-medium">{b.customer.name} — {b.service.name}</div>
          <div class="text-sm text-gray-600 mt-1">
            {new Date(b.startAt).toLocaleString("pt-BR")}
          </div>
        </div>

        <!-- Botão deletar -->
        <button
          class="p-2 text-red-500 hover:text-red-700 transition hover:cursor-pointer"
          on:click={() => deleteBooking(b.id)}
        >
          🗑️
        </button>
      </div>
    {:else}
      <p class="text-gray-500">Nenhuma contratação hoje.</p>
    {/each}
  </section>

  <!-- FUTURAS -->
  <section class="mb-8">
    <h2 class="font-semibold text-lg mb-2">🗓️ Próximos dias</h2>

    {#each bookings.filter(b => !isToday(b.startAt) && isFuture(b.startAt)) as b}
      <div class="border p-4 rounded-lg mb-3 shadow-sm flex justify-between items-center">
        <div>
          <div class="font-medium">{b.customer.name} — {b.service.name}</div>
          <div class="text-sm text-gray-600 mt-1">
            {new Date(b.startAt).toLocaleString("pt-BR")}
          </div>
        </div>

        <button
          class="p-2 text-red-500 hover:text-red-700 transition"
          on:click={() => deleteBooking(b.id)}
        >
          🗑️
        </button>
      </div>
    {:else}
      <p class="text-gray-500">Nenhuma contratação futura.</p>
    {/each}
  </section>

  <!-- FINALIZADAS -->
  <section>
    <h2 class="font-semibold text-lg mb-2">✔ Finalizadas</h2>

    {#each bookings.filter(b => !isFuture(b.startAt)) as b}
      <div class="border p-4 rounded-lg mb-3 shadow-sm bg-gray-100 flex justify-between items-center">
        <div>
          <div class="font-medium">{b.customer.name} — {b.service.name}</div>
          <div class="text-sm text-gray-600 mt-1">
            {new Date(b.startAt).toLocaleString("pt-BR")}
          </div>
          <div class="text-xs text-green-600 mt-1">Concluída</div>
        </div>

        <button
          class="p-2 text-red-500 hover:text-red-700 transition"
          on:click={() => deleteBooking(b.id)}
        >
          🗑️
        </button>
      </div>
    {:else}
      <p class="text-gray-500">Nenhuma reserva finalizada.</p>
    {/each}
  </section>
{/if}
