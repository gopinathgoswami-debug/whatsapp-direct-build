import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CountryCodeSelector } from "@/components/CountryCodeSelector";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [, setLocation] = useLocation();
  const [defaultCountryCode, setDefaultCountryCode] = useState("+91");
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem("defaultCountryCode");
    if (saved) {
      setDefaultCountryCode(saved);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("defaultCountryCode", defaultCountryCode);
    toast({
      title: "Settings saved",
      description: "Your default country code has been updated.",
    });
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-primary text-primary-foreground shadow-sm sticky top-0 z-30">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/")}
            className="text-primary-foreground hover:bg-primary-foreground/10 h-9 w-9"
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Settings</h1>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 max-w-md mx-auto w-full">
        <Card className="p-6 space-y-6">
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">
                Default Country Code
              </h3>
              <p className="text-xs text-muted-foreground">
                This will be used when entering phone numbers without a country code
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <CountryCodeSelector
                value={defaultCountryCode}
                onChange={setDefaultCountryCode}
              />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">
                  Selected: <span className="font-medium text-foreground">{defaultCountryCode}</span>
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={handleSave}
            className="w-full h-12 gap-2"
            data-testid="button-save-settings"
          >
            <Check className="w-5 h-5" />
            Save Settings
          </Button>
        </Card>

        <div className="mt-6 p-4 bg-accent/50 rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-2">About</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            This app helps you send WhatsApp messages to phone numbers that aren't saved in your contacts. 
            Simply enter any phone number and tap the button to start chatting.
          </p>
        </div>
      </main>
    </div>
  );
}
