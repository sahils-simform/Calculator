let operators = ["+", "-", "/", "*"];

let box = null;
let last_operation_history = null;
let operator = null;
let equal = null;
let dot = null;

let firstNum = true;

let numbers = [];
let operatorValue;
let lastButton;
let calcOperator;

let total;

let buttonNumber = (button) => {

    operator = document.getElementsByClassName("operator");
    box = document.getElementById("box");
    last_operation_history = document.getElementById("last_operation_history");
    equal = document.getElementById("equal_sign").value;
    dot = document.getElementById("dot").value;
    
    lastButton = button;

    // if button is not an operator or = sign
    if (!operators.includes(button) && button!=equal){
        // if it is the first button clicked
        if (firstNum){
            // and it's a dot, show 0.
            if (button == dot){
                box.innerText = "0"+dot;
            }
            // else clear box and show the number
            else {
                box.innerText = button;
            }
            firstNum = false;
        }
        else {

            // return if the box value is 0
            if (box.innerText.length == 1 && box.innerText == 0){

                if (button == dot){
                    box.innerText += button;
                }
                return;
            }
            // return if the box already has a dot and clicked button is a dot
            if (box.innerText.includes(dot) && button == dot){
                return;
            }
            // maximum allowed numbers inputted are 20
            if (box.innerText.length == 20){
                return;
            }

            // if pressed dot and box already has a - sign, show -0.
            if (button == dot && box.innerText == "-"){
                box.innerText = "-0"+dot;
            }
            // else append number
            else {
                box.innerText += button;
            }  
        }
    }
    // if it's an operator or = sign
    else {

        // return if operator is already pressed
        if (operatorValue != null && button == operatorValue){
            return
        }

        // show minus sign if it's the first value selected and finally return
        if (button == "-" && box.innerText == 0){
            box.innerText = button;
            firstNum = false;
            operatorValue = button
            showSelectedOperator()
            return;
        }
        // return if minus operator pressed and it's already printed on screen 
        else if (operators.includes(button) && box.innerText == "-"){
            return
        }
        // return if minus operator pressed and history already has equal sign
        else if (button == "-" && operatorValue == "-" && last_operation_history.innerText.includes("=")){
            return
        }

        // set value of operator if it's one
        if (operators.includes(button)){
            if (typeof last_operator != "undefined" && last_operator != null){
                calcOperator = last_operator
            }
            else {
                calcOperator = button
            }
            if (button == "*"){
                last_operator = "×"
            }
            else if (button == "/"){
                last_operator = "÷"
            }
            else {
                last_operator = button
            }
            operatorValue = button
            firstNum = true
            showSelectedOperator()
        }

        // add first number to numbers array and show it on history
        if (numbers.length == 0){
            numbers.push(box.innerText);
            if (typeof last_operator != "undefined" && last_operator != null){
                last_operation_history.innerText = box.innerText + " " + last_operator;
            }
        }
        // rest of calculations
        else {   
            if (numbers.length == 1){
                numbers[1] = box.innerText;
            }
            let temp_num = box.innerText;

            // calculate total
            if (button==equal && calcOperator != null){
                let total = calculate(numbers[0], numbers[1], calcOperator)
                box.innerText = total;

                // append second number to history
                if (!last_operation_history.innerText.includes("=")){
                    last_operation_history.innerText += " " + numbers[1] + " =";
                }

                temp_num = numbers[0];

                numbers[0] = total;
               operatorValue = null;
                showSelectedOperator();

                // replace first number of history with the value of total
                let history_arr = last_operation_history.innerText.split(" ");
                history_arr[0] = temp_num;
                last_operation_history.innerText = history_arr.join(" ");
            }
            // update history with the value on screen and the pressed operator
            else if (calcOperator != null) {
                 last_operation_history.innerText = temp_num + " " + last_operator;
                 calcOperator = button;
                 numbers = [];
                 numbers.push(box.innerText);
            }
        }
    }

}
 // highlight operator button when selected
let showSelectedOperator = () => {

    let elements = document.getElementsByClassName("operator");

    for (let i=0; i<elements.length; i++){
        elements[i].style.backgroundColor  = "#e68a00";
    }

    if (operatorValue == "+"){
        document.getElementById("plusOp").style.backgroundColor  = "#ffd11a";
    }
    else if (operatorValue == "-"){
        document.getElementById("subOp").style.backgroundColor  = "#ffd11a";
    }
    else if (operatorValue == "*"){
        document.getElementById("multiOp").style.backgroundColor  = "#ffd11a";
    }
    else if (operatorValue == "/"){
        document.getElementById("divOp").style.backgroundColor  = "#ffd11a";
    }
}

