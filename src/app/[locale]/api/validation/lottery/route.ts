import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  return handleRequest(request, locale);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  return handleRequest(request, locale);
}

async function handleRequest(request: NextRequest, locale: string) {
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
      return NextResponse.redirect(new URL(`/${locale}/lottery`, request.url));
    }

    // Redirect to success page with tran_id
    return NextResponse.redirect(
      new URL(`${request.nextUrl.origin}/${locale}/success?tran_id=${tran_id}&type=lottery`),
      {
        status: 303, // Use 303 See Other for proper redirection
      }
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('SSLCommerz Validation Error:', error);
    return NextResponse.redirect(new URL(`/${locale}/lottery`, request.url));
  }
}
