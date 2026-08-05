import { NextResponse } from 'next/server';
import { prisma } from '@/lib/auth'; // <--- CHANGED THIS LINE

export const { GET, POST } = toNextJsHandler(auth);