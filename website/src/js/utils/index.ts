export * from "./log";
export * from "./events";
export * from "./coin";

/**
 * Sleep
 * @param ms : Millisecond;
 * @returns Promise
 */
export function sleep(ms: number): Promise<any> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
