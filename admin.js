const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

const loginForm = document.getElementById('adminLoginForm');
const dashboard = document.getElementById('adminDashboard');
const msg = document.getElementById('adminMessage');

async function api(path, options = {}) {
  const response = await fetch(`backend/api/${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

async function refreshDashboard() {
  const [students, staff, notices] = await Promise.all([
    api('students.php'), api('staff.php'), api('notices.php')
  ]);
  document.getElementById('totalStudents').textContent = students.length;
  document.getElementById('totalStaff').textContent = staff.length;
  document.getElementById('totalNotices').textContent = notices.length;
}

loginForm?.addEventListener('submit', async e => {
  e.preventDefault();
  if (username.value === ADMIN_USER && password.value === ADMIN_PASS) {
    dashboard.classList.remove('d-none');
    loginForm.classList.add('d-none');
    msg.textContent = '';
    refreshDashboard();
  } else {
    msg.textContent = 'Invalid username or password';
  }
});

document.getElementById('noticeForm')?.addEventListener('submit', async e => {
  e.preventDefault();
  await api('notices.php', { method: 'POST', body: JSON.stringify({
    notice_type: notice_type.value,
    notice_content: notice_content.value
  }) });
  e.target.reset();
  refreshDashboard();
  alert('Notice posted');
});

document.getElementById('meetingForm')?.addEventListener('submit', async e => {
  e.preventDefault();
  await api('meetings.php', { method: 'POST', body: JSON.stringify({
    meeting_date: meeting_date.value,
    meeting_time: meeting_time.value,
    purpose: meeting_purpose.value
  }) });
  e.target.reset();
  alert('Meeting scheduled');
});
