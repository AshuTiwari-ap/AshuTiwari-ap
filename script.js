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

function mediaCard(m) {
  const view = m.type === 'video'
    ? `<video class="media-thumb" controls src="${m.file}"></video>`
    : `<img class="media-thumb" src="${m.file}" alt="${m.title}">`;
  return `<div class="col-md-4"><div class="card soft-card h-100 media-card"><div class="card-body"><div class="badge text-bg-warning mb-2">${m.eventCategory || 'Annual Function'}</div><h6>${m.title}</h6>${view}</div></div></div>`;
}

function renderPublic(category = 'All') {
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
    const lang = localStorage.getItem('sdsLang') || 'hi';
    const emptyText = (I18N[lang] || I18N.hi).media_none;
    const data = category === 'All' ? d.media : d.media.filter((m) => (m.eventCategory || 'Annual Function') === category);
    mediaGrid.innerHTML = data.length ? data.map(mediaCard).join('') : `<div class="col-12"><div class="alert alert-secondary">${emptyText}</div></div>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderPublic();

  const filterBar = document.getElementById('galleryFilterBar');
  if (filterBar) {
    filterBar.querySelectorAll('button[data-category]').forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBar.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        renderPublic(btn.dataset.category);
      });
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Message sent successfully / संदेश सफलतापूर्वक भेजा गया');
      contactForm.reset();
    });
  }
});
