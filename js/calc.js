"use strict";

let number;
let value1;
let value2;
let intermediateValue;
let result;
let coefficient1;
let coefficient2;
let arr;
let a;
let b;
let c;
let j;
let num1 = document.querySelectorAll(".num1");
let num2 = document.querySelectorAll(".num2");
let edinizy1 = document.querySelectorAll(".edinizy1");
let edinizy2 = document.querySelectorAll(".edinizy2");
let resultat = document.querySelectorAll(".resultEnter");
let btn = document.querySelectorAll(".btn");
let zakladki = document.querySelector(".zakladki");
let calculyator = document.querySelectorAll(".calculyator");
let calcF = document.querySelector(".calcF");
let calcL = document.querySelector(".calcL");
let calcC = document.querySelector(".calcC");
let buttonF = document.querySelector(".buttonF");
let buttonL = document.querySelector(".buttonL");
let buttonC = document.querySelector(".buttonC");

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
    "мГц": 0.001,
    "Гц": 1,
    "кГц": 1000,
    "МГц": 1000000,
    "ГГц": 1000000000,
    "pH": "пГн",
    "nH": "нГн",
    "mkH": "мкГн",
    "mH": "мГн",
    "H": "Гн",
    "kH": "кГн",
    "mHz": "мГц",
    "Hz": "Гц",
    "kHz": "кГц",
    "MHz": "МГц",
    "GHz": "ГГц",
    "pF": "пФ",
    "nF": "нФ",
    "mkF": "мкФ",
    "mF": "мФ",
    "F": "Ф",
    "kF": "кФ",
    units: function(key) {
        return obj[key];
    },
};

function start(j) {
    number = [+num1[j].value, +num2[j].value];
    coefficient1 = obj.units(edinizy1[j].value);
    coefficient2 = obj.units(edinizy2[j].value);
    return numValidator(number, coefficient1, coefficient2, j);
}

function numValidator(number, coefficient1, coefficient2, j) {
    
    if (j === 1) {
        if (coefficient1 == 1000000 && coefficient2 > 0.000001) {
            result = "Используйте единицы мкФ и ниже!";
            return resultEnter(result, j);
        }

        if (coefficient1 == 1000000000 && coefficient2 > 0.000000000001) {
            result = "Используйте единицы пФ!";
            return resultEnter(result, j);
        }
    } else if (j === 2) {
        if (coefficient1 == 1000000 && coefficient2 > 0.000001) {
            result = "Используйте единицы мкГн и ниже!";
            return resultEnter(result, j);
        }

        if (coefficient1 == 1000000000 && coefficient2 > 0.000000000001) {
            result = "Используйте единицы пГн!";
            return resultEnter(result, j);
        }
    }

    if (number[0] !== "" && isNaN(number[0]) === false){
        value1 = number[0];
        if (number[1] !== "" && isNaN(number[1]) === false) {
            value2 = number[1];
            if (j === 0) {
                return calcFrequency(value1, value2, coefficient1, coefficient2, j);
            } else if (j === 1) {
                return calcinductance(value1, value2, coefficient1, coefficient2, j);
            } else if (j === 2) {
                return calcCapacity(value1, value2, coefficient1, coefficient2, j);
            } 
        }
    }
    result = "Не правильно введены данные!";
    resultEnter(result, j);
}

function calcFrequency(value1, value2, coefficient1, coefficient2, j) {
    intermediateValue = 1 / (2 * Math.PI * Math.sqrt(value1 * coefficient1 * value2 * coefficient2));
    return processingTheResult(intermediateValue, j);
}

function calcinductance(value1, value2, coefficient1, coefficient2, j) {
    let d = value1 * coefficient1;
    intermediateValue = 1 / (4 * Math.pow(Math.PI, 2) * Math.pow(d, 2) * value2 * coefficient2);
    return processingTheResult(intermediateValue, j);
}

function calcCapacity(value1, value2, coefficient1, coefficient2, j) {
    let s = value1 * coefficient1;
    intermediateValue = 1 / (4 * Math.pow(Math.PI, 2) * Math.pow(s, 2) * value2 * coefficient2);
    return processingTheResult(intermediateValue, j);
}

function processingTheResult(intermediateValue, j) {
    if (j === 0) {
            arr = ["mHz", "Hz", "kHz", "MHz", "GHz"],
            a = 0.001,
            b = 1,
            c = 100000;
    } else if (j === 1) {
            arr = ["pH", "nH", "mkH", "mH", "H", "kH"],
            a = 0.000000000001,
            b = 0.000000001,
            c = 100000000000000;
    } else if (j === 2) {
            arr = ["pF", "nF", "mkF", "mF", "F", "kF"],
            a = 0.000000000001,
            b = 0.000000001,
            c = 100000000000000;
    } 

    for (let i = 0; i <= 5; i++) {
        if(intermediateValue >= a && intermediateValue < b) {
            result = `${Math.round(intermediateValue * c) / 100} ${obj.units(arr[i])}`;
            return resultEnter(result, j);
        }
        a = a * 1000;
        b = b * 1000;
        c = c / 1000;
    }
}

function resultEnter(result, j) {
    resultat[j].textContent = result;
}

function hideCalculyator() {
    calculyator.forEach(item => {
        item.classList.add("hide");
        item.classList.remove("show");
    });
}

function showCalculyator(i = 0) {
    calculyator[i].classList.add("show");
    calculyator[i].classList.remove("hide");
}

hideCalculyator();
showCalculyator();

zakladki.addEventListener("click", (event) => {
    if (event.target && event.target.tagName == "BUTTON") {
        btn.forEach((item, i) => {
            if (event.target == item) {
                hideCalculyator();
                showCalculyator(i);
            }
        });
    }
});

buttonF.addEventListener("click", (evt) => {
    evt.preventDefault();
    start(0);
});

buttonL.addEventListener("click", (evt) => {
    evt.preventDefault();
    start(1);
});

buttonC.addEventListener("click", (evt) => {
    evt.preventDefault();
    start(2);
});