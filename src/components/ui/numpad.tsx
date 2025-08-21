"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface NumpadProps {
  onKeyPress: (key: string) => void;
  onDelete: () => void;
}

export function Numpad({ onKeyPress, onDelete }: NumpadProps) {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <div className="grid grid-cols-3 gap-2">
      {keys.map((key) => (
        <Button
          key={key}
          type="button"
          variant="outline"
          className="h-16 text-2xl"
          onClick={() => onKeyPress(key)}
        >
          {key}
        </Button>
      ))}
      <div />
      <Button
        type="button"
        variant="outline"
        className="h-16 text-2xl"
        onClick={() => onKeyPress("0")}
      >
        0
      </Button>
      <Button
        type="button"
        variant="outline"
        className="h-16 flex items-center justify-center"
        onClick={onDelete}
        aria-label="Delete last digit"
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>
    </div>
  );
}
