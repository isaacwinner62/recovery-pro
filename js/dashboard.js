document.addEventListener("DOMContentLoaded", function () {
  // Load user data
  const storedUser = localStorage.getItem("currentUser");
  const storedScamInfo = localStorage.getItem("scamInfo");

  if (storedUser) {
    const userData = JSON.parse(storedUser);
    document.getElementById("userName").textContent =
      userData.fullName.split(" ")[0];
  }

  if (storedScamInfo) {
    const scamInfo = JSON.parse(storedScamInfo);

    // Display scam info
    document.getElementById("amountLostDisplay").textContent =
      "₦" + parseInt(scamInfo.amountLost).toLocaleString();

    // Update scam type display
    const scamTypes = {
      crypto: "Crypto Scam",
      romance: "Romance Scam",
      investment: "Investment Scam",
      job: "Job Offer Scam",
      other: "Other Scam",
    };

    // Simulate random case officer assignment
    const officers = [
      "John Adebayo",
      "Amina Mohammed",
      "Chukwuemeka Okoro",
      "Fatima Ibrahim",
    ];
    const randomOfficer = officers[Math.floor(Math.random() * officers.length)];

    // Update dashboard elements
    document.getElementById("officerDisplay").textContent = randomOfficer;
    document.getElementById("caseManager").textContent = randomOfficer;

    // Set a timeout to simulate status change
    setTimeout(function () {
      document.getElementById("statusDisplay").textContent = "Pending Payment";
    }, 2000);
  }

  // Modal functionality
  const depositBtn = document.getElementById("depositBtn");
  const paymentBtn = document.getElementById("paymentBtn");
  const paymentModal = document.getElementById("paymentModal");
  const closeModal = document.querySelector(".close-modal");
  const submitReceipt = document.getElementById("submitReceipt");

  function openModal() {
    paymentModal.style.display = "block";
  }

  function closeModalFunc() {
    paymentModal.style.display = "none";
  }

  if (depositBtn) depositBtn.addEventListener("click", openModal);
  if (paymentBtn) paymentBtn.addEventListener("click", openModal);
  if (closeModal) closeModal.addEventListener("click", closeModalFunc);

  // Close modal when clicking outside
  window.addEventListener("click", function (e) {
    if (e.target === paymentModal) {
      closeModalFunc();
    }
  });

  // Simulate receipt submission
  if (submitReceipt) {
    submitReceipt.addEventListener("click", function () {
      alert(
        "Receipt submitted successfully! Your case will now proceed to the next stage."
      );
      closeModalFunc();
      document.getElementById("statusDisplay").textContent = "Processing";

      // Simulate further status updates
      setTimeout(function () {
        document.getElementById("statusDisplay").textContent =
          "Under Investigation";
      }, 3000);
    });
  }

  // Logout functionality
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("isLoggedIn");
      window.location.href = "index.html";
    });
  }

  // Simulate WhatsApp link
  const whatsappLinks = document.querySelectorAll(".whatsapp");
  whatsappLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      alert(
        "This would open WhatsApp to contact support in a real application."
      );
    });
  });

  // Simulate email link
  const emailLinks = document.querySelectorAll(".email");
  emailLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      alert(
        "This would open your email client to contact support in a real application."
      );
    });
  });
});
