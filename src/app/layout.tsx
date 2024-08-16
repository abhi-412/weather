import { UnitProvider } from '../context/UnitContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UnitProvider>
          {children}
        </UnitProvider>
      </body>
    </html>
  );
}
