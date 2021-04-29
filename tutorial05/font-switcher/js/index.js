const makeBigger = () => {
   alert('make bigger!');
   document.querySelector('.content').style.fontSize = "3em";
};

/* Using .content because we want to modify the style of the text in the content block. */

const makeSmaller = () => {
   alert('make smaller!');
   document.querySelector('.content').style.fontSize = "1em";
};

document.querySelector('.a1').onclick = makeBigger;
document.querySelector('.a2').onclick = makeSmaller;
