const apiBase = 'backend/api';

const studentForm = document.getElementById('studentForm');
const staffForm = document.getElementById('staffForm');
const contactForm = document.getElementById('contactForm');
const searchInput = document.getElementById('studentSearch');
const studentTableBody = document.getElementById('studentTableBody');
const studentProfile = document.getElementById('studentProfile');
const staffGrid = document.getElementById('staffGrid');
const noticeList = document.getElementById('noticeList');
const meetingBody = document.getElementById('meetingBody');
const certificateStudent = document.getElementById('certificateStudent');

const el = (id) => document.getElementById(id);
let allStudents = [];

const fallbackStudents = [
  {
    id: 1,
    student_photo: '',
    full_name: 'Demo Student',
    father_name: 'Mr. Kumar',
    mother_name: 'Mrs. Kumar',
    class_name: '8',
    section: 'A',
    roll_number: '12',
    dob: '2012-06-10',
    address: 'Gopalpur, Kanpur Nagar',
    mobile: '9000000000',
    aadhaar: ''
  }
];

function showError(message) {
  const existing = document.getElementById('runtimeAlert');
  if (existing) return;
  const box = document.createElement('div');
  box.id = 'runtimeAlert';
  box.className = 'alert alert-warning text-center m-0 rounded-0';
  box.innerHTML = `<strong>Notice:</strong> ${message}`;
  document.body.prepend(box);
}

