<script>
	export let service;
</script>

<article class="rounded border p-3">
	<img
		src={service.photos?.[0] ?? '/placeholder.png'}
		alt={service.name}
		class="h-40 w-full rounded object-cover"
	/>
	<h3 class="mt-2 text-lg font-semibold">{service.name}</h3>
	<p class="text-sm text-gray-600">{service.shortDescription}</p>
	<div class="mt-2 flex items-center justify-between">
		<a class="text-sm underline" href={`/service/${service.id}`}>Ver</a>
		<span class="text-sm font-medium">a partir de R$ {service.minPrice}</span>
	</div>
</article>
