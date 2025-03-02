// Global variables - link HTML elements
const buttons = document.querySelectorAll('button'); // Select all buttons
const display = document.querySelector('.number-on-screen'); // Select the display element

// Global variables - empty string variables that store values
let numberStored = ''; // Stores current number value, default is empty
let operatorStored = ''; // Stores the operator (+, -, x, ÷), default is empty

// Flags to manage user input and calculation flow
let newInput = false; // Indicates if new input is being entered
let didEquals = false; // Indicates if '=' was pressed previously

// Store calculation and operator, then prepare for next input
function storeCalc(operator) {
  // If there's no stored number, set the display value as the stored number
  if (!numberStored) {
    numberStored = display.textContent;
  } else {
    // Otherwise, calculate the result using the stored number and operator
    numberStored = operate(Number(numberStored), operatorStored, Number(display.textContent));
  }

  // Update the operator for the next operation
  operatorStored = operator;
  newInput = true; // Indicate that the next input is a new value
  didEquals = false; // Reset equals flag
}

// Main calculation function that selects the appropriate operation
function operate(a, operator, b) {
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case 'x':
      return multiply(a, b);
    case '÷':
      return divide(a, b);
    default:
      return null; // If no valid operator, return null
  }
}

// Calculation sub-functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

// Reset function to clear everything and start fresh
function clear() {
  display.textContent = 0;
  numberStored = '';
  operatorStored = '';
}

// Function to add input number to display
function addToDisplay(number) {
  let displayNum = display.textContent; // Get current display value

  if (newInput) {
    newInput = false; // Reset flag
    setDisplay(number); // Set display to the new number
  } else if (displayNum == 0) {
    setDisplay(number); // If display is 0, set the number
  } else {
    displayNum = displayNum.includes('e') ? Number(displayNum) : displayNum; // If the display includes 'e', convert it to a number
    displayNum = displayNum + number; // Append the new number to the display
    setDisplay(displayNum); // Update the display
  }
}

// Set display format, including exponential notation if needed
function setDisplay(displayNum) {
  displayNum = displayNum.toString();

  // If the number exceeds display limit, convert to exponential notation
  if (displayNum.length > 9) {
    displayNum = parseFloat(displayNum).toExponential(2);
  }

  display.textContent = displayNum; // Update the display content
}

// Register button click events
buttons.forEach(button => {
  button.addEventListener('click', function() {
    const input = this.textContent; // Get the button text

    // Check if input is a digit
    if (/\d/.test(input)) {
      if (didEquals) {
        setDisplay(input); // If '=' was pressed previously, reset the display with the input
        didEquals = false; // Reset equals flag
      } else {
        addToDisplay(input); // Add the digit to the display
      }
    }
    // If 'AC' is pressed, clear the calculator
    else if (input === 'AC') {
      clear();
    }
    // If '=' is pressed, calculate the result
    else if (input === '=') {
      if (!numberStored || !operatorStored) {
        alert('Error: No operation entered. Clearing data.');
        clear();
      } else {
        numberStored = operate(Number(numberStored), operatorStored, Number(display.textContent));
        operatorStored = ''; // Reset operator
        setDisplay(numberStored); // Show the result
        numberStored = ''; // Reset the stored number
        didEquals = true; // Set equals flag to true
      }
    }
    // For all other operators (+, -, x, ÷), store the calculation
    else {
      storeCalc(input);
    }
  });
});
