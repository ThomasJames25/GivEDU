import { NextResponse } from 'next/server';

const fakePosts = [
    { id: 1, name: 'Math Homework Help' },
    { id: 2, name: 'Science Fair Guide' },
    { id: 3, name: 'History Timeline Notes' },
];

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q')?.toLowerCase() || '';

    const results = fakePosts.filter(post =>
        post.name.toLowerCase().includes(query)
    );

    return NextResponse.json(results);
}