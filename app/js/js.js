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
for(var i = 0; i < button.length; i++){
    button[i].addEventListener("click", function () {
        if(this.className == "numbers"){
            if(result.value == "0" || flaga){
                result.value = "";
            }

            operand1 += this.textContent;
            result.value += this.textContent;
            toEval += this.textContent;
            flaga = false;
        } else if(this.className == "operations") {
            operand2 = operand1;
            operand1 = "";

            if(this.textContent == "X"){
                toEval += "*";
            } else{

                toEval += this.textContent;
            }
            result.value = this.textContent;
            flaga = true;
        } else  if(this.className == "score"){
            wynik = eval(toEval);
            result.value = wynik;

        } else if(this.className == "delete"){
            operand1 = "";
            operand2 = "";
            toEval = "";
            flaga = false;
            wynik = "";
            result.value = "0";
        }
    })
}































    // console.log(document.getElementById("pier").innerHTML);
    // console.log(document.getElementById("dwa").innerHTML);




