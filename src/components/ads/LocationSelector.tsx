"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MapPin, ChevronRight } from "lucide-react";
import { bdLocations } from "@/constants/locations";
import { useSmartFilter } from "@/hooks/useSmartFilter";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslations } from "next-intl";

interface LocationSelectorProps {
    value?: string | null;
    onSelect?: (location: string | null) => void;
    className?: string;
    placeholder?: string;
}

export const LocationSelector = ({ value, onSelect, className, placeholder }: LocationSelectorProps) => {
    const t = useTranslations("Location");
    const { getFilter, updateFilter } = useSmartFilter();
    const [hoveredDivision, setHoveredDivision] = useState(bdLocations[0]);
    const [isOpen, setIsOpen] = useState(false);
    
    // Use props if provided, otherwise fallback to hook
    const selectedLocation = value !== undefined ? value : getFilter("location");

    const handleSelect = (location: string | null) => {
        if (onSelect) {
            onSelect(location);
        } else {
            updateFilter("location", location);
        }
        setIsOpen(false);
    };

    // Helper to translate if key exists
    const formatName = (name: string) => {
        // We use the name as key. next-intl returns key if translation is missing.
        // To avoid issues with spaces or special chars in keys, we should be careful.
        // But for divisions/districts it should be fine if we add them to JSON.
        return t.has(name) ? t(name) : name;
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className={cn(
                    "h-10 rounded-full border-border/40 bg-background pl-4 pr-8 text-sm font-normal text-muted-foreground min-w-48 lg:w-56 justify-start relative group hover:border-primary/40 transition-all shadow-sm",
                    className
                  )}
                >
                    <MapPin className="shrink-0 transition-transform group-hover:scale-110" />
                    <span className="truncate flex-1 text-left text-foreground/80">
                      {selectedLocation ? formatName(selectedLocation) : (placeholder || t("selectLocation"))}
                    </span>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 group-hover:opacity-100 transition-opacity">
                       <ChevronRight className={cn("h-3 w-3 rotate-90 transition-transform duration-200", isOpen && "-rotate-90")} />
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-120 p-0 overflow-hidden rounded-3xl shadow-2xl border-border/40 bg-background/95 backdrop-blur-sm" 
              align="start"
              sideOffset={8}
            >
                <div className="flex h-95">
                    {/* Divisions List */}
                    <div className="w-45 border-r border-border/40 bg-muted/10 py-3">
                        <div className="px-5 py-2 mb-2">
                           <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em]">{t("divisions")}</p>
                        </div>
                        <ScrollArea className="h-[calc(100%-40px)]">
                            <div className="px-2 space-y-0.5">
                                {bdLocations.map((loc) => (
                                    <button
                                        key={loc.division}
                                        onMouseEnter={() => setHoveredDivision(loc)}
                                        className={cn(
                                            "flex w-full items-center justify-between px-3 py-2.5 text-sm rounded-xl transition-all duration-200",
                                            hoveredDivision.division === loc.division 
                                              ? "bg-primary text-primary-foreground shadow-md translate-x-1" 
                                              : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                                        )}
                                    >
                                        <span className="font-medium">{formatName(loc.division)}</span>
                                        <ChevronRight className={cn("h-3.5 w-3.5 opacity-60", hoveredDivision.division === loc.division && "opacity-100")} />
                                    </button>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>

                    {/* Districts List */}
                    <div className="flex-1 py-3 bg-background/50">
                        <div className="px-6 py-2 mb-2 flex items-center justify-between">
                           <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em]">
                             {t("districtsIn", { division: formatName(hoveredDivision.division) })}
                           </p>
                           <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">{hoveredDivision.districts.length}</span>
                        </div>
                        <ScrollArea className="h-[calc(100%-40px)]">
                            <div className="px-3 grid grid-cols-1 gap-0.5">
                                {hoveredDivision.districts.map((district) => (
                                    <button
                                        key={district}
                                        onClick={() => handleSelect(district)}
                                        className={cn(
                                            "flex w-full items-center px-4 py-2.5 text-sm rounded-xl transition-all duration-200 text-left",
                                            selectedLocation === district 
                                              ? "bg-primary/10 text-primary font-bold shadow-inner" 
                                              : "text-foreground/70 hover:bg-primary/5 hover:text-primary hover:translate-x-1"
                                        )}
                                    >
                                        <div className={cn(
                                          "w-1.5 h-1.5 rounded-full mr-3 transition-all",
                                          selectedLocation === district ? "bg-primary scale-125" : "bg-muted-foreground/30"
                                        )} />
                                        {formatName(district)}
                                    </button>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
                
                {/* Footer (Optional) */}
                <div className="p-3 bg-muted/20 border-t border-border/40 flex items-center justify-between px-6">
                    <p className="text-[11px] text-muted-foreground italic">
                      {t("tip")}
                    </p>
                    {selectedLocation && (
                      <button 
                        onClick={() => handleSelect(null)}
                        className="text-[11px] font-bold text-primary hover:underline"
                      >
                        {t("clearSelection")}
                      </button>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
};
