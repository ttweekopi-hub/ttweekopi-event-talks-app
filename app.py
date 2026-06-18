from flask import Flask, render_template, jsonify
import requests
import xml.etree.ElementTree as ET

app = Flask(__name__)

FEED_URL = 'https://docs.cloud.google.com/feeds/bigquery-release-notes.xml'

def fetch_notes():
    try:
        resp = requests.get(FEED_URL)
        resp.raise_for_status()
        root = ET.fromstring(resp.content)
        # The feed uses the Atom namespace
        ns = {'atom': 'http://www.w3.org/2005/Atom'}
        entries = []
        for entry in root.findall('atom:entry', ns):
            title = entry.find('atom:title', ns).text
            link = entry.find('atom:link', ns).attrib.get('href')
            updated = entry.find('atom:updated', ns).text
            content_elem = entry.find('atom:content', ns)
            content = content_elem.text if content_elem is not None else ''
            entries.append({
                'title': title,
                'link': link,
                'updated': updated,
                'content': content,
            })
        return entries
    except Exception as e:
        return []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/notes')
def api_notes():
    notes = fetch_notes()
    return jsonify(notes)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
