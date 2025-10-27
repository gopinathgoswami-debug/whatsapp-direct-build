export function AdBanner() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40">
      <div className="h-[50px] md:h-[60px] flex items-center justify-center">
        <div className="w-full h-full flex items-center justify-center bg-muted/30">
          <p className="text-xs text-muted-foreground text-center px-4">
            Ad Space - Replace with your ad provider code
          </p>
        </div>
      </div>
      
      {/* 
        ==========================================
        REPLACE THE CONTENT ABOVE WITH YOUR AD CODE
        ==========================================
        
        IMPORTANT: For script-based ads, add the ad network's main script to index.html
        in the <head> section, then replace the div content above with the ad unit code.
        
        Example for Google AdSense:
        
        1. Add to client/index.html <head>:
           <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
                   crossorigin="anonymous"></script>
        
        2. Replace the div content above with:
           <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-XXXXXXXXXX"
                data-ad-slot="XXXXXXXXXX"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
           <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
           </script>
        
        Example for other ad networks:
        Follow their integration guide - usually requires adding a script tag to index.html
        and replacing this placeholder div with their ad unit code.
        
        ==========================================
      */}
    </div>
  );
}
