"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export default function Accordion({ items, className }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={cn("divide-y divide-border rounded-sm border border-border", className)}>
      {items.map((item, i) => (
        <div key={i} className="group">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-start justify-between gap-4 p-5 lg:p-6 text-left bg-white hover:bg-grey-50 transition-colors first:rounded-t-sm last:rounded-b-sm"
            aria-expanded={open === i}
          >
            <span className="font-semibold text-grey-900 text-sm lg:text-base leading-relaxed">
              {item.question}
            </span>
            <ChevronDown
              className={cn(
                "w-5 h-5 text-grey-400 flex-shrink-0 mt-0.5 transition-transform duration-300",
                open === i && "rotate-180 text-primary"
              )}
            />
          </button>

          <div
            className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              open === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <div className="px-5 lg:px-6 pb-5 lg:pb-6 bg-white">
              <p className="text-grey-600 text-sm leading-relaxed">{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
