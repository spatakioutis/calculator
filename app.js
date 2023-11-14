function init_screen() {
    const screen = document.querySelector(".screen h1");
    screen.textContent = "0";
}

function init_options() {

}

function init_buttons() {
    const buttons = document.querySelectorAll(".buttons button");

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            //reset shown value after = is pressed
            if (operationEnded == true) {
                operation = [];
                operationEnded = false;
            }

            let key_entered = e.target.textContent;

            switch (e.target.className) {
                case "number": {
                    if ( operation.length == 1 || operation.length == 3 ) {
                        operation[ operation.length - 1 ] += key_entered;
                    }
                    break;
                }
                case "operator": {
                    switch (operation.length) {
                        case 0: 
                            operation.push("0");
                            break;
                        case 2: 
                            operation.pop();
                            break;
                        case 3: 
                            let result = operate(operation);

                            if ( !isNaN(result) ) {
                                operation = [result];
                            } 
                            else {
                                operation = ["Error"];
                            }
                            break;
                        }
                        break;
                }
            }
            if (key_entered === "=")
                operationEnded = true; 
            else 
                operation.push(key_entered);
            
            const screen = document.querySelector(".screen h1");
            screen.textContent = operation.join("");
        });
    });
}

function init_calculator() {
    init_screen();
    init_buttons();
}

function operate(operation) {
    let operand1 = parseInt( operation[0] );
    let operator = operation[1];
    let operand2 = parseInt( operation[2] );

    switch (operator) {
        case "+": return (operand1 + operand2);
        case "-": return (operand1 - operand2);
        case "*": return (operand1 * operand2);
        case "/": return (operand1 / operand2);
    }
}

let operationEnded = false;
let operation = [];

const decimal = document.querySelector(".decimal");
decimal.disabled = true;


init_calculator();