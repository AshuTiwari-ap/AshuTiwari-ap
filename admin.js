const DB_KEY = 'sdsPortalDB';
const el = (id) => document.getElementById(id);

const seed = { students: [], staff: [], notices: [{ id: crypto.randomUUID(), type: 'General Information', text: 'सत्र 2026-27 प्रवेश प्रारम्भ', date: new Date().toLocaleDateString() }], meetings: [], media: [], branding: {} };
if (!localStorage.getItem(DB_KEY)) localStorage.setItem(DB_KEY, JSON.stringify(seed));

const getDB = () => JSON.parse(localStorage.getItem(DB_KEY));
const setDB = (data) => localStorage.setItem(DB_KEY, JSON.stringify(data));
const toData = (file) => new Promise((resolve) => { if (!file) resolve(''); const fr = new FileReader(); fr.onload = (e) => resolve(e.target.result); fr.readAsDataURL(file); });

function verifyOtp(label) {
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  alert(`OTP (${label}): ${otp}`);
  const entered = prompt('Enter OTP / OTP दर्ज करें');
  if (entered !== otp) { alert('Invalid OTP / गलत OTP'); return false; }
  return true;
}

function metrics() {
  const d = getDB();
  el('metricStudents').textContent = d.students.length;
  el('metricStaff').textContent = d.staff.length;
  el('metricNotices').textContent = d.notices.length;
  el('metricMeetings').textContent = d.meetings.length;
  el('metricMedia').textContent = d.media.length;
}

function renderStudents() {
  const d = getDB();
  el('studentTableBody').innerHTML = d.students.map((s) => `<tr><td>${s.fullName}</td><td>${s.studentClass}-${s.section}</td><td>${s.mobileNumber}</td><td><button class='btn btn-sm btn-warning' onclick="editStudent('${s.id}')">Edit</button> <button class='btn btn-sm btn-danger' onclick="delStudent('${s.id}')">Del</button></td></tr>`).join('');
  metrics();
}

function renderStaff() {
  const d = getDB();
  el('staffTableBody').innerHTML = d.staff.map((s) => `<tr><td>${s.name}</td><td>${s.designation}</td><td>${s.subject}</td><td><button class='btn btn-sm btn-warning' onclick="editStaff('${s.id}')">Edit</button> <button class='btn btn-sm btn-danger' onclick="delStaff('${s.id}')">Del</button></td></tr>`).join('');
  metrics();
}

function renderMediaAdmin() {
  const d = getDB();
  el('mediaAdminList').innerHTML = d.media.length
    ? d.media.map((m) => `<div class="d-flex justify-content-between border-bottom py-1"><span>${m.title} • ${m.eventCategory || 'Annual Function'} (${m.type})</span><button class="btn btn-sm btn-outline-danger" onclick="delMedia('${m.id}')">Delete</button></div>`).join('')
    : '<div class="text-muted">No media uploaded yet.</div>';
  metrics();
}

window.delStudent = (id) => { const d = getDB(); d.students = d.students.filter((x) => x.id !== id); setDB(d); renderStudents(); };
window.delStaff = (id) => { const d = getDB(); d.staff = d.staff.filter((x) => x.id !== id); setDB(d); renderStaff(); };
window.delMedia = (id) => { const d = getDB(); d.media = d.media.filter((x) => x.id !== id); setDB(d); renderMediaAdmin(); };
window.editStudent = (id) => { const s = getDB().students.find((x) => x.id === id); if (!s) return; el('studentId').value = s.id; ['fullName', 'fatherName', 'motherName', 'studentClass', 'section', 'rollNumber', 'dob', 'studentAddress', 'mobileNumber', 'aadhaar'].forEach((k) => { el(k).value = s[k] || ''; }); };
window.editStaff = (id) => { const s = getDB().staff.find((x) => x.id === id); if (!s) return; el('staffId').value = s.id; el('staffName').value = s.name; el('designation').value = s.designation; el('subject').value = s.subject; el('staffMobile').value = s.mobile; };

function showPanel() { el('loginCard').hidden = true; el('adminPanel').hidden = false; renderStudents(); renderStaff(); renderMediaAdmin(); }

