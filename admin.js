const loginForm = document.querySelector("#adminLoginForm");
const loginHint = document.querySelector("#loginHint");
const adminPanel = document.querySelector("#adminPanel");
const adminLoginCard = document.querySelector("#adminLoginCard");
const applicationsTable = document.querySelector("#applicationsTable");
const totalApplications = document.querySelector("#totalApplications");
const newApplications = document.querySelector("#newApplications");
const logoutBtn = document.querySelector("#logoutBtn");
const changePasswordForm = document.querySelector("#changePasswordForm");

const getApplications = () => {
  const stored = localStorage.getItem("applications");
  return stored ? JSON.parse(stored) : [];
};

const saveApplications = (apps) => {
  localStorage.setItem("applications", JSON.stringify(apps));
};

const getAdminPassword = () => localStorage.getItem("adminPassword") || "admin123";
const setAdminPassword = (password) => localStorage.setItem("adminPassword", password);

const getLoginAttempts = () => Number(localStorage.getItem("adminAttempts") || 0);
const setLoginAttempts = (value) => localStorage.setItem("adminAttempts", value);
const getLockUntil = () => Number(localStorage.getItem("adminLockUntil") || 0);
const setLockUntil = (value) => localStorage.setItem("adminLockUntil", value);

const renderApplications = () => {
  if (!applicationsTable) return;
  const apps = getApplications();
  applicationsTable.innerHTML = apps
    .map(
      (app) => `
      <tr>
        <td>${app.id}</td>
        <td>${app.name}</td>
        <td>${app.service}</td>
        <td>${app.mobile}</td>
        <td>
          <select data-id="${app.id}" class="status-select">
            ${["Pending", "Approved", "Rejected", "Completed"]
              .map(
                (status) =>
                  `<option value="${status}" ${status === app.status ? "selected" : ""}>${status}</option>`
              )
              .join("")}
          </select>
        </td>
        <td>
          <button class="btn ghost delete-btn" data-id="${app.id}">Delete</button>
        </td>
      </tr>
    `
    )
    .join("");

  if (totalApplications) totalApplications.textContent = apps.length;
  if (newApplications) {
    const fresh = apps.filter((app) => app.status === "Pending").length;
    newApplications.textContent = fresh;
  }
};

const setupAdminEvents = () => {
  if (!applicationsTable) return;

  applicationsTable.addEventListener("change", (event) => {
    const target = event.target;
    if (target.classList.contains("status-select")) {
      const apps = getApplications();
      const updated = apps.map((app) =>
        app.id === target.dataset.id ? { ...app, status: target.value } : app
      );
      saveApplications(updated);
      renderApplications();
    }
  });

  applicationsTable.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("delete-btn")) {
      const confirmPassword = prompt("Delete confirm karne ke liye admin password enter karein:");
      if (confirmPassword === getAdminPassword()) {
        const apps = getApplications();
        const filtered = apps.filter((app) => app.id !== target.dataset.id);
        saveApplications(filtered);
        renderApplications();
      } else if (confirmPassword) {
        alert("Wrong password. Delete cancel.");
      }
    }
  });
};

const showAdminPanel = () => {
  if (adminPanel && adminLoginCard) {
    adminPanel.hidden = false;
    adminLoginCard.hidden = true;
  }
  renderApplications();
  setupAdminEvents();
};

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const now = Date.now();
    const lockUntil = getLockUntil();

    if (lockUntil && now < lockUntil) {
      const remaining = Math.ceil((lockUntil - now) / 60000);
      if (loginHint) {
        loginHint.textContent = `Account locked. ${remaining} min baad try karein.`;
      }
      return;
    }

    const password = document.querySelector("#adminPassword").value;
    if (password === getAdminPassword()) {
      localStorage.setItem("adminSession", "active");
      setLoginAttempts(0);
      setLockUntil(0);
      if (loginHint) loginHint.textContent = "";
      showAdminPanel();
    } else {
      const attempts = getLoginAttempts() + 1;
      setLoginAttempts(attempts);
      if (attempts >= 3) {
        setLockUntil(Date.now() + 10 * 60 * 1000);
        if (loginHint) loginHint.textContent = "3 wrong attempts. 10 minutes lock.";
      } else if (loginHint) {
        loginHint.textContent = `Wrong password. Attempts left: ${3 - attempts}`;
      }
    }
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("adminSession");
    if (adminPanel && adminLoginCard) {
      adminPanel.hidden = true;
      adminLoginCard.hidden = false;
    }
  });
}

if (changePasswordForm) {
  changePasswordForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const currentPassword = document.querySelector("#currentPassword").value;
    const newPassword = document.querySelector("#newPassword").value;
    if (currentPassword === getAdminPassword()) {
      setAdminPassword(newPassword);
      alert("Password updated successfully.");
      changePasswordForm.reset();
    } else {
      alert("Current password incorrect.");
    }
  });
}

if (adminPanel && !adminPanel.hidden) {
  renderApplications();
  setupAdminEvents();
}
