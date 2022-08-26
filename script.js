const imageContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
const accesskey = "01gtue33kGsLSLeTHI8TmQNim0l6vkQXrpZAYTfRwEM";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${accesskey}&count=${count}`;


function imageLoaded() {
    console.log('images loaded');
    imagesLoaded++ ;
    if (imagesLoaded === totalImages){
        count = 20;
        ready = true;
        loader.hidden = true;
    }

}
// Helper Function to Set Attributes on DOM Eelments
function setAttributes(element , attributes){
    for (const key in attributes){
        element.setAttribute(key , attributes[key]);
    }
}
// Create Elemnets for Links and Photos
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach(photo =>{
       console.log('total images:' ,totalImages);
        // Create anchor element ti link Unsplash
        const item = document.createElement('a');
        setAttributes(item , {href: photo.links.html , target: '_blank'});

        // Create <img> for Photo
        const img = document.createElement('img');
        setAttributes(img , {
            src: photo.urls.regular ,
            alt: photo.alt_description,
            title: photo.alt_description 
        })
    
        // Event Listener , check when each is finished loading
        img.addEventListener('load' , imageLoaded);
        // Put <img> inside <a> , the put <a> inside in the img Container
        item.appendChild(img);
        imageContainer.appendChild(item);
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


//  Check to see if scrolling near the bottom of page ,Load more photos
window.addEventListener('scroll' , ()=>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
})

// On Load
getPhotos();