'use strict';
(function () {
  const RESULT_URL = 'https://biresh-result-lf2hgmmpxou.qoder.website';
  const EST = 1999;
  const YEARS = new Date().getFullYear() - EST;
  const STUDENTS = 148, CLASSES = 11, GROUPS = 3;
  const R = document.documentElement;

  if (window.top !== window.self) {
    try { window.top.location = window.self.location.href; } catch (e) { /* cross-origin frame */ }
    const message = document.createElement('p'), link = document.createElement('a');
    message.className = 'framed';
    link.href = window.location.href.split('#')[0];
    link.target = '_top';
    link.rel = 'noopener';
    link.textContent = 'বীরেশ চন্দ্র উচ্চ বিদ্যালয় — ওয়েবসাইট খুলুন / Open website';
    message.appendChild(link);
    document.body.replaceChildren(message);
    return;
  }

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage blocked */ } }
  };
  let LANG = store.get('webLang') === 'en' ? 'en' : 'bn';
  const th = store.get('webTheme'), ac = store.get('webAc');
  if (th === 'dark' || th === 'light') R.dataset.theme = th;
  if (ac === '2' || ac === '3') R.dataset.ac = ac;
  R.classList.add('js');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const T = (b, e) => (LANG === 'en' ? e : b);
  const N = n => (LANG === 'en' ? String(n) : String(n).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d]));
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  const ext = (cls, label) => `<a class="b ${cls}" href="${RESULT_URL}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  const NAME = () => T('বীরেশ চন্দ্র উচ্চ বিদ্যালয়', 'Biresh Chandra High School');
  const WORDS = () => T(['শিখি।', 'জানি।', 'নিজেকে গড়ি।', 'এগিয়ে যাই।'], ['learn.', 'lead.', 'grow.', 'shine.']);
  const CLASS_LIST = () => T(['শিশু', 'প্রথম', 'দ্বিতীয়', 'তৃতীয়', 'চতুর্থ', 'পঞ্চম', 'ষষ্ঠ', 'সপ্তম', 'অষ্টম', 'নবম', 'দশম'],
    ['Nursery', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10']);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const MONTHS = [['জানুয়ারি', 'January'], ['ফেব্রুয়ারি', 'February'], ['মার্চ', 'March'], ['এপ্রিল', 'April'], ['মে', 'May'], ['জুন', 'June'], ['জুলাই', 'July'], ['আগস্ট', 'August'], ['সেপ্টেম্বর', 'September'], ['অক্টোবর', 'October'], ['নভেম্বর', 'November'], ['ডিসেম্বর', 'December']];
  const fdate = s => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || ''));
    if (!m || +m[2] < 1 || +m[2] > 12) return '';
    return N(+m[3]) + ' ' + T(MONTHS[+m[2] - 1][0], MONTHS[+m[2] - 1][1]) + ' ' + N(m[1]);
  };

  // notices written in the school software (Website_Upload/notices.json uploaded next to this file)
  let NOTICES = [];
  const pick = o => (o && typeof o === 'object' ? String((LANG === 'en' && o.en) ? o.en : (o.bn || o.en || '')) : '');
  const noticeText = n => ({ t: pick(n.t).slice(0, 200), b: pick(n.b).slice(0, 4000) });
  function noticeCards() {
    return NOTICES.slice(0, 6).map(n => {
      const x = noticeText(n);
      return `<div class="sp${n.pin ? ' pin' : ''}"><b>${n.pin ? '📌' : '📢'} ${T('নোটিশ', 'Notice')}</b>${fdate(n.d) ? `<time datetime="${esc(n.d)}">${fdate(n.d)}</time>` : ''}<h3>${esc(x.t)}</h3>${x.b ? `<p>${esc(x.b).replace(/\r?\n/g, '<br>')}</p>` : ''}</div>`;
    }).join('');
  }
  function loadNotices() {
    if (!window.fetch) return;
    fetch('notices.json', { cache: 'no-cache', credentials: 'omit' })
      .then(r => (r.ok ? r.json() : null))
      .then(j => {
        if (!j || !Array.isArray(j.items)) return;
        NOTICES = j.items.filter(n => n && typeof n === 'object' && pick(n.t).trim()).slice(0, 40);
        if (!NOTICES.length) return;
        const box = $('#nbList'), mq = $('#mqIn');
        if (box) box.innerHTML = noticeCards() + box.querySelector('.res').outerHTML;
        if (mq) mq.innerHTML = marquee();
      })
      .catch(() => { /* no notices file yet */ });
  }
  function marquee() {
    const base = [
      T('নির্বাচনী পরীক্ষা-২০২৬-এর ফলাফল প্রকাশিত — অনলাইনে রোল নং দিয়ে দেখুন', 'Test Exam-2026 result published — check online with your roll number'),
      T('নতুন শিক্ষাবর্ষে শিশু থেকে নবম শ্রেণি পর্যন্ত ভর্তি তথ্য দেখুন', 'Admission information for Nursery to Class 9 in the new academic year'),
      T('অফিস সময়: রবি–বৃহস্পতি, সকাল ১০টা – বিকাল ৪টা', 'Office hours: Sun–Thu, 10 AM – 4 PM'),
      T('শিক্ষাই জাতির মেরুদণ্ড', 'Education is the backbone of the nation')
    ];
    const list = NOTICES.slice(0, 5).map(n => esc(noticeText(n).t)).concat(base);
    return list.concat(list).map(n => `<span>${n}</span><span aria-hidden="true">★</span>`).join('');
  }

  function view() {
    const S = NAME();
    return `<a class="skip" href="#main" data-a="skip">${T('মূল অংশে যান', 'Skip to content')}</a>
