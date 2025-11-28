<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    
    function escolher(role: "CUSTOMER" | "PROVIDER") {
        localStorage.removeItem("role");
        console.log(localStorage.getItem("role"));
        localStorage.setItem("role", role);
        console.log(localStorage.getItem("role"));
        window.location.href = "/auth/register";
    }
</script>

<div class="min-h-screen flex flex-col items-center justify-center gap-6">
    <h1 class="text-xl font-semibold">Escolha como deseja entrar:</h1>

    <Button onclick={() => escolher("CUSTOMER")} class="w-64 h-12">
        Sou cliente
    </Button>

    <Button onclick={() => escolher("PROVIDER")} class="w-64 h-12">
        Sou prestador
    </Button>
</div>
