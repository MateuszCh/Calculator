/**
 * Created by Mateusz Chybiorz on 2016-10-19.
 */
var operand1 = "";
var operand2 = "";
var toEval = "";
var operationClicked = false;
var wynik;
var button = document.getElementsByTagName("button");
var result = document.getElementById("result");
var sum = document.getElementById("sum");
var calcDone = false;
var operations = document.getElementsByClassName("operations");
for(var i = 0; i < button.length; i++){
    button[i].addEventListener("click", function () {

        if(this.classList.contains("numbers")){
            if(result.value == "0" || operationClicked ||calcDone){
                result.value = "";
            }
            if(sum.textContent == "0"){
                sum.textContent = "";
            }
            operand1 += this.value;
            result.value += this.value;
            toEval += this.value;
            operationClicked = false;
            sum.textContent += this.value;
            calcDone = false;
            if(sum.textContent == "00"){
                sum.textContent = "0";
            }
        } else if(this.classList.contains("operations")) {

            if(operationClicked){
                toEval = toEval.substring(0, toEval.length-1);
                sum.textContent = sum.textContent.substring(0, sum.textContent.length-1);
                result.value = result.value.substring(0, result.value.length-1);
            } else  {
                operand2 = operand1;
                operand1 = "";
            }

            toEval += this.value;
            result.value = this.value;
            operationClicked = true;
            sum.textContent += this.value;
            calcDone = false;
            console.log("Operand1: " + operand1);
            console.log("Operand2: " + operand2);

        } else  if(this.classList.contains("score")){
            if(!calcDone){
                for(var i = 0; i < operations.length; i++){
                    if(toEval.charAt(toEval.length-1) == operations[i].value){
                        toEval = toEval.substring(0, toEval.length-1);
                    }
                }
                wynik = eval(toEval);
                result.value = wynik;
                sum.textContent = "";
                operand1 = "";
                operand2 = "";
                toEval = "";
                operationClicked = false;
                calcDone = true;
            }
        } else if(this.classList.contains("delete")){
            operand1 = "";
            operand2 = "";
            toEval = "";
            operationClicked = false;
            wynik = "";
            result.value = "0";
            sum.textContent = "";
        } else if(this.classList.contains("deleteOneDigit")){
            if(!(result.value.length == 0) && !(result.value == "0")){
                toEval = toEval.substring(0, toEval.length-1);
                result.value = result.value.substring(0, result.value.length-1);
                sum.textContent = sum.textContent.substring(0, sum.textContent.length-1);
                operand1 = operand1.substring(0, operand1.length-1);
            }

            if(result.value.length == 0){
                result.value = "0";
            }
        } else if(this.classList.contains("deleteLastNumber")){

            var toDelete = operand1.length;
            toEval = toEval.substring(0,toEval.length-toDelete);
            result.value = "0";
            sum.textContent = sum.textContent.substring(0, sum.textContent.length-toDelete);
            operand1 = "";
        } else if (this.classList.contains("oneNumberOperations")){
            for(var prop in oneNumberOperations){
                if(this.value == oneNumberOperations[prop].type){
                    oneNumberOperations[prop].operation();
                }
            }
        }
        console.log(toEval);
        this.classList.toggle("active");
        var ten = this;
        setTimeout(function () {
            ten.classList.toggle("active");
        }, 200);
    })
}

function mask(number) {
    number = String(number).split('')
    var length = number.length

    for (var ii = 3; ii < length; ii += 3) {
        number.splice(length - ii, 0, ' ')
    }

    return number.join('')
}



//TO DO
// -- brak możlwości wciśnięcia operacji przed liczbą
// -- kontynuacja działań po znaku równa się
// aby resuly oraz sum nie wykraczały poza miejsce przeznaczone na nie
