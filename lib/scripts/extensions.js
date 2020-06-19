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

Number.prototype.stripNonNumericCharacters = function(){
    return this.toString().stripNonNumericCharacters();
}

String.prototype.insertNumberCommas = function(){
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//Assumes a floating point number
String.prototype.splitFloatingPointNumber = function(){
    var splitNum = this.split('.');
    return { Integer: splitNum[0], Decimal: splitNum[1] };
}
