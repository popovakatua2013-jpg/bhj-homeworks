const textarea = document.querySelector('#editor');
const STORAGE_KEY = 'text-editor';

textarea.value = localStorage.getItem(STORAGE_KEY) || '';

textarea.addEventListener('input', () => {
  localStorage.setItem(STORAGE_KEY, textarea.value);
});