<div id="pg"></div>
<nav id="nv" aria-label="${T('মূল মেনু', 'Main menu')}">
  <a class="brand" href="#top"><img src="assets/logo1.jpg" alt=""><b>${S}</b></a>
  <div class="l">
    <a href="#result">${T('ফলাফল', 'Result')}</a><a href="#notice">${T('নোটিশ', 'Notice')}</a><a href="#admission">${T('ভর্তি', 'Admission')}</a>
    <a href="#gallery">${T('গ্যালারি', 'Gallery')}</a><a href="#about">${T('আমাদের সম্পর্কে', 'About us')}</a><a href="#contact">${T('যোগাযোগ', 'Contact')}</a>
  </div>
  <div class="nr"><button class="ib" type="button" data-a="lang" title="${T('ভাষা বদলান', 'Switch language')}">🌐 ${LANG === 'en' ? 'বাংলা' : 'EN'}</button>${ext('sm', T('রেজাল্ট দেখুন', 'Check result'))}</div>
</nav>
<header class="hero" id="top"><div class="bg" id="bg"></div>
  <div class="hi"><div>
    <p class="pill">🎓 ${T(`স্থাপিত ${N(EST)} · সিলেট সিটি কর্পোরেশন পরিচালিত`, `Est. ${EST} · Administered by Sylhet City Corporation`)}</p>
    <h1>${T('এসো', 'Come to')} <em id="ty"></em><span class="cur" aria-hidden="true"></span></h1>
    <p class="lead">${T(`<b>${S}</b> — মানসম্মত শিক্ষা, নৈতিক মূল্যবোধ আর সহ-শিক্ষা কার্যক্রমে ${N(EST)} সাল থেকে আগামীর প্রজন্ম গড়ে তুলছে।`, `<b>${S}</b> — building the next generation through quality education, moral values and co-curricular activities since ${EST}.`)}</p>
    <div class="row">${ext('gold', T('রেজাল্ট দেখুন →', 'Check result →'))}<a class="b o" href="#admission">${T('ভর্তি তথ্য', 'Admission info')}</a></div>
  </div>
  <div class="glw">
    <div class="gl">${T('শিক্ষার্থী', 'Students')}<b data-count="${STUDENTS}">${N(STUDENTS)}</b></div>
    <div class="gl">${T('শ্রেণি (শিশু–দশম)', 'Classes (Nursery–10)')}<b data-count="${CLASSES}">${N(CLASSES)}</b></div>
    <div class="gl">${T('বছরের পথচলা', 'Years of service')}<b data-count="${YEARS}">${N(YEARS)}</b></div>
  </div></div>
