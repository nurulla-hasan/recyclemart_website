import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Globe,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

import { useTranslations } from "next-intl";

const socials = [
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "YouTube", href: "https://youtube.com", icon: Youtube },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
];

const Footer = () => {
  const t = useTranslations("Footer");

  const infoColumns = [
    {
      title: t("companyLegal"),
      links: [
        { label: t("aboutUs"), href: "/about" },
        { label: t("termsConditions"), href: "/terms" },
        { label: t("privacyPolicy"), href: "/privacy" },
      ],
    },
    {
      title: t("helpSupport"),
      links: [
        { label: t("faqs"), href: "/faq" },
        { label: t("staySafe"), href: "/safety" },
        { label: t("contactUs"), href: "/contact" },
      ],
    },
    {
      title: t("guidesBlog"),
      links: [
        { label: t("motorGuide"), href: "/guides/motor" },
        { label: t("propertyGuide"), href: "/guides/property" },
        { label: t("officialBlog"), href: "/blog" },
      ],
    },
  ];

  const contactDetails = [
    {
      icon: MapPin,
      label: "Dhaka Vasantek",
      description: "Dhaka, Bangladesh",
    },
    {
      icon: Phone,
      label: "+8801869-271616",
      description: t("supportHours"),
      href: "tel:+8801869271616",
    },
    {
      icon: Mail,
      label: "info@recyclemart.com.bd",
      description: t("replyWithin"),
      href: "/contact",
    },
  ];

  return (
    <footer className="relative overflow-hidden border-border/30 border-t bg-background py-8 text-sm text-muted-foreground">
      <div className="custom-width mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Globe className="h-6 w-6" />
              </div>
              <p className="text-xl font-bold text-foreground tracking-tight">Recycle Mart</p>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground/90 max-w-xs">
              {t("companyDescription")}
            </p>
          </div>

          {infoColumns.slice(0, 2).map(({ title, links }) => (
            <div key={title} className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="inline-flex items-center gap-2 text-muted-foreground/80 transition-colors hover:text-primary hover:translate-x-1 duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
              {t("contactUs")}
            </h3>
            <div className="space-y-4">
              {contactDetails.map(({ icon: Icon, label, description, href }) => (
                <div key={label} className="flex items-start gap-3 group">
                  <div className="mt-1 rounded-full bg-primary/5 p-1.5 text-primary transition-colors group-hover:bg-primary/10">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    {href ? (
                      <Link
                        href={href}
                        className="font-medium text-foreground transition-colors group-hover:text-primary"
                      >
                        {label}
                      </Link>
                    ) : (
                      <p className="font-medium text-foreground transition-colors group-hover:text-primary">
                        {label}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-10 bg-border/40" />

        <div className="flex flex-col items-center justify-between gap-6 text-xs sm:flex-row">
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <p className="font-medium text-muted-foreground">
              © {new Date().getFullYear()} Recycle Mart. {t("allRightsReserved")}
            </p>
            <p className="text-muted-foreground/60">
              {t("developedBy")} <span className="font-semibold text-primary">SmartEdge Technologies</span>
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {socials.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="group flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-background text-muted-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-md hover:-translate-y-0.5"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
