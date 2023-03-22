import { galleryItems } from './gallery-items.js';
// console.log(galleryItems);

// Change code below this line

// Створюємо галарею
const galleryList = document.querySelector('.gallery');

function createGallery(images) {
  const makeLiItem = images
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
          </a>
        </li>`,
    )
    .join('');

  galleryList.insertAdjacentHTML('afterbegin', makeLiItem);
}

createGallery(galleryItems);

// Вішаємо слухача подій на клік для відкриття модалки
galleryList.addEventListener('click', openModalWindow);

// Функція відкриття модалки
function openModalWindow(event) {
  event.preventDefault();
  const clickedImage = event.target.classList.contains('gallery__image');

  if (!clickedImage) {
    return;
  }

  if (event.target) {
    createModalImg();
  }
}

// Відображаємо клікнуте фото в модалці та вішаємо слухач подій на клавіши
function createModalImg() {
  const instance = basicLightbox.create(`
  <img width="1400" height="900" src="${event.target.dataset.source}">
  `);
  instance.show();

  document.addEventListener('keydown', closeModalWindow);
}

// Функція закриття модалки та видалення слухача подій
function closeModalWindow(event) {
  const escKey = 'Escape';
  if (event.code === escKey) {
    deleteModalImg();

    document.removeEventListener('keydown', closeModalWindow);
  }
}

// Видаляємо створене в модалці фото
function deleteModalImg() {
  const instance = document.querySelector('.basicLightbox--visible');
  instance.remove();
}
