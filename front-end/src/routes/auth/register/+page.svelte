<script lang="ts">
	import { api } from './../../../utils/api.ts';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { onMount } from 'svelte';

	let role: string | null;
	let email = '';
	let password = '';
	let name = '';

	onMount(() => {
		console.log(localStorage.getItem('role'));
		role = localStorage.getItem('role');
		if (!role) {
			window.location.href = '/select-role';
		}
	});

	const handleSendForm = async (e: SubmitEvent) => {
		e.preventDefault();

		if (!email || !password || !role || !name) {
			alert('Preencha os campos corretamente');
			return;
		}

		const data = { email, password, role, name };

		try {
			const res = await api.post('/register', data);
			if (res.status === 201) {
				alert('Conta criada!');
				console.log(res.data);
				window.location.href = '/auth/login';
			}
		} catch (err) {
			console.error(err);
			alert('Erro ao registrar');
		}
	};

	const handleChangeToLogin = () => {
		window.location.href = '/auth/login';
	};
</script>

<div class="flex min-h-screen items-center justify-center bg-slate-50">
	<Card.Root class="w-full max-w-sm">
		<Card.Header>
			<Card.Title>Registre-se ({role === 'CUSTOMER' ? 'Cliente' : 'Prestador'}):</Card.Title>
		</Card.Header>
		<Card.Content>
			<form on:submit={handleSendForm} id="registerForm">
				<div class="flex flex-col gap-6">
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="m@example.com"
							bind:value={email}
							required
						/>
					</div>
					<div class="grid gap-2">
						<Label for="name">Nome</Label>
						<Input id="name" type="text" bind:value={name} required />
					</div>
					<div class="grid gap-2">
						<div class="flex items-center">
							<Label for="password">Password</Label>
						</div>
						<Input id="password" type="password" bind:value={password} required />
					</div>
				</div>
			</form>
		</Card.Content>
		<Card.Footer class="flex-col gap-2">
			<Button type="submit" class="w-full" form="registerForm">Criar sua conta</Button>
			<Button variant="outline" class="w-full" on:click={handleChangeToLogin}
				>Já tenho uma conta</Button
			>
		</Card.Footer>
	</Card.Root>
</div>
