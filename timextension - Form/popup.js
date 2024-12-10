document.addEventListener("DOMContentLoaded", async () => {
  console.log("Popup script loaded.");

  const formContainer = document.getElementById("form-container");
  const timeContainer = document.getElementById("time-container");

  // Check if user data exists
  chrome.storage.sync.get("userDetails", (result) => {
    if (!result.userDetails) {
      console.log("First-time user detected.");
      formContainer.style.display = "block";
    } else {
      console.log("Returning user detected.");
      timeContainer.style.display = "block";
      updateTime();
    }
  });

  const form = document.getElementById("user-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    // Save user details
    chrome.storage.sync.set({ userDetails: { email, phone } }, () => {
      console.log("User details saved.");
      formContainer.style.display = "none";
      timeContainer.style.display = "block";
      updateTime();
    });
  });

  function updateTime() {
    const timeElement = document.getElementById("current-time");
    const now = new Date();
    timeElement.textContent = now.toLocaleTimeString();

    setInterval(() => {
      const now = new Date();
      timeElement.textContent = now.toLocaleTimeString();
    }, 1000);
  }
});
