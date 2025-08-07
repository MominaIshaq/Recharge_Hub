function showOfferPopup(title, message) {
  const isRegistered = localStorage.getItem("accountCreated");

  if (isRegistered === "true") {
    console.log("✅ Account created: proceeding to show offer popup.");

    // Inject content into modal
    const modalTitle = document.getElementById("offerModalLabel");
    const modalMessage = document.getElementById("offerModalMessage");

    modalTitle.textContent = title;
    modalMessage.textContent = message;

    // Show Bootstrap modal
    const offerModal = new bootstrap.Modal(document.getElementById("offerModal"));
    offerModal.show();

  } else {
    console.log("⚠️ No account detected: redirecting to account creation.");
    window.location.href = "create-account.html";
  }
}

function deleteAccount() {
  const isRegistered = localStorage.getItem("accountCreated");

  if (isRegistered === "true") {
    localStorage.removeItem("accountCreated");
    console.log("🗑️ Account deleted from localStorage.");
    alert("Your account has been removed.");
  } else {
    console.log("ℹ️ No account was found in localStorage to delete.");
    alert("No account exists to delete.");
  }
}

// 🆕 Secure Offer Trigger
function verifyBeforeOffer(title, message) {
  const userMobile = localStorage.getItem("registeredMobile");

  const verifier = document.createElement("div");
  verifier.className = "position-fixed top-50 start-50 translate-middle bg-light border p-4 rounded shadow text-center";
  verifier.style.zIndex = "9999";
  verifier.innerHTML = `
    <h5>Confirm Eligibility</h5>
    <p>Enter your registered mobile number:</p>
    <input type="text" id="verifyMobileInput" class="form-control mb-2" placeholder="03XXXXXXXXX" />
    <div id="verifyMsg" class="text-danger mb-2" style="display:none;"></div>
    <button class="btn btn-success" id="verifyAndProceed">Unlock Offer</button>
    <button class="btn btn-secondary mt-2" onclick="this.parentElement.remove()">Cancel</button>
  `;
  document.body.appendChild(verifier);

  document.getElementById("verifyAndProceed").addEventListener("click", () => {
    const inputMobile = document.getElementById("verifyMobileInput").value.trim();
    const verifyMsg = document.getElementById("verifyMsg");

    if (inputMobile === userMobile) {
      document.body.removeChild(verifier);
      showOfferPopup(title, message);
    } else {
      verifyMsg.innerText = "Mobile number not recognized.";
      verifyMsg.style.display = "block";
    }
  });
}
