export const metadata = {
  title: "Rangotri Hosiery Mills — Wholesale T-Shirt Manufacturer, Ludhiana",
  description: "Bulk t-shirt and hosiery manufacturing from Ludhiana, Punjab. Combed cotton, poly-blend and supima fabrics, custom printing, MOQ 100 pieces.",
  manifest: "/manifest.json",
  themeColor: "#1B3350",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;600&display=swap"
        />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body style={{ margin: 0 }}>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function(err) {
                    console.log('Service worker registration failed:', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
