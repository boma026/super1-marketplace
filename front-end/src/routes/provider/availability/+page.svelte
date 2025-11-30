<script lang="ts">
  import { onMount } from "svelte";
  import { api } from "../../../utils/api";

  const ALL_DAYS = [
    "Segunda", "Terca", "Quarta", "Quinta", "Sexta", "Sabado", "Domingo"
  ];

  let availability = ALL_DAYS.map(day => ({
    day,
    startTime: null as string | null,
    endTime: null as string | null
  }));

  let selectedDay = "Segunda";
  let startTime = "";
  let endTime = "";

  const loadAvailability = async () => {
    try {
      const res = await api.get("/availability");
      const backend = res.data;

      const map = new Map<string, { startTime: string; endTime: string }>(
        backend.map((d: any) => [
          d.weekday,
          { startTime: d.startTime, endTime: d.endTime }
        ])
      );

      availability = ALL_DAYS.map(day => ({
        day,
        startTime: map.get(day)?.startTime || null,
        endTime: map.get(day)?.endTime || null
      }));

    } catch (error: any) {
      console.error("Erro ao carregar:", error);
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
    }
  };

  onMount(loadAvailability);

  const saveAvailability = async () => {
    if (!startTime || !endTime) {
      return alert("Informe horário inicial e final.");
    }

    try {
      await api.post("/availability", {
        weekday: selectedDay,
        startTime,
        endTime
      });

      const day = availability.find(d => d.day === selectedDay);
      if (day) {
        day.startTime = startTime;
        day.endTime = endTime;
      }

      startTime = "";
      endTime = "";
      loadAvailability();

    } catch (error: any) {
      console.error(error);
    }
  };
</script>

<div class="border p-4 rounded mb-4">
  <label>Dia da semana</label>
  <select bind:value={selectedDay} class="border p-2 rounded w-full mb-2 bg-white">
    {#each ALL_DAYS as d}
      <option value={d}>{d}</option>
    {/each}
  </select>

  <label>Horário inicial</label>
  <input type="time" bind:value={startTime} class="border p-2 rounded w-full mb-2 bg-white"/>

  <label>Horário final</label>
  <input type="time" bind:value={endTime} class="border p-2 rounded w-full bg-white"/>

  <button class="mt-3 px-4 py-2 bg-blue-600 text-white rounded" on:click={saveAvailability}>
    Salvar
  </button>
</div>

<h2 class="text-xl font-bold mt-4 mb-2">Sua disponibilidade</h2>

{#each availability as d}
  <div class="border p-3 rounded mb-3">
    <strong>{d.day}</strong>
    <div class="text-gray-600 text-sm">
      {#if d.startTime}
        {d.startTime} — {d.endTime}
      {:else}
        Não definido
      {/if}
    </div>
  </div>
{/each}
