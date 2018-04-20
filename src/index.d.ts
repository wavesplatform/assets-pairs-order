// Type definitions for assets-pair-order
// Definitions by: ishmidt
declare module '@waves/assets-pairs-order' {
  export type TOrderPair = (a: string, b: string) => string[];

  export function createOrderPair(predefinedList: string[]): orderPair;
  export function createOrderPair(
    predefinedList: string[],
    a: string,
    b: string
  ): string[];

  export const MAINNET_DATA: string[];
}