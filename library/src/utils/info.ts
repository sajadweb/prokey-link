import { LibInformation } from "../interface";

/**
 * Receive library type information
 * @returns lib type
 */
export function getInformationLib(): LibInformation {
    try {
        return {
            type: 'chrome',
            id: chrome.runtime.id,
        };
    } catch (e) {
        //TODO add detect the Mozilla browser
        return {
            type: 'website',
        };
    }
}
