document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('payslip-form').addEventListener('submit', function(event) {
        event.preventDefault();
        makePDF();
    });

    document.querySelectorAll('.earning-amount').forEach(item => {
        item.addEventListener('input', updateEarnings);
    });

    document.querySelectorAll('.deduction-amount').forEach(item => {
        item.addEventListener('input', updateDeductions);
    });
});

function updateEarnings() {
    let totalEarnings = 0;
    document.querySelectorAll('.earning-amount').forEach(item => {
        totalEarnings += parseFloat(item.value) || 0;
    });
    document.getElementById('totalEarnings').value = totalEarnings.toFixed(2);
    updateNetPay();
}

function updateDeductions() {
    let totalDeductions = 0;
    document.querySelectorAll('.deduction-amount').forEach(item => {
        totalDeductions += parseFloat(item.value) || 0;
    });
    document.getElementById('totalDeductions').value = totalDeductions.toFixed(2);
    updateNetPay();
}

function updateNetPay() {
    const totalEarnings = parseFloat(document.getElementById('totalEarnings').value) || 0;
    const totalDeductions = parseFloat(document.getElementById('totalDeductions').value) || 0;
    const netPay = totalEarnings - totalDeductions;
    document.getElementById('totalAmount').value = netPay.toFixed(2);
}


function makePDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    pdf.setFont("helvetica", "normal");

    
    const employeeName = document.getElementById("employee_name").value;
    const employeeID = document.getElementById("employee_id").value;
    const payPeriod = document.getElementById("pay_period").value;
    const paidDays = document.getElementById("paid_days").value;
    const lopDays = document.getElementById("lop_days").value;
    const payDate = document.getElementById("pay_date").value;

    
    const basicPay = document.querySelector(".basic").value || 0;
    const hra = document.querySelector(".hra").value || 0;
    const incentive = document.querySelector(".incentive").value || 0;
    const totalEarnings = document.getElementById("totalEarnings").value || 0;

    
    const incomeTax = document.querySelector(".deduction-amount").value || 0;
    const providentFund = document.querySelectorAll(".deduction-amount")[1].value || 0;
    const unpaidLeaves = document.querySelectorAll(".deduction-amount")[2].value || 0;
    const totalDeductions = document.getElementById("totalDeductions").value || 0;


    const netPay = document.getElementById("totalAmount").value || 0;

    
    pdf.setFontSize(18);
    pdf.text("Payslip", 90, 20);
    
    pdf.setFontSize(12);
    pdf.text(`Employee Name: ${employeeName}`, 20, 40);
    pdf.text(`Employee ID: ${employeeID}`, 20, 50);
    pdf.text(`Pay Period: ${payPeriod}`, 20, 60);
    pdf.text(`Paid Days: ${paidDays}`, 20, 70);
    pdf.text(`Loss of Pay Days: ${lopDays}`, 20, 80);
    pdf.text(`Pay Date: ${payDate}`, 20, 90);

    
    pdf.text("Earnings", 20, 110);
    pdf.text(`Basic Pay: ₹${basicPay}`, 30, 120);
    pdf.text(`HRA: ₹${hra}`, 30, 130);
    pdf.text(`Incentive: ₹${incentive}`, 30, 140);
    pdf.text(`Total Earnings: ₹${totalEarnings}`, 30, 150);

    
    pdf.text("Deductions", 20, 170);
    pdf.text(`Income Tax: ₹${incomeTax}`, 30, 180);
    pdf.text(`Provident Fund: ₹${providentFund}`, 30, 190);
    pdf.text(`Unpaid Leaves: ₹${unpaidLeaves}`, 30, 200);
    pdf.text(`Total Deductions: ₹${totalDeductions}`, 30, 210);

    
    pdf.setFontSize(14);
    pdf.text(`Net Payable: ₹${netPay}`, 20, 240);

    
    pdf.save(`${employeeName}-Payslip.pdf`);
}
