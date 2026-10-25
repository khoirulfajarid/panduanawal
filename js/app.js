/**
 * ============================================================================
 * PRODUCTRECEIVER — FRONTEND ENGINE (js/app.js)
 * Arsitektur : GAS-PRO-API (Fetch REST API text/plain Anti-CORS)
 * Performa   : GAS Scale Turbo (SWR LocalStorage, In-Flight Dedup, Write Epoch)
 * Interaktif : Custom Magnetic Cursor + Kucing Imut ANABUL Escort
 * ============================================================================
 */
(function () {
  'use strict';

  const STORAGE_KEYS = {
    PUB_CACHE: 'pr_pub_cache_v1',
    SESSION_TOKEN: 'pr_admin_hmac_token',
    SESSION_USER: 'pr_admin_user_info',
    ANABUL_ACTIVE: 'pr_anabul_escort_on',
    VIEWED_SESSION: 'pr_tracked_pageview'
  };

  // Data default bawaan (digunakan saat pratinjau lokal sebelum GAS_URL diisi)
  function getDefaultBootData() {
    const now = new Date().toISOString();
    return {
      sections: {
        sec_greeting: {
          section_id: 'sec_greeting',
          section_title: 'Terima Kasih Atas Pembelian Anda!',
          section_subtitle: 'Selamat Datang di Kelas Eksklusif',
          content_body: 'Aset digital Anda telah siap. Ikuti panduan terstruktur di bawah ini untuk menonton video orientasi, menyalin token akses kelas, bergabung ke grup diskusi, dan mengklaim seluruh fasilitas Anda.',
          cta_label: 'Mulai Panduan Sekarang',
          cta_url: '#video-panduan',
          is_active: true,
          updated_at: now,
          metadata: {
            brand_name: 'ProductReceiver',
            verified_pill: 'Terverifikasi Lynk.id',
            hero_badge: 'Portal Serah Terima Resmi Lynk.id',
            rating_text: '500+ Alumni Puas',
            extra_count: '+480',
            anabul_enabled: true,
            anabul_greeting: 'Halo, Saya Anabul! 🐾',
            anabul_subtext: 'Aku menemani kursor kamu! Klik tombol Salin pada kartu Token lalu buka Portal Kelas ya!'
          }
        },
        sec_tutorials: {
          section_id: 'sec_tutorials',
          section_title: 'Video Panduan Orientasi Member & Ketentuan Belajar',
          section_subtitle: 'Video Orientasi • Wajib Tonton',
          content_body: 'Tonton video panduan singkat di bawah ini sebelum memulai untuk memahami cara menyalin & mengaktifkan token akses, etika grup diskusi, dan ketentuan lisensi materi.',
          cta_label: 'Buka Seluruh Playlist di YouTube',
          cta_url: 'https://www.youtube.com',
          is_active: true,
          updated_at: now,
          metadata: {
            box_title: 'Pusat Tutorial & Panduan Visual Resmi',
            playlist_url: 'https://www.youtube.com'
          }
        },
        sec_portal: {
          section_id: 'sec_portal',
          section_title: 'Masuk Portal Kelas & Salin Token Akses',
          section_subtitle: 'Langkah 01',
          content_body: 'Buka link portal belajar resmi berikut di tab baru browser Anda, lalu salin dan tempelkan kode token akses yang sesuai dengan paket pembelian Anda di bawah.',
          cta_label: 'BUKA PORTAL KELAS SEKARANG',
          cta_url: 'https://lynk.id',
          is_active: true,
          updated_at: now,
          metadata: {
            banner_badge: 'Direct Link Learning Management System',
            banner_title: 'Akses Portal Belajar Utama',
            show_qr: true
          }
        },
        sec_community: {
          section_id: 'sec_community',
          section_title: 'Bergabung ke Wadah Komunitas Resmi',
          section_subtitle: 'Langkah 02',
          content_body: 'Pilih grup diskusi WhatsApp dan saluran informasi Telegram resmi agar Anda tidak tertinggal info jadwal live mentoring dan update materi terbaru.',
          cta_label: 'Gabung Komunitas',
          cta_url: '',
          is_active: true,
          updated_at: now,
          metadata: {
            wa: {
              enabled: true,
              tab_label: 'Grup Diskusi & Networking',
              title: 'WhatsApp Community VIP',
              description: 'Ruang silaturahmi & sharing pengalaman sesama member se-Indonesia. Tempat berdiskusi santai, tanya jawab kendala teknis harian, dan kolaborasi project.',
              bullets: [
                'Diskusi dua arah langsung bersama mentor & tim asisten',
                'Review karya, bedah kendala, & jejaring alumni aktif'
              ],
              cta_label: 'Gabung WhatsApp Group',
              cta_url: 'https://chat.whatsapp.com/'
            },
            tg: {
              enabled: true,
              tab_label: 'Channel Broadcast Modul',
              title: 'Telegram Broadcast Channel',
              description: 'Saluran resmi notifikasi satu arah agar Anda tidak pernah ketinggalan update modul baru, jadwal sesi Zoom mentoring, dan file resource penting.',
              bullets: [
                'Arsip tautan rekaman sesi live webinar & materi suplemen',
                'Pengumuman event eksklusif & tantangan bulanan member'
              ],
              cta_label: 'Join Telegram Channel',
              cta_url: 'https://t.me/'
            }
          }
        },
        sec_social: {
          section_id: 'sec_social',
          section_title: 'Terhubung di Media Sosial Mentor',
          section_subtitle: 'Langkah 03',
          content_body: 'Jangan lewatkan insight harian gratis, studi kasus terbaru, dan pengumuman sesi live dadakan dengan mengikuti seluruh kanal resmi di bawah ini.',
          cta_label: '',
          cta_url: '',
          is_active: true,
          updated_at: now,
          metadata: {
            channels: [
              {
                platform: 'instagram',
                name: 'Instagram Resmi',
                handle: '@mentor_official',
                pitch: 'Update tips kilat harian, Q&A interaktif lewat Story, behind the scenes pembuatan produk digital, dan info giveaway eksklusif!',
                cta_label: 'Follow Instagram',
                url: 'https://instagram.com/'
              },
              {
                platform: 'youtube',
                name: 'YouTube Channel',
                handle: 'Mentor Academy ID',
                pitch: 'Video tutorial mendalam gratis berdurasi penuh, rekaman podcast bersama praktisi industri, dan bedah studi kasus nyata setiap minggu!',
                cta_label: 'Subscribe YouTube',
                url: 'https://youtube.com/'
              },
              {
                platform: 'tiktok',
                name: 'TikTok Kreatif',
                handle: '@mentor.creativelab',
                pitch: 'Insight daging 60 detik yang padat dan langsung bisa dipraktekkan, rekomendasi AI & tools produktivitas terbaru, serta tren digital terkini!',
                cta_label: 'Ikuti di TikTok',
                url: 'https://tiktok.com/'
              }
            ]
          }
        },
        sec_benefits: {
          section_id: 'sec_benefits',
          section_title: 'Rincian Hak & Fasilitas Sesuai Paket',
          section_subtitle: 'Langkah 04',
          content_body: 'Berikut rincian fasilitas belajar, bonus template, dan hak penggunaan resmi yang melekat pada paket pembelian Anda di Lynk.id.',
          cta_label: '',
          cta_url: '',
          is_active: true,
          updated_at: now,
          metadata: {
            status_pill: 'Terkonfirmasi Pembayaran Lynk.id',
            package_title: 'Paket Membership: Lifetime All-Access VIP',
            license_badge: 'Single Seat Licensed',
            items: [
              {
                icon: 'videocam',
                tag: 'Modul',
                title: 'Akses Video Materi Full HD Seumur Hidup',
                desc: 'Dapat dipelajari kapan pun melalui laptop maupun smartphone tanpa batas waktu berlangganan.'
              },
              {
                icon: 'dataset',
                tag: 'Asset Pack',
                title: 'Master Template Kerja Siap Pakai',
                desc: 'Hak duplikasi penuh untuk kebutuhan belajar dan operasional pribadi tanpa biaya tambahan.'
              },
              {
                icon: 'groups',
                tag: 'Community',
                title: 'Wadah Diskusi Komunitas & Networking',
                desc: 'Akses penuh ke grup diskusi WhatsApp dan saluran update Telegram bersama ratusan alumni lainnya.'
              },
              {
                icon: 'update',
                tag: 'Update',
                title: 'Pembaruan Materi & Rekaman Rutin Gratis',
                desc: 'Setiap kali kurikulum diperbarui atau ada tambahan studi kasus baru, Anda langsung mendapatkannya gratis.'
              }
            ]
          }
        },
        sec_disclaimer: {
          section_id: 'sec_disclaimer',
          section_title: 'Ketentuan Lisensi & Anti-Pembajakan',
          section_subtitle: 'Langkah 05',
          content_body: 'Seluruh video materi, modul panduan, dokumen template, serta kode token akses di halaman ini dilindungi oleh Undang-Undang Hak Cipta No. 28 Tahun 2014 Republik Indonesia. Dilarang keras menyebarluaskan, membagikan akses secara gratis, mengunggah ulang ke drive publik, atau memperjualbelikan kembali (resell) tanpa izin tertulis resmi.',
          cta_label: '',
          cta_url: '',
          is_active: true,
          updated_at: now,
          metadata: {
            badge_text: 'Peringatan Hak Cipta & Lisensi Resmi',
            headline: 'Larangan Keras Menyebarluaskan / Menjual Kembali Tanpa Izin',
            points: [
              'Dilarang keras menyebarkan link portal, token akses, atau rekaman materi ke pihak ketiga / cloud publik.',
              'Pelanggaran lisensi akan berakibat pencabutan hak akses secara permanen tanpa pengembalian dana serta proses hukum yang berlaku.'
            ]
          }
        },
        sec_closing: {
          section_id: 'sec_closing',
          section_title: 'Selamat Bergabung & Terus Semangat Meng-Upgrade Ilmu!',
          section_subtitle: 'Langkah 06',
          content_body: '“Investasi leher ke atas adalah langkah paling menguntungkan yang pernah Anda ambil. Nikmati setiap proses belajarnya, praktekkan ilmunya secara konsisten, dan mari bertumbuh bersama menuju pencapaian baru!”',
          cta_label: 'Unduh Rangkuman PDF',
          cta_url: '',
          is_active: true,
          updated_at: now,
          metadata: {
            eyebrow: 'Ucapan Selamat Bergabung dari Mentor',
            helper_text: 'Simpan halaman ini di bookmark browser Anda atau cetak rangkuman panduan PDF agar mudah diakses kapan saja.'
          }
        }
      },
      tokens: [
        {
          token_id: 'TOK-UTAMA01',
          token_code: 'KELASPRO-2026-VIP',
          token_label: 'Akses Modul Utama Kelas',
          tab_badge: 'Token Utama',
          description: 'Salin dan tempelkan kode ini saat masuk ke Portal Kelas untuk membuka seluruh modul video.',
          batch_info: 'Batch Resmi Lynk.id',
          quota_limit: 0,
          copy_count: 18,
          is_active: true,
          created_at: now
        },
        {
          token_id: 'TOK-BONUS02',
          token_code: 'BONUS-TEMPLATE-KIT',
          token_label: 'Akses Kit Template & Resource',
          tab_badge: 'Token Bonus',
          description: 'Gunakan kode akses ini untuk membuka folder bonus template kerja pendukung.',
          batch_info: 'Lifetime Bonus',
          quota_limit: 0,
          copy_count: 11,
          is_active: true,
          created_at: now
        }
      ],
      tutorials: [
        {
          video_id: 'VID-GUIDE01',
          youtube_url: 'https://www.youtube.com/watch?v=M7lc1UVf-VE',
          youtube_id: 'M7lc1UVf-VE',
          title: '1. Panduan Masuk Portal, Cara Salin Token & Aktivasi Kelas',
          description: 'Langkah demi langkah cara menggunakan token akses dan memulai modul pertama Anda.',
          duration: '06:30',
          badge_label: 'Wajib Ditonton',
          timecodes: [
            { time: '00:30', label: 'Cara Salin Token Akses' },
            { time: '02:15', label: 'Login & Aktivasi di Portal' },
            { time: '04:45', label: 'Navigasi Modul Kelas' }
          ],
          views_count: 42,
          sort_order: 1,
          is_active: true,
          created_at: now
        },
        {
          video_id: 'VID-GUIDE02',
          youtube_url: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
          youtube_id: 'ysz5S6PUM-U',
          title: '2. Panduan Gabung Grup Diskusi & Etika Komunitas',
          description: 'Penjelasan alur bertanya di grup WhatsApp, arsip materi di Telegram, dan jadwal sesi live.',
          duration: '04:45',
          badge_label: 'Rekomendasi',
          timecodes: [
            { time: '00:20', label: 'Perbedaan Grup WA & Telegram' },
            { time: '02:10', label: 'Format Bertanya ke Mentor' }
          ],
          views_count: 27,
          sort_order: 2,
          is_active: true,
          created_at: now
        },
        {
          video_id: 'VID-GUIDE03',
          youtube_url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
          youtube_id: 'aqz-KE-bpKQ',
          title: '3. Penjelasan Hak Paket, Lisensi & Ketentuan Anti-Pembajakan',
          description: 'Penting dipahami oleh seluruh member baru mengenai batasan penggunaan aset digital kelas.',
          duration: '05:15',
          badge_label: 'Ketentuan',
          timecodes: [
            { time: '00:40', label: 'Hak Penggunaan Pribadi' },
            { time: '03:00', label: 'Larangan Resell & Re-upload' }
          ],
          views_count: 19,
          sort_order: 3,
          is_active: true,
          created_at: now
        }
      ],
      authConfig: {
        googleClientId: '',
        hasOAuth: false,
        emergencyLocked: false
      }
    };
  }

  // State Aplikasi Terpusat
  const state = {
    pub: getDefaultBootData(),
    activeVideoIdx: 0,
    activeVideoStartSec: 0,
    activeVideoAutoplay: false,
    anabulOn: localStorage.getItem(STORAGE_KEYS.ANABUL_ACTIVE) !== '0',
    sessionToken: localStorage.getItem(STORAGE_KEYS.SESSION_TOKEN) || '',
    adminUser: null,
    isDemoAdmin: false,
    adminData: {
      sections: {},
      tokens: [],
      tutorials: [],
      analytics: {
        kpis: {
          pageViews: 48, tokenCopies: 29, portalClicks: 34,
          communityClicks: 22, waClicks: 15, tgClicks: 7,
          socialClicks: 18, igClicks: 9, ytClicks: 5, ttClicks: 4,
          videoPlays: 88, mobilePercent: 79
        },
        dailySeries: [
          { label: 'H-6', views: 5, copies: 3 },
          { label: 'H-5', views: 8, copies: 5 },
          { label: 'H-4', views: 6, copies: 4 },
          { label: 'H-3', views: 9, copies: 6 },
          { label: 'H-2', views: 7, copies: 4 },
          { label: 'Kemarin', views: 11, copies: 7 },
          { label: 'Hari Ini', views: 14, copies: 9 }
        ],
        recentLogs: []
      },
      secretsStatus: {}
    },
    activeAdminTab: 'analytics',
    activeCmsSub: 'sec_greeting',
    logsPage: 1,
    shieldClicks: 0,
    shieldTimer: null
  };

  // ==========================================================================
  // 1. HELPER UMUM & SANITASI HTML
  // ==========================================================================
  function $(id) { return document.getElementById(id); }

  function escHtml(str) {
    return String(str === undefined || str === null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function isGasConfigured() {
    return typeof GAS_URL === 'string' &&
      GAS_URL.trim().indexOf('https://script.google.com/macros/s/') === 0;
  }

  function extractYtId(urlOrId) {
    const s = String(urlOrId || '').trim();
    if (!s) return '';
    if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/|youtube-nocookie\.com\/embed\/)([A-Za-z0-9_-]{11})/,
      /[?&]v=([A-Za-z0-9_-]{11})/
    ];
    for (let i = 0; i < patterns.length; i++) {
      const m = s.match(patterns[i]);
      if (m && m[1]) return m[1];
    }
    return '';
  }

  function parseTimeToSeconds(tc) {
    const parts = String(tc || '0:00').trim().split(':').map(Number);
    if (parts.length === 3) return (parts[0] * 3600) + (parts[1] * 60) + (parts[2] || 0);
    if (parts.length === 2) return (parts[0] * 60) + (parts[1] || 0);
    return Number(parts[0]) || 0;
  }

  function detectDeviceLabel() {
    const ua = navigator.userAgent || '';
    let os = 'Desktop';
    if (/iPhone|iPad/i.test(ua)) os = 'iPhone / iOS';
    else if (/Android/i.test(ua)) os = 'Android Mobile';
    else if (/Mac OS/i.test(ua)) os = 'macOS';
    else if (/Windows/i.test(ua)) os = 'Windows PC';

    let br = 'Browser';
    if (/Edg\//i.test(ua)) br = 'Edge';
    else if (/Chrome\//i.test(ua)) br = 'Chrome';
    else if (/Safari\//i.test(ua) && !/Chrome/i.test(ua)) br = 'Safari';
    else if (/Firefox\//i.test(ua)) br = 'Firefox';
    return os + ' • ' + br;
  }

  let toastTimeout = null;
  function showToast(msg, isError) {
    const el = $('global-toast');
    const msgEl = $('global-toast-msg');
    const iconEl = $('global-toast-icon');
    if (!el || !msgEl) return;

    msgEl.textContent = msg;
    if (iconEl) {
      iconEl.textContent = isError ? 'error' : 'check_circle';
      iconEl.className = 'material-symbols-outlined text-[22px] ' + (isError ? 'text-error' : 'text-tertiary');
    }
    el.classList.remove('translate-y-24', 'opacity-0');
    el.classList.add('translate-y-0', 'opacity-100');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(function () {
      el.classList.remove('translate-y-0', 'opacity-100');
      el.classList.add('translate-y-24', 'opacity-0');
    }, 3000);
  }

  // ==========================================================================
  // 2. LAYER KOMUNIKASI REST API (GAS-PRO-API + SCALE TURBO DEDUPLICATION)
  // ==========================================================================
  const _inflight = {};
  let _writeEpoch = 0;

  async function apiRun(action, data, useGet) {
    if (!isGasConfigured()) {
      throw new Error('GAS_URL belum dikonfigurasi di js/config.js');
    }
    let res;
    if (useGet) {
      const qs = new URLSearchParams({ action: action });
      res = await fetch(GAS_URL + '?' + qs.toString(), { method: 'GET' });
    } else {
      // WAJIB text/plain;charset=utf-8 agar bebas masalah CORS Preflight pada GAS!
      res = await fetch(GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: action,
          data: data || {},
          token: state.sessionToken || ''
        })
      });
    }
    const json = await res.json();
    if (typeof json.ms === 'number') {
      const pill = $('admin-latency-pill');
      if (pill) pill.textContent = '⚡ ' + json.ms + ' ms' + (json.cached ? ' (CacheX)' : '');
    }
    if (!json.success) {
      throw new Error(json.message || 'Permintaan ke server gagal.');
    }
    return json;
  }

  async function api(action, data, opts) {
    opts = opts || {};
    const isRead = /^(public\.boot|auth\.config|admin\.boot|ping)$/i.test(action);
    if (!isRead) {
      _writeEpoch++;
      return apiRun(action, data, false);
    }
    const key = _writeEpoch + '|' + action + '|' + JSON.stringify(data || {});
    if (_inflight[key]) return _inflight[key];

    const p = apiRun(action, data, !!opts.get);
    _inflight[key] = p;
    p.then(function () { delete _inflight[key]; }, function () { delete _inflight[key]; });
    return p;
  }

  // Pelacakan Analitik Asynchronous Non-Blocking (Tidak pernah menghambat UI pembeli!)
  function trackEvent(eventType, target, extra) {
    extra = extra || {};
    if (!isGasConfigured()) return;
    const payload = {
      event_type: eventType,
      event_target: target || '-',
      device_info: detectDeviceLabel(),
      token_id: extra.token_id || '',
      video_id: extra.video_id || ''
    };
    fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'public.track', data: payload })
    }).catch(function () { /* non-blocking */ });
  }

  // ==========================================================================
  // 3. CUSTOM MAGNETIC CURSOR & KUCING IMUT ANABUL PENGIKUT KURSOR
  // ==========================================================================
  let anabulExcitedTimer = null;

  function celebrateAnabul(bubbleMsg) {
    const escort = $('anabul-cursor-escort');
    if (escort) {
      escort.classList.add('anabul-excited');
      clearTimeout(anabulExcitedTimer);
      anabulExcitedTimer = setTimeout(function () {
        escort.classList.remove('anabul-excited');
      }, 1500);
    }
    if (bubbleMsg) {
      const bText = $('anabul-bubble-text');
      const bWrap = $('anabul-corner-bubble');
      if (bText) bText.textContent = bubbleMsg;
      if (bWrap) bWrap.classList.remove('hidden');
    }
  }

  function applyAnabulVisibility() {
    const escort = $('anabul-cursor-escort');
    const lbl = $('anabul-toggle-label');
    const secGreet = (state.pub.sections && state.pub.sections.sec_greeting) || {};
    const adminAllows = !(secGreet.metadata && secGreet.metadata.anabul_enabled === false);
    const show = state.anabulOn && adminAllows;

    if (escort) escort.style.opacity = show ? '1' : '0';
    if (lbl) lbl.textContent = state.anabulOn ? 'Anabul Aktif' : 'Anabul Tidur';
  }

  function initCursorAndAnabul() {
    const dot = $('pr-cursor-dot');
    const ring = $('pr-cursor-ring');
    const escort = $('anabul-cursor-escort');
    const pupils = $('anabul-pupils');
    if (!dot || !ring || !escort) return;

    const finePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!finePointer) return;

    let mouseX = window.innerWidth * 0.7;
    let mouseY = window.innerHeight * 0.35;
    let ringX = mouseX, ringY = mouseY;
    let catX = mouseX + 26, catY = mouseY + 22;

    window.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = 'translate3d(' + mouseX + 'px, ' + mouseY + 'px, 0)';

      const target = e.target;
      const interactive = target && target.closest && target.closest('a, button, input, select, textarea, [data-interactive]');
      if (interactive) {
        document.body.classList.add('cursor-hover');
      } else {
        document.body.classList.remove('cursor-hover');
      }
    }, { passive: true });

    function animateLoop() {
      // Smooth Magnetic Ring
      ringX += (mouseX - ringX) * 0.24;
      ringY += (mouseY - ringY) * 0.24;
      ring.style.transform = 'translate3d(' + ringX.toFixed(1) + 'px, ' + ringY.toFixed(1) + 'px, 0)';

      // Smooth Lerp Physics untuk Kucing Imut Anabul (offset sedikit di kanan-bawah kursor agar tidak menghalangi teks)
      const targetCatX = mouseX + 22;
      const targetCatY = mouseY + 16;
      const dx = targetCatX - catX;
      const dy = targetCatY - catY;
      catX += dx * 0.085;
      catY += dy * 0.085;

      const tilt = Math.max(-12, Math.min(12, dx * 0.14));
      escort.style.transform = 'translate3d(' + catX.toFixed(1) + 'px, ' + catY.toFixed(1) + 'px, 0) rotate(' + tilt.toFixed(1) + 'deg)';

      // Lirikan pupil mata kucing mengikuti arah kursor
      if (pupils) {
        const px = Math.max(-2.2, Math.min(2.2, dx * 0.04));
        const py = Math.max(-1.8, Math.min(1.8, dy * 0.04));
        pupils.setAttribute('transform', 'translate(' + px.toFixed(1) + ',' + py.toFixed(1) + ')');
      }

      requestAnimationFrame(animateLoop);
    }
    requestAnimationFrame(animateLoop);
    applyAnabulVisibility();
  }

  // ==========================================================================
  // 4. RENDERER HALAMAN PUBLIK (CUSTOMER ONBOARDING PORTAL)
  // ==========================================================================
  function renderPublicPortal() {
    const secs = state.pub.sections || {};
    const tokens = Array.isArray(state.pub.tokens) ? state.pub.tokens : [];
    const tutorials = Array.isArray(state.pub.tutorials) ? state.pub.tutorials : [];

    // --- A. HERO & BRANDING (sec_greeting) ---
    const sGreet = secs.sec_greeting || {};
    const mGreet = sGreet.metadata || {};
    const brandName = mGreet.brand_name || 'ProductReceiver';
    if ($('nav-brand-name')) $('nav-brand-name').textContent = brandName;
    if ($('footer-brand-label')) $('footer-brand-label').textContent = brandName + ' • Official Digital Product Handover Portal';
    if ($('nav-verified-pill') && mGreet.verified_pill) {
      $('nav-verified-pill').querySelector('span:last-child').textContent = mGreet.verified_pill;
    }

    const heroSec = $('hero-section');
    if (heroSec) heroSec.classList.toggle('hidden', sGreet.is_active === false);
    if ($('hero-badge-text')) $('hero-badge-text').textContent = mGreet.hero_badge || 'Portal Serah Terima Resmi Lynk.id';
    if ($('hero-title-main')) $('hero-title-main').textContent = sGreet.section_title || 'Terima Kasih Atas Pembelian Anda!';
    if ($('hero-title-highlight')) $('hero-title-highlight').textContent = sGreet.section_subtitle || 'Selamat Datang di Kelas Eksklusif';
    if ($('hero-body-text')) $('hero-body-text').textContent = sGreet.content_body || '';
    if ($('hero-rating-text')) $('hero-rating-text').textContent = mGreet.rating_text || '500+ Alumni Puas';
    if ($('hero-extra-count')) $('hero-extra-count').textContent = mGreet.extra_count || '+480';
    if ($('anabul-bubble-title') && mGreet.anabul_greeting) $('anabul-bubble-title').textContent = mGreet.anabul_greeting;
    if ($('anabul-bubble-text') && mGreet.anabul_subtext) $('anabul-bubble-text').textContent = mGreet.anabul_subtext;
    applyAnabulVisibility();

    // --- B. MULTI-VIDEO YOUTUBE TUTORIALS (sec_tutorials + tbl_tutorials) ---
    const sTut = secs.sec_tutorials || {};
    const mTut = sTut.metadata || {};
    const tutSecEl = $('video-panduan');
    const showTut = sTut.is_active !== false && tutorials.length > 0;
    if (tutSecEl) tutSecEl.classList.toggle('hidden', !showTut);

    if (showTut) {
      if ($('tut-sec-subtitle')) $('tut-sec-subtitle').textContent = sTut.section_subtitle || 'Video Orientasi • Wajib Tonton';
      if ($('tut-sec-title')) $('tut-sec-title').textContent = sTut.section_title || 'Video Panduan Orientasi Member';
      if ($('tut-box-title')) $('tut-box-title').textContent = mTut.box_title || 'Pusat Tutorial & Panduan Visual Resmi';
      if ($('tut-sec-body')) $('tut-sec-body').textContent = sTut.content_body || '';
      if ($('tut-count-badge')) $('tut-count-badge').textContent = tutorials.length + ' Video Tutorial Tersedia';

      const playlistUrl = mTut.playlist_url || sTut.cta_url || '';
      const ctaWrap = $('yt-playlist-cta-wrap');
      if (ctaWrap) {
        ctaWrap.classList.toggle('hidden', !playlistUrl);
        if ($('yt-playlist-cta')) $('yt-playlist-cta').href = playlistUrl || '#';
        if ($('yt-playlist-cta-label')) $('yt-playlist-cta-label').textContent = sTut.cta_label || 'Buka Seluruh Playlist di YouTube';
      }

      if (state.activeVideoIdx >= tutorials.length) state.activeVideoIdx = 0;
      renderActiveYoutubePlayer(tutorials);
    }

    // --- C. SECTION 1: PORTAL KELAS & MULTI-TOKEN AKSES (sec_portal + tbl_tokens) ---
    const sPortal = secs.sec_portal || {};
    const mPortal = sPortal.metadata || {};
    const portalEl = $('portal-section');
    if (portalEl) portalEl.classList.toggle('hidden', sPortal.is_active === false);

    const portalUrl = sPortal.cta_url || 'https://lynk.id';
    if ($('portal-sec-subtitle')) $('portal-sec-subtitle').textContent = sPortal.section_subtitle || 'Langkah 01';
    if ($('portal-sec-title')) $('portal-sec-title').textContent = sPortal.section_title || 'Masuk Portal Kelas & Salin Token Akses';
    if ($('portal-banner-badge')) $('portal-banner-badge').textContent = mPortal.banner_badge || 'Direct Link Learning Management System';
    if ($('portal-banner-title')) $('portal-banner-title').textContent = mPortal.banner_title || 'Akses Portal Belajar Utama';
    if ($('portal-sec-body')) $('portal-sec-body').textContent = sPortal.content_body || '';
    if ($('portal-cta-label')) $('portal-cta-label').textContent = sPortal.cta_label || 'BUKA PORTAL KELAS SEKARANG';
    if ($('portal-main-cta')) $('portal-main-cta').href = portalUrl;
    if ($('mobile-btn-portal')) $('mobile-btn-portal').href = portalUrl;
    if ($('btn-show-portal-qr')) $('btn-show-portal-qr').classList.toggle('hidden', mPortal.show_qr === false);

    const tokGrid = $('public-tokens-grid');
    if (tokGrid) {
      if (tokens.length === 0) {
        tokGrid.innerHTML = '<div class="col-span-full nimbus-card rounded-3xl p-6 text-center text-sm text-on-surface-variant">Belum ada token aktif yang ditampilkan oleh Admin. Silakan langsung klik tombol Buka Portal di atas.</div>';
      } else {
        const icons = ['key', 'folder_special', 'confirmation_number', 'workspace_premium'];
        tokGrid.innerHTML = tokens.map(function (tk, idx) {
          const ic = icons[idx % icons.length];
          return '' +
            '<div class="flex flex-col" data-interactive="true">' +
              '<div class="folder-tab-header self-start">' +
                '<span class="material-symbols-outlined text-[14px]">sell</span>' +
                '<span>' + escHtml(tk.tab_badge || 'Token Akses') + '</span>' +
              '</div>' +
              '<div class="nimbus-card p-6 rounded-b-3xl rounded-tr-3xl flex-1 flex flex-col justify-between space-y-4">' +
                '<div>' +
                  '<div class="flex items-start justify-between gap-2">' +
                    '<h4 class="text-lg font-bold text-on-surface">' + escHtml(tk.token_label) + '</h4>' +
                    '<span class="material-symbols-outlined text-sky-400 shrink-0">' + ic + '</span>' +
                  '</div>' +
                  '<p class="text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">' + escHtml(tk.description || 'Salin kode ini dan tempelkan pada halaman aktivasi portal kelas.') + '</p>' +
                '</div>' +
                '<div class="bg-surface-container-low p-3 rounded-2xl border border-dashed border-sky-200 flex items-center justify-between gap-2">' +
                  '<span class="font-mono text-xs sm:text-sm font-bold text-primary tracking-wider truncate select-all">' + escHtml(tk.token_code) + '</span>' +
                  '<button type="button" data-copy-code="' + escHtml(tk.token_code) + '" data-token-id="' + escHtml(tk.token_id) + '" class="btn-public-copy nimbus-btn px-3.5 py-2 bg-primary text-white hover:bg-primary-container rounded-full text-xs font-bold flex items-center gap-1 shrink-0 shadow-xs">' +
                    '<span class="material-symbols-outlined text-[14px]">content_copy</span>' +
                    '<span>Salin</span>' +
                  '</button>' +
                '</div>' +
                '<div class="flex items-center justify-between text-[11px] text-outline">' +
                  '<span class="inline-flex items-center gap-1 text-tertiary font-bold"><span class="w-1.5 h-1.5 rounded-full bg-tertiary"></span>Aktif</span>' +
                  '<span>' + escHtml(tk.batch_info || 'Resmi Lynk.id') + '</span>' +
                '</div>' +
              '</div>' +
            '</div>';
        }).join('');
      }
    }

    // --- D. SECTION 2: KOMUNITAS WA & TELEGRAM (sec_community) ---
    const sComm = secs.sec_community || {};
    const mComm = sComm.metadata || {};
    const commEl = $('komunitas');
    if (commEl) commEl.classList.toggle('hidden', sComm.is_active === false);
    if ($('comm-sec-subtitle')) $('comm-sec-subtitle').textContent = sComm.section_subtitle || 'Langkah 02';
    if ($('comm-sec-title')) $('comm-sec-title').textContent = sComm.section_title || 'Bergabung ke Wadah Komunitas Resmi';
    if ($('comm-sec-body')) $('comm-sec-body').textContent = sComm.content_body || '';

    const commGrid = $('public-community-grid');
    if (commGrid) {
      const cardsHtml = [];
      const wa = mComm.wa || {};
      const tg = mComm.tg || {};

      if (wa.enabled !== false) {
        const waBullets = Array.isArray(wa.bullets) ? wa.bullets : [];
        cardsHtml.push(
          '<div class="flex flex-col">' +
            '<div class="folder-tab-header self-start">' + escHtml(wa.tab_label || 'Grup Diskusi & Networking') + '</div>' +
            '<div class="nimbus-card p-6 sm:p-8 rounded-b-3xl rounded-tr-3xl flex-1 flex flex-col justify-between space-y-5">' +
              '<div class="space-y-3">' +
                '<div class="w-12 h-12 rounded-2xl bg-emerald-50 text-tertiary flex items-center justify-center border border-emerald-200/60">' +
                  '<span class="material-symbols-outlined text-[26px]">chat</span>' +
                '</div>' +
                '<h3 class="text-xl sm:text-2xl font-bold text-on-surface">' + escHtml(wa.title || 'WhatsApp Community VIP') + '</h3>' +
                '<p class="text-sm text-on-surface-variant leading-relaxed">' + escHtml(wa.description || '') + '</p>' +
                '<ul class="space-y-2 pt-1">' +
                  waBullets.map(function (b) {
                    return '<li class="flex items-start gap-2 text-xs sm:text-sm text-on-surface"><span class="material-symbols-outlined text-[18px] text-tertiary shrink-0">check_circle</span><span>' + escHtml(b) + '</span></li>';
                  }).join('') +
                '</ul>' +
              '</div>' +
              '<a href="' + escHtml(wa.cta_url || 'https://chat.whatsapp.com/') + '" target="_blank" rel="noopener noreferrer" data-track-type="JOIN_WA" data-track-target="' + escHtml(wa.title || 'WhatsApp Group') + '" class="btn-tracked-link nimbus-btn w-full py-3.5 px-6 rounded-full bg-tertiary text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md">' +
                '<span>' + escHtml(wa.cta_label || 'Gabung WhatsApp Group') + '</span>' +
                '<span class="material-symbols-outlined text-[18px]">arrow_forward</span>' +
              '</a>' +
            '</div>' +
          '</div>'
        );
      }

      if (tg.enabled !== false) {
        const tgBullets = Array.isArray(tg.bullets) ? tg.bullets : [];
        cardsHtml.push(
          '<div class="flex flex-col">' +
            '<div class="folder-tab-header self-start">' + escHtml(tg.tab_label || 'Channel Broadcast Modul') + '</div>' +
            '<div class="nimbus-card p-6 sm:p-8 rounded-b-3xl rounded-tr-3xl flex-1 flex flex-col justify-between space-y-5">' +
              '<div class="space-y-3">' +
                '<div class="w-12 h-12 rounded-2xl bg-sky-50 text-secondary flex items-center justify-center border border-sky-200/60">' +
                  '<span class="material-symbols-outlined text-[26px]">send</span>' +
                '</div>' +
                '<h3 class="text-xl sm:text-2xl font-bold text-on-surface">' + escHtml(tg.title || 'Telegram Broadcast Channel') + '</h3>' +
                '<p class="text-sm text-on-surface-variant leading-relaxed">' + escHtml(tg.description || '') + '</p>' +
                '<ul class="space-y-2 pt-1">' +
                  tgBullets.map(function (b) {
                    return '<li class="flex items-start gap-2 text-xs sm:text-sm text-on-surface"><span class="material-symbols-outlined text-[18px] text-secondary shrink-0">check_circle</span><span>' + escHtml(b) + '</span></li>';
                  }).join('') +
                '</ul>' +
              '</div>' +
              '<a href="' + escHtml(tg.cta_url || 'https://t.me/') + '" target="_blank" rel="noopener noreferrer" data-track-type="JOIN_TG" data-track-target="' + escHtml(tg.title || 'Telegram Channel') + '" class="btn-tracked-link nimbus-btn w-full py-3.5 px-6 rounded-full bg-secondary text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md">' +
                '<span>' + escHtml(tg.cta_label || 'Join Telegram Channel') + '</span>' +
                '<span class="material-symbols-outlined text-[18px]">arrow_forward</span>' +
              '</a>' +
            '</div>' +
          '</div>'
        );
      }

      commGrid.className = cardsHtml.length === 1 ? 'grid grid-cols-1 max-w-2xl gap-6' : 'grid grid-cols-1 md:grid-cols-2 gap-6';
      commGrid.innerHTML = cardsHtml.join('');
    }

    // --- E. SECTION 3: MEDIA SOSIAL MENTOR (sec_social) ---
    const sSoc = secs.sec_social || {};
    const mSoc = sSoc.metadata || {};
    const socEl = $('medsos');
    if (socEl) socEl.classList.toggle('hidden', sSoc.is_active === false);
    if ($('soc-sec-subtitle')) $('soc-sec-subtitle').textContent = sSoc.section_subtitle || 'Langkah 03';
    if ($('soc-sec-title')) $('soc-sec-title').textContent = sSoc.section_title || 'Terhubung di Media Sosial Mentor';
    if ($('soc-sec-body')) $('soc-sec-body').textContent = sSoc.content_body || '';

    const socGrid = $('public-social-grid');
    if (socGrid) {
      const channels = Array.isArray(mSoc.channels) ? mSoc.channels : [];
      const styleMap = {
        instagram: { ring: 'from-amber-400 via-pink-500 to-purple-600', icon: 'photo_camera', btn: 'bg-pink-50 hover:bg-pink-100 text-pink-700 border-pink-200' },
        youtube:   { ring: 'from-red-500 to-red-700', icon: 'smart_display', btn: 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200' },
        tiktok:    { ring: 'from-slate-800 via-slate-900 to-cyan-500', icon: 'music_note', btn: 'bg-slate-100 hover:bg-slate-200 text-slate-900 border-slate-300' }
      };
      socGrid.innerHTML = channels.map(function (ch) {
        const key = String(ch.platform || 'instagram').toLowerCase();
        const st = styleMap[key] || styleMap.instagram;
        return '' +
          '<div class="nimbus-card p-6 rounded-3xl flex flex-col items-center text-center justify-between space-y-4">' +
            '<div class="space-y-3 flex flex-col items-center">' +
              '<div class="w-16 h-16 rounded-2xl bg-gradient-to-tr ' + st.ring + ' p-0.5 shadow-md">' +
                '<div class="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-on-surface">' +
                  '<span class="material-symbols-outlined text-[30px]">' + st.icon + '</span>' +
                '</div>' +
              '</div>' +
              '<div>' +
                '<h4 class="text-lg font-bold text-on-surface">' + escHtml(ch.name || ch.platform) + '</h4>' +
                '<p class="text-xs font-bold text-primary">' + escHtml(ch.handle || '') + '</p>' +
              '</div>' +
              '<p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed">' + escHtml(ch.pitch || '') + '</p>' +
            '</div>' +
            '<a href="' + escHtml(ch.url || '#') + '" target="_blank" rel="noopener noreferrer" data-track-type="FOLLOW_SOCMED" data-track-target="' + escHtml((ch.platform || '') + ': ' + (ch.handle || ch.name || '')) + '" class="btn-tracked-link nimbus-btn w-full py-2.5 px-5 rounded-full border text-xs font-extrabold flex items-center justify-center gap-1.5 ' + st.btn + '">' +
              '<span>' + escHtml(ch.cta_label || 'Follow Sekarang') + '</span>' +
              '<span class="material-symbols-outlined text-[15px]">open_in_new</span>' +
            '</a>' +
          '</div>';
      }).join('');
    }

    // --- F. SECTION 4: RINCIAN HAK PAKET & FASILITAS (sec_benefits) ---
    const sBen = secs.sec_benefits || {};
    const mBen = sBen.metadata || {};
    const benEl = $('hak-paket');
    if (benEl) benEl.classList.toggle('hidden', sBen.is_active === false);
    if ($('ben-sec-subtitle')) $('ben-sec-subtitle').textContent = sBen.section_subtitle || 'Langkah 04';
    if ($('ben-sec-title')) $('ben-sec-title').textContent = sBen.section_title || 'Rincian Hak & Fasilitas Sesuai Paket';
    if ($('ben-status-pill')) $('ben-status-pill').textContent = mBen.status_pill || 'Terkonfirmasi Pembayaran Lynk.id';
    if ($('ben-package-title')) $('ben-package-title').textContent = mBen.package_title || 'Paket Membership: Lifetime All-Access VIP';
    if ($('ben-sec-body')) $('ben-sec-body').textContent = sBen.content_body || '';
    if ($('ben-license-badge')) $('ben-license-badge').textContent = mBen.license_badge || 'Single Seat Licensed';

    const benGrid = $('public-benefits-grid');
    if (benGrid) {
      const items = Array.isArray(mBen.items) ? mBen.items : [];
      benGrid.innerHTML = items.map(function (it) {
        return '' +
          '<div class="flex items-start gap-3.5 p-4 rounded-2xl bg-surface-container-low/75 hover:bg-surface-container-low border border-sky-100/80 transition">' +
            '<div class="w-9 h-9 rounded-xl bg-emerald-100/80 text-tertiary flex items-center justify-center shrink-0 mt-0.5">' +
              '<span class="material-symbols-outlined text-[20px]">' + escHtml(it.icon || 'check_circle') + '</span>' +
            '</div>' +
            '<div class="flex-1">' +
              '<div class="flex items-center justify-between gap-2">' +
                '<h5 class="text-sm sm:text-base font-bold text-on-surface">' + escHtml(it.title || '') + '</h5>' +
                (it.tag ? '<span class="px-2 py-0.5 rounded-md bg-white text-primary text-[10px] font-bold border border-sky-100 shrink-0">' + escHtml(it.tag) + '</span>' : '') +
              '</div>' +
              '<p class="text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">' + escHtml(it.desc || '') + '</p>' +
            '</div>' +
          '</div>';
      }).join('');
    }

    // --- G. SECTION 5: DISCLAIMER HAK CIPTA & ANTI-PEMBAJAKAN (sec_disclaimer) ---
    const sDisc = secs.sec_disclaimer || {};
    const mDisc = sDisc.metadata || {};
    const discEl = $('disclaimer');
    if (discEl) discEl.classList.toggle('hidden', sDisc.is_active === false);
    if ($('disc-sec-subtitle')) $('disc-sec-subtitle').textContent = sDisc.section_subtitle || 'Langkah 05';
    if ($('disc-sec-title')) $('disc-sec-title').textContent = sDisc.section_title || 'Ketentuan Lisensi & Anti-Pembajakan';
    if ($('disc-badge-text')) $('disc-badge-text').textContent = mDisc.badge_text || 'Peringatan Hak Cipta & Lisensi Resmi';
    if ($('disc-headline')) $('disc-headline').textContent = mDisc.headline || 'Larangan Keras Menyebarluaskan / Menjual Kembali Tanpa Izin';
    if ($('disc-sec-body')) $('disc-sec-body').textContent = sDisc.content_body || '';

    const discList = $('disc-points-list');
    if (discList) {
      const pts = Array.isArray(mDisc.points) ? mDisc.points : [];
      discList.innerHTML = pts.map(function (pt, idx) {
        const ic = idx % 2 === 0 ? 'block' : 'gavel';
        return '' +
          '<div class="flex items-start gap-2 p-3 rounded-2xl bg-white/80 border border-red-200/70 text-xs font-semibold text-on-surface">' +
            '<span class="material-symbols-outlined text-error text-[18px] shrink-0">' + ic + '</span>' +
            '<span>' + escHtml(pt) + '</span>' +
          '</div>';
      }).join('');
    }

    // --- H. SECTION 6: UCAPAN SELAMAT BERGABUNG & MOTIVASI (sec_closing) ---
    const sClose = secs.sec_closing || {};
    const mClose = sClose.metadata || {};
    const closeEl = $('penutup');
    if (closeEl) closeEl.classList.toggle('hidden', sClose.is_active === false);
    if ($('close-sec-subtitle')) $('close-sec-subtitle').textContent = sClose.section_subtitle || 'Langkah 06';
    if ($('close-sec-title')) $('close-sec-title').textContent = sClose.section_title || 'Selamat Bergabung & Terus Semangat Meng-Upgrade Ilmu!';
    if ($('close-eyebrow')) $('close-eyebrow').textContent = mClose.eyebrow || 'Ucapan Selamat Bergabung dari Mentor';
    if ($('close-sec-body')) $('close-sec-body').textContent = sClose.content_body || '';
    if ($('close-helper-text')) $('close-helper-text').textContent = mClose.helper_text || '';
    if ($('close-cta-label')) $('close-cta-label').textContent = sClose.cta_label || 'Unduh Rangkuman PDF';
  }

  function renderActiveYoutubePlayer(tutorials) {
    const active = tutorials[state.activeVideoIdx] || tutorials[0];
    if (!active) return;

    const ytId = active.youtube_id || extractYtId(active.youtube_url);
    const wrap = $('yt-main-player-wrap');
    if (wrap) {
      if (ytId) {
        let embedSrc = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(ytId) + '?rel=0&modestbranding=1';
        if (state.activeVideoStartSec > 0) embedSrc += '&start=' + state.activeVideoStartSec;
        if (state.activeVideoAutoplay) embedSrc += '&autoplay=1';
        wrap.innerHTML = '<iframe src="' + embedSrc + '" title="' + escHtml(active.title) + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>';
      } else {
        wrap.innerHTML = '<div class="absolute inset-0 flex items-center justify-center text-white text-sm">Link video YouTube belum valid.</div>';
      }
    }

    if ($('yt-active-title')) $('yt-active-title').textContent = active.title || 'Video Panduan';
    if ($('yt-active-desc')) $('yt-active-desc').textContent = active.description || '';
    if ($('yt-open-direct')) {
      $('yt-open-direct').href = ytId ? ('https://www.youtube.com/watch?v=' + encodeURIComponent(ytId)) : (active.youtube_url || 'https://youtube.com');
    }

    // Render Timecodes
    const tcBox = $('yt-timecodes-box');
    const tcGrid = $('yt-timecodes-grid');
    const tcs = Array.isArray(active.timecodes) ? active.timecodes : [];
    if (tcBox && tcGrid) {
      tcBox.classList.toggle('hidden', tcs.length === 0);
      tcGrid.innerHTML = tcs.map(function (tc) {
        const sec = parseTimeToSeconds(tc.time);
        return '' +
          '<button type="button" data-jump-sec="' + sec + '" class="btn-yt-jump p-2.5 rounded-xl bg-white hover:bg-sky-50 border border-sky-100 flex items-center gap-2 text-left transition">' +
            '<span class="px-2 py-0.5 rounded bg-primary-fixed text-primary font-mono text-[11px] font-bold shrink-0">' + escHtml(tc.time) + '</span>' +
            '<span class="text-xs font-medium text-on-surface truncate">' + escHtml(tc.label) + '</span>' +
          '</button>';
      }).join('');
    }

    // Render Playlist Sidebar
    const plList = $('yt-playlist-list');
    if (plList) {
      plList.innerHTML = tutorials.map(function (vd, i) {
        const isCurrent = i === state.activeVideoIdx;
        const vidId = vd.youtube_id || extractYtId(vd.youtube_url);
        const thumbUrl = vidId ? ('https://i.ytimg.com/vi/' + encodeURIComponent(vidId) + '/mqdefault.jpg') : '';
        return '' +
          '<button type="button" data-play-idx="' + i + '" class="btn-yt-select w-full p-3 rounded-2xl text-left flex items-start gap-3 transition ' +
            (isCurrent ? 'bg-sky-100/80 ring-2 ring-primary/40' : 'bg-surface-container-low hover:bg-surface-container') + '">' +
            '<div class="relative w-24 h-14 rounded-xl overflow-hidden bg-slate-900 shrink-0">' +
              (thumbUrl ? '<img src="' + thumbUrl + '" alt="' + escHtml(vd.title) + '" class="w-full h-full object-cover" loading="lazy" />' : '') +
              '<span class="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 text-[10px] text-white font-mono rounded">' + escHtml(vd.duration || '05:00') + '</span>' +
            '</div>' +
            '<div class="flex-1 min-w-0">' +
              '<div class="flex items-center gap-1.5">' +
                (isCurrent ? '<span class="px-1.5 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold uppercase">Diputar</span>' : '') +
                '<span class="px-1.5 py-0.5 rounded bg-white text-primary text-[10px] font-bold border border-sky-100">' + escHtml(vd.badge_label || ('Video ' + (i + 1))) + '</span>' +
              '</div>' +
              '<h5 class="text-xs font-bold text-on-surface line-clamp-2 mt-1">' + escHtml(vd.title) + '</h5>' +
            '</div>' +
          '</button>';
      }).join('');
    }
  }

  function copyTokenCode(code, tokenId, btnEl) {
    const clean = String(code || '').trim();
    if (!clean) return;

    function onCopied() {
      showToast('Token "' + clean + '" Berhasil Disalin! 🎉');
      celebrateAnabul('Yeay! Token "' + clean + '" sudah tersalin! Sekarang klik Buka Portal Kelas ya! 🐾');
      trackEvent('COPY_TOKEN', clean, { token_id: tokenId || '' });

      if (btnEl) {
        const orig = btnEl.innerHTML;
        btnEl.innerHTML = '<span class="material-symbols-outlined text-[14px]">done</span><span>Tersalin!</span>';
        btnEl.classList.add('bg-tertiary');
        setTimeout(function () {
          btnEl.innerHTML = orig;
          btnEl.classList.remove('bg-tertiary');
        }, 2000);
      }
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(clean).then(onCopied).catch(function () {
        fallbackClipboard(clean);
        onCopied();
      });
    } else {
      fallbackClipboard(clean);
      onCopied();
    }
  }

  function fallbackClipboard(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) { /* abaikan */ }
    document.body.removeChild(ta);
  }


  // ==========================================================================
  // 5. AUTENTIKASI SUPER ADMIN (GOOGLE OAUTH 2.0 + JALUR DARURAT TERSEMBUNYI)
  // ==========================================================================
  function setAuthError(msg) {
    const box = $('auth-error-box');
    if (!box) return;
    if (!msg) {
      box.classList.add('hidden');
      box.textContent = '';
    } else {
      box.textContent = msg;
      box.classList.remove('hidden');
    }
  }

  function revealEmergencyForm() {
    const form = $('emergency-login-form');
    if (form) {
      form.classList.remove('hidden');
      const passIn = $('em-password-input');
      if (passIn) passIn.focus();
      showToast('Jalur Masuk Darurat Diaktifkan 🔐');
    }
  }

  function openAuthModal(forceEmergency) {
    // Jika sesi sudah aktif, langsung masuk ke Admin Panel
    if (state.sessionToken || state.isDemoAdmin) {
      showAdminView();
      return;
    }

    setAuthError('');
    const modal = $('auth-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');

    const unconfNotice = $('auth-unconfigured-notice');
    const oauthSec = $('oauth-signin-section');
    const gasReady = isGasConfigured();

    if (unconfNotice) unconfNotice.classList.toggle('hidden', gasReady);
    if (oauthSec) oauthSec.classList.toggle('hidden', !gasReady);

    if (forceEmergency) {
      revealEmergencyForm();
    }

    if (gasReady) {
      initGoogleOAuthButton();
    }
  }

  function closeAuthModal() {
    const modal = $('auth-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    setAuthError('');
  }

  function initGoogleOAuthButton() {
    const container = $('google-gsi-button-container');
    const hint = $('oauth-hint-text');
    if (!container) return;

    const authCfg = (state.pub && state.pub.authConfig) || {};
    const clientId = String(authCfg.googleClientId || '').trim();

    if (!clientId) {
      container.innerHTML =
        '<div class="w-full p-3.5 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-on-surface-variant text-center leading-relaxed">' +
          '<p class="font-bold text-primary mb-1">Google OAuth Client ID Belum Diisi</p>' +
          '<p>Klik <strong>5x pada ikon Perisai Biru</strong> di atas untuk masuk pertama kali lewat <strong>Jalur Darurat</strong>, lalu tempel Client ID Anda di menu Keamanan.</p>' +
        '</div>';
      return;
    }

    if (!(window.google && window.google.accounts && window.google.accounts.id)) {
      container.innerHTML = '<p class="text-xs text-outline py-2">Memuat pustaka Google Identity Services...</p>';
      setTimeout(initGoogleOAuthButton, 600);
      return;
    }

    container.innerHTML = '';
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handleGoogleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: true
    });

    window.google.accounts.id.renderButton(container, {
      theme: 'outline',
      size: 'large',
      shape: 'pill',
      text: 'signin_with',
      width: 320,
      logo_alignment: 'left'
    });

    if (hint) {
      hint.textContent = 'Diverifikasi langsung di server GAS melalui Google OAuth 2.0.';
    }
  }

  async function handleGoogleCredentialResponse(response) {
    if (!response || !response.credential) {
      setAuthError('Gagal membaca kredensial Google. Silakan coba lagi.');
      return;
    }
    setAuthError('');
    try {
      const res = await api('auth.google', { idToken: response.credential });
      onLoginSuccess(res.data, res.message);
    } catch (err) {
      setAuthError(err.message || 'Gagal memverifikasi login Google OAuth.');
    }
  }

  async function handleEmergencySubmit(e) {
    e.preventDefault();
    setAuthError('');

    if (!isGasConfigured()) {
      enterLocalDemoAdmin();
      return;
    }

    const username = ($('em-username-input') ? $('em-username-input').value : 'darurat').trim();
    const password = $('em-password-input') ? $('em-password-input').value : '';
    const btn = $('btn-submit-emergency');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Memverifikasi Hash HMAC...';
    }

    try {
      const res = await api('auth.emergency', { username: username, password: password });
      if ($('em-password-input')) $('em-password-input').value = '';
      onLoginSuccess(res.data, res.message);
    } catch (err) {
      setAuthError(err.message || 'Login jalur darurat ditolak.');
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Validasi & Masuk via Jalur Darurat';
      }
    }
  }

  function onLoginSuccess(authData, welcomeMsg) {
    state.isDemoAdmin = false;
    state.sessionToken = authData.token || '';
    state.adminUser = authData.user || { nama: 'Super Admin', email: '', darurat: false };
    localStorage.setItem(STORAGE_KEYS.SESSION_TOKEN, state.sessionToken);
    localStorage.setItem(STORAGE_KEYS.SESSION_USER, JSON.stringify(state.adminUser));

    closeAuthModal();
    showToast(welcomeMsg || 'Berhasil masuk ke Panel Super Admin!');
    showAdminView();
    loadAdminBoot();
  }

  function enterLocalDemoAdmin() {
    state.isDemoAdmin = true;
    state.adminUser = {
      nama: 'Creator (Mode Lokal)',
      email: 'pratinjau-lokal@productreceiver.app',
      picture: '',
      darurat: false
    };
    // Kloning data publik ke state admin agar seluruh editor langsung hidup
    state.adminData.sections = JSON.parse(JSON.stringify(state.pub.sections || {}));
    state.adminData.tokens = JSON.parse(JSON.stringify(state.pub.tokens || []));
    state.adminData.tutorials = JSON.parse(JSON.stringify(state.pub.tutorials || []));
    state.adminData.analytics.recentLogs = [
      { event_id: 'EVT-DEMO1', event_type: 'COPY_TOKEN', event_target: 'KELASPRO-2026-VIP', device_info: 'iPhone / iOS • Safari', status_label: 'Berhasil Disalin', timestamp: new Date().toISOString() },
      { event_id: 'EVT-DEMO2', event_type: 'WATCH_TUTORIAL', event_target: '1. Panduan Masuk Portal', device_info: 'Android Mobile • Chrome', status_label: 'Video Diputar', timestamp: new Date(Date.now() - 420000).toISOString() },
      { event_id: 'EVT-DEMO3', event_type: 'JOIN_WA', event_target: 'WhatsApp Community VIP', device_info: 'Windows PC • Chrome', status_label: 'Grup WA Terbuka', timestamp: new Date(Date.now() - 1200000).toISOString() },
      { event_id: 'EVT-DEMO4', event_type: 'CLICK_PORTAL', event_target: 'Portal Belajar Utama', device_info: 'macOS • Safari', status_label: 'Portal Terbuka', timestamp: new Date(Date.now() - 2800000).toISOString() }
    ];
    closeAuthModal();
    showToast('Mode Pratinjau Lokal Aktif — Silakan uji semua fitur CRUD!');
    showAdminView();
    renderAllAdminViews();
  }

  async function logoutAdmin() {
    if (isGasConfigured() && state.sessionToken) {
      try { await api('auth.logout', {}); } catch (e) { /* abaikan */ }
    }
    state.sessionToken = '';
    state.adminUser = null;
    state.isDemoAdmin = false;
    localStorage.removeItem(STORAGE_KEYS.SESSION_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.SESSION_USER);
    showPublicView();
    showToast('Sesi Super Admin telah diakhiri.');
  }

  // ==========================================================================
  // 6. SHELL SUPER ADMIN & SINKRONISASI DATA BACKEND
  // ==========================================================================
  function showAdminView() {
    if ($('public-view')) $('public-view').classList.add('hidden');
    if ($('admin-view')) $('admin-view').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderAdminProfileHeader();
    switchAdminTab(state.activeAdminTab || 'analytics');
  }

  function showPublicView() {
    if ($('admin-view')) $('admin-view').classList.add('hidden');
    if ($('public-view')) $('public-view').classList.remove('hidden');
    renderPublicPortal();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function toggleMobileSidebar(open) {
    const sb = $('admin-sidebar');
    const bd = $('admin-sidebar-backdrop');
    if (!sb || !bd) return;
    if (open) {
      sb.classList.remove('-translate-x-full');
      bd.classList.remove('hidden');
    } else {
      sb.classList.add('-translate-x-full');
      bd.classList.add('hidden');
    }
  }

  function switchAdminTab(tabName) {
    state.activeAdminTab = tabName;
    document.querySelectorAll('.admin-tab-pane').forEach(function (pane) {
      pane.classList.toggle('hidden', pane.id !== 'admin-tab-' + tabName);
    });

    document.querySelectorAll('.admin-nav-btn').forEach(function (btn) {
      const active = btn.getAttribute('data-admin-nav') === tabName;
      btn.className = 'admin-nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm transition ' +
        (active
          ? 'font-bold bg-sky-100/80 text-primary'
          : 'font-semibold text-on-surface-variant hover:bg-sky-50/70');
    });

    toggleMobileSidebar(false);
  }

  function renderAdminProfileHeader() {
    const u = state.adminUser || { nama: 'Super Admin', email: '', darurat: false };
    if ($('admin-user-name')) $('admin-user-name').textContent = u.nama || 'Super Admin';
    if ($('admin-user-email')) $('admin-user-email').textContent = u.email || (state.isDemoAdmin ? 'Mode Pratinjau Lokal' : 'Terautentikasi');

    const av = $('admin-avatar-box');
    if (av) {
      if (u.picture) {
        av.innerHTML = '<img src="' + escHtml(u.picture) + '" alt="Admin" class="w-full h-full object-cover" />';
      } else {
        const initials = String(u.nama || 'SA').split(' ').map(function (w) { return w[0]; }).join('').slice(0, 2).toUpperCase();
        av.textContent = initials || 'SA';
      }
    }

    const emBadge = $('admin-emergency-badge');
    if (emBadge) {
      emBadge.classList.toggle('hidden', !u.darurat);
      emBadge.classList.toggle('inline-flex', !!u.darurat);
    }
  }

  async function loadAdminBoot() {
    if (state.isDemoAdmin) {
      renderAllAdminViews();
      return;
    }
    if (!state.sessionToken) {
      showPublicView();
      openAuthModal(false);
      return;
    }

    const syncIcon = $('admin-sync-icon');
    if (syncIcon) syncIcon.classList.add('animate-spin');

    try {
      const res = await api('admin.boot', {});
      const d = res.data || {};
      if (d.user) {
        state.adminUser = d.user;
        localStorage.setItem(STORAGE_KEYS.SESSION_USER, JSON.stringify(d.user));
      }
      state.adminData.sections = d.sections || {};
      state.adminData.tokens = Array.isArray(d.tokens) ? d.tokens : [];
      state.adminData.tutorials = Array.isArray(d.tutorials) ? d.tutorials : [];
      state.adminData.analytics = d.analytics || state.adminData.analytics;
      state.adminData.secretsStatus = d.secretsStatus || {};

      // Sinkronkan juga ke state publik agar saat klik "Pratinjau Live" langsung mutakhir
      syncAdminStateToPublicPreview();
      renderAdminProfileHeader();
      renderAllAdminViews();
    } catch (err) {
      showToast(err.message || 'Sesi berakhir, silakan login kembali.', true);
      logoutAdmin();
    } finally {
      if (syncIcon) syncIcon.classList.remove('animate-spin');
    }
  }

  function syncAdminStateToPublicPreview() {
    state.pub.sections = JSON.parse(JSON.stringify(state.adminData.sections || {}));
    state.pub.tokens = (state.adminData.tokens || []).filter(function (t) { return t.is_active !== false; });
    state.pub.tutorials = (state.adminData.tutorials || [])
      .filter(function (v) { return v.is_active !== false; })
      .sort(function (a, b) { return (Number(a.sort_order) || 99) - (Number(b.sort_order) || 99); });
    try {
      localStorage.setItem(STORAGE_KEYS.PUB_CACHE, JSON.stringify({
        savedAt: Date.now(),
        data: state.pub
      }));
    } catch (e) { /* abaikan kuota localstorage */ }
  }

  function renderAllAdminViews() {
    const activeTokCount = (state.adminData.tokens || []).filter(function (t) { return t.is_active !== false; }).length;
    const activeVidCount = (state.adminData.tutorials || []).filter(function (v) { return v.is_active !== false; }).length;
    if ($('sidebar-tok-count')) $('sidebar-tok-count').textContent = String(activeTokCount);
    if ($('sidebar-vid-count')) $('sidebar-vid-count').textContent = String(activeVidCount);

    const ssLink = $('admin-open-sheets-link');
    const ssUrl = state.adminData.secretsStatus && state.adminData.secretsStatus.spreadsheetUrl;
    if (ssLink) {
      if (ssUrl) {
        ssLink.href = ssUrl;
        ssLink.classList.remove('hidden');
        ssLink.classList.add('inline-flex');
      } else {
        ssLink.classList.add('hidden');
      }
    }

    renderAdminAnalytics();
    renderCmsEditor();
    renderAdminTutorials();
    renderAdminTokens();
    renderAdminSecretsStatus();
  }

  // ==========================================================================
  // 7. TAB 1: ANALYTICS OVERVIEW, SVG CHART 7 HARI & LOG AUDIT REAL-TIME
  // ==========================================================================
  function renderAdminAnalytics() {
    const an = state.adminData.analytics || {};
    const kpis = an.kpis || {};
    const pv = Number(kpis.pageViews || 0);
    const tc = Number(kpis.tokenCopies || 0);
    const copyRate = pv > 0 ? Math.min(100, Math.round((tc / pv) * 100)) : 0;

    if ($('kpi-pageviews')) $('kpi-pageviews').textContent = pv.toLocaleString('id-ID');
    if ($('kpi-mobile-pct')) $('kpi-mobile-pct').textContent = (kpis.mobilePercent || 78) + '% Mobile';
    if ($('kpi-tokencopies')) $('kpi-tokencopies').textContent = tc.toLocaleString('id-ID');
    if ($('kpi-copy-rate')) $('kpi-copy-rate').textContent = copyRate + '% Rasio';
    if ($('kpi-community')) $('kpi-community').textContent = Number(kpis.communityClicks || 0).toLocaleString('id-ID');
    if ($('kpi-comm-split')) $('kpi-comm-split').textContent = 'WA ' + (kpis.waClicks || 0) + ' • TG ' + (kpis.tgClicks || 0);
    if ($('kpi-social')) $('kpi-social').textContent = Number(kpis.socialClicks || 0).toLocaleString('id-ID');
    if ($('kpi-soc-split')) $('kpi-soc-split').textContent = 'IG ' + (kpis.igClicks || 0) + ' • YT ' + (kpis.ytClicks || 0) + ' • TT ' + (kpis.ttClicks || 0);
    if ($('kpi-videos')) $('kpi-videos').textContent = Number(kpis.videoPlays || 0).toLocaleString('id-ID');
    if ($('kpi-vid-active')) $('kpi-vid-active').textContent = (state.adminData.tutorials || []).length + ' Video';

    renderSevenDaySvgChart(an.dailySeries || []);
    renderTopTokensLeaderboard();
    renderAdminLogsTable();
  }

  function renderSevenDaySvgChart(series) {
    const box = $('admin-chart-container');
    const lblBox = $('admin-chart-labels');
    if (!box || !lblBox) return;

    const data = series.length ? series : [
      { label: 'H-6', views: 0, copies: 0 },
      { label: 'H-5', views: 0, copies: 0 },
      { label: 'H-4', views: 0, copies: 0 },
      { label: 'H-3', views: 0, copies: 0 },
      { label: 'H-2', views: 0, copies: 0 },
      { label: 'Kemarin', views: 0, copies: 0 },
      { label: 'Hari Ini', views: 0, copies: 0 }
    ];

    const w = 640;
    const h = 200;
    const padX = 24;
    const padY = 20;
    let maxVal = 5;
    data.forEach(function (d) {
      if (d.views > maxVal) maxVal = d.views;
      if (d.copies > maxVal) maxVal = d.copies;
    });

    function toPoints(field) {
      return data.map(function (d, i) {
        const x = padX + (i * ((w - padX * 2) / Math.max(1, data.length - 1)));
        const val = Number(d[field] || 0);
        const y = (h - padY) - ((val / maxVal) * (h - padY * 2));
        return { x: x, y: y, val: val, label: d.label };
      });
    }

    function buildSmoothPath(pts) {
      if (!pts.length) return '';
      let path = 'M ' + pts[0].x.toFixed(1) + ' ' + pts[0].y.toFixed(1);
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i];
        const p1 = pts[i + 1];
        const cx = ((p0.x + p1.x) / 2).toFixed(1);
        path += ' C ' + cx + ' ' + p0.y.toFixed(1) + ', ' + cx + ' ' + p1.y.toFixed(1) + ', ' + p1.x.toFixed(1) + ' ' + p1.y.toFixed(1);
      }
      return path;
    }

    const viewPts = toPoints('views');
    const copyPts = toPoints('copies');
    const viewLine = buildSmoothPath(viewPts);
    const copyLine = buildSmoothPath(copyPts);
    const viewArea = viewLine + ' L ' + viewPts[viewPts.length - 1].x.toFixed(1) + ' ' + (h - padY) + ' L ' + viewPts[0].x.toFixed(1) + ' ' + (h - padY) + ' Z';
    const copyArea = copyLine + ' L ' + copyPts[copyPts.length - 1].x.toFixed(1) + ' ' + (h - padY) + ' L ' + copyPts[0].x.toFixed(1) + ' ' + (h - padY) + ' Z';

    const gridLines = [0.25, 0.5, 0.75, 1].map(function (ratio) {
      const gy = (padY + (1 - ratio) * (h - padY * 2)).toFixed(1);
      return '<line x1="' + padX + '" y1="' + gy + '" x2="' + (w - padX) + '" y2="' + gy + '" stroke="#e0f2fe" stroke-dasharray="4 4" stroke-width="1" />';
    }).join('');

    const dotsSvg = viewPts.map(function (p, idx) {
      const cp = copyPts[idx];
      return '' +
        '<circle cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="4.5" fill="#ffffff" stroke="#0284c7" stroke-width="2.5"><title>' + escHtml(p.label) + ': ' + p.val + ' Kunjungan</title></circle>' +
        '<circle cx="' + cp.x.toFixed(1) + '" cy="' + cp.y.toFixed(1) + '" r="4" fill="#ffffff" stroke="#059669" stroke-width="2.5"><title>' + escHtml(cp.label) + ': ' + cp.val + ' Salin Token</title></circle>';
    }).join('');

    box.innerHTML =
      '<svg viewBox="0 0 ' + w + ' ' + h + '" class="w-full h-full overflow-visible">' +
        '<defs>' +
          '<linearGradient id="gradViews" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0%" stop-color="#0284c7" stop-opacity="0.28"/>' +
            '<stop offset="100%" stop-color="#0284c7" stop-opacity="0.0"/>' +
          '</linearGradient>' +
          '<linearGradient id="gradCopies" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0%" stop-color="#059669" stop-opacity="0.22"/>' +
            '<stop offset="100%" stop-color="#059669" stop-opacity="0.0"/>' +
          '</linearGradient>' +
        '</defs>' +
        gridLines +
        '<path d="' + viewArea + '" fill="url(#gradViews)" />' +
        '<path d="' + copyArea + '" fill="url(#gradCopies)" />' +
        '<path d="' + viewLine + '" fill="none" stroke="#0284c7" stroke-width="3" stroke-linecap="round" />' +
        '<path d="' + copyLine + '" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round" />' +
        dotsSvg +
      '</svg>';

    lblBox.innerHTML = data.map(function (d) {
      return '<span class="truncate">' + escHtml(d.label) + '</span>';
    }).join('');
  }

  function renderTopTokensLeaderboard() {
    const wrap = $('admin-top-tokens-list');
    if (!wrap) return;
    const sorted = (state.adminData.tokens || []).slice().sort(function (a, b) {
      return (Number(b.copy_count) || 0) - (Number(a.copy_count) || 0);
    }).slice(0, 4);

    if (!sorted.length) {
      wrap.innerHTML = '<p class="text-xs text-outline py-4 text-center">Belum ada token di katalog.</p>';
      return;
    }

    const maxCopy = Math.max(1, Number(sorted[0].copy_count || 1));
    wrap.innerHTML = sorted.map(function (tk) {
      const cnt = Number(tk.copy_count || 0);
      const pct = Math.max(6, Math.round((cnt / maxCopy) * 100));
      return '' +
        '<div class="space-y-1.5">' +
          '<div class="flex items-center justify-between text-xs">' +
            '<span class="font-mono font-bold text-primary truncate max-w-[180px]">' + escHtml(tk.token_code) + '</span>' +
            '<span class="font-bold text-on-surface">' + cnt + 'x disalin</span>' +
          '</div>' +
          '<div class="w-full h-2 rounded-full bg-surface-container-low overflow-hidden">' +
            '<div class="h-full rounded-full bg-gradient-to-r from-primary to-secondary" style="width:' + pct + '%"></div>' +
          '</div>' +
          '<p class="text-[11px] text-outline truncate">' + escHtml(tk.token_label) + '</p>' +
        '</div>';
    }).join('');
  }

  function getFilteredLogs() {
    const raw = (state.adminData.analytics && state.adminData.analytics.recentLogs) || [];
    const q = ($('log-search-input') ? $('log-search-input').value : '').toLowerCase().trim();
    const typeFilter = $('log-type-filter') ? $('log-type-filter').value : 'ALL';

    return raw.filter(function (r) {
      if (typeFilter !== 'ALL' && r.event_type !== typeFilter) return false;
      if (q) {
        const hay = ((r.event_target || '') + ' ' + (r.device_info || '') + ' ' + (r.event_type || '')).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });
  }

  function renderAdminLogsTable() {
    const tbody = $('admin-logs-tbody');
    if (!tbody) return;

    const filtered = getFilteredLogs();
    const perPage = 8;
    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    if (state.logsPage > totalPages) state.logsPage = totalPages;
    if (state.logsPage < 1) state.logsPage = 1;

    const start = (state.logsPage - 1) * perPage;
    const slice = filtered.slice(start, start + perPage);

    const badgeStyle = {
      COPY_TOKEN: 'bg-sky-100 text-primary',
      CLICK_PORTAL: 'bg-indigo-100 text-indigo-700',
      WATCH_TUTORIAL: 'bg-red-100 text-red-700',
      JOIN_WA: 'bg-emerald-100 text-emerald-700',
      JOIN_TG: 'bg-cyan-100 text-cyan-800',
      FOLLOW_SOCMED: 'bg-pink-100 text-pink-700',
      DOWNLOAD_PDF: 'bg-amber-100 text-amber-800',
      PAGE_VIEW: 'bg-slate-100 text-slate-700'
    };

    if (!slice.length) {
      tbody.innerHTML = '<tr><td colspan="5" class="py-8 text-center text-outline">Belum ada aktivitas yang cocok dengan filter.</td></tr>';
    } else {
      tbody.innerHTML = slice.map(function (log) {
        const cls = badgeStyle[log.event_type] || 'bg-sky-50 text-primary';
        let timeStr = log.timestamp || '-';
        try {
          const dt = new Date(log.timestamp);
          if (!isNaN(dt.getTime())) {
            timeStr = dt.toLocaleString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
          }
        } catch (e) { /* abaikan */ }

        return '' +
          '<tr class="hover:bg-sky-50/40 transition">' +
            '<td class="py-3 px-4 font-mono text-[11px] text-on-surface-variant whitespace-nowrap">' + escHtml(timeStr) + '</td>' +
            '<td class="py-3 px-4"><span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ' + cls + '">' + escHtml(log.event_type) + '</span></td>' +
            '<td class="py-3 px-4 font-semibold text-on-surface max-w-[220px] truncate">' + escHtml(log.event_target) + '</td>' +
            '<td class="py-3 px-4 text-on-surface-variant">' + escHtml(log.device_info) + '</td>' +
            '<td class="py-3 px-4 text-right font-bold text-tertiary">' + escHtml(log.status_label || 'Tercatat') + '</td>' +
          '</tr>';
      }).join('');
    }

    if ($('admin-logs-count-info')) {
      $('admin-logs-count-info').textContent = 'Menampilkan ' + slice.length + ' dari ' + filtered.length + ' aktivitas';
    }
    if ($('logs-page-indicator')) $('logs-page-indicator').textContent = state.logsPage + ' / ' + totalPages;
    if ($('btn-logs-prev')) $('btn-logs-prev').disabled = state.logsPage <= 1;
    if ($('btn-logs-next')) $('btn-logs-next').disabled = state.logsPage >= totalPages;
  }

  function exportCsvFile(filename, headers, rows) {
    const escapeCell = function (v) {
      const s = String(v === undefined || v === null ? '' : v).replace(/"/g, '""');
      return '"' + s + '"';
    };
    const csvLines = [headers.map(escapeCell).join(',')];
    rows.forEach(function (r) {
      csvLines.push(r.map(escapeCell).join(','));
    });
    const blob = new Blob(['\uFEFF' + csvLines.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ==========================================================================
  // 8. TAB 2: CMS CONTENT EDITOR (CRUD PENUH SECTION 1 S.D. 6 + HERO & ANABUL)
  // ==========================================================================
  function getAdminSec(secId) {
    const defaults = getDefaultBootData().sections;
    if (!state.adminData.sections[secId]) {
      state.adminData.sections[secId] = JSON.parse(JSON.stringify(defaults[secId] || {
        section_id: secId, section_title: '', section_subtitle: '', content_body: '',
        cta_label: '', cta_url: '', is_active: true, metadata: {}
      }));
    }
    if (!state.adminData.sections[secId].metadata) {
      state.adminData.sections[secId].metadata = {};
    }
    return state.adminData.sections[secId];
  }

  function switchCmsSub(secId) {
    collectCurrentCmsForm();
    state.activeCmsSub = secId;
    document.querySelectorAll('.cms-sub-btn').forEach(function (btn) {
      const active = btn.getAttribute('data-cms-sub') === secId;
      btn.className = 'cms-sub-btn px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition ' +
        (active ? 'bg-primary text-white shadow-xs' : 'text-on-surface-variant hover:bg-white');
    });
    renderCmsEditor();
  }

  function renderCmsField(id, label, val, opts) {
    opts = opts || {};
    const type = opts.type || 'text';
    const placeholder = opts.placeholder || '';
    const mono = opts.mono ? ' font-mono' : '';
    if (type === 'textarea') {
      return '' +
        '<div>' +
          '<label class="block text-xs font-bold text-on-surface mb-1">' + escHtml(label) + '</label>' +
          '<textarea id="' + id + '" rows="' + (opts.rows || 3) + '" placeholder="' + escHtml(placeholder) + '" class="cms-live-input w-full px-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/30">' + escHtml(val) + '</textarea>' +
        '</div>';
    }
    return '' +
      '<div>' +
        '<label class="block text-xs font-bold text-on-surface mb-1">' + escHtml(label) + '</label>' +
        '<input id="' + id + '" type="' + type + '" value="' + escHtml(val) + '" placeholder="' + escHtml(placeholder) + '" class="cms-live-input w-full px-4 py-2.5 rounded-xl bg-surface-container-low text-xs sm:text-sm' + mono + ' focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/30" />' +
      '</div>';
  }

  function renderCmsToggleHeader(title, desc, checked) {
    return '' +
      '<div class="flex items-center justify-between gap-3 border-b border-sky-100 pb-4">' +
        '<div>' +
          '<h3 class="text-base sm:text-lg font-extrabold text-on-surface">' + escHtml(title) + '</h3>' +
          '<p class="text-xs text-on-surface-variant">' + escHtml(desc) + '</p>' +
        '</div>' +
        '<label class="inline-flex items-center gap-2 cursor-pointer shrink-0">' +
          '<span class="text-xs font-bold text-on-surface-variant">Aktif</span>' +
          '<input id="cms-f-active" type="checkbox" ' + (checked !== false ? 'checked' : '') + ' class="cms-live-input sr-only peer" />' +
          '<div class="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-tertiary relative after:content-[\'\'] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>' +
        '</label>' +
      '</div>';
  }

  function renderCmsEditor() {
    const area = $('cms-editor-form-area');
    if (!area) return;
    const sub = state.activeCmsSub || 'sec_greeting';
    const s = getAdminSec(sub);
    const m = s.metadata || {};
    let html = '';

    if (sub === 'sec_greeting') {
      html =
        '<div class="nimbus-card rounded-3xl p-6 space-y-4" data-cms-rendered="sec_greeting">' +
          renderCmsToggleHeader('Sapaan Terima Kasih & Hero Utama', 'Sambutan pertama ketika pembeli dari Lynk.id membuka halaman serah terima.', s.is_active) +
          '<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">' +
            renderCmsField('cms-g-brand', 'Nama Brand di Navbar', m.brand_name || 'ProductReceiver') +
            renderCmsField('cms-g-verified', 'Label Lencana Terverifikasi', m.verified_pill || 'Terverifikasi Lynk.id') +
          '</div>' +
          renderCmsField('cms-g-badge', 'Badge Atas Judul Hero', m.hero_badge || 'Portal Serah Terima Resmi Lynk.id') +
          renderCmsField('cms-g-title', 'Judul Utama Ucapan Terima Kasih', s.section_title) +
          renderCmsField('cms-g-subtitle', 'Sub-Judul Highlight Biru Langit', s.section_subtitle) +
          renderCmsField('cms-g-body', 'Paragraf Pengantar Pembeli', s.content_body, { type: 'textarea', rows: 3 }) +
          '<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">' +
            renderCmsField('cms-g-rating', 'Teks Social Proof / Rating', m.rating_text || '500+ Alumni Puas') +
            renderCmsField('cms-g-extra', 'Angka Badge Avatar (Contoh: +480)', m.extra_count || '+480') +
          '</div>' +
        '</div>';
    } else if (sub === 'sec_portal') {
      html =
        '<div class="nimbus-card rounded-3xl p-6 space-y-4" data-cms-rendered="sec_portal">' +
          renderCmsToggleHeader('Section 1: Akses Portal Kelas Utama', 'Pandu member klik URL Portal Kelas. Untuk menempel kode token, kelola di menu Token Akses.', s.is_active) +
          '<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">' +
            renderCmsField('cms-p-subtitle', 'Label Langkah', s.section_subtitle || 'Langkah 01') +
            renderCmsField('cms-p-title', 'Judul Seksi 1', s.section_title) +
          '</div>' +
          '<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">' +
            renderCmsField('cms-p-badge', 'Badge Kecil di Banner Biru', m.banner_badge || 'Direct Link Learning Management System') +
            renderCmsField('cms-p-btitle', 'Judul Banner Portal', m.banner_title || 'Akses Portal Belajar Utama') +
          '</div>' +
          renderCmsField('cms-p-body', 'Instruksi Masuk Portal & Penggunaan Token', s.content_body, { type: 'textarea', rows: 3 }) +
          '<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">' +
            renderCmsField('cms-p-cta', 'Teks Tombol Utama Portal', s.cta_label || 'BUKA PORTAL KELAS SEKARANG') +
            renderCmsField('cms-p-url', 'Link URL Tujuan Portal Kelas *', s.cta_url || 'https://lynk.id', { mono: true }) +
          '</div>' +
          '<label class="inline-flex items-center gap-2 text-xs font-semibold text-on-surface cursor-pointer pt-1">' +
            '<input id="cms-p-qr" type="checkbox" ' + (m.show_qr !== false ? 'checked' : '') + ' class="cms-live-input rounded text-primary" />' +
            '<span>Tampilkan tombol QR Code Portal Kelas (memudahkan member scan dari HP)</span>' +
          '</label>' +
        '</div>';
    } else if (sub === 'sec_community') {
      const wa = m.wa || {};
      const tg = m.tg || {};
      const waBullets = Array.isArray(wa.bullets) ? wa.bullets.join('\n') : '';
      const tgBullets = Array.isArray(tg.bullets) ? tg.bullets.join('\n') : '';
      html =
        '<div class="space-y-5" data-cms-rendered="sec_community">' +
          '<div class="nimbus-card rounded-3xl p-6 space-y-4">' +
            renderCmsToggleHeader('Section 2: Panduan Masuk Grup WhatsApp & Telegram', 'Arahkan member bergabung ke grup diskusi WA atau channel update Telegram.', s.is_active) +
            '<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">' +
              renderCmsField('cms-c-subtitle', 'Label Langkah', s.section_subtitle || 'Langkah 02') +
              renderCmsField('cms-c-title', 'Judul Seksi Komunitas', s.section_title) +
            '</div>' +
            renderCmsField('cms-c-body', 'Deskripsi Pengantar Komunitas', s.content_body, { type: 'textarea', rows: 2 }) +
          '</div>' +
          '<div class="nimbus-card rounded-3xl p-6 space-y-4 border-l-4 border-emerald-500">' +
            '<div class="flex items-center justify-between">' +
              '<h4 class="text-sm font-extrabold text-tertiary">Kartu 1: Grup WhatsApp</h4>' +
              '<label class="inline-flex items-center gap-2 text-xs font-bold cursor-pointer"><input id="cms-wa-on" type="checkbox" ' + (wa.enabled !== false ? 'checked' : '') + ' class="cms-live-input rounded text-tertiary" /> Tampilkan Kartu WA</label>' +
            '</div>' +
            '<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">' +
              renderCmsField('cms-wa-tab', 'Label Folder Tab Atas', wa.tab_label || 'Grup Diskusi & Networking') +
              renderCmsField('cms-wa-title', 'Nama Grup WhatsApp', wa.title || 'WhatsApp Community VIP') +
            '</div>' +
            renderCmsField('cms-wa-desc', 'Penjelasan Manfaat Grup WA', wa.description || '', { type: 'textarea', rows: 2 }) +
            renderCmsField('cms-wa-bullets', 'Poin Keunggulan WA (1 baris per poin)', waBullets, { type: 'textarea', rows: 2 }) +
            '<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">' +
              renderCmsField('cms-wa-cta', 'Teks Tombol WA', wa.cta_label || 'Gabung WhatsApp Group') +
              renderCmsField('cms-wa-url', 'Link Invite Grup WhatsApp', wa.cta_url || 'https://chat.whatsapp.com/', { mono: true }) +
            '</div>' +
          '</div>' +
          '<div class="nimbus-card rounded-3xl p-6 space-y-4 border-l-4 border-sky-500">' +
            '<div class="flex items-center justify-between">' +
              '<h4 class="text-sm font-extrabold text-secondary">Kartu 2: Grup / Channel Telegram</h4>' +
              '<label class="inline-flex items-center gap-2 text-xs font-bold cursor-pointer"><input id="cms-tg-on" type="checkbox" ' + (tg.enabled !== false ? 'checked' : '') + ' class="cms-live-input rounded text-secondary" /> Tampilkan Kartu Telegram</label>' +
            '</div>' +
            '<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">' +
              renderCmsField('cms-tg-tab', 'Label Folder Tab Atas', tg.tab_label || 'Channel Broadcast Modul') +
              renderCmsField('cms-tg-title', 'Nama Grup / Channel Telegram', tg.title || 'Telegram Broadcast Channel') +
            '</div>' +
            renderCmsField('cms-tg-desc', 'Penjelasan Manfaat Telegram', tg.description || '', { type: 'textarea', rows: 2 }) +
            renderCmsField('cms-tg-bullets', 'Poin Keunggulan Telegram (1 baris per poin)', tgBullets, { type: 'textarea', rows: 2 }) +
            '<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">' +
              renderCmsField('cms-tg-cta', 'Teks Tombol Telegram', tg.cta_label || 'Join Telegram Channel') +
              renderCmsField('cms-tg-url', 'Link Invite Telegram (t.me)', tg.cta_url || 'https://t.me/', { mono: true }) +
            '</div>' +
          '</div>' +
        '</div>';
    } else if (sub === 'sec_social') {
      const channels = Array.isArray(m.channels) && m.channels.length
        ? m.channels
        : getDefaultBootData().sections.sec_social.metadata.channels;
      html =
        '<div class="space-y-5" data-cms-rendered="sec_social">' +
          '<div class="nimbus-card rounded-3xl p-6 space-y-4">' +
            renderCmsToggleHeader('Section 3: Follow Instagram, Subscribe YouTube & TikTok', 'Tulis kalimat persuasif yang menarik agar member bersemangat mengikuti kanal media sosial Anda.', s.is_active) +
            '<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">' +
              renderCmsField('cms-s-subtitle', 'Label Langkah', s.section_subtitle || 'Langkah 03') +
              renderCmsField('cms-s-title', 'Judul Seksi Medsos', s.section_title) +
            '</div>' +
            renderCmsField('cms-s-body', 'Kalimat Pengantar Medsos', s.content_body, { type: 'textarea', rows: 2 }) +
          '</div>' +
          channels.map(function (ch, idx) {
            return '' +
              '<div class="nimbus-card rounded-3xl p-6 space-y-3 cms-soc-card" data-soc-platform="' + escHtml(ch.platform || 'instagram') + '">' +
                '<div class="flex items-center justify-between">' +
                  '<span class="px-3 py-1 rounded-full bg-sky-100 text-primary text-xs font-extrabold uppercase">' + escHtml(ch.platform || ('Kanal ' + (idx + 1))) + '</span>' +
                '</div>' +
                '<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">' +
                  renderCmsField('cms-soc-name-' + idx, 'Judul Kartu Kanal', ch.name || '') +
                  renderCmsField('cms-soc-handle-' + idx, 'Username / Nama Channel', ch.handle || '') +
                '</div>' +
                renderCmsField('cms-soc-pitch-' + idx, 'Penjelasan Menarik (Alasan Wajib Follow/Subscribe)', ch.pitch || '', { type: 'textarea', rows: 2 }) +
                '<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">' +
                  renderCmsField('cms-soc-cta-' + idx, 'Label Tombol', ch.cta_label || 'Follow Sekarang') +
                  renderCmsField('cms-soc-url-' + idx, 'URL Profil Media Sosial', ch.url || 'https://', { mono: true }) +
                '</div>' +
              '</div>';
          }).join('') +
        '</div>';
    } else if (sub === 'sec_benefits') {
      const items = Array.isArray(m.items) ? m.items : [];
      html =
        '<div class="nimbus-card rounded-3xl p-6 space-y-4" data-cms-rendered="sec_benefits">' +
          renderCmsToggleHeader('Section 4: Penjelasan Hak & Fasilitas Sesuai Paket', 'Rincikan semua hak akses, bonus modul, dan fasilitas yang didapatkan pembeli.', s.is_active) +
          '<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">' +
            renderCmsField('cms-b-subtitle', 'Label Langkah', s.section_subtitle || 'Langkah 04') +
            renderCmsField('cms-b-title', 'Judul Seksi Hak Paket', s.section_title) +
          '</div>' +
          '<div class="grid grid-cols-1 sm:grid-cols-3 gap-3">' +
            renderCmsField('cms-b-pill', 'Badge Status Pembayaran', m.status_pill || 'Terkonfirmasi Pembayaran Lynk.id') +
            renderCmsField('cms-b-pkg', 'Nama Paket Membership', m.package_title || 'Paket Membership VIP') +
            renderCmsField('cms-b-lic', 'Label Lisensi Kanan', m.license_badge || 'Single Seat Licensed') +
          '</div>' +
          renderCmsField('cms-b-body', 'Ringkasan Hak Paket', s.content_body, { type: 'textarea', rows: 2 }) +
          '<div class="pt-3 border-t border-sky-100 space-y-3">' +
            '<div class="flex items-center justify-between">' +
              '<h4 class="text-sm font-bold text-on-surface">Daftar Item Hak &amp; Fasilitas (' + items.length + ')</h4>' +
              '<button type="button" id="btn-add-benefit-item" class="px-3.5 py-1.5 rounded-full bg-sky-100 hover:bg-sky-200 text-primary text-xs font-bold flex items-center gap-1">+ Tambah Fasilitas</button>' +
            '</div>' +
            '<div class="space-y-3">' +
              items.map(function (it, idx) {
                return '' +
                  '<div class="p-4 rounded-2xl bg-surface-container-low border border-sky-100 space-y-2.5 cms-benefit-row">' +
                    '<div class="flex items-center justify-between gap-2">' +
                      '<span class="text-xs font-extrabold text-primary">Fasilitas #' + (idx + 1) + '</span>' +
                      '<button type="button" data-del-benefit="' + idx + '" class="text-error text-xs font-bold hover:underline">Hapus</button>' +
                    '</div>' +
                    '<div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">' +
                      '<input type="text" data-bf-field="title" value="' + escHtml(it.title || '') + '" placeholder="Judul fasilitas" class="cms-live-input sm:col-span-2 px-3 py-2 rounded-xl bg-white text-xs font-bold focus:outline-none" />' +
                      '<input type="text" data-bf-field="tag" value="' + escHtml(it.tag || '') + '" placeholder="Badge (Mis: Modul)" class="cms-live-input px-3 py-2 rounded-xl bg-white text-xs focus:outline-none" />' +
                    '</div>' +
                    '<div class="grid grid-cols-1 sm:grid-cols-4 gap-2.5">' +
                      '<input type="text" data-bf-field="icon" value="' + escHtml(it.icon || 'check_circle') + '" placeholder="Ikon Material" class="cms-live-input px-3 py-2 rounded-xl bg-white text-xs font-mono focus:outline-none" />' +
                      '<input type="text" data-bf-field="desc" value="' + escHtml(it.desc || '') + '" placeholder="Penjelasan detail fasilitas..." class="cms-live-input sm:col-span-3 px-3 py-2 rounded-xl bg-white text-xs focus:outline-none" />' +
                    '</div>' +
                  '</div>';
              }).join('') +
            '</div>' +
          '</div>' +
        '</div>';
    } else if (sub === 'sec_disclaimer') {
      const pts = Array.isArray(m.points) ? m.points : [];
      html =
        '<div class="nimbus-card rounded-3xl p-6 space-y-4" data-cms-rendered="sec_disclaimer">' +
          renderCmsToggleHeader('Section 5: Pengumuman Disclaimer & Larangan Menjual Kembali', 'Tegaskan perlindungan hak cipta dan larangan menyebarluaskan/resell produk tanpa izin.', s.is_active) +
          '<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">' +
            renderCmsField('cms-d-subtitle', 'Label Langkah', s.section_subtitle || 'Langkah 05') +
            renderCmsField('cms-d-title', 'Judul Seksi Disclaimer', s.section_title) +
          '</div>' +
          '<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">' +
            renderCmsField('cms-d-badge', 'Teks Lencana Peringatan Merah', m.badge_text || 'Peringatan Hak Cipta & Lisensi Resmi') +
            renderCmsField('cms-d-headline', 'Headline Larangan Utama', m.headline || 'Larangan Keras Menyebarluaskan / Menjual Kembali Tanpa Izin') +
          '</div>' +
          renderCmsField('cms-d-body', 'Isi Paragraf Ketentuan Hukum & Hak Cipta', s.content_body, { type: 'textarea', rows: 4 }) +
          renderCmsField('cms-d-points', 'Kotak Poin Sanksi / Larangan (1 baris per kotak)', pts.join('\n'), { type: 'textarea', rows: 3 }) +
        '</div>';
    } else if (sub === 'sec_closing') {
      const sGreet = getAdminSec('sec_greeting');
      const mg = sGreet.metadata || {};
      html =
        '<div class="space-y-5" data-cms-rendered="sec_closing">' +
          '<div class="nimbus-card rounded-3xl p-6 space-y-4">' +
            renderCmsToggleHeader('Section 6: Ucapan Selamat Bergabung & Semangat Upgrade Ilmu', 'Kalimat motivasi penutup dan tombol cetak rangkuman panduan PDF.', s.is_active) +
            '<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">' +
              renderCmsField('cms-cl-subtitle', 'Label Langkah', s.section_subtitle || 'Langkah 06') +
              renderCmsField('cms-cl-title', 'Judul Seksi Penutup', s.section_title) +
            '</div>' +
            renderCmsField('cms-cl-eyebrow', 'Sub-Label Atas Kutipan', m.eyebrow || 'Ucapan Selamat Bergabung dari Mentor') +
            renderCmsField('cms-cl-body', 'Kalimat Motivasi Penutup', s.content_body, { type: 'textarea', rows: 3 }) +
            '<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">' +
              renderCmsField('cms-cl-helper', 'Catatan Bawah (Bookmark / Simpan)', m.helper_text || '') +
              renderCmsField('cms-cl-cta', 'Label Tombol Unduh/Cetak PDF', s.cta_label || 'Unduh Rangkuman PDF') +
            '</div>' +
          '</div>' +
          '<div class="nimbus-card rounded-3xl p-6 space-y-4 border-2 border-sky-200">' +
            '<div class="flex items-center justify-between">' +
              '<div class="flex items-center gap-2.5">' +
                '<span class="material-symbols-outlined text-primary text-[24px]">pets</span>' +
                '<div>' +
                  '<h4 class="text-sm font-extrabold text-on-surface">Pengaturan Maskot Kucing Imut ANABUL</h4>' +
                  '<p class="text-xs text-on-surface-variant">Karakter kucing menggemaskan yang mengikuti kursor di landing page.</p>' +
                '</div>' +
              '</div>' +
              '<label class="inline-flex items-center gap-2 text-xs font-bold cursor-pointer">' +
                '<input id="cms-anabul-on" type="checkbox" ' + (mg.anabul_enabled !== false ? 'checked' : '') + ' class="cms-live-input rounded text-primary" /> Aktifkan Anabul' +
              '</label>' +
            '</div>' +
            '<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">' +
              renderCmsField('cms-anabul-title', 'Judul Sapaan Balon Anabul', mg.anabul_greeting || 'Halo, Saya Anabul! 🐾') +
              renderCmsField('cms-anabul-msg', 'Pesan Panduan Awal Anabul', mg.anabul_subtext || 'Klik tombol Salin pada kartu Token ya!') +
            '</div>' +
          '</div>' +
        '</div>';
    }

    area.innerHTML = html;
    renderCmsMiniPreview();
  }

  function collectCurrentCmsForm() {
    const area = $('cms-editor-form-area');
    if (!area || !area.firstElementChild) return;
    const rendered = area.firstElementChild.getAttribute('data-cms-rendered');
    if (!rendered) return;

    const s = getAdminSec(rendered);
    const m = s.metadata || {};
    const val = function (id) { return $(id) ? $(id).value : ''; };
    const chk = function (id) { return $(id) ? $(id).checked : true; };

    s.is_active = chk('cms-f-active');

    if (rendered === 'sec_greeting') {
      s.section_title = val('cms-g-title');
      s.section_subtitle = val('cms-g-subtitle');
      s.content_body = val('cms-g-body');
      m.brand_name = val('cms-g-brand');
      m.verified_pill = val('cms-g-verified');
      m.hero_badge = val('cms-g-badge');
      m.rating_text = val('cms-g-rating');
      m.extra_count = val('cms-g-extra');
    } else if (rendered === 'sec_portal') {
      s.section_subtitle = val('cms-p-subtitle');
      s.section_title = val('cms-p-title');
      s.content_body = val('cms-p-body');
      s.cta_label = val('cms-p-cta');
      s.cta_url = val('cms-p-url');
      m.banner_badge = val('cms-p-badge');
      m.banner_title = val('cms-p-btitle');
      m.show_qr = chk('cms-p-qr');
    } else if (rendered === 'sec_community') {
      s.section_subtitle = val('cms-c-subtitle');
      s.section_title = val('cms-c-title');
      s.content_body = val('cms-c-body');
      m.wa = {
        enabled: chk('cms-wa-on'),
        tab_label: val('cms-wa-tab'),
        title: val('cms-wa-title'),
        description: val('cms-wa-desc'),
        bullets: val('cms-wa-bullets').split('\n').map(function (x) { return x.trim(); }).filter(Boolean),
        cta_label: val('cms-wa-cta'),
        cta_url: val('cms-wa-url')
      };
      m.tg = {
        enabled: chk('cms-tg-on'),
        tab_label: val('cms-tg-tab'),
        title: val('cms-tg-title'),
        description: val('cms-tg-desc'),
        bullets: val('cms-tg-bullets').split('\n').map(function (x) { return x.trim(); }).filter(Boolean),
        cta_label: val('cms-tg-cta'),
        cta_url: val('cms-tg-url')
      };
    } else if (rendered === 'sec_social') {
      s.section_subtitle = val('cms-s-subtitle');
      s.section_title = val('cms-s-title');
      s.content_body = val('cms-s-body');
      const cards = area.querySelectorAll('.cms-soc-card');
      const nextChannels = [];
      cards.forEach(function (card, idx) {
        nextChannels.push({
          platform: card.getAttribute('data-soc-platform') || 'instagram',
          name: val('cms-soc-name-' + idx),
          handle: val('cms-soc-handle-' + idx),
          pitch: val('cms-soc-pitch-' + idx),
          cta_label: val('cms-soc-cta-' + idx),
          url: val('cms-soc-url-' + idx)
        });
      });
      m.channels = nextChannels;
    } else if (rendered === 'sec_benefits') {
      s.section_subtitle = val('cms-b-subtitle');
      s.section_title = val('cms-b-title');
      s.content_body = val('cms-b-body');
      m.status_pill = val('cms-b-pill');
      m.package_title = val('cms-b-pkg');
      m.license_badge = val('cms-b-lic');
      const rows = area.querySelectorAll('.cms-benefit-row');
      const items = [];
      rows.forEach(function (r) {
        const getF = function (f) {
          const el = r.querySelector('[data-bf-field="' + f + '"]');
          return el ? el.value.trim() : '';
        };
        if (getF('title')) {
          items.push({ icon: getF('icon') || 'check_circle', tag: getF('tag'), title: getF('title'), desc: getF('desc') });
        }
      });
      m.items = items;
    } else if (rendered === 'sec_disclaimer') {
      s.section_subtitle = val('cms-d-subtitle');
      s.section_title = val('cms-d-title');
      s.content_body = val('cms-d-body');
      m.badge_text = val('cms-d-badge');
      m.headline = val('cms-d-headline');
      m.points = val('cms-d-points').split('\n').map(function (x) { return x.trim(); }).filter(Boolean);
    } else if (rendered === 'sec_closing') {
      s.section_subtitle = val('cms-cl-subtitle');
      s.section_title = val('cms-cl-title');
      s.content_body = val('cms-cl-body');
      s.cta_label = val('cms-cl-cta');
      m.eyebrow = val('cms-cl-eyebrow');
      m.helper_text = val('cms-cl-helper');

      const sg = getAdminSec('sec_greeting');
      sg.metadata.anabul_enabled = chk('cms-anabul-on');
      sg.metadata.anabul_greeting = val('cms-anabul-title');
      sg.metadata.anabul_subtext = val('cms-anabul-msg');
    }

    s.metadata = m;
  }

  function renderCmsMiniPreview() {
    const box = $('cms-mini-preview');
    if (!box) return;
    const s = getAdminSec(state.activeCmsSub || 'sec_greeting');
    box.innerHTML =
      '<div class="p-3 rounded-xl bg-white border border-sky-100 space-y-1.5">' +
        '<div class="flex items-center justify-between">' +
          '<span class="text-[10px] font-bold uppercase text-primary">' + escHtml(s.section_subtitle || s.section_id) + '</span>' +
          '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold ' + (s.is_active !== false ? 'bg-emerald-50 text-tertiary' : 'bg-slate-100 text-outline') + '">' + (s.is_active !== false ? 'Ditampilkan' : 'Disembunyikan') + '</span>' +
        '</div>' +
        '<p class="font-extrabold text-on-surface text-sm leading-snug">' + escHtml(s.section_title || '(Tanpa Judul)') + '</p>' +
        '<p class="text-[11px] text-on-surface-variant line-clamp-3 leading-relaxed">' + escHtml(s.content_body || '') + '</p>' +
        (s.cta_label ? '<div class="pt-1"><span class="inline-block px-3 py-1 rounded-full bg-primary text-white text-[10px] font-bold">' + escHtml(s.cta_label) + '</span></div>' : '') +
      '</div>';
  }

  async function saveAllCmsChanges() {
    collectCurrentCmsForm();
    const btn = $('btn-save-all-cms');
    if (btn) btn.disabled = true;

    try {
      if (!state.isDemoAdmin) {
        const res = await api('admin.saveSections', { sections: state.adminData.sections });
        showToast(res.message || 'Konten CMS berhasil disimpan!');
      } else {
        showToast('Perubahan CMS disimpan ke Pratinjau Lokal!');
      }
      syncAdminStateToPublicPreview();
      renderCmsMiniPreview();
    } catch (err) {
      showToast(err.message || 'Gagal menyimpan perubahan CMS.', true);
    } finally {
      if (btn) btn.disabled = false;
    }
  }

  // ==========================================================================
  // 9. TAB 3: MANAJEMEN MULTI-VIDEO TUTORIAL YOUTUBE (CRUD PENUH)
  // ==========================================================================
  function parseTimecodesText(raw) {
    return String(raw || '').split('\n').map(function (line) {
      const parts = line.split('|');
      if (parts.length < 2) return null;
      const time = parts[0].trim();
      const label = parts.slice(1).join('|').trim();
      return (time && label) ? { time: time, label: label } : null;
    }).filter(Boolean);
  }

  function formatTimecodesText(arr) {
    if (!Array.isArray(arr)) return '';
    return arr.map(function (tc) {
      return (tc.time || '00:00') + ' | ' + (tc.label || '');
    }).join('\n');
  }

  function renderAdminTutorials() {
    const sTut = getAdminSec('sec_tutorials');
    const mTut = sTut.metadata || {};
    if ($('tut-header-active')) $('tut-header-active').checked = sTut.is_active !== false;
    if ($('tut-header-title')) $('tut-header-title').value = sTut.section_title || '';
    if ($('tut-header-playlist')) $('tut-header-playlist').value = mTut.playlist_url || sTut.cta_url || '';
    if ($('tut-header-body')) $('tut-header-body').value = sTut.content_body || '';

    const grid = $('admin-tutorials-grid');
    if (!grid) return;
    const list = (state.adminData.tutorials || []).slice().sort(function (a, b) {
      return (Number(a.sort_order) || 99) - (Number(b.sort_order) || 99);
    });

    if (!list.length) {
      grid.innerHTML = '<div class="col-span-full nimbus-card rounded-3xl p-8 text-center text-sm text-outline">Belum ada video panduan YouTube. Klik tombol <strong>+ Tambah Video YouTube Baru</strong> di kanan atas untuk menempelkan video pertama Anda.</div>';
      return;
    }

    grid.innerHTML = list.map(function (vd, idx) {
      const ytId = vd.youtube_id || extractYtId(vd.youtube_url);
      const thumb = ytId ? ('https://i.ytimg.com/vi/' + encodeURIComponent(ytId) + '/mqdefault.jpg') : '';
      const tcs = Array.isArray(vd.timecodes) ? vd.timecodes : [];
      return '' +
        '<div class="nimbus-card rounded-3xl overflow-hidden flex flex-col justify-between">' +
          '<div>' +
            '<div class="relative h-44 bg-slate-900 overflow-hidden">' +
              (thumb ? '<img src="' + thumb + '" alt="' + escHtml(vd.title) + '" class="w-full h-full object-cover opacity-90" loading="lazy" />' : '') +
              '<div class="absolute top-3 left-3 flex items-center gap-1.5">' +
                '<span class="px-2.5 py-1 rounded-full bg-black/75 text-white text-[11px] font-bold">Urutan #' + (vd.sort_order || (idx + 1)) + '</span>' +
                '<span class="px-2.5 py-1 rounded-full bg-red-600 text-white text-[11px] font-bold">' + escHtml(vd.badge_label || 'Panduan') + '</span>' +
              '</div>' +
              '<span class="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 text-white font-mono text-xs">' + escHtml(vd.duration || '05:00') + '</span>' +
            '</div>' +
            '<div class="p-5 space-y-2">' +
              '<h3 class="text-base font-extrabold text-on-surface line-clamp-2">' + escHtml(vd.title) + '</h3>' +
              '<p class="text-xs text-on-surface-variant line-clamp-2">' + escHtml(vd.description || 'Tanpa deskripsi tambahan.') + '</p>' +
              '<div class="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-outline">' +
                '<span class="font-mono bg-surface-container-low px-2 py-0.5 rounded">ID: ' + escHtml(ytId || '-') + '</span>' +
                '<span>• ' + tcs.length + ' Timecodes</span>' +
                '<span>• ' + Number(vd.views_count || 0) + 'x ditonton</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="px-5 py-3.5 bg-surface-container-low/70 border-t border-sky-100 flex items-center justify-between gap-2">' +
            '<label class="inline-flex items-center gap-2 cursor-pointer text-xs font-bold">' +
              '<input type="checkbox" data-vid-toggle="' + escHtml(vd.video_id) + '" ' + (vd.is_active !== false ? 'checked' : '') + ' class="rounded text-tertiary" />' +
              '<span>' + (vd.is_active !== false ? 'Aktif' : 'Non-Aktif') + '</span>' +
            '</label>' +
            '<div class="flex items-center gap-1">' +
              '<button type="button" data-vid-up="' + idx + '" class="p-1.5 rounded-lg hover:bg-white text-on-surface-variant" title="Naikkan Urutan"><span class="material-symbols-outlined text-[18px]">arrow_upward</span></button>' +
              '<button type="button" data-vid-down="' + idx + '" class="p-1.5 rounded-lg hover:bg-white text-on-surface-variant" title="Turunkan Urutan"><span class="material-symbols-outlined text-[18px]">arrow_downward</span></button>' +
              '<button type="button" data-vid-edit="' + escHtml(vd.video_id) + '" class="px-3 py-1.5 rounded-xl bg-white hover:bg-sky-50 text-primary text-xs font-bold border border-sky-100">Edit</button>' +
              '<button type="button" data-vid-del="' + escHtml(vd.video_id) + '" class="p-1.5 rounded-xl hover:bg-red-50 text-error" title="Hapus Video"><span class="material-symbols-outlined text-[18px]">delete</span></button>' +
            '</div>' +
          '</div>' +
        '</div>';
    }).join('');
  }

  function openTutorialModal(videoId) {
    const modal = $('tutorial-modal');
    if (!modal) return;
    const list = state.adminData.tutorials || [];
    const existing = videoId ? list.find(function (v) { return v.video_id === videoId; }) : null;

    if ($('tut-modal-title')) $('tut-modal-title').textContent = existing ? 'Edit Video Panduan YouTube' : 'Tambah Video Panduan YouTube';
    if ($('vid-form-id')) $('vid-form-id').value = existing ? existing.video_id : '';
    if ($('vid-form-url')) $('vid-form-url').value = existing ? existing.youtube_url : '';
    if ($('vid-form-title')) $('vid-form-title').value = existing ? existing.title : '';
    if ($('vid-form-desc')) $('vid-form-desc').value = existing ? (existing.description || '') : '';
    if ($('vid-form-duration')) $('vid-form-duration').value = existing ? (existing.duration || '05:00') : '05:00';
    if ($('vid-form-badge')) $('vid-form-badge').value = existing ? (existing.badge_label || 'Panduan') : 'Wajib Ditonton';
    if ($('vid-form-order')) $('vid-form-order').value = existing ? (existing.sort_order || 1) : (list.length + 1);
    if ($('vid-form-timecodes')) $('vid-form-timecodes').value = existing ? formatTimecodesText(existing.timecodes) : '';
    if ($('vid-form-active')) $('vid-form-active').checked = existing ? (existing.is_active !== false) : true;

    updateTutorialThumbPreview();
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  function closeTutorialModal() {
    const modal = $('tutorial-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  function updateTutorialThumbPreview() {
    const urlVal = $('vid-form-url') ? $('vid-form-url').value : '';
    const ytId = extractYtId(urlVal);
    const box = $('vid-thumb-preview-box');
    if (!box) return;
    if (ytId) {
      box.classList.remove('hidden');
      if ($('vid-thumb-img')) $('vid-thumb-img').src = 'https://i.ytimg.com/vi/' + encodeURIComponent(ytId) + '/mqdefault.jpg';
      if ($('vid-detected-id')) $('vid-detected-id').textContent = 'YouTube ID: ' + ytId;
    } else {
      box.classList.add('hidden');
    }
  }

  async function saveTutorialHeader() {
    const sTut = getAdminSec('sec_tutorials');
    sTut.is_active = $('tut-header-active') ? $('tut-header-active').checked : true;
    sTut.section_title = $('tut-header-title') ? $('tut-header-title').value.trim() : '';
    sTut.content_body = $('tut-header-body') ? $('tut-header-body').value.trim() : '';
    const pl = $('tut-header-playlist') ? $('tut-header-playlist').value.trim() : '';
    sTut.cta_url = pl;
    sTut.metadata = sTut.metadata || {};
    sTut.metadata.playlist_url = pl;

    try {
      if (!state.isDemoAdmin) {
        await api('admin.saveSections', { sections: { sec_tutorials: sTut } });
      }
      syncAdminStateToPublicPreview();
      showToast('Header seksi video panduan berhasil disimpan!');
    } catch (err) {
      showToast(err.message || 'Gagal menyimpan header seksi video.', true);
    }
  }

  async function handleTutorialFormSubmit(e) {
    e.preventDefault();
    const urlVal = $('vid-form-url') ? $('vid-form-url').value.trim() : '';
    const ytId = extractYtId(urlVal);
    if (!ytId) {
      showToast('URL YouTube tidak valid. Contoh: https://youtu.be/M7lc1UVf-VE', true);
      return;
    }

    const payload = {
      video_id: $('vid-form-id') ? $('vid-form-id').value.trim() : '',
      youtube_url: urlVal,
      youtube_id: ytId,
      title: $('vid-form-title') ? $('vid-form-title').value.trim() : '',
      description: $('vid-form-desc') ? $('vid-form-desc').value.trim() : '',
      duration: $('vid-form-duration') ? $('vid-form-duration').value.trim() : '05:00',
      badge_label: $('vid-form-badge') ? $('vid-form-badge').value.trim() : 'Panduan',
      sort_order: Number($('vid-form-order') ? $('vid-form-order').value : 1) || 1,
      timecodes: parseTimecodesText($('vid-form-timecodes') ? $('vid-form-timecodes').value : ''),
      is_active: $('vid-form-active') ? $('vid-form-active').checked : true
    };

    try {
      if (!state.isDemoAdmin) {
        const res = await api('admin.saveTutorial', payload);
        showToast(res.message || 'Video tutorial disimpan!');
        closeTutorialModal();
        await loadAdminBoot();
      } else {
        if (payload.video_id) {
          const i = state.adminData.tutorials.findIndex(function (x) { return x.video_id === payload.video_id; });
          if (i > -1) state.adminData.tutorials[i] = Object.assign({}, state.adminData.tutorials[i], payload);
        } else {
          payload.video_id = 'VID-LOCAL' + Date.now().toString().slice(-4);
          payload.views_count = 0;
          state.adminData.tutorials.push(payload);
        }
        syncAdminStateToPublicPreview();
        closeTutorialModal();
        renderAllAdminViews();
        showToast('Video tutorial disimpan (Mode Lokal)!');
      }
    } catch (err) {
      showToast(err.message || 'Gagal menyimpan video tutorial.', true);
    }
  }

  async function reorderTutorialItem(index, dir) {
    const list = (state.adminData.tutorials || []).slice().sort(function (a, b) {
      return (Number(a.sort_order) || 99) - (Number(b.sort_order) || 99);
    });
    const targetIdx = index + dir;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    const tmp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = tmp;

    const orders = list.map(function (v, idx) {
      v.sort_order = idx + 1;
      return { video_id: v.video_id, sort_order: idx + 1 };
    });
    state.adminData.tutorials = list;
    syncAdminStateToPublicPreview();
    renderAdminTutorials();

    if (!state.isDemoAdmin) {
      try {
        await api('admin.reorderTutorials', { orders: orders });
        showToast('Urutan tayang video diperbarui!');
      } catch (err) {
        showToast(err.message || 'Gagal mengubah urutan video.', true);
      }
    }
  }

  // ==========================================================================
  // 10. TAB 4: KATALOG TOKEN AKSES MANUAL (TEMPEL SENDIRI OLEH ADMIN)
  // ==========================================================================
  function renderAdminTokens() {
    const all = state.adminData.tokens || [];
    const activeCnt = all.filter(function (t) { return t.is_active !== false; }).length;
    const inactiveCnt = all.length - activeCnt;
    const totalCopies = all.reduce(function (s, t) { return s + Number(t.copy_count || 0); }, 0);

    if ($('tok-stat-active')) $('tok-stat-active').textContent = String(activeCnt);
    if ($('tok-stat-inactive')) $('tok-stat-inactive').textContent = String(inactiveCnt);
    if ($('tok-stat-copies')) $('tok-stat-copies').textContent = totalCopies.toLocaleString('id-ID');

    const q = ($('tok-search-input') ? $('tok-search-input').value : '').toLowerCase().trim();
    const stFilter = $('tok-status-filter') ? $('tok-status-filter').value : 'all';
    const sortBy = $('tok-sort-filter') ? $('tok-sort-filter').value : 'newest';

    let list = all.filter(function (t) {
      if (stFilter === 'active' && t.is_active === false) return false;
      if (stFilter === 'inactive' && t.is_active !== false) return false;
      if (q) {
        const hay = ((t.token_code || '') + ' ' + (t.token_label || '') + ' ' + (t.batch_info || '')).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });

    if (sortBy === 'copies-desc') {
      list.sort(function (a, b) { return Number(b.copy_count || 0) - Number(a.copy_count || 0); });
    } else {
      list.sort(function (a, b) { return String(b.created_at || '').localeCompare(String(a.created_at || '')); });
    }

    const tbody = $('admin-tokens-tbody');
    if (!tbody) return;
    if (!list.length) {
      tbody.innerHTML = '<tr><td colspan="5" class="py-8 text-center text-outline">Belum ada token yang cocok. Klik <strong>+ Tempel Token Baru</strong> untuk menambahkan kode token buatan Anda.</td></tr>';
      return;
    }

    tbody.innerHTML = list.map(function (tk) {
      const isAct = tk.is_active !== false;
      const quotaInfo = tk.quota_limit ? (' / ' + tk.quota_limit + ' kuota') : '';
      return '' +
        '<tr class="hover:bg-sky-50/40 transition">' +
          '<td class="py-4 px-5">' +
            '<div class="flex items-center gap-2">' +
              '<span class="font-mono font-extrabold text-primary text-xs sm:text-sm bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-100">' + escHtml(tk.token_code) + '</span>' +
              '<button type="button" data-admin-copy="' + escHtml(tk.token_code) + '" class="p-1.5 rounded-lg hover:bg-sky-100 text-primary" title="Salin Kode"><span class="material-symbols-outlined text-[16px]">content_copy</span></button>' +
            '</div>' +
          '</td>' +
          '<td class="py-4 px-4">' +
            '<span class="inline-block px-2 py-0.5 rounded bg-primary-fixed text-primary text-[10px] font-bold mb-1">' + escHtml(tk.tab_badge || 'Token Akses') + '</span>' +
            '<p class="font-bold text-on-surface">' + escHtml(tk.token_label) + '</p>' +
            '<p class="text-[11px] text-outline truncate max-w-xs">' + escHtml(tk.batch_info || '') + (tk.description ? ' • ' + escHtml(tk.description) : '') + '</p>' +
          '</td>' +
          '<td class="py-4 px-4 font-bold text-on-surface">' + Number(tk.copy_count || 0) + 'x<span class="text-[11px] font-normal text-outline">' + escHtml(quotaInfo) + '</span></td>' +
          '<td class="py-4 px-4">' +
            '<label class="inline-flex items-center gap-2 cursor-pointer">' +
              '<input type="checkbox" data-tok-toggle="' + escHtml(tk.token_id) + '" ' + (isAct ? 'checked' : '') + ' class="rounded text-tertiary" />' +
              '<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ' + (isAct ? 'bg-emerald-50 text-tertiary' : 'bg-slate-100 text-outline') + '">' + (isAct ? 'Ditampilkan' : 'Arsip') + '</span>' +
            '</label>' +
          '</td>' +
          '<td class="py-4 px-5 text-right whitespace-nowrap">' +
            '<button type="button" data-tok-edit="' + escHtml(tk.token_id) + '" class="px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-sky-100 text-primary font-bold mr-1">Edit</button>' +
            '<button type="button" data-tok-del="' + escHtml(tk.token_id) + '" class="px-2.5 py-1.5 rounded-xl hover:bg-red-50 text-error font-bold">Hapus</button>' +
          '</td>' +
        '</tr>';
    }).join('');
  }

  function openTokenModal(tokenId) {
    const modal = $('token-modal');
    if (!modal) return;
    const existing = tokenId ? (state.adminData.tokens || []).find(function (t) { return t.token_id === tokenId; }) : null;

    if ($('token-modal-title')) $('token-modal-title').textContent = existing ? 'Edit Token Akses Kelas' : 'Tempel Token Akses Baru';
    if ($('tok-form-id')) $('tok-form-id').value = existing ? existing.token_id : '';
    if ($('tok-form-code')) $('tok-form-code').value = existing ? existing.token_code : '';
    if ($('tok-form-tab')) $('tok-form-tab').value = existing ? (existing.tab_badge || 'Token Utama') : 'Token Utama';
    if ($('tok-form-label')) $('tok-form-label').value = existing ? existing.token_label : '';
    if ($('tok-form-desc')) $('tok-form-desc').value = existing ? (existing.description || '') : '';
    if ($('tok-form-batch')) $('tok-form-batch').value = existing ? (existing.batch_info || '') : 'Batch Resmi Lynk.id';
    if ($('tok-form-quota')) $('tok-form-quota').value = (existing && existing.quota_limit) ? existing.quota_limit : '';
    if ($('tok-form-active')) $('tok-form-active').checked = existing ? (existing.is_active !== false) : true;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(function () { if ($('tok-form-code')) $('tok-form-code').focus(); }, 80);
  }

  function closeTokenModal() {
    const modal = $('token-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  async function handleTokenFormSubmit(e) {
    e.preventDefault();
    const rawCode = ($('tok-form-code') ? $('tok-form-code').value : '').trim().replace(/\s+/g, '');
    const label = ($('tok-form-label') ? $('tok-form-label').value : '').trim();
    if (!rawCode || !label) {
      showToast('Kode Token dan Nama Paket wajib diisi!', true);
      return;
    }

    const payload = {
      token_id: $('tok-form-id') ? $('tok-form-id').value.trim() : '',
      token_code: rawCode,
      tab_badge: ($('tok-form-tab') ? $('tok-form-tab').value.trim() : '') || 'Token Akses',
      token_label: label,
      description: $('tok-form-desc') ? $('tok-form-desc').value.trim() : '',
      batch_info: ($('tok-form-batch') ? $('tok-form-batch').value.trim() : '') || 'Batch Lynk.id',
      quota_limit: $('tok-form-quota') && $('tok-form-quota').value ? Number($('tok-form-quota').value) : 0,
      is_active: $('tok-form-active') ? $('tok-form-active').checked : true
    };

    try {
      if (!state.isDemoAdmin) {
        const res = await api('admin.saveToken', payload);
        showToast(res.message || 'Token berhasil disimpan!');
        closeTokenModal();
        await loadAdminBoot();
      } else {
        if (payload.token_id) {
          const idx = state.adminData.tokens.findIndex(function (x) { return x.token_id === payload.token_id; });
          if (idx > -1) state.adminData.tokens[idx] = Object.assign({}, state.adminData.tokens[idx], payload);
        } else {
          payload.token_id = 'TOK-LOCAL' + Date.now().toString().slice(-4);
          payload.copy_count = 0;
          payload.created_at = new Date().toISOString();
          state.adminData.tokens.unshift(payload);
        }
        syncAdminStateToPublicPreview();
        closeTokenModal();
        renderAllAdminViews();
        showToast('Token "' + rawCode + '" berhasil ditempel (Mode Lokal)!');
      }
    } catch (err) {
      showToast(err.message || 'Gagal menyimpan token.', true);
    }
  }

  // ==========================================================================
  // 11. TAB 5: KEAMANAN SCRIPT PROPERTIES & MIGRASI DATABASE SPREADSHEET
  // ==========================================================================
  function renderAdminSecretsStatus() {
    const st = state.adminData.secretsStatus || {};
    const badge = $('sec-oauth-status');
    if (badge) {
      badge.textContent = st.hasGoogleOAuth ? ('Aktif (' + (st.googleClientIdMasked || 'Tersimpan') + ')') : 'Belum diatur';
      badge.className = 'text-[11px] font-bold ' + (st.hasGoogleOAuth ? 'text-tertiary' : 'text-amber-600');
    }
    if ($('sec-google-client-id')) $('sec-google-client-id').value = st.googleClientId || '';
    if ($('sec-admin-emails')) $('sec-admin-emails').value = st.adminEmailAllowlist || '';
    if ($('sec-emergency-user')) $('sec-emergency-user').value = st.emergencyUser || 'darurat';
    if ($('sec-emergency-pass')) $('sec-emergency-pass').value = '';
  }

  async function handleSaveSecrets(e) {
    e.preventDefault();
    if (state.isDemoAdmin) {
      showToast('Hubungkan GAS_URL terlebih dahulu untuk menyimpan ke Script Properties.', true);
      return;
    }

    const secrets = {
      GOOGLE_CLIENT_ID: $('sec-google-client-id') ? $('sec-google-client-id').value.trim() : '',
      ADMIN_EMAIL_ALLOWLIST: $('sec-admin-emails') ? $('sec-admin-emails').value.trim() : '',
      EMERGENCY_USER: $('sec-emergency-user') ? $('sec-emergency-user').value.trim() : '',
      EMERGENCY_NEW_PASS: $('sec-emergency-pass') ? $('sec-emergency-pass').value : ''
    };

    try {
      const res = await api('admin.saveSecrets', { secrets: secrets });
      if ($('sec-emergency-pass')) $('sec-emergency-pass').value = '';
      showToast(res.message || 'Konfigurasi keamanan berhasil diperbarui!');
      await loadAdminBoot();
    } catch (err) {
      showToast(err.message || 'Gagal menyimpan konfigurasi keamanan.', true);
    }
  }

  async function handleMigration(dryRun) {
    if (state.isDemoAdmin) {
      showToast('Hubungkan GAS_URL di js/config.js untuk menjalankan migrasi antar-Spreadsheet.', true);
      return;
    }
    const sourceVal = $('mig-source-input') ? $('mig-source-input').value.trim() : '';
    if (!sourceVal) {
      showToast('Tempelkan URL atau ID Google Spreadsheet sumber terlebih dahulu.', true);
      return;
    }
    if (!dryRun && !window.confirm('Jalankan sinkronisasi upsert dari Spreadsheet sumber ke database aplikasi ini sekarang?')) {
      return;
    }

    const box = $('mig-result-box');
    if (box) {
      box.classList.remove('hidden');
      box.innerHTML = '<p class="font-bold text-primary animate-pulse">Memproses ' + (dryRun ? 'Pindai Simulasi (Dry-Run)...' : 'Sinkronisasi Upsert Database...') + '</p>';
    }

    try {
      const action = dryRun ? 'admin.migrateDryRun' : 'admin.migrateExecute';
      const res = await api(action, {
        sourceIdOrUrl: sourceVal,
        options: {
          preserveDisabled: $('mig-preserve-disabled') ? $('mig-preserve-disabled').checked : true,
          includeAnalytics: $('mig-include-logs') ? $('mig-include-logs').checked : true
        }
      });

      const d = res.data || {};
      const tables = d.tables || {};
      const rowsHtml = Object.keys(tables).map(function (tbl) {
        const info = tables[tbl];
        if (info.skipped) {
          return '<div class="flex justify-between py-1 border-b border-sky-100"><span>' + escHtml(tbl) + '</span><span class="text-outline">Dilewati (' + escHtml(info.reason || 'tidak ada di sumber') + ')</span></div>';
        }
        return '<div class="flex justify-between py-1 border-b border-sky-100"><span class="font-mono font-bold">' + escHtml(tbl) + '</span><span>+' + (info.inserted || 0) + ' baru • ' + (info.updated || 0) + ' update • ' + (info.unchanged || 0) + ' tetap</span></div>';
      }).join('');

      if (box) {
        box.innerHTML =
          '<p class="font-extrabold ' + (dryRun ? 'text-primary' : 'text-tertiary') + '">' +
            (dryRun ? '✓ Hasil Simulasi Dry-Run (Aman, Belum Menulis):' : '✓ Sinkronisasi Database Selesai!') +
          '</p>' +
          '<p class="text-[11px] text-on-surface-variant">Sumber: <strong>' + escHtml(d.sourceTitle || 'Spreadsheet') + '</strong> (' + (d.durationMs || 0) + ' ms)</p>' +
          '<div class="pt-1">' + rowsHtml + '</div>';
      }

      if (!dryRun) {
        showToast('Migrasi & sinkronisasi selesai!');
        await loadAdminBoot();
      }
    } catch (err) {
      if (box) box.innerHTML = '<p class="text-error font-bold">Gagal: ' + escHtml(err.message) + '</p>';
      showToast(err.message || 'Proses migrasi gagal.', true);
    }
  }

  // ==========================================================================
  // 12. EVENT LISTENERS GLOBAL, SWR BOOTSTRAP & PUBLIC EXPORT
  // ==========================================================================
  function bindEvents() {
    // Delegasi klik terpusat agar elemen dinamis tetap super responsif
    document.addEventListener('click', async function (e) {
      const t = e.target;
      if (!t || !t.closest) return;

      // 1. Copy Token di Halaman Publik
      const copyBtn = t.closest('.btn-public-copy');
      if (copyBtn) {
        copyTokenCode(copyBtn.getAttribute('data-copy-code'), copyBtn.getAttribute('data-token-id'), copyBtn);
        return;
      }

      // 2. Pilih Video di Playlist YouTube Publik
      const ytSelect = t.closest('.btn-yt-select');
      if (ytSelect) {
        const idx = Number(ytSelect.getAttribute('data-play-idx') || 0);
        const tuts = state.pub.tutorials || [];
        state.activeVideoIdx = idx;
        state.activeVideoStartSec = 0;
        state.activeVideoAutoplay = true;
        renderActiveYoutubePlayer(tuts);
        if (tuts[idx]) {
          trackEvent('WATCH_TUTORIAL', tuts[idx].title, { video_id: tuts[idx].video_id });
        }
        return;
      }

      // 3. Lompat Menit Timecode Video YouTube
      const ytJump = t.closest('.btn-yt-jump');
      if (ytJump) {
        const sec = Number(ytJump.getAttribute('data-jump-sec') || 0);
        const tuts = state.pub.tutorials || [];
        state.activeVideoStartSec = sec;
        state.activeVideoAutoplay = true;
        renderActiveYoutubePlayer(tuts);
        celebrateAnabul('Melompat ke menit panduan yang kamu pilih! 🎬🐾');
        return;
      }

      // 4. Pelacakan Link Komunitas & Media Sosial
      const trackedLink = t.closest('.btn-tracked-link');
      if (trackedLink) {
        trackEvent(trackedLink.getAttribute('data-track-type'), trackedLink.getAttribute('data-track-target'));
        celebrateAnabul('Selamat bergabung! Jangan lupa sapa teman-teman di sana ya! 🐾');
        return;
      }

      // 5. Navigasi Tab Sidebar Admin
      const navBtn = t.closest('.admin-nav-btn');
      if (navBtn) {
        switchAdminTab(navBtn.getAttribute('data-admin-nav'));
        return;
      }

      // 6. Navigasi Sub-Tab CMS
      const cmsSubBtn = t.closest('.cms-sub-btn');
      if (cmsSubBtn) {
        switchCmsSub(cmsSubBtn.getAttribute('data-cms-sub'));
        return;
      }

      // 7. Tambah / Hapus Item Fasilitas di Section 4 CMS
      if (t.closest('#btn-add-benefit-item')) {
        collectCurrentCmsForm();
        const sb = getAdminSec('sec_benefits');
        sb.metadata.items = sb.metadata.items || [];
        sb.metadata.items.push({ icon: 'verified', tag: 'Bonus', title: 'Fasilitas Baru', desc: 'Deskripsi fasilitas paket Anda.' });
        renderCmsEditor();
        return;
      }
      const delBen = t.closest('[data-del-benefit]');
      if (delBen) {
        collectCurrentCmsForm();
        const idx = Number(delBen.getAttribute('data-del-benefit'));
        const sb = getAdminSec('sec_benefits');
        if (Array.isArray(sb.metadata.items)) sb.metadata.items.splice(idx, 1);
        renderCmsEditor();
        return;
      }

      // 8. Aksi Kartu Video Tutorial di Admin
      const vidEdit = t.closest('[data-vid-edit]');
      if (vidEdit) { openTutorialModal(vidEdit.getAttribute('data-vid-edit')); return; }

      const vidUp = t.closest('[data-vid-up]');
      if (vidUp) { reorderTutorialItem(Number(vidUp.getAttribute('data-vid-up')), -1); return; }

      const vidDown = t.closest('[data-vid-down]');
      if (vidDown) { reorderTutorialItem(Number(vidDown.getAttribute('data-vid-down')), 1); return; }

      const vidDel = t.closest('[data-vid-del]');
      if (vidDel) {
        const vidId = vidDel.getAttribute('data-vid-del');
        if (!window.confirm('Hapus video panduan ini dari playlist?')) return;
        try {
          if (!state.isDemoAdmin) {
            await api('admin.deleteTutorial', { video_id: vidId });
            await loadAdminBoot();
          } else {
            state.adminData.tutorials = state.adminData.tutorials.filter(function (v) { return v.video_id !== vidId; });
            syncAdminStateToPublicPreview();
            renderAllAdminViews();
          }
          showToast('Video tutorial dihapus.');
        } catch (err) { showToast(err.message, true); }
        return;
      }

      // 9. Aksi Tabel Token di Admin
      const admCopy = t.closest('[data-admin-copy]');
      if (admCopy) {
        copyTokenCode(admCopy.getAttribute('data-admin-copy'), '', null);
        return;
      }

      const tokEdit = t.closest('[data-tok-edit]');
      if (tokEdit) { openTokenModal(tokEdit.getAttribute('data-tok-edit')); return; }

      const tokDel = t.closest('[data-tok-del]');
      if (tokDel) {
        const tokId = tokDel.getAttribute('data-tok-del');
        if (!window.confirm('Hapus token ini secara permanen dari katalog?')) return;
        try {
          if (!state.isDemoAdmin) {
            await api('admin.deleteToken', { token_id: tokId });
            await loadAdminBoot();
          } else {
            state.adminData.tokens = state.adminData.tokens.filter(function (x) { return x.token_id !== tokId; });
            syncAdminStateToPublicPreview();
            renderAllAdminViews();
          }
          showToast('Token berhasil dihapus.');
        } catch (err) { showToast(err.message, true); }
      }
    });

    // Delegasi perubahan checkbox toggle (Token & Video) + Live Preview CMS
    document.addEventListener('change', async function (e) {
      const t = e.target;
      if (!t) return;

      if (t.hasAttribute('data-tok-toggle')) {
        const tokId = t.getAttribute('data-tok-toggle');
        const active = t.checked;
        try {
          if (!state.isDemoAdmin) {
            await api('admin.toggleToken', { token_id: tokId, is_active: active });
            await loadAdminBoot();
          } else {
            const item = state.adminData.tokens.find(function (x) { return x.token_id === tokId; });
            if (item) item.is_active = active;
            syncAdminStateToPublicPreview();
            renderAllAdminViews();
          }
          showToast('Status tampil token diperbarui!');
        } catch (err) { showToast(err.message, true); }
      }

      if (t.hasAttribute('data-vid-toggle')) {
        const vidId = t.getAttribute('data-vid-toggle');
        const active = t.checked;
        try {
          if (!state.isDemoAdmin) {
            await api('admin.toggleTutorial', { video_id: vidId, is_active: active });
            await loadAdminBoot();
          } else {
            const item = state.adminData.tutorials.find(function (x) { return x.video_id === vidId; });
            if (item) item.is_active = active;
            syncAdminStateToPublicPreview();
            renderAllAdminViews();
          }
          showToast('Status tayang video diperbarui!');
        } catch (err) { showToast(err.message, true); }
      }
    });

    document.addEventListener('input', function (e) {
      if (e.target && e.target.classList && e.target.classList.contains('cms-live-input')) {
        collectCurrentCmsForm();
        renderCmsMiniPreview();
      }
    });

    // Tombol-tombol statis utama
    if ($('btn-toggle-anabul')) {
      $('btn-toggle-anabul').addEventListener('click', function () {
        state.anabulOn = !state.anabulOn;
        localStorage.setItem(STORAGE_KEYS.ANABUL_ACTIVE, state.anabulOn ? '1' : '0');
        applyAnabulVisibility();
        showToast(state.anabulOn ? 'Anabul bangun & mengikuti kursormu lagi! 🐾' : 'Anabul istirahat dulu ya~ 💤');
      });
    }

    if ($('btn-anabul-corner')) {
      const tips = [
        'Tips #1: Tonton video panduan di atas supaya tidak bingung saat aktivasi kelas ya! 🎬🐾',
        'Tips #2: Klik tombol Salin pada kartu Token, lalu tempel di Portal Kelas! 🔑🐾',
        'Tips #3: Jangan lupa gabung Grup WhatsApp & Channel Telegram agar dapat info Zoom Live! 💬🐾',
        'Tips #4: Follow Instagram, YouTube & TikTok Mentor untuk update materi daging gratis! ✨🐾'
      ];
      let tipIdx = 0;
      $('btn-anabul-corner').addEventListener('click', function () {
        celebrateAnabul(tips[tipIdx % tips.length]);
        tipIdx++;
      });
    }

    if ($('btn-close-bubble')) {
      $('btn-close-bubble').addEventListener('click', function () {
        if ($('anabul-corner-bubble')) $('anabul-corner-bubble').classList.add('hidden');
      });
    }

    if ($('portal-main-cta')) {
      $('portal-main-cta').addEventListener('click', function () {
        trackEvent('CLICK_PORTAL', 'Tombol Utama Portal Kelas');
      });
    }
    if ($('mobile-btn-portal')) {
      $('mobile-btn-portal').addEventListener('click', function () {
        trackEvent('CLICK_PORTAL', 'Sticky Mobile Portal Kelas');
      });
    }
    if ($('mobile-btn-copy-primary')) {
      $('mobile-btn-copy-primary').addEventListener('click', function () {
        const firstTok = (state.pub.tokens || [])[0];
        if (firstTok) {
          copyTokenCode(firstTok.token_code, firstTok.token_id, null);
        } else {
          showToast('Belum ada token aktif untuk disalin.', true);
        }
      });
    }

    if ($('btn-show-portal-qr')) {
      $('btn-show-portal-qr').addEventListener('click', function () {
        const url = (state.pub.sections && state.pub.sections.sec_portal && state.pub.sections.sec_portal.cta_url) || 'https://lynk.id';
        if ($('portal-qr-img')) {
          $('portal-qr-img').src = 'https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=' + encodeURIComponent(url);
        }
        if ($('portal-qr-url')) $('portal-qr-url').textContent = url;
        if ($('qr-modal')) {
          $('qr-modal').classList.remove('hidden');
          $('qr-modal').classList.add('flex');
        }
      });
    }

    if ($('btn-closing-pdf')) {
      $('btn-closing-pdf').addEventListener('click', function () {
        trackEvent('DOWNLOAD_PDF', 'Cetak Rangkuman Panduan PDF');
        window.print();
      });
    }

    // Pembuka Modal Login Admin + Pemicu Jalur Darurat Tersembunyi
    if ($('btn-open-admin-auth')) {
      $('btn-open-admin-auth').addEventListener('click', function () { openAuthModal(false); });
    }
    if ($('btn-close-auth-modal')) {
      $('btn-close-auth-modal').addEventListener('click', closeAuthModal);
    }
    if ($('btn-enter-demo-admin')) {
      $('btn-enter-demo-admin').addEventListener('click', enterLocalDemoAdmin);
    }

    // Klik 5x pada ikon Perisai di Modal Login -> Buka Form Jalur Darurat!
    if ($('secret-shield-trigger')) {
      $('secret-shield-trigger').addEventListener('click', function () {
        state.shieldClicks++;
        clearTimeout(state.shieldTimer);
        state.shieldTimer = setTimeout(function () { state.shieldClicks = 0; }, 2200);
        if (state.shieldClicks >= 5) {
          state.shieldClicks = 0;
          revealEmergencyForm();
        }
      });
    }

    // Pintasan Keyboard Rahasia Super Admin: Alt + Shift + E
    window.addEventListener('keydown', function (e) {
      if (e.altKey && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
        e.preventDefault();
        openAuthModal(true);
      }
    });

    if ($('emergency-login-form')) {
      $('emergency-login-form').addEventListener('submit', handleEmergencySubmit);
    }

    // Shell Admin Controls
    if ($('btn-open-sidebar')) $('btn-open-sidebar').addEventListener('click', function () { toggleMobileSidebar(true); });
    if ($('btn-close-sidebar')) $('btn-close-sidebar').addEventListener('click', function () { toggleMobileSidebar(false); });
    if ($('admin-sidebar-backdrop')) $('admin-sidebar-backdrop').addEventListener('click', function () { toggleMobileSidebar(false); });
    if ($('btn-switch-to-public')) $('btn-switch-to-public').addEventListener('click', showPublicView);
    if ($('btn-admin-logout')) $('btn-admin-logout').addEventListener('click', logoutAdmin);
    if ($('btn-admin-sync')) $('btn-admin-sync').addEventListener('click', loadAdminBoot);

    // Filter & Paginasi Log Analitik
    if ($('log-search-input')) $('log-search-input').addEventListener('input', function () { state.logsPage = 1; renderAdminLogsTable(); });
    if ($('log-type-filter')) $('log-type-filter').addEventListener('change', function () { state.logsPage = 1; renderAdminLogsTable(); });
    if ($('btn-logs-prev')) $('btn-logs-prev').addEventListener('click', function () { state.logsPage--; renderAdminLogsTable(); });
    if ($('btn-logs-next')) $('btn-logs-next').addEventListener('click', function () { state.logsPage++; renderAdminLogsTable(); });
    if ($('btn-export-logs-csv')) {
      $('btn-export-logs-csv').addEventListener('click', function () {
        const rows = getFilteredLogs().map(function (r) {
          return [r.timestamp, r.event_type, r.event_target, r.device_info, r.status_label];
        });
        exportCsvFile('ProductReceiver_Analytics_Logs.csv', ['Timestamp', 'Event Type', 'Target', 'Device', 'Status'], rows);
      });
    }

    // CMS, Video, Token, & Security Forms
    if ($('btn-save-all-cms')) $('btn-save-all-cms').addEventListener('click', saveAllCmsChanges);
    if ($('btn-open-add-tutorial')) $('btn-open-add-tutorial').addEventListener('click', function () { openTutorialModal(''); });
    if ($('vid-form-url')) $('vid-form-url').addEventListener('input', updateTutorialThumbPreview);
    if ($('btn-save-tut-header')) $('btn-save-tut-header').addEventListener('click', saveTutorialHeader);
    if ($('form-tutorial-video')) $('form-tutorial-video').addEventListener('submit', handleTutorialFormSubmit);

    if ($('btn-open-add-token')) $('btn-open-add-token').addEventListener('click', function () { openTokenModal(''); });
    if ($('form-token-manual')) $('form-token-manual').addEventListener('submit', handleTokenFormSubmit);
    if ($('tok-search-input')) $('tok-search-input').addEventListener('input', renderAdminTokens);
    if ($('tok-status-filter')) $('tok-status-filter').addEventListener('change', renderAdminTokens);
    if ($('tok-sort-filter')) $('tok-sort-filter').addEventListener('change', renderAdminTokens);
    if ($('btn-export-tokens-csv')) {
      $('btn-export-tokens-csv').addEventListener('click', function () {
        const rows = (state.adminData.tokens || []).map(function (tk) {
          return [tk.token_id, tk.token_code, tk.tab_badge, tk.token_label, tk.batch_info, tk.copy_count || 0, tk.is_active !== false ? 'AKTIF' : 'NON-AKTIF'];
        });
        exportCsvFile('ProductReceiver_Katalog_Token.csv', ['ID', 'Kode Token', 'Tab', 'Label Paket', 'Batch', 'Disalin', 'Status'], rows);
      });
    }

    if ($('form-save-secrets')) $('form-save-secrets').addEventListener('submit', handleSaveSecrets);
    if ($('btn-rotate-session')) {
      $('btn-rotate-session').addEventListener('click', async function () {
        if (state.isDemoAdmin) return;
        if (!window.confirm('Rotasi SESSION_SECRET akan mengeluarkan seluruh sesi login aktif dan meminta Anda login ulang. Lanjutkan?')) return;
        try {
          await api('admin.rotateSessionSecret', {});
          await logoutAdmin();
          showToast('SESSION_SECRET berhasil dirotasi! Silakan login kembali.');
        } catch (err) { showToast(err.message, true); }
      });
    }
    if ($('btn-mig-dryrun')) $('btn-mig-dryrun').addEventListener('click', function () { handleMigration(true); });
    if ($('btn-mig-execute')) $('btn-mig-execute').addEventListener('click', function () { handleMigration(false); });
    if ($('btn-force-bump-cache')) {
      $('btn-force-bump-cache').addEventListener('click', async function () {
        if (state.isDemoAdmin) { showToast('Cache lokal diperbarui!'); return; }
        try {
          const res = await api('admin.clearCache', {});
          showToast(res.message || 'CacheX publik berhasil disegarkan!');
        } catch (err) { showToast(err.message, true); }
      });
    }
  }

  // Bootstrapping SWR (Stale-While-Revalidate): Instan <50ms dari LocalStorage lalu sinkronisasi background!
  async function bootApplication() {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEYS.SESSION_USER);
      if (savedUser) state.adminUser = JSON.parse(savedUser);
    } catch (e) { /* abaikan */ }

    // 1. Render instan dari LocalStorage Cache jika tersedia
    try {
      const rawCache = localStorage.getItem(STORAGE_KEYS.PUB_CACHE);
      if (rawCache) {
        const parsed = JSON.parse(rawCache);
        if (parsed && parsed.data && parsed.data.sections) {
          state.pub = parsed.data;
        }
      }
    } catch (e) { /* abaikan */ }

    renderPublicPortal();
    initCursorAndAnabul();
    bindEvents();

    // Cek hash rahasia (#darurat atau #admin) di URL
    if (window.location.hash === '#darurat') {
      openAuthModal(true);
    } else if (window.location.hash === '#admin') {
      openAuthModal(false);
    }

    // 2. Revalidasi di latar belakang ke REST API Google Apps Script
    if (isGasConfigured()) {
      try {
        const res = await api('public.boot', {}, { get: true });
        if (res && res.data) {
          state.pub = res.data;
          localStorage.setItem(STORAGE_KEYS.PUB_CACHE, JSON.stringify({
            savedAt: Date.now(),
            data: res.data
          }));
          renderPublicPortal();
        }
      } catch (err) {
        // Tetap tampil mulus menggunakan cache/default tanpa error mengganggu pembeli
        console.warn('[ProductReceiver] Background sync info:', err.message);
      }

      // Catat 1x PAGE_VIEW per sesi tab browser pembeli
      if (!sessionStorage.getItem(STORAGE_KEYS.VIEWED_SESSION)) {
        sessionStorage.setItem(STORAGE_KEYS.VIEWED_SESSION, '1');
        trackEvent('PAGE_VIEW', 'Landing Page Serah Terima');
      }
    }
  }

  // Ekspor fungsi terpilih untuk pemanggilan inline modal
  window.PRApp = {
    showPublicView: showPublicView,
    showAdminView: showAdminView,
    switchAdminTab: switchAdminTab,
    openTokenModal: openTokenModal,
    closeTokenModal: closeTokenModal,
    openTutorialModal: openTutorialModal,
    closeTutorialModal: closeTutorialModal
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootApplication);
  } else {
    bootApplication();
  }
})();
