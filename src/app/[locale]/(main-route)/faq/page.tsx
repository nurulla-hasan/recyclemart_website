
import PageLayout from "@/tools/PageLayout";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, MessageSquare, ShieldCheck, ShoppingBag, PlusCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqPage() {
  const t = useTranslations("FAQ");
  const faqs = [
    {
      question: t("sellQ"),
      answer: t("sellAns"),
      icon: ShoppingBag
    },
    {
      question: t("feeQ"),
      answer: t("feeAns"),
      icon: PlusCircle
    },
    {
      question: t("contactQ"),
      answer: t("contactAns"),
      icon: MessageSquare
    },
    {
      question: t("prohibitedQ"),
      answer: t("prohibitedAns"),
      icon: ShieldCheck
    },
    {
      question: t("suspiciousQ"),
      answer: t("suspiciousAns"),
      icon: HelpCircle
    },
    {
      question: t("editQ"),
      answer: t("editAns"),
      icon: PlusCircle
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="bg-primary/5 dark:bg-primary/10 py-20 border-b border-primary/10">
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
        </div>
      </div>

      <PageLayout paddingSize="default" className="screen-height">
          <div className="max-w-4xl mx-auto">
            
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2 bg-primary/10 rounded-lg">
                <HelpCircle className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">{t("sectionTitle")}</h2>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="border rounded-2xl bg-card px-6 border-border/60 hover:border-primary/30 transition-all duration-300 shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="text-xl font-bold text-foreground hover:text-primary hover:no-underline py-6 text-left">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-muted rounded-xl group-hover:bg-primary/10 transition-colors">
                        <faq.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                      </div>
                      {faq.question}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-lg leading-relaxed pb-8 pt-2 pl-14">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Support Footer */}
            <div className="mt-20 p-10 rounded-[2.5rem] bg-linear-to-br from-primary/10 via-primary/5 to-transparent border border-primary/10 text-center">
              <h3 className="text-2xl font-bold mb-4">{t("footerTitle")}</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                {t("footerSubtitle")}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="/contact" 
                  className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                >
                  {t("footerBtn1")}
                </a>
                <a 
                  href="/safety" 
                  className="px-8 py-4 bg-secondary text-secondary-foreground font-bold rounded-2xl hover:bg-secondary/80 transition-all"
                >
                  {t("footerBtn2")}
                </a>
              </div>
            </div>

          </div>
      </PageLayout>
    </>
  );
}
