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
    var wynik;
    var TypeOfButton = {
        numbers: {
            type: "numbers",
            action: function (e) {

                if((operand1.indexOf(".") > -1 && e.value == ".") || (operand1 == "0" && e.value == "0")) {
                    return;
                }
                if((result.value == "0" && e.value != ".")  || operationClicked ||calcDone){
                    result.value = "";
                }
                if(sum.textContent == "" && e.value == "."){
                    sum.textContent = "0";
                } else if(operand2 && !operand1 && e.value == "."){
                    sum.textContent += "0";
                    result.value +="0";
                }
                if(sum.textContent == "0" && e.value != "."){
                    sum.textContent = sum.textContent.substring(0, sum.textContent.length-1);
                }
                if(calcDone){
                    operand1 = e.value;
                    result.value = e.value;
                    toEval = e.value;
                    sum.textContent = e.value;
                } else {
                    operand1 += e.value;
                    toEval += e.value;
                    result.value += e.value;
                    sum.textContent += e.value;
                }
                operationClicked = false;
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
                    if(operationClicked || isNaN(toEval.charAt(toEval.length-1))){
                        toEval = toEval.substring(0, toEval.length-1);
                        sum.textContent = sum.textContent.substring(0, sum.textContent.length-1);
                        result.value = result.value.substring(0, result.value.length-1);
                    } else {
                        operand2 = operand1;
                        operand1 = "";
                    }
                    wynik = eval(toEval);
                    wynik = wynik.toFixed(4);
                    wynik = wynik.toString();
                    while(wynik.charAt(wynik.length-1) == "0"){
                        wynik = wynik.substring(0, wynik.length-1);
                    }
                    if(wynik.charAt(wynik.length-1) == "."){
                        wynik =wynik.substring(0, wynik.length-1);
                    }
                    result.value = wynik;
                    if(calcDone){
                        sum.textContent = toEval + e.value;
                    } else {
                        sum.textContent += e.value;
                    }
                    toEval += e.value;
                    operationClicked = true;
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
                    wynik = eval(toEval);
                    wynik = wynik.toFixed(4);
                    wynik = wynik.toString();
                    while(wynik.charAt(wynik.length-1) == "0"){
                        wynik = wynik.substring(0, wynik.length-1);
                    }
                    if(wynik.charAt(wynik.length-1) == "."){
                        wynik =wynik.substring(0, wynik.length-1);
                    }
                    result.value = wynik;
                    sum.textContent = "";
                    operand1 = wynik;
                    operand2 = "";
                    toEval = wynik;
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
                    if(!isNaN(toEval.charAt(toEval.length-1)) || toEval.charAt(toEval.length-1) == "."){
                        toEval = toEval.substring(0, toEval.length-1);
                        result.value = result.value.substring(0, result.value.length-1);
                        sum.textContent = sum.textContent.substring(0, sum.textContent.length-1);
                        operand1 = operand1.substring(0, operand1.length-1);
                        if(result.value == ""){
                            result.value = "0";
                        }
                    }
                }
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
                            if(operand1.charAt(0) == "."){
                                var lenForResult = len + 1;
                            } else {
                                lenForResult = len;
                            }
                            operand1 = Operations[prop].operation(operand1);
                            operand1 = operand1.toString();
                            toEval = toEval.substring(0, toEval.length - len);
                            toEval += operand1;
                            result.value = operand1;
                            sum.textContent = sum.textContent.substring(0, sum.textContent.length-lenForResult);
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
            console.log(operand1);
            console.log(toEval);
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
// // aby result oraz sum nie wykraczały poza miejsce przeznaczone na nie
