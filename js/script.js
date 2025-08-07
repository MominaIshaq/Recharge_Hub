//  Reusable Response Popup
function showPopup(title, message, color = "info") {
  const popup = document.createElement("div");
  popup.className = `position-fixed top-50 start-50 translate-middle bg-${color} text-white p-4 rounded shadow-lg text-center`;
  popup.style.zIndex = "9999";
  popup.innerHTML = `
    <h5>${title}</h5>
    <p>${message}</p>
    <button class="btn btn-light mt-3" onclick="this.parentElement.remove()">Close</button>
  `;
  document.body.appendChild(popup);
}



