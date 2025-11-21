import "../styles/globals.css";
import "../styles/font.css"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-maison">
        {children}
      </body>
    </html>
  );
}
