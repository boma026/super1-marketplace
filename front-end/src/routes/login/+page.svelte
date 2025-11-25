<script lang="ts">
 import { Button } from "$lib/components/ui/button/index.js";
 import { Label } from "$lib/components/ui/label/index.js";
 import { Input } from "$lib/components/ui/input/index.js";
 import * as Card from "$lib/components/ui/card/index.js";
</script>
 
<div class="min-h-screen flex items-center justify-center bg-slate-50">
    <Card.Root class="w-full max-w-sm">
        <Card.Header>
            <Card.Title>Login</Card.Title>
        </Card.Header>
        <Card.Content>
        <form action=handleSendForm>
            <div class="flex flex-col gap-6">
                <div class="grid gap-2">
                    <Label for="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div class="grid gap-2">
                    <div class="flex items-center">
                        <Label for="password">Password</Label>
                        <p class="ms-auto inline-block text-sm underline-offset-4 hover:underline">
                            Forgot your password?
                        </p>
                    </div>
                    <Input id="password" type="password" required />
                </div>
            </div>
        </form>
        </Card.Content>
        <Card.Footer class="flex-col gap-2">
        <Button type="submit" class="w-full">Login</Button>
        <Button variant="outline" class="w-full">Cadastre-se</Button>
        </Card.Footer>
    </Card.Root>
</div>