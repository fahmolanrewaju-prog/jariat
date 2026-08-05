import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, youtubeUrl, description } = body;

    if (!title || !youtubeUrl) {
      return NextResponse.json({ error: 'Title and URL are required' }, { status: 400 });
    }

    // Extract Video ID from URL
    let videoId = '';
    if (youtubeUrl.includes('v=')) {
      videoId = youtubeUrl.split('v=')[1]?.split('&')[0] || '';
    } else {
      videoId = youtubeUrl.split('/').pop() || '';
    }

    if (!videoId) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
    }

    const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    const newVideo = await prisma.video.create({
      data: {
        title,
        youtubeUrl,
        description: description || '',
        thumbnail,
        isFree: true,
      },
    });

    return NextResponse.json({ success: true, video: newVideo });
  } catch (error) {
    console.error('Admin Error:', error);
    return NextResponse.json({ error: 'Failed to add video' }, { status: 500 });
  }
}