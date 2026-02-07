import ProfileSidebar from "@/components/profile/ProfileSidebar";
import { fetchMyProfile } from "@/services/Auth";

type ProfileLayoutProps = {
  children: React.ReactNode;
};

export default async function ProfileLayout({ children }: ProfileLayoutProps) {
  const profileData = await fetchMyProfile();
  const user = profileData?.success ? profileData.data : null;

  return (
    <div className="screen-height bg-muted/20">
      <div className="custom-width mx-auto px-4 py-6">
        <div className="lg:hidden">
          <div className="rounded-xl border bg-card shadow-sm">
            <ProfileSidebar 
              user={user} 
              variant="mobile" 
              className="rounded-xl border-0 bg-card/95" 
            />
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
          <ProfileSidebar user={user} variant="desktop" />
          <section className="rounded-xl border bg-card p-4 shadow-sm lg:p-6">
            {children}
          </section>
        </div>
      </div>
    </div>
  );
}
