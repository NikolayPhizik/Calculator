"use strict";

let obj = {
    "пГн": 0.000000000001,
    "нГн": 0.000000001,
    "мкГн": 0.000001,
    "мГн": 0.001,
    "Гн": 1,
    "пФ": 0.000000000001,
    "нФ": 0.000000001,
    "мкФ": 0.000001,
    "мФ": 0.001,
    "Ф": 1,
    0.001: "мГц",
    1: "Гц",
    1000: "кГц",
    1000000: "МГц",
    1000000000: "ГГц",
    units: function(key) {
        return obj[key];
    }
};

let numL = 7;
let numC = 8;
let number = [numL, numC];
let intermediateValue;
let result;
let coefficientL = obj.units("мкГн");
let coefficientC = obj.units("мкФ");
let coefficientF;

function numValidator(number) {
    if (number[0] !== "" && isNaN(number[0]) === false){
        if (number[1] !== "" && isNaN(number[1]) === false) {
            return calc(numL, numC, coefficientL, coefficientC);
        }
    }
    return result = "Не правильно введены данные!";
}

function calc(numL, numC, coefficientL, coefficientC) {
    intermediateValue = 1 / (2 * Math.PI * Math.sqrt(numL * coefficientL * numC * coefficientC));
     return processingTheResult(intermediateValue);
}

console.log(numValidator(number));
console.log(intermediateValue);

function processingTheResult(intermediateValue) {
    if (intermediateValue >= 0.001 && intermediateValue < 1) {
        intermediateValue = Math.round(intermediateValue * 1000 * 100) / 100;
        return result = `${intermediateValue} ${obj.units(0.001)}`

    } else if (intermediateValue >= 1 && intermediateValue < 1000) {
        return result = `${Math.round(intermediateValue * 100) / 100} ${obj.units(1)}`

    } else if (intermediateValue >= 1000 && intermediateValue < 1000000) {
        intermediateValue = Math.round(intermediateValue / 1000 * 100) / 100;
        return result = `${intermediateValue} ${obj.units(1000)}`

    } else if (intermediateValue >= 1000000 && intermediateValue < 1000000000) {
        intermediateValue = Math.round(intermediateValue / 1000000 * 100) / 100;
        return result = `${intermediateValue} ${obj.units(1000000)}`

    } else if (intermediateValue >= 1000000000 && intermediateValue < 1000000000000) {
        intermediateValue = Math.round(intermediateValue / 1000000000 * 100) / 100;
        return result = `${intermediateValue} ${obj.units(1000000000)}`

    }
}