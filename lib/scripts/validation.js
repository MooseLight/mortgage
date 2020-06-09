String.prototype.count = function(c) { 
    var result = 0, i = 0;
    for(i; i < this.length; i++){
        if(this[i] == c){
            result++;
        }
    }
    return result;
}

String.prototype.stripNonNumericCharacters = function(){
    //Remove all characters that are not numbers or a decimal point
    return this.replace(/[^0-9.]/g,"");
}

String.prototype.insertNumberCommas = function(){
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//Assumes a floating point number
String.prototype.splitFloatingPointNumber = function(){
    var splitNum = this.split('.');
    return { Integer: splitNum[0], Decimal: splitNum[1] };
} 

function mortgageAmountValidation(node){
    node.value = decimalNumberValidation(node.value);
    node.value = enforceMaxValue(node.value, 1000000000000.00);
}

function interestRateValidation(node){
    node.value = decimalNumberValidation(node.value);
    node.value = enforceMaxValue(node.value, 100.00);
}

function enforceMaxValue(value, maxValue){
    //Have to strip invalid characters in order to parse correctly (remove commas)
    if (parseFloat(value.stripNonNumericCharacters()) > maxValue){

        //Need to reformat the number (add commas)
        return decimalNumberValidation(maxValue.toFixed(2));    
    }
    return value;
}

function decimalNumberValidation(value){
    nodeValue = value.stripNonNumericCharacters();

    //If there is more than one decimal point remove it
    if (nodeValue.count('.') > 1){
        var temp = nodeValue.split('.');
        nodeValue = temp.shift() + '.' + temp.join('');
    }

    //If the number contains a decimal
    if (nodeValue.count('.') > 0){
        maxIndex = nodeValue.indexOf('.') + 2;
        if (nodeValue.length - 1 > maxIndex){
            nodeValue = nodeValue.substring(0, maxIndex + 1);
        }
        
        //Insert commas just into the whole number part
        var floatingPointNumber = nodeValue.splitFloatingPointNumber();
        nodeValue = floatingPointNumber.Integer.insertNumberCommas() + '.' + floatingPointNumber.Decimal;
        // var splitNum = nodeValue.split('.');
        // nodeValue = splitNum[0].insertNumberCommas() + '.' + splitNum[1];
    }

    //If the number does not have a decimal
    else {
        //Insert commas
        nodeValue = nodeValue.insertNumberCommas();
    }

    return nodeValue;
}