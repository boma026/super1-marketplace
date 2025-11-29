<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
	import { onMount } from "svelte";
	import { api } from "../../../utils/api";

    let role : string | null;
    let email = "";
    let password = "";

     onMount(() => {
            console.log(localStorage.getItem("role"));
            role = localStorage.getItem("role");
            if (!role) {
                window.location.href = "/select-role";
            }
        })

        const handleSendForm = async (e: SubmitEvent) => {    
        e.preventDefault();

        if(!email || !password || !role){
            alert("Preencha os campos corretamente");
            return;
        }

        const data = {email, password, role};
        
        try {
            const res = await api.post("/login", data, {withCredentials: true});
            if(res.status === 200) {
                alert("logado");
                if(res.data.user.role === "COSTUMER") {
                    window.location.href = "/search"; 
                }
                else {
                     window.location.href = "/provider/dashboard"; 
                }       
            }
        } catch (err) {
            console.error(err);
            alert("Erro ao registrar");
        }
    }

        const handleChangeToRegister = () => {
        window.location.href = "/auth/register";
    }

</script>
 
<div class="min-h-screen flex items-center justify-center bg-slate-50">
    <Card.Root class="w-full max-w-sm">
        <Card.Header>
            <Card.Title>Login ({role === "CUSTOMER" ? "Cliente" : "Prestador" }):</Card.Title>
        </Card.Header>
        <Card.Content>
        <form on:submit={handleSendForm} id="loginForm">
            <div class="flex flex-col gap-6">
                <div class="grid gap-2">
                    <Label for="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required bind:value={email} />
                </div>
                <div class="grid gap-2">
                    <div class="flex items-center">
                        <Label for="password">Password</Label>
                        <p class="ms-auto inline-block text-sm underline-offset-4 hover:underline">
                            Forgot your password?
                        </p>
                    </div>
                    <Input id="password" type="password" bind:value={password} required />
                </div>
            </div>
        </form>
        </Card.Content>
        <Card.Footer class="flex-col gap-2">
        <Button type="submit" class="w-full" form="loginForm">Login</Button>
        <Button variant="outline" class="w-full" on:click={handleChangeToRegister}>Cadastre-se</Button>
        </Card.Footer>
    </Card.Root>
</div>