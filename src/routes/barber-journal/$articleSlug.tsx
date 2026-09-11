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

const thaiArticleCopy: Record<string, { title: string; category: string; intro: string; sections: [string, string, string][] }> = {
  "top-rated-barber-bangkok": {
    title: "บาร์เบอร์ยอดนิยมในกรุงเทพฯ: ร้านที่ดีควรมีอะไรบ้าง",
    category: "คู่มือบาร์เบอร์กรุงเทพฯ",
    intro: "การเลือกบาร์เบอร์ที่ดีไม่ได้ดูแค่คะแนนรีวิว แต่ควรดูทั้งฝีมือ การปรึกษาก่อนตัด ความสะอาด และการดูแลตลอดการบริการ",
    sections: [["เริ่มจากความต้องการของคุณ", "บอกช่างว่าต้องการทรงแบบไหน ใช้เวลาจัดแต่งผมมากน้อยแค่ไหน และมีจุดไหนที่อยากเก็บความยาวไว้", "ช่างที่ดีจะช่วยปรับทรงให้เข้ากับสภาพผม รูปหน้า และไลฟ์สไตล์ของคุณ"], ["มาตรฐานที่ควรมองหา", "อุปกรณ์สะอาด การสื่อสารชัดเจน และการตรวจความเรียบร้อยก่อนจบบริการ ล้วนเป็นรายละเอียดที่ทำให้ประสบการณ์แตกต่าง", "อย่าลังเลที่จะขอให้ช่างปรับรายละเอียดเล็ก ๆ น้อย ๆ ก่อนออกจากเก้าอี้"], ["เตรียมตัวก่อนจองคิว", "เตรียมภาพอ้างอิงและบอกสิ่งที่ไม่ต้องการให้ชัดเจน การจองล่วงหน้าช่วยให้เลือกเวลาและบริการที่เหมาะกับคุณได้ง่ายขึ้น", "Bangkok Kropper พร้อมช่วยแนะนำบริการให้เหมาะกับทรงผมและความต้องการของคุณ"]],
  },
};

function ThaiJournalArticlePage({ article }: { article: NonNullable<ReturnType<typeof getJournalArticle>> }) {
  const copy = thaiArticleCopy[article.slug] ?? { title: article.title, category: "บทความกรูมมิ่ง", intro: article.intro, sections: article.sections.map((section) => [section.heading, section.paragraphs[0] ?? "", section.paragraphs[1] ?? ""] as [string, string, string]) };
  return <div className="min-h-screen bg-background font-sans text-foreground"><SiteHeader /><main className="mx-auto max-w-5xl px-5 pb-24 pt-28 md:pt-32"><Link to="/grooming-guide" className="text-xs font-bold uppercase tracking-[0.18em] text-primary">← กลับไปที่บล็อก</Link><article className="mt-8"><header className="max-w-4xl border-b border-border pb-10"><p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">{copy.category}</p><h1 className="mt-5 font-display text-4xl leading-tight md:text-6xl">{copy.title}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{copy.intro}</p><p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Bangkok Kropper · คู่มือกรูมมิ่ง</p></header><div className="mt-10 max-w-3xl space-y-10">{copy.sections.map(([heading, first, second], index) => <section key={heading}><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">0{index + 1}</p><h2 className="mt-3 font-display text-3xl">{heading}</h2><p className="mt-4 text-base leading-8 text-muted-foreground">{first}</p><p className="mt-4 text-base leading-8 text-muted-foreground">{second}</p></section>)}</div><Link to="/book" className="mt-12 inline-flex items-center gap-2 bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground">จองคิว <ArrowRight className="size-4" /></Link></article></main></div>;
}

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

        <article className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <div>
            <header className="max-w-4xl border-b border-border pb-10">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.3em] text-primary">{article.category}</p>
              <h1 className="mt-5 font-display text-4xl leading-[0.96] text-foreground md:text-6xl">{article.title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{article.intro}</p>
              <div className="mt-7 flex flex-wrap items-center gap-5 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                <span className="inline-flex items-center gap-2"><Clock3 className="size-4 text-primary" /> {article.readTime}</span>
                <span className="inline-flex items-center gap-2"><CalendarDays className="size-4 text-primary" /> Bangkok Kropper Journal</span>
              </div>
            </header>

            <div className="mt-10 max-w-3xl space-y-10">
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

          <aside className="border border-border bg-secondary/10 p-5 lg:sticky lg:top-28">
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
