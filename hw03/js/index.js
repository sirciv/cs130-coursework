/**
 * 
 * -------------------------------------
 * DOM Manipulation / Traversal Activity
 * -------------------------------------
 * 
 * 1. Create and attach an event handler (function) to each ".image" 
 * element so that when the ".image" element is clicked, the corresponding 
 * image loads in the .featured image element.
 * 
 * 2. Create event handlers for the next and previous buttons. The next button should
 *    show the next image in the thumbnail list. The previous should show the previous.
 * 
 * 3. If you get to the end, start at the beginning. 
 * 
 * 4. If you get to the beginning, loop around to the end.
 * 
 * 
 */

const images = [
    'images/field1.jpg',
    'images/purple.jpg',
    'images/jar.jpg',
    'images/green.jpg',
    'images/green1.jpg',
    'images/purple1.jpg',
    'images/magnolias.jpg',
    'images/daisy1.jpg'
];

//generates card

const initScreen = () => {
    images.forEach((image, idx) => {
        document.querySelector('.cards').innerHTML += `
            <li class="card">
                <div class="image" 
                    style="background-image:url('${image}')"
                    data-index="${idx}"></div>
            </li>`;
    });
};

initScreen();

//creating global variable to show what is currently featured

let currentIndex = 0;
const featuredImageSelector = document.querySelector(".featured_image");

//in case of overflow or underflow. Automatically adjusts if you add/subtract images! Maybe. Untested.

const indexCorrector = () => {
    let indexLength = images.length-1;
    if (currentIndex > indexLength) {
        currentIndex = 0;
    }
    if (currentIndex < 0) {
        currentIndex = indexLength;
    }
}

//features cards when they are clicked

const showImage = (ev) => {
    const elem = ev.currentTarget;
    currentIndex = parseInt(elem.dataset.index);
    const img = images[currentIndex];
    featuredImageSelector.style.backgroundImage = `url('${img}')`;
};

document.querySelectorAll('.image').forEach(elem => {
    elem.onclick = showImage;
});

//left and right arrows

const leftArrow = (ev) => {
    currentIndex--;
    indexCorrector();
    const img = images[currentIndex];
    featuredImageSelector.style.backgroundImage = `url('${img}')`;
}

document.querySelector('.prev').onclick = leftArrow;

const rightArrow = (ev) => {
    currentIndex++;
    indexCorrector();
    const img = images[currentIndex];
    featuredImageSelector.style.backgroundImage = `url('${img}')`;
}

document.querySelector('.next').onclick = rightArrow;