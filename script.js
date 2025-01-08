let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector(".screen");

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case "C":
            buffer = "0";
            runningTotal = 0;
            previousOperator = null;
            break;
        case "=":
            if (previousOperator === null) {
                return; // Nothing to calculate
            }
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = runningTotal.toString();
            runningTotal = 0;
            break;
        case "←":
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.slice(0, -1);
            }
            break;
        case "+":
        case "-":
        case "x":
        case "÷":
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === "0") {
        return; // Ignore math operations if the buffer is empty
    }

    const intBuffer = parseFloat(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = symbol;
    buffer = "0";
}

function flushOperation(intBuffer) {
    switch (previousOperator) {
        case "+":
            runningTotal += intBuffer;
            break;
        case "-":
            runningTotal -= intBuffer;
            break;
        case "x":
            runningTotal *= intBuffer;
            break;
        case "÷":
            if (intBuffer === 0) {
                buffer = "Error"; // Handle division by zero
                runningTotal = 0;
                previousOperator = null;
                return;
            }
            runningTotal /= intBuffer;
            break;
    }
}

function handleNumber(numberString) {
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init() {
    document
        .querySelector(".calc-buttons")
        .addEventListener("click", function (event) {
            if (!event.target.matches("button")) {
                return; // Ignore clicks that are not on buttons
            }
            buttonClick(event.target.innerText);
        });
}

init();
