<script lang="ts">
	let imageFile = $state<File | null>(null);
	let extractedText = $state<string | null>(null);
	let isLoading = $state(false);

	async function uploadImage() {
		if (!imageFile) return;

		isLoading = true;
		const formData = new FormData();
		formData.append('image', imageFile);

		const res = await fetch('/api/upload', {
			method: 'POST',
			body: formData
		});

		const data = await res.json();
		extractedText = data.text;
		isLoading = false;
	}
</script>

<main>
	<h1>Recept till Prisjämförelse</h1>
	<input type="file" accept="image/*" onchange={(e) => (imageFile = e.target.files[0])} />
	<button onclick={uploadImage} class="primary" disabled={isLoading || !imageFile}>
		{isLoading ? 'Laddar...' : 'Ladda upp bild'}
	</button>

	{#if extractedText}
		<h2>Extraherad text:</h2>
		<pre>{extractedText}</pre>
	{/if}
</main>

<style>
	main {
		margin: 1rem auto;
		max-width: 600px;
	}
	pre {
		background: #f4f4f4;
		padding: 1rem;
		border-radius: 5px;
		white-space: pre-wrap;
	}
</style>
