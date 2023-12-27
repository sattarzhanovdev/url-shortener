document.addEventListener('DOMContentLoaded', function () {
  const urlForm = document.getElementById('urlForm');
  const shortenedUrlContainer = document.getElementById('shortenedUrlContainer');
  const shortenedUrl = document.getElementById('shortenedUrl');

  urlForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const longUrlInput = document.getElementById('longUrl');
    const longUrl = longUrlInput.value.trim();

    try {
      const shortUrl = await shortenUrl(longUrl);

      shortenedUrl.href = shortUrl;
      shortenedUrl.textContent = shortUrl;
      shortenedUrlContainer.classList.remove('hidden');
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  });

  async function shortenUrl(longUrl) {
    const apiUrl = `https://is.gd/create.php?format=json&url=${encodeURIComponent(longUrl)}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Failed to shorten URL`);
    }

    const data = await response.json();
    return data.shorturl;
  }
});
