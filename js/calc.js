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
    }
};

let btn = document.querySelectorAll(".btn");
let zakladki = document.querySelector(".zakladki");
let calculyator = document.querySelectorAll(".calculyator");
let calcF = document.querySelector(".calcF");
let calcL = document.querySelector(".calcL");
let calcC = document.querySelector(".calcC");
let buttonF = document.querySelector(".buttonF");
let buttonL = document.querySelector(".buttonL");
let buttonC = document.querySelector(".buttonC");

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
    calcFrequency();
});

buttonL.addEventListener("click", (evt) => {
    evt.preventDefault();
    calcInductance();
});

buttonC.addEventListener("click", (evt) => {
    evt.preventDefault();
    calcСapacity();
});

function calcFrequency() {

    let numL = document.querySelector(".numL");
    let numC = document.querySelector(".numC");
    let edinizyL = document.querySelector(".L");
    let edinizyC = document.querySelector(".C");
    let resultatF = document.querySelector(".resultEnterF");
    let number;
    let numberL;
    let numberC;
    let intermediateValue;
    let result;
    let coefficientL;
    let coefficientC;

    number = [+numL.value, +numC.value];
    numValidatorF(number);
    function numValidatorF(number) {
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
        resultEnterF(result);
    }

    function calc(numberL, numberC, coefficientL, coefficientC) {
        intermediateValue = 1 / (2 * Math.PI * Math.sqrt(numberL * coefficientL * numberC * coefficientC));
        return processingTheResultF(intermediateValue);
    }

    function processingTheResultF(intermediateValueF) {

        let arr = ["mHz", "Hz", "kHz", "MHz", "GHz"],
            a = 0.001,
            b = 1,
            c = 100000;
    
        for (let i = 0; i <= 5; i++) {
            if(intermediateValueF >= a && intermediateValueF < b) {
                result = `${Math.round(intermediateValueF * c) / 100} ${obj.units(arr[i])}`;
                return resultEnterF(result);
            }
            a = a * 1000;
            b = b * 1000;
            c = c / 1000;
        }
    }

    function resultEnterF(result) {
        resultatF.textContent = result;
    }
}

function calcInductance() {

    let numF = document.querySelector(".numF");
    let numbC = document.querySelector(".numbC");
    let edinizyF = document.querySelector(".F");
    let edinizyC = document.querySelector(".Cap");
    let resultatL = document.querySelector(".resultEnterL");
    let numb;
    let numberF;
    let numbeC;
    let intermediateValueL;
    let res;
    let coeffC;
    let coeffF;

    numb = [+numF.value, +numbC.value];
    numValidatorL(numb);
    function numValidatorL(numb) {
        coeffF = obj.units(edinizyF.value);
        coeffC = obj.units(edinizyC.value);

        if (coeffF == 1000000 && coeffC > 0.000001) {
            res = "Используйте единицы мкФ и ниже!";
            return resultEnterL(res);
        }

        if (coeffF == 1000000000 && coeffC > 0.000000000001) {
            res = "Используйте единицы пФ!";
            return resultEnterL(res);
        }

        if (numb[0] !== "" && isNaN(numb[0]) === false){
            numberF = numb[0];
            if (numb[1] !== "" && isNaN(numb[1]) === false) {
                numbeC = numb[1];
                return calculyatorL(numberF, numbeC, coeffF, coeffC);
            }
        }
        res = "Не правильно введены данные!";
        resultEnterL(res);
    }

    function calculyatorL(numberF, numbeC, coeffF, coeffC) {
        let d = numberF * coeffF;
        intermediateValueL = 1 / (4 * Math.pow(Math.PI, 2) * Math.pow(d, 2) * numbeC * coeffC);
        return processingTheResultL(intermediateValueL);
    }

    function processingTheResultL(intermediateValueL) {

        let arr = ["pH", "nH", "mkH", "mH", "H", "kH"],
            a = 0.000000000001,
            b = 0.000000001,
            c = 100000000000000;

        for (let i = 0; i <= 5; i++) {
            if(intermediateValueL >= a && intermediateValueL < b) {
                res = `${Math.round(intermediateValueL * c) / 100} ${obj.units(arr[i])}`;
                return resultEnterL(res);
            }
            a = a * 1000;
            b = b * 1000;
            c = c / 1000;
        }

    }

    function resultEnterL(res) {
        resultatL.textContent = res;
    }
}

function calcСapacity() {

    let numbF = document.querySelector(".numbF");
    let numbL = document.querySelector(".numbL");
    let edinicyF = document.querySelector(".Fr");
    let edinicyL = document.querySelector(".Lt");
    let resultatC = document.querySelector(".resultEnterC");
    let numbe;
    let numbeF;
    let numbeL;
    let intermediateValueC;
    let resul;
    let coefL;
    let coefF;

    numbe = [+numbF.value, +numbL.value];
    numValidatorC(numbe);
    function numValidatorC(numbe) {
        coefL = obj.units(edinicyL.value);
        coefF = obj.units(edinicyF.value);

        if (coefF == 1000000 && coefL > 0.000001) {
            resul = "Используйте единицы мкГн и ниже!";
            return resultEnterC(resul);
        }

        if (coefF == 1000000000 && coefL > 0.000000000001) {
            resul = "Используйте единицы пГн!";
            return resultEnterC(resul);
        }
        
        if (numbe[0] !== "" && isNaN(numbe[0]) === false){
            numbeF = numbe[0];
            if (numbe[1] !== "" && isNaN(numbe[1]) === false) {
                numbeL = numbe[1];
                return calculyatorC(numbeF, numbeL, coefF, coefL);
            }
        }
        resul = "Не правильно введены данные!";
        resultEnterC(resul);
    }

    function calculyatorC(numbeF, numbeL, coefF, coefL) {
        let s = numbeF * coefF;
        intermediateValueC = 1 / (4 * Math.pow(Math.PI, 2) * Math.pow(s, 2) * numbeL * coefL);
        return processingTheResultC(intermediateValueC);
    }

    function processingTheResultC(intermediateValueC) {

        let arr = ["pF", "nF", "mkF", "mF", "F", "kF"],
            a = 0.000000000001,
            b = 0.000000001,
            c = 100000000000000;
    
        for (let i = 0; i <= 5; i++) {
            if(intermediateValueC >= a && intermediateValueC < b) {
                resul = `${Math.round(intermediateValueC * c) / 100} ${obj.units(arr[i])}`;
                return resultEnterC(resul);
            }
            a = a * 1000;
            b = b * 1000;
            c = c / 1000;
        }
    
    }

    function resultEnterC(resul) {
        resultatC.textContent = resul;
    }
}