// function to calculate the result using two number and an operator
let calculate = (num1, num2, operator) => {

    if (operator === "+"){
        total = (parseFloat)(num1)+(parseFloat)(num2)
    }
    else if (operator === "-"){
        total = (parseFloat)(num1)-(parseFloat)(num2)
    }
    else if (operator === "*"){
        total = (parseFloat)(num1)*(parseFloat)(num2)
    }
    else if (operator === "/"){
        total = (parseFloat)(num1)/(parseFloat)(num2)
    }
    else {
        if (total == box.innerText){
            return total
        }
        else {
            return box.innerText
        }
    }
    // if total is not integer, show maximum 12 decimal places
    if (!Number.isInteger(total)){
        total = total.toPrecision(12);
    }
    return parseFloat(total);
}

// function to clear box and reset everything
let button_clear = () => {
    window.location.reload()
}

let backspace_remove = () => {

    box = document.getElementById("box");
    let elements = document.getElementsByClassName("operator");

    for (let i=0; i<elements.length; i++){
        elements[i].style.backgroundColor  = "#e68a00";
    }

    let last_num = box.innerText;
    last_num = last_num.slice(0, -1)
    
    box.innerText = last_num

    // show 0 zero if all characters on screen are removed
    if (box.innerText.length == 0){
        box.innerText = 0
        firstNum = true
    }

}


// function to change the sign of the number currently on screen
let plus_minus = () =>{
    box = document.getElementById("box");

    // if any operator is already pressed
    if (typeof last_operator != "undefined"){
        if (numbers.length>0){
            // if last button pressed is an operator
            if (operators.includes(lastButton)){
                // if the displayed text is just a negative sign, replace it with a 0
                if (box.innerText == "-"){
                    box.innerText = 0
                    firstNum = true
                    return
                }
                // if the displayed text is not a just a negative sign, replace it with a negative sign
                else {
                    box.innerText = "-"
                    firstNum = false
                }
            }
            // if last button pressed is not an operator, change its sign
            else {
                box.innerText = -box.innerText

                if (numbers.length==1){
                    numbers[0] = box.innerText
                }
                else {
                    numbers[1] = box.innerText
                }
            }
        }
        return
    }

    // if displayed text is 0, replace it with a negative sign
    if (box.innerText == 0){
        box.innerText = "-"
        firstNum = false
        return
    }
    box.innerText = -box.innerText
}

// function to calculate square root of the number currently on screen
const square_root = () => {
    box = document.getElementById("box");
    let square_num = Math.sqrt(box.innerText);
    box.innerText = square_num;
    numbers.push(square_num);
}

// function to calculate the power of the number currently on screen
const power_of = () => {
    box = document.getElementById("box");
    let square_num =Math.pow(box.innerText, 2);
    box.innerText = square_num;
    numbers.push(square_num);
}

// function to calculate the division of 1 with the number currently on screen
const division_one = () => {
    box = document.getElementById("box");
    let square_num = 1/box.innerText;
    box.innerText = square_num;
    numbers.push(square_num);
}

// const calculateModulo = () => {
//     box = document.getElementById("box");
//     equal = document.getElementById("equal_sign").value;
//     let square_num = box.innerText;
//     square_num = square_num.replace(/%/g, '/100');
//     box.innerText = eval(square_num) + '%';
//     // let dividend;
//     // let divisor;
//     // box.innerText = dividend % divisor;
//     numbers.push(box.innerText);
// }

const calculateModulo = () => {
    box = document.getElementById("box");
    equal = document.getElementById("equal_sign").value;
    let square_num = box.innerText;
    square_num = square_num.replace(/%/g, '/100');
    equal = this.eval(square_num) + '%';
    box.innerText = equal;

    // let dividend;
    // let divisor;
    // box.innerText = dividend % divisor;
    numbers.push(box.innerText);
}

// function to calculate pi of the number currently on screen
const calculatePi = () => {
    box = document.getElementById("box");
    let square_num = 3.141592653589793 * (box.innerText);
    box.innerText = square_num;
    numbers.push(box.innerText);
}

// function to calculate exponent of the number currently on screen
const exponential = () => {
    box = document.getElementById("box");
    let square_num = Math.exp(box.innerText);
    box.innerText = square_num;
    numbers.push(box.innerText);
}

// function to calculate factorial of the number currently on screen
const facto = () => {
    box = document.getElementById("box");
    if(box.innerText === "0" || box.innerText === "1") return "1"
    else{
        let temp = parseInt(box.innerText);
        let sum = 1;
        while(temp!==0){
            sum *= temp;
            temp--;
        }
        box.innerText = sum;
    }
    numbers.push(box.innerText)
}

