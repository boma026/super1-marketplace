<script lang="ts">
	import { api } from './../../../utils/api.ts';
    import { Button } from "$lib/components/ui/button/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import * as Card from "$lib/components/ui/card/index.js";

    const handleSendForm = async (e: SubmitEvent) => {    
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const data = Object.fromEntries(formData);

        try {
            await api.post("/register", data);
            alert("Conta criada!");
        } catch (err) {
            console.error(err);
            alert("Erro ao registrar");
        }
    }
</script>
 
<div class="min-h-screen flex items-center justify-center bg-slate-50">
    <Card.Root class="w-full max-w-sm">
        <Card.Header>
            <Card.Title>Registre-se</Card.Title>
        </Card.Header>
        <Card.Content>
        <form on:submit={handleSendForm}>
            <div class="flex flex-col gap-6">
                <div class="grid gap-2">
                    <Label for="email">Email</Label>
                    <Input id="email" type="email" name="email" placeholder="m@example.com" required />
                </div>
                <div class="grid gap-2">
                    <div class="flex items-center">
                        <Label for="password">Password</Label>
                    </div>
                    <Input id="password" type="password" name="password" required />
                </div>
            </div>
        </form>
        </Card.Content>
        <Card.Footer class="flex-col gap-2">
        <Button type="submit" class="w-full">Criar sua conta</Button>
        </Card.Footer>
    </Card.Root>
</div>