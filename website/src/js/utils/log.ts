/**
 * Log Console
 * @param lable 
 * @param color 
 */
export const log = (lable: string, color = 'green') => {
    console.log(`%c ${lable}`, `color:${color};`);
};