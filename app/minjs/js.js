for(var buttons=document.getElementsByTagName("button"),result=document.getElementById("result"),tekst,operand1,operand2,operation,dzialanie,wynik,i=0;i<buttons.length;i++)buttons[i].addEventListener("click",function(t){"C"==this.innerHTML?(result.textContent="0",tekst="",operand2="",operand1="",operation="",wynik=""):"numbers"===this.className?(tekst&&"0"!=result.textContent||(result.textContent=""),tekst=this.textContent,result.textContent+=tekst):"operations"===this.className?(operand1=tekst,tekst="",result.textContent="",operation=this.textContent):"score"===this.className&&(operand2=tekst,"+"==operation?wynik=addition(operand1,operand2):"-"==operation?wynik=substraction(operand1,operand2):"X"==operation?wynik=multiplication(operand1,operand2):"/"==operation&&(wynik=division(operand1,operand2)),result.textContent=wynik)},!1);