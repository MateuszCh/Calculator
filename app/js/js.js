/**
 * Created by Mateusz Chybiorz on 2016-10-19.
 */
(function () {
    // variables
    var operand1 = "";
    var operand2 = "";
    var toEval = "";
    var wynik = "";
    var operationClicked = false;
    var calcDone = false;
    var button = document.getElementsByTagName("button");
    var result = document.getElementById("result");
    var sum = document.getElementById("sum");
    var basicOperations = document.getElementsByClassName("operations");

    // Object containing functions for each button
    var TypeOfButton = {
        //function for buttons from 0-9 and .
        numbers: {
            type: "numbers",
            action: function (e) {
                //prevents two dots in one number and two 0 in begining of number
                if((operand1.indexOf(".") > -1 && e.value == ".") || (operand1 == "0" && e.value == "0")) {
                    return;
                }
                //delete 0 from begining of result element if next input is not a dot or we inputs next number
                if((result.value == "0" && e.value != ".")  || operationClicked ||calcDone){
                    result.value = "";
                }
                //adds 0 to sum element if we input dot at the begining of calculation
                if(sum.textContent == "" && e.value == "."){
                    sum.textContent = "0";
                //adds 0 to sum and result elements if we input dot in new number;
                } else if(operand2 && !operand1 && e.value == "."){
                    sum.textContent += "0";
                    result.value +="0";
                }
                //delete 0 from sum element if next input is not a dot
                if(sum.textContent == "0" && e.value != "."){
                    sum.textContent = sum.textContent.substring(0, sum.textContent.length-1);
                }
                //actions if previous button clicked was equal
                if(calcDone){
                    operand1 = e.value;
                    result.value = e.value;
                    toEval = e.value;
                    sum.textContent = e.value;
                //actions if previous button clicked was other than equal
                } else {
                    operand1 += e.value;
                    toEval += e.value;
                    result.value += e.value;
                    result.value = mask(result.value);
                    sum.textContent += e.value;
                }
                operationClicked = false;
                calcDone = false;
            }
        },
        //function for buttons /,*,-,+
        operations: {
            type: "operations",
            action: function (e) {
                //clicking buttons has effect only if we input some number
                if(operand1 || operand2){
                    //prevent from two operations signs in a row
                    if(operationClicked || isNaN(toEval.charAt(toEval.length-1))){
                        toEval = toEval.substring(0, toEval.length-1);
                        sum.textContent = sum.textContent.substring(0, sum.textContent.length-1);
                        result.value = result.value.substring(0, result.value.length-1);
                    } else {
                        operand2 = operand1;
                        operand1 = "";
                    }
                    wynik = eval(toEval);
                    //delete fifth decimal digit and next digits
                    wynik = wynik.toFixed(4);
                    wynik = wynik.toString();
                    //delete zeros from end of decimal number
                    while(wynik.charAt(wynik.length-1) == "0"){
                        wynik = wynik.substring(0, wynik.length-1);
                    }
                    //delete dot if dot is last character of output
                    if(wynik.charAt(wynik.length-1) == "."){
                        wynik =wynik.substring(0, wynik.length-1);
                    }
                    toEval = wynik;
                    //adds spaces every three digit in integer
                    result.value = mask(wynik);
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
        //function for button =
        score:{
            type: "score",
            action: function () {
                //prevent actions if previous button clicked was equal or C
                if(!calcDone && toEval){
                    //delete operations sign from end of calculation
                    for(var i = 0; i < basicOperations.length; i++){
                        if(toEval.charAt(toEval.length-1) == basicOperations[i].value){
                            toEval = toEval.substring(0, toEval.length-1);
                        }
                    }
                    wynik = eval(toEval);
                    wynik = wynik.toFixed(4);
                    wynik = wynik.toString();
                    //delete zeros from end of decimal number
                    while(wynik.charAt(wynik.length-1) == "0"){
                        wynik = wynik.substring(0, wynik.length-1);
                    }
                    //delete dot if dot is last character of output
                    if(wynik.charAt(wynik.length-1) == "."){
                        wynik =wynik.substring(0, wynik.length-1);
                    }
                    //adds spaces every three digit in integer
                    result.value = mask(wynik);
                    sum.textContent = "";
                    operand1 = wynik;
                    operand2 = "";
                    toEval = wynik;
                    operationClicked = false;
                    calcDone = true;
                }
            }
        },
        //function for button C
        clear: {
            type: "clear",
            action: function () {
                //clear all variables
                operand1 = "";
                operand2 = "";
                toEval = "";
                operationClicked = false;
                result.value = "0";
                sum.textContent = "";
            }
        },
        //function for button ⇐
        deleteOneDigit: {
            type: "deleteOneDigit",
            action: function () {
                //possible only if calculation is not done
                if(!calcDone){
                    //prevent from deleting operation signs
                    if(!isNaN(toEval.charAt(toEval.length-1)) || toEval.charAt(toEval.length-1) == "."){
                        toEval = toEval.substring(0, toEval.length-1);
                        //updates spaces every three digits
                        result.value = result.value.replace(/ /g, "");
                        //delete last character from calculation
                        result.value = result.value.substring(0, result.value.length-1);
                        result.value = mask(result.value);
                        sum.textContent = sum.textContent.substring(0, sum.textContent.length-1);
                        operand1 = operand1.substring(0, operand1.length-1);
                        //if everything was deleted enter 0 in result element
                        if(result.value == ""){
                            result.value = "0";
                        }
                    }
                }
            }
        },
        //function for button CE
        deleteLastNumber: {
            type: "deleteLastNumber",
            action: function () {
                //can be clicked only if input exists
                if(operand1 || operand2){
                    var toDelete = operand1.length;
                    toEval = toEval.substring(0,toEval.length-toDelete);
                    result.value = "0";
                    sum.textContent = sum.textContent.substring(0, sum.textContent.length-toDelete);
                    operand1 = "";
                }
                //if equal button was clicked then CE button works just like C
                if(calcDone){
                    TypeOfButton.clear.action();
                }
            }
        },
        //function for buttons x², ¹/x, √, !, +/-
        oneNumberOperations: {
            type: "oneNumberOperations",
            action: function (e) {
                //do action only if we currently enter a number
                if(operand1){
                    for(var prop in Operations){
                        if(e.value == Operations[prop].type){
                            //save length of operand1 so we can remove correct number of characters
                            var len = operand1.length;
                            if(operand1.charAt(0) == "."){
                                var lenForResult = len + 1;
                            } else {
                                lenForResult = len;
                            }
                            operand1 = Operations[prop].operation(operand1);
                            wynik = operand1;
                            wynik = wynik.toFixed(4);
                            wynik = wynik.toString();
                            //delete zeros from end of decimal number
                            while(wynik.charAt(wynik.length-1) == "0"){
                                wynik = wynik.substring(0, wynik.length-1);
                            }
                            //delete dot if dot is last character of output
                            if(wynik.charAt(wynik.length-1) == "."){
                                wynik =wynik.substring(0, wynik.length-1);
                            }
                            operand1 = wynik;
                            toEval = toEval.substring(0, toEval.length - len);
                            toEval += operand1;
                            result.value = mask(operand1);
                            sum.textContent = sum.textContent.substring(0, sum.textContent.length-lenForResult);
                            sum.textContent += operand1;
                        }
                    }
                }
            }
        }
    };
    //function adding effect of clicking of button
    function classForAWhile(element, classes, duration) {
        element.classList.add(classes);
        setTimeout(function () {
            element.classList.remove(classes)
        }, duration);
    }
    //function adding space every three digits
    function mask(number) {
        //do nothing if input = Infinity;
        if(number == Infinity){
            return number;
        }
        //delete all existing spaces
        number = number.replace(/ /g, "");
        //if number is decimal
        if(number.indexOf(".") > -1){
            //partition of number into two parts, one with integer part
            //second with decimal part to which spaces are not added
            var positionOfDot = number.indexOf(".");
            var partToDot = number.substring(0, positionOfDot);
            var partFromDot = number.substring(positionOfDot);
            partToDot = String(partToDot).split("");
            var length = partToDot.length;
            for(var i = 3; i < length; i+= 3){
                partToDot.splice(length - i, 0, " ");
            }
            partToDot = partToDot.join("");
            number = partToDot + partFromDot;
            return number;
        } else {
            //if number is integer
            number = String(number).split("");
            length = number.length;
            for (var i = 3; i < length; i += 3) {
                number.splice(length - i, 0, " ");
            }
            return number.join('');
        }
    }
    for (var i = 0; i < button.length; i++){
        button[i].addEventListener("click", function (e) {
            e = e || window.event;
            for (var prop in TypeOfButton){
                if(this.classList.contains(TypeOfButton[prop].type)){
                    TypeOfButton[prop].action(e.target);
                }
            }
            classForAWhile(e.target, "active", 300);
            result.style.fontSize = "70px";
            sum.style.fontSize = "30px";
            changeFontSize(sum);
            changeFontSize(result);
        }, false)
    }
    //variables containing elements of buttons which can be clicked on keyboard
    var one = document.querySelector(".numbers[value='1']");
    var two = document.querySelector(".numbers[value='2']");
    var three = document.querySelector(".numbers[value='3']");
    var four = document.querySelector(".numbers[value='4']");
    var five = document.querySelector(".numbers[value='5']");
    var six = document.querySelector(".numbers[value='6']");
    var seven = document.querySelector(".numbers[value='7']");
    var eight = document.querySelector(".numbers[value='8']");
    var nine = document.querySelector(".numbers[value='9']");
    var zero = document.querySelector(".numbers[value='0']");
    var del = document.querySelector(".clear");
    var add = document.querySelector(".operations[value='+']");
    var subt = document.querySelector(".operations[value='-']");
    var divis = document.querySelector(".operations[value='/']");
    var multi = document.querySelector(".operations[value='*']");
    var equal = document.querySelector(".score[value='=']");
    var dot = document.querySelector(".numbers[value='.']");
    var oneDigit = document.querySelector(".deleteOneDigit");
    //simulate click events on buttons when inputs is made with keyboard
    document.addEventListener("keydown", function (e) {
        e = e || window.event;
        // e.preventDefault();
        if(e.key){
            switch (e.key){
                case "1":
                    one.click();
                    break;
                case "2":
                    two.click();
                    break;
                case "3":
                    three.click();
                    break;
                case "4":
                    four.click();
                    break;
                case "5":
                    five.click();
                    break;
                case "6":
                    six.click();
                    break;
                case "7":
                    seven.click();
                    break;
                case "8":
                    eight.click();
                    break;
                case "9":
                    nine.click();
                    break;
                case "0":
                    zero.click();
                    break;
                case "Delete":
                    del.click();
                    break;
                case "+":
                    add.click();
                    break;
                case "-":
                    subt.click();
                    break;
                case "/":
                    divis.click();
                    break;
                case "*":
                    multi.click();
                    break;
                case "Enter":
                    equal.click();
                    break;
                case ",":
                case ".":
                    dot.click();
                    break;
                case "Backspace":
                    oneDigit.click();
                    break;
            }
        } else {
            switch (e.keyCode){
                case "97":
                    one.click();
                    break;
                case "98":
                    two.click();
                    break;
                case "99":
                    three.click();
                    break;
                case "100":
                    four.click();
                    break;
                case "101":
                    five.click();
                    break;
                case "102":
                    six.click();
                    break;
                case "103":
                    seven.click();
                    break;
                case "104":
                    eight.click();
                    break;
                case "105":
                    nine.click();
                    break;
                case "96":
                    zero.click();
                    break;
                case "46":
                    del.click();
                    break;
                case "107":
                    add.click();
                    break;
                case "109":
                    subt.click();
                    break;
                case "111":
                    divis.click();
                    break;
                case "106":
                    multi.click();
                    break;
                case "13":
                    equal.click();
                    break;
                case "110":
                case "188":
                case "190":
                    dot.click();
                    break;
                case "8":
                    oneDigit.click();
                    break;
            }
        }
    });
    //function changing font size of element text automatically, so text is
    //not overflowing element
    function changeFontSize(element) {
        if(checkOverflow(element)){
            var size = element.style.fontSize;
            size = size.substring(0, size.length-2);
            size = size - 1;
            size += "px";
            element.style.fontSize = size;
            changeFontSize(element);
        }
    }
    //function checking if elements text is overflowing
    function checkOverflow(element) {
        var curOverflow = element.style.overflow;
        if ( !curOverflow || curOverflow === "visible" )
            element.style.overflow = "hidden";
        var isOverflowing = element.clientWidth < element.scrollWidth
            || element.clientHeight < element.scrollHeight;
        element.style.overflow = curOverflow;
        return isOverflowing;
    }
})();