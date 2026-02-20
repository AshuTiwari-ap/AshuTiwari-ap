const DB_KEY = "sdsSchoolDB";
const defaultDB = {
  students: [],
  staff: [],
  notices: [
    { id: crypto.randomUUID(), type: "General Information", text: "Admissions open for session 2026-27.", date: new Date().toLocaleDateString() }
  ],
  meetings: [],
  branding: {}
};

const getDB = () => JSON.parse(localStorage.getItem(DB_KEY) || JSON.stringify(defaultDB));
const setDB = (db) => localStorage.setItem(DB_KEY, JSON.stringify(db));
const saveSection = (section, data) => { const db = getDB(); db[section] = data; setDB(db); };
const byId = (id) => document.getElementById(id);

const toDataUrl = (file) => new Promise((resolve) => {
  if (!file) return resolve("");
  const reader = new FileReader();
  reader.onload = (e) => resolve(e.target.result);
  reader.readAsDataURL(file);
});

function renderStudents() {
  const { students } = getDB();
  const search = byId("studentSearch")?.value.toLowerCase() || "";
  const classSearch = byId("classSearch")?.value.toLowerCase() || "";
  const tbody = byId("studentTableBody");

  const filtered = students.filter((s) =>
    s.fullName.toLowerCase().includes(search) && s.studentClass.toLowerCase().includes(classSearch)
  );

  tbody.innerHTML = filtered.map((s) => `
    <tr>
      <td><img src="${s.photo || 'https://via.placeholder.com/80'}" class="table-avatar" alt="${s.fullName}"/></td>
      <td>${s.fullName}</td>
      <td>${s.studentClass}-${s.section}</td>
      <td>${s.rollNumber}</td>
      <td>${s.mobileNumber}</td>
      <td>
        <button class="btn btn-sm btn-info" onclick="viewStudent('${s.id}')">Profile</button>
        <button class="btn btn-sm btn-warning" onclick="editStudent('${s.id}')">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteStudent('${s.id}')">Delete</button>
      </td>
    </tr>
  `).join("");

  byId("certificateStudent").innerHTML = '<option value="">Select Student</option>' +
    students.map(s => `<option value="${s.id}">${s.fullName} (${s.studentClass}-${s.section})</option>`).join("");

  updateMetrics();
}

function renderStaff() {
  const { staff } = getDB();
  byId("staffTableBody").innerHTML = staff.map((s) => `
    <tr>
      <td><img src="${s.photo || 'https://via.placeholder.com/80'}" class="table-avatar" alt="${s.name}"/></td>
      <td>${s.name}</td>
      <td>${s.designation}</td>
      <td>${s.subject}</td>
      <td>${s.mobile}</td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="editStaff('${s.id}')">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteStaff('${s.id}')">Delete</button>
      </td>
    </tr>
  `).join("");
  updateMetrics();
}

function renderNotices() {
  const { notices } = getDB();
  byId("noticeList").innerHTML = notices.map((n) => `
    <div class="col-md-4">
      <div class="card h-100 border-start border-4 border-primary"><div class="card-body">
        <span class="badge text-bg-primary mb-2">${n.type}</span>
        <p>${n.text}</p>
        <small class="text-muted">${n.date}</small>
      </div></div>
    </div>
  `).join("");
  updateMetrics();
}

function renderMeetings() {
  const { meetings } = getDB();
  byId("meetingTableBody").innerHTML = meetings.map((m) => `<tr><td>${m.date}</td><td>${m.time}</td><td>${m.purpose}</td></tr>`).join("");
  updateMetrics();
}

function applyBranding() {
  const { branding } = getDB();
  if (branding.banner) byId("schoolBanner").src = branding.banner;
  if (branding.principal) byId("principalPhoto").src = branding.principal;
  if (branding.logo) {
    document.querySelectorAll('.navbar-brand').forEach((logoEl) => {
      logoEl.innerHTML = `<img src="${branding.logo}" style="height:32px;width:32px;border-radius:50%;margin-right:8px;object-fit:cover;">S.D.S Convent School`;
    });
  }
}

