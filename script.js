// Get elements
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");

let currentInput = ""; // Store current input for calculation
let operator = null; // Store the current operator
let firstOperand = null; // Store the first operand

// Event listeners for buttons
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");

        // Handle operator click
        if (button.classList.contains("operator")) {
            if (firstOperand === null) {
                firstOperand = parseFloat(currentInput);
            } else if (operator && currentInput) {
                firstOperand = calculate(firstOperand, parseFloat(currentInput), operator);
            }
            operator = value;
            currentInput = "";
        } else {
            // Handle number or decimal click
            currentInput += value;
        }

        updateDisplay();
    });
});

// Event listener for equals button
equalsButton.addEventListener("click", () => {
    if (operator && currentInput) {
        const result = calculate(firstOperand, parseFloat(currentInput), operator);
        currentInput = result.toString();
        operator = null;
        firstOperand = null;
        updateDisplay();
    }
});

// Event listener for clear button
clearButton.addEventListener("click", () => {
    currentInput = "";
    operator = null;
    firstOperand = null;
    updateDisplay();
});

// Function to update display
function updateDisplay() {
    display.value = currentInput || firstOperand || "0";
}

// Function to perform calculation
function calculate(first, second, operator) {
    switch (operator) {
        case "+":
            return first + second;
        case "-":
            return first - second;
        case "*":
            return first * second;
        case "/":
            return first / second;
        default:
            return second;
    }
}
