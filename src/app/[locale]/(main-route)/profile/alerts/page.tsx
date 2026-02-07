import { Bell, Mail, MapPin, Search, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfilePageHeader } from "@/components/profile/ProfilePageHeader";

const activeAlerts = [
  {
    title: "Used motorcycle within 50k BDT",
    location: "Dhaka",
    frequency: "Daily",
    matches: 8,
  },
  {
    title: "3 bedroom flat to rent",
    location: "Chattogram",
    frequency: "Instant",
    matches: 3,
  },
];

const savedSearches = [
  {
    title: "Gaming laptop 16GB RAM",
    lastUsed: "Today",
    results: 24,
  },
  {
    title: "Camera lens prime 50mm",
    lastUsed: "2 days ago",
    results: 12,
  },
];

export default function ProfileAlertsPage() {
  return (
    <div className="space-y-6">
      <ProfilePageHeader
        title="Alerts & saved searches"
        description="Stay notified about new ads that match your interests. Manage your alert frequency and saved searches."
        actions={
          <Button size="sm" className="rounded-full">
            <Search className="mr-2 h-4 w-4" /> Create new alert
          </Button>
        }
      />

      <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Card className="border-border/60 bg-card/95 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Bell className="h-4 w-4 text-primary" /> Active alerts
            </CardTitle>
            <CardDescription>We will notify you by email and app notifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeAlerts.map((alert) => (
              <div
                key={alert.title}
                className="flex flex-col gap-3 rounded-xl border border-border/40 bg-muted/30 p-4 dark:bg-muted/20"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{alert.title}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> {alert.location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5" /> {alert.frequency}
                      </span>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-primary/40 text-primary">
                    {alert.matches} new matches
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Last updated 2 hours ago</span>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="rounded-full border-primary/40 px-3 text-primary">
                      Pause alerts
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/95 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Search className="h-4 w-4 text-primary" /> Saved searches
            </CardTitle>
            <CardDescription>Quickly revisit your favourite categories.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {savedSearches.map((search) => (
              <div key={search.title} className="rounded-xl border border-border/40 bg-muted/30 p-4 text-sm dark:bg-muted/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{search.title}</p>
                    <p className="text-xs text-muted-foreground">Last used {search.lastUsed}</p>
                  </div>
                  <Badge variant="outline" className="border-primary/40 text-primary">
                    {search.results} results
                  </Badge>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <Button variant="outline" size="sm" className="rounded-full border-primary/40 px-3 text-primary">
                    View matches
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-between text-xs text-muted-foreground">
            <span>Tip: combine filters for the best matches.</span>
            <Button variant="ghost" size="sm" className="rounded-full">
              Manage preferences
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}