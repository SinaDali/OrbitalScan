document.addEventListener("DOMContentLoaded", () => {
  const username = window.Telegram.WebApp.initDataUnsafe.user?.username;

  const accessMessage = document.createElement("div");
  accessMessage.id = "accessMessage";
  accessMessage.style.textAlign = "center";
  accessMessage.style.marginTop = "50px";
  accessMessage.style.fontSize = "20px";
  accessMessage.style.color = "#fff";

  const content = document.getElementById("content");
  content.innerHTML = ""; // Clear previous content
  content.appendChild(accessMessage);

  if (!username) {
    accessMessage.innerText = "Access Denied: Username not found.";
    return;
  }

  fetch("/check-subscription", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username })
  })
    .then(response => response.json())
    .then(data => {
      if (data.access === "granted") {
        accessMessage.innerText = "Access Granted ✅";
        setTimeout(() => {
          window.location.href = "features.html";
        }, 1000);
      } else {
        accessMessage.innerText = "🔒 Access Denied: Your trial has expired. Please subscribe to continue.";
      }
    })
    .catch(error => {
      console.error("Error:", error);
      accessMessage.innerText = "Server Error. Try again later.";
    });
});