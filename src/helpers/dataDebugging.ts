// Imports
import { getCode as getCountryCode, getName as getCountryName } from 'country-list';
import { UsaStates } from 'usa-states';

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
    if (!location || typeof location !== 'string') {
      return '';
    }
    const cleanLocation = location.trim();
    if (cleanLocation.length === 2) {
      const upperCode = cleanLocation.toUpperCase();
      const countryName = getCountryName(upperCode);
      if (countryName) {
        return upperCode;
      }
      return upperCode;
    }
    const countryCode = getCountryCode(cleanLocation);
    if (countryCode) {
      return countryCode.toUpperCase();
    }
    // Buscar código de estado de EE.UU. usando usa-states
    const usStates = new UsaStates();
    const state = usStates.states.find(s => s.name.toLowerCase() === cleanLocation.toLowerCase());
    if (state) {
      return state.abbreviation;
    }
    return '';
  } catch (error) {
    console.warn('Error converting location to two-char code:', error);
    return '';
  }
}