function updateMetrics() {
  const db = getDB();
  byId("metricStudents").textContent = db.students.length;
  byId("metricStaff").textContent = db.staff.length;
  byId("metricNotices").textContent = db.notices.length;
  byId("metricMeetings").textContent = db.meetings.length;
}

window.viewStudent = (id) => {
  const student = getDB().students.find((s) => s.id === id);
  if (!student) return;
  byId("studentProfileBody").innerHTML = `
    <div class="text-center mb-3"><img src="${student.photo || 'https://via.placeholder.com/120'}" class="table-avatar" style="width:100px;height:100px"></div>
    <p><strong>Name:</strong> ${student.fullName}</p>
    <p><strong>Father:</strong> ${student.fatherName}</p>
    <p><strong>Mother:</strong> ${student.motherName}</p>
    <p><strong>Class/Section:</strong> ${student.studentClass} / ${student.section}</p>
    <p><strong>Roll No:</strong> ${student.rollNumber}</p>
    <p><strong>DOB:</strong> ${student.dob}</p>
    <p><strong>Address:</strong> ${student.studentAddress}</p>
    <p><strong>Mobile:</strong> ${student.mobileNumber}</p>
    <p><strong>Aadhaar:</strong> ${student.aadhaar || 'N/A'}</p>`;
  bootstrap.Modal.getOrCreateInstance(byId("studentProfileModal")).show();
};

window.deleteStudent = (id) => {
  if (!confirm("Delete this student?")) return;
  saveSection("students", getDB().students.filter((s) => s.id !== id));
  renderStudents();
};

window.editStudent = (id) => {
  const s = getDB().students.find((st) => st.id === id);
  if (!s) return;
  byId("studentId").value = s.id;
  ["fullName", "fatherName", "motherName", "studentClass", "section", "rollNumber", "dob", "studentAddress", "mobileNumber", "aadhaar"].forEach((field) => byId(field).value = s[field]);
  bootstrap.Modal.getOrCreateInstance(byId("studentModal")).show();
};

window.deleteStaff = (id) => {
  if (!confirm("Delete this staff member?")) return;
  saveSection("staff", getDB().staff.filter((s) => s.id !== id));
  renderStaff();
};

window.editStaff = (id) => {
  const s = getDB().staff.find((st) => st.id === id);
  if (!s) return;
  byId("staffId").value = s.id;
  byId("staffName").value = s.name;
  byId("designation").value = s.designation;
  byId("subject").value = s.subject;
  byId("staffMobile").value = s.mobile;
  bootstrap.Modal.getOrCreateInstance(byId("staffModal")).show();
};

byId("studentForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const db = getDB();
  const id = byId("studentId").value || crypto.randomUUID();
  const current = db.students.find((s) => s.id === id);
  const photo = byId("studentPhoto").files[0] ? await toDataUrl(byId("studentPhoto").files[0]) : (current?.photo || "");
  const student = { id, photo, fullName: byId("fullName").value, fatherName: byId("fatherName").value, motherName: byId("motherName").value, studentClass: byId("studentClass").value, section: byId("section").value, rollNumber: byId("rollNumber").value, dob: byId("dob").value, studentAddress: byId("studentAddress").value, mobileNumber: byId("mobileNumber").value, aadhaar: byId("aadhaar").value };
  db.students = db.students.some((s) => s.id === id) ? db.students.map((s) => s.id === id ? student : s) : [...db.students, student];
  setDB(db);
  e.target.reset(); byId("studentId").value = "";
  bootstrap.Modal.getOrCreateInstance(byId("studentModal")).hide();
  renderStudents();
});

