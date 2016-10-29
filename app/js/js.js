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
                    result.value = mask(result.value);
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
                    toEval = wynik;
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
                        result.value = result.value.replace(/ /g, "");
                        result.value = result.value.substring(0, result.value.length-1);
                        result.value = mask(result.value);
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
                            wynik = operand1;
                            wynik = wynik.toFixed(4);
                            wynik = wynik.toString();
                            while(wynik.charAt(wynik.length-1) == "0"){
                                wynik = wynik.substring(0, wynik.length-1);
                            }
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

    function classForAWhile(element, classes, duration) {
        element.classList.add(classes);
        setTimeout(function () {
            element.classList.remove(classes)
        }, duration);
    }

    function mask(number) {
        if(number == Infinity){
            return number;
        }
        number = number.replace(/ /g, "");
        if(number.indexOf(".") > -1){
            var positionOfDot = number.indexOf(".");
            var partToDot = number.substring(0, positionOfDot);
            var partFromDot = number.substring(positionOfDot);
            partToDot = String(partToDot).split("");
            var length = partToDot.length

            for(var ii = 3; ii < length; ii+= 3){
                partToDot.splice(length - ii, 0, " ");
            }
            partToDot = partToDot.join("");
            number = partToDot + partFromDot;
            return number;
        } else {
            number = String(number).split('');
            length = number.length;

            for (var ii = 3; ii < length; ii += 3) {
                number.splice(length - ii, 0, ' ');
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
    var subt = document.querySelector(".operations[value='-']");;
    var divis = document.querySelector(".operations[value='/']");;
    var multi = document.querySelector(".operations[value='*']");;
    var equal = document.querySelector(".score[value='=']");;
    var dot = document.querySelector(".numbers[value='.']");
    var oneDigit = document.querySelector(".deleteOneDigit");

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
                    del.click()
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
                    del.click()
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
    })

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

    function checkOverflow(el) {
        var curOverflow = el.style.overflow;
        if ( !curOverflow || curOverflow === "visible" )
            el.style.overflow = "hidden";
        var isOverflowing = el.clientWidth < el.scrollWidth
            || el.clientHeight < el.scrollHeight;
        el.style.overflow = curOverflow;
        return isOverflowing;
    }

})();







