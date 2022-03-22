"use strict";
exports.__esModule = true;
exports.wait = void 0;
function wait(ms) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(null);
        }, ms);
    });
}
exports.wait = wait;
