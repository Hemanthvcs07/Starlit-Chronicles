import Navbar from "../components/Navbar"; // Import Navbar globally
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <title>Starlit Chronicles</title>
      </head>
      <body className="antialiased">
        <Navbar /> {/* Render Navbar globally */}
        {children} {/* Render page content */}
      </body>
    </html>
  );
}
