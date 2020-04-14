function ShowPayment(){

    var payment = CalculatePayment();
    payment = Math.round((payment + Number.EPSILON) * 100) / 100;
    document.getElementById("payment-header").innerHTML = "Your payment is";
    document.getElementById("payment-details").innerHTML = "$" + payment;
}

function CalculatePayment(){
    //Grab variables from the input form
 
    var m = getMortgageAmount();
    var a = getAmortizationPeriod();
    var f = getPaymentFrequency();
    var i = getInteresRate();

    var interestType = document.getElementById("interestType").value;    //Not used in formula
    var interestTerm = document.getElementById("interestTerm").value;   //Not used in formula

    //Payment = P[r(1+r)^n/((1+r)^n)-1)] 
    var n = a * f;          //Amortization Period x Payment Frequency
    var r = i / (100 * f);  //Interest rate in percent, divided by Payment Frequency
    var p = m * (r * Math.pow((1 + r), n) / (Math.pow((1 + r), n) - 1));
    return p;
}

function CalculateInterest(){
    var m = getMortgageAmount();
    var a = getAmortizationPeriod();
    var f = getPaymentFrequency();
    var i = getInteresRate();
   
    calculateInterestOverAmortizationPeriod(m,a,f,i)
}

function CalculateInterestForPayment(m, f, i){
    return (m * i)/f;
}

function CalculatePrincipalForPayment(interest){
    return (CalculatePayment() - interest);
}

function CalculateInterestForYear(m, a, f, i){
    
    var accInterest = 0;
    i = i/100;
    for(var j = 0; j < f; j++){
        interest = CalculateInterestForPayment(m, f, i);
        principal = CalculatePrincipalForPayment(interest);
        m = m - principal;
        accInterest += interest;
    }
    console.log(accInterest);
    return accInterest;
}

function CalculatePrincipalForYear(m, a, f, i){
    var paymentyear = CalculatePayment() * f;
    var principal = paymentyear - CalculateInterestForYear(m, a, f, i);
    console.log("Payment for year: " + paymentyear);
    console.log("principal: " +  principal);
    return principal;
}

function calculateInterestOverAmortizationPeriod(m, a, f, i){
    var principal = 0;
    var accInterest = 0;
    for(var j = 0; j < a; j++){
        
        var interest = CalculateInterestForYear(m, a, f, i);
        var principal = CalculatePrincipalForYear(m, a, f, i);
        m = m - principal
        console.log("year " + (j+1) );
        console.log("Principal paid: " + principal);
        console.log("Interest paid: " + interest);      
        accInterest += interest;  
    }
    console.log("Total interest paid over " + a + "years: " + accInterest);
    return accInterest;
}

function getMortgageAmount(){
    return document.getElementById("mortgageAmount").value;
}

function getAmortizationPeriod(){
    return document.getElementById("amortizationPeriod").value;
}

function getPaymentFrequency(){
    return document.getElementById("paymentFrequency").value;
}

function getInteresRate(){
    return document.getElementById("interestRate").value;
}