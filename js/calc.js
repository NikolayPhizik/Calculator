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
let resultat = document.querySelector(".resultEnter");
let number;
let numberL;
let numberC;
let intermediateValue;
let result;
let coefficientL;
let coefficientC;
let coefficientF;
let btn = document.querySelectorAll(".btn");
let calcF = document.querySelector(".calcF");
let calcL = document.querySelector(".calcL");
let calcC = document.querySelector(".calcC");
let button = document.querySelector(".button");

btn[0].addEventListener("click", (evt) => {
    evt.preventDefault();
    calcF.classList.remove("z-index");
    calcC.classList.remove("z-index");
    calcL.classList.add("z-index");
});

btn[1].addEventListener("click", (evt) => {
    evt.preventDefault();
    calcF.classList.remove("z-index");
    calcL.classList.remove("z-index");
    calcC.classList.add("z-index");
});

btn[2].addEventListener("click", (evt) => {
    evt.preventDefault();
    calcC.classList.remove("z-index");
    calcL.classList.remove("z-index");
    calcF.classList.add("z-index");
});

btn[3].addEventListener("click", (evt) => {
    evt.preventDefault();
    calcF.classList.remove("z-index");
    calcC.classList.remove("z-index");
    calcL.classList.add("z-index");
});

btn[4].addEventListener("click", (evt) => {
    evt.preventDefault();
    calcF.classList.remove("z-index");
    calcL.classList.remove("z-index");
    calcC.classList.add("z-index");
});

btn[5].addEventListener("click", (evt) => {
    evt.preventDefault();
    calcC.classList.remove("z-index");
    calcL.classList.remove("z-index");
    calcF.classList.add("z-index");
});

btn[6].addEventListener("click", (evt) => {
    evt.preventDefault();
    calcF.classList.remove("z-index");
    calcC.classList.remove("z-index");
    calcL.classList.add("z-index");
});

btn[7].addEventListener("click", (evt) => {
    evt.preventDefault();
    calcF.classList.remove("z-index");
    calcL.classList.remove("z-index");
    calcC.classList.add("z-index");
});

btn[8].addEventListener("click", (evt) => {
    evt.preventDefault();
    calcC.classList.remove("z-index");
    calcL.classList.remove("z-index");
    calcF.classList.add("z-index");
});


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
    resultEnter(result);
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
    resultEnter(result);
}

function resultEnter(result) {
    resultat.textContent = `${result}`;
}
