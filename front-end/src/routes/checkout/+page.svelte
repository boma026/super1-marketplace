<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { api } from "../../utils/api";

  type CheckoutData = {
    serviceId: string;
    providerId: string;
    serviceName: string;
    providerName: string;
    slot: string;
    weekday: string;
    variationId: string;
    price: string
    date: string
  };

  let checkoutData: CheckoutData | null = null;
  let errorMessage = "";
  let loading = false;

  onMount(() => {
    const data = localStorage.getItem("checkoutData");
    if (!data) {
      alert("Nenhum serviço selecionado.");
      goto("/services");
      return;
    }
    checkoutData = JSON.parse(data);
    console.log(checkoutData?.slot)
  });

  // Função para confirmar reserva
  async function confirmBooking() {
    if (!checkoutData) {
      errorMessage = "Dados do serviço ausentes.";
      return;
    }

    loading = true;
    errorMessage = "";

    try {
      
      const res = await api.post("/booking", {
        serviceId: checkoutData.serviceId,
        variationId: checkoutData.variationId,
        providerId: checkoutData.providerId,
        time: checkoutData.slot, 
        date: checkoutData.date
      });

      alert("Serviço criado com sucesso!");
      console.log("API response:", res.data);
    }  catch (error: any) {
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
    } finally {
      loading = false;
    }
  }
</script>

<section class="max-w-xl mx-auto mt-6 p-4 border rounded shadow">
  {#if checkoutData}
    <h1 class="text-xl font-bold mb-4">Finalizar contratação</h1>

    <div class="mb-3">
      <strong>Serviço:</strong> {checkoutData.serviceName}
    </div>
    <div class="mb-3">
      <strong>Prestador:</strong> {checkoutData.providerName}
    </div>
    <div class="mb-3">
      <strong>Dia da semana:</strong> {checkoutData.weekday}
    </div>
    <div class="mb-3">
      <strong>Horário:</strong> {checkoutData.slot} 
    </div>
    <div class="mb-3">
      <strong>Preço:</strong> R$ {checkoutData.price},00
    </div>

    {#if errorMessage}
      <div class="text-red-500 mb-2">{errorMessage}</div>
    {/if}

    <button
      on:click={confirmBooking}
      class="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      disabled={loading}
    >
      {loading ? "Confirmando..." : "Confirmar pagamento"}
    </button>
  {/if}
</section>
