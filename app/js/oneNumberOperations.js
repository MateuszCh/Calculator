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
        operation: function (operand) {
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
        operation: function (operand) {
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
    percent:    {
        type: "percent",
        operation: function (operand) {

        }
    }
}