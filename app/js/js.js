/**
 * Created by Mateusz Chybiorz on 2016-10-19.
 */
var operand1 = "";
var operand2 = "";
var toEval = "";
var flaga = false;
var wynik;
var button = document.getElementsByTagName("button");
var result = document.getElementById("result");
var sum = document.getElementById("sum");
var lastOperation = "";
var calcDone = false;
var operations = document.getElementsByClassName("operations");
for(var i = 0; i < button.length; i++){
    button[i].addEventListener("click", function () {

        if(this.className == "numbers"){
            if(result.value == "0" || flaga ||calcDone){
                result.value = "";
            }
            if(sum.textContent == "0"){
                sum.textContent = "";
            }
            operand1 += this.value;
            result.value += this.value;
            toEval += this.value;
            flaga = false;
            sum.textContent += this.value;
            lastOperation = "";
            calcDone = false;
            if(sum.textContent == "00"){
                sum.textContent = "0";
            }
        } else if(this.className == "operations") {
            // console.log("Operand1: " + operand1);
            // console.log("Operand2: " + operand2);

            // if(flaga && !(this.value == lastOperation)){
            //     toEval = toEval.substring(0, toEval.length-1);
            //     sum.textContent = sum.textContent.substring(0, sum.textContent.length-1);
            //     result.value = result.value.substring(0, result.value.length-1);
            // }


            if(!(lastOperation == this.value)){
                operand2 = operand1;
                operand1 = "";
                toEval += this.value;
                result.value = this.value;
                flaga = true;
                sum.textContent += this.value;
                lastOperation = this.value;
                calcDone = false;

            }
        } else  if(this.className == "score"){
            if(!calcDone){
                for(var i = 0; i < operations.length; i++){
                    if(toEval.charAt(toEval.length-1) == operations[i].value){
                        toEval = toEval.substring(0, toEval.length-1);
                    }
                }
                wynik = eval(toEval);
                result.value = wynik;
                sum.textContent = "";
                lastOperation = "";
                operand1 = "";
                operand2 = "";
                toEval = "";
                flaga = false;
                calcDone = true;
            }
        } else if(this.className == "delete"){
            operand1 = "";
            operand2 = "";
            toEval = "";
            flaga = false;
            wynik = "";
            result.value = "0";
            sum.textContent = "";
            lastOperation = "";
        } else if(this.className == "deleteOneDigit"){
            toEval = toEval.substring(0, toEval.length-1);
            result.value = result.value.substring(0, result.value.length-1);
            sum.textContent = sum.textContent.substring(0, sum.textContent.length-1);
            if(result.value.length == 0){
                result.value = "0";
                sum.textContent = "0";
            }
        } else if(this.className == "deleteLastNumber"){

                var toDelete = operand1.length;
                toEval = toEval.substring(0,toEval.length-toDelete);
                result.value = "0";
                sum.textContent = sum.textContent.substring(0, sum.textContent.length-toDelete);
                operand1 = "";



        }
        console.log(toEval);
    })
}










    // console.log(document.getElementById("pier").innerHTML);
    // console.log(document.getElementById("dwa").innerHTML);




