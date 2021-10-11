"use strict";

class CalculatorUserInterface {
    constructor(numberData, i, resultEnter) {
        this._calcClassSelect = ["calcF", "calcL", "calcC"];
        this._computedParameterName = ["частоты", "индуктивности", "ёмкости"];
        this._parameterName = ["Частота", "Индуктивность", "Ёмкость"];
        this._frequencyUnitCoefficients = ["1", "0.001", "0.000001", "0.000000001", "0.000000000001"];
        this._inductanceAndCapacityUnitCoefficients = ["1", "1000", "1000000", "1000000000", "0.001"];
        this._inductanceUnits = ["Гн", "мГн", "мкГн", "нГн", "пГн"];
        this._capacityUnits = ["Ф", "мФ", "мкФ", "нФ", "пФ"];
        this._frequencyUnits = ["Гц", "кГц", "МГц", "ГГц", "мГц"];
        this._calculatorDrawing = document.querySelector(".containerId");
        this._calculatorDrawingFunction(0);
        this._buttonSwitchingCalculators = document.querySelectorAll(".buttonSwitchingCalculators");
        this._calculatorSelection = document.querySelector(".calculatorSelection");
        this._CalculatorBusinessLogicLayer = new CalculatorBusinessLogicLayer(numberData, i, resultEnter);
    }

    _calculatorDrawingFunction(i) {
        this._calculatorDrawing.innerHTML = `<div class="${this._calcClassSelect[i]}">
            <h1>Калькулятор для расчёта ${this._computedParameterName[i]} <br>колебательного контура</h1>
            <form>
                <div class="pole1">
                    <label>${i === 0 ? this._parameterName[1] : this._parameterName[0]} колебательного контура</label>
                    <input class="num1" type="text">
                    <select class="asd edinizy units1" name="edinizy">
                        ${this._drawingASelectionOfUnits(i, 0)}
                    </select>
                </div>
                <div class="pole2">
                    <label>${i === 2 ? this._parameterName[1] : this._parameterName[2]} колебательного контура</label>
                    <input class="num2" type="text">
                    <select class="edinizy units2" name="edinizy">
                        ${this._selectionOfUnits(i, 0)}
                    </select>
                </div>
                <div class="result">
                    <div>
                        <span>Результат расчёта: </span>
                        <span class="return"><span class="resultEnter"></span></span>
                    </div>
                    <button class="calculateButton" name="submit">
                        <strong>Вычислить</strong>
                    </button>
                </div>
            </form>
        </div>`;


        this._num1 = document.querySelector(".num1");
        this._num2 = document.querySelector(".num2");
        this._units1 = document.querySelector(".units1");
        this._units2 = document.querySelector(".units2");
        this._calculateButton = document.querySelector(".calculateButton");
        this._resultat = document.querySelector(".resultEnter");
        this.listenerCalculateButton(i);
    }

    _drawingASelectionOfUnits(i, j) {
        return `<option value=${i === 0 ? this._frequencyUnitCoefficients[j]
            : this._inductanceAndCapacityUnitCoefficients[j]} ${j === 0 && "selected"}>${i === 0 ? this._inductanceUnits[j]
            : this._frequencyUnits[j]}</option> 
            ${j < 4 && this._drawingASelectionOfUnits(i, j + 1)}`;

    }

    _selectionOfUnits(i, j) {
        return `<option value=${this._frequencyUnitCoefficients[j]} ${j === 0 && "selected"}>${i === 2 ? this._inductanceUnits[j]
            : this._capacityUnits[j]}</option>
            ${j < 4 && this._selectionOfUnits(i, j + 1)}`;

    }

    switchingCalculators() {
        this._calculatorSelection.addEventListener("click", (event) => {
            if (event.target && event.target.tagName === "BUTTON") {
                this._buttonSwitchingCalculators.forEach((item, i) => {
                    if (event.target === item) {
                        this._calculatorDrawingFunction(i);
                    }
                });
            }
        });
    }

    listenerCalculateButton(i) {
        this._calculateButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            let numberData = [+this._num1.value, +this._num2.value, +this._units1.value, +this._units2.value];
            this._CalculatorBusinessLogicLayer.numValidator(numberData, i, this.resultEnter);
        });
    }

    resultEnter = (result) => {
        this._resultat.textContent = result;
    }
}

let start = new CalculatorUserInterface;
start.switchingCalculators();
start.listenerCalculateButton();