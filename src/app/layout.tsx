import Navbar from "../components/Navbar"; // Import Navbar globally
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"
        />
        <title>Starlit Chronicles</title>
      </head>
      <body className="antialiased"> {/* Added responsive padding for sides */}
        <Navbar /> {/* Render Navbar globally */}
        <main className="container pt-16 px-4 sm:px-8 lg:px-6 mx-auto my-8">{children}</main> {/* Added margin-top and side padding */}
      </body>
    </html>
  );
}
