/**
 * 
 * A simple event emitter with Functional Programming juice.
 * Credit: Inspired by the article by Dave Atchley @ https://www.datchley.name/es6-eventemitter/
 */

export const eventEmitter = () => {
    let events = new Map();
    
    /**
     * Utility functions
     * @private
     */
    function isValidCallback (fn) {
        return typeof fn === 'function';
    }

    function isValidEvent (event) {
        return events.has(event) && events.get(event);
    }

    /**
     * Attaches a callback to an event.
     * 
     * @param {string} event The event name.
     * @param {Object} fn The callback function to invoke when event is emitted.
     * @returns {number} Returns 1 for success. No fool proofing. GIGO.
     */
    function on (event, fn) {
        events.has(event) || events.set(event, []);
        return events.get(event).push(fn);
    }

    /**
     * Removes a given callback from the provided event's callback queue.
     * 
     * @param {string} event The event name.
     * @param {Object} fn The callback function to be removed from the callback queue for the given event.
     * @returns {boolean|Object} Returns a Map Object if successful, false otherwise.
     */
    function off (event, fn) {
        const callbackQueue = isValidEvent(event);
        return callbackQueue && callbackQueue.some(callback => {
            return isValidCallback(callback) && callback === fn;
        }) && events.set(event, callbackQueue
                    .filter(callback => {
                        return isValidCallback(callback) && callback !== fn;
                    }));
    }

    /**
     * Attaches a given callback to an event for a single execution.
     * 
     * @param {string} event The event name.
     * @param {Object} fn The callback function to be invoked one time when the event is emitted.
     * @returns {number} Returns 1 for success.
     */
    function once (event, callback) {
        const single = (...args) => {
            args.length ? callback(...args) : callback();
            return clear(event);
        };
        return on(event, single);
    }

    /**
     * Invokes the callbacks attached to a single event.
     * 
     * @param {string} event The event name.
     * @param {Object} args The arguments passed to the callback.
     */
    function emit (event, ...args) {
        const callbackQueue = isValidEvent(event);
        callbackQueue && callbackQueue.forEach(callback => {
            callback(...args);
        });
    }

    /**
     * Removes a given event from the listeners completely.
     * 
     * @param {string} event The event name.
     * @returns {boolean} Returns true for success, false otherwise.
     */
    function clear (event) {
        const callbackQueue = isValidEvent(event);
        return callbackQueue && events.delete(event);
    }

    /**
     * Clears all the listeners for a given emitter.
     * 
     */
    function destroy () {
        return events.clear();
    }
    
    return Object.freeze({
        on: on,
        off: off,
        once: once,
        emit: emit,
        clear: clear,
        destroy: destroy
    });
};