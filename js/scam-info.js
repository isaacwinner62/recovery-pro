document.addEventListener("DOMContentLoaded", function () {
  const scamInfoForm = document.getElementById("scamInfoForm");

  // Load user data if available
  const storedUser = localStorage.getItem("currentUser");
  if (storedUser) {
    const userData = JSON.parse(storedUser);
    document.getElementById("userName").textContent =
      userData.fullName.split(" ")[0];
  }

  scamInfoForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Reset errors
    document.querySelectorAll(".error-message").forEach((el) => {
      el.style.display = "none";
      el.textContent = "";
    });

    // Get form values
    const amountLost = document.getElementById("amountLost").value;
    const scamType = document.getElementById("scamType").value;
    const scamDate = document.getElementById("scamDate").value;
    const scamDescription = document.getElementById("scamDescription").value;

    let isValid = true;

    // Validate amount
    if (!amountLost || isNaN(amountLost) || parseFloat(amountLost) <= 0) {
      document.getElementById("amountError").textContent =
        "Please enter a valid amount";
      document.getElementById("amountError").style.display = "block";
      isValid = false;
    }

    // Validate scam type
    if (!scamType) {
      document.getElementById("scamType").style.borderColor = "var(--error)";
      isValid = false;
    } else {
      document.getElementById("scamType").style.borderColor = "";
    }

    // Validate date
    if (!scamDate) {
      document.getElementById("dateError").textContent = "Please select a date";
      document.getElementById("dateError").style.display = "block";
      isValid = false;
    }

    // If valid, proceed
    if (isValid) {
      // Save scam info to localStorage
      const scamInfo = {
        amountLost,
        scamType,
        scamDate,
        scamDescription,
      };

      localStorage.setItem("scamInfo", JSON.stringify(scamInfo));

      // Redirect to dashboard
      window.location.href = "dashboard.html";
    }
  });
});
