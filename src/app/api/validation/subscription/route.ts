import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  return handleRequest(request);
}

export async function GET(request: NextRequest) {
  return handleRequest(request);
}

async function handleRequest(request: NextRequest) {
  try {
    let tran_id: string | null = null;

    // 1. Try to get tran_id from URL query parameters (for GET requests)
    const { searchParams } = new URL(request.url);
    tran_id = searchParams.get('tran_id');

    // 2. If not found, try to get from Form Data (for SSLCommerz POST response)
    if (!tran_id && request.method === 'POST') {
      try {
        const formData = await request.formData();
        tran_id = formData.get('tran_id') as string;
      } catch {
        // Form data might not be present
      }
    }

    if (!tran_id) {
      return NextResponse.redirect(new URL('/en/profile/subscription', request.url));
    }

    // Redirect to success page with tran_id and type
    return NextResponse.redirect(
      new URL(`${request.nextUrl.origin}/success?tran_id=${tran_id}&type=subscription`),
      {
        status: 303,
      }
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Subscription Validation Error:', error);
    return NextResponse.redirect(new URL('/en/profile/subscription', request.url));
  }
}
