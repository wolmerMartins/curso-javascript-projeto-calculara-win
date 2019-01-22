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
        this.display = "0";
    }

    squared() {

    }

    squareRoot() {

    }

    calcPercent() {
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
        } else if (value == "." || value == ",") {
            this.addDot();
            this.display = this.number;
        } else if (this.isOperator(value)) {
            if (this.number != "") {
                this.history = this.number;
                this.operation = this.number;
            }
            if (this.operation.length == 3) {
                let result = this.calc();
                this.clearAll();
                this.operation = result;
                this.display = result;
            }
            if (this.isOperator(this.getLastOperation())) {
                this.setLastOperation(value);
            } else {
                this.history = this.displayOperator(value);
                this.operation = value;
            }
        }
        this.displayHistory = this.history.join(" ");
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
            case "%":
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
                if (this.isOperator(this.getLastOperation())) {
                    if (this.number != "") {
                        this.operation = this.number;
                        let result = this.calc();
                        this.clearAll();
                        this._history = [];
                        this.displayHistory = this.history;
                        this.display = result;
                        this.number = result;
                    }
                }
                break;
            default:
        }
    }

    initializeKeyboard() {
        window.addEventListener("keyup", e => {
            this.validateValue(e.key);
        });
    }

    initializeButtonsEvents() {
        let buttons = document.querySelectorAll(".btn");
        buttons.forEach((button) => {
            button.addEventListener("click", e => {
                this.validateValue(button.innerHTML);
            });
        });
    }

    get history() {
        return this._history;
    }

    set history(value) {
        this._history.push(value);
    }

    get number() {
        return this._number;
    }

    set number(value) {
        this._number = value;
    }

    get operation() {
        return this._operation;
    }

    set operation(value) {
        this._operation.push(value);
        this.number = "";
    }

    get displayHistory() {
        return this._displayHistory.innerHTML;
    }

    set displayHistory(value) {
        this._displayHistory.innerHTML = value;
    }

    get display() {
        return this._display.innerHTML;
    }

    set display(value) {
        this._display.innerHTML = value;
    }
}