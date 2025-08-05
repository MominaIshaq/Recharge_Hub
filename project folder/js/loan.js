document.getElementById("loanForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const number = document.getElementById("loanNumber").value.trim();
  const amount = document.getElementById("loanAmount").value;
  const purpose = document.getElementById("loanPurpose").value.trim();
  const days = document.getElementById("loanDays").value;
  const agree = document.getElementById("loanAgree").checked;

  const validMobile = /^03\d{9}$/;
  const validPurpose = /^[a-zA-Z\s]{3,}$/;
  const registeredMobile = localStorage.getItem("registeredMobile");

  if (!validMobile.test(number)) {
    showPopup(" Invalid Mobile Number", "Use a valid number like 03001234567.", "danger");
    return;
  }

  if (number !== registeredMobile) {
    showPopup(" Account Not Found", "Please create your account before requesting a loan.", "danger");
    setTimeout(() => {
      window.location.href = "create-account.html";
    }, 2000);
    return;
  }

  //  Check loan attempts
  let attempts = localStorage.getItem("loanAttempts_" + number);
  attempts = attempts ? parseInt(attempts) : 0;

  if (attempts >= 3) {
    showPopup(" Limit Reached", "You’ve already taken 3 loans. Please repay before requesting another.", "danger");
    return;
  }

  if (!amount || !days || !agree) {
    showPopup(" Missing Fields", "Fill all required fields and accept the terms.", "danger");
    return;
  }

  if (!validPurpose.test(purpose)) {
    showPopup(" Invalid Purpose", "Use alphabetic characters only, like 'Recharge' or 'Emergency'.", "danger");
    return;
  }

  //  Approve and log the loan
  localStorage.setItem("loanAttempts_" + number, attempts + 1);

  showPopup(" Loan Request Submitted", `
    Rs ${amount} loan approved for ${number}<br>
    Purpose: ${purpose}<br>
    Repayment in ${days} days<br>
    Attempts used: ${attempts + 1} / 3
  `, "warning");
});
