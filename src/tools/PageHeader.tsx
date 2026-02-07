import React from 'react';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type PageHeaderBreadcrumb = {
  name: string;
  href?: string;
};

type PageHeaderProps = {
  title: string;
  breadcrumbs: PageHeaderBreadcrumb[];
};

/**
 * A reusable page header component with a title and breadcrumbs.
 * @param {{ title: string, breadcrumbs: { name: string, href?: string }[] }} props
 */
const PageHeader: React.FC<PageHeaderProps> = ({ title, breadcrumbs }) => {
  return (
    <section className="bg-secondary py-6 md:py-12">
      <div className="custom-width max-w-7xl mx-auto text-center">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">{title}</h1>
        <Breadcrumb>
          <BreadcrumbList className="justify-center">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {crumb.href ? (
                    <BreadcrumbLink asChild>
                      <Link href={crumb.href}>{crumb.name}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="">{crumb.name}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </section>
  );
};

export default PageHeader;