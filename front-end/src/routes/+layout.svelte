<script lang="ts">
	let { children } = $props();
	import './layout.css';
</script>



<header class="bg-white shadow-sm border-b border-slate-200 w-full">
	<div class="max-w-[1200px] mx-auto px-6 py-4 flex items-center gap-4">
		<div class="flex items-center gap-3">
            <div class="h-9 w-9 bg-(--primary) rounded-md flex items-center justify-center text-white font-semibold">S1</div>
            <a href="/" class="text-xl font-semibold ">Marketplace</a>
    	</div>
		
			<nav class="flex flex-1 justify-end items-center gap-6 text-gray-700">
				<a href="/search" class="hover:text-gray-700/80">Buscar Serviços</a>
				<a href="/provider/dashboard" class="hover:text-gray-700/80">Sou Prestador</a>
				<a href="/login" class="px-4 py-2 bg-(--primary) text-white rounded-lg hover:bg-(--primary)/90 transition">
					Entrar
				</a>
			</nav>
			

		
	</div>
</header>

<main class="min-h-screen bg-gray-50">
	{@render children()}
</main>

<footer class="bg-gray-900 text-gray-300 py-10 mt-10">
	<div class="mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

		<div>
			<h3 class="text-white text-lg font-semibold">Super1 Marketplace</h3>
			<p class="text-sm mt-2">Marketplace de serviços de profissionais liberais.</p>
		</div>

		<div>
			<h3 class="text-white text-lg font-semibold">Links</h3>
			<ul class="mt-2 space-y-2 text-sm">
				<li><a href="/search" class="hover:text-white">Buscar Serviços</a></li>
				<li><a href="/signup" class="hover:text-white">Criar Conta</a></li>
				<li><a href="/provider/dashboard" class="hover:text-white">Painel do Prestador</a></li>
			</ul>
		</div>

		<div>
			<h3 class="text-white text-lg font-semibold">Legal</h3>
			<ul class="mt-2 space-y-2 text-sm">
				<li><p class="hover:text-white">Termos de Uso</p></li>
				<li><p class="hover:text-white">Política de Privacidade</p></li>
			</ul>
		</div>

	</div>

	<p class="text-center text-xs text-gray-400 mt-10">
		© {new Date().getFullYear()} Super1 Pro — Todos os direitos reservados.
	</p>
</footer>
