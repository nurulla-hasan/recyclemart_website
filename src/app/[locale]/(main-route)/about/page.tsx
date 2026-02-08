
import PageLayout from "@/tools/PageLayout";
import { Badge } from "@/components/ui/badge";
import { Info, Target, Users, Leaf, ShieldCheck, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("About");

  const stats = [
    { label: t("stats.users"), value: "100K+", icon: Users },
    { label: t("stats.items"), value: "500K+", icon: Zap },
    { label: t("stats.waste"), value: "50 Tons", icon: Leaf },
    { label: t("stats.trust"), value: "4.9/5", icon: ShieldCheck },
  ];

  const features = [
    {
      title: t("missionTitle"),
      description: t("missionDesc"),
      icon: Target,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      title: t("visionTitle"),
      description: t("visionDesc"),
      icon: Leaf,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      title: t("communityTitle"),
      description: t("communityDesc"),
      icon: Users,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="bg-primary/5 dark:bg-primary/10 py-20 border-b border-primary/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl opacity-50" />
        
        <div className="custom-width mx-auto px-4 text-center">
          <Badge variant="outline" className="px-4 py-1.5 mb-6 border-primary/20 text-primary bg-background/50 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider">
            {t("badge")}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            {t.rich("heroTitle", {
              span: (chunks) => <span className="text-primary">{chunks}</span>
            })}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            {t("heroSubtitle")}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="p-6 rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all">
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PageLayout paddingSize="none" className="screen-height">
        <div className="custom-width mx-auto px-4 py-20">
          
          {/* Features/Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <div key={index} className="p-8 rounded-[2.5rem] bg-card border border-border/60 hover:border-primary/30 transition-all group">
                <div className={`w-14 h-14 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Detailed Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-[3rem] -rotate-3 scale-105 -z-10" />
              <div className="aspect-video bg-muted rounded-[3rem] overflow-hidden border-4 border-card shadow-2xl relative">
                <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                   <Info className="w-20 h-20 text-primary/20" />
                   <p className="absolute bottom-6 font-semibold text-muted-foreground">{t("storyVisuals")}</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold">
                <Info className="w-4 h-4" />
                {t("storyBadge")}
              </div>
              <h2 className="text-4xl font-bold leading-tight">
                {t.rich("welcomeTitle", {
                  span: (chunks) => <span className="text-primary">{chunks}</span>
                })}
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  {t("storyPara1")}
                </p>
                <p>
                  {t("storyPara2")}
                </p>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  t("feature1"),
                  t("feature2"),
                  t("feature3"),
                  t("feature4"),
                  t("feature5"),
                  t("feature6")
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-32 p-12 md:p-20 rounded-[3rem] bg-linear-to-br from-primary via-primary/90 to-blue-600 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6">{t("ctaTitle")}</h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              {t("ctaSubtitle")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="/ads/create" 
                className="px-10 py-4 bg-white text-primary font-bold rounded-2xl hover:bg-white/90 transition-all shadow-xl active:scale-95"
              >
                {t("ctaBtn1")}
              </a>
              <a 
                href="/ads" 
                className="px-10 py-4 bg-primary-foreground/10 text-white border border-white/20 font-bold rounded-2xl hover:bg-white/10 transition-all active:scale-95"
              >
                {t("ctaBtn2")}
              </a>
            </div>
          </div>

        </div>
      </PageLayout>
    </>
  );
}
