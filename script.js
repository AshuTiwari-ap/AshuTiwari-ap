const DB_KEY="sdsPortalDB";const base={students:[],staff:[],notices:[{id:crypto.randomUUID(),type:"General Information",text:"सत्र 2026-27 प्रवेश प्रारम्भ",date:new Date().toLocaleDateString()}],meetings:[],branding:{}};
const db=()=>JSON.parse(localStorage.getItem(DB_KEY)||JSON.stringify(base));const save=(d)=>localStorage.setItem(DB_KEY,JSON.stringify(d));if(!localStorage.getItem(DB_KEY))save(base);
const el=(id)=>document.getElementById(id);
function applyBranding(){const b=db().branding;if(el("brandLogo")&&b.logo)el("brandLogo").src=b.logo;if(el("schoolBanner")&&b.banner)el("schoolBanner").src=b.banner;if(el("principalPhoto")&&b.principal)el("principalPhoto").src=b.principal}
function renderPublic(){const d=db();if(el("studentCount"))el("studentCount").textContent=d.students.length;if(el("staffCount"))el("staffCount").textContent=d.staff.length;
if(el("noticeList"))el("noticeList").innerHTML=d.notices.map(n=>`<div class="col-md-4"><div class="card soft-card h-100"><div class="card-body"><span class="badge text-bg-primary">${n.type}</span><p class="mt-2 mb-1">${n.text}</p><small>${n.date}</small></div></div></div>`).join("");
if(el("meetingTableBody"))el("meetingTableBody").innerHTML=d.meetings.map(m=>`<tr><td>${m.date}</td><td>${m.time}</td><td>${m.purpose}</td></tr>`).join("")||"<tr><td colspan='3'>अभी कोई बैठक निर्धारित नहीं है।</td></tr>";
}
function activeNav(){const p=location.pathname.split('/').pop()||'index.html';document.querySelectorAll('.nav-link').forEach(a=>{if(a.getAttribute('href')===p)a.classList.add('active')})}
el("contactForm")?.addEventListener("submit",e=>{e.preventDefault();alert("धन्यवाद! आपका संदेश प्राप्त हुआ।");e.target.reset()});
applyBranding();renderPublic();activeNav();