import { useI18n } from "@/lib/i18n";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import { getJournalArticle } from "@/data/guide-articles";
import { SiteHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/barber-journal/$articleSlug")({
  head: ({ params }) => {
    const article = getJournalArticle(params.articleSlug);
    const title = article ? `${article.title} | Bangkok Kropper` : "Journal Article | Bangkok Kropper";
    const description = article?.excerpt ?? "Editorial haircut and grooming advice from Bangkok Kropper.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: JournalArticlePage,
});

function JournalArticlePage() {
  const { articleSlug } = Route.useParams();
  const { language } = useI18n();
  const article = getJournalArticle(articleSlug);

  if (!article) {
    return (
      <div className="min-h-screen bg-background font-sans text-foreground">
        <SiteHeader />
        <main className="mx-auto max-w-3xl px-5 pb-24 pt-32">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">404 · Journal</p>
          <h1 className="mt-4 font-display text-4xl">That article is not in the journal.</h1>
          <p className="mt-4 leading-7 text-muted-foreground">Return to the journal to browse the latest grooming guides.</p>
          <Link to="/grooming-guide" className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-primary">
            <ArrowLeft className="size-4" /> Back to journal
          </Link>
        </main>
      </div>
    );
  }

  if (language === "th") return <ThaiJournalArticlePage article={article} />;

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 pb-24 pt-28 md:pt-32">
        <nav className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2 text-border">/</span>
          <Link to="/grooming-guide" className="hover:text-primary">Barber Journal</Link>
          <span className="mx-2 text-border">/</span>
          <span className="text-primary">{article.category}</span>
        </nav>

        <article className="mt-8 max-w-4xl">
          <div>
            <header className="border-b border-border pb-10">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">{article.category}</p>
              <h1 className="mt-5 max-w-4xl font-display text-4xl leading-[0.98] md:text-6xl">{article.title}</h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">{article.intro}</p>
              <div className="mt-7 flex flex-wrap items-center gap-5 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                <span className="inline-flex items-center gap-2"><Clock3 className="size-4 text-primary" /> {article.readTime}</span>
                <span className="inline-flex items-center gap-2"><CalendarDays className="size-4 text-primary" /> Bangkok Kropper Journal</span>
              </div>
            </header>

            <div id="article-content" className="mt-10 max-w-3xl space-y-10">
              {article.sections.map((section, index) => (
                <section key={section.heading}>
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-primary">0{index + 1}</p>
                  <h2 className="mt-3 font-display text-3xl leading-tight text-foreground md:text-4xl">{section.heading}</h2>
                  <div className="mt-4 space-y-4 text-base leading-8 text-muted-foreground">
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-12 border-t border-border pt-7">
              <Link to="/grooming-guide" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary hover:text-foreground">
                <ArrowLeft className="size-4" /> More from the journal
              </Link>
            </div>
          </div>

          <aside className="mt-12 border-t border-border pt-7">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-primary">Ready for the chair?</p>
            <h2 className="mt-3 font-display text-2xl leading-tight">Turn the advice into a look that works for you.</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">Bring your questions or a reference photo. The team can help shape the service around your hair and routine.</p>
            <Link to="/book" className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-primary px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground hover:bg-accent">
              Book an appointment <ArrowRight className="size-4" />
            </Link>
            <div className="mt-7 border-t border-border pt-5">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">Keep reading</p>
              <div className="mt-3 space-y-3">
                {article.related.map((slug) => {
                  const related = getJournalArticle(slug);
                  return related ? (
                    <Link key={slug} to="/barber-journal/$articleSlug" params={{ articleSlug: slug }} className="group block text-sm leading-6 text-foreground hover:text-primary">
                      {related.title} <ArrowRight className="ml-1 inline size-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  ) : null;
                })}
              </div>
            </div>
          </aside>
        </article>
      </main>
    </div>
  );
}

const thaiArticleCopy: Record<string, { title: string; category: string; intro: string; sections: [string, string, string][] }> = {
  "top-rated-barber-bangkok": {
    title: "บาร์เบอร์ยอดนิยมในกรุงเทพฯ: ร้านที่ดีควรมีอะไรบ้าง",
    category: "คู่มือบาร์เบอร์กรุงเทพฯ",
    intro: "การเลือกบาร์เบอร์ที่ดีไม่ได้ดูแค่คะแนนรีวิว แต่ควรดูทั้งฝีมือ การปรึกษาก่อนตัด ความสะอาด และการดูแลตลอดการบริการ",
    sections: [
      [
        "เริ่มจากความต้องการของคุณ",
        "บอกช่างว่าต้องการทรงแบบไหน ใช้เวลาจัดแต่งผมมากน้อยแค่ไหน และมีจุดไหนที่อยากเก็บความยาวไว้",
        "ช่างที่ดีจะช่วยปรับทรงให้เข้ากับสภาพผม รูปหน้า และไลฟ์สไตล์ของคุณ",
      ],
      [
        "มาตรฐานที่ควรมองหา",
        "อุปกรณ์สะอาด การสื่อสารชัดเจน และการตรวจความเรียบร้อยก่อนจบบริการ ล้วนเป็นรายละเอียดที่ทำให้ประสบการณ์แตกต่าง",
        "อย่าลังเลที่จะขอให้ช่างปรับรายละเอียดเล็ก ๆ น้อย ๆ ก่อนออกจากเก้าอี้",
      ],
      [
        "เตรียมตัวก่อนจองคิว",
        "เตรียมภาพอ้างอิงและบอกสิ่งที่ไม่ต้องการให้ชัดเจน การจองล่วงหน้าช่วยให้เลือกเวลาและบริการที่เหมาะกับคุณได้ง่ายขึ้น",
        "Bangkok Kropper พร้อมช่วยแนะนำบริการให้เหมาะกับทรงผมและความต้องการของคุณ",
      ],
    ],
  },
  "best-barber-bangkok": {
    title: "บาร์เบอร์ที่ดีที่สุดในกรุงเทพฯ: คู่มือการกรูมมิ่งที่ดีขึ้น",
    category: "คู่มือบาร์เบอร์กรุงเทพฯ",
    intro: "การเลือกบาร์เบอร์ที่ดีในกรุงเทพฯ ไม่ได้ขึ้นอยู่กับการตามลำดับเดียวเท่านั้น แต่ขึ้นอยู่กับการสื่อสาร ฝีมือ การสัมผัส และผลลัพธ์ที่คุณต้องการใช้ชีวิตต่อไป",
    sections: [
      [
        "เริ่มจากผลลัพธ์ที่ต้องการ ไม่ใช่ชื่อทรง",
        "เริ่มด้วยภาพที่คุณต้องการเห็นในกระจก แล้วอธิบายว่ารับทรงผมอย่างไร สไตล์วันต่อวัน และความถี่ในการกลับมาดูแล",
        "ช่างที่ดีจะช่วยแปลงข้อมูลเหล่านั้นให้เป็นทรงที่เข้ากับความหนาแน่นของผม รูปแบบการเจริญเติบโต และสภาพอากาศในกรุงเทพฯ",
      ],
      [
        "สิ่งที่ทำให้ประสบการณ์ดูมืออาชีพ",
        "เครื่องมือสะอาด การปรึกษาก่อนตัด และการตรวจดูรายละเอียดก่อนจบบริการ คือพื้นฐานที่สำคัญ คุณควรรู้สึกสบายใจที่ขอปรับรายละเอียดเล็ก ๆ ก่อนออกจากเก้าอี้",
        "ความละเอียดเล็ก ๆ เหล่านี้มักเป็นจุดที่ทำให้ทรงผมที่ดีกลายเป็นทรงผมที่ใช่สำหรับคุณ",
      ],
      [
        "เช็กลิสต์ก่อนจองคิว",
        "ตัดสินใจว่าคุณต้องการตัดผม เฟด หนวด หรือรวมบริการหลายอย่าง ลองบันทึกรูปอ้างอิง และบอกว่าควรเก็บความยาวตรงไหนไว้",
        "Bangkok Kropper พร้อมช่วยเลือกบริการให้เหมาะกับทรงผมและการดูแลที่คุณต้องการได้",
      ],
    ],
  },
  "beard-grooming-bangkok": {
    title: "คู่มือดูแลหนวดเคราในกรุงเทพฯ: เทคนิคการเล็ม แต่งทรง และการดูแลรักษา",
    category: "หนวดเคราและกรูมมิ่ง",
    intro: "การดูแลหนวดเคราให้ดีต้องคำนึงถึงรูปร่าง ความสมดุล และความสบายของผิว ไม่ใช่แค่ความยาวเพียงอย่างเดียว",
    sections: [
      [
        "เริ่มจากรูปร่าง",
        "บอกช่างว่าคุณต้องการให้หนวดเคราอยู่แบบไหน ให้คงความหนา หรือเก็บขอบให้คมขึ้น รายละเอียด เช่น เส้นแก้ม เส้นคาง และความสัมพันธ์กับทรงผมควรทำงานร่วมกัน",
        "การเล็มหนวดแบบอ่อนโยนและการปรับรูปร่างให้เข้ากับใบหน้าเป็นสิ่งที่ทำให้ลุคดูมีวัตถุประสงค์",
      ],
      [
        "ความชื้นในกรุงเทพฯ มีผลต่อการดูแล",
        "อากาศร้อนและชื้นอาจทำให้หนวดเคราเบาลงและเกิดการสะสมของผลิตภัณฑ์ได้ง่าย การล้างและเช็ดให้แห้งดี ๆ จึงมีความสำคัญมาก",
        "หากผิวหน้าของคุณรู้สึกระคายเคือง ให้บอกช่างก่อนเริ่มบริการ เพื่อให้เลือกวิธีกำจัดหรือปรับความเข้มได้เหมาะสม",
      ],
      [
        "รักษาผลลัพธ์ระหว่างการกลับมาใช้บริการ",
        "การทำความสะอาดเส้นคางและริมฝีปากเล็กน้อยช่วยยืดอายุของการตัดและแต่งทรง แต่ควรปรับให้มีการดูแลที่เหมาะสมเพื่อไม่ให้รูปร่างหลักเปลี่ยนแปลงมากเกินไป",
        "การนัดปรึกษาเป็นประจำช่วยให้หนวดเคราอยู่ในสภาพสมดุลและไม่ต้องรีเซ็ตใหม่ตั้งแต่เริ่ม",
      ],
    ],
  },
};

const thaiArticleTitles: Record<string, string> = {
  "mens-haircut-bangkok": "ตัดผมผู้ชายในกรุงเทพฯ: สไตล์ เวลา และสิ่งที่ควรรู้",
  "low-fade-vs-mid-fade": "Low Fade, Mid Fade และ High Fade: แบบไหนเหมาะกับคุณ",
  "barber-in-nana-bangkok": "เลือกบาร์เบอร์ย่านนานา: คู่มือการตัดผมในกรุงเทพฯ",
  "affordable-barber-shop-bangkok": "มองหาร้านตัดผมราคาคุ้มค่าในกรุงเทพฯ",
  "barber-sukhumvit-bangkok": "บาร์เบอร์สุขุมวิท กรุงเทพฯ: คู่มือเลือกบริการตัดผมและกรูมมิ่ง",
  "barber-phaya-thai-bangkok": "บาร์เบอร์พญาไท กรุงเทพฯ: คู่มือตัดผมและกรูมมิ่ง",
  "skin-fade-bangkok": "Skin Fade คืออะไร: คู่มือตัดผมสำหรับผู้ชาย",
  "haircare-bangkok-humidity": "คู่มือดูแลผมผู้ชายในอากาศร้อนและชื้นของกรุงเทพฯ",
  "hair-color-treatment-bangkok": "คู่มือทำสีผมและทรีตเมนต์ในกรุงเทพฯ",
  "mens-haircuts-face-shapes": "ทรงผมผู้ชายที่เหมาะกับรูปหน้าต่าง ๆ",
  "womens-hair-services-bangkok": "บริการผมผู้หญิงในกรุงเทพฯ: ตัด ทำสี เคราติน และอื่น ๆ",
  "kids-haircuts-bangkok": "คู่มือสำหรับผู้ปกครอง: พาเด็กตัดผมในกรุงเทพฯ",
};

const thaiArticleCategories: Record<string, string> = {
  "Haircut Styles": "ทรงผมและสไตล์",
  "Nana · Sukhumvit Guides": "คู่มือย่านนานาและสุขุมวิท",
  "Sukhumvit Guides": "คู่มือย่านสุขุมวิท",
  "Phaya Thai & Phahon Yothin": "คู่มือย่านพญาไทและพหลโยธิน",
  "Beard & Grooming": "หนวดเคราและกรูมมิ่ง",
  "Haircare & Weather": "การดูแลผมและสภาพอากาศ",
  "Hair Color & Treatment": "ทำสีผมและทรีตเมนต์",
  "Women's Hair": "ผมผู้หญิง",
  "Kids' Hair": "ผมเด็ก",
};

function ThaiJournalArticlePage({ article }: { article: NonNullable<ReturnType<typeof getJournalArticle>> }) {
  const copy = thaiArticleCopy[article.slug] ?? {
    title: thaiArticleTitles[article.slug] ?? "คู่มือกรูมมิ่งจาก Bangkok Kropper",
    category: thaiArticleCategories[article.category] ?? "บทความกรูมมิ่ง",
    intro: "คำแนะนำที่ช่วยให้คุณเลือกทรงผม บริการ และการดูแลที่เหมาะกับเส้นผม ไลฟ์สไตล์ และสภาพอากาศในกรุงเทพฯ",
    sections: [
      [
        "เริ่มจากทรงและผลลัพธ์ที่ต้องการ",
        "บอกช่างว่าคุณต้องการให้ทรงผมดูเป็นอย่างไรในชีวิตประจำวัน พร้อมแจ้งความยาวที่ต้องการเก็บไว้และเวลาที่ใช้จัดแต่งผม",
        "ช่างจะช่วยปรับแบบอ้างอิงให้เข้ากับสภาพผม รูปหน้า และกิจวัตรของคุณ",
      ],
      [
        "การปรึกษาทำให้บริการแม่นยำขึ้น",
        "การพูดคุยก่อนเริ่มบริการช่วยให้ช่างเข้าใจสิ่งที่คุณชอบ สิ่งที่อยากหลีกเลี่ยง และความถี่ที่สะดวกกลับมาดูแล",
        "อย่าลังเลที่จะขอปรับรายละเอียดเล็กน้อยก่อนออกจากเก้าอี้ เพื่อให้ผลลัพธ์เหมาะกับคุณจริง ๆ",
      ],
      [
        "ดูแลผลลัพธ์ระหว่างการกลับมาใช้บริการ",
        "ใช้ผลิตภัณฑ์เท่าที่จำเป็นและทำตามคำแนะนำเรื่องการสระ การเป่า และการจัดแต่ง เพื่อให้ทรงอยู่ได้นานขึ้น",
        "การนัดหมายอย่างสม่ำเสมอช่วยให้ดูแลทรงได้ง่าย และไม่ต้องรอจนผมเสียรูปมากเกินไป",
      ],
    ] as [string, string, string][],
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-5 pb-24 pt-28 md:pt-32">
        <Link to="/grooming-guide" className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
          ← กลับไปที่บล็อก
        </Link>

        <article className="mt-8">
          <header className="max-w-4xl border-b border-border pb-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">{copy.category}</p>
            <h1 className="mt-5 font-display text-4xl leading-tight md:text-6xl">{copy.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{copy.intro}</p>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Bangkok Kropper · คู่มือกรูมมิ่ง
            </p>
          </header>

          <div className="mt-10 max-w-3xl space-y-10">
            {copy.sections.map(([heading, first, second], index) => (
              <section key={heading}>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">0{index + 1}</p>
                <h2 className="mt-3 font-display text-3xl">{heading}</h2>
                <p className="mt-4 text-base leading-8 text-muted-foreground">{first}</p>
                <p className="mt-4 text-base leading-8 text-muted-foreground">{second}</p>
              </section>
            ))}
          </div>

          <Link
            to="/book"
            className="mt-12 inline-flex items-center gap-2 bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground"
          >
            จองคิว <ArrowRight className="size-4" />
          </Link>
        </article>
      </main>
    </div>
  );
}
