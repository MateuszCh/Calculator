/**
 * Created by Mateusz Chybiorz on 2016-10-23.
 */
var Operations = {
    power: {
        type: "power",
        operation: function (operand1) {

            return Math.pow(operand1, 2);
        }
    },
    root: {
        type: "root",
        operation: function (operand1) {
            return Math.sqrt(operand1);
        }
    },
    reciprocal: {
        type: "reciprocal",
        operation: function (operand1) {
            return 1 / operand1;
        }
    },
    factorial:    {
        type: "factorial",
        operation: function (operand1) {
            if(Math.floor(operand1) == operand1 && operand1 >= 0){
                var rval = 1;
                for (var i = 2; i <= operand1; i++){
                    rval = rval * i;
                }
                operand1 = rval;
                return operand1;
            }
        }
    },
    changeSign: {
        type: "changeSign",
        operation: function (operand1) {
            if(operand1 < 0){
                return Math.abs(operand1);
            } else if(operand1 > 0){
                return operand1 - (2*operand1);
            }
        }
    }
}