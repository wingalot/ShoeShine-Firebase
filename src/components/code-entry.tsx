"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Loader2 } from 'lucide-react';
import { unlockDoorAndAwaitOpen, checkCode, finishSession } from '@/services/home-assistant';
import { Numpad } from '@/components/ui/numpad';

interface CodeEntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function CodeEntryDialog({ open, onOpenChange, onSuccess }: CodeEntryDialogProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleKeyPress = (key: string) => {
    // A 6-digit code is expected
    if (code.length < 6) {
        setCode(prevCode => prevCode + key);
    }
  };

  const handleDelete = () => {
      setCode(prevCode => prevCode.slice(0, -1));
  };


  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');
    try {
      const isCodeCorrect = await checkCode(code);
      if (isCodeCorrect) {
        toast({
          title: "Atslēdz durvis...",
          description: "Lūdzu, atveriet skapīša durvis.",
        });
        await unlockDoorAndAwaitOpen();
        await finishSession(); // Clear the stored phone number and code
        onSuccess();
        setCode('');
      } else {
        setError('Nepareizs kods. Mēģiniet vēlreiz.');
        toast({
          variant: "destructive",
          title: "Kļūda",
          description: "Ievadītais kods ir nepareizs.",
        });
        setCode('');
      }
    } catch (error) {
      console.error(error);
      toast({
          variant: "destructive",
          title: "Kļūda",
          description: (error instanceof Error) ? error.message : "Notika neparedzēta kļūda.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
        setCode('');
        setError('');
    }
    onOpenChange(isOpen);
  }
  
  useEffect(() => {
    if(open) {
      setError('');
      setCode('');
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ievadiet kodu</DialogTitle>
          <DialogDescription>
            Ievadiet kodu, kuru saņēmāt paziņojumā, lai atvērtu skapīti.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <Label htmlFor="code" className="text-center">
              Kods
            </Label>
            <Input
              id="code"
              value={code}
              readOnly
              className="text-center text-2xl tracking-[.2em]"
              placeholder="______"
              maxLength={6}
              disabled={isLoading}
            />
            {error && <p className="text-sm font-medium text-destructive text-center col-span-4">{error}</p>}
            <Numpad onKeyPress={handleKeyPress} onDelete={handleDelete} />
        </div>
        <DialogFooter>
           <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} disabled={isLoading}>
            Atcelt
          </Button>
          <Button type="submit" onClick={handleSubmit} disabled={isLoading || code.length < 6}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Apstiprināt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
