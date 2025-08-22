"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CodeEntryDialog } from '@/components/code-entry';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import { getActiveSession } from '@/services/storage';
import { forceResetState } from '@/services/home-assistant';
import { ShieldAlert } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


export default function Home() {
  const [isOccupied, setIsOccupied] = useState(false);
  const [isCodeDialogOpen, setIsCodeDialogOpen] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Check server state on initial load
    const checkSession = async () => {
      const session = await getActiveSession();
      if (session) {
        setIsOccupied(true);
        
        // If the session start time is more than 30 minutes ago,
        // assume it's a stuck session from a restart.
        const startTime = new Date(session.startTime).getTime();
        const now = new Date().getTime();
        if (now - startTime > 30 * 60 * 1000) {
            setShowReset(true);
        }
      }
    };
    checkSession();
  }, []);

  useEffect(() => {
    if (searchParams.get('placed') === 'true') {
      const code = searchParams.get('code');
      setIsOccupied(true);
      setShowReset(false);
      toast({
        title: "Apavi ievietoti",
        description: `Dezinfekcijas cikls ir sācies. Jūsu kods ir ${code}. Jūs saņemsiet paziņojumu, kad apavi būs gatavi.`,
        duration: 10000,
      });
      // Clean the URL
      router.replace('/', {scroll: false});
    }
  }, [searchParams, router, toast]);

  const handleUnlockSuccess = () => {
    setIsOccupied(false);
    setShowReset(false);
    setIsCodeDialogOpen(false);
     toast({
        title: "Skapītis atvērts",
        description: "Lūdzu, izņemiet savus apavus.",
      });
  };

  const handleForceReset = async () => {
    try {
        await forceResetState();
        setIsOccupied(false);
        setShowReset(false);
        toast({
            title: "Sistēma atiestatīta",
            description: "Iesprūdusī sesija ir notīrīta. Sistēma ir gatava darbam.",
        });
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Kļūda",
            description: "Neizdevās atiestatīt sistēmu. Pārbaudiet konsoli.",
        });
    }
  };

  return (
    <main className={cn(
      "flex min-h-screen flex-col items-center justify-center p-8 transition-colors duration-500",
      isOccupied ? "bg-gradient-to-br from-red-400 to-red-600" : "bg-background"
    )}>
      
      <div className="flex flex-col space-y-8 w-full max-w-md">
        <Button
          asChild
          size="lg"
          className="w-full h-40 text-3xl font-bold text-primary-foreground bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg transition-all duration-200 active:scale-95 active:opacity-90"
          disabled={isOccupied}
        >
          <Link href={isOccupied ? '#' : '/place'}>
            Ievietot apavus
          </Link>
        </Button>
        <Button
          size="lg"
          className="w-full h-40 text-3xl font-bold text-primary-foreground bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg transition-all duration-200 active:scale-95 active:opacity-90 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
          onClick={() => setIsCodeDialogOpen(true)}
          disabled={!isOccupied}
        >
          Izņemt apavus
        </Button>
      </div>

      {showReset && (
         <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="absolute bottom-4 right-4">
                <ShieldAlert className="mr-2 h-4 w-4" /> Piespiedu Atiestatīšana
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Vai esat pārliecināts?</AlertDialogTitle>
              <AlertDialogDescription>
                Šī darbība piespiedu kārtā atiestatīs sistēmas stāvokli, izslēgs visas iekārtas un notīrīs iesprūdušo sesiju. Izmantojiet tikai tad, ja sistēma nereaģē pēc restarta.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Atcelt</AlertDialogCancel>
              <AlertDialogAction onClick={handleForceReset}>Jā, atiestatīt</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <CodeEntryDialog
        open={isCodeDialogOpen}
        onOpenChange={setIsCodeDialogOpen}
        onSuccess={handleUnlockSuccess}
      />
    </main>
  );
}
