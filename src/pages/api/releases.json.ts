import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  try {
    const response = await fetch('https://api.github.com/repos/bphndigitalservice/ildis/releases/latest', {
      headers: {
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'ILDIS-Docs',
      },
    });

    if (!response.ok) {
      return new Response(null, { status: 500 });
    }

    const data = await response.json();

    return new Response(JSON.stringify({
      tag_name: data.tag_name,
      published_at: data.published_at,
      html_url: data.html_url,
      body: data.body,
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch {
    return new Response(null, { status: 500 });
  }
};