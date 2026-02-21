const LANG_KEY = 'sdsLang';

const I18N = {
  hi: {
    nav_home: 'होम', nav_about: 'परिचय', nav_students: 'छात्र', nav_staff: 'स्टाफ', nav_notice: 'सूचना', nav_certificates: 'प्रमाणपत्र', nav_meetings: 'बैठकें', nav_gallery: 'गैलरी', nav_contact: 'संपर्क', nav_admin: 'एडमिन लॉगिन',
    principal_label: 'प्रधानाचार्य',
    motivation_line: '"शिक्षा ही सबसे बड़ी शक्ति है, जो भविष्य को उज्ज्वल बनाती है।"',
    principal_request: 'प्रधानाचार्य संदेश: सभी अभिभावकों से निवेदन है कि बच्चों की नियमित उपस्थिति और अनुशासन पर विशेष ध्यान दें।',
    home_banner_note: 'बैनर/प्रिंसिपल फोटो एडमिन पैनल से बदली जा सकती है।',
    home_card1_title: 'स्कूल मैनेजमेंट', home_card1_desc: 'छात्र, स्टाफ, नोटिस और बैठकें डिजिटल तरीके से प्रबंधित करें।',
    home_card2_title: 'प्रमाणपत्र सुविधा', home_card2_desc: 'Bonafide, Character और Transfer Certificate PDF में बनाएं।',
    home_card3_title: 'वार्षिक कार्यक्रम गैलरी', home_card3_desc: 'फोटो और वीडियो अपलोड होकर वेबसाइट पर सभी को दिखाई देंगे।',
    about_title: 'विद्यालय परिचय', about_history: 'इतिहास (2-3 वर्ष की प्रगति)', about_history_desc: 'S.D.S Convent School की स्थापना हाल ही में हुई है और पिछले 2-3 वर्षों में विद्यालय ने अनुशासन, संस्कार और गुणवत्तापूर्ण शिक्षा के क्षेत्र में मजबूत पहचान बनाई है।',
    about_mission: 'मिशन एवं विज़न', about_mission_desc: 'हमारा लक्ष्य बच्चों को नैतिक, बौद्धिक और व्यावहारिक रूप से मजबूत बनाना है ताकि वे आत्मविश्वासी नागरिक बन सकें।',
    about_infra: 'इन्फ्रास्ट्रक्चर', about_infra_desc: 'सुरक्षित परिसर, स्वच्छ कक्षाएं, सह-पाठ्य गतिविधियाँ और विद्यार्थियों के संपूर्ण विकास पर विशेष ध्यान।',
    map_title: 'स्कूल लोकेशन (Google Map)', best_points_title: 'हमारे स्कूल की विशेष बातें',
    students_title: 'छात्र सेक्शन', staff_title: 'स्टाफ सेक्शन',
    security_note_label: 'सुरक्षा सूचना:', students_restricted: 'छात्रों की पूरी व्यक्तिगत जानकारी केवल एडमिन लॉगिन के बाद उपलब्ध है।', staff_restricted: 'शिक्षक/स्टाफ की पूरी जानकारी केवल एडमिन डैशबोर्ड में उपलब्ध है।',
    total_students: 'कुल पंजीकृत छात्र', total_staff: 'कुल स्टाफ',
    notice_title: 'सूचना पट्ट', meetings_title: 'आगामी बैठकें', gallery_title: 'वार्षिक कार्यक्रम एवं सेलिब्रेशन गैलरी', gallery_desc: 'विद्यालय के कार्यक्रमों की फोटो और वीडियो यहां देखें।',
    th_date: 'तारीख', th_time: 'समय', th_purpose: 'उद्देश्य', th_name: 'नाम', th_class: 'कक्षा', th_mobile: 'मोबाइल', th_action: 'कार्य', th_designation: 'पद', th_subject: 'विषय',
    cert_title: 'प्रमाणपत्र मॉड्यूल', cert_admin_only: 'प्रमाणपत्र बनाना केवल एडमिन लॉगिन के बाद उपलब्ध है।',
    contact_title: 'संपर्क करें', send_message: 'संदेश भेजें',
    ph_name: 'नाम', ph_email: 'ईमेल', ph_message: 'संदेश', ph_username: 'यूज़रनेम', ph_password: 'पासवर्ड',
    admin_panel: 'एडमिन पैनल', login: 'लॉगिन', logout: 'लॉगआउट', backup_export: 'बैकअप एक्सपोर्ट', backup_import: 'बैकअप इंपोर्ट',
    otp_info: 'नया छात्र/स्टाफ जोड़ते समय OTP सत्यापन आवश्यक है।',
    m_students: 'कुल छात्र', m_staff: 'कुल स्टाफ', m_notices: 'कुल सूचनाएँ', m_meetings: 'कुल बैठकें', m_media: 'कुल मीडिया आइटम',
    student_mgmt: 'छात्र प्रबंधन (सिर्फ एडमिन)', staff_mgmt: 'स्टाफ प्रबंधन (सिर्फ एडमिन)', media_mgmt: 'कार्यक्रम मीडिया मैनेजमेंट',
    ph_fullname: 'पूरा नाम', ph_father: 'पिता का नाम', ph_mother: 'माता का नाम', ph_class: 'कक्षा', ph_section: 'सेक्शन', ph_roll: 'रोल नंबर', ph_address: 'पता', ph_mobile: 'मोबाइल', ph_aadhaar: 'आधार (वैकल्पिक)',
    save: 'सेव', type: 'प्रकार', ph_notice: 'सूचना लिखें', post: 'पोस्ट करें', schedule_meeting: 'बैठक शेड्यूल करें', ph_purpose: 'उद्देश्य', add: 'जोड़ें',
    branding: 'ब्रांडिंग', save_branding: 'सेव ब्रांडिंग', certificates: 'प्रमाणपत्र',
    ph_designation: 'पद', ph_subject: 'विषय',
    media_type: 'मीडिया प्रकार', media_title: 'इवेंट शीर्षक', upload_media: 'मीडिया अपलोड करें', media_none: 'अभी तक कोई मीडिया अपलोड नहीं किया गया है।', event_category: 'इवेंट कैटेगरी', event_annual: 'वार्षिक समारोह', event_celebration: 'सेलिब्रेशन', event_cultural: 'सांस्कृतिक कार्यक्रम', filter_all: 'सभी',
    genius_title: 'Genius AI Help', genius_placeholder: 'अपना सवाल लिखें...', genius_welcome: 'नमस्ते! मैं Genius हूँ। आप मुझसे एडमिशन, फीस, नोटिस, मीटिंग, सर्टिफिकेट या कॉन्टैक्ट के बारे में पूछ सकते हैं।'
  },
  en: {
    nav_home: 'Home', nav_about: 'About', nav_students: 'Students', nav_staff: 'Staff', nav_notice: 'Notice', nav_certificates: 'Certificates', nav_meetings: 'Meetings', nav_gallery: 'Gallery', nav_contact: 'Contact', nav_admin: 'Admin Login',
    principal_label: 'Principal',
    motivation_line: '"Education is the greatest power that shapes a brighter future."',
    principal_request: 'Principal’s Request: Parents are kindly requested to ensure regular attendance and discipline of students.',
    home_banner_note: 'Banner/principal photo can be changed from admin panel.',
    home_card1_title: 'School Management', home_card1_desc: 'Manage students, staff, notices and meetings digitally.',
    home_card2_title: 'Certificate Facility', home_card2_desc: 'Generate Bonafide, Character and Transfer Certificate PDFs.',
    home_card3_title: 'Annual Events Gallery', home_card3_desc: 'Uploaded celebration photos and videos are visible on the website.',
    about_title: 'About School', about_history: 'History (2-3 years growth)', about_history_desc: 'S.D.S Convent School is a newly established school, and in the last 2-3 years it has built a strong identity in discipline, values and quality learning.',
    about_mission: 'Mission & Vision', about_mission_desc: 'Our mission is to develop students morally, intellectually and practically so they become confident citizens.',
    about_infra: 'Infrastructure', about_infra_desc: 'Safe campus, clean classrooms, co-curricular activities and focus on holistic development.',
    map_title: 'School Location (Google Map)', best_points_title: 'Best Things About Our School',
    students_title: 'Students Section', staff_title: 'Staff Section',
    security_note_label: 'Security Note:', students_restricted: 'Full student personal details are available only after admin login.', staff_restricted: 'Full teacher/staff details are available only in admin dashboard.',
    total_students: 'Total Registered Students', total_staff: 'Total Staff',
    notice_title: 'Notice Board', meetings_title: 'Upcoming Meetings', gallery_title: 'Annual Functions & Celebration Gallery', gallery_desc: 'View photos and videos of school events.',
    th_date: 'Date', th_time: 'Time', th_purpose: 'Purpose', th_name: 'Name', th_class: 'Class', th_mobile: 'Mobile', th_action: 'Action', th_designation: 'Designation', th_subject: 'Subject',
    cert_title: 'Certificates Module', cert_admin_only: 'Certificate generation is available only after admin login.',
    contact_title: 'Contact Us', send_message: 'Send Message',
    ph_name: 'Name', ph_email: 'Email', ph_message: 'Message', ph_username: 'Username', ph_password: 'Password',
    admin_panel: 'Admin Panel', login: 'Login', logout: 'Logout', backup_export: 'Export Backup', backup_import: 'Import Backup',
    otp_info: 'OTP verification is required while adding a new student/staff.',
    m_students: 'Total Students', m_staff: 'Total Staff', m_notices: 'Total Notices', m_meetings: 'Total Meetings', m_media: 'Total Media Items',
    student_mgmt: 'Student Management (Admin Only)', staff_mgmt: 'Staff Management (Admin Only)', media_mgmt: 'Event Media Management',
    ph_fullname: 'Full Name', ph_father: 'Father Name', ph_mother: 'Mother Name', ph_class: 'Class', ph_section: 'Section', ph_roll: 'Roll Number', ph_address: 'Address', ph_mobile: 'Mobile', ph_aadhaar: 'Aadhaar (optional)',
    save: 'Save', type: 'Type', ph_notice: 'Write notice', post: 'Post', schedule_meeting: 'Schedule Meeting', ph_purpose: 'Purpose', add: 'Add',
    branding: 'Branding', save_branding: 'Save Branding', certificates: 'Certificates',
    ph_designation: 'Designation', ph_subject: 'Subject',
    media_type: 'Media Type', media_title: 'Event Title', upload_media: 'Upload Media', media_none: 'No media uploaded yet.', event_category: 'Event Category', event_annual: 'Annual Function', event_celebration: 'Celebration', event_cultural: 'Cultural Activity', filter_all: 'All',
    genius_title: 'Genius AI Help', genius_placeholder: 'Type your question...', genius_welcome: 'Hello! I am Genius. Ask me about admissions, fees, notices, meetings, certificates or contact information.'
  }
};

