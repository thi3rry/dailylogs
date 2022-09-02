/**
 * Generate a UUID compliant with RFC4122 v4
 * @link https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-253.php
 * @return {*}
 * @constructor
 */
export function uuid() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    );
}
