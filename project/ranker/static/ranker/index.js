// Album names
const names = ['Debut', 'Fearless', 'Speak Now', 'Red', '1989', 'Reputation', 'Lover', 'Folklore', 'Evermore', 'Midnights'];

const border = ['darkcyan', 'goldenrod', 'indigo', 'darkred', 'lightskyblue', 'gray', 'plum', 'darkgray', 'peru', 'darkblue'];

const background = ['lightseagreen', 'gold', 'rebeccapurple', 'firebrick', 'lightblue', 'dimgray', 'pink', 'lightgray', 'orange', 'royalblue']

// Start the application

function start() {
    album_selector();
    main();
    buttons();
}

// Homepage

function load_top_three(album_ranking) {
    document.querySelector('#top-3').innerHTML = '';
    for (i=0;i<3;i++) {
        // Add an album
        album_element = document.createElement('div');
        const album_index = album_ranking[i].id - 1;

        // Add the title and change the colors based on the album
        album_element.innerHTML = `<h2>${i + 1}. ${names[album_index]}</h2>`;
        album_element.style.border = `8px solid ${border[album_index]}`;
        album_element.style.background = background[album_index]

        // Add the album cover, the class, and add it to the top three div
        album_element.innerHTML += `<img class='top-3-cover' src='${STATIC_URL}images/album_covers/${album_ranking[i].id}.jpeg' alt='album cover'>`;
        album_element.classList.add('top-3-album');
        document.querySelector('#top-3').append(album_element);
    }
}

function load_album_ranking_type(ranking, element) {
    element.innerHTML = '';
    const score_margins = ['63.5', '58.5', '51.5', '68.5', '67', '53', '64', '60', '55.5', '51'];
    for (i=0;i<10;i++) {
        const album_element = document.createElement('div');
        album_element.classList.add('album-ranking');
        album_index = ranking[i].id - 1;

        album_element.innerHTML = `<h3 style="margin: 5px ${score_margins[album_index]}% 5px 10px;">#${i + 1}. ${names[album_index]}</h3>`;
        album_element.style.background = background[album_index];
        album_element.style.border = `4px solid ${border[album_index]}`;

        album_element.innerHTML += `<h4 margin: 0;">${ranking[i].score}</h4>`;
        element.append(album_element);
    }
}

function load_album_rankings(album_ranking) {
    // The overall ranking
    const overall_element = document.querySelector('#album-rank-overall');
    let overall_ranking = [];

    album_ranking.forEach(album => {
        overall_ranking.push({"id": album.id, "score": (album.avg_score * album.fav_skip * 0.01).toFixed(2)});
    })

    load_album_ranking_type(overall_ranking ,overall_element);

    // The score ranking
    const score_element = document.querySelector('#album-rank-score');
    let score_ranking = [];

    album_ranking.forEach(album => {
        score_ranking.push({"id": album.id, "score": album.avg_score.toFixed(2)});
    })

    score_ranking.sort((a, b) => {return b.score - a.score});

    load_album_ranking_type(score_ranking, score_element);

    // The fav_skip ranking
    const fav_skip_element = document.querySelector('#album-rank-fav-skip');
    let fav_skip_ranking = [];

    album_ranking.forEach(album => {
        fav_skip_ranking.push({"id": album.id, "score": (album.fav_skip * 0.1).toFixed(2)});
    })

    fav_skip_ranking.sort((a, b) => {return b.score - a.score});

    load_album_ranking_type(fav_skip_ranking, fav_skip_element);
}

function load_homepage(album_ranking) {
    // Display the homepage, and hide the other pages
    document.querySelector('#home-view').style.display = 'block';
    document.querySelector('#rating-view').style.display = 'none';

    // Show the top three albums
    load_top_three(album_ranking);

    // Load the all album ranking
    load_album_rankings(album_ranking);

    if (window.innerWidth < 1000) {
        mobile_adjust();
    }
}

// Rating Page

