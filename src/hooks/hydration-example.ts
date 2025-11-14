/**
 * Exemplo de como usar useIsHydrated para evitar problemas de renderização
 * Use este padrão em componentes que têm diferenças entre server e client rendering
 */

import { useIsHydrated } from "@/hooks/useIsHydrated";

// Exemplo de uso em um componente que pode ter problemas de hidratação:

// export default function ComponentWithHydrationIssues() {
//   const isHydrated = useIsHydrated();

//   // Evita renderizar até que seja hidratado
//   if (!isHydrated) {
//     return <div>Carregando...</div>; // ou um skeleton
//   }

//   return (
//     <div>
//       {/* Seu conteúdo que pode causar problemas de hidratação */}
//     </div>
//   );
// }
