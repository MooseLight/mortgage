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
    }

    //If the number does not have a decimal
    else {
        //Insert commas
        nodeValue = nodeValue.insertNumberCommas();
    }

    return nodeValue;
}