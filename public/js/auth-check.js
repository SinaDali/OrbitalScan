document.addEventListener("DOMContentLoaded", () => {
  const username = window.Telegram.WebApp.initDataUnsafe.user?.username;

  const accessBox = document.createElement("div");
  accessBox.id = "accessBox";
  accessBox.style.textAlign = "center";
  accessBox.style.marginTop = "60px";
  accessBox.style.padding = "15px";
  accessBox.style.border = "2px solid red";
  accessBox.style.borderRadius = "12px";
  accessBox.style.color = "#ff6666";
  accessBox.style.background = "rgba(255,0,0,0.1)";
  accessBox.style.width = "80%";
  accessBox.style.marginLeft = "auto";
  accessBox.style.marginRight = "auto";

  const content = document.getElementById("content");
  content.innerHTML = "";
  content.appendChild(accessBox);

  if (!username) {
    accessBox.innerText = "Access Denied: No Telegram username detected.";
    return;
  }

  fetch("/check-subscription", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username })
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.access === "granted") {
        accessBox.innerText = "Access Granted ✅ Redirecting...";
        setTimeout(() => {
          window.location.href = "features.html";
        }, 1000);
      } else {
        accessBox.innerText = "Access Denied: Please subscribe to access this section.";
      }
    })
    .catch((err) => {
      console.error(err);
      accessBox.innerText = "Server Error: Please try again later.";
    });
});