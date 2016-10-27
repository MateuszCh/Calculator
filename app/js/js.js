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

    var TypeOfButton    =   {
        numbers: {
            type: "numbers",
            action: function (e) {
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
        },
        operations: {
            type: "operations",
            action: function (e) {
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
        },
        score:{
            type: "score",
            action: function () {
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
                    // toEval = "";
                    operationClicked = false;
                    calcDone = true;
                }
            }
        },
        clear: {
            type: "clear",
            action: function () {
                operand1 = "";
                operand2 = "";
                toEval = "";
                operationClicked = false;
                result.value = "0";
                sum.textContent = "";
            }
        },
        deleteOneDigit: {
            type: "deleteOneDigit",
            action: function () {
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
                // if(calcDone){
                //     TypeOfButton.clear.action();
                // }
            }
        },
        deleteLastNumber: {
            type: "deleteLastNumber",
            action: function () {
                if(operand1 || operand2){
                    var toDelete = operand1.length;
                    toEval = toEval.substring(0,toEval.length-toDelete);
                    result.value = "0";
                    sum.textContent = sum.textContent.substring(0, sum.textContent.length-toDelete);
                    operand1 = "";
                }
                if(calcDone){
                    TypeOfButton.clear.action();
                }
            }
        },
        oneNumberOperations: {
            type: "oneNumberOperations",
            action: function (e) {
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
        }
    }
    function classForAWhile(element, classes, duration) {
        element.classList.add(classes);
        setTimeout(function () {
            element.classList.remove(classes)
        }, duration);
    }
    for (var i = 0; i < button.length; i++){
        button[i].addEventListener("click", function (e) {
            for (var prop in TypeOfButton){
                if(this.classList.contains(TypeOfButton[prop].type)){
                    TypeOfButton[prop].action(e.target);
                }
            }
            classForAWhile(e.target, "active", 300);
        }, false)
    }
})()



// function mask(number) {
//     number = String(number).split('')
//     var length = number.length
//
//     for (var ii = 3; ii < length; ii += 3) {
//         number.splice(length - ii, 0, ' ')
//     }
//
//     return number.join('')
// }
// // uwzględnić kropkę
//
//
// //TO DO
// // -- brak możlwości wciśnięcia operacji przed liczbą
// // -- kontynuacja działań po znaku równa się
// // aby resuly oraz sum nie wykraczały poza miejsce przeznaczone na nie
// // bład gdy mam operand1 operacje i operand 2, nastepnie usuwam po jednym znaku i daje
// // nowa operacje to mam dwa znaki obok siebie, i tego pozniejszego nie moge juz zmienic
