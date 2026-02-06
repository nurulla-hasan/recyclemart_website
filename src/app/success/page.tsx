'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, XCircle, Loader2, ArrowRight, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { verifyLotteryPayment } from '@/services/lottery';
import Link from 'next/link';

const PaymentStatusContent = () => {
  const searchParams = useSearchParams();
  const tran_id = searchParams.get('tran_id');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your payment...');
  const [tokens, setTokens] = useState<string[]>([]);

  useEffect(() => {
    const verify = async () => {
      if (!tran_id) {
        setStatus('error');
        setMessage('Invalid transaction ID.');
        return;
      }

      try {
        const res = await verifyLotteryPayment(tran_id);
        if (res?.success) {
          setStatus('success');
          setMessage(res.message || 'Payment verified successfully! Your lottery entry is confirmed.');
          if (res.data?.tokenNumbers) {
            setTokens(res.data.tokenNumbers);
          }
        } else {
          setStatus('error');
          setMessage(res?.message || 'Payment verification failed. Please contact support.');
        }
      } catch {
        setStatus('error');
        setMessage('An unexpected error occurred during verification.');
      }
    };

    verify();
  }, [tran_id]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4">
      <Card className="w-full max-w-md border-none shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            {status === 'loading' && (
              <div className="rounded-full bg-primary/10 p-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            )}
            {status === 'success' && (
              <div className="rounded-full bg-green-100 p-4">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
            )}
            {status === 'error' && (
              <div className="rounded-full bg-red-100 p-4">
                <XCircle className="h-12 w-12 text-red-600" />
              </div>
            )}
          </div>
          <CardTitle className={`text-2xl font-bold ${
            status === 'success' ? 'text-green-600' : 
            status === 'error' ? 'text-red-600' : 'text-foreground'
          }`}>
            {status === 'loading' ? 'Verifying Payment' : 
             status === 'success' ? 'Payment Successful!' : 'Verification Failed'}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-4">
          <p className="text-muted-foreground">{message}</p>
          
          {tokens.length > 0 && (
            <div className="mt-6 p-4 rounded-2xl bg-primary/5 border border-primary/10">
              <p className="text-xs font-bold text-primary uppercase tracking-wider mb-3 flex items-center justify-center gap-2">
                <Ticket className="h-3 w-3" /> Your Lucky Tokens
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {tokens.map((token) => (
                  <Badge 
                    key={token} 
                    variant="secondary" 
                    className="bg-white text-primary border-primary/20 font-mono text-sm px-3 py-1 shadow-sm"
                  >
                    {token}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {tran_id && (
            <p className="mt-6 text-[10px] text-muted-foreground/60 font-mono">
              Transaction ID: {tran_id}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button asChild className="w-full font-bold py-6 rounded-xl">
            <Link href="/profile/my-lottery">
              Go to My Lottery <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full py-6 rounded-xl">
            <Link href="/">Back to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

const SuccessPage = () => {
  return (
    <Suspense fallback={
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    }>
      <PaymentStatusContent />
    </Suspense>
  );
};

export default SuccessPage;