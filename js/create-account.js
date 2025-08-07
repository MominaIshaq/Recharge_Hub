// Registries that store account details
const idRegistry = [];
const mobileRegistry = {};
const cnicRegistry = {};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("accountForm");
  const response = document.getElementById("accountResponse");

  if (!form || !response) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const mobile = document.getElementById("regMobile").value.trim();
    const cnic = document.getElementById("regCNIC").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const pin = document.getElementById("regPIN").value.trim();
    const terms = document.getElementById("termsCheck").checked;

    const validMobile = /^03\d{9}$/;
    const validCNIC = /^\d{13}$/;
    const validPIN = /^\d{5}$/;
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!validMobile.test(mobile) || !validCNIC.test(cnic) || !validPIN.test(pin) || !validEmail.test(email) || !terms) {
      response.className = "alert alert-danger";
      response.innerText = " Please enter valid info and accept terms.";
      response.style.display = "block";
      return;
    }

    response.className = "alert alert-info";
    response.innerHTML = `<div class="spinner-border text-success" role="status"></div><p>Creating your account...</p>`;
    response.style.display = "block";

    setTimeout(() => {
      let existing = idRegistry.find(entry => entry.mobile === mobile || entry.cnic === cnic);
      let accId;

      if (existing) {
        accId = existing.id;
      } else {
        accId = "TP-" + Math.floor(Math.random() * 10000000);
        idRegistry.push({ mobile, cnic, email, id: accId });
        mobileRegistry[mobile] = accId;
        cnicRegistry[cnic] = accId;
      }

      // ✅ Now it's safe to set account creation flag
      localStorage.setItem("accountCreated", "true");
      localStorage.setItem("registeredMobile", mobile);
      localStorage.setItem("registeredCNIC", cnic);
      localStorage.setItem("registeredEmail", email);
      localStorage.setItem("UserID", accId);

      response.style.display = "none";

      const popup = document.createElement("div");
      popup.className = "position-fixed top-50 start-50 translate-middle bg-success text-white p-4 rounded shadow-lg text-center";
      popup.style.zIndex = "9999";
      popup.innerHTML = `
        <h5>Account Created!</h5>
        <p>Your Balance Reload ID:<br><strong>${accId}</strong></p>
        <p>Email Confirmation Sent to:<br><strong>${email}</strong></p>
        <button class="btn btn-light mt-3" onclick="this.parentElement.remove()">Close</button>
      `;
      document.body.appendChild(popup);
    }, 1500);
  });
});






















