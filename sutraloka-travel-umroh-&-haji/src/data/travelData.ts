export interface PaketUmroh {
  id: string;
  program: string;
  durasi_angka: number;
  harga: number;
  harga_display: string;
  include: string[];
  catatan: string;
  status: string;
  travelId: string;
  hotelBintang?: number;
  hotelMakkah?: string;
  hotelMadinah?: string;
  maskapai?: string;
  badge?: string;
  sisaSeat?: number;
  highlight?: string;
}

export interface Artikel {
  judul: string;
  tanggal: string;
  kategori?: string;
  ringkasan?: string;
  readTime?: string;
}

export interface JadwalKeberangkatanItem {
  id: string;
  tanggal: string;
  bulan: string;
  tahun: number;
  hariKeberangkatan: string;
  paketRef: string;
  maskapai: string;
  rute: string;
  sisaSeat: number;
  crowdLevel: 'Low' | 'Moderate' | 'High';
  status: 'Tersedia' | 'Hampir Penuh' | 'Waiting List';
}

export const SUTRALOKA_DATA = {
  sumber: "https://sutra-travel.com/web/index.php/",
  ringkasan: {
    total_raw: 71,
    total_artikel_bersih: 7,
    total_paket: 13
  },
  artikel: [
    {
      judul: "5 Alasan Kenapa Bulan Ini Waktu Terbaik Buat Umroh",
      tanggal: "03 September 2026",
      kategori: "Tips Ibadah",
      readTime: "4 min baca",
      ringkasan: "Memilih waktu terbaik untuk menunaikan ibadah umroh dipengaruhi oleh cuaca di tanah suci, kepadatan jamaah di Masjidil Haram, serta penawaran paket penerbangan langsung yang lebih terjangkau."
    },
    {
      judul: "Travel Umrah & Haji Resmi Terpercaya dan Terakreditasi A",
      tanggal: "06 August 2026",
      kategori: "Legalitas & Mutu",
      readTime: "3 min baca",
      ringkasan: "Sutra Tour & Travel (Sutraloka) mengantongi izin resmi Kementerian Agama RI dengan Akreditasi A, menjamin kepastian jadwal terbang, akomodasi hotel bintang, dan bimbingan ibadah sesuai sunnah."
    },
    {
      judul: "Travel Umroh Gresik yang amanah? Sutra Tour & Travel paket umroh nyaman legalitas resmi Kemenag.",
      tanggal: "14 April 2026",
      kategori: "Info Cabang",
      readTime: "5 min baca",
      ringkasan: "Bagi jamaah wilayah Jawa Timur khususnya Surabaya, Gresik, dan sekitarnya, layanan pendampingan manasik komprehensif dan handling bandara Juanda hadir memberikan kenyamanan ekstra."
    },
    {
      judul: "Daftar Vaksin Umroh 2026: Syarat Wajib, Rekomendasi & Biaya Terbaru",
      tanggal: "06 April 2026",
      kategori: "Kesehatan",
      readTime: "4 min baca",
      ringkasan: "Kemenkes dan otoritas Saudi memperbarui protokol kesehatan untuk jamaah 2026. Simak rincian vaksin Meningitis, Influenza, serta prosedur sertifikat ICV internasional."
    },
    {
      judul: "Biaya Haji Plus 2026, Rincian Paket, Fasilitas, dan Cara Daftar di Sutra Travel",
      tanggal: "06 April 2026",
      kategori: "Haji Khusus",
      readTime: "6 min baca",
      ringkasan: "Penjelasan lengkap program Haji Khusus (Haji Plus) masa tunggu lebih singkat, tenda VIP ber-AC di Arafah & Mina, serta hotel ring 1 di depan pelataran Masjidil Haram."
    },
    {
      judul: "Paket Umroh Syawal 2026, Biaya Umroh Setelah Lebaran & Promo Menarik Sutra Travel",
      tanggal: "30 March 2026",
      kategori: "Promo Spesial",
      readTime: "4 min baca",
      ringkasan: "Nikmati suasana Idul Fitri dan keutamaan ibadah di bulan Syawal dengan ketenangan luar biasa serta bonus city tour Thaif gratis."
    },
    {
      judul: "Paket Umroh Kereta Cepat Haramain, Paket Plus Thaif & Akomodasi Bintang 5 Dekat Masjidil Haram",
      tanggal: "29 March 2026",
      kategori: "Fasilitas Mewah",
      readTime: "5 min baca",
      ringkasan: "Perjalanan Makkah ke Madinah kini hanya 2 jam dengan Haramain High Speed Railway, menghemat energi jamaah agar lebih fokus beribadah di Raudhah dan Masjid Nabawi."
    }
  ] as Artikel[],

  paket_umroh: [
    {
      id: "program-16-hari-0",
      program: "16 HARI",
      durasi_angka: 16,
      harga: 38050000,
      harga_display: "Rp. 38,050,000",
      include: [
        "Pesawat",
        "Hotel",
        "Tour Leader",
        "Makan (3x Sehari)",
        "Akomodasi",
        "Perlengkapan"
      ],
      catatan: "Harga Sewaktu-waktu Bisa berubah",
      status: "Aktif",
      travelId: "sutra",
      hotelBintang: 5,
      hotelMakkah: "Pullman Zamzam / Setaraf (Depan Masjid)",
      hotelMadinah: "Front Taiba / Setaraf",
      maskapai: "Saudia Airlines Direct",
      badge: "Paling Populer",
      sisaSeat: 6,
      highlight: "Durasi panjang 16 hari untuk ibadah maksimal dan ziarah lengkap"
    },
    {
      id: "program-13-hari-1",
      program: "13 HARI",
      durasi_angka: 13,
      harga: 37500000,
      harga_display: "Rp. 37,500,000",
      include: [
        "Pesawat",
        "Hotel",
        "Tour Leader",
        "Makan (3x Sehari)",
        "Akomodasi",
        "Perlengkapan"
      ],
      catatan: "Harga Sewaktu-waktu Bisa berubah",
      status: "Aktif",
      travelId: "sutra",
      hotelBintang: 5,
      hotelMakkah: "Swissotel Al Maqam Makkah",
      hotelMadinah: "Al Aqeeq Madinah",
      maskapai: "Garuda Indonesia",
      badge: "Favorit Keluarga",
      sisaSeat: 10,
      highlight: "Termasuk Kereta Cepat Haramain & Ziarah Thaif"
    },
    {
      id: "program-16-hari-2",
      program: "16 HARI",
      durasi_angka: 16,
      harga: 36500000,
      harga_display: "Rp. 36,500,000",
      include: [
        "Pesawat",
        "Hotel",
        "Tour Leader",
        "Makan (3x Sehari)",
        "Akomodasi",
        "Perlengkapan"
      ],
      catatan: "Harga Sewaktu-waktu Bisa berubah",
      status: "Aktif",
      travelId: "sutra",
      hotelBintang: 4,
      hotelMakkah: "Grand Al Massa Makkah",
      hotelMadinah: "Rove Al Madinah",
      maskapai: "Saudia Airlines",
      badge: "Best Value",
      sisaSeat: 8,
      highlight: "Kombinasi hemat durasi panjang dengan layanan premium"
    },
    {
      id: "program-12-hari-3",
      program: "12 HARI",
      durasi_angka: 12,
      harga: 38600000,
      harga_display: "Rp. 38,600,000",
      include: [
        "Pesawat",
        "Hotel",
        "Tour Leader",
        "Makan (3x Sehari)",
        "Akomodasi",
        "Perlengkapan"
      ],
      catatan: "Harga Sewaktu-waktu Bisa berubah",
      status: "Aktif",
      travelId: "sutra",
      hotelBintang: 5,
      hotelMakkah: "Fairmont Makkah Clock Royal",
      hotelMadinah: "Dar Al Taqwa Madinah",
      maskapai: "Garuda Indonesia Direct",
      badge: "Executive VIP",
      sisaSeat: 4,
      highlight: "Akomodasi Bintang 5 Ring 1 dengan view Kaaba"
    },
    {
      id: "program-13-hari-4",
      program: "13 HARI",
      durasi_angka: 13,
      harga: 37500000,
      harga_display: "Rp. 37,500,000",
      include: [
        "Pesawat",
        "Hotel",
        "Tour Leader",
        "Makan (3x Sehari)",
        "Akomodasi",
        "Perlengkapan"
      ],
      catatan: "Harga Sewaktu-waktu Bisa berubah",
      status: "Aktif",
      travelId: "sutra",
      hotelBintang: 5,
      hotelMakkah: "Movenpick Hotel & Residence",
      hotelMadinah: "Madinah Hilton",
      maskapai: "Saudia Airlines",
      sisaSeat: 12,
      highlight: "Bimbingan Muthawwif berpengalaman lulusan Universitas Islam Madinah"
    },
    {
      id: "program-12-hari-5",
      program: "12 HARI",
      durasi_angka: 12,
      harga: 37600000,
      harga_display: "Rp. 37,600,000",
      include: [
        "Pesawat",
        "Hotel",
        "Tour Leader",
        "Makan (3x Sehari)",
        "Akomodasi",
        "Perlengkapan"
      ],
      catatan: "Harga Sewaktu-waktu Bisa berubah",
      status: "Aktif",
      travelId: "sutra",
      hotelBintang: 4,
      hotelMakkah: "Anjum Hotel Makkah",
      hotelMadinah: "Nozol Royal Inn",
      maskapai: "Oman Air Transit",
      sisaSeat: 7,
      highlight: "Program Umroh Reguler Nyaman & Fleksibel"
    },
    {
      id: "program-13-hari-6",
      program: "13 HARI",
      durasi_angka: 13,
      harga: 35000000,
      harga_display: "Rp. 35,000,000",
      include: [
        "Pesawat",
        "Hotel",
        "Tour Leader",
        "Makan (3x Sehari)",
        "Akomodasi",
        "Perlengkapan"
      ],
      catatan: "Harga Sewaktu-waktu Bisa berubah",
      status: "Aktif",
      travelId: "sutra",
      hotelBintang: 4,
      hotelMakkah: "Rayyana Ajyad Makkah",
      hotelMadinah: "Elaf Taiba",
      maskapai: "Lion Air Premium Charter",
      badge: "Promo Hemat",
      sisaSeat: 14,
      highlight: "Paket hemat terjangkau tanpa mengurangi kenyamanan ibadah"
    },
    {
      id: "program-16-hari-7",
      program: "16 HARI",
      durasi_angka: 16,
      harga: 36950000,
      harga_display: "Rp. 36,950,000",
      include: [
        "Pesawat",
        "Hotel",
        "Tour Leader",
        "Makan (3x Sehari)",
        "Akomodasi",
        "Perlengkapan"
      ],
      catatan: "Harga Sewaktu-waktu Bisa berubah",
      status: "Aktif",
      travelId: "sutra",
      hotelBintang: 4,
      hotelMakkah: "Le Meridien Towers",
      hotelMadinah: "Grand Plaza Madinah",
      maskapai: "Saudia Airlines",
      sisaSeat: 9,
      highlight: "Fasilitas shuttle bus 24 jam ke pelataran Masjidil Haram"
    },
    {
      id: "program-12-hari-8",
      program: "12 HARI",
      durasi_angka: 12,
      harga: 35000000,
      harga_display: "Rp. 35,000,000",
      include: [
        "Pesawat",
        "Hotel",
        "Tour Leader",
        "Makan (3x Sehari)",
        "Akomodasi",
        "Perlengkapan"
      ],
      catatan: "Harga Sewaktu-waktu Bisa berubah",
      status: "Aktif",
      travelId: "sutra",
      hotelBintang: 4,
      hotelMakkah: "Olayan Golden Hotel",
      hotelMadinah: "Rawda Royal Inn",
      maskapai: "Batik Air Direct",
      sisaSeat: 5,
      highlight: "Penerbangan direct tanpa transit, cocok untuk lansia"
    },
    {
      id: "program-13-hari-9",
      program: "13 HARI",
      durasi_angka: 13,
      harga: 35650000,
      harga_display: "Rp. 35,650,000",
      include: [
        "Pesawat",
        "Hotel",
        "Tour Leader",
        "Makan (3x Sehari)",
        "Akomodasi",
        "Perlengkapan"
      ],
      catatan: "Harga Sewaktu-waktu Bisa berubah",
      status: "Aktif",
      travelId: "sutra",
      hotelBintang: 4,
      hotelMakkah: "Voco Makkah An IHG Hotel",
      hotelMadinah: "Saja Al Madinah",
      maskapai: "Emirates Airlines",
      sisaSeat: 11,
      highlight: "Plus transit city tour Dubai 1 malam"
    },
    {
      id: "program-12-hari-10",
      program: "12 HARI",
      durasi_angka: 12,
      harga: 44500000,
      harga_display: "Rp. 44,500,000",
      include: [
        "Pesawat",
        "Hotel",
        "Tour Leader",
        "Makan (3x Sehari)",
        "Akomodasi",
        "Perlengkapan"
      ],
      catatan: "Harga Sewaktu-waktu Bisa berubah",
      status: "Aktif",
      travelId: "sutra",
      hotelBintang: 5,
      hotelMakkah: "Raffles Makkah Palace",
      hotelMadinah: "Oberoi Madinah",
      maskapai: "Garuda Indonesia Business",
      badge: "Ultra Luxury",
      sisaSeat: 3,
      highlight: "Suite langsung menghadap Ka'bah & akses butler pribadi"
    },
    {
      id: "program-11-hari-11",
      program: "11 HARI",
      durasi_angka: 11,
      harga: 26400000,
      harga_display: "Rp. 26,400,000",
      include: [
        "Pesawat",
        "Hotel",
        "Tour Leader",
        "Makan (3x Sehari)",
        "Akomodasi",
        "Perlengkapan"
      ],
      catatan: "Harga Sewaktu-waktu Bisa berubah",
      status: "Aktif",
      travelId: "sutra",
      hotelBintang: 3,
      hotelMakkah: "Al Kiswah Towers Makkah",
      hotelMadinah: "Concorde Dar Al Khair",
      maskapai: "Scoot / AirAsia",
      badge: "Super Budget",
      sisaSeat: 15,
      highlight: "Harga paling ekonomis terjangkau untuk jamaah pemula"
    },
    {
      id: "program-20-hari-12",
      program: "20 HARI",
      durasi_angka: 20,
      harga: 300000000,
      harga_display: "Rp. 300,000,000",
      include: [
        "Pesawat",
        "Hotel",
        "Tour Leader",
        "Makan (3x Sehari)",
        "Akomodasi",
        "Perlengkapan"
      ],
      catatan: "Harga Sewaktu-waktu Bisa berubah",
      status: "Aktif",
      travelId: "sutra",
      hotelBintang: 5,
      hotelMakkah: "Dar Al Tawhid Intercontinental Makkah",
      hotelMadinah: "The Oberoi Madinah Presidential",
      maskapai: "First Class Saudia Airlines",
      badge: "Haji Plus / Sultan VIP",
      sisaSeat: 2,
      highlight: "Program Khusus I'tikaf 10 Malam Terakhir Ramadan / Haji Plus Eksklusif"
    }
  ] as PaketUmroh[],

  menu: [
    "Paket UmrohAll-In",
    "Land Arrangement",
    "PaketVisa Only",
    "Umroh",
    "Haji",
    "Umroh Plus",
    "Home",
    "Paket",
    "Member",
    "Mitra",
    "Tentang"
  ],

  promo: [
    {
      tag: "10.10%FestivalPromo",
      title: "10.10 Festival Promo Berkah",
      subtitle: "Diskon hingga 10% untuk pendaftaran paket keberangkatan musim dingin 2026",
      badge: "Diskon 10.10",
      expiry: "Terbatas 50 Seat"
    },
    {
      tag: "HADIAH UMROH MILAD!",
      title: "HADIAH UMROH MILAD SUTRALOKA!",
      subtitle: "Anda berkesempatan mendapatkan undian mobil eksklusif & kupon gratis!",
      badge: "Milad Spesial",
      expiry: "Undian Akhir Tahun"
    },
    {
      tag: "Paket Umroh Syawal 2026",
      title: "Paket Umroh Syawal 2026",
      subtitle: "Biaya Umroh setelah Lebaran & Promo Menarik Sutra Travel + Free Ziarah Thaif",
      badge: "Musim Syawal",
      expiry: "Bulan Syawal 1447H"
    },
    {
      tag: "Free Kupon Undian MILAD",
      title: "Free Kupon Undian MILAD",
      subtitle: "Setiap booking paket 13/16 hari mendapatkan voucher belanja perlengkapan ibadah",
      badge: "Bonus Member",
      expiry: "Sutra Point Loyalty"
    }
  ],

  jadwal_keberangkatan: [
    "03 September 2026",
    "06 August 2026",
    "14 April 2026",
    "06 April 2026",
    "30 March 2026",
    "29 March 2026",
    "10 NOVEMBER 2026",
    "15 OKTOBER 2026",
    "25 OKTOBER 2026",
    "31 OKTOBER 2026",
    "08 DESEMBER 2026",
    "03 OKTOBER 2026",
    "08 SEPTEMBER 2026",
    "02 SEPTEMBER 2026",
    "05 SEPTEMBER 2026",
    "14 SEPTEMBER 2026"
  ],

  jadwal_detail: [
    {
      id: "jk-1",
      tanggal: "03 September 2026",
      bulan: "September",
      tahun: 2026,
      hariKeberangkatan: "Kamis",
      paketRef: "Program 16 Hari Reguler",
      maskapai: "Saudia Airlines SV-819 Direct",
      rute: "SUB - JED - MED",
      sisaSeat: 6,
      crowdLevel: "Low",
      status: "Tersedia"
    },
    {
      id: "jk-2",
      tanggal: "08 September 2026",
      bulan: "September",
      tahun: 2026,
      hariKeberangkatan: "Selasa",
      paketRef: "Program 13 Hari VIP Haramain",
      maskapai: "Garuda Indonesia GA-980",
      rute: "CGK - JED",
      sisaSeat: 4,
      crowdLevel: "Low",
      status: "Tersedia"
    },
    {
      id: "jk-3",
      tanggal: "14 September 2026",
      bulan: "September",
      tahun: 2026,
      hariKeberangkatan: "Senin",
      paketRef: "Program 12 Hari Executive",
      maskapai: "Saudia Airlines SV-821",
      rute: "SUB - MED",
      sisaSeat: 8,
      crowdLevel: "Moderate",
      status: "Tersedia"
    },
    {
      id: "jk-4",
      tanggal: "03 Oktober 2026",
      bulan: "Oktober",
      tahun: 2026,
      hariKeberangkatan: "Sabtu",
      paketRef: "Program 16 Hari Full Ziarah",
      maskapai: "Saudia Airlines Direct",
      rute: "CGK - JED",
      sisaSeat: 3,
      crowdLevel: "Moderate",
      status: "Hampir Penuh"
    },
    {
      id: "jk-5",
      tanggal: "15 Oktober 2026",
      bulan: "Oktober",
      tahun: 2026,
      hariKeberangkatan: "Kamis",
      paketRef: "Program 13 Hari Favorit",
      maskapai: "Garuda Indonesia Direct",
      rute: "SUB - JED",
      sisaSeat: 5,
      crowdLevel: "Moderate",
      status: "Tersedia"
    },
    {
      id: "jk-6",
      tanggal: "25 Oktober 2026",
      bulan: "Oktober",
      tahun: 2026,
      hariKeberangkatan: "Minggu",
      paketRef: "Program 12 Hari Hemat",
      maskapai: "Batik Air Direct",
      rute: "CGK - MED",
      sisaSeat: 11,
      crowdLevel: "Low",
      status: "Tersedia"
    },
    {
      id: "jk-7",
      tanggal: "31 Oktober 2026",
      bulan: "Oktober",
      tahun: 2026,
      hariKeberangkatan: "Sabtu",
      paketRef: "Program 16 Hari Super Comfort",
      maskapai: "Saudia Airlines Direct",
      rute: "SUB - JED",
      sisaSeat: 2,
      crowdLevel: "High",
      status: "Hampir Penuh"
    },
    {
      id: "jk-8",
      tanggal: "10 November 2026",
      bulan: "November",
      tahun: 2026,
      hariKeberangkatan: "Selasa",
      paketRef: "Program 13 Hari Plus Thaif",
      maskapai: "Garuda Indonesia",
      rute: "CGK - JED",
      sisaSeat: 7,
      crowdLevel: "Low",
      status: "Tersedia"
    },
    {
      id: "jk-9",
      tanggal: "08 Desember 2026",
      bulan: "Desember",
      tahun: 2026,
      hariKeberangkatan: "Selasa",
      paketRef: "Program Akhir Tahun Liburan 16 Hari",
      maskapai: "Saudia Airlines Direct",
      rute: "SUB - JED",
      sisaSeat: 1,
      crowdLevel: "High",
      status: "Hampir Penuh"
    }
  ] as JadwalKeberangkatanItem[],

  jadwalSholatMakkah: {
    lokasi: "Mecca Al-Mukarramah",
    tanggalHijri: "22 Rabiul Awwal 1448 H",
    nextPrayer: {
      nama: "Fajr",
      countdown: "1 h 24 min",
      waktu: "04:13"
    },
    times: [
      { nama: "Imsak", jam: "04:03", icon: "cloud-moon" },
      { nama: "Fajr", jam: "04:13", active: true, icon: "sun-rise" },
      { nama: "Zuhr", jam: "11:29", icon: "sun" },
      { nama: "Ashr", jam: "14:50", icon: "sun-cloud" },
      { nama: "Maghrib", jam: "17:26", icon: "sunset" },
      { nama: "Isya", jam: "18:36", icon: "moon" }
    ]
  },

  activeTicket: {
    ticketNumber: "STR-1055622848",
    permitType: "Noble Rawdah & Umrah Permit",
    passengerName: "Hasna Aulia Farhana",
    bookingCode: "SUTRA-7890X",
    programName: "Paket Umroh Reguler 16 Hari",
    departureDate: "03 September 2026",
    rawdahSlotTime: "20:30 - 20:59 AST",
    hotelMakkah: "Pullman Zamzam (5★)",
    hotelMadinah: "Front Taiba (5★)",
    flight: "Saudia Airlines SV-819 (SUB ✈ JED)",
    status: "Permit Confirmed",
    seatNumber: "14A & 14B",
    nusukStatus: "Valid QR Synchronized"
  }
};
