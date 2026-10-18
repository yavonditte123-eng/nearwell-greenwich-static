const input = document.querySelector('#portrait-input');
const preview = document.querySelector('#portrait-preview');
const placeholder = document.querySelector('#portrait-placeholder');
const remove = document.querySelector('#remove-photo');
const status = document.querySelector('#photo-status');
let photoUrl;
function resetPhoto() {
  if (photoUrl) URL.revokeObjectURL(photoUrl);
  photoUrl = undefined;
  preview.removeAttribute('src');
  preview.hidden = true;
  placeholder.hidden = false;
  remove.hidden = true;
  input.value = '';
}
input.addEventListener('change', () => {
  const file = input.files[0];
  if (!file) return;
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 10 * 1024 * 1024) {
    status.textContent = 'Please choose a JPG, PNG, or WebP image under 10 MB.';
    input.value = '';
    return;
  }
  if (photoUrl) URL.revokeObjectURL(photoUrl);
  photoUrl = URL.createObjectURL(file);
  preview.onload = () => {
    preview.hidden = false; placeholder.hidden = true; remove.hidden = false;
    status.textContent = 'Photo preview only. To add it permanently, share the image with me or save it in the project folder.';
  };
  preview.onerror = () => { resetPhoto(); status.textContent = 'This image could not be opened. Please try a different file.'; };
  preview.src = photoUrl;
});
remove.addEventListener('click', () => {resetPhoto(); status.textContent = 'Local preview only. Your photo isn’t uploaded or saved to the website.'; input.focus();});
