const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

const getTracks = (term) => {
    const elem = document.querySelector('#tracks');
    elem.innerHTML = "";
    fetch(baseURL + '?type=track&q=' + term)
    .then(response => response.json())
    .then((data) => {
        if (data.length > 0) {
            for (var i = 0; i < 5; i++) {
                if (data[i]) {
                    elem.innerHTML += getTracksHTML(data[i], i);
                }
            }
        }
        else {
            elem.innerHTML = 'No matching track found';
        }
    });
};

const getTracksHTML = (data, i) => {
    return `<section class="track-item preview" id=${i} data-preview-track="${data.preview_url}" onclick="playTrack(event);">
        <img src="${data.album.image_url}">
            <i class="fas play-track fa-play" aria-hidden="true"></i>
                <div class="label">
                    <h3>${data.name}</h3>
                    <p>
                        ${data.artist.name}
                    </p>
                </div>
    </section>`;
};


const getAlbums = (term) => {
    const elem = document.querySelector('#albums');
    elem.innerHTML = "";
    fetch(baseURL + '?type=album&q=' + term)
    .then(response => response.json())
    .then((data) => {
        if (data.length > 0) {
            for (var i = 0; i < 10; i++) {
                if (data[i]) {
                    elem.innerHTML += getAlbumsHTML(data[i]);
                }
            }
        }
        else {
            elem.innerHTML = 'No matching album found';
        }
    });
};

const getAlbumsHTML = (data) => {
    
    return `<section class="album-card" id="${data.id}">
    <div>
        <img src="${data.image_url}">
        <h3>${data.name}</h3>
        <div class="footer">
            <a href="${data.spotify_url}" target="_blank">
                view on spotify
            </a>
        </div>
    </div>
</section>`;
};

const getArtist = (term) => {
    const elem = document.querySelector('#artist');
    elem.innerHTML = "";
    fetch(baseURL + '?type=artist&q=' + term)
    .then(response => response.json())
    .then((data) => {
        if (data.length > 0) { //if it's not empty
            const selectedArtist = data[0];
            elem.innerHTML += getArtistHTML(selectedArtist);
        }
        else {
            elem.innerHTML = 'No matching artist found'
        }
    });
};

const getArtistHTML = (data) => {
    if (!data.image_url) {
        data.image_url = 'https://thehappypuppysite.com/wp-content/uploads/2016/09/The-Maltese-HP-long.jpg';
    }
    return `<section class="artist-card" id="${data.id}">
        <div>
            <img src="${data.image_url}">
            <h3>${data.name}</h3>
            <div class="footer">
                <a href="${data.spotify_url}" target="_blank">
                    view on spotify
                </a>
            </div>
        </div>
    </section>`;
};


document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};

const playTrack = (ev) => {
    const elem = ev.currentTarget;
    const previewURL = elem.dataset.previewTrack;
    if (previewURL) {
        audioPlayer.setAudioFile(previewURL);
        audioPlayer.play();
    }
    else {
        console.log('Error: No preview available for this track.')
    }
    document.querySelector('footer .track-item').innerHTML = elem.innerHTML;
    // My error in the code:
    // const previewURL = previewURL.dataset.preview-track
}

// This is an alternative way instead of using the embedded onclick in the HTML
// document.querySelector('#track-section').onclick = trackPlayer;