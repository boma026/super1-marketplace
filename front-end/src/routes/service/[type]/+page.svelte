<script lang="ts">
  import { onMount } from "svelte";
  import { PUBLIC_API_URL } from "$env/static/public";
  import { api } from "../../../utils/api";
  import type { Service } from "../../../type/Services";
  import type { Weekday } from "../../../type/Enums";

  export let params;
  let type = params.type;

  let services: Service[] = [];
  let loading = true;
  let errorMessage = "";

  // Data selecionada pelo usuário
  let selectedDate = ""; // YYYY-MM-DD
  let selectedWeekday: Weekday | null = null;

  // Carrega serviços do backend
  const loadServices = async () => {
    try {
      const res = await api.get(`/services/${type}`);
      services = res.data;
    } catch (err: any) {
      console.error(err);
      errorMessage = "Erro ao carregar serviços.";
    } finally {
      loading = false;
    }
  };

  onMount(() => {
    loadServices();
  });

  // Converte data em Weekday
  const getWeekdayFromDate = (dateStr: string): Weekday => {
  const [year, month, day] = dateStr.split("-").map(Number);

  // Criar data corretamente no timezone local
  const date = new Date(year, month - 1, day);

  const jsDay = date.getDay(); // 0=Dom 1=Seg ...
  const weekdays: Weekday[] = ["Domingo","Segunda","Terca","Quarta","Quinta","Sexta","Sabado"];

  return weekdays[jsDay] as Weekday;
};


  const onDateChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    selectedDate = input.value; // YYYY-MM-DD
    selectedWeekday = getWeekdayFromDate(selectedDate);
  };

  // Gera horários entre startTime e endTime baseado na duração do serviço
  const generateSlots = (startTime: string, endTime: string, duration: number) => {
    const slots: string[] = [];
    if (!startTime || !endTime) return slots;

    let [startHour, startMinute] = startTime.split(":").map(Number);
    let [endHour, endMinute] = endTime.split(":").map(Number);

    let current = new Date();
    current.setHours(startHour, startMinute, 0, 0);

    const end = new Date();
    end.setHours(endHour, endMinute, 0, 0);

    // se end for menor que start, considera o próximo dia
    if (end <= current) end.setDate(end.getDate() + 1);

    while (current < end) {
      const hh = String(current.getHours()).padStart(2, "0");
      const mm = String(current.getMinutes()).padStart(2, "0");
      slots.push(`${hh}:${mm}`);
      current.setMinutes(current.getMinutes() + duration);
    }

    return slots;
  };

  // Guardar dados no localStorage e redirecionar para checkout
  const goToCheckout = (
    service: Service,
    slot: string,
    weekday: Weekday,
    variationId: string,
    selectedDate: string
  ) => {
    const variation = service.variations.find(v => v.id === variationId);
    if (!variation) return alert("Variação não encontrada");

    const checkoutData = {
      serviceId: service.id,
      providerId: service.provider?.id ?? "",
      serviceName: service.name,
      providerName: service.provider?.name ?? "",
      weekday,
      slot,
      variationId: variation.id,
      price: Number(variation.price),
      date: selectedDate // data real escolhida
    };

    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
    window.location.href = "/checkout";
  };
</script>

<div class="max-w-5xl mx-auto p-6">
  <h1 class="text-2xl font-bold mb-4 capitalize">Serviços de {type}</h1>

  <div class="mb-4">
    <label for="date" class="font-semibold">Escolha a data:</label>
    <input
      id="date"
      type="date"
      bind:value={selectedDate}
      on:change={onDateChange}
      class="ml-2 p-1 border rounded"
    />
  </div>

  {#if loading}
    <p>Carregando...</p>
  {/if}

  {#if errorMessage}
    <p class="text-red-500">{errorMessage}</p>
  {/if}

  {#if !loading && services.length === 0}
    <p class="text-gray-500">Nenhum serviço encontrado para este tipo.</p>
  {/if}

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
    {#each services as s}
      <div class="border p-4 rounded-lg shadow-sm">
        <h2 class="font-semibold text-lg">{s.name}</h2>
        <p class="text-gray-600">{s.description}</p>

        {#if s.provider}
          <div class="mt-2 text-sm">
            <strong>Prestador:</strong> {s.provider.name} {s.provider.city ? `- ${s.provider.city}` : ""}
          </div>
        {/if}

        {#if s.photos?.length}
          <div class="flex gap-2 mt-2">
            {#each s.photos as p}
              <img
                src={`${PUBLIC_API_URL}${p}`}
                alt={s.name}
                class="w-20 h-20 object-cover rounded-md border"
              />
            {/each}
          </div>
        {/if}

        <div class="mt-3">
          <strong>Variações:</strong>
          <ul class="text-sm ml-4">
            {#each s.variations as v}
              <li>- {v.name}: R$ {v.price} ({v.durationMinutes} min)</li>
            {/each}
          </ul>
        </div>

        <!-- Slots filtrados pelo dia selecionado -->
        {#if selectedWeekday && s.provider?.availabilities?.length}
          <div class="mt-3 text-sm">
            <strong>Horários disponíveis para {selectedDate}:</strong>
            <div class="mt-2 space-y-3">
              {#each s.provider.availabilities.filter(a => a.weekday === selectedWeekday) as a}
                {#each s.variations as v}
                  <div class="border rounded-lg p-3 hover:bg-blue-50">
                    <div class="font-semibold mb-2">{a.weekday}</div>
                    {#each generateSlots(a.startTime!, a.endTime!, v.durationMinutes) as slot}
                      <button
                        class="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md cursor-pointer mr-2 mb-2"
                        on:click={() => goToCheckout(s, slot, a.weekday, v.id, selectedDate)}
                      >
                        {slot}
                      </button>
                    {/each}
                  </div>
                {/each}
              {/each}
            </div>
          </div>
        {:else if selectedWeekday}
          <div class="text-sm text-gray-500 mt-3">
            Nenhum horário disponível para {selectedDate}.
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>
