const DOMSelectors = {
  expression: ".expression",
  buttons: ".buttons",
};

const DOMElements = {
  expression: document.querySelector(DOMSelectors.expression),
  buttons: document.querySelector(DOMSelectors.buttons),
};

const data = {
  expressionList: [],
  answer: [],
};

const CONSTANTS = {
  OPERATIONS: ["+", "-", "*", "/"],
  KEYCODES: {
    13: "=",
    42: "*",
    43: "+",
    45: "-",
    47: "/",
    46: "C",
    48: "0",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9",
  },
};
const handleKeyBoardClick = (event) => {
  const keyCode = event.keyCode;
  console.log(keyCode);
  if (keyCode in CONSTANTS.KEYCODES) {
    handleButtonsClick({
      target: {
        id: CONSTANTS.KEYCODES[keyCode],
      },
    });
  }
};
const handleButtonsClick = (event) => {
  const button = event.target;
  const buttonType = button.id;
  if (buttonType === "=") {
    const [lastElement] = data.expressionList.slice(-1);
    if (CONSTANTS.OPERATIONS.indexOf(lastElement) === -1) {
      evaluate();
      showExpression(data.answer);
    } else {
      showExpression(["Bad", "Expression"]);
    }
    data.expressionList = [];
    data.answer = [];
  } else if (["c", "C"].indexOf(buttonType) > -1) {
    data.expressionList = [];
    data.answer = [];
    showExpression();
  } else if (CONSTANTS.OPERATIONS.indexOf(buttonType) > -1) {
    let lastElement = data.expressionList[data.expressionList.length - 1] || "";
    if (
      CONSTANTS.OPERATIONS.indexOf(lastElement) === -1 &&
      data.expressionList.length >= 1
    ) {
      evaluate();
      data.expressionList.push(buttonType);
    }
    showExpression(data.expressionList);
  } else {
    let lastElement = data.expressionList.pop() || "";
    if (CONSTANTS.OPERATIONS.indexOf(lastElement) > -1) {
      data.expressionList.push(lastElement);
      lastElement = "";
    }
    lastElement = `${lastElement}${buttonType}`;
    data.expressionList.push(lastElement);
    showExpression(data.expressionList);
  }
};

const evaluate = () => {
  if (data.expressionList.length >= 3) {
    if (data.answer.length === 0) {
      // first answer eval
      let [operand1, operation, operand2] = data.expressionList;
      data.answer.push(eval(operand1, operation, operand2));
    } else {
      let [operation, operand2] = data.expressionList.slice(
        data.expressionList.length - 2
      );
      let operand1 = data.answer.pop();
      data.answer.push(eval(operand1, operation, operand2));
    }
  }
};

const eval = (operand1 = 0, operation = "+", operand2 = 0) => {
  operand1 = Number(operand1);
  operand2 = Number(operand2);
  if (!isNaN(operand1) && !isNaN(operand2)) {
    switch (operation) {
      case "+":
        return operand1 + operand2;
      case "-":
        return operand1 - operand2;
      case "*":
        return operand1 * operand2;
      case "/":
        return operand1 / operand2;
    }
  }
};

const showExpression = (expression = []) => {
  let textContent = ``;
  expression.forEach((ele) => {
    if (!isNaN(Number(ele))) {
      ele = Number(ele).toLocaleString("en-IN");
    }
    textContent = `${textContent} ${ele}`;
  });
  textContent = textContent.trim();
  DOMElements.expression.textContent = textContent;
};
const setExpressionFontSize = (size) => {
  DOMElements.expression.style.fontSize = `${size}rem`;
};
DOMElements.buttons.addEventListener("click", handleButtonsClick);
document.addEventListener("keydown", handleKeyBoardClick);
