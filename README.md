# BigQuery Release Notes App

A lightweight Flask web app that fetches the BigQuery release notes RSS feed, displays them with a refresh button and lets you tweet any update.

## Features
- Fetches latest notes from the official Google Cloud BigQuery release notes XML feed.
- Simple UI built with vanilla HTML, CSS (dark‑gradient glass‑morphism) and JavaScript.
- Refresh button with a spinner.
- **Tweet** button for each entry – opens Twitter’s intent‑to‑tweet page pre‑filled with the note title and link.

## Quick start
```bash
# Clone (if you haven't already)
git clone https://github.com/ttweekopi-hub/ttweekopi-event-talks-app.git
cd ttweekopi-event-talks-app

# Install dependencies
pip install -r requirements.txt

# Run the app
python app.py
```
Open your browser at http://localhost:5000.

## Project structure
```
bigquery_release_notes_app/
├─ app.py                # Flask entry point
├─ requirements.txt      # Python dependencies
├─ templates/
│   └─ index.html       # Main page markup
├─ static/
│   ├─ style.css        # Premium dark UI styling
│   └─ script.js        # Fetch notes, render UI, tweet
└─ .gitignore            # Ignores Python caches, env files, etc.
```

## License
MIT – feel free to fork, modify, and deploy!
