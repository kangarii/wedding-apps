/**
 * KONFIGURASI
 */
const CONFIG = {
    weddingDate: "Dec 31, 2025 08:00:00",
    waNumber: "6281234567890",
    defaultGuest: "Tamu Undangan"
};

/**
 * 1. URL PARSER (Fitur Nama Tamu Otomatis)
 */
const urlParams = new URLSearchParams(window.location.search);
const tamu = urlParams.get('to') || CONFIG.defaultGuest;
const guestNameFormatted = tamu.replace(/_/g, ' '); 

document.getElementById('guest-name').innerText = guestNameFormatted;
document.getElementById('form-name').value = guestNameFormatted;

/**
 * 2. KONTROL UTAMA
 */
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
let isPlaying = false;

function startInvitation() {
    // Animasi Penutup Screen Awal
    document.getElementById('welcome-screen').style.transform = 'translateY(-100%)';
    document.getElementById('main-content').classList.remove('hidden');
    document.body.style.overflow = 'auto'; // Aktifkan scroll
    
    // Play Musik Otomatis
    music.play().catch(() => console.log("User interaction required for audio"));
    isPlaying = true;

    // Inisialisasi library
    AOS.init({ duration: 1200, once: true });
    
    // Inisialisasi Carousel
    new Swiper(".mySwiper", {
        autoplay: { delay: 3500, disableOnInteraction: false },
        pagination: { el: ".swiper-pagination", clickable: true },
        effect: "fade",
        fadeEffect: { crossFade: true }
    });
}

function toggleMusic() {
    if (isPlaying) {
        music.pause();
        musicBtn.classList.remove('music-spin');
    } else {
        music.play();
        musicBtn.classList.add('music-spin');
    }
    isPlaying = !isPlaying;
}

/**
 * 3. COUNTDOWN TIMER
 */
function updateCountdown() {
    const target = new Date(CONFIG.weddingDate).getTime();
    const now = new Date().getTime();
    const gap = target - now;

    if (gap <= 0) {
        document.getElementById("countdown").innerHTML = "HARI BAHAGIA TELAH TIBA!";
        return;
    }

    const d = Math.floor(gap / (1000 * 60 * 60 * 24));
    const h = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));

    const html = `
        <div class="bg-amber-800 text-white w-20 py-4 rounded-2xl shadow-lg border-b-4 border-amber-900">
            <span class="block text-2xl font-bold">${d}</span>
            <span class="text-[10px] uppercase tracking-tighter">Hari</span>
        </div>
        <div class="bg-amber-800 text-white w-20 py-4 rounded-2xl shadow-lg border-b-4 border-amber-900">
            <span class="block text-2xl font-bold">${h}</span>
            <span class="text-[10px] uppercase tracking-tighter">Jam</span>
        </div>
        <div class="bg-amber-800 text-white w-20 py-4 rounded-2xl shadow-lg border-b-4 border-amber-900">
            <span class="block text-2xl font-bold">${m}</span>
            <span class="text-[10px] uppercase tracking-tighter">Menit</span>
        </div>
    `;
    document.getElementById("countdown").innerHTML = html;
}
setInterval(updateCountdown, 1000);
updateCountdown();

/**
 * 4. RSVP WHATSAPP REDIRECT
 */
const rsvpForm = document.getElementById('rsvp-form');
if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('form-name').value;
        const msg = document.getElementById('form-msg').value;
        
        const text = `Halo Romeo & Juliet, Saya *${name}* ingin mengonfirmasi kehadiran serta mendoakan: %0A%0A"${msg}"`;
        window.open(`https://api.whatsapp.com/send?phone=${CONFIG.waNumber}&text=${text}`, '_blank');
        
        rsvpForm.reset();
        alert("Pesan Anda telah disiapkan. Anda akan dialihkan ke WhatsApp.");
    });
}

/**
 * FUNGSI COUNTDOWN
 */
function updateTimer() {
    // Ambil tanggal pernikahan dari CONFIG yang sudah kita buat sebelumnya
    const targetDate = new Date(CONFIG.weddingDate).getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Elemen tempat menampilkan countdown
    const countdownElement = document.getElementById("countdown");

    if (!countdownElement) return;

    // Jika waktu sudah lewat
    if (distance < 0) {
        countdownElement.innerHTML = "<p class='font-serif italic text-2xl text-amber-800'>Acara Sedang Berlangsung!</p>";
        return;
    }

    // Kalkulasi waktu Hari, Jam, Menit, Detik
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Template HTML untuk kotak countdown yang estetik
    countdownElement.innerHTML = `
        <div class="flex flex-col items-center">
            <div class="bg-amber-800 text-white w-16 h-16 md:w-20 md:h-20 rounded-2xl shadow-lg flex items-center justify-center mb-2">
                <span class="text-2xl md:text-3xl font-bold">${days}</span>
            </div>
            <span class="text-[10px] uppercase tracking-widest text-stone-500 font-semibold">Hari</span>
        </div>
        <div class="flex flex-col items-center">
            <div class="bg-amber-800 text-white w-16 h-16 md:w-20 md:h-20 rounded-2xl shadow-lg flex items-center justify-center mb-2">
                <span class="text-2xl md:text-3xl font-bold">${hours}</span>
            </div>
            <span class="text-[10px] uppercase tracking-widest text-stone-500 font-semibold">Jam</span>
        </div>
        <div class="flex flex-col items-center">
            <div class="bg-amber-800 text-white w-16 h-16 md:w-20 md:h-20 rounded-2xl shadow-lg flex items-center justify-center mb-2">
                <span class="text-2xl md:text-3xl font-bold">${minutes}</span>
            </div>
            <span class="text-[10px] uppercase tracking-widest text-stone-500 font-semibold">Menit</span>
        </div>
        <div class="flex flex-col items-center">
            <div class="bg-amber-800 text-white w-16 h-16 md:w-20 md:h-20 rounded-2xl shadow-lg flex items-center justify-center mb-2">
                <span class="text-2xl md:text-3xl font-bold">${seconds}</span>
            </div>
            <span class="text-[10px] uppercase tracking-widest text-stone-500 font-semibold">Detik</span>
        </div>
    `;
}

// Jalankan fungsi setiap 1 detik
setInterval(updateTimer, 1000);

// Panggil sekali di awal agar tidak menunggu 1 detik saat halaman dimuat
updateTimer();

