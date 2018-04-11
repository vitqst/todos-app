const LOCAL_KEY = "todos-localkey";

export function getNotes() {
  let notes = localStorage.getItem(LOCAL_KEY);
  notes = notes !== null ? JSON.parse(notes) : [];
  return notes;
}

export function setNotes(notes) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(notes));
  return;
}

export function getNextId() {
  if (getNotes().length > 0) {
    let notes = getNotes();
    let lastNotes = notes[notes.length - 1];
    return lastNotes.id + 1;
  }

  return 1;
}

export function sortNotes(todos) {
  return todos.sort(function(a, b) {
    if (Number(a.status) > Number(b.status)) {
      return 1;
    }

    if (Number(a.status) === Number(b.status) && a.timestamp < b.timestamp) {
      return 1;
    }

    return -1;
  });
}
