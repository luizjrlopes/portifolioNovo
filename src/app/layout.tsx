import type { Metadata } from "next";
import StyledComponentsRegistry from "./registry";
import { Providers } from "./providers";

export const metadata: Metadata = { title: "Portfólio | Luiz Junior" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <StyledComponentsRegistry>
        <body>
          <Providers>{children}</Providers>
        </body>
      </StyledComponentsRegistry>
    </html>
  );
}
