import '@radix-ui/themes/styles.css';
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Container, Theme } from '@radix-ui/themes';
import NavBar from './NavBar';
import { CartProvider } from './CartContext';
import CartIcon from './components/CartIcon';
import { ThemeProvider } from 'next-themes'

import ShowCartIcon from './ShowCartIcon';
import { SessionProvider } from 'next-auth/react';
import { FCMProvider } from './FCMTokenContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
        <CartProvider>
          <FCMProvider>
          <ThemeProvider attribute='class'>
            <Theme accentColor='grass'>
             <NavBar />
       
        <main>
          <Container>
            {children}
           <ShowCartIcon />
            </Container></main>
        </Theme>
      </ThemeProvider>
    </FCMProvider>
  </CartProvider>
  </SessionProvider>
</body>
</html>
  );
}