// function to calculate log of the number currently on screen
const calculateLog = () => {
    box = document.getElementById("box");
    let square_num = Math.log10(box.innerText);
    box.innerText = square_num;
    numbers.push(square_num);
}

// const raisTo = () => {
//     box = document.getElementById("box");
//     let square_num =Math.pow(box.innerText, box.innerText);
//     box.innerText = square_num;
//     numbers.push(square_num);
// }

// function to calculate x power of y of the number currently on screen
const raisTo = () => {
    box = document.getElementById("box");
    equal = document.getElementById("equal_sign");
    let square_num = box.innerText;
    square_num = square_num.replace(/%/g, '**');
    equal = this.eval(square_num) + '**';
    let res = Math.pow(equal);
    // let res = Math.pow(expression);
    // box.innerText = res;
    numbers.push(res);
}

// function to calculate absolute of the number currently on screen
const absolute = () => {
    box = document.getElementById("box");
    let square_num = Math.abs(box.innerText);
    box.innerText = square_num;
    numbers.push(square_num);
}

// function to calculate sine of the number currently on screen
const sineOperation = () => {
    box = document.getElementById("box");
    let square_num = Math.sin(box.innerText);
    box.innerText = square_num;
    numbers.push(box.innerText);
    console.log("hello");
}

// function to calculate cosine of the number currently on screen
const cosineOperation = () => {
    box = document.getElementById("box");
    let square_num = Math.cos(box.innerText);
    box.innerText = square_num;
    numbers.push(square_num);
}

// function to calculate tangent of the number currently on screen
const tanOperation = () => {
    box = document.getElementById("box");
    let square_num = Math.tan(box.innerText);
    box.innerText = square_num;
    numbers.push(square_num);
}

// function to calculate power of ten of the number currently on screen
const raisToTen = () => {
    box = document.getElementById("box");
    let square_num = Math.pow(10, box.innerText);
    box.innerText = square_num;
    numbers.push(square_num);
}

// function to calculate natural log of the number currently on screen
const lnOperation = () => {
    box = document.getElementById("box");
    let square_num = Math.log(box.innerText);
    box.innerText = square_num;
    numbers.push(box.innerText);
}



// function to calculate the percentage of a number
const calculate_percentage = () => {
    let elements = document.getElementsByClassName("operator");
    box = document.getElementById("box");

    if (numbers.length > 0 && typeof last_operator != "undefined"){
        if (last_operator == "+" || last_operator == "-"){
            box.innerText = numbers*box.innerText/100;
        }
        else {
            box.innerText = box.innerText/100;
        }
    }
    else {
        box.innerText = box.innerText/100;
    }
    numbers = [];
    numbers.push(box.innerText);

    // deselect operator if any selected
    for (let i=0; i<elements.length; i++){
        elements[i].style.backgroundColor  = "#e68a00";
    }
}

// function to clear last number typed into the display
const clear_entry = () => {
    box = document.getElementById("box");

    if (numbers.length > 0 && typeof last_operator != "undefined"){
        box.innerText = 0;
        let temp = numbers[0];
        numbers = [];
        numbers.push(temp);
        firstNum = true;
    }
}



// function to capture keydown events
const keyPressed = (e) => {
    e.preventDefault()
    let dot = document.getElementById("dot").value;
    let equal = document.getElementById("equal_sign").value;

    if (e.key == "Delete"){
        button_clear();
        return;
    }

    let isNumber = isFinite(e.key);
    let enterPress;
    let dotPress;
    let commaPress = false;

    if (e.key == "Enter"){
        enterPress = equal;
    }
    if (e.key == "."){
        dotPress = dot;
    }
    if (e.key == ","){
        commaPress = true;
    }
    
    if (isNumber || operators.includes(e.key) || e.key == "Enter" || e.key == dotPress || 
        commaPress || e.key == "Backspace"){
        if (e.key == "Enter"){
            buttonNumber(enterPress);
        }
        else if (e.key == "Backspace"){
            document.getElementById("backspace_btn").style.backgroundColor  = "#999999";
            backspace_remove();
        }
        else if (commaPress){
            buttonNumber(dot);
        }
        else {
            buttonNumber(e.key); 
        }   
    }
}

// function to capture keyup events
const keyReleased = (e) => {
    e.preventDefault();
    // set the color of the backspace button back to its original
    if (e.key == "Backspace"){
        document.getElementById("backspace_btn").style.backgroundColor  = "#666666";
    }
}

document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyReleased);