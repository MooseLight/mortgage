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
   
    var paymentDetails = calculatePayments(m,a,f,i)
    buildTable(paymentDetails);
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

function calculatePayments(m, a, f, i){
    var principal = 0;
    var accInterest = 0;
    var dict = {};

    for(var j = 0; j < a; j++){
        
        var interest = CalculateInterestForYear(m, a, f, i);
        var principal = CalculatePrincipalForYear(m, a, f, i);
        interest = Math.round((interest + Number.EPSILON) * 100) / 100
        principal = Math.round((principal + Number.EPSILON) * 100) / 100
        var value = {"year": j+1, "loan":m, "principal":principal, "interest":interest};
        dict[j+1] = value;

        m = m - principal
        
        console.log("year " + (j+1) );
        console.log("Principal paid: " + dict[j+1].principal);
        console.log("Interest paid: " + dict[j+1].interest);      
        accInterest += interest;  
    }
    console.log("Total interest paid over " + a + "years: " + accInterest);
    return dict;
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

function buildTable(payments){
    var table = document.getElementById("table-body");
    
    for(var key in payments){
        var v = payments[key];
        var tr = document.createElement("tr");
        var th = document.createElement("th");
        var attr = document.createAttribute("scope")
        attr.value = "row";
        th.setAttributeNode(attr);
        var yearRow = document.createTextNode(v.year.toString());
        th.appendChild(yearRow);
        var tdPO = document.createElement("td");
        var loan = v.loan;
        if(loan % 1 != 0){
            loan = Math.round((loan + Number.EPSILON) * 100) / 100
        }
        tdPO.appendChild(document.createTextNode(loan));
        var tdPI = document.createElement("td");
        var pi = v.principal + v.interest;
        pi = Math.round((pi + Number.EPSILON) * 100) / 100
        tdPI.appendChild(document.createTextNode(pi));
        var tdI = document.createElement("td");
        tdI.appendChild(document.createTextNode(v.interest));
        var tdP = document.createElement("td");
        tdP.appendChild(document.createTextNode(v.principal))
        var tdNPO = document.createElement("td");
        var npo = v.loan - v.principal;
        npo = Math.round((npo + Number.EPSILON) * 100) / 100
        tdNPO.appendChild(document.createTextNode(npo));
        tr.appendChild(th);
        tr.appendChild(tdPO);
        tr.appendChild(tdPI);
        tr.appendChild(tdI);
        tr.appendChild(tdP);
        tr.appendChild(tdNPO);
        
        table.appendChild(tr);
        
    }
}