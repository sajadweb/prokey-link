/**
 * Initial Window  TODO change in production
 * @returns Window | null
 */
export const initialWindow = (): Window | null => {
    try {
        const params = `width=800,height=400,left=-120,top=-600`;
        //TODO change in production
        return window.open('http://localhost:3000', 'prokey-link', params);
    } catch (error) {
        console.log('initialWindow', error);
        return null;
    }
};
