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

let numL = document.querySelector(".numL");
let numC = document.querySelector(".numC");
let edinizyL = document.querySelector(".L");
let edinizyC = document.querySelector(".C");
let number;
let numberL;
let numberC;
let intermediateValue;
let result;
let coefficientL;
let coefficientC;
let coefficientF;
let button = document.querySelector(".button");

button.addEventListener("click", (evt) => {
    evt.preventDefault();
    number = [+numL.value, +numC.value];
    numValidator(number);
});

function numValidator(number) {
    coefficientL = obj.units(edinizyL.value);
    coefficientC = obj.units(edinizyC.value);
    
    if (number[0] !== "" && isNaN(number[0]) === false){
        numberL = number[0];
        if (number[1] !== "" && isNaN(number[1]) === false) {
            numberC = number[1];
            return calc(numberL, numberC, coefficientL, coefficientC);
        }
    }
    result = "Не правильно введены данные!";
    return console.log(result);
}

function calc(numberL, numberC, coefficientL, coefficientC) {
    intermediateValue = 1 / (2 * Math.PI * Math.sqrt(numberL * coefficientL * numberC * coefficientC));
    return processingTheResult(intermediateValue);
}


function processingTheResult(intermediateValue) {
    if (intermediateValue >= 0.001 && intermediateValue < 1) {
        intermediateValue = Math.round(intermediateValue * 1000 * 100) / 100;
        result = `${intermediateValue} ${obj.units(0.001)}`;

    } else if (intermediateValue >= 1 && intermediateValue < 1000) {
        result = `${Math.round(intermediateValue * 100) / 100} ${obj.units(1)}`;

    } else if (intermediateValue >= 1000 && intermediateValue < 1000000) {
        intermediateValue = Math.round(intermediateValue / 1000 * 100) / 100;
        result = `${intermediateValue} ${obj.units(1000)}`;

    } else if (intermediateValue >= 1000000 && intermediateValue < 1000000000) {
        intermediateValue = Math.round(intermediateValue / 1000000 * 100) / 100;
        result = `${intermediateValue} ${obj.units(1000000)}`;

    } else if (intermediateValue >= 1000000000 && intermediateValue < 1000000000000) {
        intermediateValue = Math.round(intermediateValue / 1000000000 * 100) / 100;
        result = `${intermediateValue} ${obj.units(1000000000)}`;
    }
    return console.log(result);
}
