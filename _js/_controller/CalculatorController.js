class CalculatorController {
    constructor() {
        this._history = [];
        this._number = "0";
        this._operation = [];
        this._displayHistory = document.querySelector("#history");
        this._display = document.querySelector("#display");
        this.initializeButtonsEvents();
        this.initializeKeyboard();
    }

    changeSign() {

    }

    clearLastEntry() {
        if (typeof this.number == "string") {
            this.number = this.number.replace(this.number[this.number.length - 1], "");
            if (this.number == "") {
                this.number = "0";
            }
            this.display = this.number;
        }
    }

    clearAll() {
        this._operation = [];
        this._history = [];
        this.number = "0";
        this.display = this.number;
        this.displayHistory = this.history;
    }

    squared() {

    }

    squareRoot() {

    }

    calcPercent(clickX, clickY) {
        if (clickX != 0 && clickY != 0) {
            if (this.operation.length == 2 && this.number != "") {
                let result = (parseFloat(this.operation[0]) * parseFloat(this.number)) / 100;
                this.history = this.changeDotForComma(result);
                this.operation = result;
                this.display = this.getLastHistory();
                this.displayHistory = this.history.join(" ");
            }
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
        return (["+", "-", "*", "/"].indexOf(value) > -1);
    }

    changeDotForComma(value) {
        return value.toString().replace(".", ",");
    }

    addDot() {
        if (this.number == "0") {
            this.number = "0.";
        } else if (!this.isDecimal()) {
            this.number += ".";
        }
        this.display = this.changeDotForComma(this.number);
    }

    concatNumber(value) {
        if (this.number == "0" || (this.operation.length == 0 && typeof this.number != "string")) this.number = "";
        return this.number += value;
    }

    addOperation(value) {
        if (!isNaN(value)) {
            this.concatNumber(value);
            this.display = this.changeDotForComma(this.number);
        } else if (this.isOperator(value)) {
            let result = 0;
            this.history = this.changeDotForComma(this.number);
            this.operation = this.number;
            if (this.operation.length == 3) {
                result = this.calc();
                this._operation = [];
                this.operation = result;
                this.display = this.changeDotForComma(result);
            }
            if (this.isOperator(this.getLastOperation())) {
                this.setLastOperation(value);
                this.setLastHistory(this.displayOperator(value));
            } else {
                this.history = this.displayOperator(value);
                this.operation = value;
            }
            this.displayHistory = this.history.join(" ");
        }
    }

    validateValue(value, clickX, clickY) {
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
            case "%":
                this.calcPercent(clickX, clickY);
            case "√":
                this.squareRoot();
                break;
            case "x²":
                this.squared();
                break;
            case "CE":
            case "Backspace":
                this.clearLastEntry();
                console.log(this.operation);
                break;
            case "C":
            case "Escape":
                this.clearAll();
                break;
            case "±":
                this.changeSign();
                break;
            case "=":
            case "Enter":
                if (this.operation.length == 3) {
                    let result = this.calc();
                    this.clearAll();
                    this.display = this.changeDotForComma(result);
                    this.number = result;
                } else if (this.isOperator(this.getLastOperation())) {
                    if (this.number != "") {
                        this.operation = this.number;
                        let result = this.calc();
                        this.clearAll();
                        this.display = this.changeDotForComma(result);
                        this.displayHistory = this.history;
                        this.number = result;
                    }
                }
                break;
            default:
        }
    }

    initializeKeyboard() {
        window.addEventListener("keyup", e => {
            this.validateValue(e.key, 1, 1);
        }, true);
    }

    initializeButtonsEvents() {
        let buttons = document.querySelectorAll(".btn");
        buttons.forEach((button) => {
            button.addEventListener("click", e => {
                this.validateValue(button.innerHTML, e.clientX, e.clickY);
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