//Must needed Variables
const searchText = document.getElementById('searchByName');
const searchBtn = document.querySelector('.search-btn');
const result = document.getElementById('result');
const mainApi = 'https://api.lyrics.ovh'

//Show result By Name
function SongNameAndArtistShower(data) {
    let output = '';
    const song = data.data;
    for(let i = 0; i < 10; i++) {
        const particularTitile = song[i];
        output += `
        <div>
        <!-- single result -->
        <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                    <h3 class="lyrics-name">${particularTitile.title}</h3>
                    <p class="author lead">Album by <span>${particularTitile.artist.name}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                    <button class="btn btn-success" data-artist = "${particularTitile.artist.name}" data-SongName = "${particularTitile.title}">Get Lyrics</button>
            </div>
            <!-- single result -->
            </div>        
        `
    }
    result.innerHTML = output;
}

//Function of Search Via Song
function searchViaSong() {
    fetch(`${mainApi}/suggest/${searchText.value}`)
    .then(response => response.json())
    .then(data => SongNameAndArtistShower(data));
}

//Get Lyrics from (Get Lyrics) Button
function getLyrics(artistName, songTitle){
    fetch(`${mainApi}/v1/${artistName}/${songTitle}`)
    .then(res => res.json())
    .then(data => {
        const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>')
       
        result.innerHTML = `<div style = "text-align : center">
        <h1 style="color : #28A745">${artistName} - ${songTitle}</h1>
        <div>${lyrics}</div>
        </div>`

    })
} 

// Search Button Event Handler
searchBtn.addEventListener('click' , ()=> {
    if(searchText.value === '' || searchText.value === ' '){
        alert('please Enter a Song Name')
    }
    else{
        searchViaSong();
        searchText.value = '';
    }
})

//Get Lyrics Via {Get Lyrics} Button
result.addEventListener('click', (button)=> {
    const btnTarget = button.target;
    if(btnTarget.tagName === 'BUTTON'){
        const artist = btnTarget.getAttribute('data-artist');
        const title = btnTarget.getAttribute('data-SongName');

       getLyrics(artist , title) 
    }
})

/*Happy Coding :) */