function select_album(album_id) {
    fetch(`/songs/${album_id}`)
    .then(response => response.json())
    .then(data => {
        // Get songs
        const songs = data.songs;

        // Put element in a variable and clear it
        const element = document.querySelector('#rating-rater-body');
        element.innerHTML = '';

        songs.forEach(song => {
            // Create the song
            const song_element = document.createElement('tr');

            // Display the track number and song name
            const info_data_element = document.createElement('td');
            info_data_element.innerHTML = `<h5 class="rating-info">${song.track_number}: ${song.name}</h5>`;
            song_element.append(info_data_element);

            // Add Score Input
            const score_data_element = document.createElement('td')
            const score_element = document.createElement('input');
            score_element.classList.add('rating-score');
            score_element.setAttribute('placeholder', song.score);
            score_element.setAttribute('type', 'number');

            // Upload changes to server
            score_element.oninput = () => {
                fetch(`/songs/${album_id}/${song.track_number}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        'score': score_element.value,
                    })
                })
            }

            // Add element to parent element
            score_data_element.append(score_element);
            song_element.append(score_data_element);

            // Add Favorite Input
            const favorite_data_element = document.createElement('td');
            const favorite_element = document.createElement('input');
            favorite_element.classList.add('rating-favorite');
            favorite_element.checked = song.favorite;
            favorite_element.type = 'checkbox';

            // Upload changes to the server
            favorite_element.oninput = () => {
                fetch(`/songs/${album_id}/${song.track_number}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        'favorite': favorite_element.checked,
                    })
                })
            }

            // Add element to the parent element
            favorite_data_element.append(favorite_element);
            song_element.append(favorite_data_element);

            // Add Skip Input
            const skip_data_element = document.createElement('td');
            const skip_element = document.createElement('input');
            skip_element.classList.add('rating-skip');
            skip_element.checked = song.skip;
            skip_element.type = 'checkbox';

            // Upload changes to server
            skip_element.oninput = () => {
                fetch(`/songs/${album_id}/${song.track_number}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        'skip': skip_element.checked,
                    })
                })
            }

            // Add element to parent element
            skip_data_element.append(skip_element);
            song_element.append(skip_data_element);
            
            // Add CSS
            song_element.style.background = background[album_id - 1];
            info_data_element.style.border = `5px solid ${border[album_id - 1]}`;
            score_data_element.style.border = `5px solid ${border[album_id - 1]}`;
            favorite_data_element.style.border = `5px solid ${border[album_id - 1]}`;
            skip_data_element.style.border = `5px solid ${border[album_id - 1]}`;

            // Add the element to the DOM
            element.append(song_element);
        })
    })
    .catch(error => {
        alert(error);
    });
}

function album_selector() {
    const selection_imgs = document.querySelectorAll('.selection-img');
    selection_imgs.forEach(img => {
        img.addEventListener('click', () => {
            selection_imgs.forEach(item => {
                item.style.width = '13%';
                item.style.height = '13%'
            });

            img.style.width = '18%';

            select_album(Number(img.dataset.album));
        });
    });
}

function load_rating_page() {
    // Show rating page, hide the others\
    document.querySelector('#home-view').style.display = 'none';
    document.querySelector('#rating-view').style.display = 'block';
}

// Entire App

function main() {
    fetch('/albums')
    .then(response => response.json())
    .then(data => {
        const album_ranking = data.albums;

        album_ranking.sort((a, b) => {
            return (b.avg_score * b.fav_skip) - (a.avg_score * a.fav_skip);
        })

        load_homepage(album_ranking);
    });
}

function mobile_adjust() {
    window.alert('You are using a mobile device, please note that this will change the stying of this webpage. The webpage will still work, but you will recieve a better experience if you use a larger screen.');

    // Replace header
    document.querySelector('#header').style.display = 'none';
    document.querySelector('#top').innerHTML = `<img src="${STATIC_URL}images/header.png" alt="header" style="width:100%;">`
    document.querySelector('#main').marginTop = '0'

    // Change top three album section size
    document.querySelectorAll('.top-3-album').forEach(album => {
        album.style.width = '100%';
    })

    // Make the all album ranking look good
    document.querySelector('#album-rank').style.flexWrap = 'wrap';
    document.querySelector('#album-rank-overall').style.width = '100%';
    document.querySelector('#album-rank-score').style.width = '100%';
    document.querySelector('#album-rank-fav-skip').style.width = '100%';

    document.querySelectorAll('.album-ranking').forEach(album => {
        album.style.height = '70px';
    })
}

function buttons() {
    document.querySelectorAll('.to-home').forEach(button => {
        button.addEventListener('click', main);
    })

    document.querySelectorAll('.to-rank').forEach(button => {
        button.addEventListener('click', load_rating_page);
    })
}

start();