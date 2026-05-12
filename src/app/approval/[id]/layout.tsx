import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

/**
 * Rota /approval/[id] fica fora de /[locale].
 * Não usar aqui o layout de locale: não existe params.locale → notFound().
 */
export default function ApprovalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
