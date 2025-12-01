<script lang="ts">
	let { children } = $props();
	import './layout.css';
</script>

<header class="w-full border-b border-slate-200 bg-white shadow-sm">
	<div class="mx-auto flex max-w-[1200px] items-center gap-4 px-6 py-4">
		<div class="flex items-center gap-3">
			<div
				class="flex h-9 w-9 items-center justify-center rounded-md bg-(--primary) font-semibold text-white"
			>
				S1
			</div>
			<a href="/" class="text-xl font-semibold">Marketplace</a>
		</div>

		<nav class="flex flex-1 items-center justify-end gap-6 text-gray-700">
			<a href="/search" class="hover:text-gray-700/80">Buscar Serviços</a>
			<a href="/provider/dashboard" class="hover:text-gray-700/80">Sou Prestador</a>
			<a
				href="/auth/select-role"
				class="rounded-lg bg-primary px-4 py-2 text-white transition hover:bg-(--primary)/90"
			>
				Entrar
			</a>
		</nav>
	</div>
</header>

<main class="min-h-screen bg-gray-50">
	{@render children()}
</main>

<footer class="mt-10 bg-gray-900 py-10 text-gray-300">
	<div class="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-3">
		<div>
			<h3 class="text-lg font-semibold text-white">Super1 Marketplace</h3>
			<p class="mt-2 text-sm">Marketplace de serviços de profissionais liberais.</p>
		</div>

		<div>
			<h3 class="text-lg font-semibold text-white">Links</h3>
			<ul class="mt-2 space-y-2 text-sm">
				<li><a href="/search" class="hover:text-white">Buscar Serviços</a></li>
				<li><a href="/signup" class="hover:text-white">Criar Conta</a></li>
				<li><a href="/provider/dashboard" class="hover:text-white">Painel do Prestador</a></li>
			</ul>
		</div>

		<div>
			<h3 class="text-lg font-semibold text-white">Legal</h3>
			<ul class="mt-2 space-y-2 text-sm">
				<li><p class="hover:text-white">Termos de Uso</p></li>
				<li><p class="hover:text-white">Política de Privacidade</p></li>
			</ul>
		</div>
	</div>

	<p class="mt-10 text-center text-xs text-gray-400">
		© {new Date().getFullYear()} Super1 Pro — Todos os direitos reservados.
	</p>
</footer>
