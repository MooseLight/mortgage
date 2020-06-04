String.prototype.count = function(c) { 
    var result = 0, i = 0;
    for(i; i < this.length; i++){
        if(this[i] == c){
            result++;
        }
    }
    return result;
}

String.prototype.insertNumberCommas = function(){
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function mortgageAmountValidation(node){
    decimalNumberValidation(node);
}

function interestRateValidation(node){
    decimalNumberValidation(node);
}

function decimalNumberValidation(node){
    //Remove all characters that are not numbers or a decimal point
    nodeValue = node.value.replace(/[^0-9.]/g,"");

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
        var splitNum = nodeValue.split('.');
        nodeValue = splitNum[0].insertNumberCommas() + '.' + splitNum[1];
    }

    //If the number does not have a decimal
    else {
        //Insert commas
        nodeValue = nodeValue.insertNumberCommas();
    }

    node.value = nodeValue;
}