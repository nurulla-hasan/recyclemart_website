'use client';

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import { io, Socket } from 'socket.io-client';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Sidebar from '@/components/chat/Sidebar';
import ChatHeader from '@/components/chat/ChatHeader';
import Messages from '@/components/chat/Messages';
import Composer from '@/components/chat/Composer';
import AdSummaryPanel from '@/components/chat/AdSummary';
import type {
  Conversation as UIConversation,
  Message as UIMessage,
  AdSummary as UIAdSummary,
} from '@/components/chat/types';
import { getAccessTokenFromCookies } from '@/lib/authClient';
import { useRouter, useSearchParams } from 'next/navigation';
import { ErrorToast } from '@/lib/utils';

type SocketAck<T> = {
  success: boolean;
  message: string;
  data?: T;
  errorSources?: { path: string; message: string }[];
  meta?: unknown;
};

type ConversationListItem = {
  id: string;
  name: string;
  avatar: string | null;
  lastMessage: string | null;
  lastTime: string;
  unreadCount: number;
  adSummary: UIAdSummary | null;
};

type MessagePayload = {
  _id: string;
  conversation?: string;
  conversationId?: string;
  sender: string;
  text?: string | null;
  attachment?: {
    type: 'image' | 'file';
    url: string;
    name?: string;
    size?: number;
  } | null;
  createdAt: string;
};

const SOCKET_NAMESPACE = '/chat';

const ensureDate = (value?: string | Date | null) => {
  if (!value) return null;
  const date = typeof value === 'string' ? new Date(value) : value;
  return Number.isNaN(date.getTime()) ? null : date;
};

