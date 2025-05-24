document.addEventListener("DOMContentLoaded", () => {
  const hasAccess = localStorage.getItem("subscriptionActive") === "true";
  const serviceList = document.getElementById("service-list");
  const denied = document.getElementById("access-denied");

  if (hasAccess) {
    serviceList.style.display = "block";
  } else {
    denied.style.display = "block";
  }
});