</header>
<div class="mq" role="marquee" aria-label="${T('নোটিশ', 'Notices')}"><div id="mqIn">${marquee()}</div></div>
<main id="main" tabindex="-1">
<section id="result"><h2 class="rv">${T('এক জায়গায় সব তথ্য', 'Everything in one place')}</h2><p class="sub rv d1">${T('ফলাফল, ভর্তি আর একাডেমিক তথ্য — সব সময় হালনাগাদ।', 'Results, admission and academic information — always up to date.')}</p>
  <div class="tabs rv d2" role="tablist">
    <button class="tb on" type="button" role="tab" aria-selected="true" data-t="0">${T('অনলাইন ফলাফল', 'Online result')}</button>
    <button class="tb" type="button" role="tab" aria-selected="false" data-t="1">${T('ভর্তির কাগজপত্র', 'Admission documents')}</button>
    <button class="tb" type="button" role="tab" aria-selected="false" data-t="2">${T('শ্রেণি ও বিভাগ', 'Classes & groups')}</button>
  </div>
  <div class="pn on" role="tabpanel"><div><h3>${T('নিজের ফলাফল দেখুন', 'Check your own result')}</h3>
    <ol class="steps"><li>${T('নিচের বাটনে চাপুন', 'Press the button below')}</li><li>${T('পরীক্ষা, শ্রেণি, শাখা ও রোল নং দিন', 'Enter the exam, class, section and roll number')}</li><li>${T('আপনার মার্কশিট দেখুন ও প্রিন্ট করুন', 'View and print your marksheet')}</li></ol>
    ${ext('', T('রেজাল্ট দেখুন →', 'Check result →'))}</div>
    <div><h3>${T('মোবাইলে স্ক্যান করুন', 'Scan with your phone')}</h3><p>${T('ফলাফল নোটিশের নিচেও এই QR কোডটি দেওয়া আছে।', 'The same QR code is printed under the result notice.')}</p>
    <div class="qr"><img src="assets/result-qr.svg" alt="${T('ফলাফল সাইটের QR কোড', 'QR code for the result site')}" width="120" height="120"><div><b>${T('ক্যামেরা দিয়ে স্ক্যান করুন', 'Scan with the camera')}</b><br><small>${RESULT_URL.replace('https://', '')}</small></div></div></div></div>
  <div class="pn" role="tabpanel"><div><h3>${T('প্রয়োজনীয় কাগজপত্র', 'Required documents')}</h3>
    <ul class="docs"><li>${T('শিক্ষার্থীর জন্ম নিবন্ধন সনদের ফটোকপি', 'Photocopy of the student’s birth registration certificate')}</li><li>${T('পিতা ও মাতার জাতীয় পরিচয়পত্রের (NID) ফটোকপি', 'Photocopy of parents’ National ID (NID)')}</li><li>${T('পূর্ববর্তী শ্রেণির ছাড়পত্র / প্রশংসাপত্র ও মার্কসিট', 'Previous class transfer certificate / testimonial and marksheet')}</li><li>${T('পাসপোর্ট সাইজের ২ কপি রঙিন ছবি', '2 passport-size colour photographs')}</li></ul></div>
    <div><h3>${T('কোথায় ও কখন', 'Where and when')}</h3><p>${T('বিদ্যালয় অফিস চলাকালীন সময়ে (সকাল ১০:০০ টা – বিকাল ৪:০০ টা) ভর্তি ফরম সংগ্রহ ও জমা দেওয়া যাবে।', 'Admission forms can be collected and submitted during school office hours (10:00 AM – 4:00 PM).')}</p><a class="b" href="#admission">${T('ভর্তির ধাপ দেখুন', 'See admission steps')}</a></div></div>
  <div class="pn" role="tabpanel"><div><h3>${T('শ্রেণিসমূহ', 'Classes')}</h3>${CLASS_LIST().map(c => `<span class="chip">${c}</span>`).join('')}</div>
    <div><h3>${T('বিভাগসমূহ (নবম–দশম)', 'Groups (Class 9–10)')}</h3><span class="chip">${T('বিজ্ঞান', 'Science')}</span><span class="chip">${T('মানবিক', 'Humanities')}</span><span class="chip">${T('ব্যবসায় শিক্ষা', 'Business Studies')}</span>
    <p>${T('শিশু শ্রেণি থেকে দশম শ্রেণি পর্যন্ত পাঠদান কার্যক্রম পরিচালিত হয়।', 'Classes run from Nursery to Class 10.')}</p></div></div>
