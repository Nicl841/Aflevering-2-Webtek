// Funktion til at generere HTML for et album
function createAlbumHTML(id, albumName, artistName, artistWebsite, productionYear, trackList) {
    let albumHTML = '<div class="album">' +
                    '<h2>' + albumName + '</h2>' +
                    '<p>Af <a href="' + artistWebsite + '" target="_blank">' + artistName + '</a> (' + productionYear + ')</p>' +
                    '<button onclick="toggleTracklist(' + id + ')">Vis Tracks</button>' +
                    '<ul id="tracklist-' + id + '" class="tracklist skjul">';

    // Tilføj tracks til albummet
    for (let i = 0; i < trackList.length; i++) {
        albumHTML += '<li>' + trackList[i].trackNumber + '. ' + trackList[i].trackTitle + '</li>';
    }

    albumHTML += '</ul></div>';
    return albumHTML;
}
// Funktion til at vise eller skjule tracklisten for et bestemt album
function toggleTracklist(id) {
    let tracklist = document.getElementById('tracklist-' + id);
    if (tracklist.classList.contains('skjul')) {
        tracklist.classList.remove('skjul');
    } else {
        tracklist.classList.add('skjul');
    }
}

// Hent JSON-data og opret album HTML
fetch('albums.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        let content = document.getElementById('content');
        for (let i = 0; i < data.length; i++) {
            let albumData = data[i];
            let albumHTML = createAlbumHTML(
                albumData.id,
                albumData.albumName,
                albumData.artistName,
                albumData.artistWebsite, 
                albumData.productionYear,
                albumData.trackList
            );
            content.innerHTML += albumHTML;
        }
    })
    // Fejlbesked til konsollen hvis JSON ikke hentes ordenligt
    .catch(function(error) {
        console.error("Fejl ved indlæsning af JSON:", error);
    });
