'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { getAccessTokenFromCookies } from '@/lib/authClient';
import { toast } from 'sonner';

const decodeUserId = (token: string | null): string | null => {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1] ?? ''));
    return payload?._id ?? null;
  } catch {
    return null;
  }
};

interface MessageSellerButtonProps {
  adId: string;
  sellerId: string;
  className?: string;
}

export function MessageSellerButton({
  adId,
  sellerId,
  className,
}: MessageSellerButtonProps) {
  const router = useRouter();
  const t = useTranslations('AdDetails');
  const [pending, startTransition] = useTransition();

  const handleClick = () => {
    const token = getAccessTokenFromCookies();
    if (!token) {
      toast.error(t('loginToChat'), {
        description: t('loginToChatDesc'),
      });
      router.push(`/auth/login?redirect=/ads/${adId}`);
      return;
    }

    const currentUserId = decodeUserId(token);
    if (currentUserId && currentUserId === sellerId) {
      toast.info(t('ownAd'), {
        description: t('ownAdDesc'),
      });
      return;
    }

    const query = new URLSearchParams({
      adId,
      participantId: sellerId,
    }).toString();

    startTransition(() => {
      router.push(`/chat?${query}`);
    });
  };

  return (
    <Button
      variant="outline"
      className={className}
      onClick={handleClick}
      disabled={pending}
    >
      <MessageCircle />
      {pending ? t('opening') : t('sendMessage')}
    </Button>
  );
}
