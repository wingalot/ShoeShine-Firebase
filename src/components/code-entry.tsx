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
import { unlockDoorAndAwaitOpen } from '@/services/home-assistant';


const TEST_CODE = "111111";

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

  const handleSubmit = async () => {
    if (code === TEST_CODE) {
      setIsLoading(true);
      setError('');
      try {
        toast({
          title: "Atslēdz durvis...",
          description: "Lūdzu, atveriet skapīša durvis.",
        });
        await unlockDoorAndAwaitOpen();
        onSuccess();
        setCode('');
      } catch (error) {
        console.error(error);
        toast({
            variant: "destructive",
            title: "Kļūda",
            description: (error instanceof Error) ? error.message : "Neizdevās atslēgt durvis.",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setError('Nepareizs kods. Mēģiniet vēlreiz.');
      toast({
        variant: "destructive",
        title: "Kļūda",
        description: "Ievadītais kods ir nepareizs.",
      });
      setCode('');
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
            Ievadiet kodu, lai atvērtu skapīti. Testa kods ir 111111.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="code" className="text-right">
              Kods
            </Label>
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="col-span-3"
              type="password"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isLoading) {
                  handleSubmit();
                }
              }}
              autoFocus
              disabled={isLoading}
            />
          </div>
          {error && <p className="text-sm font-medium text-destructive text-center col-span-4">{error}</p>}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Apstiprināt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
