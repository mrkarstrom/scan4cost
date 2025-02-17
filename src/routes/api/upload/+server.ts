import Tesseract from 'tesseract.js';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	const image = formData.get('image');

	if (!image) {
		return new Response(JSON.stringify({ error: 'Ingen bild bifogad' }), { status: 400 });
	}

	const { data } = await Tesseract.recognize(await image.arrayBuffer(), 'swe');

	return new Response(JSON.stringify({ text: data.text }), {
		headers: { 'Content-Type': 'application/json' }
	});
};
