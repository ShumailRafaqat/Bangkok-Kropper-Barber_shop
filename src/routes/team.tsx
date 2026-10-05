import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { SiteHeader } from "@/components/site-chrome";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team | Bangkok Kropper Barber Shop" },
      {
        name: "description",
        content:
          "Meet the experienced barbers behind Bangkok Kropper: sharp fades, precise scissors work and all-round barbering.",
      },
      { property: "og:title", content: "Meet the Team | Bangkok Kropper" },
      {
        property: "og:description",
        content: "The hands behind the craft at Bangkok Kropper Barber Shop.",
      },
    ],
  }),
  component: TeamPage,
});

const barbers = [
  {
    name: "Best",
    number: "01",
    image: "/Best.jpeg",
    location: "Southern Thailand",
    experience: "6+",
    role: "American Fade Specialist",
    specialties: ["American Fades", "Asian Scissor Cuts", "Styling"],
    description:
      "With more than six years in the industry, Best specializes in sharp American-style fades and detailed scissor work. His versatility also extends to Asian-style cutting, allowing him to adapt each haircut to the client's hair type, texture, and desired look.",
  },
  {
    name: "Lopez",
    number: "02",
    image: "/Lopez.jpeg",
    location: "Southern Thailand",
    experience: "4+",
    role: "Fade & Afro Hair Specialist",
    specialties: ["American Fades", "Afro Hair", "Texture"],
    description:
      "With over four years of professional experience, Lopez is recognized for sharp American-style fades and a confident approach to Afro-textured hair. He understands how to work with different textures while maintaining clean structure, definition, and a well-finished look.",
  },
  {
    name: "Max",
    number: "03",
    image: "/Max.jpeg",
    location: "Central Bangkok",
    experience: "18+",
    role: "Senior All-Rounder Barber · Ari Branch",
    specialties: ["All-Round Barbering", "Classic & Modern Styles", "Ari Branch"],
    description:
      "With an impressive 18+ years in the barbering industry, Max brings extensive experience and versatility to the chair. As an all-rounder barber, he is comfortable working across a wide range of styles and techniques, delivering a polished finish tailored to each client.",
  },
    {
      name: "Non",
      number: "04",
      image: "/Non.jpeg",
      location: "Central Thailand",
      experience: "4+",
      role: "Italian Fade Specialist",
      specialties: ["Italian Fades", "Straight Hair", "Precision Cutting"],
      description:
        "With over four years of experience, Non is known for his refined Italian-style fades and ability to work with exceptionally straight hair. His attention to detail helps create clean transitions, natural structure, and a sharp finish that complements each client's hair type.",
    },
    {
      name: "Tae",
      number: "05",
      image: "/Tae.jpeg",
      location: "Surat Thani",
      experience: "4+",
      role: "Fade & Scissor Cut Specialist",
      specialties: ["Vietnamese Fades", "Mod Cuts", "Scissor Work"],
      description:
        "With over four years of experience in professional barbering, Tae is known for clean Vietnamese-style fades and precise scissor work. From modern mod cuts to detailed classic styles, he brings a sharp eye for shape, balance, and finishing to every haircut.",
    },
  {
    name: "Mark",
    number: "06",
    image: "/Mark.jpeg",
    location: "Rangsit",
    experience: "4+",
    role: "Texture & Creative Cuts Specialist",
    specialties: ["Textured Cuts", "Creative Styles", "Flat Hair"],
    description:
      "With over four years of experience, Mark has a strong eye for distinctive and creative haircuts. He specializes in creating texture and movement, particularly for clients with naturally flat hair, helping transform the hair's shape into a more defined and expressive style.",
  },
  {
    name: "C",
    number: "07",
    image: "/1000223115.jpg",
    location: "Bangkok",
    experience: "4+",
    role: "Fade Specialist",
    specialties: ["All Fades", "Fast Fades", "Precision Finishing"],
    description:
      "C is a young barber with a genuine love for the craft and a strong focus on all kinds of fades. With more than four years of experience, he brings a fast, confident approach to the chair while tailoring each finish to the client's style. Book an appointment or send a message and let C take care of your next look.",
  },
] as const;

