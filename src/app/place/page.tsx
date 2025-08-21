"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { 
    unlockDoorAndAwaitOpen, 
    awaitDoorClose,
    startCleaningCycle,
    stopCleaningCycle
} from '@/services/home-assistant';


export default function PlacePage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState('Nospiediet pogu, lai atslēgtu skapīti, ievietotu apavus un sāktu dezinfekcijas ciklu.');

    const handlePlaceShoes = async () => {
        setIsLoading(true);
        try {
            setStatusMessage("Atslēdz durvis...");
            toast({
                title: "Atslēdz durvis...",
                description: "Lūdzu, atveriet skapīša durvis.",
            });
            await unlockDoorAndAwaitOpen();
            
            setStatusMessage("Durvis atvērtas. Lūdzu, ievietojiet apavus un aizveriet durvis, lai sāktu tīrīšanas ciklu.");
            toast({
                title: "Ievietojiet apavus",
                description: "Aizveriet durvis, lai sāktu 12 minūšu tīrīšanas ciklu.",
            });

            await awaitDoorClose();

            setStatusMessage("Durvis aizvērtas. Tīrīšanas cikls sākas...");
             toast({
                title: "Cikls sākās",
                description: "Siltums, UV-C un ventilatori ir ieslēgti uz 12 minūtēm.",
            });

            // This part runs on the server and won't be interrupted if user navigates away.
            startCleaningCycle();

            // Navigate away immediately, the cycle runs in the background
            router.push('/?placed=true');

        } catch (error) {
            console.error(error);
            setStatusMessage("Kļūda. Mēģiniet vēlreiz.");
            toast({
                variant: "destructive",
                title: "Kļūda",
                description: (error instanceof Error) ? error.message : "Neizdevās izpildīt darbību.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl font-headline">Ievietot apavus</CardTitle>
                    <CardDescription>
                        {statusMessage}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col space-y-4">
                    <Button
                        size="lg"
                        className="w-full h-24 text-xl font-bold text-primary-foreground bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg transition-all duration-200 active:scale-95 active:opacity-90"
                        onClick={handlePlaceShoes}
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="mr-2 h-8 w-8 animate-spin" /> : "Atslēgt un sākt ciklu"}
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/" className="flex items-center justify-center">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Atpakaļ uz galveno izvēlni
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </main>
    );
}
