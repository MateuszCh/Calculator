function mask(e){e=String(e).split("");for(var t=e.length,n=3;n<t;n+=3)e.splice(t-n,0," ");return e.join("")}for(var operand1="",operand2="",toEval="",operationClicked=!1,wynik,button=document.getElementsByTagName("button"),result=document.getElementById("result"),sum=document.getElementById("sum"),calcDone=!1,operations=document.getElementsByClassName("operations"),i=0;i<button.length;i++)button[i].addEventListener("click",function(){if("numbers"==this.className)("0"==result.value||operationClicked||calcDone)&&(result.value=""),"0"==sum.textContent&&(sum.textContent=""),operand1+=this.value,result.value+=this.value,toEval+=this.value,operationClicked=!1,sum.textContent+=this.value,calcDone=!1,"00"==sum.textContent&&(sum.textContent="0");else if("operations"==this.className)operationClicked?(toEval=toEval.substring(0,toEval.length-1),sum.textContent=sum.textContent.substring(0,sum.textContent.length-1),result.value=result.value.substring(0,result.value.length-1)):(operand2=operand1,operand1=""),toEval+=this.value,result.value=this.value,operationClicked=!0,sum.textContent+=this.value,calcDone=!1,console.log("Operand1: "+operand1),console.log("Operand2: "+operand2);else if("score"==this.className){if(!calcDone){for(var i=0;i<operations.length;i++)toEval.charAt(toEval.length-1)==operations[i].value&&(toEval=toEval.substring(0,toEval.length-1));wynik=eval(toEval),result.value=wynik,sum.textContent="",operand1="",operand2="",toEval="",operationClicked=!1,calcDone=!0}}else if("delete"==this.className)operand1="",operand2="",toEval="",operationClicked=!1,wynik="",result.value="0",sum.textContent="";else if("deleteOneDigit"==this.className)0!=result.value.length&&"0"!=result.value&&(toEval=toEval.substring(0,toEval.length-1),result.value=result.value.substring(0,result.value.length-1),sum.textContent=sum.textContent.substring(0,sum.textContent.length-1),operand1=operand1.substring(0,operand1.length-1)),0==result.value.length&&(result.value="0");else if("deleteLastNumber"==this.className){var toDelete=operand1.length;toEval=toEval.substring(0,toEval.length-toDelete),result.value="0",sum.textContent=sum.textContent.substring(0,sum.textContent.length-toDelete),operand1=""}else if("oneNumberOperations"==this.className)for(var prop in oneNumberOperations)this.value==oneNumberOperations[prop].type&&oneNumberOperations[prop].operation();console.log(toEval)});