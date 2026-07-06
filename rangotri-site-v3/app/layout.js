export const metadata = {
  title: "Rangotri Hosiery Mills — Wholesale T-Shirt Manufacturer, Ludhiana",
  description: "Bulk t-shirt and hosiery manufacturing from Ludhiana, Punjab. Combed cotton, poly-blend and supima fabrics, custom printing, MOQ 100 pieces.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;600&display=swap"
        />
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
