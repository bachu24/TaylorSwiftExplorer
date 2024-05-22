document.addEventListener('DOMContentLoaded', function() {
    const albumList1 = document.getElementById('album-list1');
    const albumList2 = document.getElementById('album-list2');
    const albumList3 = document.getElementById('album-list3');
    const songList = document.getElementById('song-list');
    const songDetails = document.getElementById('song-details');
    const backButton = document.getElementById('back-button');
    var i =0;

    const albums = [
        { title: 'Taylor Swift', cover: 'taylor-swift.jpg', songs: ['Tim McGraw', 'Picture to Burn', 'Teardrops on My Guitar'] },
        { title: 'Fearless', cover: 'fearless.jpg', songs: ['Fearless', 'Fifteen', 'Love Story', 'White Horse'] },
        { title: 'Speak Now', cover: 'speak-now.jpg', songs: ['Mine', 'Sparks Fly', 'Back to December', 'Speak Now', 'Dear John'] },
        { title: 'Red', cover: 'red.jpg', songs: ['State of Grace', 'Red', 'Treacherous', 'I Knew You Were Trouble', 'All Too Well'] },
        { title: '1989', cover: '1989.jpg', songs: ['Welcome to New York', 'Blank Space', 'Style', 'Shake It Off', 'Wildest Dreams'] },
        { title: 'Reputation', cover: 'reputation.jpg', songs: ['...Ready For It?', 'End Game', 'Delicate', 'Look What You Made Me Do', 'New Year\'s Day'] },
        { title: 'Lover', cover: 'lover.jpg', songs: ['I Forgot That You Existed', 'Cruel Summer', 'Lover', 'The Man', 'Daylight'] },
        { title: 'Folklore', cover: 'folklore.jpg', songs: ['the 1', 'cardigan', 'exile', 'my tears ricochet', 'mirrorball'] },
        { title: 'Evermore', cover: 'evermore.jpg', songs: ['willow', 'champagne problems', 'gold rush', 'no body, no crime', 'ivy'] }
        // Add more albums and songs as needed
    ];

    // Display albums with cover images
    albums.forEach((album, index) => {
        i++
        const albumDiv = document.createElement('div');
        albumDiv.className = 'album';
        albumDiv.innerHTML = `
            <img src="images/${album.cover}" alt="${album.title} Cover" width="150">
            <span>${album.title}</span>
        `;
        albumDiv.addEventListener('click', () => showSongs(index));
        if (i<=3){
            albumList1.appendChild(albumDiv);
        }
        else if (i<=6){
            albumList2.appendChild(albumDiv);
        }
        else{
            albumList3.appendChild(albumDiv);
        }
    });
    

    function showSongs(albumIndex) {
        const album = albums[albumIndex];
        songList.innerHTML = `<h2>${album.title}</h2>`;
        album.songs.forEach(song => {
            const songDiv = document.createElement('div');
            songDiv.className = 'song';
            songDiv.textContent = song;
            songDiv.addEventListener('click', () => showSongDetails(album.title, song));
            songList.appendChild(songDiv);
        });
        albumList1.classList.add('hidden');
        albumList2.classList.add('hidden');
        albumList3.classList.add('hidden');
        
        songDetails.classList.add('hidden');
        songList.classList.remove('hidden');
        backButton.classList.remove('hidden');
    }

    async function showSongDetails(albumTitle, songTitle) {
        songDetails.innerHTML = `<h2>${songTitle}</h2>`;
        
        // Fetch lyrics from the API
        const response = await fetch(`https://api.lyrics.ovh/v1/Taylor Swift/${songTitle}`);
        const data = await response.json();
        const lyrics = data.lyrics || 'Lyrics not found';
        songDetails.innerHTML += `<pre>${lyrics}</pre>`;

        // Perform sentiment analysis
        const sentiment = performSentimentAnalysis(lyrics);
        songDetails.innerHTML += `<p>Sentiment: ${sentiment}</p>`;
        
        songList.classList.add('hidden');
        songDetails.classList.remove('hidden');
        backButton.classList.remove('hidden');
    }

    function performSentimentAnalysis(text) {
        // Simple sentiment analysis (can be replaced with a more sophisticated library)
        const positiveWords = ['love', 'happy', 'joy', 'good', 'great'];
        const negativeWords = ['sad', 'bad', 'hate', 'angry', 'upset'];
        let score = 0;
        text.split(/\s+/).forEach(word => {
            if (positiveWords.includes(word.toLowerCase())) score++;
            if (negativeWords.includes(word.toLowerCase())) score--;
        });
        return score > 0 ? 'Positive' : score < 0 ? 'Negative' : 'Neutral';
    }

    // Back button functionality
    backButton.addEventListener('click', () => {
        albumList1.classList.remove('hidden');
        albumList2.classList.remove('hidden');
        albumList3.classList.remove('hidden');
        songList.classList.add('hidden');
        songDetails.classList.add('hidden');
        backButton.classList.add('hidden');
    });
});
