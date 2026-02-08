
import PageLayout from "@/tools/PageLayout";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Calendar, Lock, Eye, Database, UserCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export default function PrivacyPage() {
  const t = useTranslations("Privacy");
  const privacyContent = {
    title: t("title"),
    lastUpdated: t("lastUpdated"),
    sections: [
      {
        title: t("sec1Title"),
        text: t("sec1Text"),
        icon: Database,
        subSections: [
          {
            title: t("sec1Sub1Title"),
            items: [t("sec1Sub1Item1"), t("sec1Sub1Item2"), t("sec1Sub1Item3"), t("sec1Sub1Item4")]
          },
          {
            title: t("sec1Sub2Title"),
            items: [t("sec1Sub2Item1"), t("sec1Sub2Item2"), t("sec1Sub2Item3"), t("sec1Sub2Item4")]
          }
        ]
      },
      {
        title: t("sec2Title"),
        text: t("sec2Text"),
        icon: Eye,
        items: [
          t("sec2Item1"),
          t("sec2Item2"),
          t("sec2Item3"),
          t("sec2Item4"),
          t("sec2Item5")
        ]
      },
      {
        title: t("sec3Title"),
        text: t("sec3Text"),
        icon: Lock
      },
      {
        title: t("sec4Title"),
        text: t("sec4Text"),
        icon: UserCheck,
        items: [
          t("sec4Item1"),
          t("sec4Item2"),
          t("sec4Item3"),
          t("sec4Item4")
        ]
      }
    ]
  };

  return (
    <>
      {/* Hero Section */}
      <div className="bg-primary/5 dark:bg-primary/10 py-20 border-b border-primary/10 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-64 w-full max-w-4xl bg-primary/10 blur-3xl opacity-50" />
        
        <div className="custom-width mx-auto px-4 text-center">
          <Badge variant="outline" className="px-4 py-1.5 mb-6 border-primary/20 text-primary bg-background/50 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider">
            {t("badge")}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            {t.rich("heroTitle", {
              span: (chunks) => <span className="text-primary">{chunks}</span>
            })}
          </h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground font-medium">
            <Calendar className="w-5 h-5 text-primary" />
            <span>{t("lastUpdatedLabel")}: {privacyContent.lastUpdated}</span>
          </div>
        </div>
      </div>

      <PageLayout paddingSize="none" className="screen-height">
        <div className="custom-width mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            
            <div className="flex items-center gap-3 mb-12 pb-4 border-b border-border/40">
              <ShieldCheck className="w-6 h-6 text-primary" />
              <p className="text-lg font-medium text-muted-foreground">{t("priority")}</p>
            </div>

            <div className="space-y-16">
              {privacyContent.sections.map((section, index) => (
                <div key={index} className="group">
                  <div className="flex items-start gap-8">
                    <div className="p-4 bg-primary/10 rounded-3xl group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                      <section.icon className="w-7 h-7" />
                    </div>
                    <div className="flex-1 space-y-6">
                      <h2 className="text-3xl font-bold">{section.title}</h2>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        {section.text}
                      </p>
                      
                      {section.subSections ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                          {section.subSections.map((sub, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-muted/30 border border-border/40">
                              <h4 className="font-bold mb-4 text-primary">{sub.title}</h4>
                              <ul className="space-y-2">
                                {sub.items.map((item, j) => (
                                  <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <div className="w-1.5 h-1.5 bg-primary/50 rounded-full" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : section.items && (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                          {section.items.map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-muted-foreground bg-muted/30 p-4 rounded-xl border border-border/40">
                              <ShieldCheck className="w-4 h-4 text-primary" />
                              <span className="font-medium">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Privacy Support */}
            <div className="mt-24 p-12 rounded-[3rem] bg-linear-to-br from-primary/10 to-transparent border border-primary/10 flex flex-col md:flex-row items-center gap-8 shadow-sm">
               <div className="p-6 bg-card rounded-4xl shadow-xl">
                 <Lock className="w-12 h-12 text-primary" />
               </div>
               <div className="flex-1 text-center md:text-left">
                 <h3 className="text-2xl font-bold mb-2">{t("footerTitle")}</h3>
                 <p className="text-muted-foreground">
                   {t("footerSubtitle")}
                 </p>
               </div>
               <a 
                 href="mailto:privacy@recyclemart.com" 
                 className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-primary/20 whitespace-nowrap"
               >
                 {t("footerBtn")}
               </a>
            </div>

          </div>
        </div>
      </PageLayout>
    </>
  );
}
