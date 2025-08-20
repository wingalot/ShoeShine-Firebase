"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CodeEntryDialog } from '@/components/code-entry';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [isOccupied, setIsOccupied] = useState(false);
  const [isCodeDialogOpen, setIsCodeDialogOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (searchParams.get('placed') === 'true') {
      setIsOccupied(true);
      toast({
        title: "Apavi ievietoti",
        description: "Dezinfekcijas cikls ir sācies. Jūsu kods ir 111111.",
      });
      // Clean the URL
      router.replace('/', {scroll: false});
    }
  }, [searchParams, router, toast]);

  const handleUnlockSuccess = () => {
    setIsOccupied(false);
    setIsCodeDialogOpen(false);
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
        >
          <Link href="/place">
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

      <CodeEntryDialog
        open={isCodeDialogOpen}
        onOpenChange={setIsCodeDialogOpen}
        onSuccess={handleUnlockSuccess}
      />
    </main>
  );
}
