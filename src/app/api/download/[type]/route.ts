import { NextResponse } from 'next/server';
import dietaJson from '@/data/make-dieta.json';
import llamadasJson from '@/data/make-llamadas.json';

export async function GET(
  request: Request,
  { params }: { params: { type: string } }
) {
  const type = params.type;

  if (type === 'dieta') {
    return NextResponse.json(dietaJson);
  }

  if (type === 'llamadas') {
    return NextResponse.json(llamadasJson);
  }

  return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
}