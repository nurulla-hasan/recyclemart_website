
import PageLayout from "@/tools/PageLayout";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, MessageSquare, ShieldCheck, ShoppingBag, PlusCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqPage() {
  const faqs = [
    {
      question: "How do I sell an item on Recycle Mart?",
      answer: "To sell an item, simply create an account, click on the 'Post Ad' button, uploading clear photos of your item, and provide a detailed description. Once submitted, your ad will be reviewed and published.",
      icon: ShoppingBag
    },
    {
      question: "Is there a fee to post an ad?",
      answer: "Posting verified ads for personal items is free. However, we offer premium features and vendor accounts for businesses which may carry a small fee for enhanced visibility.",
      icon: PlusCircle
    },
    {
      question: "How can I contact a seller?",
      answer: "You can use our secure in-app chat feature to message sellers directly. For safety, we recommend keeping all communications within the Recycle Mart platform.",
      icon: MessageSquare
    },
    {
      question: "What items are prohibited?",
      answer: "We do not allow the sale of illegal goods, weapons, hazardous materials, or explicit content. Please refer to our Terms & Conditions for a full list of prohibited items.",
      icon: ShieldCheck
    },
    {
      question: "How do I report a suspicious ad?",
      answer: "If you find an ad that violates our policies or looks suspicious, please click the 'Report' button on the ad page. Our team will investigate immediately.",
      icon: HelpCircle
    },
    {
      question: "Can I edit my ad after posting?",
      answer: "Yes, you can edit your ad at any time from your dashboard. Go to 'My Ads', select the item you want to modify, and click 'Edit'.",
      icon: PlusCircle
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="bg-primary/5 dark:bg-primary/10 py-20 border-b border-primary/10">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="px-4 py-1.5 mb-6 border-primary/20 text-primary bg-background/50 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider">
            Help Center
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            How can we <span className="text-primary">help you?</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Find answers to common questions about buying, selling, and safety on Recycle Mart. 
            We're here to make your experience as smooth as possible.
          </p>
        </div>
      </div>

      <PageLayout paddingSize="default" className="screen-height">
          <div className="max-w-4xl mx-auto">
            
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2 bg-primary/10 rounded-lg">
                <HelpCircle className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
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
              <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                If you couldn't find the answer you were looking for, please feel free to contact our support team.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="/contact" 
                  className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                >
                  Contact Support
                </a>
                <a 
                  href="/safety" 
                  className="px-8 py-4 bg-secondary text-secondary-foreground font-bold rounded-2xl hover:bg-secondary/80 transition-all"
                >
                  Safety Center
                </a>
              </div>
            </div>

          </div>
      </PageLayout>
    </>
  );
}