const formatTimeLabel = (value?: string | Date | null) => {
  const date = ensureDate(value);
  if (!date) return '';
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const formatDateTimeLabel = (value?: string | Date | null) => {
  const date = ensureDate(value);
  if (!date) return '';
  return date.toLocaleString();
};

const buildMessages = (
  messages: MessagePayload[],
  myId: string,
): UIMessage[] => {
  return messages
    .slice()
    .reverse()
    .map(msg => ({
      id: msg._id,
      fromMe: msg.sender === myId,
      text: msg.text || undefined,
      image: msg.attachment?.type === 'image' ? msg.attachment.url : undefined,
      time: new Date(msg.createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      createdAt: msg.createdAt,
    }));
};

const mergeUniqueMessages = (prev: UIMessage[], incoming: UIMessage[]) => {
  if (!incoming.length) return prev;
  const seen = new Set(prev.map(m => m.id));
  const next = [...prev];
  for (const m of incoming) {
    if (seen.has(m.id)) continue;
    seen.add(m.id);
    next.push(m);
  }
  return next;
};

const getConversationIdFromMessage = (msg: MessagePayload) => {
  return msg.conversationId ?? msg.conversation ?? null;
};

const getPreviewTextFromMessage = (msg: MessagePayload) => {
  const text = typeof msg.text === 'string' ? msg.text.trim() : '';
  if (text) return text;
  if (msg.attachment) return '[Attachment]';
  return '';
};

const updateConversationPreview = (
  prev: ConversationListItem[],
  opts: {
    conversationId: string;
    msg: MessagePayload;
    activeId: string | null;
    myId: string;
  },
) => {
  const { conversationId, msg, activeId, myId } = opts;
  const lastMessageText = getPreviewTextFromMessage(msg);
  const lastMessageAt = msg.createdAt;
  const isFromMe = String(msg.sender) === String(myId);
  const isActive = String(activeId) === String(conversationId);

  const next = prev.map(c => {
    if (String(c.id) !== String(conversationId)) return c;

    const unreadCount = isFromMe || isActive ? 0 : (c.unreadCount ?? 0) + 1;

    return {
      ...c,
      lastMessage: lastMessageText,
      lastTime: lastMessageAt,
      unreadCount,
    };
  });

  next.sort((a, b) => {
    const aTime = new Date(a.lastTime as unknown as string).getTime();
    const bTime = new Date(b.lastTime as unknown as string).getTime();
    return (
      (Number.isNaN(bTime) ? 0 : bTime) - (Number.isNaN(aTime) ? 0 : aTime)
    );
  });

  return next;
};

let socketInstance: Socket | null = null;

async function ensureSocket(): Promise<Socket | null> {
  if (socketInstance) return socketInstance;

  const token = getAccessTokenFromCookies();

  if (!token) {
    ErrorToast('আপনি লগইন করেননি। চ্যাট ব্যবহার করতে অনুগ্রহ করে লগইন করুন।');
    return null;
  }

  const baseUrl = process.env.NEXT_PUBLIC_SOCKET_API;

  socketInstance = io(`${baseUrl}${SOCKET_NAMESPACE}`, {
    transports: ['websocket'],
    auth: { token },
  });

  socketInstance.on('connect_error', (err: Error) => {
    ErrorToast(err.message || 'Socket connection failed');
  });

  return socketInstance;
}

function ChatContent() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [myId, setMyId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [conversations, setConversations] = useState<ConversationListItem[]>(
    [],
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIdRef = useRef<string | null>(null);
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [adSummary, setAdSummary] = useState<UIAdSummary | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const pendingImageFile = useRef<File | null>(null);
  const handledUpsertRef = useRef(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  const searchParams = useSearchParams();
  const router = useRouter();

  const loadConversations = useCallback(
    (sock: Socket) => {
      sock.emit(
        'chat:conversation:list',
        {},
        (ack: SocketAck<ConversationListItem[]>) => {
          if (!ack.success) {
            ErrorToast(ack.message || 'Conversations load failed');
            return;
          }

          const sorted = ack.data ?? [];
          setConversations(sorted);
          if (!activeId && sorted.length) {
            setActiveId(String(sorted[0].id));
          }
        },
      );
    },
    [activeId],
  );

  const listMessages = useCallback(
    (conversationId: string, sock: Socket) => {
      if (!myId) return;

      sock.emit(
        'chat:message:list',
        { conversationId, limit: 50 },
        (ack: SocketAck<MessagePayload[]>) => {
          if (!ack.success || !ack.data) {
            ErrorToast(ack.message || 'Messages load failed');
            return;
          }

          setMessages(buildMessages(ack.data ?? [], myId));
        },
      );

      sock.emit(
        'chat:conversation:join',
        { conversationId },
        (ack: SocketAck<unknown>) => {
          if (!ack.success) {
            ErrorToast(ack.message || 'Failed to join conversation');
          }
        },
      );
    },
    [myId],
  );

  useEffect(() => {
    ensureSocket()
      .then(sock => {
        if (!sock) return;

        setSocket(sock);
        setLoading(false);

        if (sock.connected) {
          loadConversations(sock);
        }
        sock.on('connect', () => loadConversations(sock));

        sock.on('chat:message:new', (msg: MessagePayload) => {
          if (!myId) return;

          const conversationId = getConversationIdFromMessage(msg);
          if (conversationId) {
            setConversations(prev =>
              updateConversationPreview(prev, {
                conversationId,
                msg,
                activeId: activeIdRef.current,
                myId,
              }),
            );
          }

          setMessages(prev =>
            mergeUniqueMessages(prev, buildMessages([msg], myId)),
          );
        });

        sock.on('disconnect', () => {
          ErrorToast('চ্যাট সংযোগ বিচ্ছিন্ন হয়েছে');
        });
      })
      .catch(() => {
        ErrorToast('চ্যাট কানেকশনে সমস্যা হয়েছে');
        setLoading(false);
      });

    return () => {
      socketInstance?.off('chat:message:new');
      socketInstance?.off('connect');
    };
  }, [loadConversations, myId]);

  useEffect(() => {
    // set myId from access token payload
    function detectUser() {
      const token = getAccessTokenFromCookies();
      if (!token) return;

      try {
        const payload = JSON.parse(atob(token.split('.')[1] ?? ''));
        if (payload?._id) setMyId(payload._id as string);
      } catch {
        // no-op
      }
    }

    detectUser();
  }, []);

  useEffect(() => {
    if (!socket || !activeId) return;

    const activeConversation = conversations.find(
      c => String(c.id) === String(activeId),
    );
    setAdSummary(activeConversation?.adSummary ?? null);

    listMessages(activeId, socket);
  }, [activeId, conversations, listMessages, socket]);

  useEffect(() => {
    if (!socket || !myId) return;

    const adId = searchParams.get('adId');
    const participantId = searchParams.get('participantId');

    if (!adId || !participantId) return;
    if (handledUpsertRef.current) return;

    handledUpsertRef.current = true;

    socket.emit(
      'chat:conversation:upsert',
      { adId, participantId },
      (ack: SocketAck<{ _id?: string; id?: string }>) => {
        if (!ack?.success || !ack.data) {
          handledUpsertRef.current = false;
          ErrorToast(ack?.message || 'কথোপকথন শুরু করা যাচ্ছে না');
          router.replace('/chat', { scroll: false });
          return;
        }

        const conversationId = ack.data._id ?? ack.data.id;

        if (conversationId) {
          setActiveId(String(conversationId));
          loadConversations(socket);
        }

        router.replace('/chat', { scroll: false });
      },
    );
  }, [loadConversations, myId, router, searchParams, socket]);

  const filteredConversations = useMemo(() => {
    if (!query) return conversations;
    return conversations.filter(c =>
      c.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [conversations, query]);

  const handleSend = useCallback(() => {
    if (!socket || !activeId || !input.trim()) return;
    const text = input.trim();

    setSending(true);
    socket.emit(
      'chat:message:send',
      {
        conversationId: activeId,
        text,
      },
      (ack: SocketAck<MessagePayload>) => {
        setSending(false);

        const created = ack.data;
        if (!ack.success || !created) {
          ErrorToast(ack.message || 'বার্তা পাঠাতে ব্যর্থ');
          return;
        }

        const conversationId =
          getConversationIdFromMessage(created) ?? activeId;
        if (conversationId) {
          setConversations(prev =>
            updateConversationPreview(prev, {
              conversationId,
              msg: created,
              activeId,
              myId: myId ?? '',
            }),
          );
        }

        if (myId) {
          setMessages(prev =>
            mergeUniqueMessages(prev, buildMessages([created], myId)),
          );
        }
        setInput('');
      },
    );
  }, [activeId, input, myId, socket]);

  const triggerFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange: React.ChangeEventHandler<
    HTMLInputElement
  > = event => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      ErrorToast('শুধুমাত্র ছবি আপলোড করা যাবে।');
      return;
    }

    pendingImageFile.current = file;
    setPreviewUrl(URL.createObjectURL(file));
    setPreviewOpen(true);
  };

  const uploadAttachment = async (): Promise<string | null> => {
    if (!pendingImageFile.current) return null;
    if (!socket) return null;

    const formData = new FormData();
    formData.append('image', pendingImageFile.current);

    const token = getAccessTokenFromCookies();
    if (!token) {
      ErrorToast('লগইন সেশন পাওয়া যায়নি');
      return null;
    }

    try {
      setUploading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/chat/attachment/image`,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const json = await res.json();

      if (!json.success) {
        throw new Error(json.message || 'Upload failed');
      }

      return json.data?.url as string;
    } catch {
      ErrorToast('ছবি আপলোড করা যায়নি');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const confirmImageSend = async () => {
    if (!socket || !activeId || !pendingImageFile.current) {
      setPreviewOpen(false);
      pendingImageFile.current = null;
      return;
    }

    const uploadedUrl = await uploadAttachment();
    if (!uploadedUrl) {
      return;
    }

    setSending(true);
    socket.emit(
      'chat:message:send',
      {
        conversationId: activeId,
        attachment: {
          type: 'image',
          url: uploadedUrl,
          name: pendingImageFile.current?.name,
          size: pendingImageFile.current?.size,
        },
      },
      (ack: SocketAck<MessagePayload>) => {
        setSending(false);
        setPreviewOpen(false);
        pendingImageFile.current = null;
        setPreviewUrl(null);

        const created = ack.data;
        if (!ack.success || !created) {
          ErrorToast(ack.message || 'ছবি পাঠানো যায়নি');
          return;
        }

        const conversationId =
          getConversationIdFromMessage(created) ?? activeId;
        if (conversationId) {
          setConversations(prev =>
            updateConversationPreview(prev, {
              conversationId,
              msg: created,
              activeId,
              myId: myId ?? '',
            }),
          );
        }

        if (myId) {
          setMessages(prev =>
            mergeUniqueMessages(prev, buildMessages([created], myId)),
          );
        }
      },
    );
  };

  const activeConversationMeta: UIConversation | null = useMemo(() => {
    const active = conversations.find(c => String(c.id) === String(activeId));
    if (!active) return null;

    return {
      id: String(active.id),
      name: active.name,
      avatar: active.avatar || '',
      lastMessage: active.lastMessage ?? '',
      lastTime: formatDateTimeLabel(active.lastTime),
      unread: active.unreadCount,
    };
  }, [activeId, conversations]);

  if (loading) {
    return (
      <div className="flex h-full min-h-[70vh] items-center justify-center text-muted-foreground">
        Loading chat...
      </div>
    );
  }

  if (!socket || !activeConversationMeta || !myId) {
    return (
      <div className="flex h-full min-h-[70vh] items-center justify-center text-muted-foreground">
        Loading chat...
      </div>
    );
  }

  return (
    <>
      <div className="h-[calc(100vh-131px)] overflow-hidden bg-muted/30">
        <div className="mx-auto h-full px-4 py-3 overflow-hidden">
          <div className="grid h-full min-h-0 grid-cols-1 gap-3 lg:grid-cols-[320px_minmax(0,1fr)_360px] lg:gap-4">
            <Sidebar
              className="hidden h-full min-h-0 overflow-hidden rounded-xl border bg-card lg:block"
              conversations={filteredConversations.map(c => ({
                id: String(c.id),
                name: c.name,
                avatar: c.avatar ?? '',
                lastMessage: c.lastMessage ?? '',
                lastTime: formatTimeLabel(c.lastTime),
                unread: c.unreadCount || undefined,
              }))}
              activeId={activeConversationMeta.id}
              onSelect={id => setActiveId(id)}
              query={query}
              setQuery={setQuery}
            />

            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="inline-flex items-center gap-2 lg:hidden"
                >
                  <MessageCircle className="h-4 w-4" /> Chats
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[90vw] p-0 sm:w-96">
                <SheetHeader className="p-4">
                  <SheetTitle>Chats</SheetTitle>
                  <SheetDescription className="sr-only">
                    Select a conversation from the list.
                  </SheetDescription>
                </SheetHeader>
                <Sidebar
                  className="rounded-none"
                  conversations={filteredConversations.map(c => ({
                    id: String(c.id),
                    name: c.name,
                    avatar: c.avatar ?? '',
                    lastMessage: c.lastMessage ?? '',
                    lastTime: formatTimeLabel(c.lastTime),
                    unread: c.unreadCount || undefined,
                  }))}
                  activeId={activeConversationMeta.id}
                  onSelect={id => {
                    setActiveId(id);
                    setSheetOpen(false);
                  }}
                  query={query}
                  setQuery={setQuery}
                />
              </SheetContent>
            </Sheet>

            <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border bg-card">
              <ChatHeader
                name={activeConversationMeta.name}
                avatar={activeConversationMeta.avatar}
                // status="Active now"
              />
              <Separator />
              <Messages thread={messages} endRef={endRef} />
              <Composer
                input={input}
                setInput={setInput}
                onSend={handleSend}
                onPickImage={triggerFilePicker}
                fileInput={fileInputRef}
                onFileChange={handleFileChange}
                disabled={sending}
              />
            </div>

            <AdSummaryPanel ad={adSummary} />
          </div>
        </div>
      </div>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>ছবি পাঠাবেন?</DialogTitle>
            <DialogDescription className="sr-only">
              Preview the selected image before sending.
            </DialogDescription>
          </DialogHeader>
          {previewUrl ? (
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-md">
              <Image
                src={previewUrl}
                alt="preview"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              প্রিভিউ লোড করা যায়নি
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={uploading || sending} onClick={confirmImageSend}>
              {uploading ? 'Uploading...' : 'Send'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full min-h-[70vh] items-center justify-center text-muted-foreground">
          Loading chat...
        </div>
      }
    >
      <ChatContent />
    </Suspense>
  );
}