function applyLanguage(lang) {
  const pack = I18N[lang] || I18N.hi;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.dataset.i18n;
    if (pack[key]) node.textContent = pack[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
    const key = node.dataset.i18nPlaceholder;
    if (pack[key]) node.placeholder = pack[key];
  });
  const select = document.getElementById('langSelect');
  if (select) select.value = lang;

  const botInput = document.getElementById('geniusInput');
  if (botInput) botInput.placeholder = pack.genius_placeholder;
  const botTitle = document.getElementById('geniusTitle');
  if (botTitle) botTitle.textContent = pack.genius_title;

  localStorage.setItem(LANG_KEY, lang);
}

function activeNav() {
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach((link) => {
    if (link.getAttribute('href') === current) link.classList.add('active');
  });
}

function applyBranding() {
  const raw = localStorage.getItem('sdsPortalDB');
  if (!raw) return;
  const branding = (JSON.parse(raw).branding || {});
  const logo = document.getElementById('brandLogo');
  const banner = document.getElementById('schoolBanner');
  const principal = document.getElementById('principalPhoto');
  if (logo && branding.logo) logo.src = branding.logo;
  if (banner && branding.banner) banner.src = branding.banner;
  if (principal && branding.principal) principal.src = branding.principal;
}

function getGeniusReply(text) {
  const lang = localStorage.getItem(LANG_KEY) || 'hi';
  const q = text.toLowerCase();
  const replies = {
    hi: {
      admission: 'एडमिशन जानकारी के लिए स्कूल ऑफिस या Contact पेज का उपयोग करें। आवश्यक दस्तावेज: जन्म तिथि प्रमाण, आधार (वैकल्पिक), और पिछली कक्षा का रिकॉर्ड।',
      fee: 'फीस संबंधी जानकारी के लिए कृपया एडमिन/ऑफिस से संपर्क करें। Contact पेज में पता उपलब्ध है।',
      notice: 'नोटिस देखने के लिए Notice पेज खोलें। वहां परीक्षा, छुट्टी और सामान्य सूचना दिखाई जाती है।',
      meeting: 'बैठकों की जानकारी Meetings पेज में मिल जाएगी।',
      certificate: 'Bonafide, Character और Transfer Certificate एडमिन पैनल से generate किए जा सकते हैं।',
      gallery: 'Annual function और celebration की photos/videos Gallery page में देखें।',
      contact: 'स्कूल पता: Gopalpur, Kanpur Nagar, Uttar Pradesh. अधिक जानकारी के लिए Contact पेज खोलें।',
      default: 'मैं Genius आपकी मदद के लिए हूँ। आप admission, fees, notices, meetings, certificates या contact के बारे में पूछ सकते हैं।'
    },
    en: {
      admission: 'For admission details, please use the school office or Contact page. Common documents: DOB proof, Aadhaar (optional), and previous class record.',
      fee: 'For fee information, please contact the school office/admin. Address is available on Contact page.',
      notice: 'Please open the Notice page for exam, holiday and general announcements.',
      meeting: 'Upcoming meetings are available on the Meetings page.',
      certificate: 'Bonafide, Character and Transfer Certificates can be generated from the Admin panel.',
      gallery: 'Visit the Gallery page to view annual function and celebration photos/videos.',
      contact: 'School address: Gopalpur, Kanpur Nagar, Uttar Pradesh. Please open Contact page for details.',
      default: 'I am Genius, here to help. Ask me about admissions, fees, notices, meetings, certificates, or contact details.'
    }
  };

  const pack = replies[lang] || replies.hi;
  if (q.includes('admission') || q.includes('एडमिशन') || q.includes('प्रवेश')) return pack.admission;
  if (q.includes('fee') || q.includes('fees') || q.includes('फीस')) return pack.fee;
  if (q.includes('notice') || q.includes('सूचना')) return pack.notice;
  if (q.includes('meeting') || q.includes('बैठक')) return pack.meeting;
  if (q.includes('certificate') || q.includes('प्रमाणपत्र')) return pack.certificate;
  if (q.includes('gallery') || q.includes('annual') || q.includes('वार्षिक') || q.includes('function')) return pack.gallery;
  if (q.includes('contact') || q.includes('address') || q.includes('संपर्क') || q.includes('पता')) return pack.contact;
  return pack.default;
}

