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

        // Add the title and change the colors based on the album
        if (album_ranking[i].id === 1) {
            album_element.innerHTML = `<h2>${i + 1}. Debut</h2>`;
            album_element.style.background = 'lightseagreen';
            album_element.style.border = '8px solid darkcyan';
        } else if (album_ranking[i].id === 2) {
            album_element.innerHTML = `<h2>${i + 1}. Fearless</h2>`;
            album_element.style.background = 'gold';
            album_element.style.border = '8px solid goldenrod';
        } else if (album_ranking[i].id === 3) {
            album_element.innerHTML = `<h2>${i + 1}. Speak Now</h2>`;
            album_element.style.background = 'rebeccapurple';
            album_element.style.border = '8px solid indigo';
        } else if (album_ranking[i].id === 4) {
            album_element.innerHTML = `<h2>${i + 1}. Red</h2>`;
            album_element.style.background = 'firebrick';
            album_element.style.border = '8px solid darkred';
        } else if (album_ranking[i].id === 5) {
            album_element.innerHTML = `<h2>${i + 1}. 1989</h2>`;
            album_element.style.background = 'lightblue';
            album_element.style.border = '8px solid lightskyblue';
        } else if (album_ranking[i].id === 6) {
            album_element.innerHTML = `<h2>${i + 1}. reputation</h2>`;
            album_element.style.background = 'dimgray';
            album_element.style.border = '8px solid gray';
        } else if (album_ranking[i].id === 7) {
            album_element.innerHTML = `<h2>${i + 1}. Lover</h2>`;
            album_element.style.background = 'pink';
            album_element.style.border = '8px solid plum';
        } else if (album_ranking[i].id === 8) {
            album_element.innerHTML = `<h2>${i + 1}. folklore</h2>`;
            album_element.style.background = 'lightgray';
            album_element.style.border = '8px solid darkgray';
        } else if (album_ranking[i].id === 9) {
            album_element.innerHTML = `<h2>${i + 1}. evermore</h2>`;
            album_element.style.background = 'orange';
            album_element.style.border = '8px solid peru';
        } else if (album_ranking[i].id === 10) {
            album_element.innerHTML = `<h2>${i + 1}. Midnights</h2>`;
            album_element.style.background = 'royalblue';
            album_element.style.border = '8px solid blue';
        }

        // Add the album cover, the class, and add it to the top three div
        album_element.innerHTML += `<img class='top-3-cover' src='${STATIC_URL}images/album_covers/${album_ranking[i].id}.jpeg' alt='album cover'>`;
        album_element.classList.add('top-3-album');
        document.querySelector('#top-3').append(album_element);
    }
}

function load_album_ranking_type(ranking, element) {
    element.innerHTML = '';
    for (i=0;i<10;i++) {
        const album_element = document.createElement('div');
        album_element.classList.add('album-ranking');

        if (ranking[i].id === 1) {
            album_element.innerHTML = `<h3 style="margin: 5px 63.5% 5px 10px;">#${i + 1}. Debut</h3>`;
            album_element.style.background = 'lightseagreen';
            album_element.style.border = '4px solid darkcyan';
        } else if (ranking[i].id === 2) {
            album_element.innerHTML = `<h3 style="margin: 5px 58.5% 5px 10px;">#${i + 1}. Fearless</h3>`;
            album_element.style.background = 'gold';
            album_element.style.border = '4px solid goldenrod';
        } else if (ranking[i].id === 3) {
            album_element.innerHTML = `<h3 style="margin: 5px 51.5% 5px 10px;">#${i + 1}. Speak Now</h3>`;
            album_element.style.background = 'rebeccapurple';
            album_element.style.border = '4px solid indigo';
        } else if (ranking[i].id === 4) {
            album_element.innerHTML = `<h3 style="margin: 5px 68.5% 5px 10px;">#${i + 1}. Red</h3>`;
            album_element.style.background = 'firebrick';
            album_element.style.border = '4px solid darkred';
        } else if (ranking[i].id === 5) {
            album_element.innerHTML = `<h3 style="margin: 5px 67% 5px 10px;">#${i + 1}. 1989</h3>`;
            album_element.style.background = 'lightblue';
            album_element.style.border = '4px solid lightskyblue';
        } else if (ranking[i].id === 6) {
            album_element.innerHTML = `<h3 style="margin: 5px 53% 5px 10px;">#${i + 1}. reputation</h3>`;
            album_element.style.background = 'dimgray';
            album_element.style.border = '4px solid gray';
        } else if (ranking[i].id === 7) {
            album_element.innerHTML = `<h3 style="margin: 5px 64% 5px 10px;">#${i + 1}. Lover</h3>`;
            album_element.style.background = 'pink';
            album_element.style.border = '4px solid plum';
        } else if (ranking[i].id === 8) {
            album_element.innerHTML = `<h3 style="margin: 5px 60% 5px 10px;">#${i + 1}. folklore</h3>`;
            album_element.style.background = 'lightgray';
            album_element.style.border = '4px solid darkgray';
        } else if (ranking[i].id === 9) {
            album_element.innerHTML = `<h3 style="margin: 5px 55.5% 5px 10px;">#${i + 1}. evermore</h3>`;
            album_element.style.background = 'orange';
            album_element.style.border = '4px solid peru';
        } else if (ranking[i].id === 10) {
            album_element.innerHTML = `<h3 style="margin: 5px 51% 5px 10px;">#${i + 1}. Midnights</h3>`;
            album_element.style.background = 'royalblue';
            album_element.style.border = '4px solid blue';
        }

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

    if (window.innerWidth < 500) {
        mobile_adjust();
    }
}

// Rating Page

function select_album(album_id) {
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
    document.querySelector('#top').innerHTML = '<img src="images/header.png" alt="header" style="width:100%;">'
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