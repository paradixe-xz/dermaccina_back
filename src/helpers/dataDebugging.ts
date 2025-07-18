/**
 * Versión alternativa usando expresión regular para mayor flexibilidad
 * @param symbol - El símbolo que se quiere quitar de la string
 * @param text - La string de la cual se quiere quitar el símbolo
 * @returns La string sin el símbolo especificado
 */
export function removeSymbolRegex(symbol: string, text: string): string {
  // Escapar caracteres especiales de regex y crear expresión regular global
  const escapedSymbol = symbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escapedSymbol, 'g');
  return text.replace(regex, '');
}