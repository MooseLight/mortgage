function CalculatePayment(){
    //Grab variables from the input form
    var P = document.getElementById("mortgageAmount").value
    var a = document.getElementById("amortizationPeriod").value
    var f = document.getElementById("paymentFrequency").value
    var i = document.getElementById("interestRate").value
    var interestType = document.getElementById("interestType").value    //Not used in formula
    var interestTerm = document.getElementById("interestTerm").value    //Not used in formula

    //Payment = P[r(1+r)^n/((1+r)^n)-1)] 
    var n = a * f;          //Amortization Period x Payment Frequency
    var r = i / (100 * f);  //Interest rate in percent, divided by Payment Frequency
    var Payment = P * (r * Math.pow((1 + r), n) / (Math.pow((1 + r), n) - 1))
    var RoundedResult = Math.round((Payment + Number.EPSILON) * 100) / 100
    document.getElementById("payment-header").innerHTML = "Your payment is";
    document.getElementById("payment-details").innerHTML = "$" + RoundedResult;
}