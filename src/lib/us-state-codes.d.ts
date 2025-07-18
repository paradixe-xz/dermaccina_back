declare module 'us-state-codes' {
  export function getStateCodeByStateName(stateName: string): string | null;
  export function getStateNameByStateCode(stateCode: string): string | null;
  // Agrega otras funciones que uses de la librería
}