<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { api } from "../../../../utils/api";

  let name = "";
  let description = "";
  let variations = [{ name: "", price: 0, durationMinutes: 30 }];
  let photos: File[] = [];
  let serviceType = ""; // Tipo selecionado no dropdown

  // Lista global de tipos de serviço (8 exemplos)
  const serviceTypes = [
    "Manicure",
    "Pedicure",
    "Corte de cabelo",
    "Coloração",
    "Depilação",
    "Maquiagem",
    "Massagem",
    "Estética facial"
  ];

  function handlePhotos(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      photos = [...input.files];
    }
  }

  function addVariation() {
    variations = [...variations, { name: "", price: 0, durationMinutes: 30 }];
  }

  const submit = async () => {
    try {
      if (!serviceType) {
        alert("Selecione um tipo de serviço!");
        return;
      }

      const formData = new FormData();

      // campos simples
      formData.append("name", name);
      formData.append("description", description);
      formData.append("serviceType", serviceType); // envia tipo selecionado

      // variações como JSON
      formData.append("variations", JSON.stringify(variations));

      // fotos individuais
      photos.forEach((file) => formData.append("photos", file));

      const res = await api.post("/service", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Serviço criado com sucesso!");
      console.log("API response:", res.data);
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
</script>

<h1 class="text-2xl font-bold mb-4">Criar serviço</h1>

<div class="space-y-4">
  <div>
    <label for="type" class="font-medium">Tipo de serviço</label>
    <select id="type" bind:value={serviceType} class="border p-2 w-full rounded bg-gray-100">
      <option value="">Selecione um tipo</option>
      {#each serviceTypes as type}
        <option value={type}>{type}</option>
      {/each}
    </select>
  </div>

  <div>
    <label for="name" class="font-medium">Nome do serviço</label>
    <input id="name" bind:value={name} class="border p-2 w-full rounded bg-gray-100" />
  </div>

  <div>
    <label for="description" class="font-medium">Descrição</label>
    <textarea
      id="description"
      bind:value={description}
      placeholder="(opcional)"
      class="bg-gray-100 border p-2 w-full rounded"
    ></textarea>
  </div>

  <div>
    <label for="photos" class="font-medium">Fotos</label>
    <input
      id="photos"
      type="file"
      name="photos"
      accept="image/*"
      multiple
      on:change={handlePhotos}
      class="border p-2 w-full rounded bg-gray-100"
    />
  </div>

  <h2 class="font-semibold text-lg mt-4 bg-gray-100">Variações</h2>

  {#each variations as v, i}
    <div class="border p-3 rounded-lg mb-3 bg-gray-50">
      <label>Nome da variação</label>
      <input bind:value={v.name} class="bg-gray-100 border p-2 w-full rounded mb-2" />

      <label>Preço (R$)</label>
      <input type="number" bind:value={v.price} class="bg-gray-100 border p-2 w-full rounded mb-2" />

      <label>Duração (min)</label>
      <input type="number" bind:value={v.durationMinutes} class="bg-gray-100 border p-2 w-full rounded" />
    </div>
  {/each}

  <Button onclick={addVariation}>Adicionar variação</Button>
  <Button class="mt-4" onclick={submit}>Criar serviço</Button>
</div>
