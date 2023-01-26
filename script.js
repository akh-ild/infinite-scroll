const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photos = [];

// Unsplash API
const count = 10;
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
  // Run function for each object in photos
  photos.forEach((photo) => {
    // Create <a> to link Unsplash
    const item = document.createElement('a');
    setAttributes(item, {href: photo.links.html, target: '_blank'});
    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {src: photo.urls.regular, alt: photo.alt_description, title: photo.alt_description});
    // Put image inside <a>, then put both inside image-container element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// On load
getPhotos(); 