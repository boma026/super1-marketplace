<!-- src/routes/provider/+layout.svelte -->
<script>
	import { Button } from '$lib/components/ui/button';

	/* const handleLogout = () => {
    
  }*/
</script>

<div class="flex min-h-screen">
	<!-- SIDEBAR -->
	<aside class="The w-64 space-y-4 border-r bg-(--sidebar-ring) p-4">
		<h1 class="border-b-2 text-xl font-bold">Prestador</h1>

		<nav class="flex flex-col gap-2">
			<a href="/provider/dashboard">
				<Button variant="ghost" class="w-full justify-start">📊 Dashboard</Button>
			</a>

			<a href="/provider/services">
				<Button variant="ghost" class="w-full justify-start">🛠 Meus serviços</Button>
			</a>

			<a href="/provider/availability">
				<Button variant="ghost" class="w-full justify-start">🗓 Disponibilidade</Button>
			</a>
		</nav>

		<div class="pt-10">
			<a href="/logout">
				<Button variant="ghost" class="w-full justify-start">🚪 Sair</Button>
			</a>
		</div>
	</aside>

	<!-- CONTENT -->
	<main class="flex-1 p-6">
		<slot />
	</main>
</div>
