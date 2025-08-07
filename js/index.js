 document.addEventListener("DOMContentLoaded", function () {
  AOS.init();
});
document.addEventListener("DOMContentLoaded", function () {
  gsap.from("#hero-title", { opacity: 0, y: -50, duration: 1 });
  gsap.from("#hero-subtitle", { opacity: 0, y: -30, duration: 1.2 });
  gsap.from("#hero-btn", { opacity: 0, scale: 0.8, duration: 1.4 });
});


    document.getElementById("topupForm").addEventListener("submit", function(e) {
      e.preventDefault();
      const mobile = document.getElementById("mobile").value.trim();
      const network = document.getElementById("network").value;
      const amount = document.getElementById("amount").value;
      const response = document.getElementById("response");

      const validMobile = /^03\d{9}$/;
      if (!validMobile.test(mobile)) {
        response.className = "alert alert-danger";
        response.innerText = " Invalid mobile number format.";
        response.style.display = "block";
        return;
      }

      response.className = "alert alert-info";
      response.innerHTML = `<div class="spinner-border text-primary" role="status"></div><p>Processing your recharge...</p>`;
      response.style.display = "block";

      setTimeout(() => {
        const txnId = Math.floor(Math.random() * 10000000);
        response.className = "alert alert-success";
        response.innerHTML = ` Recharge Successful!<br>Txn ID: #${txnId}<br>Rs ${amount} sent to ${mobile} (${network})`;
      }, 1500);
    });

  





//           // login start
//     document.addEventListener("DOMContentLoaded", () => {
//   const loginModal = document.getElementById("loginModal");
//   const triggerLogin = document.getElementById("triggerLogin");
//   const closeLogin = document.getElementById("closeLogin");
//   const loginForm = document.getElementById("loginForm");
//   const loginMessage = document.getElementById("loginMessage");

//   // Show modal
//   triggerLogin.onclick = () => {
//     loginModal.style.display = "flex";
//   };

//   // Close modal
//   closeLogin.onclick = () => {
//     loginModal.style.display = "none";
//     loginMessage.style.display = "none";
//     loginForm.reset();
//   };

//   // Close when clicking outside
//   window.onclick = (e) => {
//     if (e.target === loginModal) {
//       loginModal.style.display = "none";
//       loginMessage.style.display = "none";
//       loginForm.reset();
//     }
//   };

//   // Handle login form
//   loginForm.onsubmit = (e) => {
//     e.preventDefault();
//     const username = document.getElementById("loginUser").value.trim();
//     const password = document.getElementById("loginPass").value.trim();

//     if (username === "admin" && password === "12345") {
//       loginMessage.textContent = "✅ Login successful!";
//       loginMessage.className = "alert alert-success text-center mt-3";
//     } else {
//       loginMessage.textContent = "❌ Invalid credentials.";
//       loginMessage.className = "alert alert-danger text-center mt-3";
//     }

//     loginMessage.style.display = "block";
//   };
// });


//       //  login end



// Save user data to LocalStorage
function createAccount() {
  const username = document.getElementById("signup-username").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;

  if (!username || !email || !password) {
    alert("Please fill all fields.");
    return;
  }

  const userData = { username, email, password };
  localStorage.setItem("rechargehubUser", JSON.stringify(userData));
  alert("Account created successfully!");
}

// Validate login credentials
function login() {
  const loginInput = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;

  const storedData = JSON.parse(localStorage.getItem("rechargehubUser"));

  if (!storedData) {
    alert("No account found. Please sign up first.");
    return;
  }

  const isMatch =
    (loginInput === storedData.username || loginInput === storedData.email) &&
    password === storedData.password;

  if (isMatch) {
    alert(`Welcome back, ${storedData.username}!`);
    // Redirect or load dashboard here
  } else {
    alert("Invalid credentials. Please try again.");
  }
}
