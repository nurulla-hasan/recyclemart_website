import PageLayout from "@/tools/PageLayout";
import { Badge } from "@/components/ui/badge";
import { 
  Newspaper, 
  Calendar, 
  MessageSquare, 
  Image as ImageIcon,
  FileText,
  Download,
  ArrowRight,
  ExternalLink,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PressPage() {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-primary/5 dark:bg-primary/10 py-24 border-b border-primary/10 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-96 w-full max-w-5xl bg-primary/10 blur-3xl opacity-60 animate-pulse" />
        
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="px-6 py-2 mb-8 border-primary/20 text-primary bg-background/50 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-[0.2em]">
            Press & Media
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">
            Our <span className="text-primary">Newsroom</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The latest stories, updates, and resources from Recycle Mart. 
            Stay informed about our journey towards a sustainable future.
          </p>
        </div>
      </div>

      <PageLayout paddingSize="none">
        <div className="container mx-auto px-4 py-20">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Main Content: Press Releases */}
            <div className="lg:col-span-2 space-y-12">
              <div className="flex items-center justify-between border-b border-border/40 pb-6">
                <div className="flex items-center gap-3">
                  <Newspaper className="w-8 h-8 text-primary" />
                  <h2 className="text-3xl font-bold">Latest Releases</h2>
                </div>
                <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/5 font-bold">
                  View All <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-8">
                {/* Press Release 1 */}
                <div className="group p-8 rounded-[2.5rem] bg-card border border-border/40 hover:border-primary/20 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-6 h-6 text-primary/40" />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-none px-3 py-1">
                        Milestone
                      </Badge>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        February 05, 2026
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors cursor-pointer">
                      Recycle Mart Reaches 1 Million Active Users Milestone
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      The leading sustainable marketplace celebrates a major milestone in community growth and environmental impact.
                    </p>
                    <Button variant="link" className="p-0 h-auto text-primary font-bold justify-start hover:no-underline group/link">
                      Read Full Story <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>

                {/* Press Release 2 */}
                <div className="group p-8 rounded-[2.5rem] bg-card border border-border/40 hover:border-primary/20 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-6 h-6 text-primary/40" />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-none px-3 py-1">
                        Product
                      </Badge>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        January 20, 2026
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors cursor-pointer">
                      New AI-Powered Verification System Launched
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Recycle Mart introduces cutting-edge AI to ensure safe and authentic recycling transactions.
                    </p>
                    <Button variant="link" className="p-0 h-auto text-primary font-bold justify-start hover:no-underline group/link">
                      Read Full Story <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>

                {/* Press Release 3 */}
                <div className="group p-8 rounded-[2.5rem] bg-card border border-border/40 hover:border-primary/20 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-6 h-6 text-primary/40" />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-none px-3 py-1">
                        Partnership
                      </Badge>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        January 10, 2026
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors cursor-pointer">
                      Partnership with Global Green Initiative Announced
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Joining forces to promote circular economy practices across the country.
                    </p>
                    <Button variant="link" className="p-0 h-auto text-primary font-bold justify-start hover:no-underline group/link">
                      Read Full Story <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar: Media Kit & Contact */}
            <div className="space-y-12">
              
              {/* Digital Assets Section */}
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                    <ImageIcon className="w-6 h-6 text-primary" />
                    Digital Assets
                  </h3>
                  <Badge variant="outline" className="text-[10px] uppercase tracking-wider">Updated</Badge>
                </div>

                {/* Featured Asset Preview */}
                <div className="relative aspect-video rounded-3xl overflow-hidden border border-border/40 group cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-primary/10 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute bottom-0 left-0 p-6 z-20 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-white text-sm font-bold">Brand Identity 2026</p>
                    <p className="text-white/70 text-xs">High-resolution brand assets and guidelines</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-primary/20 group-hover:scale-125 transition-transform" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {/* Asset 1 */}
                  <div className="group p-5 rounded-2xl bg-card border border-border/40 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/5 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">Brand Book</h4>
                          <p className="text-[10px] text-muted-foreground">PDF • 4.2 MB</p>
                        </div>
                      </div>
                      <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>

                  {/* Asset 2 */}
                  <div className="group p-5 rounded-2xl bg-card border border-border/40 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/5 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">Logo Archive</h4>
                          <p className="text-[10px] text-muted-foreground">ZIP • 8.5 MB</p>
                        </div>
                      </div>
                      <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>

                  {/* Asset 3 */}
                  <div className="group p-5 rounded-2xl bg-card border border-border/40 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/5 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                          <MessageSquare className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">PR Guidelines</h4>
                          <p className="text-[10px] text-muted-foreground">DOCX • 1.1 MB</p>
                        </div>
                      </div>
                      <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full rounded-2xl border-dashed border-2 hover:border-primary hover:text-primary transition-all">
                  Request Custom Assets
                </Button>
              </div>

              {/* Press Contact Card */}
              <div className="group p-8 rounded-4xl bg-primary text-primary-foreground shadow-2xl shadow-primary/20 relative overflow-hidden cursor-pointer hover:shadow-primary/30 transition-all duration-500">
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10 space-y-6">
                  <div className="p-4 bg-white/20 rounded-2xl w-fit group-hover:bg-white/30 transition-colors">
                    <MessageSquare className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Media Inquiries</h3>
                    <p className="text-primary-foreground/80 mt-2 leading-relaxed">
                      For all press and media related inquiries, please contact our team via our official channels.
                    </p>
                  </div>
                  <Button variant="secondary" className="w-full bg-white text-primary hover:bg-white/90 font-bold">
                    <Mail className="mr-2 w-4 h-4" /> Contact Press Team
                  </Button>
                </div>
              </div>

              {/* Quick Facts */}
              <div className="p-8 rounded-4xl border border-border/40 space-y-6">
                <h4 className="font-bold text-lg border-b border-border/40 pb-4">Quick Facts</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Founded</span>
                    <span className="font-bold">2024</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Headquarters</span>
                    <span className="font-bold">Dhaka, BD</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Active Users</span>
                    <span className="font-bold">1M+</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Items Recycled</span>
                    <span className="font-bold">500K+</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
