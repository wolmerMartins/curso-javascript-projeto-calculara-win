class CalculatorController {
    constructor() {
        this._history = [];
        this._number = "";
        this._operation = [];
        this._displayHistory = document.querySelector("#history");
        this._display = document.querySelector("#display");
        this.initializeButtonsEvents();
        this.initializeKeyboard();
    }

    changeSign() {

    }

    clearLastEntry() {

    }

    clearAll() {
        this._operation = [];
        this._history = [];
        this.display = "0";
        this.displayHistory = this.history;
    }

    squared() {

    }

    squareRoot() {

    }

    calcPercent() {
        if (this.operation == 3) {
            let result = (this.operation[0] * this.getLastOperation()) / 100;
            return result;
        }
    }

    calc() {
        let result = 0;
        result = eval(this.operation.join(""));
        return result;
    }

    getLastHistory() {
        return this.history[this.history.length - 1];
    }

    setLastHistory(value) {
        this.history[this.history.length - 1] = value;
    }

    getLastOperation() {
        return this.operation[this.operation.length - 1];
    }

    setLastOperation(operator) {
        this.operation[this.operation.length - 1] = operator;
    }

    displayOperator(operator) {
        if (operator != "%") {
            if (operator == "*") {
                return "x";
            } else if (operator == "/") {
                return "÷";
            } else {
                return operator;
            }
        }
    }

    isDecimal() {
        return (this.number.indexOf(".") > -1);
    }

    isOperator(value) {
        return (["+", "-", "*", "/", "%"].indexOf(value) > -1);
    }

    addDot() {
        if (this.number == "") {
            this.number = "0.";
        } else if (!this.isDecimal()) {
            this.number += ".";
        }
    }

    concatNumber(value) {
        return this.number += value;
    }

    addOperation(value) {
        if (!isNaN(value)) {
            this.concatNumber(value);
            this.display = this.number;
        } else if (this.isOperator(value)) {
            let result = 0;
            if (this.number != "") {
                this.history = this.number;
                this.operation = this.number;
            }
            if (this.operation.length == 3) {
                result = this.calc();
                this._operation = [];
                this.operation = result;
                this.display = result;
            }
            if (this.isOperator(this.getLastOperation())) {
                this.setLastOperation(value);
                this.setLastHistory(value);
            } else {
                this.history = value;
                this.operation = value;
            }
            this.displayHistory = this.history.join(" ");
        }
    }

    validateValue(value) {
        switch(value) {
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
            case "-":
            case "+":
                this.addOperation(value);
                break;
            case "÷":
            case "/":
                this.addOperation("/");
                break;
            case "X":
            case "*":
                this.addOperation("*");
                break;
            case ",":
            case ".":
                this.addDot();
                break;
            case "√":
                this.squareRoot();
                break;
            case "x²":
                this.squared();
                break;
            case "CE":
            case "Escape":
                this.clearAll();
                break;
            case "C":
            case "Backspace":
                this.clearLastEntry();
                break;
            case "±":
                this.changeSign();
                break;
            case "=":
            case "Enter":
                /*if (this.isOperator(this.getLastOperation())) {
                    if (this.number != "") {
                        this.operation = this.number;
                        let result = this.calc();
                        this.clearAll();
                        this._history = [];
                        this.displayHistory = this.history;
                        this.display = result;
                        this.number = result;
                    }
                }*/
                break;
            default:
        }
    }

    initializeKeyboard() {
        window.addEventListener("keyup", e => {
            if (e.key == "%") {
                this.calcPercent();
            }
            this.validateValue(e.key);
        }, true);
    }

    initializeButtonsEvents() {
        let buttons = document.querySelectorAll(".btn");
        buttons.forEach((button) => {
            button.addEventListener("click", e => {
                if (button.innerHTML == "%") {
                    this.calcPercent();
                }
                this.validateValue(button.innerHTML);
            }, true);
        });
    }

    get history() {
        return this._history;
    }

    set history(history) {
        this._history.push(history);
    }

    get number() {
        return this._number;
    }

    set number(number) {
        this._number = number;
    }

    get operation() {
        return this._operation;
    }

    set operation(operation) {
        this._operation.push(operation);
        this.number = "";
    }

    get displayHistory() {
        return this._displayHistory.innerHTML;
    }

    set displayHistory(displayHistory) {
        this._displayHistory.innerHTML = displayHistory;
    }

    get display() {
        return this._display.innerHTML;
    }

    set display(display) {
        this._display.innerHTML = display;
    }
}