/**
 * Initial Window 
 * @returns Window | null
 */
export const initialWindow = (): Window | null => {
    const params = `width=800,height=400,left=-120,top=-600`;
    return window.open('http://localhost:3000', 'prokey-link', params);
};