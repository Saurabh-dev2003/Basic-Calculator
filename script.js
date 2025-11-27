let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');
let string = "";
let arr = Array.from(buttons);


function calculateExpression(expression) {

    return expression.replace(/(\d*\.?\d+)%/g, function(match, number) {
        return `(${number} / 100)`;
    });
}


arr.forEach(button => {
    button.addEventListener('click', (e) => {
        let buttonText = e.target.innerHTML;
        
        if (buttonText == '=') {
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

            string += buttonText;
            input.value = string;
        }
    });
});