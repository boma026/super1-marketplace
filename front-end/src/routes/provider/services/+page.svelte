<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte"; // seu axios configurado
  import { onMount } from "svelte";
    import { api } from "../../../utils/api";
    import { PUBLIC_API_URL } from "$env/static/public";
  import type { Services } from "../../../type/Services";


  // estado dos serviços
  let services: Services[] = [];

  // carregar serviços do backend
  const loadServices = async () => {
    try {
      const res = await api.get("/service"); // rota GET no backend
      services = res.data;
      console.log(services)
    } catch (error: any) {
      console.error(error);
      alert("Erro ao criar serviço!");

      if (error.response?.status === 401) {
        alert("Você precisa fazer login novamente.");
        window.location.href = "/auth/select-role";
        return;
      }

      if (error.response?.status === 403) {
        alert("Acesso negado. Faça login como prestador.");
        window.location.href = "/auth/select-role";
        return;
      }
    }
  };

  onMount(() => {
    loadServices();
  });

  // navegação para criação de serviço
  const goToCreate = () => {
    window.location.href = "/provider/services/create";
  };
</script>

<h1 class="text-2xl font-bold mb-4">Meus serviços</h1>

<Button on:click={goToCreate}>Novo serviço</Button>

<div class="mt-4">
  {#if services.length === 0}
    <p class="text-gray-500">Nenhum serviço encontrado.</p>
  {/if}

  {#each services as s}
    <div class="border p-4 rounded-lg mb-3 shadow-sm">
      <h2 class="font-semibold text-lg">{s.name}</h2>
      <p class="text-gray-600 text-sm">{s.description}</p>

      <!-- 📸 FOTOS -->
      {#if s.photos?.length}
        <div class="flex gap-2 mt-2">
          {#each s.photos as p}
            <img
              src={`${PUBLIC_API_URL}${p}`}  
              alt={s.name}
              class="w-16 h-16 object-cover rounded border"
            />
          {/each}
        </div>
      {/if}

      <div class="mt-2">
        <strong>Variações:</strong>
        <ul class="text-sm ml-4">
          {#each s.variations as v}
            <li>- {v.name}: R$ {v.price} — {v.durationMinutes} min</li>
          {/each}
        </ul>
      </div>

      <Button class="mt-3">Editar</Button>
    </div>
  {/each}
</div>
