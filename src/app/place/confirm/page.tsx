"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { unlockDoorAndAwaitOpen, awaitDoorClose, startCleaningCycle } from '@/services/home-assistant';
import { createSession } from '@/services/storage';

export default function ConfirmPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const phone = searchParams.get('phone');
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handleStartCycle = async () => {
        if (!phone) return;

        setIsLoading(true);
        try {
            // Create session and get the code
            const { code } = await createSession(phone);

            toast({
                title: "Atslēdz durvis...",
                description: "Lūdzu, atveriet skapīša durvis.",
                duration: 30000,
            });
            await unlockDoorAndAwaitOpen();

            toast({
                title: "Durvis atvērtas!",
                description: "Lūdzu, ievietojiet apavus un aizveriet durvis.",
                duration: 30000,
            });
            await awaitDoorClose();
            
            toast({
                title: "Durvis aizvērtas!",
                description: "Sākas tīrīšanas cikls.",
            });
            await startCleaningCycle();

            router.push(`/?placed=true&code=${code}`);

        } catch (error) {
            console.error("Cikla kļūda:", error);
            toast({
                variant: "destructive",
                title: "Kļūda",
                description: (error instanceof Error) ? error.message : "Notika neparedzēta kļūda.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (!phone) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
                 <Card className="w-full max-w-md shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-3xl font-headline text-center">Kļūda</CardTitle>
                        <CardDescription className="text-center">
                            Telefona numurs nav atrasts. Lūdzu, atgriezieties un mēģiniet vēlreiz.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" asChild className="w-full">
                            <Link href="/place" className="flex items-center justify-center">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Atpakaļ
                            </Link>
                        </Button>
                    </CardContent>
                 </Card>
            </main>
        )
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl font-headline text-center">Apstiprināt darbību</CardTitle>
                    <CardDescription className="text-center">
                        Jūsu numurs ir <strong>{phone}</strong>. Nospiediet "Sākt", lai atvērtu skapīti un sāktu tīrīšanas ciklu.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col space-y-4">
                    <Button
                        size="lg"
                        className="w-full h-24 text-2xl font-bold text-primary-foreground bg-gradient-to-br from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 shadow-lg transition-all duration-200 active:scale-95 active:opacity-90"
                        onClick={handleStartCycle}
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="mr-2 h-8 w-8 animate-spin" /> : "Sākt"}
                    </Button>
                     <Button variant="outline" asChild>
                        <Link href="/place" className="flex items-center justify-center">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Atpakaļ
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </main>
    );
}
