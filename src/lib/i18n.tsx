import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const languages = [
  { code: "en", label: "English", native: "ENG" },
  { code: "th", label: "Thai", native: "ไทย" },
] as const;

export type LanguageCode = (typeof languages)[number]["code"];

type Copy = {
  home: string;
  services: string;
  visit: string;
  bookAppointment: string;
  language: string;
  bookIntro: string;
  craft: string;
  precision: string;
  bookCta: string;
  menuCta: string;
  allCategories: string;
  categoryMen: string;
  categoryWomen: string;
  categoryKids: string;
  categoryColor: string;
  categoryTreatments: string;
  categoryGrooming: string;
  servicesCatalog: string;
  chooseService: string;
  options: string;
  selectedService: string;
  whatsIncluded: string;
  consultation: string;
  professionalService: string;
  cleanFinish: string;
  stylingAdvice: string;
  whatsappToBook: string;
  minutes: string;
  startingFrom: string;
  reviews: string;
  team: string;
  gallery: string;
  call: string;
  openNow: string;
  closed: string;
  closesIn: string;
  opensIn: string;
  whyUs: string;
  openingHours: string;
  liveGoogleReviews: string;
  getDirections: string;
  faqTitle: string;
  faqIntro: string;
  footerIntro: string;
  heroDescription?: string;
  watchRitual?: string;
  locations?: string;
  findYourChair?: string;
  visitLocations?: string;
  visualArchive?: string;
  framesFromChair?: string;
  videoPlaceholder?: string;
  peopleBehindChair?: string;
  lovedByCustomers?: string;
  congratulations?: string;
  unlockedDeal?: string;
  matchedOffer?: string;
  yourSaving?: string;
  dealPrice?: string;
  continueDeal?: string;
  bookingReady?: string;
  bookingReadyText?: string;
  bookingSent?: string;
  bookAnother?: string;
  beforeBook?: string;
  saveWithCombination?: string;
  beforeBookText?: string;
  viewSpecialDeals?: string;
  continueRegular?: string;
  chooseCollection?: string;
  chooseCollectionText?: string;
  mensDeals?: string;
  womensDeals?: string;
  specialDeals?: string;
  combineServices?: string;
  curatedDeals?: string;
  dealLabel?: string;
  saveLabel?: string;
  normalTotal?: string;
  discount?: string;
  youSave?: string;
  bookDeal?: string;
  galleryDescription?: string;
  videoMotion?: string;
  watchRhythm?: string;
  videoSlot?: string;
  comingSoon?: string;
  inFocus?: string;
  mp4Reel?: string;
  firstVisit?: string;
  welcomeTo?: string;
  memberPrice?: string;
  saveMore?: string;
  whenCombine?: string;
  curatedRituals?: string;
  exploreDeals?: string;
  locationLabel?: string;
  openMap?: string;
  teamIntro?: string;
  handsBehindCraft?: string;
  differentHands?: string;
  masterBarber?: string;
  selectedBarber?: string;
  specialties?: string;
  experience?: string;
  googleReviews?: string;
  experiences?: string;
  googleReviewer?: string;
  verifiedGoogle?: string;
  viewGoogleProfile?: string;
  footerRated?: string;
  snipText?: string;
  midnight?: string;
  whyPoints?: string[];
  dayNames?: string[];
  serviceMarquee?: string[];
  liveFromChair?: string;
  followInstagram?: string;
  instagramDescription?: string;
  servicesIntroLabel?: string;
  servicesHeadline?: string;
  servicesDescription?: string;
  popularSearches?: string;
  findExactService?: string;
  digitalConcierge?: string;
  nextCut?: string;
  whatsappReady?: string;
  reserve?: string;
  chair?: string;
  under60?: string;
  noPayment?: string;
  chairShape?: string;
  back?: string;
  continueLabel?: string;
  stepLabel?: string;
  yourVisit?: string;
  selectService?: string;
  gettingToday?: string;
  selectServices?: string;
  serviceFilters?: string[];
  serviceLabel?: string;
  minutesShort?: string;
  whenSeeYou?: string;
  pickDay?: string;
  timeWorks?: string;
  chairTime?: string;
  almostThere?: string;
  fullName?: string;
  whatsappNumber?: string;
  specialRequest?: string;
  requestPlaceholder?: string;
  appointment?: string;
};

