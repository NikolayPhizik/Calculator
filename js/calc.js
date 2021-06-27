"use strict";

let result;
let j;
let num1 = document.querySelectorAll(".num1");
let num2 = document.querySelectorAll(".num2");
let edinizy1 = document.querySelectorAll(".edinizy1");
let edinizy2 = document.querySelectorAll(".edinizy2");
let resultat = document.querySelectorAll(".resultEnter");
let btn = document.querySelectorAll(".btn");
let zakladki = document.querySelector(".zakladki");
let calculyator = document.querySelectorAll(".calculyator");
let button = document.querySelectorAll(".button");

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
    "frequency": ["мГц", "Гц", "кГц", "МГц", "ГГц"],
    "inductance": ["пГн", "нГн", "мГн", "мГн", "Гн", "кГн"],
    "capacity": ["пФ", "нФ", "мкФ", "мФ", "Ф", "кФ"],
    units: function(key) {
        return obj[key];
    },
    start: function(j) {
        let number = [+num1[j].value, +num2[j].value];
        let coefficient1 = this.units(edinizy1[j].value);
        let coefficient2 = this.units(edinizy2[j].value);
        return this.numValidator(number, coefficient1, coefficient2, j);
    },
    numValidator: function(number, coefficient1, coefficient2, j) {
        if (j === 1) {
            if (coefficient1 == 1000000 && coefficient2 > 0.000001) {
                result = "Используйте единицы мкФ и ниже!";
                return this.resultEnter(result, j);
            }
    
            if (coefficient1 == 1000000000 && coefficient2 > 0.000000000001) {
                result = "Используйте единицы пФ!";
                return this.resultEnter(result, j);
            }
            
        } else if (j === 2) {
            if (coefficient1 == 1000000 && coefficient2 > 0.000001) {
                result = "Используйте единицы мкГн и ниже!";
                return this.resultEnter(result, j);
            }
    
            if (coefficient1 == 1000000000 && coefficient2 > 0.000000000001) {
                result = "Используйте единицы пГн!";
                return this.resultEnter(result, j);
            }
        }
    
        if (number[0] !== "" && isNaN(number[0]) === false){
            let value1 = number[0];
            if (number[1] !== "" && isNaN(number[1]) === false) {
                let value2 = number[1];
                return this.calc(value1, value2, coefficient1, coefficient2, j);
            }
        }
        result = "Не правильно введены данные!";
        this.resultEnter(result, j);
    },
    calc: function(value1, value2, coefficient1, coefficient2, j) {
        let intermediateValue;
        if (j === 0) {
            intermediateValue = 1 / (2 * Math.PI * Math.sqrt(value1 * coefficient1 * value2 * coefficient2));
        } else if (j === 1) {
            let d = value1 * coefficient1;
            intermediateValue = 1 / (4 * Math.pow(Math.PI, 2) * Math.pow(d, 2) * value2 * coefficient2);
        } else if (j === 2) {
            let s = value1 * coefficient1;
            intermediateValue = 1 / (4 * Math.pow(Math.PI, 2) * Math.pow(s, 2) * value2 * coefficient2);
        }
        this.processingTheResult(intermediateValue, j);
    },
    processingTheResult: function(intermediateValue, j) {
        let a = 0.000000000001;
        let b = 0.000000001;
        let c = 100000000000000;
        let d = 1000000000;
        let arr;
        if (j === 0) {
            arr = this.units("frequency");
            a *= d;
            b *= d;
            c /= d;
        } else if (j === 1) {
            arr = this.units("inductance");
        } else if (j === 2) {
            arr = this.units("capacity");
        } 
    
        for (let i = 0; i <= 5; i++) {
            if(intermediateValue >= a && intermediateValue < b) {
                result = `${Math.round(intermediateValue * c) / 100} ${arr[i]}`;
                return this.resultEnter(result, j);
            }
            a = a * 1000;
            b = b * 1000;
            c = c / 1000;
        }
    },
    resultEnter: function(result, j) {
        resultat[j].textContent = result;
    }
};

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

button.forEach((item, i) => {
    item.addEventListener('click', (evt) => {
        evt.preventDefault();
        obj.start(i);
    })
});