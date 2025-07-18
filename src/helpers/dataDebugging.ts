// Imports
import { getCode as getCountryCode, getName as getCountryName } from 'country-list';
import { getStateCodeByStateName } from 'us-state-codes';

// -------------------------------------------------------------------------

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

// -------------------------------------------------------------------------

/**
 * Convierte el nombre de un país o estado a su código de dos caracteres
 * @param location - El nombre del país o estado a convertir
 * @returns El código de dos caracteres del país/estado, o string vacía si no se puede convertir
 */
export function convertToTwoCharCode(location: string): string {
  try {
    // Si la entrada está vacía o es null/undefined, retornar string vacía
    if (!location || typeof location !== 'string') {
      return '';
    }

    // Limpiar y normalizar la entrada
    const cleanLocation = location.trim();

    // Si ya es un código de 2 caracteres, validar y retornar
    if (cleanLocation.length === 2) {
      const upperCode = cleanLocation.toUpperCase();

      // Verificar si es un código de país válido
      const countryName = getCountryName(upperCode);
      if (countryName) {
        return upperCode;
      }

      // Si no es país, asumir que podría ser estado y retornar tal como está
      return upperCode;
    }

    // Intentar convertir como país primero
    const countryCode = getCountryCode(cleanLocation);
    if (countryCode) {
      return countryCode.toUpperCase();
    }

    // Si no es país, intentar convertir como estado de EE.UU.
    const stateCode = getStateCodeByStateName(cleanLocation);
    if (stateCode) {
      return stateCode.toUpperCase();
    }

    // Si no se pudo convertir, retornar string vacía
    return '';

  } catch (error) {
    // En caso de cualquier error, retornar string vacía como se solicitó
    console.warn('Error converting location to two-char code:', error);
    return '';
  }
}