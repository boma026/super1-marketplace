<script lang="ts">
	import { onMount } from 'svelte';
	import { api } from '../../../utils/api';

	const ALL_DAYS = ['Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'];

	let availability = ALL_DAYS.map((day) => ({
		day,
		startTime: null as string | null,
		endTime: null as string | null
	}));

	let selectedDay = 'Segunda';
	let startTime = '';
	let endTime = '';

	const loadAvailability = async () => {
		try {
			const res = await api.get('/availability');
			const backend = res.data;

			const map = new Map<string, { startTime: string; endTime: string }>(
				backend.map((d: any) => [d.weekday, { startTime: d.startTime, endTime: d.endTime }])
			);

			availability = ALL_DAYS.map((day) => ({
				day,
				startTime: map.get(day)?.startTime || null,
				endTime: map.get(day)?.endTime || null
			}));
		} catch (error: any) {
			console.error('Erro ao carregar:', error);
			if (error.response?.status === 401) {
				alert('Você precisa fazer login novamente.');
				window.location.href = '/auth/select-role';
				return;
			}

			if (error.response?.status === 403) {
				alert('Acesso negado. Faça login como prestador.');
				window.location.href = '/auth/select-role';
				return;
			}
		}
	};

	onMount(loadAvailability);

	const saveAvailability = async () => {
		if (!startTime || !endTime) {
			return alert('Informe horário inicial e final.');
		}

		try {
			await api.post('/availability', {
				weekday: selectedDay,
				startTime,
				endTime
			});

			const day = availability.find((d) => d.day === selectedDay);
			if (day) {
				day.startTime = startTime;
				day.endTime = endTime;
			}

			startTime = '';
			endTime = '';
			loadAvailability();
		} catch (error: any) {
			console.error(error);
		}
	};
</script>

<div class="mb-4 rounded border p-4">
	<label>Dia da semana</label>
	<select bind:value={selectedDay} class="mb-2 w-full rounded border bg-white p-2">
		{#each ALL_DAYS as d}
			<option value={d}>{d}</option>
		{/each}
	</select>

	<label>Horário inicial</label>
	<input type="time" bind:value={startTime} class="mb-2 w-full rounded border bg-white p-2" />

	<label>Horário final</label>
	<input type="time" bind:value={endTime} class="w-full rounded border bg-white p-2" />

	<button class="mt-3 rounded bg-blue-600 px-4 py-2 text-white" on:click={saveAvailability}>
		Salvar
	</button>
</div>

<h2 class="mt-4 mb-2 text-xl font-bold">Sua disponibilidade</h2>

{#each availability as d}
	<div class="mb-3 rounded border p-3">
		<strong>{d.day}</strong>
		<div class="text-sm text-gray-600">
			{#if d.startTime}
				{d.startTime} — {d.endTime}
			{:else}
				Não definido
			{/if}
		</div>
	</div>
{/each}
