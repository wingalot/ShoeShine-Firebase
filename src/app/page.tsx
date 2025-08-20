"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CodeEntryDialog } from '@/components/code-entry';
import { cn } from '@/lib/utils';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [isOccupied, setIsOccupied] = useState(false);
  const [isCodeDialogOpen, setIsCodeDialogOpen] = useState(false);

  const handleUnlockSuccess = () => {
    setIsOccupied(false);
    setIsCodeDialogOpen(false);
  };

  return (
    <main className={cn(
      "flex min-h-screen flex-col items-center justify-center p-8 transition-colors duration-500",
      isOccupied ? "bg-gradient-to-br from-red-400 to-red-600" : "bg-background"
    )}>
      
      <div className="absolute top-4 right-4 flex items-center space-x-2 bg-card/80 backdrop-blur-sm p-3 rounded-lg shadow-md border">
        <Switch id="occupied-toggle" checked={isOccupied} onCheckedChange={setIsOccupied} />
        <Label htmlFor="occupied-toggle">Skapītis aizņemts</Label>
      </div>

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
