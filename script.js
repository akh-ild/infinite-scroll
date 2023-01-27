const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photos = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
const count = 5;
const apiKey = 'ih66f7SrNeP32ge9WJeYAP3MDHbf6oRgrz2BVsUUJ98';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photos = await response.json();
    displayPhotos();
  } catch(e) {
    console.log(e);
  }
}

// Helper function to set attributes on DOM
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for links and photos, add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photos.length;
  // Run function for each object in photos
  photos.forEach((photo) => {
    // Create <a> to link Unsplash
    const item = document.createElement('a');
    setAttributes(item, {href: photo.links.html, target: '_blank'});
    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {src: photo.urls.regular, alt: photo.alt_description, title: photo.alt_description});
    // Event listener, check each is finished loading
    img.addEventListener('load', imageLoaded);
    // Put image inside <a>, then put both inside image-container element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
})

// On load
getPhotos(); 