async function api(path, options = {}) {
  const response = await fetch(`${apiBase}/${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  if (!response.ok) throw new Error(`${path}: ${response.status}`);
  return response.json();
}

function renderStudentOptions(students) {
  if (!certificateStudent) return;
  certificateStudent.innerHTML = students
    .map((s) => `<option value="${s.id}">${s.full_name} - ${s.class_name}-${s.section}</option>`)
    .join('');
}

function studentRow(s) {
  return `<tr>
    <td><img src="${s.student_photo || 'https://via.placeholder.com/50'}" width="50" height="50" class="rounded-circle object-fit-cover" alt="${s.full_name}"></td>
    <td>${s.full_name}</td>
    <td>${s.class_name}-${s.section}</td>
    <td>${s.roll_number}</td>
    <td>${s.mobile}</td>
    <td>
      <button class="btn btn-sm btn-info me-1 action-profile" data-id="${s.id}">Profile</button>
      <button class="btn btn-sm btn-warning me-1 action-edit" data-id="${s.id}">Edit</button>
      <button class="btn btn-sm btn-danger action-delete" data-id="${s.id}">Delete</button>
    </td>
  </tr>`;
}

function renderStudents(list) {
  if (!studentTableBody) return;
  studentTableBody.innerHTML = list.map(studentRow).join('');
}

function fillStudentForm(s = {}) {
  const fields = ['studentId','full_name','father_name','mother_name','class_name','section','roll_number','dob','address','mobile','aadhaar','student_photo'];
  fields.forEach((key) => {
    const node = el(key);
    if (node) node.value = s[key] || '';
  });
}

function showProfile(s) {
  if (!studentProfile) return;
  studentProfile.classList.remove('d-none');
  studentProfile.innerHTML = `<strong>${s.full_name}</strong><br>Father: ${s.father_name} | Mother: ${s.mother_name}<br>DOB: ${s.dob} | Address: ${s.address}<br>Aadhaar: ${s.aadhaar || '-'} `;
}

async function loadStudents() {
  try {
    const data = await api('students.php');
    allStudents = data;
  } catch {
    allStudents = fallbackStudents;
    showError('Backend/database connect nahi hua. Abhi demo data show ho raha hai.');
  }
  renderStudents(allStudents);
  renderStudentOptions(allStudents);
}

async function deleteStudent(id) {
  try {
    await api('students.php', { method: 'DELETE', body: JSON.stringify({ id }) });
    await loadStudents();
  } catch {
    allStudents = allStudents.filter((s) => String(s.id) !== String(id));
    renderStudents(allStudents);
  }
}

studentTableBody?.addEventListener('click', (event) => {
  const btn = event.target.closest('button');
  if (!btn) return;
  const id = btn.dataset.id;
  const student = allStudents.find((s) => String(s.id) === String(id));
  if (!student) return;

  if (btn.classList.contains('action-profile')) showProfile(student);
  if (btn.classList.contains('action-edit')) fillStudentForm({ ...student, studentId: student.id });
  if (btn.classList.contains('action-delete')) deleteStudent(id);
});

studentForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    id: el('studentId').value || null,
    full_name: el('full_name').value,
    father_name: el('father_name').value,
    mother_name: el('mother_name').value,
    class_name: el('class_name').value,
    section: el('section').value,
    roll_number: el('roll_number').value,
    dob: el('dob').value,
    address: el('address').value,
    mobile: el('mobile').value,
    aadhaar: el('aadhaar').value,
    student_photo: el('student_photo').value
  };

  try {
    await api('students.php', { method: payload.id ? 'PUT' : 'POST', body: JSON.stringify(payload) });
    await loadStudents();
  } catch {
    if (!payload.id) payload.id = Date.now();
    const idx = allStudents.findIndex((s) => String(s.id) === String(payload.id));
    if (idx >= 0) allStudents[idx] = payload;
    else allStudents.unshift(payload);
    renderStudents(allStudents);
    renderStudentOptions(allStudents);
  }

  studentForm.reset();
  el('studentId').value = '';
});

el('resetStudentForm')?.addEventListener('click', () => {
  studentForm?.reset();
  el('studentId').value = '';
});

searchInput?.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  const filtered = allStudents.filter((s) => s.full_name.toLowerCase().includes(q) || String(s.class_name).toLowerCase().includes(q));
  renderStudents(filtered);
});

staffForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    id: el('staffId').value || null,
    name: el('staff_name').value,
    designation: el('designation').value,
    subject: el('subject').value,
    mobile: el('staff_mobile').value,
    photo: el('staff_photo').value
  };
  try {
    await api('staff.php', { method: payload.id ? 'PUT' : 'POST', body: JSON.stringify(payload) });
    await loadStaff();
  } catch {
    showError('Staff save backend par fail hua.');
  }
  staffForm.reset();
});

async function loadStaff() {
  try {
    const staff = await api('staff.php');
    staffGrid.innerHTML = staff.map((t) => `
      <div class="col-md-4 mb-3">
        <div class="card shadow-sm h-100">
          <img src="${t.photo || 'https://via.placeholder.com/400x200'}" class="card-img-top" alt="${t.name}">
          <div class="card-body">
            <h5>${t.name}</h5>
            <p class="mb-1">${t.designation}</p>
            <p class="mb-1">Subject: ${t.subject}</p>
            <p class="mb-0">Mobile: ${t.mobile}</p>
          </div>
        </div>
      </div>`).join('');
  } catch {
    staffGrid.innerHTML = '<div class="col-12 text-muted">No staff data yet.</div>';
  }
}

async function loadNotices() {
  try {
    const notices = await api('notices.php');
    noticeList.innerHTML = notices.map((n) => `<div class="list-group-item"><span class="badge bg-primary me-2">${n.notice_type}</span>${n.notice_content}<small class="d-block text-muted">${n.created_at}</small></div>`).join('');
  } catch {
    noticeList.innerHTML = '<div class="list-group-item">No notices available.</div>';
  }
}

async function loadMeetings() {
  try {
    const meetings = await api('meetings.php');
    meetingBody.innerHTML = meetings.map((m) => `<tr><td>${m.meeting_date}</td><td>${m.meeting_time}</td><td>${m.purpose}</td></tr>`).join('');
  } catch {
    meetingBody.innerHTML = '<tr><td colspan="3" class="text-muted">No meeting scheduled.</td></tr>';
  }
}

contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    name: el('contact_name').value,
    email: el('contact_email').value,
    phone: el('contact_phone').value,
    message: el('contact_message').value
  };
  try {
    await api('contact.php', { method: 'POST', body: JSON.stringify(payload) });
    alert('Message submitted successfully');
    contactForm.reset();
  } catch {
    alert('Message save nahi hua. Backend check karein.');
  }
});

el('downloadCertificate')?.addEventListener('click', () => {
  const selectedId = certificateStudent?.value;
  const student = allStudents.find((s) => String(s.id) === String(selectedId));
  if (!student || !window.jspdf) return;

  const type = el('certificateType').value;
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('S.D.S CONVENT SCHOOL', 105, 20, { align: 'center' });
  doc.setFontSize(11);
  doc.text('Gopalpur, Kanpur Nagar, Uttar Pradesh', 105, 27, { align: 'center' });
  doc.line(15, 32, 195, 32);
  doc.setFontSize(16);
  doc.text(type.toUpperCase(), 105, 42, { align: 'center' });
  doc.setFontSize(12);
  doc.text(`This is to certify that ${student.full_name}, child of ${student.father_name},`, 20, 58);
  doc.text(`student of class ${student.class_name}-${student.section}, roll no. ${student.roll_number},`, 20, 66);
  doc.text('is/was a bonafide student of this school.', 20, 74);
  doc.text(`Date of Birth: ${student.dob}`, 20, 86);
  doc.text(`Address: ${student.address}`, 20, 94);
  doc.text('School Logo Area', 20, 120);
  doc.text('Principal Signature', 145, 120);
  doc.save(`${type}-${student.full_name}.pdf`);
});

(async function init() {
  await Promise.all([loadStudents(), loadStaff(), loadNotices(), loadMeetings()]);
})();
