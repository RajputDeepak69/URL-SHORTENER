const CREATE_API = "https://r2ff3phzvf7m6lnfkc6qbayibi0ufiof.lambda-url.us-east-1.on.aws";  
const REDIRECT_BASE = "https://u7rmyhunfft32bkt6zv32x4nfq0veyfd.lambda-url.us-east-1.on.aws"; 
const STATS_API = "https://jan52vk6osj44x6l7e5lbhscz40csshn.lambda-url.us-east-1.on.aws";    

const longUrlInput = document.getElementById("longUrl");
const shortenBtn = document.getElementById("shortenBtn");
const resultContainer = document.querySelector(".result-container");
const shortUrlInput = document.getElementById("shortUrl");
const shortUrlLink = document.getElementById("shortUrlLink");
const copyBtn = document.getElementById("copyBtn");
const clickCount = document.getElementById("clickCount");
const createdAt = document.getElementById("createdAt");
const loading = document.querySelector(".loading");

// Event listeners hai
shortenBtn.addEventListener("click", shortenUrl);
copyBtn.addEventListener("click", copyToClipboard);

async function shortenUrl() {
  const longUrl = longUrlInput.value.trim();
  if (!isValidUrl(longUrl)) {
    alert("Please enter a valid URL!");
    return;
  }

  try {
    showLoading(true);

    const response = await fetch(CREATE_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: longUrl })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Something went wrong");

    const finalShortUrl = `${REDIRECT_BASE.replace(/\/$/, "")}/${data.short_url}`;

    shortUrlInput.value = finalShortUrl;
    shortUrlLink.href = finalShortUrl;
    shortUrlLink.textContent = finalShortUrl;
    resultContainer.style.display = "block";

    // Fetch stats and uski timing
    await fetchAndUpdateStats(data.short_url);
    setInterval(() => fetchAndUpdateStats(data.short_url), 5000);

  } catch (err) {
    console.error("Error:", err);
    alert("Error: " + err.message);
  } finally {
    showLoading(false);
  }
}

async function fetchAndUpdateStats(shortCode) {
  try {
    const statsResponse = await fetch(`${STATS_API.replace(/\/$/, "")}/${shortCode}`);
    const stats = await statsResponse.json();

    if (stats.error) {
      clickCount.textContent = "-";
      createdAt.textContent = "-";
    } else {
      clickCount.textContent = stats.clicks;
      createdAt.textContent = new Date(stats.created_at).toLocaleDateString();
    }
  } catch (err) {
    console.error("Stats fetch error:", err);
  }
}

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(shortUrlInput.value);
    copyBtn.innerHTML = "✅ Copied!";
    setTimeout(() => (copyBtn.innerHTML = '<i class="fas fa-copy"></i>'), 2000);
  } catch {
    alert("Copy failed!");
  }
}

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function showLoading(show) {
  loading.style.display = show ? "block" : "none";
  shortenBtn.disabled = show;
}