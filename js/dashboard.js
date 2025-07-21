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

  // BTC Wallet Copy Functionality
  const btcWalletDisplay = document.getElementById("btcWalletDisplay");
  const copyWalletBtn = document.getElementById("copyWalletBtn");
  const copyWalletImg = document.getElementById("copyWalletImg");
  const toast = document.getElementById("toast");

  function copyWalletToClipboard(e) {
    if (e) e.stopPropagation();
    if (!btcWalletDisplay) {
      console.log("btcWalletDisplay not found");
      return;
    }
    if (!toast) {
      console.log("toast not found");
      return;
    }
    const wallet = btcWalletDisplay.textContent;
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(wallet).then(
        function () {
          toast.textContent = "Wallet address copied!";
          toast.style.display = "block";
          setTimeout(() => {
            toast.style.display = "none";
          }, 2000);
        },
        function (err) {
          console.log("Clipboard error", err);
        }
      );
    } else {
      // fallback for insecure context or older browsers
      const textarea = document.createElement("textarea");
      textarea.value = wallet;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        toast.textContent = "Wallet address copied!";
        toast.style.display = "block";
        setTimeout(() => {
          toast.style.display = "none";
        }, 2000);
      } catch (err) {
        console.log("Fallback copy failed", err);
      }
      document.body.removeChild(textarea);
    }
  }

  if (btcWalletDisplay && copyWalletBtn && toast) {
    copyWalletBtn.addEventListener("click", copyWalletToClipboard);
    console.log("copyWalletBtn event attached");
  } else {
    console.log("copyWalletBtn or btcWalletDisplay or toast missing");
  }
  if (copyWalletImg) {
    copyWalletImg.addEventListener("click", copyWalletToClipboard);
    console.log("copyWalletImg event attached");
  } else {
    console.log("copyWalletImg missing");
  }
});
