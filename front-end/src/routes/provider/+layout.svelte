<!-- src/routes/provider/+layout.svelte -->
<script>
  import { Button } from "$lib/components/ui/button";
</script>

<div class="flex min-h-screen">
  <!-- SIDEBAR -->
  <aside class="w-64 The bg-(--sidebar-ring) border-r p-4 space-y-4">
    <h1 class="text-xl font-bold border-b-2">Prestador</h1>

    <nav class="flex flex-col gap-2">
      <a href="/provider/dashboard">
        <Button variant="ghost" class="w-full justify-start">
          📊 Dashboard
        </Button>
      </a>

      <a href="/provider/services">
        <Button variant="ghost" class="w-full justify-start">
          🛠 Meus serviços
        </Button>
      </a>

      <a href="/provider/availability">
        <Button variant="ghost" class="w-full justify-start">
          🗓 Disponibilidade
        </Button>
      </a>

      <a href="/provider/bookings">
        <Button variant="ghost" class="w-full justify-start">
          📑 Contratações
        </Button>
      </a>
    </nav>

    <div class="pt-10">
      <a href="/logout">
        <Button variant="ghost" class="w-full justify-start">
          🚪 Sair
        </Button>
      </a>
    </div>
  </aside>

  <!-- CONTENT -->
  <main class="flex-1 p-6">
    <slot />
  </main>
</div>