el('adminLoginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  if (el('adminUsername').value === 'admin' && el('adminPassword').value === 'sds123') { sessionStorage.setItem('sdsAdmin', '1'); showPanel(); }
  else el('loginMessage').textContent = 'Wrong credentials / गलत जानकारी';
});
if (sessionStorage.getItem('sdsAdmin') === '1') showPanel();
el('logoutBtn').addEventListener('click', () => { sessionStorage.removeItem('sdsAdmin'); location.reload(); });

el('studentForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const isNew = !el('studentId').value;
  if (isNew && !verifyOtp('Student Add')) return;
  const d = getDB();
  const id = el('studentId').value || crypto.randomUUID();
  const old = d.students.find((x) => x.id === id);
  const photo = el('studentPhoto').files[0] ? await toData(el('studentPhoto').files[0]) : (old?.photo || '');
  const student = { id, photo, fullName: el('fullName').value, fatherName: el('fatherName').value, motherName: el('motherName').value, studentClass: el('studentClass').value, section: el('section').value, rollNumber: el('rollNumber').value, dob: el('dob').value, studentAddress: el('studentAddress').value, mobileNumber: el('mobileNumber').value, aadhaar: el('aadhaar').value };
  d.students = d.students.some((x) => x.id === id) ? d.students.map((x) => (x.id === id ? student : x)) : [...d.students, student];
  setDB(d); e.target.reset(); el('studentId').value = ''; renderStudents();
});

el('staffForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const isNew = !el('staffId').value;
  if (isNew && !verifyOtp('Staff Add')) return;
  const d = getDB();
  const id = el('staffId').value || crypto.randomUUID();
  const old = d.staff.find((x) => x.id === id);
  const photo = el('staffPhoto').files[0] ? await toData(el('staffPhoto').files[0]) : (old?.photo || '');
  const staff = { id, photo, name: el('staffName').value, designation: el('designation').value, subject: el('subject').value, mobile: el('staffMobile').value };
  d.staff = d.staff.some((x) => x.id === id) ? d.staff.map((x) => (x.id === id ? staff : x)) : [...d.staff, staff];
  setDB(d); e.target.reset(); el('staffId').value = ''; renderStaff();
});

el('noticeForm').addEventListener('submit', (e) => { e.preventDefault(); const d = getDB(); d.notices.unshift({ id: crypto.randomUUID(), type: el('noticeType').value, text: el('noticeText').value, date: new Date().toLocaleDateString() }); setDB(d); e.target.reset(); metrics(); alert('Notice added'); });
el('meetingForm').addEventListener('submit', (e) => { e.preventDefault(); const d = getDB(); d.meetings.push({ id: crypto.randomUUID(), date: el('meetingDate').value, time: el('meetingTime').value, purpose: el('meetingPurpose').value }); setDB(d); e.target.reset(); metrics(); alert('Meeting added'); });

el('brandingForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const d = getDB();
  d.branding = { logo: el('logoInput').files[0] ? await toData(el('logoInput').files[0]) : d.branding.logo, banner: el('bannerInput').files[0] ? await toData(el('bannerInput').files[0]) : d.branding.banner, principal: el('principalInput').files[0] ? await toData(el('principalInput').files[0]) : d.branding.principal };
  setDB(d); alert('Branding saved');
});

el('mediaForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const file = el('mediaFile').files[0];
  const category = el('eventCategory').value;
  const type = el('mediaType').value;
  const title = el('mediaTitle').value.trim();
  if (!file || !category || !type || !title) {
    alert('Please fill all media fields');
    return;
  }
  if (type === 'photo' && !file.type.startsWith('image/')) {
    alert('Please upload image for Photo type');
    return;
  }
  if (type === 'video' && !file.type.startsWith('video/')) {
    alert('Please upload video for Video type');
    return;
  }
  const d = getDB();
  d.media.unshift({ id: crypto.randomUUID(), eventCategory: category, type, title, file: await toData(file) });
  setDB(d);
  e.target.reset();
  renderMediaAdmin();
  alert('Media uploaded successfully');
});

el('exportBackup').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(getDB(), null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = 'sds-backup.json'; a.click(); URL.revokeObjectURL(a.href);
});

el('importBackup').addEventListener('change', async (e) => {
  const file = e.target.files[0]; if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    if (!data.media) data.media = [];
    setDB(data);
    renderStudents(); renderStaff(); renderMediaAdmin();
    alert('Backup imported');
  } catch {
    alert('Invalid backup file');
  }
});
