"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const moment_1 = __importDefault(require("moment"));
function log(...message) {
    const time = moment_1.default.utc(moment_1.default.now()).toLocaleString();
    let spacing = '';
    for (let i = 0; i < time.length + 2; i++) {
        spacing += ' ';
    }
    message.forEach((msg, i) => {
        if (i === 0) {
            console.log(`${chalk_1.default.gray(time)}: ${msg}`);
        }
        else {
            console.log(`${spacing}${msg}`);
        }
    });
}
exports.log = log;
function error(...message) {
    const time = moment_1.default.utc(moment_1.default.now()).toLocaleString();
    let spacing = '';
    for (let i = 0; i < time.length + 2; i++) {
        spacing += ' ';
    }
    message.forEach((msg, i) => {
        if (i === 0) {
            console.log(`${chalk_1.default.red(time)}: ${msg}`);
        }
        else {
            console.log(`${spacing}${msg}`);
        }
    });
}
exports.error = error;
