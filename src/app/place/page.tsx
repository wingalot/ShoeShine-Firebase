"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Numpad } from '@/components/ui/numpad';

const formSchema = z.object({
  phone: z.string().length(8, {
    message: "Telefona numuram jāsastāv no 8 cipariem.",
  }).regex(/^\d{8}$/, {
    message: "Telefona numurs drīkst saturēt tikai ciparus.",
  }),
});

export default function PlacePage() {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phone: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Pagaidām tikai paziņojums, nākamajā solī pievienosim tālāko loģiku.
        console.log("Ievadītais numurs:", values.phone);
        toast({
            title: "Numurs pieņemts",
            description: `Jūsu numurs ${values.phone} ir saglabāts.`,
        });
        // TODO: Pievienot tālāko cikla loģiku šeit.
    }

    const handleKeyPress = (key: string) => {
        const currentValue = form.getValues("phone");
        if (currentValue.length < 8) {
            form.setValue("phone", currentValue + key, { shouldValidate: true });
        }
    };

    const handleDelete = () => {
        const currentValue = form.getValues("phone");
        form.setValue("phone", currentValue.slice(0, -1), { shouldValidate: true });
    };
    
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl font-headline">Ievietot apavus</CardTitle>
                    <CardDescription>
                        Lūdzu, ievadiet savu telefona numuru (8 cipari), lai mēs varētu jūs informēt, kad cikls būs pabeigts.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col space-y-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Telefona numurs</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="________" 
                                                {...field} 
                                                type="tel" 
                                                maxLength={8} 
                                                readOnly 
                                                className="text-center text-2xl tracking-[.2em]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <Numpad onKeyPress={handleKeyPress} onDelete={handleDelete} />
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full h-16 text-xl font-bold text-primary-foreground bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg transition-all duration-200 active:scale-95 active:opacity-90"
                            >
                                Ievadīt
                            </Button>
                        </form>
                    </Form>
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
