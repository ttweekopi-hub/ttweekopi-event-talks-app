document.addEventListener('DOMContentLoaded', () => {
  const refreshBtn = document.getElementById('refreshBtn');
  const spinner = refreshBtn.querySelector('.spinner');
  const notesList = document.getElementById('notesList');

  const fetchNotes = async () => {
    spinner.classList.remove('hidden');
    try {
      const res = await fetch('/api/notes');
      const notes = await res.json();
      renderNotes(notes);
    } catch (e) {
      console.error('Failed to fetch notes', e);
    } finally {
      spinner.classList.add('hidden');
    }
  };

  const renderNotes = (notes) => {
    notesList.innerHTML = '';
    notes.forEach((note, idx) => {
      const li = document.createElement('li');
      li.className = 'note-card';
      li.innerHTML = `
        <div class="note-title">${note.title}</div>
        <div class="note-updated">${new Date(note.updated).toLocaleString()}</div>
        <div class="note-content" id="content-${idx}">${note.content}</div>
        <button class="tweet-btn" data-title="${encodeURIComponent(note.title)}" data-link="${encodeURIComponent(note.link)}">Tweet</button>
      `;
      // Add tweet handler
      li.querySelector('.tweet-btn').addEventListener('click', () => {
        const text = `${note.title}\n${note.link}`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
      });
      notesList.appendChild(li);
    });
  };

  refreshBtn.addEventListener('click', fetchNotes);
  // Auto-fetch on load
  fetchNotes();
});
