const imageContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API
const count = '10';
const accesskey = "01gtue33kGsLSLeTHI8TmQNim0l6vkQXrpZAYTfRwEM";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${accesskey}&count=${count}`;


// Create Elemnets for Links and Photos
function displayPhotos() {
    photosArray.forEach(photo =>{
        // Create anchor element ti link Unsplash
        const item = document.createElement('a');
        item.setAttribute('href' , photo.links.html);
        item.setAttribute('target' , '_blank');

        // Create <img> for Photo
        const img = document.createElement('img');
        img.setAttribute('src' , photo.urls.regular);
        img.setAttribute('alt' , photo.alt_description);
        img.setAttribute('title' , photo.alt_description);

        // Put <img> inside <a> , the put inside in the img Container
        item.appendChild('img');
        imageContainer.appendChild('item');
    });
}


// Get photos from unspalsh
async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error){
        // Catach Error Here
    }
}


// On Load
getPhotos();