</section>
<section class="pt0"><div class="st">
  <div class="sp rv"><b data-count="${STUDENTS}">${N(STUDENTS)}</b>${T('শিক্ষার্থী', 'Students')}</div>
  <div class="sp rv d1"><b data-count="${CLASSES}">${N(CLASSES)}</b>${T('শ্রেণি', 'Classes')}</div>
  <div class="sp rv d2"><b data-count="${GROUPS}">${N(GROUPS)}</b>${T('বিভাগ', 'Groups')}</div>
  <div class="sp rv d3"><b data-count="${YEARS}">${N(YEARS)}</b>${T('বছরের পথচলা', 'Years of service')}</div>
</div></section>
<section id="notice" class="pt0"><h2 class="rv">${T('নোটিশ বোর্ড', 'Notice board')}</h2><p class="sub rv d1">${T('বিদ্যালয়ের বিজ্ঞপ্তি, নির্দেশনা ও ঘোষণা।', 'School notices, instructions and announcements.')}</p>
  <div class="nb" id="nbList">${noticeCards()}
    <div class="sp rv res"><b>📊 ${T('ফলাফল', 'Result')}</b><h3>${T('নির্বাচনী পরীক্ষা-২০২৬-এর ফলাফল প্রকাশিত', 'Test Exam-2026 result published')}</h3><p>${T('দশম শ্রেণির শিক্ষার্থীরা পরীক্ষা, শ্রেণি, শাখা ও রোল নং দিয়ে অনলাইনে নিজের ফলাফল দেখতে পারবে।', 'Class 10 students can check their own result online with exam, class, section and roll number.')}</p>${ext('sm', T('রেজাল্ট দেখুন →', 'Check result →'))}</div>
    ${NOTICES.length ? '' : `<div class="sp rv d1"><b>📌 ${T('সাধারণ', 'General')}</b><h3>${T('সাধারণ বিজ্ঞপ্তি', 'General notices')}</h3><p>${T('বর্তমানে কোনো সাধারণ বিজ্ঞপ্তি প্রকাশ করা হয়নি।', 'No general notice has been published yet.')}</p></div>`}
  </div>
</section>
<section id="gallery"><h2 class="rv">${T('আমাদের ক্যাম্পাস', 'Our campus')}</h2><p class="sub rv d1">${T('প্যানেলের উপর মাউস রাখুন বা চাপুন।', 'Hover over or tap a panel to explore.')}</p>
  <div class="gal rv d2"><div class="p1">${T('বিদ্যালয় ভবন', 'School building')}</div><div class="p2">${T('শ্রেণিকক্ষের সারি', 'Classroom block')}</div><div class="p3">${T('সবুজ খেলার মাঠ', 'Green playground')}</div><div class="p4">${T('ছায়াঘেরা প্রাঙ্গণ', 'Shady campus')}</div></div>
</section>
<section id="admission"><h2 class="rv">${T('চার ধাপে ভর্তি', 'Admission in four steps')}</h2><p class="sub rv d1">${T('শিশু থেকে নবম শ্রেণি পর্যন্ত — সহজ ও পরিষ্কার নিয়ম।', 'Nursery to Class 9 — simple and clear.')}</p>
  <div class="st">
    <div class="sp rv"><b>${N(1)}</b><h3>${T('ফরম সংগ্রহ', 'Collect the form')}</h3><p>${T('অফিস চলাকালীন বিদ্যালয় অফিস থেকে', 'From the school office during office hours')}</p></div>
    <div class="sp rv d1"><b>${N(2)}</b><h3>${T('কাগজপত্র প্রস্তুত', 'Prepare documents')}</h3><p>${T('জন্ম নিবন্ধন, NID, ছাড়পত্র ও ছবি', 'Birth registration, NID, transfer certificate and photos')}</p></div>
    <div class="sp rv d2"><b>${N(3)}</b><h3>${T('ফরম জমা', 'Submit the form')}</h3><p>${T('সকাল ১০টা – বিকাল ৪টা, রবি–বৃহস্পতি', '10 AM – 4 PM, Sunday–Thursday')}</p></div>
    <div class="sp rv d3"><b>${N(4)}</b><h3>${T('বিদ্যালয় পরিবারে স্বাগতম', 'Welcome to our family')}</h3><p>${T('ভর্তি নিশ্চিত হলে ক্লাস শুরু', 'Classes begin once admission is confirmed')}</p></div>
  </div>
