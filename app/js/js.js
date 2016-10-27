/**
 * Created by Mateusz Chybiorz on 2016-10-19.
 */
(function () {
    var operand1 = "";
    var operand2 = "";
    var toEval = "";
    var operationClicked = false;
    var button = document.getElementsByTagName("button");
    var result = document.getElementById("result");
    var sum = document.getElementById("sum");
    var calcDone = false;
    var basicOperations = document.getElementsByClassName("operations");

    function numbers(e) {
        if(result.value == "0" || operationClicked ||calcDone){
            result.value = "";
        }
        if(sum.textContent == "0"){
            sum.textContent = "";
        }
        operand1 += e.value;
        result.value += e.value;
        toEval += e.value;
        operationClicked = false;
        sum.textContent += e.value;
        calcDone = false;
        if(sum.textContent == "00"){
            sum.textContent = "0";
        }
    }

    function operations(e) {
        if(operand1 || operand2){
            if(operationClicked){
                toEval = toEval.substring(0, toEval.length-1);
                sum.textContent = sum.textContent.substring(0, sum.textContent.length-1);
                result.value = result.value.substring(0, result.value.length-1);
            } else {
                operand2 = operand1;
                operand1 = "";
            }
            toEval += e.value;
            result.value = e.value;
            operationClicked = true;
            sum.textContent += e.value;
            calcDone = false;
        }

    }

    function score() {
        if(!calcDone && toEval){
            for(var i = 0; i < basicOperations.length; i++){
                if(toEval.charAt(toEval.length-1) == basicOperations[i].value){
                    toEval = toEval.substring(0, toEval.length-1);
                }
            }
            result.value = eval(toEval);
            sum.textContent = "";
            operand1 = "";
            operand2 = "";
            toEval = "";
            operationClicked = false;
            calcDone = true;
        }
    }

    function clear() {
        operand1 = "";
        operand2 = "";
        toEval = "";
        operationClicked = false;
        result.value = "0";
        sum.textContent = "";
    }

    function deleteOneDigit() {
        if(!calcDone){
            if(!(result.value.length == 0) && !(result.value == "0")){
                toEval = toEval.substring(0, toEval.length-1);
                result.value = result.value.substring(0, result.value.length-1);
                sum.textContent = sum.textContent.substring(0, sum.textContent.length-1);
                operand1 = operand1.substring(0, operand1.length-1);
            }
            if(result.value.length == 0){
                result.value = "0";
            }
        }

    }

    function deleteLastNumber() {
        if(operand1 || operand2){
            var toDelete = operand1.length;
            toEval = toEval.substring(0,toEval.length-toDelete);
            result.value = "0";
            sum.textContent = sum.textContent.substring(0, sum.textContent.length-toDelete);
            operand1 = "";
        }

    }

    function oneNumberOperations(e) {
        if(operand1){
            for(var prop in Operations){
                if(e.value == Operations[prop].type){
                    var len = operand1.length;
                    operand1 = Operations[prop].operation(operand1);
                    operand1 = operand1.toString();
                    toEval = toEval.substring(0, toEval.length - len);
                    toEval += operand1;
                    result.value = operand1;
                    sum.textContent = sum.textContent.substring(0, sum.textContent.length-len);
                    sum.textContent += operand1;
                }
            }
        }

    }

    function classForAWhile(element, classes, duration) {
        element.classList.add(classes);
        setTimeout(function () {
            element.classList.remove(classes)
        }, duration);
    }

    for(var i = 0; i < button.length; i++){
        button[i].addEventListener("click", function (e) {

            if(this.classList.contains("numbers")){
                numbers(e.target);
            } else if(this.classList.contains("operations")) {
                operations(e.target);
            } else  if(this.classList.contains("score")){
                score(e.target);
            } else if(this.classList.contains("clear")){
                clear();
            } else if(this.classList.contains("deleteOneDigit")){
                deleteOneDigit();
            } else if(this.classList.contains("deleteLastNumber")){
                deleteLastNumber();

            } else if (this.classList.contains("oneNumberOperations")){
                oneNumberOperations(e.target);
            }
            classForAWhile(e.target, "active", 300);
        })
    }



    // for(var i = 0; i < button.length; i++){
    //     for(var j = 0; j < arrayOfFunctions.length; j++){
    //         if(button[i].classList.contains(arrayOfFunctions[j])){
    //             button[i].addEventListener("click", function (e) {
    //                 arrayOfFunctions[j](e.target);
    //             })
    //         }
    //     }
    // }
})()



function mask(number) {
    number = String(number).split('')
    var length = number.length

    for (var ii = 3; ii < length; ii += 3) {
        number.splice(length - ii, 0, ' ')
    }

    return number.join('')
}
// uwzględnić kropkę


//TO DO
// -- brak możlwości wciśnięcia operacji przed liczbą
// -- kontynuacja działań po znaku równa się
// aby resuly oraz sum nie wykraczały poza miejsce przeznaczone na nie
// bład gdy mam operand1 operacje i operand 2, nastepnie usuwam po jednym znaku i daje
// nowa operacje to mam dwa znaki obok siebie, i tego pozniejszego nie moge juz zmienic
