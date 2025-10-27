import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { popularCountryCodes, type CountryCode } from "@shared/schema";

interface CountryCodeSelectorProps {
  value: string;
  onChange: (dialCode: string) => void;
}

export function CountryCodeSelector({ value, onChange }: CountryCodeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedCountry = popularCountryCodes.find((c) => c.dialCode === value);

  const filteredCountries = popularCountryCodes.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.dialCode.includes(searchQuery) ||
      country.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (country: CountryCode) => {
    onChange(country.dialCode);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="w-24 justify-between flex-shrink-0 h-14 px-3"
        data-testid="button-country-selector"
      >
        <span className="text-base font-medium">
          {selectedCountry?.flag} {value}
        </span>
        <ChevronDown className="w-4 h-4 ml-1 opacity-50" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Select Country Code</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Search country or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10"
              data-testid="input-country-search"
            />
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-1">
                {filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => handleSelect(country)}
                    className="w-full flex items-center justify-between p-3 rounded-md hover-elevate active-elevate-2 text-left border border-transparent"
                    data-testid={`button-country-${country.code}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{country.flag}</span>
                      <div>
                        <p className="font-medium text-sm">{country.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {country.dialCode}
                        </p>
                      </div>
                    </div>
                    {value === country.dialCode && (
                      <Check className="w-5 h-5 text-primary" />
                    )}
                  </button>
                ))}
                {filteredCountries.length === 0 && (
                  <p className="text-center text-muted-foreground py-8 text-sm">
                    No countries found
                  </p>
                )}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