</section>
<section id="about" class="pt0"><h2 class="rv">${T('আমাদের সম্পর্কে', 'About us')}</h2><p class="sub rv d1">${T(`<b>${S}</b> একটি স্বনামধন্য শিক্ষা প্রতিষ্ঠান। প্রতিষ্ঠালগ্ন থেকেই বিদ্যালয়টি মানসম্মত শিক্ষা প্রদান, নৈতিক মূল্যবোধ গঠন এবং সহ-শিক্ষা কার্যক্রমে গুরুত্বপূর্ণ ভূমিকা রেখে চলেছে।`, `<b>${S}</b> is a renowned institution. Since its founding, the school has played an important role in quality education, moral development and co-curricular activities.`)}</p>
  <div class="st">
    <div class="tc rv"><div class="av">🎯</div><b>${T('আমাদের লক্ষ্য', 'Our mission')}</b><p>${T('আধুনিক ও বিজ্ঞানমনস্ক শিক্ষার মাধ্যমে সুনাগরিক গড়ে তোলা', 'Developing good citizens through modern, science-oriented education')}</p></div>
    <div class="tc rv d1"><div class="av">🏫</div><b>${T(`স্থাপিত ${N(EST)}`, `Established ${EST}`)}</b><p>${T(`${N(YEARS)} বছরের শিক্ষার ঐতিহ্য`, `${YEARS} years of educational heritage`)}</p></div>
    <div class="tc rv d2"><div class="av">🏛</div><b>${T('পরিচালনা', 'Administration')}</b><p>${T('সিলেট সিটি কর্পোরেশন পরিচালিত', 'Administered by Sylhet City Corporation')}</p></div>
    <div class="tc rv d3"><div class="av">📚</div><b>${T('তিনটি বিভাগ', 'Three groups')}</b><p>${T('বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা', 'Science, Humanities and Business Studies')}</p></div>
  </div>
</section>
<section id="contact" class="pt0"><h2 class="rv">${T('যোগাযোগ', 'Contact us')}</h2>
  <div class="nb">
    <div class="sp rv"><b>📍 ${T('ঠিকানা', 'Address')}</b><h3>${S}</h3><p>${T('সিলেট সিটি কর্পোরেশন এলাকা, সিলেট।', 'Sylhet City Corporation area, Sylhet.')}</p></div>
    <div class="sp rv d1"><b>🕒 ${T('অফিস সময়', 'Office hours')}</b><h3>${T('রবিবার – বৃহস্পতিবার', 'Sunday – Thursday')}</h3><p>${T('সকাল ১০:০০ টা – বিকাল ৪:০০ টা<br>শুক্রবার ও শনিবার: সাপ্তাহিক ছুটি', '10:00 AM – 4:00 PM<br>Friday & Saturday: weekly holiday')}</p></div>
  </div>