function appendGeniusMsg(text, who = 'bot') {
  const box = document.getElementById('geniusMessages');
  if (!box) return;
  const row = document.createElement('div');
  row.className = `genius-msg ${who}`;
  row.textContent = text;
  box.appendChild(row);
  box.scrollTop = box.scrollHeight;
}

function initGeniusBot() {
  const widget = document.createElement('div');
  widget.id = 'geniusWidget';
  widget.innerHTML = `
    <button id="geniusToggle" class="genius-toggle" aria-label="Open Genius">🤖 Genius</button>
    <div id="geniusPanel" class="genius-panel">
      <div class="genius-header"><span id="geniusTitle">Genius AI Help</span><button id="geniusClose" type="button">✕</button></div>
      <div id="geniusMessages" class="genius-messages"></div>
      <form id="geniusForm" class="genius-form">
        <input id="geniusInput" type="text" />
        <button type="submit">Send</button>
      </form>
    </div>
  `;
  document.body.appendChild(widget);

  const toggle = document.getElementById('geniusToggle');
  const panel = document.getElementById('geniusPanel');
  const close = document.getElementById('geniusClose');
  const form = document.getElementById('geniusForm');
  const input = document.getElementById('geniusInput');

  toggle.addEventListener('click', () => {
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) input.focus();
  });
  close.addEventListener('click', () => panel.classList.remove('open'));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    appendGeniusMsg(text, 'user');
    appendGeniusMsg(getGeniusReply(text), 'bot');
    input.value = '';
  });

  const lang = localStorage.getItem(LANG_KEY) || 'hi';
  const pack = I18N[lang] || I18N.hi;
  appendGeniusMsg(pack.genius_welcome, 'bot');
  applyLanguage(lang);
}

document.addEventListener('DOMContentLoaded', () => {
  const lang = localStorage.getItem(LANG_KEY) || 'hi';
  applyLanguage(lang);
  const select = document.getElementById('langSelect');
  if (select) select.addEventListener('change', (e) => applyLanguage(e.target.value));
  activeNav();
  applyBranding();
  initGeniusBot();
});