const thaiBarberCopy: Record<string, { location: string; role: string; specialties: string[]; description: string }> = {
  Best: {
    location: "ภาคใต้ของประเทศไทย",
    role: "ผู้เชี่ยวชาญด้านอเมริกันเฟด",
    specialties: ["อเมริกันเฟด", "การตัดด้วยกรรไกรสไตล์เอเชีย", "การจัดแต่งทรง"],
    description: "ด้วยประสบการณ์ในวงการมากกว่าหกปี Best เชี่ยวชาญการทำอเมริกันเฟดที่คมกริบและการตัดด้วยกรรไกรอย่างละเอียด พร้อมปรับทรงให้เหมาะกับสภาพเส้นผม เท็กซ์เจอร์ และสไตล์ที่ลูกค้าต้องการ",
  },
  Lopez: {
    location: "ภาคใต้ของประเทศไทย",
    role: "ผู้เชี่ยวชาญด้านเฟดและผมแอฟโฟร",
    specialties: ["อเมริกันเฟด", "ผมแอฟโฟร", "เท็กซ์เจอร์"],
    description: "Lopez มีประสบการณ์มากกว่าสี่ปี โดดเด่นด้านอเมริกันเฟดและการดูแลผมเท็กซ์เจอร์แอฟโฟร เขาเข้าใจการสร้างโครงทรง ความคมชัด และฟินิชที่เรียบร้อยสำหรับเส้นผมหลากหลายแบบ",
  },
  Max: {
    location: "กรุงเทพฯ ตอนกลาง",
    role: "ช่างออลราวด์อาวุโส · สาขาอารีย์",
    specialties: ["งานบาร์เบอร์ครบวงจร", "ทรงคลาสสิกและโมเดิร์น", "สาขาอารีย์"],
    description: "Max มีประสบการณ์ในวงการบาร์เบอร์กว่า 18 ปี ทำงานได้หลากหลายสไตล์และเทคนิค พร้อมออกแบบทรงและเก็บรายละเอียดให้เหมาะกับลูกค้าแต่ละคน",
  },
  Non: {
    location: "ภาคกลางของประเทศไทย",
    role: "ผู้เชี่ยวชาญด้านอิตาเลียนเฟด",
    specialties: ["อิตาเลียนเฟด", "ผมตรง", "การตัดอย่างแม่นยำ"],
    description: "Non มีประสบการณ์มากกว่าสี่ปี โดดเด่นด้านอิตาเลียนเฟดและการทำงานกับผมตรงเป็นพิเศษ ใส่ใจการไล่ระดับ โครงทรง และฟินิชที่เข้ากับสภาพผมของลูกค้า",
  },
  Tae: {
    location: "สุราษฎร์ธานี",
    role: "ผู้เชี่ยวชาญด้านเฟดและการตัดด้วยกรรไกร",
    specialties: ["เวียดนามเฟด", "ม็อดคัต", "งานกรรไกร"],
    description: "Tae มีประสบการณ์ด้านบาร์เบอร์มืออาชีพมากกว่าสี่ปี เชี่ยวชาญเวียดนามเฟดและงานกรรไกรที่แม่นยำ ตั้งแต่ทรงม็อดสมัยใหม่ไปจนถึงทรงคลาสสิกที่เก็บรายละเอียดอย่างพิถีพิถัน",
  },
  Mark: {
    location: "รังสิต",
    role: "ผู้เชี่ยวชาญด้านเท็กซ์เจอร์และทรงสร้างสรรค์",
    specialties: ["ทรงเท็กซ์เจอร์", "สไตล์สร้างสรรค์", "ผมลีบแบน"],
    description: "Mark มีประสบการณ์มากกว่าสี่ปีและมีสายตาที่โดดเด่นด้านทรงผมสร้างสรรค์ เชี่ยวชาญการสร้างเท็กซ์เจอร์และการเคลื่อนไหว โดยเฉพาะการเพิ่มมิติให้ผมที่มีความลีบแบนตามธรรมชาติ",
  },
  C: {
    location: "กรุงเทพฯ",
    role: "ผู้เชี่ยวชาญด้านเฟด",
    specialties: ["เฟดทุกสไตล์", "เฟดรวดเร็ว", "เก็บรายละเอียดอย่างแม่นยำ"],
    description: "C เป็นช่างรุ่นใหม่ที่รักงานบาร์เบอร์และเชี่ยวชาญเฟดหลากหลายสไตล์ ด้วยประสบการณ์มากกว่าสี่ปี เขาทำงานได้รวดเร็ว มั่นใจ และปรับฟินิชให้เข้ากับสไตล์ของลูกค้าแต่ละคน",
  },
};

