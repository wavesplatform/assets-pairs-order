// Type definitions for assets-pair-order
// Definitions by: ishmidt
declare module '@waves/assets-pairs-order' {
  type TPair = [string, string];
  export type TOrderPair = (a: string, b: string) => TPair;

  export function createOrderPair(predefinedList: string[]): TOrderPair;
  export function createOrderPair(
    predefinedList: string[],
    a: string,
    b: string
  ): TPair;

  export const MAINNET_DATA: string[];
}