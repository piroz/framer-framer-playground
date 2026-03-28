export const html = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>framer-framer Embed Playground</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #0a0a0a;
      --surface: #141414;
      --surface-hover: #1c1c1c;
      --border: #2a2a2a;
      --text: #e5e5e5;
      --text-muted: #888;
      --accent: #6366f1;
      --radius: 12px;

      --c-youtube: #ff0000;
      --c-twitter: #1d9bf0;
      --c-tiktok: #010101;
      --c-vimeo: #1ab7ea;
      --c-niconico: #252525;
      --c-spotify: #1db954;
      --c-soundcloud: #ff5500;
      --c-huggingface: #ff9d00;
      --c-gradio: #f97316;
      --c-slideshare: #0077b5;
      --c-speakerdeck: #009287;
      --c-pinterest: #bd081c;
      --c-reddit: #ff4500;
      --c-mastodon: #6364ff;
      --c-bluesky: #0085ff;
      --c-flickr: #f40083;
      --c-threads: #ffffff;
      --c-note: #41c9b4;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      padding: 2rem 1rem;
    }

    .container { max-width: 960px; margin: 0 auto; }

    header { text-align: center; margin-bottom: 2.5rem; }
    header h1 {
      font-size: 1.8rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      margin-bottom: 0.4rem;
    }
    header h1 span { color: var(--accent); }
    header p { color: var(--text-muted); font-size: 0.9rem; }

    /* Input */
    .input-section {
      display: flex;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }
    .input-section input {
      flex: 1;
      padding: 0.75rem 1rem;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      background: var(--surface);
      color: var(--text);
      font-size: 0.95rem;
      outline: none;
      transition: border-color 0.2s;
    }
    .input-section input:focus { border-color: var(--accent); }
    .input-section input::placeholder { color: var(--text-muted); }

    .btn-embed {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: var(--radius);
      background: var(--accent);
      color: #fff;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      transition: opacity 0.2s;
    }
    .btn-embed:hover { opacity: 0.85; }
    .btn-embed:disabled { opacity: 0.5; cursor: not-allowed; }

    /* Provider sections */
    .provider-group {
      margin-bottom: 1rem;
    }
    .provider-group h3 {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-muted);
      margin-bottom: 0.5rem;
    }
    .samples {
      display: flex;
      gap: 0.4rem;
      flex-wrap: wrap;
    }

    .sample-btn {
      padding: 0.4rem 0.85rem;
      border: 1px solid var(--border);
      border-radius: 999px;
      background: var(--surface);
      color: var(--text-muted);
      font-size: 0.75rem;
      cursor: pointer;
      transition: all 0.15s;
    }
    .sample-btn:hover { background: var(--surface-hover); color: var(--text); }

    .sample-btn[data-provider="youtube"]    { border-color: color-mix(in srgb, var(--c-youtube) 50%, transparent); color: var(--c-youtube); }
    .sample-btn[data-provider="twitter"]    { border-color: color-mix(in srgb, var(--c-twitter) 50%, transparent); color: var(--c-twitter); }
    .sample-btn[data-provider="tiktok"]     { border-color: color-mix(in srgb, var(--c-tiktok) 50%, transparent); color: var(--c-tiktok); }
    .sample-btn[data-provider="vimeo"]      { border-color: color-mix(in srgb, var(--c-vimeo) 50%, transparent); color: var(--c-vimeo); }
    .sample-btn[data-provider="niconico"]   { border-color: color-mix(in srgb, var(--c-niconico) 50%, transparent); color: var(--c-niconico); }
    .sample-btn[data-provider="spotify"]    { border-color: color-mix(in srgb, var(--c-spotify) 50%, transparent); color: var(--c-spotify); }
    .sample-btn[data-provider="soundcloud"] { border-color: color-mix(in srgb, var(--c-soundcloud) 50%, transparent); color: var(--c-soundcloud); }
    .sample-btn[data-provider="huggingface"]{ border-color: color-mix(in srgb, var(--c-huggingface) 50%, transparent); color: var(--c-huggingface); }
    .sample-btn[data-provider="gradio"]     { border-color: color-mix(in srgb, var(--c-gradio) 50%, transparent); color: var(--c-gradio); }
    .sample-btn[data-provider="slideshare"] { border-color: color-mix(in srgb, var(--c-slideshare) 50%, transparent); color: var(--c-slideshare); }
    .sample-btn[data-provider="speakerdeck"]{ border-color: color-mix(in srgb, var(--c-speakerdeck) 50%, transparent); color: var(--c-speakerdeck); }
    .sample-btn[data-provider="pinterest"]  { border-color: color-mix(in srgb, var(--c-pinterest) 50%, transparent); color: var(--c-pinterest); }
    .sample-btn[data-provider="reddit"]     { border-color: color-mix(in srgb, var(--c-reddit) 50%, transparent); color: var(--c-reddit); }
    .sample-btn[data-provider="mastodon"]   { border-color: color-mix(in srgb, var(--c-mastodon) 50%, transparent); color: var(--c-mastodon); }
    .sample-btn[data-provider="bluesky"]    { border-color: color-mix(in srgb, var(--c-bluesky) 50%, transparent); color: var(--c-bluesky); }
    .sample-btn[data-provider="flickr"]     { border-color: color-mix(in srgb, var(--c-flickr) 50%, transparent); color: var(--c-flickr); }
    .sample-btn[data-provider="threads"]   { border-color: color-mix(in srgb, var(--c-threads) 50%, transparent); color: var(--c-threads); }
    .sample-btn[data-provider="note"]      { border-color: color-mix(in srgb, var(--c-note) 50%, transparent); color: var(--c-note); }

    /* Divider */
    .divider {
      border: none;
      border-top: 1px solid var(--border);
      margin: 1.5rem 0;
    }

    /* Results */
    .results {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .embed-card {
      border: 1px solid var(--border);
      border-radius: var(--radius);
      background: var(--surface);
      overflow: hidden;
    }

    .embed-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.6rem 1rem;
      border-bottom: 1px solid var(--border);
      font-size: 0.75rem;
    }
    .embed-card-header .provider {
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .embed-card-header .meta-info {
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .embed-card-header .url {
      max-width: 400px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .embed-card-header .close-btn {
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      font-size: 1rem;
      line-height: 1;
      padding: 0 0.25rem;
    }
    .embed-card-header .close-btn:hover { color: var(--text); }

    .embed-card-body { padding: 1rem; }
    .embed-card-body iframe {
      width: 100%;
      border: none;
      border-radius: 8px;
    }

    /* Blockquote embeds (Twitter, Reddit, etc.) */
    .embed-card-body blockquote {
      margin: 0;
      padding: 1rem;
      border-left: 3px solid var(--accent);
      background: var(--bg);
      border-radius: 8px;
      color: var(--text);
      font-size: 0.9rem;
      line-height: 1.6;
    }
    .embed-card-body blockquote a { color: var(--accent); }

    /* Photo embeds (Flickr, etc.) */
    .embed-card-body img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
    }

    /* OGP fallback card */
    .embed-card-body .framer-framer-card {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      overflow: hidden;
    }
    .embed-card-body .framer-framer-card img {
      width: 120px;
      height: 90px;
      object-fit: cover;
      border-radius: 6px;
      flex-shrink: 0;
    }
    .embed-card-body .framer-framer-card .framer-framer-card-body {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      min-width: 0;
    }
    .embed-card-body .framer-framer-card a {
      color: var(--text);
      font-weight: 600;
      font-size: 0.9rem;
      text-decoration: none;
    }
    .embed-card-body .framer-framer-card a:hover { text-decoration: underline; }
    .embed-card-body .framer-framer-card p {
      color: var(--text-muted);
      font-size: 0.8rem;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .embed-card-body .framer-framer-card span {
      color: var(--text-muted);
      font-size: 0.75rem;
    }

    /* JSON toggle */
    .json-toggle {
      padding: 0.3rem 0.6rem;
      border: 1px solid var(--border);
      border-radius: 6px;
      background: transparent;
      color: var(--text-muted);
      font-size: 0.7rem;
      cursor: pointer;
    }
    .json-toggle:hover { color: var(--text); border-color: var(--text-muted); }

    .json-view {
      display: none;
      padding: 0.75rem 1rem;
      border-top: 1px solid var(--border);
      background: #0d0d0d;
      font-family: "SF Mono", "Fira Code", monospace;
      font-size: 0.75rem;
      color: var(--text-muted);
      overflow-x: auto;
      max-height: 300px;
    }
    .json-view.open { display: block; }

    /* Loading / Error */
    .loading {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3rem;
      color: var(--text-muted);
    }
    .spinner {
      width: 18px; height: 18px;
      border: 2px solid var(--border);
      border-top-color: var(--accent);
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
      margin-right: 0.75rem;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .error { padding: 1rem; color: #f87171; font-size: 0.85rem; }

    .empty-state {
      text-align: center;
      padding: 3rem 2rem;
      color: var(--text-muted);
      font-size: 0.9rem;
    }

    footer {
      text-align: center;
      margin-top: 3rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--border);
      color: var(--text-muted);
      font-size: 0.8rem;
    }
    footer a { color: var(--accent); text-decoration: none; }
    footer a:hover { text-decoration: underline; }

    @media (max-width: 640px) {
      .input-section { flex-direction: column; }
      body { padding: 1rem 0.75rem; }
      header h1 { font-size: 1.4rem; }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1><span>framer-framer</span> Embed Playground</h1>
      <p>URL を入力して各プラットフォームの埋め込みを動作確認</p>
    </header>

    <div class="input-section">
      <input type="url" id="urlInput" placeholder="URL を貼り付け (YouTube, Twitter, Spotify, ...)" />
      <button class="btn-embed" id="embedBtn">Embed</button>
    </div>

    <!-- Video -->
    <div class="provider-group">
      <h3>Video</h3>
      <div class="samples">
        <button class="sample-btn" data-provider="youtube"
          data-url="https://www.youtube.com/watch?v=dQw4w9WgXcQ">YouTube Video</button>
        <button class="sample-btn" data-provider="youtube"
          data-url="https://youtu.be/dQw4w9WgXcQ">YouTube (short URL)</button>
        <button class="sample-btn" data-provider="tiktok"
          data-url="https://www.tiktok.com/@scout2015/video/6718335390845095173">TikTok</button>
        <button class="sample-btn" data-provider="vimeo"
          data-url="https://vimeo.com/347119375">Vimeo</button>
        <button class="sample-btn" data-provider="niconico"
          data-url="https://www.nicovideo.jp/watch/sm9">niconico</button>
      </div>
    </div>

    <!-- Social -->
    <div class="provider-group">
      <h3>Social</h3>
      <div class="samples">
        <button class="sample-btn" data-provider="twitter"
          data-url="https://twitter.com/jack/status/20">X/Twitter</button>
        <button class="sample-btn" data-provider="bluesky"
          data-url="https://bsky.app/profile/bsky.app/post/3jt64wogqmc2y">Bluesky</button>
        <button class="sample-btn" data-provider="mastodon"
          data-url="https://mastodon.social/@Mastodon/109399976804498654">Mastodon</button>
        <button class="sample-btn" data-provider="threads"
          data-url="https://www.threads.net/@zuck/post/CuVGPmPSeZh" title="Requires Meta access token">Threads *</button>
        <button class="sample-btn" data-provider="reddit"
          data-url="https://www.reddit.com/r/aww/comments/1k2jq8o/my_cat_likes_to_sit_like_this/">Reddit</button>
        <button class="sample-btn" data-provider="pinterest"
          data-url="https://www.pinterest.com/pin/709246641349109266/">Pinterest</button>
      </div>
    </div>

    <!-- Music -->
    <div class="provider-group">
      <h3>Music</h3>
      <div class="samples">
        <button class="sample-btn" data-provider="spotify"
          data-url="https://open.spotify.com/track/4PTG3Z6ehGkBFwjybzWkR8">Spotify Track</button>
        <button class="sample-btn" data-provider="spotify"
          data-url="https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M">Spotify Playlist</button>
        <button class="sample-btn" data-provider="spotify"
          data-url="https://open.spotify.com/album/1DFixLWuPkv3KT3TnV35m3">Spotify Album</button>
        <button class="sample-btn" data-provider="soundcloud"
          data-url="https://soundcloud.com/foraboreal/sets/departure-to-everyday-life">SoundCloud</button>
      </div>
    </div>

    <!-- Photo -->
    <div class="provider-group">
      <h3>Photo</h3>
      <div class="samples">
        <button class="sample-btn" data-provider="flickr"
          data-url="https://www.flickr.com/photos/bfranka/51853916612/">Flickr</button>
      </div>
    </div>

    <!-- Presentation -->
    <div class="provider-group">
      <h3>Presentation</h3>
      <div class="samples">
        <button class="sample-btn" data-provider="slideshare"
          data-url="https://www.slideshare.net/dollykaushal3/upcoming-trends-in-digital-marketing-in-2024pptx">SlideShare</button>
        <button class="sample-btn" data-provider="speakerdeck"
          data-url="https://speakerdeck.com/github/how-github-uses-github-to-build-github">Speaker Deck</button>
      </div>
    </div>

    <!-- AI / ML -->
    <div class="provider-group">
      <h3>AI / ML</h3>
      <div class="samples">
        <button class="sample-btn" data-provider="huggingface"
          data-url="https://huggingface.co/spaces/black-forest-labs/FLUX.1-schnell">HF FLUX.1-schnell</button>
        <button class="sample-btn" data-provider="gradio"
          data-url="https://black-forest-labs-flux-1-schnell.hf.space">Gradio (HF Space)</button>
      </div>
    </div>

    <!-- Blog -->
    <div class="provider-group">
      <h3>Blog</h3>
      <div class="samples">
        <button class="sample-btn" data-provider="note"
          data-url="https://note.com/and_and/n/n8a275c9e5da0">note</button>
      </div>
    </div>

    <hr class="divider" />

    <div id="results" class="results">
      <div class="empty-state">
        URL を入力するか、上のサンプルボタンをクリックしてください
      </div>
    </div>

    <footer>
      Powered by <a href="https://github.com/piroz/framer-framer" target="_blank" rel="noopener">framer-framer</a> v3.3.1
    </footer>
  </div>

  <script>
    const urlInput = document.getElementById('urlInput');
    const resultsEl = document.getElementById('results');
    const embedBtn = document.getElementById('embedBtn');

    document.querySelectorAll('.sample-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        urlInput.value = btn.dataset.url;
        embedUrl();
      });
    });

    urlInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') embedUrl();
    });
    embedBtn.addEventListener('click', () => embedUrl());

    async function embedUrl() {
      const url = urlInput.value.trim();
      if (!url) return;

      const emptyState = resultsEl.querySelector('.empty-state');
      if (emptyState) emptyState.remove();

      const card = document.createElement('div');
      card.className = 'embed-card';
      card.innerHTML =
        '<div class="embed-card-header">' +
          '<span class="provider">Loading...</span>' +
          '<div class="meta-info">' +
            '<span class="url">' + esc(url) + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="embed-card-body">' +
          '<div class="loading"><div class="spinner"></div>Resolving embed...</div>' +
        '</div>';
      resultsEl.prepend(card);

      embedBtn.disabled = true;

      try {
        const res = await fetch('/api/embed?url=' + encodeURIComponent(url) + '&sanitize=false');
        const data = await res.json();

        if (!res.ok) throw new Error(data.detail || data.title || 'Failed to resolve embed');

        const providerName = data.provider || 'unknown';
        const providerEl = card.querySelector('.provider');
        providerEl.textContent = providerName.toUpperCase();
        providerEl.style.color = getProviderColor(providerName);

        // Add close button and JSON toggle
        const metaInfo = card.querySelector('.meta-info');
        const jsonBtn = document.createElement('button');
        jsonBtn.className = 'json-toggle';
        jsonBtn.textContent = 'JSON';
        metaInfo.appendChild(jsonBtn);

        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-btn';
        closeBtn.textContent = '\\u00d7';
        closeBtn.onclick = () => card.remove();
        metaInfo.appendChild(closeBtn);

        // Render embed HTML (fallback to thumbnail for photo embeds)
        const body = card.querySelector('.embed-card-body');
        if (data.html) {
          body.innerHTML = data.html;
        } else if (data.type === 'photo' && (data.thumbnail_url || data.url)) {
          const imgUrl = data.thumbnail_url || data.url;
          body.innerHTML = '<a href="' + esc(data.url) + '" target="_blank" rel="noopener">' +
            '<img src="' + esc(imgUrl) + '" alt="' + esc(data.title || '') + '" />' +
            '</a>';
        } else {
          body.innerHTML = '<div class="error">No embed HTML returned</div>';
        }

        // Make iframes responsive
        const iframe = body.querySelector('iframe');
        if (iframe) {
          iframe.style.width = '100%';
          iframe.style.minHeight = (data.height || 400) + 'px';
          iframe.style.borderRadius = '8px';
          iframe.style.border = 'none';
        }

        // Re-execute scripts (required for blockquote-based embeds like Twitter, Reddit, Pinterest)
        const scripts = body.querySelectorAll('script');
        scripts.forEach(oldScript => {
          const newScript = document.createElement('script');
          for (const attr of oldScript.attributes) {
            newScript.setAttribute(attr.name, attr.value);
          }
          if (oldScript.textContent) newScript.textContent = oldScript.textContent;
          oldScript.replaceWith(newScript);
        });

        // JSON view
        const jsonView = document.createElement('pre');
        jsonView.className = 'json-view';
        jsonView.textContent = JSON.stringify(data, null, 2);
        card.appendChild(jsonView);

        jsonBtn.onclick = () => jsonView.classList.toggle('open');

      } catch (err) {
        const providerEl = card.querySelector('.provider');
        providerEl.textContent = 'ERROR';
        providerEl.style.color = '#f87171';

        const metaInfo = card.querySelector('.meta-info');
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-btn';
        closeBtn.textContent = '\\u00d7';
        closeBtn.onclick = () => card.remove();
        metaInfo.appendChild(closeBtn);

        card.querySelector('.embed-card-body').innerHTML =
          '<div class="error">' + esc(err.message) + '</div>';
      } finally {
        embedBtn.disabled = false;
      }
    }

    function esc(s) {
      const d = document.createElement('div');
      d.textContent = s;
      return d.innerHTML;
    }

    function getProviderColor(name) {
      const colors = {
        youtube: '#ff0000', twitter: '#1d9bf0', tiktok: '#010101',
        vimeo: '#1ab7ea', niconico: '#252525', spotify: '#1db954',
        soundcloud: '#ff5500', huggingface: '#ff9d00', gradio: '#f97316',
        slideshare: '#0077b5', speakerdeck: '#009287', pinterest: '#bd081c',
        reddit: '#ff4500', mastodon: '#6364ff', bluesky: '#0085ff',
        flickr: '#f40083', threads: '#ffffff', note: '#41c9b4'
      };
      return colors[name] || '#6366f1';
    }
  </script>
</body>
</html>`;
