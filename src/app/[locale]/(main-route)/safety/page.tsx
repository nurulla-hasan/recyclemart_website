
import PageLayout from "@/tools/PageLayout";
import { MapPin, Users, Eye, Lock, Lightbulb, AlertCircle, Phone, ShieldCheck, CheckCircle2, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";

const SafetyPage = () => {
  const t = useTranslations("Safety");
  return (
    <>
      {/* Hero Section */}
      <div className="bg-primary/5 dark:bg-primary/10 py-16 mb-12 border-b border-primary/10">
        <div className="custom-width mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
            <ShieldCheck className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">{t("heroTitle")}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("heroSubtitle")}
          </p>
        </div>
      </div>

      <PageLayout paddingSize="none" className="screen-height">
        <div className="custom-width mx-auto px-4 pb-20">
          {/* General Tips Section */}
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-10">
              <div className="h-8 w-1 bg-primary rounded-full"></div>
              <h2 className="text-3xl font-bold">{t("tipsTitle")}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: MapPin, title: t("tips.public.title"), desc: t("tips.public.desc") },
                { icon: Users, title: t("tips.friend.title"), desc: t("tips.friend.desc") },
                { icon: Eye, title: t("tips.inspect.title"), desc: t("tips.inspect.desc") },
                { icon: Lock, title: t("tips.payment.title"), desc: t("tips.payment.desc") },
                { icon: Lightbulb, title: t("tips.gut.title"), desc: t("tips.gut.desc") },
                { icon: CheckCircle2, title: t("tips.verified.title"), desc: t("tips.verified.desc") }
              ].map((tip, index) => (
                <div key={index} className="group p-8 rounded-3xl border border-border bg-card hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <tip.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{tip.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{tip.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Support & Emergency Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="overflow-hidden border-none shadow-xl bg-linear-to-br from-red-50 to-white dark:from-red-950/20 dark:to-background">
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-2xl">
                    <AlertCircle className="w-8 h-8 text-destructive" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{t("reportingTitle")}</h3>
                    <p className="text-sm text-muted-foreground">{t("reportingSubtitle")}</p>
                  </div>
                </div>
                <p className="text-lg leading-relaxed mb-8">
                  {t("reportingDesc")}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="mailto:support@recyclemart.com" 
                    className="inline-flex items-center px-6 py-3 rounded-xl bg-destructive text-destructive-foreground font-semibold hover:opacity-90 transition-opacity"
                  >
                    {t("contactSupport")}
                  </a>
                  <button className="inline-flex items-center px-6 py-3 rounded-xl border border-destructive/20 font-semibold hover:bg-destructive/5 transition-colors">
                    {t("learnHowToReport")}
                  </button>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden border-none shadow-xl bg-linear-to-br from-primary/5 to-white dark:from-primary/10 dark:to-background">
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-2xl">
                    <Phone className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{t("emergencyTitle")}</h3>
                    <p className="text-sm text-muted-foreground">{t("emergencySubtitle")}</p>
                  </div>
                </div>
                <p className="text-lg leading-relaxed mb-8">
                  {t("emergencyDesc")}
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold">
                    <span className="flex items-center gap-2">
                      <Info className="w-5 h-5" />
                      999 - Emergency
                    </span>
                  </div>
                  <a 
                    href="mailto:support@recyclemart.com" 
                    className="inline-flex items-center px-6 py-3 rounded-xl border border-primary/20 font-semibold hover:bg-primary/5 transition-colors text-primary"
                  >
                    {t("contactSupport")}
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default SafetyPage;
