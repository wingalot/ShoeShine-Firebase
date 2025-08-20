"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export default function PlacePage() {
    const router = useRouter();

    const handlePlaceShoes = () => {
        // In a real app, this would trigger an API call to start the disinfection
        // and update the cabinet state. For this UI prototype, we just navigate
        // back to the main menu. The state can be toggled manually from there.
        router.push('/');
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl font-headline">Ievietot apavus</CardTitle>
                    <CardDescription>
                        Nospiediet pogu, lai apstiprinātu apavu ievietošanu un sāktu dezinfekcijas ciklu.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col space-y-4">
                    <Button
                        size="lg"
                        className="w-full h-24 text-xl font-bold text-primary-foreground bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg transition-all duration-200 active:scale-95 active:opacity-90"
                        onClick={handlePlaceShoes}
                    >
                        Ielikt apavus
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
