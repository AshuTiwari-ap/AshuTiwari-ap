const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;

const showSlide = (index) => {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
  currentSlide = index;
};

if (slider && slides.length > 0) {
  setInterval(() => {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }, 4500);

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));
  });
}

const getApplications = () => {
  const stored = localStorage.getItem("applications");
  return stored ? JSON.parse(stored) : [];
};

const saveApplications = (apps) => {
  localStorage.setItem("applications", JSON.stringify(apps));
};

const applyForm = document.querySelector("#applyForm");
const applySuccess = document.querySelector("#applySuccess");
const applicationIdField = document.querySelector("#applicationId");

if (applyForm) {
  applyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(applyForm);
    const newApplication = {
      id: `APP${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 90 + 10)}`,
      name: formData.get("name"),
      mobile: formData.get("mobile"),
      service: formData.get("service"),
      address: formData.get("address"),
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    const applications = getApplications();
    applications.unshift(newApplication);
    saveApplications(applications);

    if (applicationIdField && applySuccess) {
      applicationIdField.textContent = newApplication.id;
      applySuccess.hidden = false;
    }

    applyForm.reset();
  });
}

const statusForm = document.querySelector("#statusForm");
const statusResult = document.querySelector("#statusResult");
const statusMessage = document.querySelector("#statusMessage");

if (statusForm) {
  statusForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const statusId = document.querySelector("#statusId").value.trim();
    const applications = getApplications();
    const found = applications.find((app) => app.id === statusId);

    if (statusResult && statusMessage) {
      statusResult.hidden = false;
      if (found) {
        statusMessage.textContent = `${found.name} ki application status: ${found.status}`;
      } else {
        statusMessage.textContent = "Application ID nahi mila. Please sahi ID enter karein.";
      }
    }
  });
}

const adminSession = localStorage.getItem("adminSession");
const adminPanel = document.querySelector("#adminPanel");
const adminLoginCard = document.querySelector("#adminLoginCard");

if (adminSession === "active" && adminPanel && adminLoginCard) {
  adminPanel.hidden = false;
  adminLoginCard.hidden = true;
}
