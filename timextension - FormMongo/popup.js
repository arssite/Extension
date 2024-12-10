document.addEventListener("DOMContentLoaded", async () => {
  const formContainer = document.getElementById("form-container");
  const timeContainer = document.getElementById("time-container");

  // Check if user data exists
  chrome.storage.sync.get("userDetails", (result) => {
    if (!result.userDetails) {
      formContainer.style.display = "block";
    } else {
      timeContainer.style.display = "block";
      updateTime();
    }
  });

  const form = document.getElementById("user-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    // Save user details locally
    chrome.storage.sync.set({ userDetails: { email, phone } }, () => {
      console.log("User details saved locally.");

      // Send data to backend
      fetch("http://127.0.0.1:5000/save_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, phone }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
        })
        .catch((error) => console.error("Error:", error));

      // Hide form and show time
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