function TeamPage() {
  const { language, t } = useI18n();
  const isThai = language === "th";

  return (
    <div className="min-h-screen bg-[#080808] text-[#f6f0e7]">
      <SiteHeader />
      <main className="overflow-hidden pt-20">
        <section className="relative border-b border-[#29251d] px-5 py-12 sm:px-8 md:py-20 lg:px-10">
          <div className="mx-auto max-w-[90rem]">
            <div className="relative z-10 max-w-3xl">
              <p className="mb-5 flex items-center gap-3 text-[0.6rem] font-bold uppercase tracking-[0.34em] text-[#c89a3c]">
                <span className="h-px w-7 bg-[#c89a3c]" />
                {isThai ? "ทีมงานของเรา" : "Our people"}
              </p>
              <h1 className="font-display text-[clamp(2.7rem,5vw,5.5rem)] font-medium uppercase leading-[0.88] tracking-[-0.04em]">
                {isThai ? "ทีมงานผู้อยู่เบื้องหลัง" : "The hands behind"}
                <br />
                {isThai ? "ลุคใหม่ของคุณ" : "your next look"}
              </h1>
              <p className="mt-7 max-w-xl border-l border-[#c89a3c] pl-4 text-sm leading-7 text-[#aaa39a]">
                {isThai
                  ? "พบกับทีมช่างมากประสบการณ์ของ Bangkok Kropper แต่ละคนมีพื้นฐานและเทคนิคที่แตกต่างกัน พร้อมมาตรฐานเดียวกันในการสร้างสรรค์ทรงผมที่พิถีพิถันและเหมาะกับคุณ"
                  : "Meet the experienced barbers behind Bangkok Kropper. Different backgrounds, distinct techniques, and one shared standard: thoughtful barbering with a precise, personal finish."}
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-[#29251d] px-5 py-10 sm:px-8 md:py-16 lg:px-10">
          <div className="mx-auto max-w-[90rem]">
            <div className="mb-8 flex items-end justify-between border-b border-[#3a352d] pb-5">
              <div>
                  <p className="text-[0.58rem] font-bold uppercase tracking-[0.3em] text-[#c89a3c]">{isThai ? "รายชื่อทีมช่าง" : "The roster"}</p>
                <h2 className="mt-2 font-display text-3xl font-medium uppercase leading-none sm:text-4xl">{isThai ? "เลือกช่างของคุณ" : "Find your barber"}</h2>
              </div>
              <p className="hidden max-w-xs text-right text-xs leading-5 text-[#aaa39a] sm:block">{isThai ? "ทุกเก้าอี้มีเอกลักษณ์ของตัวเอง ทำความรู้จักทีมงานที่ทำให้มาตรฐานของ Kropper เป็นเรื่องเฉพาะตัว" : "Every chair has its own point of view. Explore the people who make the Kropper standard personal."}</p>
            </div>
            <div className="mx-auto grid max-w-[78rem] gap-5">
              {barbers.map((barber) => {
                const copy = isThai ? thaiBarberCopy[barber.name] : undefined;
                const location = copy?.location ?? barber.location;
                const role = copy?.role ?? barber.role;
                const specialties = copy?.specialties ?? barber.specialties;
                const description = copy?.description ?? barber.description;

                return (
                <article key={barber.name} className="group grid overflow-hidden border border-[#3a352d] bg-[#11110f] md:grid-cols-[minmax(15rem,0.42fr)_1fr] lg:grid-cols-[minmax(19rem,0.4fr)_1fr]">
                  <div className="relative aspect-[1.1] min-h-[15rem] overflow-hidden bg-[#151412] md:aspect-auto md:min-h-[21rem]">
                    <img src={barber.image} alt={`${barber.name}, ${role}`} className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
                    <span className="absolute left-4 top-4 border border-[#c89a3c] bg-[#080808]/80 px-2.5 py-1.5 text-xs font-bold tracking-[0.16em] text-[#c89a3c]">{barber.number}</span>
                  </div>
                  <div className="flex flex-col p-5 sm:p-7 lg:p-8">
                    <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(8rem,auto)] items-start gap-4 border-b border-[#3a352d] pb-4">
                      <div className="min-w-0">
                        <h3 className="font-display text-3xl font-medium uppercase leading-none sm:text-4xl">{barber.name}</h3>
                        <p className="mt-2 max-w-full break-words text-sm font-bold uppercase leading-5 tracking-[0.04em] text-[#c89a3c] sm:text-base sm:tracking-[0.08em]">{role}</p>
                      </div>
                      <p className="flex min-w-0 max-w-full items-start gap-1.5 text-right text-xs font-bold uppercase leading-5 tracking-[0.08em] text-[#aaa39a]"><MapPin className="mt-0.5 size-4 shrink-0 text-[#c89a3c]" /><span className="break-words">{location}</span></p>
                    </div>
                    <p className="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-[#c89a3c]">{barber.experience} {isThai ? "ปีแห่งประสบการณ์" : "years experience"}</p>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-[#aaa39a] sm:text-base">{description}</p>
                    <div className="mt-6 border-t border-[#3a352d] pt-4">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c89a3c]">{t.specialties ?? (isThai ? "ความเชี่ยวชาญ" : "Specialties")}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {specialties.map((specialty) => (
                          <span key={specialty} className="border border-[#a47a2b] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[#f0c66d] sm:text-sm">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-[#2b2925] bg-[#c9a86c] px-5 py-12 text-[#11100e] sm:px-8 md:py-16 lg:px-12">
          <div className="mx-auto flex max-w-[90rem] flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.3em]">{isThai ? "พร้อมสำหรับเก้าอี้ของคุณหรือยัง" : "Ready for your chair?"}</p>
              <h2 className="mt-3 max-w-xl font-display text-4xl uppercase leading-[0.9] sm:text-6xl">{isThai ? "มอบลุคใหม่ให้กับมืออาชีพที่ใช่" : "Bring your next look to the right hands."}</h2>
            </div>
            <Link to="/book" className="inline-flex w-fit items-center gap-3 border border-[#11100e] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] transition-colors hover:bg-[#11100e] hover:text-[#f6f0e7]">
              {isThai ? "จองนัดหมาย" : "Book an appointment"} <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
