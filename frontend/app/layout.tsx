import type { Metadata } from "next";
import "./globals.css";
import { StyledComponentsRegistry } from "@/src/lib/registry";
import { AuthProvider } from "@/src/contexts/AuthContext";
import { ToastProvider } from "@/src/contexts/ToastContext";

export const metadata: Metadata = {
  title: "Portal Interno - Gestão de Pedidos",
  description: "Sistema de gestão de pedidos de insumos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <StyledComponentsRegistry>
          <AuthProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </AuthProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
