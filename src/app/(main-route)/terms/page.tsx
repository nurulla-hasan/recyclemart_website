
import PageLayout from "@/tools/PageLayout";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, ShieldCheck, Lock, Gavel, Mail } from "lucide-react";

export default function TermsPage() {
  const termsContent = {
    title: "Terms & Conditions",
    lastUpdated: "January 10, 2026",
    content: [
      {
        title: "1. Acceptance of Terms",
        text: "By accessing and using Recycle Mart, you accept and agree to be bound by the terms and provision of this agreement.",
        icon: Gavel
      },
      {
        title: "2. Use License",
        text: "Permission is granted to temporarily access the materials on Recycle Mart's website for personal, non-commercial transitory viewing only.",
        subItems: [
          "Modify or copy the materials",
          "Use the materials for any commercial purpose",
          "Attempt to decompile or reverse engineer any software",
          "Remove any copyright or proprietary notations"
        ],
        icon: FileText
      },
      {
        title: "3. User Accounts",
        text: "When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms.",
        icon: Lock
      },
      {
        title: "4. Posting Ads",
        text: "Users are responsible for the content they post. All ads must comply with our community guidelines and local laws.",
        subItems: [
          "Illegal or stolen goods",
          "Counterfeit products",
          "Weapons and explosives",
          "Adult content"
        ],
        icon: FileText
      },
      {
        title: "5. Limitation of Liability",
        text: "Recycle Mart shall not be held liable for any damages arising from the use or inability to use our services.",
        icon: ShieldCheck
      }
    ]
  };

  return (
    <>
      {/* Hero Section */}
      <div className="bg-primary/5 dark:bg-primary/10 py-20 border-b border-primary/10 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-64 w-full max-w-4xl bg-primary/10 blur-3xl opacity-50" />
        
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="px-4 py-1.5 mb-6 border-primary/20 text-primary bg-background/50 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider">
            Legal Information
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Terms & <span className="text-primary">Conditions</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground font-medium">
            <Calendar className="w-5 h-5 text-primary" />
            <span>Last updated: {termsContent.lastUpdated}</span>
          </div>
        </div>
      </div>

      <PageLayout paddingSize="none" className="screen-height">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            
            <div className="flex items-center gap-3 mb-10 pb-4 border-b border-border/40">
              <FileText className="w-6 h-6 text-primary" />
              <p className="text-lg font-medium text-muted-foreground">Read carefully before using our services</p>
            </div>

            <div className="space-y-12">
              {termsContent.content.map((section, index) => (
                <div key={index} className="group">
                  <div className="flex items-start gap-6">
                    <div className="p-3 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all">
                      <section.icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold">{section.title}</h2>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        {section.text}
                      </p>
                      {section.subItems && (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                          {section.subItems.map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-muted-foreground bg-muted/30 p-3 rounded-xl border border-border/40">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Support Box */}
            <div className="mt-20 p-8 md:p-12 rounded-[2.5rem] bg-card border border-border/60 text-center relative overflow-hidden shadow-sm">
               <div className="absolute top-0 right-0 p-10 opacity-5">
                 <Mail className="w-32 h-32 text-primary" />
               </div>
               <h3 className="text-2xl font-bold mb-4">Have questions about our terms?</h3>
               <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                 If you have any questions or need clarification regarding these terms, please reach out to us.
               </p>
               <a 
                 href="mailto:support@recyclemart.com" 
                 className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-primary/20"
               >
                 <Mail className="w-5 h-5" />
                 Contact Legal Support
               </a>
            </div>

          </div>
        </div>
      </PageLayout>
    </>
  );
}
