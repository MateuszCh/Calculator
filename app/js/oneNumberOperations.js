/**
 * Created by Mateusz Chybiorz on 2016-10-23.
 */
var oneNumberOperations = {
    power: {
        type: "power",
        operation: function () {
            var len = operand1.length;
            operand1 = Math.pow(operand1, 2);
            operand1 = operand1.toString();
            toEval = toEval.substring(0, toEval.length - len);
            toEval += operand1;
            result.value = operand1;
            sum.textContent = sum.textContent.substring(0, sum.textContent.length-len);
            sum.textContent += operand1;
            console.log("Operand1: " + operand1);
            console.log("operand1 length: " + operand1.length);
        }
    },
    root: {
        type: "root",
        operation: function () {
            var len = operand1.length;
            operand1 = Math.sqrt(operand1);
            operand1 = operand1.toString();
            toEval = toEval.substring(0, toEval.length - len);
            toEval += operand1;
            result.value = operand1;
            sum.textContent = sum.textContent.substring(0, sum.textContent.length-len);
            sum.textContent += operand1;
            console.log("Operand1: " + operand1);
            console.log("operand1 length: " + operand1.length);
        }
    },
    reciprocal: {
        type: "reciprocal",
        operation: function () {
            var len = operand1.length;
            operand1 = 1 / operand1;
            operand1 = operand1.toString();
            toEval = toEval.substring(0, toEval.length - len);
            toEval += operand1;
            result.value = operand1;
            sum.textContent = sum.textContent.substring(0, sum.textContent.length-len);
            sum.textContent += operand1;
            console.log("Operand1: " + operand1);
            console.log("operand1 length: " + operand1.length);
        }
    },
    factorial:    {
        type: "factorial",
        operation: function () {
            if(Math.floor(operand1) == operand1 && operand1 >= 0){
                var len = operand1.length;

                var rval = 1;
                for (var i = 2; i <= operand1; i++){
                    rval = rval * i;
                }
                operand1 = rval;
                operand1 = operand1.toString();
                toEval = toEval.substring(0, toEval.length - len);
                toEval += operand1;
                result.value = operand1;
                sum.textContent = sum.textContent.substring(0, sum.textContent.length-len);
                sum.textContent += operand1;
            }
        }
    },
    changeSign: {
        type: "changeSign",
        operation: function () {
            var len = operand1.length;
            if(operand1 < 0){
                operand1 = Math.abs(operand1);
            } else if(operand1 > 0){
                operand1 = operand1 - (2*operand1);
            }
            operand1 = operand1.toString();
            toEval = toEval.substring(0, toEval.length - len);
            toEval += operand1;
            result.value = operand1;
            sum.textContent = sum.textContent.substring(0, sum.textContent.length-len);
            sum.textContent += operand1;
            console.log("Operand1: " + operand1);
            console.log("operand1 length: " + operand1.length);
        }
    }
}