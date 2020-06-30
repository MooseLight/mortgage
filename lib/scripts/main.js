function reset(){
    $("form").get(0).reset();
}

function ShowPayment(){

    var payment = CalculatePayment();
    payment = Math.round((payment + Number.EPSILON) * 100) / 100;
    document.getElementById("payment-header").innerHTML = "Your payment is";
    document.getElementById("payment-details").innerHTML = formatNumberForTable(payment);
}

function CalculatePayment(){
    //Grab variables from the input form
    
    var m = getMortgageAmount();
    var a = getAmortizationPeriod();
    var f = getPaymentFrequency();
    var i = getInteresRate();

        //Not used in formula
    var interestTerm = document.getElementById("interestTerm").value;   //Not used in formula

    //Payment = P[r(1+r)^n/((1+r)^n)-1)] 
    var n = a * f;          //Amortization Period x Payment Frequency
    var r = i / (100 * f);  //Interest rate in percent, divided by Payment Frequency
    var p = m * (r * Math.pow((1 + r), n) / (Math.pow((1 + r), n) - 1));
    return p;
}

function CalculateInterest(){
    ShowPayment();
    var m = getMortgageAmount();
    var a = getAmortizationPeriod();
    var f = getPaymentFrequency();
    var i = getInteresRate();
    var t = getTerm();

    var paymentDetails = calculatePayments(m,a,f,i)
    buildTable(paymentDetails);
    buildGraph(paymentDetails);
    showTermDetails(paymentDetails, m, t);
    showDetailsRow(m, a, f, i, t);
    showTableAndGraph();
    var details = document.getElementById("details-section");
    details.classList.add("show");
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
       
        var value = {"year": j+1, "loan":m, "principal":principal, "interest":interest};
        dict[j+1] = value;

        m = m - principal
        
        // console.log("year " + (j+1) );
        // console.log("Principal paid: " + dict[j+1].principal);
        // console.log("Interest paid: " + dict[j+1].interest);      
        accInterest += interest;  
    }
    console.log("Total interest paid over " + a + "years: " + accInterest);
    return dict;
}

function getMortgageAmount(){
    return document.getElementById("mortgageAmount").value.stripNonNumericCharacters();
}

function getAmortizationPeriod(){
    return document.getElementById("amortizationPeriod").value;
}

function getPaymentFrequency(){
    return document.getElementById("paymentFrequency").value;
}

function getInteresRate(){
    return document.getElementById("interestRate").value.stripNonNumericCharacters();
}

function getTerm(){
    return document.getElementById("interestTerm").value;
}

function checkDecimal(value){
    if(value % 1 != 0){
        value = Math.round((value + Number.EPSILON) * 100) / 100
    }
    return value;
}

function buildTable(payments){
    var table = document.getElementById("table-body");
    table.innerHTML = "";

    for(var key in payments) {
        var v = payments[key];
        var tr = document.createElement("tr");
        var th = document.createElement("th");
        var attr = document.createAttribute("scope")
        attr.value = "row";
        th.setAttributeNode(attr);
        var yearRow = document.createTextNode(v.year.toString());
        th.appendChild(yearRow);
        
        
        var loan = v.loan;
        var interest = v.interest;
        var principal = v.principal;
        var pi = interest + principal;
        var npo = loan - principal;

        
        var tdPI = document.createElement("td");
        
        tdPI.appendChild(document.createTextNode(formatNumberForTable(pi)));
        var tdI = document.createElement("td");
        
        tdI.appendChild(document.createTextNode(formatNumberForTable(interest)));
        var tdP = document.createElement("td");
        
        tdP.appendChild(document.createTextNode(formatNumberForTable(principal)))
        var tdNPO = document.createElement("td");
        
        tdNPO.appendChild(document.createTextNode(formatNumberForTable(npo)));
        tr.appendChild(th);
        tr.appendChild(tdPI);
        tr.appendChild(tdI);
        tr.appendChild(tdP);
        tr.appendChild(tdNPO);
        table.appendChild(tr);
    }
}

function formatNumberForTable(number){
    return "$" + decimalNumberValidation(parseFloat(checkDecimal(number)).toFixed(2));
}

function buildGraph(payments){
    var yearsArray = [];
    var principalRemainingArray = [];
    var interestPaidArray = [];
    var totalPaidArray = [];

    var principalOustanding = payments[1].loan;
    var interestPaid = 0;
    var totalPaid = 0;

    for (var key in payments){
        var v = payments[key];
        principalOustanding = principalOustanding - v.principal;
        interestPaid = interestPaid + v.interest;
        totalPaid = totalPaid + v.principal + v.interest;

        yearsArray.push(v.year);
        principalRemainingArray.push(principalOustanding);
        interestPaidArray.push(interestPaid);
        totalPaidArray.push(totalPaid);
    }

    renderGraph(yearsArray, principalRemainingArray, interestPaidArray, totalPaidArray);
}

function renderGraph(yearsArray, principalRemainingArray, interestPaidArray, totalPaidArray){
    var ctx = document.getElementById('paymentsChart').getContext('2d');

    var chartData = {
        labels: yearsArray,
        datasets: [
            {
                label: 'Principal Remaining',
                data: principalRemainingArray,
                backgroundColor: 'rgba(179, 179, 179, 1)'
            },
            {
                label: 'Cumulative Interest Paid',
                data: interestPaidArray,
                backgroundColor: 'rgba(177, 59, 59, 1)'
            }//,
            // {
            //     label: 'Total Paid',
            //     data: totalPaidArray,
            //     backgroundColor: 'rgba(177, 59, 59, 1)',
            //     type: 'line'
            // },
        ]
    };

    var paymentsChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Year' 
                    },
                    gridLines: {
                        display: false
                    }             
                }],
                yAxes: [{
                    ticks: {
                        min: 0,
                        callback: function(value, index, values) {
                            return '$' + value.toLocaleString(undefined, {maximumFractionDigits:2});
                        }
                    }
                }]
            },
            maintainAspectRatio : true,
            responsive: true
        }
    });
}

function hideTableAndGraph(){
    $("table-and-graph-container").hide();
}

function showTableAndGraph(){
    $("table-and-graph-container").show();
}

function showTermDetails(paymentDetails, m, term){
    
    var principalforterm = 0;
    var interestforterm = 0;

    for(var i = 1; i <= term; i++){
        principalforterm += paymentDetails[i].principal;
        interestforterm += paymentDetails[i].interest;
    }
    var total = principalforterm + interestforterm;
    var remaining = m - total;

    document.getElementById("principal-paid").innerHTML = formatNumberForTable(checkDecimal(principalforterm));
    document.getElementById("interest-paid").innerHTML = formatNumberForTable(checkDecimal(interestforterm));
    document.getElementById("total-paid").innerHTML = formatNumberForTable(checkDecimal(total));
    document.getElementById("remaining-principal").innerHTML = formatNumberForTable(checkDecimal(remaining));
}

function showDetailsRow(m, a, f, i, t){
    document.getElementById("details-amount").innerHTML = formatNumberForTable(m);
    document.getElementById("details-years").innerHTML = a + " Years";
    document.getElementById("details-rate").innerHTML = i + "%";
    document.getElementById("details-term").innerHTML = t + " Years";
    if(f == 12){
        document.getElementById("details-frequency").innerHTML = "Monthly";
    }
    if(f == 24){
        document.getElementById("details-frequency").innerHTML = "Semi-Monthly";
    }
    if(f == 26){
        document.getElementById("details-frequency").innerHTML = "Bi-Weekly";
    }
    if(f == 52){
        document.getElementById("details-frequency").innerHTML = "Weekly";
    }
}