</section>
<div class="cta rv"><h2>${T('নিজের ফলাফল অনলাইনে দেখুন।', 'Check your own result online.')}</h2>${ext('', T('রেজাল্ট দেখুন →', 'Check result →'))}</div>
</main>
<footer>© ${N(new Date().getFullYear())} ${S} · ${T('সিলেট', 'Sylhet')}<br>${T('অনলাইন ফলাফল', 'Online result')}: <a href="${RESULT_URL}" target="_blank" rel="noopener noreferrer">${RESULT_URL.replace('https://', '')}</a></footer>
<div class="sw" role="group" aria-label="${T('রং ও থিম', 'Colour and theme')}"><button type="button" class="c1" data-a="ac" data-v="1" aria-label="${T('সবুজ', 'Green')}"></button><button type="button" class="c2" data-a="ac" data-v="2" aria-label="${T('বেগুনি', 'Violet')}"></button><button type="button" class="c3" data-a="ac" data-v="3" aria-label="${T('কমলা', 'Orange')}"></button><button type="button" class="md" data-a="theme" aria-label="${T('আলো বা অন্ধকার থিম', 'Light or dark theme')}"></button></div>`;
  }

  function count(el) {
    const n = +el.dataset.count, t0 = performance.now();
    if (reduced) { el.textContent = N(n); return; }
    (function f(t) {
      const p = Math.min((t - t0) / 1600, 1);
      el.textContent = N(Math.round(n * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(f);
    })(t0);
  }

  let io = null;
  function wire(first) {
    if (io) io.disconnect();
    if (first && !reduced) {
      io = new IntersectionObserver(es => es.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        e.target.querySelectorAll('[data-count]').forEach(count);
        io.unobserve(e.target);
      }), { threshold: 0.2 });
      $$('.rv').forEach(x => io.observe(x));
      $$('.gl b').forEach(count);
    } else {
      $$('.rv').forEach(x => x.classList.add('now', 'in'));
    }
    $$('.tc').forEach(c => {
      c.addEventListener('pointermove', e => {
        if (reduced || e.pointerType !== 'mouse') return;
        const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform = `perspective(600px) rotateY(${x * 18}deg) rotateX(${-y * 18}deg) scale(1.04)`;
      });
      c.addEventListener('pointerleave', () => { c.style.transform = ''; });
    });
    $('#top').addEventListener('pointermove', function (e) {
      const r = this.getBoundingClientRect();
      this.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      this.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
    onScroll();
  }

  const seg = typeof Intl !== 'undefined' && Intl.Segmenter ? new Intl.Segmenter() : null;
  const chars = w => (seg ? Array.from(seg.segment(w), s => s.segment) : Array.from(w));
  let wi = 0, ci = 0, del = false, timer = 0;
  function type() {
    const el = $('#ty');
    if (!el) return;
    const words = WORDS(), w = chars(words[wi % words.length]);
    if (reduced) { el.textContent = w.join(''); return; }
    ci += del ? -1 : 1;
    el.textContent = w.slice(0, ci).join('');
    let s = del ? 60 : 120;
    if (!del && ci >= w.length) { del = true; s = 1500; } else if (del && ci <= 0) { del = false; wi = (wi + 1) % words.length; s = 300; }
    timer = setTimeout(type, s);
  }

  function onScroll() {
    const y = window.scrollY, h = R.scrollHeight - window.innerHeight;
    const pg = $('#pg'), nv = $('#nv'), bg = $('#bg');
    if (pg) pg.style.width = (h > 0 ? y / h * 100 : 0) + '%';
    if (nv) nv.classList.toggle('sc', y > 60);
    if (bg && !reduced && y < 1000) bg.style.transform = `translateY(${y * 0.25}px)`;
  }

  function render(first) {
    R.lang = LANG;
    document.title = T('বীরেশ চন্দ্র উচ্চ বিদ্যালয় | সিলেট', 'Biresh Chandra High School | Sylhet');
    document.getElementById('app').innerHTML = view();
    clearTimeout(timer); ci = 0; del = false;
    type();
    wire(first);
  }

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-a],[data-t]');
    if (!b) return;
    if (b.dataset.t !== undefined) {
      $$('.tb').forEach(x => { const on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-selected', on); });
      $$('.pn').forEach((p, i) => p.classList.toggle('on', String(i) === b.dataset.t));
      return;
    }
    const a = b.dataset.a;
    if (a === 'skip') { e.preventDefault(); $('#main').focus(); }
    else if (a === 'lang') { LANG = LANG === 'en' ? 'bn' : 'en'; store.set('webLang', LANG); const y = window.scrollY; render(false); window.scrollTo(0, y); }
    else if (a === 'ac') { R.dataset.ac = b.dataset.v; store.set('webAc', b.dataset.v); }
    else if (a === 'theme') {
      const dark = R.dataset.theme ? R.dataset.theme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
      R.dataset.theme = dark ? 'light' : 'dark';
      store.set('webTheme', R.dataset.theme);
    }
  });
  window.addEventListener('scroll', onScroll, { passive: true });
  render(true);
  loadNotices();
  const h = window.location.hash.slice(1);
  if (h && document.getElementById(h)) document.getElementById(h).scrollIntoView();
})();
