let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');
let string = "";
let arr = Array.from(buttons);

function checkForDivisionByZero(expression) {
    return /(\/\s*0+(\.0+)?)\b/.test(expression);
}


function calculateExpression(expression) {

    return expression.replace(/(\d*\.?\d+)%/g, function(match, number) {
        return `(${number} / 100)`;
    });
}


arr.forEach(button => {
    button.addEventListener('click', (e) => {
        let buttonText = e.target.innerHTML;
        
        if (buttonText == '=') {

            if (checkForDivisionByZero(string)) {
                input.value = "Error";
                string = "";
                return;
            }

            try {
                
                let finalString = calculateExpression(string);
                string = eval(finalString);
                input.value = string;
            } catch (error) {
                input.value = "Error";
                string = ""; 
            }
        } 
        
        else if (buttonText == 'AC') {
            string = "";
            input.value = string;
        } 
        
        else if (e.target.closest('.icon-only-btn')) {
            string = string.substring(0, string.length - 1);
            input.value = string;
        }
        
        else {
            if (buttonText === '%' && (string.length === 0 || isNaN(string[string.length - 1]))) {
                return; 
            }

            if (input.value === "Error" || input.value === "Error:Division by zero") {
                string = "";
            }
            
            string += buttonText;
            input.value = string;

        } 

        

    });
});

const handleKeyInput = (key) => {
    
    if (key === '=' || key === 'Enter') {
        
        if (checkForDivisionByZero(string)) {
            input.value = "Error";
            string = "";
            return; 
        }
        
        try {
            let finalString = calculateExpression(string);
            string = eval(finalString);
            input.value = string;
        } catch (error) {
            input.value = "Error";
            string = ""; 
        }
    }
    
    else if (key === 'Escape') {
        string = "";
        input.value = string;
    } 
    
    else if (key === 'Delete' || key === 'Backspace') {
        string = string.substring(0, string.length - 1);
        input.value = string;
    }
    
    else {
        if (input.value === "Error" || input.value === "Error: Division by Zero") {
            string = "";
        }

        if (key === '%' && (string.length === 0 || isNaN(string[string.length - 1]))) {
            return; 
        }
        
        string += key;
        input.value = string;
    }
}


document.addEventListener('keydown', (e) => {
    
    let key = e.key;

    if (key === 'Enter' || key === '=') {
        e.preventDefault();
    }

    const validInputs = '0123456789+-*/.%';
    
    if (validInputs.includes(key)) {
        handleKeyInput(key);
    } 
    else if (key === 'Enter') {
        handleKeyInput('=');
    }
    else if (key === 'Backspace' || key === 'Delete') {
        handleKeyInput(key);
    } 
    else if (key === 'Escape') {
        handleKeyInput(key);
    }
});


