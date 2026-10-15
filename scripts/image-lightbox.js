let lightboxDialog;
let lightboxImage;
let lightboxStatus;
let lightboxOriginalLink;
let lightboxLastTrigger = null;
let lightboxPressedBackdrop = false;
let lightboxStateClass = 'image-lightbox--loading';

function initImageLightbox() {
  const mainContent = document.querySelector('main');
  if (!mainContent) return;

  lightboxDialog = document.querySelector('dialog.image-lightbox');
  if (typeof lightboxDialog?.showModal !== 'function') return;

  lightboxImage = lightboxDialog.querySelector('.image-lightbox__img');
  lightboxStatus = lightboxDialog.querySelector('.image-lightbox__status');
  lightboxOriginalLink = lightboxDialog.querySelector('.image-lightbox__original');

  mainContent.addEventListener('click', mainContentClickHandler);
  lightboxImage.addEventListener('load', lightboxImageLoadHandler);
  lightboxImage.addEventListener('error', lightboxImageErrorHandler);
  lightboxDialog.addEventListener('mousedown', lightboxDialogMousedownHandler);
  lightboxDialog.addEventListener('click', lightboxDialogClickHandler);
  lightboxDialog.addEventListener('close', lightboxDialogCloseHandler);
  lightboxDialog.querySelector('.image-lightbox__close')
      .addEventListener('click', lightboxCloseButtonClickHandler);
}

function mainContentClickHandler(event) {
  const link = event.target.closest('a.lightbox-link');
  if (!link) return;

  if (isModifiedClick(event)) return;

  event.preventDefault();
  openLightbox(link);
}

function isModifiedClick(event) {
  return event.defaultPrevented || event.button !== 0 || event.metaKey
      || event.ctrlKey || event.shiftKey || event.altKey;
}

function openLightbox(link) {
  const sourceImage = link.querySelector('img');

  lightboxLastTrigger = link;
  lightboxOriginalLink.href = link.href;
  lightboxStatus.textContent = 'Loading image…';
  setLightboxState('image-lightbox--loading');
  lightboxImage.alt = sourceImage ? sourceImage.alt : '';
  lightboxImage.src = link.href;

  if (!lightboxDialog.open) lightboxDialog.showModal();

  // A cached image whose src is unchanged may not fire load again, so paint it
  // directly when it is already complete.
  if (lightboxImage.complete && lightboxImage.naturalWidth > 0) {
    lightboxImageLoadHandler();
  }
}

function setLightboxState(stateClass) {
  lightboxDialog.classList.replace(lightboxStateClass, stateClass);
  lightboxStateClass = stateClass;
}

function lightboxImageLoadHandler() {
  lightboxStatus.textContent = '';
  setLightboxState('image-lightbox--ready');
}

function lightboxImageErrorHandler() {
  lightboxStatus.textContent = 'This image could not be loaded.';
  setLightboxState('image-lightbox--error');
}

function lightboxCloseButtonClickHandler() {
  lightboxDialog.close();
}

function lightboxDialogMousedownHandler(event) {
  // Remember whether the press began on the backdrop, so a drag that starts on
  // the image and ends outside is not treated as an outside click.
  lightboxPressedBackdrop = event.target === lightboxDialog;
}

function lightboxDialogClickHandler(event) {
  // showModal() has no light-dismiss. A press and release both on the dialog
  // element itself is a backdrop click, so close on it.
  if (lightboxPressedBackdrop && event.target === lightboxDialog) {
    lightboxDialog.close();
  }

  lightboxPressedBackdrop = false;
}

function lightboxDialogCloseHandler() {
  // Browsers differ on whether a clicked link ever held focus, so the native
  // focus return can land on the body. Restore it to the trigger directly.
  if (lightboxLastTrigger && document.contains(lightboxLastTrigger)) {
    lightboxLastTrigger.focus();
  }
}

initImageLightbox();
