import * as ObjectMultiplex from 'obj-multiplex';
import * as pump from 'pump';

/**
 * @ignore
 * Sets up stream multiplexing for the given stream
 * @param {any} connectionStream - the stream to mux
 * @returns {stream.Stream} the multiplexed stream
 */
export function setupMultiplex(connectionStream: any) {
    const mux = new ObjectMultiplex();
    pump(connectionStream, mux, connectionStream, (err: any) => {
        if (err) {
            console.error(err);
        }
    });
    return mux;
}
