// app/components/layout/RootLayout.tsx
import {Header} from './Header';
import {Footer} from './Footer';

export function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}