function updateTime() {
    const timeElement = document.getElementById('current-time');
    const now = new Date();
    const formattedTime = now.toLocaleTimeString();
    timeElement.textContent = formattedTime;
  }
  
  // Update time every second
  setInterval(updateTime, 1000);
  updateTime();
  