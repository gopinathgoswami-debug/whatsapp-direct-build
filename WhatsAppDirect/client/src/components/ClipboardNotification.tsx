import { useEffect, useState } from "react";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ClipboardNotificationProps {
  phoneNumber: string;
  onUse: () => void;
  onDismiss: () => void;
}

export function ClipboardNotification({ phoneNumber, onUse, onDismiss }: ClipboardNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
    
    const timer = setTimeout(() => {
      handleDismiss();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss(), 300);
  };

  const handleUse = () => {
    onUse();
    handleDismiss();
  };

  return (
    <div
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
      }`}
      style={{ maxWidth: "480px", margin: "0 auto" }}
    >
      <div className="bg-accent border border-primary/20 rounded-lg p-4 shadow-lg flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">
              Phone number detected
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {phoneNumber}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            size="sm"
            onClick={handleUse}
            className="h-8 px-3"
            data-testid="button-use-clipboard"
          >
            Use
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleDismiss}
            className="h-8 w-8 flex-shrink-0"
            data-testid="button-dismiss-notification"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
