
window.onload = function(){
    let get = localStorage.getItem('music')
       
        localStorage.setItem('AudioMusic', get)
}

fetch('tracks.txt')
.then(songs =>{
    return songs.text()
}).then(songdata =>{
    if(localStorage.getItem('music') === null){
       
        localStorage.setItem('music', songdata)
    }
})

let footer = document.querySelector('footer');
let forward = document.querySelector('#forward-btn')
let backward = document.querySelector('#backward-btn');
let audio = document.querySelector('audio');
let music_section = document.querySelector('.music-section');
let progress = document.querySelector('.progress');
let progressBar = document.querySelector('.progress-bar');
let progressBall = document.querySelector('.progress-ball');
let play = document.querySelector('#play-btn');
let info = document.querySelector('.song-info');
let x = 0;
let musicArr = localStorage.getItem('AudioMusic').split(',');



   




for(i = 0; i < musicArr.length; i ++){
   music_holder = document.createElement('div');

   music_holder.classList.add('music-holder');

   music_section.appendChild(music_holder);

   music_holder.innerHTML = musicArr[i];
}

    function display(){
        footer.style.opacity = 0.9
    }


    function playMusic(){

        if(progressBall.classList.contains('rotate')){
            audio.pause()
            progressBall.classList.remove('rotate');
            play.style.backgroundImage = 'url(images/pause.png)'
        } else{
            progressBall.classList.add('rotate')
            audio.play()
            play.style.backgroundImage = 'url(images/play.png)'
        }
    }
    

    function playSong(e){

        play.style.backgroundImage = 'url(images/play.png)'
        progressBall.classList.add('rotate');

       for(i = 0; i < musicArr.length; i++){

        if(e.target.innerHTML == musicArr[i]){
             audio.src = './music/' + musicArr[i]
             audio.play()
             display();
             x = musicArr.indexOf(musicArr[i])
             info.innerHTML = musicArr[i]
             console.log(x)
             console.log(musicArr.length)
        }

       }
    }

    function prevSong(){

        if(x == 0){

            progressBall.classList.add('rotate');
            
            x = musicArr.length;
            audio.src = './music/' + musicArr[x];
            audio.play()
            info.innerHTML = musicArr[x]

        } 
        
        if(forward.classList.contains('clicked')){
            forward.classList.remove('clicked')
            x--
            x--
            audio.src = './music/' + musicArr[x];
            audio.play()
            info.innerHTML = musicArr[x]
        } else{
            x--
            audio.src = './music/' + musicArr[x];
            audio.play()
            info.innerHTML = musicArr[x]
        }

      

        
    }

    function setProgress(e){
        const width = this.clientWidth

        const clickX = e.offsetX
        const duration = audio.duration
        
        audio.currentTime = (clickX/width)*duration
    }

    function nextSong(){

        progressBall.classList.add('rotate');


        if(x < musicArr.length){
            forward.classList.add('clicked')
            x++
            audio.src = './music/' + musicArr[x];
            audio.play()
            info.innerHTML = musicArr[x]

        } 
        
        if(x++ === musicArr.length){
            
            x = 0;
            audio.src = './music/' + musicArr[x];
            audio.play()
            info.innerHTML = musicArr[x]

        }
    }

    function showProgress(){
        let cur = audio.currentTime
        let dur = audio.duration

        let update = (cur/dur)*100

        progress.style.width = `${update}%`;
    }

    




    music_section.addEventListener('click', playSong);
    forward.addEventListener('click', nextSong);
    backward.addEventListener('click', prevSong);
    audio.addEventListener('timeupdate', showProgress);
    play.addEventListener('click', playMusic);
    progressBar.addEventListener('click', setProgress);