byId("staffForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const db = getDB();
  const id = byId("staffId").value || crypto.randomUUID();
  const current = db.staff.find((s) => s.id === id);
  const photo = byId("staffPhoto").files[0] ? await toDataUrl(byId("staffPhoto").files[0]) : (current?.photo || "");
  const staff = { id, photo, name: byId("staffName").value, designation: byId("designation").value, subject: byId("subject").value, mobile: byId("staffMobile").value };
  db.staff = db.staff.some((s) => s.id === id) ? db.staff.map((s) => s.id === id ? staff : s) : [...db.staff, staff];
  setDB(db);
  e.target.reset(); byId("staffId").value = "";
  bootstrap.Modal.getOrCreateInstance(byId("staffModal")).hide();
  renderStaff();
});

byId("noticeForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const db = getDB();
  db.notices.unshift({ id: crypto.randomUUID(), type: byId("noticeType").value, text: byId("noticeText").value, date: new Date().toLocaleDateString() });
  setDB(db);
  e.target.reset();
  renderNotices();
});

byId("meetingForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const db = getDB();
  db.meetings.push({ id: crypto.randomUUID(), date: byId("meetingDate").value, time: byId("meetingTime").value, purpose: byId("meetingPurpose").value });
  setDB(db);
  e.target.reset();
  renderMeetings();
});

byId("brandingForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const db = getDB();
  const logo = byId("logoInput").files[0] ? await toDataUrl(byId("logoInput").files[0]) : db.branding.logo;
  const banner = byId("bannerInput").files[0] ? await toDataUrl(byId("bannerInput").files[0]) : db.branding.banner;
  const principal = byId("principalInput").files[0] ? await toDataUrl(byId("principalInput").files[0]) : db.branding.principal;
  db.branding = { logo, banner, principal };
  setDB(db);
  applyBranding();
  alert("Branding updated.");
});

byId("adminLoginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = byId("adminUsername").value.trim();
  const password = byId("adminPassword").value.trim();
  if (username === "admin" && password === "sds123") {
    byId("loginMessage").textContent = "";
    bootstrap.Modal.getOrCreateInstance(byId("loginModal")).hide();
    bootstrap.Modal.getOrCreateInstance(byId("adminModal")).show();
  } else {
    byId("loginMessage").textContent = "Invalid credentials. Use admin / sds123";
  }
});

byId("certificateForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const { jsPDF } = window.jspdf;
  const db = getDB();
  const student = db.students.find((s) => s.id === byId("certificateStudent").value);
  if (!student) return alert("Select a student.");
  const type = byId("certificateType").value;

  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("S.D.S Convent School", 105, 20, { align: "center" });
  doc.setFontSize(12);
  doc.text("Gopalpur, Kanpur Nagar, Uttar Pradesh", 105, 28, { align: "center" });
  doc.line(20, 32, 190, 32);
  doc.setFontSize(16);
  doc.text(type, 105, 45, { align: "center" });
  doc.setFontSize(12);
  doc.text(`This is to certify that ${student.fullName}, child of ${student.fatherName},`, 20, 60);
  doc.text(`is a bonafide student of Class ${student.studentClass}-${student.section}, Roll No. ${student.rollNumber}.`, 20, 70);
  doc.text(`DOB: ${student.dob}   Address: ${student.studentAddress}`, 20, 80);
  doc.text("Principal Signature", 145, 140);
  doc.text("Miss Jyoti Diwedi", 145, 146);
  doc.rect(140, 110, 45, 28);
  doc.save(`${type.replace(/\s+/g, "_")}_${student.fullName}.pdf`);
});

byId("studentSearch").addEventListener("input", renderStudents);
byId("classSearch").addEventListener("input", renderStudents);

byId("exportBackup").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(getDB(), null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `sds-backup-${Date.now()}.json`;
  a.click();
});

byId("importBackup").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const text = await file.text();
  try {
    const parsed = JSON.parse(text);
    setDB(parsed);
    init();
    alert("Backup restored.");
  } catch {
    alert("Invalid backup file.");
  }
});

byId("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thank you! We will contact you soon.");
  e.target.reset();
});

function init() {
  if (!localStorage.getItem(DB_KEY)) setDB(defaultDB);
  renderStudents();
  renderStaff();
  renderNotices();
  renderMeetings();
  applyBranding();
  updateMetrics();
}

init();
