"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddleWareCollections = void 0;
const express_1 = __importDefault(require("express"));
var MiddleWareCollections;
(function (MiddleWareCollections) {
    function essentials(app) {
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: false }));
    }
    MiddleWareCollections.essentials = essentials;
})(MiddleWareCollections || (exports.MiddleWareCollections = MiddleWareCollections = {}));
//# sourceMappingURL=collections.js.map