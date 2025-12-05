<script lang="ts">
	import { onMount } from 'svelte';
	import type { Booking } from '../../../type/Booking';
	import { api } from '../../../utils/api';

	let bookings: Booking[] = [];
	let loading = true;
	let errorMessage = '';

	// ---------- LOAD ----------
	const loadBookings = async () => {
		try {
			const res = await api.get(`/booking`);

			bookings = (res.data.bookings ?? []).filter((b: Booking) => b.status !== 'CANCELLED');
		} catch (error: any) {
			console.error(error);
			errorMessage = 'Erro ao carregar reservas.';

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
		} finally {
			loading = false;
		}
	};

	onMount(() => loadBookings());

	const deleteBooking = async (id: string) => {
		const ok = confirm('Tem certeza que deseja cancelar esta contratação?');
		if (!ok) return;

		try {
			const res = await api.delete(`/booking/${id}`);
			console.log(res.data);
			// Atualiza a tela
			await loadBookings();
		} catch (err: any) {
			console.error(err);
			alert('Erro ao excluir reserva!');

			if (err.response?.status === 401) {
				alert('Você precisa fazer login novamente.');
				window.location.href = '/auth/select-role';
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

<h1 class="mb-6 text-2xl font-bold">Painel do Prestador</h1>

{#if loading}
	<p>Carregando...</p>
{/if}

{#if errorMessage}
	<p class="text-red-500">{errorMessage}</p>
{/if}

{#if !loading}
	<!-- HOJE -->
	<section class="mb-8">
		<h2 class="mb-2 text-lg font-semibold">📅 Hoje</h2>

		{#each bookings.filter((b) => isToday(b.startAt)) as b}
			<div
				class="mb-3 flex items-center justify-between rounded-lg border bg-blue-50 p-4 shadow-sm"
			>
				<div>
					<div class="font-medium">{b.customer.name} — {b.service.name}</div>
					<div class="mt-1 text-sm text-gray-600">
						{new Date(b.startAt).toLocaleString('pt-BR')}
					</div>
				</div>

				<!-- Botão deletar -->
				<button
					class="p-2 text-red-500 transition hover:cursor-pointer hover:text-red-700"
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
		<h2 class="mb-2 text-lg font-semibold">🗓️ Próximos dias</h2>

		{#each bookings.filter((b) => !isToday(b.startAt) && isFuture(b.startAt)) as b}
			<div class="mb-3 flex items-center justify-between rounded-lg border p-4 shadow-sm">
				<div>
					<div class="font-medium">{b.customer.name} — {b.service.name}</div>
					<div class="mt-1 text-sm text-gray-600">
						{new Date(b.startAt).toLocaleString('pt-BR')}
					</div>
				</div>

				<button
					class="p-2 text-red-500 transition hover:text-red-700"
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
		<h2 class="mb-2 text-lg font-semibold">✔ Finalizadas</h2>

		{#each bookings.filter((b) => !isFuture(b.startAt)) as b}
			<div
				class="mb-3 flex items-center justify-between rounded-lg border bg-gray-100 p-4 shadow-sm"
			>
				<div>
					<div class="font-medium">{b.customer.name} — {b.service.name}</div>
					<div class="mt-1 text-sm text-gray-600">
						{new Date(b.startAt).toLocaleString('pt-BR')}
					</div>
					<div class="mt-1 text-xs text-green-600">Concluída</div>
				</div>

				<button
					class="p-2 text-red-500 transition hover:text-red-700"
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
