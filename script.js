const DB_KEY = 'sdsPortalDB';

function getDB() {
  const raw = localStorage.getItem(DB_KEY);
  if (raw) return JSON.parse(raw);
  const seed = {
    students: [],
    staff: [],
    notices: [{ id: crypto.randomUUID(), type: 'General Information', text: 'सत्र 2026-27 प्रवेश प्रारम्भ', date: new Date().toLocaleDateString() }],
    meetings: [],
    media: [],
    branding: {}
  };
  localStorage.setItem(DB_KEY, JSON.stringify(seed));
  return seed;
}

function renderPublic() {
  const d = getDB();
  const studentCount = document.getElementById('studentCount');
  const staffCount = document.getElementById('staffCount');
  if (studentCount) studentCount.textContent = d.students.length;
  if (staffCount) staffCount.textContent = d.staff.length;

  const noticeList = document.getElementById('noticeList');
  if (noticeList) {
    noticeList.innerHTML = d.notices.map((n) => `<div class="card soft-card"><div class="card-body"><div class="small text-muted">${n.date} • ${n.type}</div><div>${n.text}</div></div></div>`).join('');
  }

  const meetingBody = document.getElementById('meetingTableBody');
  if (meetingBody) {
    meetingBody.innerHTML = d.meetings.map((m) => `<tr><td>${m.date}</td><td>${m.time}</td><td>${m.purpose}</td></tr>`).join('') || '<tr><td colspan="3">No meetings</td></tr>';
  }

  const mediaGrid = document.getElementById('mediaGrid');
  if (mediaGrid) {
    const emptyText = (I18N[(localStorage.getItem('sdsLang') || 'hi')] || I18N.hi).media_none;
    mediaGrid.innerHTML = d.media.length
      ? d.media.map((m) => `<div class="col-md-4"><div class="card soft-card h-100"><div class="card-body"><h6>${m.title}</h6>${m.type === 'video' ? `<video class="media-thumb" controls src="${m.file}"></video>` : `<img class="media-thumb" src="${m.file}" alt="${m.title}">`}</div></div></div>`).join('')
      : `<div class="col-12"><div class="alert alert-secondary">${emptyText}</div></div>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderPublic();
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Message sent successfully / संदेश सफलतापूर्वक भेजा गया');
      contactForm.reset();
    });
  }
});
