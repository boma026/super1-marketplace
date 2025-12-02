<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte'; // seu axios configurado
	import { onMount } from 'svelte';
	import { api } from '../../../utils/api';
	import type { Service } from '../../../type/Service';
	import { API_URL } from '../../../constants/API_URL';

	// estado dos serviços
	let services: Service[] = [];

	// carregar serviços do backend
	const loadServices = async () => {
		try {
			const res = await api.get('/service'); // rota GET no backend
			services = res.data;
			console.log(services);
		} catch (error: any) {
			console.error(error);
			alert('Erro ao criar serviço!');

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

	onMount(() => {
		loadServices();
	});

	// navegação para criação de serviço
	const goToCreate = () => {
		window.location.href = '/provider/services/create';
	};
</script>

<h1 class="mb-4 text-2xl font-bold">Meus serviços</h1>

<Button on:click={goToCreate}>Novo serviço</Button>

<div class="mt-4">
	{#if services.length === 0}
		<p class="text-gray-500">Nenhum serviço encontrado.</p>
	{/if}

	{#each services as s}
		<div class="mb-3 rounded-lg border p-4 shadow-sm">
			<h2 class="text-lg font-semibold">{s.name}</h2>
			<p class="text-sm text-gray-600">{s.description}</p>

			<!-- 📸 FOTOS -->
			{#if s.photos?.length}
				<div class="mt-2 flex gap-2">
					{#each s.photos as p}
						<img
							src={`${API_URL}${p}`}
							alt={s.name}
							class="h-16 w-16 rounded border object-cover"
						/>
					{/each}
				</div>
			{/if}

			<div class="mt-2">
				<strong>Variações:</strong>
				<ul class="ml-4 text-sm">
					{#each s.variations as v}
						<li>- {v.name}: R$ {v.price} — {v.durationMinutes} min</li>
					{/each}
				</ul>
			</div>

			<Button class="mt-3">Editar</Button>
		</div>
	{/each}
</div>
