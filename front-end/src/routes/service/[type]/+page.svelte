<script lang="ts">
	import { onMount } from 'svelte';
	import { api } from '../../../utils/api';

	import type { Service } from '../../../type/Service';
	import { weekdays } from '../../../constants/Weekday';
	import { API_URL } from '../../../constants/API_URL';

	export let params;
	let type = params.type;

	let services: Service[] = [];
	let loading = true;
	let errorMessage = '';

	// Data selecionada pelo usuário
	let selectedDate = ''; // YYYY-MM-DD
	let selectedWeekday: string | null = null;

	// Carrega serviços do backend
	const loadServices = async () => {
		try {
			const res = await api.get(`/services/${type}`);
			services = res.data;
		} catch (err: any) {
			console.error(err);
			errorMessage = 'Erro ao carregar serviços.';
		} finally {
			loading = false;
		}
	};

	onMount(() => {
		loadServices();
	});

	// Converte data em Weekday
	const getWeekdayFromDate = (dateStr: string): string => {
		const [year, month, day] = dateStr.split('-').map(Number);

		const date = new Date();
		date.setFullYear(year, month - 1, day);
		date.setHours(12, 0, 0, 0); // garante dia correto evitando problemas de DST

		const jsDay = date.getDay();

		return weekdays[jsDay];
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

		let [startHour, startMinute] = startTime.split(':').map(Number);
		let [endHour, endMinute] = endTime.split(':').map(Number);

		let current = new Date();
		current.setHours(startHour, startMinute, 0, 0);

		const end = new Date();
		end.setHours(endHour, endMinute, 0, 0);

		// se end for menor que start, considera o próximo dia
		if (end <= current) end.setDate(end.getDate() + 1);

		while (current < end) {
			const hh = String(current.getHours()).padStart(2, '0');
			const mm = String(current.getMinutes()).padStart(2, '0');
			slots.push(`${hh}:${mm}`);
			current.setMinutes(current.getMinutes() + duration);
		}

		return slots;
	};

	// Guardar dados no localStorage e redirecionar para checkout
	const goToCheckout = (
		service: Service,
		slot: string,
		weekday: string,
		variationId: string,
		selectedDate: string
	) => {
		const variation = service.variations.find((v) => v.id === variationId);
		if (!variation) return alert('Variação não encontrada');

		const checkoutData = {
			serviceId: service.id,
			providerId: service.provider?.id ?? '',
			serviceName: service.name,
			providerName: service.provider?.name ?? '',
			weekday,
			slot,
			variationId: variation.id,
			price: Number(variation.price),
			date: selectedDate // data real escolhida
		};

		localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
		window.location.href = '/checkout';
	};
</script>

<div class="mx-auto max-w-5xl p-6">
	<h1 class="mb-4 text-2xl font-bold capitalize">Serviços de {type}</h1>

	<div class="mb-4">
		<label for="date" class="font-semibold">Escolha a data:</label>
		<input
			id="date"
			type="date"
			bind:value={selectedDate}
			on:change={onDateChange}
			class="ml-2 rounded border p-1"
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

	<div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each services as s}
			<div class="rounded-lg border p-4 shadow-sm">
				<h2 class="text-lg font-semibold">{s.name}</h2>
				<p class="text-gray-600">{s.description}</p>

				{#if s.provider}
					<div class="mt-2 text-sm">
						<strong>Prestador:</strong>
						{s.provider.name}
						{s.provider.city ? `- ${s.provider.city}` : ''}
					</div>
				{/if}

				{#if s.photos?.length}
					<div class="mt-2 flex gap-2">
						{#each s.photos as p}
							<img
								src={`${API_URL}${p}`}
								alt={s.name}
								class="h-20 w-20 rounded-md border object-cover"
							/>
						{/each}
					</div>
				{/if}

				<div class="mt-3">
					<strong>Variações:</strong>
					<ul class="ml-4 text-sm">
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
							{#each s.provider.availabilities.filter((a) => a.weekday === selectedWeekday) as a}
								{#each s.variations as v}
									<div class="rounded-lg border p-3 hover:bg-blue-50">
										<div class="mb-2 font-semibold">{a.weekday}</div>
										{#each generateSlots(a.startTime!, a.endTime!, v.durationMinutes) as slot}
											<button
												class="mr-2 mb-2 cursor-pointer rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
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
					<div class="mt-3 text-sm text-gray-500">
						Nenhum horário disponível para {selectedDate}.
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
