"use strict";

class CalculatorBusinessLogicLayer {
    constructor() {
        this._outputCoefficientsAndUnits = [
            [0.001, 1, 1000, 1000000, 1000000000, 1000000000000],
            [100000, 100, 0.1, 0.0001, 0.0000001, 0.000000001],
            [0.000000000001, 0.000000001, 0.000001, 0.001, 1, 1000],
            [100000000000000, 100000000000, 100000000, 100000, 100, 0.1],
            ["мГц", "Гц", "кГц", "МГц", "ГГц"],
            ["пГн", "нГн", "мкГн", "мГн", "Гн", "кГн"],
            ["пФ", "нФ", "мкФ", "мФ", "Ф", "кФ"],
            ["1000000", "0.000001", "1000000000", "0.000000000001", "мкФ и ниже!", "мкГн и ниже!", "пФ!", "пГн!"]
        ];
    }

    numValidator(numberData, i, resultEnter) {
        if (numberData[0] !== 0 && isNaN(numberData[0]) === false
            && numberData[1] !== 0 && isNaN(numberData[1]) === false) {
            if (i !== 0) {
                return this._overshootControl(numberData, i, resultEnter);
            }
            return this._factorMultiplier(numberData, i, resultEnter);
        }
        return resultEnter("Не правильно введены данные!");
    }

    _overshootControl(numberData, i, resultEnter) {
        for (let j = 0; j < 3; j++) {
            if (numberData[2] === this._outputCoefficientsAndUnits[7][j]
                && numberData[3] > this._outputCoefficientsAndUnits[7][j + 1]) {
                return resultEnter(`Используйте единицы ${this._outputCoefficientsAndUnits[7][j + (i === 1 ? 4 : 5)]}`, i);
            }
        }
        return this._factorMultiplier(numberData, i, resultEnter);
    }

    _factorMultiplier(numberData, i, resultEnter) {
        if (i === 0) {
            this._calculatorFrequency(numberData[0] * numberData[2], numberData[1] * numberData[3], i, resultEnter);
        } else {
            this._calculatorInductanceAndCapacity(numberData[0] * numberData[2], numberData[1] * numberData[3], i, resultEnter);
        }
    }

    _calculatorFrequency(coefficient1, coefficient2, i, resultEnter) {
        this._processingTheResult((1 / (2 * Math.PI * Math.sqrt(coefficient1 * coefficient2))), i, resultEnter);
    }

    _calculatorInductanceAndCapacity(coefficient1, coefficient2, i, resultEnter) {
        this._processingTheResult((1 / (4 * Math.pow(Math.PI, 2) * Math.pow(coefficient1, 2) * coefficient2)), i, resultEnter);
    }

    _processingTheResult(intermediateValue, i, resultEnter) {
        for (let j = 0; j < 3; j++) {
            if (i === j) {
                this._finalResultProcessing(this._outputCoefficientsAndUnits[j === 0 ? 0 : 2],
                    this._outputCoefficientsAndUnits[j === 0 ? 1 : 3],
                    this._outputCoefficientsAndUnits[j + 4], intermediateValue, resultEnter, i);
            }
        }
    }

    _finalResultProcessing(resultCoefficientArray1, resultCoefficientArray2, arrUnits, intermediateValue, resultEnter, i) {
        for (let j = 0; j <= 5; j++) {
            if (intermediateValue >= resultCoefficientArray1[j] && intermediateValue < resultCoefficientArray1[j + 1]) {
                let result = `${Math.round(intermediateValue * resultCoefficientArray2[j]) / 100} ${arrUnits[j]}`;
                return resultEnter(result, i);
            }
        }
    }
}