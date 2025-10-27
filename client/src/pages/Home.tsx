import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Settings as SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CountryCodeSelector } from "@/components/CountryCodeSelector";
import { ClipboardNotification } from "@/components/ClipboardNotification";
import { AdBanner } from "@/components/AdBanner";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { formatPhoneNumber, detectPhoneNumberFromClipboard } from "@/lib/phoneUtils";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [, setLocation] = useLocation();
  const [phoneInput, setPhoneInput] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [clipboardNumber, setClipboardNumber] = useState<string | null>(null);
  const [clipboardPermissionDenied, setClipboardPermissionDenied] = useState(false);
  const { toast } = useToast();
  const clipboardIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const { formatted, isValid, international } = formatPhoneNumber(
    phoneInput,
    countryCode
  );

  useEffect(() => {
    const savedCountryCode = localStorage.getItem("defaultCountryCode");
    if (savedCountryCode) {
      setCountryCode(savedCountryCode);
    }
  }, []);

  useEffect(() => {
    const checkClipboard = async () => {
      if (clipboardPermissionDenied) {
        return;
      }

      try {
        if (navigator.clipboard && navigator.clipboard.readText) {
          const text = await navigator.clipboard.readText();
          const detectedNumber = detectPhoneNumberFromClipboard(text);
          
          if (detectedNumber && detectedNumber !== phoneInput) {
            setClipboardNumber(detectedNumber);
          }
        }
      } catch (error: any) {
        if (error?.name === 'NotAllowedError') {
          setClipboardPermissionDenied(true);
          if (clipboardIntervalRef.current) {
            clearInterval(clipboardIntervalRef.current);
            clipboardIntervalRef.current = null;
          }
        }
      }
    };

    checkClipboard();
    
    if (!clipboardPermissionDenied) {
      clipboardIntervalRef.current = setInterval(checkClipboard, 3000);
    }

    return () => {
      if (clipboardIntervalRef.current) {
        clearInterval(clipboardIntervalRef.current);
      }
    };
  }, [phoneInput, clipboardPermissionDenied]);

  const handleUseClipboardNumber = () => {
    if (clipboardNumber) {
      setPhoneInput(clipboardNumber);
      setClipboardNumber(null);
    }
  };

  const handleOpenWhatsApp = () => {
    if (!isValid) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number to continue.",
        variant: "destructive",
      });
      return;
    }

    const whatsappNumber = international.replace("+", "");
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;
    
    window.open(whatsappUrl, "_blank");
    
    toast({
      title: "Opening WhatsApp",
      description: "Taking you to WhatsApp...",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-primary text-primary-foreground shadow-sm sticky top-0 z-30">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="text-lg font-semibold">WhatsApp Quick Message</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/settings")}
            className="text-primary-foreground hover:bg-primary-foreground/10 h-9 w-9"
            data-testid="button-open-settings"
          >
            <SettingsIcon className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {clipboardNumber && (
        <ClipboardNotification
          phoneNumber={clipboardNumber}
          onUse={handleUseClipboardNumber}
          onDismiss={() => setClipboardNumber(null)}
        />
      )}

      <main className="flex-1 px-4 py-6 pb-[70px] md:pb-[80px] max-w-md mx-auto w-full">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-2">
              <WhatsAppIcon className="w-9 h-9 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              Send Message to Any Number
            </h2>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Enter a phone number to open WhatsApp chat without saving the contact
            </p>
          </div>

          <Card className="p-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Phone Number
              </label>
              <div className="flex gap-2">
                <CountryCodeSelector value={countryCode} onChange={setCountryCode} />
                <Input
                  type="tel"
                  placeholder="Enter phone number"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="flex-1 h-14 text-base"
                  data-testid="input-phone-number"
                />
              </div>
            </div>

            {phoneInput && (
              <div className="rounded-md bg-accent p-3 space-y-1">
                <p className="text-xs text-muted-foreground">
                  Will message:
                </p>
                <p className={`text-sm font-medium ${isValid ? 'text-foreground' : 'text-destructive'}`} data-testid="text-formatted-number">
                  {formatted || phoneInput}
                </p>
                {!isValid && phoneInput && (
                  <p className="text-xs text-destructive mt-1" data-testid="text-error-message">
                    Please enter a valid phone number
                  </p>
                )}
              </div>
            )}

            <Button
              onClick={handleOpenWhatsApp}
              disabled={!isValid || !phoneInput}
              className="w-full h-14 text-base font-medium gap-2"
              data-testid="button-open-whatsapp"
            >
              <WhatsAppIcon className="w-6 h-6" />
              Open in WhatsApp
            </Button>
          </Card>

          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              Supported formats:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {["9841019047", "+919841019047", "098410 19047", "+91-98410-19047"].map((format) => (
                <code
                  key={format}
                  className="text-xs bg-muted px-2 py-1 rounded"
                >
                  {format}
                </code>
              ))}
            </div>
          </div>
        </div>
      </main>

      <AdBanner />
    </div>
  );
}
