//  Account check and redirect logic
function checkRechargeAccess(res) {
  const isRegistered = localStorage.getItem("accountCreated") === "true";

  if (!isRegistered) {
    res.className = "alert alert-danger";
    res.innerHTML = `
      <h5>Recharge Blocked</h5>
      <p>You need to create an account before recharging.</p>
      <a href="create-account.html" class="btn btn-warning mt-2">Create Account</a>
    `;
    res.style.display = "block";
    return false;
  }

  return true;
}

//  Optional popup feedback
function showPopup(title, message, type) {
  const popup = document.createElement("div");
  popup.className = `position-fixed top-50 start-50 translate-middle bg-${type} text-white p-4 rounded shadow-lg text-center`;
  popup.style.zIndex = "9999";
  popup.innerHTML = `
    <h5>${title}</h5>
    <p>${message}</p>
    <button class="btn btn-light mt-2" onclick="this.parentElement.remove()">Close</button>
  `;
  document.body.appendChild(popup);
}

//  Recharge form submission logic
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("topupForm");
  const res = document.getElementById("response");

  if (!form || !res) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!checkRechargeAccess(res)) return;

    const number = document.getElementById("mobile").value.trim();
    const amount = document.getElementById("amount").value;
    const network = document.getElementById("network").value;

    // ✅ Phone number validation (Pakistani format: starts with 03 and has 11 digits)
    const isValidNumber = /^03\d{9}$/.test(number);

    if (!isValidNumber) {
      res.className = "alert alert-warning";
      res.innerHTML = `
        <h5>Invalid Number</h5>
        <p>Please enter a valid Pakistani mobile number (e.g., 03001234567).</p>
      `;
      res.style.display = "block";
      return;
    }

    res.innerHTML = `
      <div class="spinner-border text-warning" role="status"></div>
      <p>Processing your recharge...</p>
    `;
    res.className = "";
    res.style.display = "block";

    setTimeout(() => {
      const txnId = Math.floor(Math.random() * 10000000);
      const timestamp = new Date().toLocaleString();

      const rechargeData = {
        number,
        amount,
        network,
        time: timestamp,
        txnId: "TP-" + txnId
      };

      let history = JSON.parse(localStorage.getItem("rechargeHistory")) || [];
      history.push(rechargeData);
      localStorage.setItem("rechargeHistory", JSON.stringify(history));

      res.innerHTML = `
        <h5>Recharge Successful</h5>
        <p>Txn ID: #TP-${txnId} <br> Rs ${amount} sent to ${number} on ${network}</p>
      `;
      res.className = "alert alert-success";

      showPopup("Recharge Confirmed", `Rs ${amount} sent to ${number} on ${network}<br>Txn ID: TP-${txnId}`, "success");
    }, 1500);
  });
});
