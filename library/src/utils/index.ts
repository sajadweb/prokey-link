export * from './log';
export * from './info';
export * from './window';
export * from './stream-utils';
export * from './events';

/**
 * Sleep
 * @param ms : Millisecond;
 * @returns Promise
 */
export function sleep(ms: number): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