const copy: Record<LanguageCode, Copy> = {
  en: {
    home: "Home",
    services: "Services",
    visit: "Visit",
    bookAppointment: "Book appointment",
    language: "Language",
    bookIntro:
      "Choose your service, find your moment, then send the request straight to the barber.",
    craft: "The Craft",
    precision: "Eagle-eye precision",
    bookCta: "Book appointment",
    menuCta: "See the menu",
    allCategories: "All",
    categoryMen: "Men",
    categoryWomen: "Women",
    categoryKids: "Kids",
    categoryColor: "Color",
    categoryTreatments: "Treatments",
    categoryGrooming: "Grooming",
    servicesCatalog: "Services catalog",
    chooseService: "Choose your service",
    options: "options",
    selectedService: "Selected service",
    whatsIncluded: "What's included",
    consultation: "Consultation",
    professionalService: "Professional service",
    cleanFinish: "Clean finish",
    stylingAdvice: "Styling advice",
    whatsappToBook: "WhatsApp to book",
    minutes: "min",
    startingFrom: "FROM",
    reviews: "Reviews",
    team: "Team",
    gallery: "Gallery",
    call: "Call",
    openNow: "Open now",
    closed: "Closed",
    closesIn: "Closes in",
    opensIn: "Opens in",
    whyUs: "Why us",
    openingHours: "Opening hours",
    liveGoogleReviews: "Live Google reviews",
    getDirections: "Get directions",
    faqTitle: "Bangkok barber FAQ",
    faqIntro: "Quick answers about services, prices, walk-ins, directions and opening hours.",
    footerIntro: "Sharp fades, straight-razor shaves and Thai herbal head spa on Sukhumvit Road.",
    heroDescription: "Bangkok Kropper is a professional barbershop in Sukhumvit, Bangkok, offering precision haircuts, modern fades, styling, beard trims, and premium grooming for both men and women.",
    watchRitual: "Watch the ritual",
    locations: "Locations",
    findYourChair: "Find your chair",
    visitLocations: "Visit Bangkok Kropper at either of our Bangkok locations.",
    visualArchive: "The visual archive",
    framesFromChair: "Frames from the chair",
    videoPlaceholder: "Your video will appear here.",
    peopleBehindChair: "The people behind the chair",
    lovedByCustomers: "Loved by our customers",
    congratulations: "Congratulations",
    unlockedDeal: "You unlocked a deal",
    matchedOffer: "Your selected services match our package.",
    yourSaving: "Your saving",
    dealPrice: "Deal price",
    continueDeal: "Continue with this deal",
    bookingReady: "Your booking request is ready!",
    bookingReadyText: "We’ve prepared your appointment details in WhatsApp. Please send the message to complete your booking request — we’ll reply to confirm.",
    bookingSent: "Booking request sent",
    bookAnother: "Book another visit",
    beforeBook: "Before you book",
    saveWithCombination: "Save more with a service combination.",
    beforeBookText: "Before you book, see whether a Men’s or Women’s service combination gives you a better price.",
    viewSpecialDeals: "View special deals",
    continueRegular: "Continue regular booking",
    chooseCollection: "Who are we styling today?",
    chooseCollectionText: "Choose a collection to see the offers curated for your visit.",
    mensDeals: "Men’s deals",
    womensDeals: "Women’s deals",
    specialDeals: "Special deals",
    combineServices: "Combine more services, save more.",
    curatedDeals: "Curated chair rituals with the details already considered. Pick a deal and arrive ready.",
    dealLabel: "Deal",
    saveLabel: "Save",
    normalTotal: "Normal total",
    discount: "Discount",
    youSave: "You save",
    bookDeal: "Book this deal",
    galleryDescription: "A living lookbook of sharp work, warm light and the details that make Bangkok Kropper feel different.",
    videoMotion: "Video / chair in motion",
    watchRhythm: "Watch the Kropper rhythm",
    videoSlot: "Video slot",
    comingSoon: "Coming soon",
    inFocus: "In focus",
    mp4Reel: "MP4 / reel",
    firstVisit: "First visit? Start here.",
    welcomeTo: "Welcome to",
    memberPrice: "Member price",
    saveMore: "SAVE MORE",
    whenCombine: "when you combine services",
    curatedRituals: "Curated barber rituals, better value. See the combinations our guests book most.",
    exploreDeals: "Explore the deals",
    locationLabel: "Location",
    openMap: "Open map",
    teamIntro: "The people behind the chair",
    handsBehindCraft: "Meet the hands behind the craft",
    differentHands: "Different hands. One standard. A better cut than you walked in for.",
    masterBarber: "Master barber",
    selectedBarber: "Selected barber",
    specialties: "Specialities",
    experience: "Experience",
    googleReviews: "Google reviews",
    experiences: "570+ experiences",
    googleReviewer: "Google reviewer",
    verifiedGoogle: "Verified on Google",
    viewGoogleProfile: "View Google profile",
    footerRated: "rated 4.9★ by 570+ customers.",
    snipText: "snip",
    midnight: "midnight",
    whyPoints: ["Walk-ins welcome until late", "Hot towel + straight razor finish", "Thai herbal head spa ritual", "English & Thai speaking barbers"],
    dayNames: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    serviceMarquee: ["Fades", "Razor shaves", "Beard sculpting", "Herbal head spa", "Walk-ins welcome"],
    liveFromChair: "Live from the chair",
    followInstagram: "Follow us on Instagram",
    instagramDescription: "New cuts, barber stories and the next sharp look land there first. Tap in and stay close to the chair.",
    servicesIntroLabel: "Our services",
    servicesHeadline: "Your style. Your look. Your transformation.",
    servicesDescription: "From classic cuts and beard grooming to professional hair coloring, treatments, and women's hair services — discover the right service for your look.",
    popularSearches: "Popular searches",
    findExactService: "Find your exact service",
    digitalConcierge: "Digital concierge",
    nextCut: "Your next cut starts here",
    whatsappReady: "WhatsApp ready",
    reserve: "Reserve",
    chair: "chair",
    under60: "Under 60 seconds",
    noPayment: "No payment required",
    chairShape: "The chair is yours to shape",
    back: "Back",
    continueLabel: "Continue",
    stepLabel: "Step",
    yourVisit: "Your visit",
    selectService: "Select a service",
    gettingToday: "What are you getting today?",
    selectServices: "Select one or more services, then continue when you are ready.",
    serviceFilters: ["All", "Men", "Women", "Kids", "Grooming", "Treatments", "Color"],
    serviceLabel: "service",
    minutesShort: "min",
    whenSeeYou: "When should we see you?",
    pickDay: "Pick any day in the next three weeks.",
    timeWorks: "What time works best?",
    chairTime: "chair time",
    almostThere: "Almost there",
    fullName: "Full name",
    whatsappNumber: "WhatsApp number",
    specialRequest: "Note / special request (optional)",
    requestPlaceholder: "Anything we should know before your visit?",
    appointment: "appointment",
  },
  th: {
    home: "หน้าหลัก",
    services: "บริการ",
    visit: "เยี่ยมชม",
    bookAppointment: "จองคิว",
    language: "ภาษา",
    bookIntro: "เลือกบริการ เลือกเวลาที่สะดวก แล้วส่งคำขอให้ช่างตัดผมโดยตรง",
    craft: "งานฝีมือ",
    precision: "ความประณีตในทุกรายละเอียด",
    bookCta: "จองคิว",
    menuCta: "ดูเมนูบริการ",
    allCategories: "ทั้งหมด",
    categoryMen: "ผู้ชาย",
    categoryWomen: "ผู้หญิง",
    categoryKids: "เด็ก",
    categoryColor: "ทำสี",
    categoryTreatments: "ทรีตเมนต์",
    categoryGrooming: "กรูมมิ่ง",
    servicesCatalog: "รายการบริการ",
    chooseService: "เลือกบริการของคุณ",
    options: "รายการ",
    selectedService: "บริการที่เลือก",
    whatsIncluded: "สิ่งที่รวมอยู่",
    consultation: "ปรึกษาสไตล์",
    professionalService: "บริการโดยมืออาชีพ",
    cleanFinish: "เก็บรายละเอียดเรียบร้อย",
    stylingAdvice: "คำแนะนำการจัดแต่งทรง",
    whatsappToBook: "จองผ่าน WhatsApp",
    minutes: "นาที",
    startingFrom: "เริ่มต้น",
    reviews: "รีวิว",
    team: "ทีมงาน",
    gallery: "แกลเลอรี",
    call: "โทร",
    openNow: "เปิดอยู่ตอนนี้",
    closed: "ปิดแล้ว",
    closesIn: "ปิดในอีก",
    opensIn: "เปิดในอีก",
    whyUs: "ทำไมต้องเรา",
    openingHours: "เวลาเปิดทำการ",
    liveGoogleReviews: "รีวิว Google ล่าสุด",
    getDirections: "ดูเส้นทาง",
    faqTitle: "คำถามที่พบบ่อย",
    faqIntro: "คำตอบเกี่ยวกับบริการ ราคา การเข้าร้านแบบไม่ได้นัดหมาย เส้นทาง และเวลาเปิดทำการ",
    footerIntro: "เฟดคมกริบ โกนหนวดด้วยมีดโกน และเฮดสปาสมุนไพรไทยบนถนนสุขุมวิท",
    heroDescription: "Bangkok Kropper คือร้านบาร์เบอร์มืออาชีพย่านสุขุมวิท กรุงเทพฯ ให้บริการตัดผม เฟด จัดแต่งทรง เล็มหนวดเครา และดูแลเส้นผมระดับพรีเมียมสำหรับทุกคน",
    watchRitual: "ชมขั้นตอนการดูแล",
    locations: "สาขา",
    findYourChair: "ค้นหาเก้าอี้ของคุณ",
    visitLocations: "แวะมา Bangkok Kropper ได้ที่หนึ่งในสองสาขาของเราในกรุงเทพฯ",
    visualArchive: "ภาพบรรยากาศของเรา",
    framesFromChair: "ภาพจากเก้าอี้ของเรา",
    videoPlaceholder: "วิดีโอของคุณจะแสดงที่นี่",
    peopleBehindChair: "ทีมงานเบื้องหลังเก้าอี้",
    lovedByCustomers: "เสียงจากลูกค้าของเรา",
    congratulations: "ยินดีด้วย",
    unlockedDeal: "คุณได้รับข้อเสนอพิเศษ",
    matchedOffer: "บริการที่คุณเลือกตรงกับแพ็กเกจพิเศษของเรา",
    yourSaving: "ยอดประหยัดของคุณ",
    dealPrice: "ราคาพิเศษ",
    continueDeal: "ดำเนินการต่อด้วยข้อเสนอนี้",
    bookingReady: "คำขอจองคิวของคุณพร้อมแล้ว",
    bookingReadyText: "เราเตรียมรายละเอียดนัดหมายไว้ใน WhatsApp แล้ว กรุณาส่งข้อความเพื่อยืนยันการจอง เราจะตอบกลับเพื่อยืนยันคิวของคุณ",
    bookingSent: "ส่งคำขอจองคิวแล้ว",
    bookAnother: "จองคิวอีกครั้ง",
    beforeBook: "ก่อนจองคิว",
    saveWithCombination: "ประหยัดมากขึ้นด้วยการเลือกบริการเป็นชุด",
    beforeBookText: "ก่อนจองคิว ลองดูชุดบริการสำหรับผู้ชายหรือผู้หญิงเพื่อรับราคาที่คุ้มค่ากว่า",
    viewSpecialDeals: "ดูข้อเสนอพิเศษ",
    continueRegular: "จองบริการปกติต่อ",
    chooseCollection: "วันนี้ต้องการดูแลแบบไหน",
    chooseCollectionText: "เลือกหมวดหมู่เพื่อดูข้อเสนอที่เหมาะกับการมาใช้บริการของคุณ",
    mensDeals: "ข้อเสนอสำหรับผู้ชาย",
    womensDeals: "ข้อเสนอสำหรับผู้หญิง",
    specialDeals: "ข้อเสนอพิเศษ",
    combineServices: "เลือกบริการเพิ่ม ประหยัดมากขึ้น",
    curatedDeals: "ชุดบริการที่คัดสรรและเตรียมรายละเอียดไว้ให้แล้ว เลือกข้อเสนอที่ชอบแล้วมาใช้บริการได้เลย",
    dealLabel: "ชุดที่",
    saveLabel: "ประหยัด",
    normalTotal: "ราคารวมปกติ",
    discount: "ส่วนลด",
    youSave: "คุณประหยัด",
    bookDeal: "จองข้อเสนอนี้",
    galleryDescription: "แกลเลอรีผลงานทรงผม แสงอบอุ่น และรายละเอียดที่ทำให้ Bangkok Kropper แตกต่าง",
    videoMotion: "วิดีโอ / บรรยากาศบนเก้าอี้",
    watchRhythm: "ชมจังหวะแบบ Kropper",
    videoSlot: "ช่องวิดีโอ",
    comingSoon: "เร็ว ๆ นี้",
    inFocus: "กำลังโฟกัส",
    mp4Reel: "MP4 / รีล",
    firstVisit: "มาครั้งแรกใช่ไหม เริ่มที่นี่",
    welcomeTo: "ยินดีต้อนรับสู่",
    memberPrice: "ราคาสมาชิก",
    saveMore: "ประหยัดมากขึ้น",
    whenCombine: "เมื่อเลือกบริการร่วมกัน",
    curatedRituals: "พิธีดูแลเส้นผมที่คัดสรร คุ้มค่ามากขึ้น ดูชุดบริการที่ลูกค้าของเราเลือกจองบ่อยที่สุด",
    exploreDeals: "ดูข้อเสนอพิเศษ",
    locationLabel: "สาขา",
    openMap: "เปิดแผนที่",
    teamIntro: "ทีมงานเบื้องหลังเก้าอี้",
    handsBehindCraft: "พบกับทีมงานผู้สร้างสรรค์ผลงาน",
    differentHands: "ทีมงานต่างสไตล์ มาตรฐานเดียวกัน และทรงผมที่ดีกว่าที่คุณคาดไว้",
    masterBarber: "ช่างตัดผมมืออาชีพ",
    selectedBarber: "ช่างที่เลือก",
    specialties: "ความเชี่ยวชาญ",
    experience: "ประสบการณ์",
    googleReviews: "รีวิว Google",
    experiences: "ประสบการณ์กว่า 570 รายการ",
    googleReviewer: "ผู้รีวิวบน Google",
    verifiedGoogle: "ยืนยันแล้วบน Google",
    viewGoogleProfile: "ดูโปรไฟล์ Google",
    footerRated: "คะแนน 4.9★ จากลูกค้ากว่า 570 คน",
    snipText: "ครั้ง",
    midnight: "เที่ยงคืน",
    whyPoints: ["ยินดีต้อนรับลูกค้าที่ไม่ได้จองคิวจนถึงดึก", "ผ้าร้อนและการโกนด้วยมีดโกน", "พิธีเฮดสปาสมุนไพรไทย", "ช่างพูดภาษาอังกฤษและภาษาไทย"],
    dayNames: ["วันจันทร์", "วันอังคาร", "วันพุธ", "วันพฤหัสบดี", "วันศุกร์", "วันเสาร์", "วันอาทิตย์"],
    serviceMarquee: ["เฟด", "โกนหนวด", "แต่งทรงหนวดเครา", "เฮดสปาสมุนไพร", "ยินดีต้อนรับลูกค้าไม่ได้นัดหมาย"],
    liveFromChair: "อัปเดตสดจากเก้าอี้",
    followInstagram: "ติดตามเราบน Instagram",
    instagramDescription: "ทรงผมใหม่ เรื่องราวจากร้าน และลุคคม ๆ ล่าสุด จะอัปเดตก่อนใครที่นี่ ติดตามเราและใกล้ชิดกับบรรยากาศบนเก้าอี้",
    servicesIntroLabel: "บริการของเรา",
    servicesHeadline: "สไตล์ของคุณ ลุคของคุณ การเปลี่ยนแปลงของคุณ",
    servicesDescription: "ตั้งแต่ทรงคลาสสิกและการดูแลหนวดเครา ไปจนถึงการทำสีผม ทรีตเมนต์ และบริการทำผมสำหรับผู้หญิง เลือกบริการที่เหมาะกับลุคของคุณ",
    popularSearches: "บริการยอดนิยม",
    findExactService: "ค้นหาบริการที่ตรงกับคุณ",
    digitalConcierge: "ผู้ช่วยดูแลการจองแบบดิจิทัล",
    nextCut: "ทรงผมครั้งต่อไปของคุณเริ่มที่นี่",
    whatsappReady: "พร้อมติดต่อผ่าน WhatsApp",
    reserve: "จอง",
    chair: "เก้าอี้ของคุณ",
    under60: "ใช้เวลาไม่ถึง 60 วินาที",
    noPayment: "ไม่ต้องชำระเงินล่วงหน้า",
    chairShape: "ออกแบบบริการบนเก้าอี้ในแบบของคุณ",
    back: "ย้อนกลับ",
    continueLabel: "ดำเนินการต่อ",
    stepLabel: "ขั้นตอน",
    yourVisit: "การเข้ารับบริการของคุณ",
    selectService: "เลือกบริการ",
    gettingToday: "วันนี้ต้องการรับบริการอะไร",
    selectServices: "เลือกหนึ่งบริการหรือมากกว่า แล้วดำเนินการต่อเมื่อพร้อม",
    serviceFilters: ["ทั้งหมด", "ผู้ชาย", "ผู้หญิง", "เด็ก", "กรูมมิ่ง", "ทรีตเมนต์", "ทำสี"],
    serviceLabel: "บริการ",
    minutesShort: "นาที",
    whenSeeYou: "สะดวกให้เราเจอคุณวันไหน",
    pickDay: "เลือกวันใดก็ได้ในสามสัปดาห์ข้างหน้า",
    timeWorks: "เวลาไหนสะดวกที่สุด",
    chairTime: "เวลาใช้บริการ",
    almostThere: "ใกล้เสร็จแล้ว",
    fullName: "ชื่อ-นามสกุล",
    whatsappNumber: "หมายเลข WhatsApp",
    specialRequest: "หมายเหตุ / คำขอพิเศษ (ไม่บังคับ)",
    requestPlaceholder: "มีอะไรที่เราควรรู้ก่อนมาใช้บริการไหม",
    appointment: "นัดหมาย",
  },
  /* legacy languages removed from the public selector */
  /* ja: {
    home: "ホーム",
    services: "サービス",
    visit: "アクセス",
    bookAppointment: "予約する",
    language: "言語",
    bookIntro: "サービスと時間を選んで、バーバーへ直接リクエストを送信します。",
    craft: "職人技",
    precision: "一切の妥協なき精度",
    bookCta: "予約する",
    menuCta: "メニューを見る",
    allCategories: "すべて",
    categoryMen: "メンズ",
    categoryWomen: "レディース",
    categoryKids: "キッズ",
    categoryColor: "カラー",
    categoryTreatments: "トリートメント",
    categoryGrooming: "グルーミング",
    servicesCatalog: "サービス一覧",
    chooseService: "サービスを選択",
    options: "件",
    selectedService: "選択中のサービス",
    whatsIncluded: "内容",
    consultation: "カウンセリング",
    professionalService: "プロの施術",
    cleanFinish: "きれいな仕上げ",
    stylingAdvice: "スタイリング提案",
    whatsappToBook: "WhatsAppで予約",
    minutes: "分",
    startingFrom: "から",
    reviews: "レビュー",
    team: "チーム",
    gallery: "ギャラリー",
    call: "電話",
    openNow: "営業中",
    closed: "閉店",
    closesIn: "閉店まで",
    opensIn: "開店まで",
    whyUs: "選ばれる理由",
    openingHours: "営業時間",
    liveGoogleReviews: "Googleの最新レビュー",
    getDirections: "道順を見る",
    faqTitle: "よくある質問",
    faqIntro: "サービス、料金、予約なしの来店、アクセス、営業時間についての回答です。",
    footerIntro: "スクンビットで楽しむシャープなフェード、シェーブ、タイハーブヘッドスパ。",
  },
  fr: {
    home: "Accueil",
    services: "Services",
    visit: "Visiter",
    bookAppointment: "Réserver",
    language: "Langue",
    bookIntro: "Choisissez votre service et votre moment, puis envoyez la demande au barbier.",
    craft: "Le savoir-faire",
    precision: "Une précision remarquable",
    bookCta: "Réserver",
    menuCta: "Voir le menu",
    allCategories: "Tout",
    categoryMen: "Hommes",
    categoryWomen: "Femmes",
    categoryKids: "Enfants",
    categoryColor: "Couleur",
    categoryTreatments: "Soins",
    categoryGrooming: "Grooming",
    servicesCatalog: "Catalogue des services",
    chooseService: "Choisissez votre service",
    options: "options",
    selectedService: "Service sélectionné",
    whatsIncluded: "Inclus",
    consultation: "Consultation",
    professionalService: "Service professionnel",
    cleanFinish: "Finition soignée",
    stylingAdvice: "Conseils de coiffage",
    whatsappToBook: "Réserver sur WhatsApp",
    minutes: "min",
    startingFrom: "À partir de",
    reviews: "Avis",
    team: "Équipe",
    gallery: "Galerie",
    call: "Appeler",
    openNow: "Ouvert maintenant",
    closed: "Fermé",
    closesIn: "Ferme dans",
    opensIn: "Ouvre dans",
    whyUs: "Pourquoi nous",
    openingHours: "Heures d'ouverture",
    liveGoogleReviews: "Avis Google récents",
    getDirections: "Itinéraire",
    faqTitle: "FAQ du barber shop",
    faqIntro: "Réponses sur les services, les prix, les visites sans rendez-vous, l'accès et les horaires.",
    footerIntro: "Dégradés précis, rasages au coupe-chou et head spa thaï sur Sukhumvit Road.",
  },
  zh: {
    home: "首页",
    services: "服务",
    visit: "到店",
    bookAppointment: "预约理发",
    language: "语言",
    bookIntro: "选择服务和时间，然后将预约请求直接发送给理发师。",
    craft: "匠艺",
    precision: "精准细致",
    bookCta: "预约理发",
    menuCta: "查看菜单",
    allCategories: "全部",
    categoryMen: "男士",
    categoryWomen: "女士",
    categoryKids: "儿童",
    categoryColor: "染发",
    categoryTreatments: "护理",
    categoryGrooming: "造型护理",
    servicesCatalog: "服务目录",
    chooseService: "选择服务",
    options: "项",
    selectedService: "已选服务",
    whatsIncluded: "服务内容",
    consultation: "风格咨询",
    professionalService: "专业服务",
    cleanFinish: "精致收尾",
    stylingAdvice: "造型建议",
    whatsappToBook: "通过 WhatsApp 预约",
    minutes: "分钟",
    startingFrom: "起价",
    reviews: "评价",
    team: "团队",
    gallery: "图库",
    call: "致电",
    openNow: "正在营业",
    closed: "已关闭",
    closesIn: "距离关门",
    opensIn: "距离开门",
    whyUs: "选择我们的理由",
    openingHours: "营业时间",
    liveGoogleReviews: "Google最新评论",
    getDirections: "获取路线",
    faqTitle: "曼谷理发店常见问题",
    faqIntro: "关于服务、价格、无需预约到店、路线和营业时间的常见回答。",
    footerIntro: "位于素坤逸的精致渐变、直剃刀剃须和泰式草本头疗。",
  },
  ko: {
    home: "홈",
    services: "서비스",
    visit: "방문 안내",
    bookAppointment: "예약하기",
    language: "언어",
    bookIntro: "서비스와 시간을 선택하고 바버에게 바로 예약 요청을 보내세요.",
    craft: "장인 정신",
    precision: "섬세하고 정확하게",
    bookCta: "예약하기",
    menuCta: "메뉴 보기",
    allCategories: "전체",
    categoryMen: "남성",
    categoryWomen: "여성",
    categoryKids: "키즈",
    categoryColor: "컬러",
    categoryTreatments: "트리트먼트",
    categoryGrooming: "그루밍",
    servicesCatalog: "서비스 카탈로그",
    chooseService: "서비스를 선택하세요",
    options: "개",
    selectedService: "선택한 서비스",
    whatsIncluded: "포함 내용",
    consultation: "스타일 상담",
    professionalService: "전문 서비스",
    cleanFinish: "깔끔한 마무리",
    stylingAdvice: "스타일링 안내",
    whatsappToBook: "WhatsApp으로 예약",
    minutes: "분",
    startingFrom: "부터",
    reviews: "리뷰",
    team: "팀",
    gallery: "갤러리",
    call: "전화",
    openNow: "영업 중",
    closed: "영업 종료",
    closesIn: "마감까지",
    opensIn: "영업 시작까지",
    whyUs: "우리를 선택하는 이유",
    openingHours: "영업시간",
    liveGoogleReviews: "Google 최신 리뷰",
    getDirections: "길찾기",
    faqTitle: "방콕 바버샵 FAQ",
    faqIntro: "서비스, 가격, 워크인, 찾아오는 길과 영업시간에 대한 답변입니다.",
    footerIntro: "수쿰빗에서 만나는 정교한 페이드, 면도와 타이 허브 헤드 스파.",
  }, */
};

type I18nContextValue = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: Copy;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    if (typeof window === "undefined") return "en";
    const saved = window.localStorage.getItem("bk-language") as LanguageCode | null;
    return saved && languages.some((item) => item.code === saved) ? saved : "en";
  });

  const setLanguage = (next: LanguageCode) => {
    setLanguageState(next);
    window.localStorage.setItem("bk-language", next);
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = "ltr";
  }, [language]);

  return (
    <I18nContext.Provider value={{ language, setLanguage, t: copy[language] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used inside I18nProvider");
  return context;
}
