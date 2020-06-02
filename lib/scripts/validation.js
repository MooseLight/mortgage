String.prototype.count=function(c) { 
    var result = 0, i = 0;
    for(i; i < this.length; i++){
        if(this[i] == c){
            result++;
        }
    }
    return result;
}

function mortgageAmountValidation(node){
    decimalNumberValidation(node);
}

function interestRateValidation(node){
    decimalNumberValidation(node);
}

function decimalNumberValidation(node){
    nodeValue = node.value.replace(/[^0-9.]/g,"");
    if (nodeValue.count('.') > 1){
        var temp = nodeValue.split('.');
        nodeValue = temp.shift() + '.' + temp.join('');
    }
    if (nodeValue.count('.') > 0){
        maxIndex = nodeValue.indexOf('.') + 2;
        if (nodeValue.length - 1 > maxIndex){
            nodeValue = nodeValue.substring(0, maxIndex + 1);
        }
    }
    node.value = nodeValue;
}