/**
 * Created by Mateusz Chybiorz on 2016-10-19.
 */
var buttons = document.getElementsByTagName("button");
var result = document.getElementById("result");
var tekst;
var operand1;
var operand2;
var operation;
var dzialanie;
var wynik;
for(var i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click", function (e) {
        if(this.innerHTML == "C"){
            result.textContent = "0";
            tekst = "";
            operand2 = "";
            operand1 = "";
            operation = "";
            wynik = "";
        } else if(this.className === "numbers"){
            if(!tekst || result.textContent == "0"){
                result.textContent = "";
            }
            tekst = this.textContent;
            result.textContent += tekst;
        } else if(this.className === "operations"){
            operand1 = tekst;
            tekst = "";
            result.textContent = "";
            operation = this.textContent;
        } else if(this.className === "score"){
            operand2 = tekst;
            if(operation == "+"){
                wynik = addition(operand1, operand2);
            }   else if(operation == "-"){
                wynik = substraction(operand1, operand2);
            } else if (operation == "X"){
                wynik = multiplication(operand1, operand2);
            } else if (operation == "/"){
                wynik = division(operand1, operand2);
            }
            result.textContent = wynik;
        }
    }, false);
}



