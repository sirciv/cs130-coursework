// 1. SCROLLING LOGO

var gearlogo = document.getElementById("gearlogo");

;(function() {
    var throttle = function(type, name, obj) {
        var obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
            requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };
    throttle ("scroll", "optimizedScroll");
})();
    
window.addEventListener("optimizedScroll", function() { 
    let speedAdjust = window.pageYOffset / 8;
    gearlogo.style.transform = "rotate("+speedAdjust+"deg)";
});

// 2. CONTENT SELECTION FUNCTIONS

const loadChapter = (contentNumber) => {
    let contentURL = `content/c${contentNumber}.html/`;
    console.log('loading content: '+contentURL);
    getChapter(contentURL);
};

const getChapter = (url) => {
    console.log('fetching chapter');
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.querySelector('.content').innerHTML = html;
        })
};

//3. SCROLL TO TOP

  var toTop = document.getElementById("goto-topJS");
    
    toTop.addEventListener("click", function(){
    scrollToTop(500);
  });
  function scrollToTop(scrollDuration) {
      var scrollStep = -window.scrollY / (scrollDuration / 15),
          scrollInterval = setInterval(function(){
          if ( window.scrollY != 0 ) {
              window.scrollBy( 0, scrollStep );
          }
          else clearInterval(scrollInterval); 
      },15);
  }

// 4. csi.js -- CUT

// 4. MAPPING SIDEBAR TO CONTENT
//TODO: This should generate automatically

// document.querySelector('#c1').onmouseover = loadChapter(1);
// document.querySelector('#c2').onclick = loadChapter(2);
// document.querySelector('#c3').onclick = loadChapter(3);

