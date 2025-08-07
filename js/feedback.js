const toggleBtn = document.getElementById("feedbackToggle");
  const formBox = document.getElementById("feedbackForm");
  const closeBtn = document.getElementById("closeFeedback");
  const submitBtn = document.getElementById("submitFeedback");
  const feedbackMessage = document.getElementById("feedbackMessage");
  const textarea = formBox.querySelector("textarea");

  // Open form
  toggleBtn.addEventListener("click", () => {
    formBox.style.display = "block";
    feedbackMessage.style.display = "none";
  });

  // Close form
  closeBtn.addEventListener("click", () => {
    formBox.style.display = "none";
    feedbackMessage.style.display = "none";
  });

  // Native validation logic
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (textarea.checkValidity()) {
      feedbackMessage.style.display = "block";
      setTimeout(() => {
        feedbackMessage.style.display = "none";
        formBox.style.display = "none";
        formBox.querySelector("form")?.reset?.(); // If inside a form tag, reset
        textarea.value = ""; // Just in case it's outside a form
      }, 2500);
    } else {
      textarea.reportValidity(); // Show browser “This field is required” message
    }
  });