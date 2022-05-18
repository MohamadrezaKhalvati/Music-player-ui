const host = "http://5.253.27.229:8081"
const headerTitle = document.getElementById("title")
const musicPhoto  = document.getElementById("music-photo")
const musicNameId = document.getElementById("music-name-text")
const playPauseId = document.getElementById("pause-play")
const favoriteId  = document.getElementById("favorite")
const musicListIconId = document.getElementById("music-list-icon")
const musicListStyle = document.getElementById("music-list-id")
const progressBarStyle = document.getElementById("progress-bar")
const closeMusicListIconId = document.getElementById("music-list-close-icon")
const previousIconId = document.getElementById("previous")
const nextIconId = document.getElementById("next")
const ul = document.getElementById("ul")
const currentTime = document.getElementById("current-time")
const mainAudio = document.getElementById("main-audio")
const totalDuration  = document.getElementById("end-time")
const progressArea = document.getElementById("progress-area")


async function onload(){
    const randomMusicIndex = await generateRandomNumber()
    const musicList = await getMusicList()
    localStorage.setItem("music" , JSON.stringify(musicList[randomMusicIndex]))
    console.log(musicList);
    musicNameId.innerHTML = musicList[randomMusicIndex].title
    musicPhoto.src = host +musicList[randomMusicIndex].thumbnail
    currentTime.innerHTML = "0:00"
    totalDuration.innerHTML =  fixDuration(musicList[randomMusicIndex].duration)   
    progressBarStyle.style.width = "0%"
}



async function getMusicList(){
    const resposne = await fetch(`${host}/music.json`)
    const data = await resposne.json()
    return data
}

 function fixDuration(time){
    const minute = Math.floor(time/60)
    const secend = time%60
    if(secend < 10){
        return minute+ ":0" +secend
    }
    return minute+ ":" +secend
}



async function playMusic(){
    playPauseId.src = "../images/pause.png"
    headerTitle.innerHTML = "Now Playing"
    const music = localStorage.getItem("music")
    const musicData = JSON.parse(music)
    musicNameId.innerHTML = musicData.title
    const musicUrl = host+musicData.music
    mainAudio.src = musicUrl
    mainAudio.play()
}

async function pauseMusic(){
    playPauseId.src = "../images/play.png"
    headerTitle.innerHTML = "Music Player"
    mainAudio.pause()
}


async function generateRandomNumber(){
    return await Math.floor(Math.random() * 10);
}


async function likeMusic(){
    // if like music add it to local storage
    const getMusic = localStorage.getItem("music")
    const favoriteMusics = localStorage.getItem("favoriteMusic")
    favoriteMusics.forEach(favoriteMusic => {
        if(!(getMusic.id == favoriteMusic.id)){
            favoriteMusics.push(favoriteMusic)
        }
    });
}


async function unlikeMusic(){
    // if unlike music remove it from local storage
    const getMusic = localStorage.getItem("music")
    const favoriteMusic = localStorage.getItem("favoritemusic")
    const chosenMusicToUnLike = favoriteMusic.indexOf(getMusic)
    favoriteMusic.splice(chosenMusicToUnLike, 1) 
}




async function prevMusicInShuffleMode(){
    const randomMusicIndex = await generateRandomNumber()
    const oldMusicId = JSON.parse(localStorage.getItem("music")).id 
    if(randomMusicIndex == oldMusicId){
        await prevMusicInShuffleMode()
    }else{
        const musicList = await getMusicList()
        localStorage.setItem("music" , JSON.stringify(musicList[randomMusicIndex]))
        musicNameId.innerHTML = musicList[randomMusicIndex].title
        musicPhoto.src = host + musicList[randomMusicIndex].thumbnail
        currentTime.innerHTML = "0:00"
        totalDuration.innerHTML =  fixDuration(musicList[randomMusicIndex].duration)
        const musicUrl = host+musicList[randomMusicIndex].music
        mainAudio.src = musicUrl
        mainAudio.play()
    }
}

async function preMusicInListMode(){
    const oldMusicId = JSON.parse(localStorage.getItem("music")).id 
    if(oldMusicId == 1){
        const musicList = await getMusicList()
        localStorage.setItem("music" , JSON.stringify(musicList[9]))
        musicNameId.innerHTML = musicList[9].title
        musicPhoto.src = host +musicList[9].thumbnail
        currentTime.innerHTML = "0:00"
        totalDuration.innerHTML = await fixDuration(musicList[9].duration)
        const musicUrl = host+musicList[9].music
        mainAudio.src = musicUrl
        mainAudio.play()
    }else{
        const newMusicId = oldMusicId-1
        const musicList = await getMusicList()
        localStorage.setItem("music" , JSON.stringify(musicList[newMusicId-1]))
        musicNameId.innerHTML = musicList[newMusicId-1].title
        musicPhoto.src = host +musicList[newMusicId-1].thumbnail
        currentTime.innerHTML = "0:00"
        totalDuration.innerHTML =  fixDuration(musicList[newMusicId-1].duration)
        const musicUrl = host+musicList[newMusicId-1].music
        mainAudio.src = musicUrl
        mainAudio.play()
    }
}



async function nextMusicInShuffleMode(){
    console.log("LOG IN nextMusicInShuffleMode");
    const randomMusicIndex = await generateRandomNumber()
    const oldMusicId = JSON.parse(localStorage.getItem("music")).id 
    if(randomMusicIndex == oldMusicId){
        await nextMusicInShuffleMode()
    }else{
        const musicList = await getMusicList()
        localStorage.setItem("music" , JSON.stringify(musicList[randomMusicIndex]))
        musicNameId.innerHTML = musicList[randomMusicIndex].title
        musicPhoto.src = host +musicList[randomMusicIndex].thumbnail
        currentTime.innerHTML = "0:00"
        totalDuration.innerHTML =  fixDuration(musicList[randomMusicIndex].duration)
        const musicUrl = host+musicList[randomMusicIndex].music
        mainAudio.src = musicUrl
        mainAudio.play()
    }
}

async function nextMusicInListMode(){
    const oldMusicId = JSON.parse(localStorage.getItem("music")).id 
    if(oldMusicId == 10){
        const musicList = await getMusicList()
        localStorage.setItem("music" , JSON.stringify(musicList[0]))
        musicNameId.innerHTML = musicList[0].title
        musicPhoto.src = host +musicList[0].thumbnail
        currentTime.innerHTML = "0:00"
        totalDuration.innerHTML =  fixDuration(musicList[0].duration)
        const musicUrl = host+musicList[0].music
        mainAudio.src = musicUrl
        mainAudio.play()
    
    }else{
        const musicList = await getMusicList()
        localStorage.setItem("music" , JSON.stringify(musicList[oldMusicId]))
        musicNameId.innerHTML = musicList[oldMusicId].title
        musicPhoto.src = host +musicList[oldMusicId].thumbnail
        currentTime.innerHTML = "0:00"
        totalDuration.innerHTML = await fixDuration(musicList[oldMusicId].duration)
        const musicUrl = host+musicList[oldMusicId].music
        mainAudio.src = musicUrl
        mainAudio.play()
    }

}

async function playMusicFromList(muscicId){
    const musicList = await getMusicList()
    const chosenMusic = musicList[muscicId-1]
    localStorage.setItem("music" , JSON.stringify(chosenMusic))
    playMusic()
    musicListStyle.style.display = "none"
}


async function loadMusicList(){
    const allMusic = await getMusicList() 
    if(ul.clientHeight == 0){
        allMusic.forEach(music =>{
            const time = fixDuration(music.duration)
            let liTag = `
            <li onclick="playMusicFromList(${music.id})">
                <div class="music-list-name">
                     <span>${music.title}</span>
                     <p>${music.author}</p>
                </div>
                <div class="musicTime">
                    <span id="end-time" , class="music-time"> ${time}</span>
                </div>
                <audio id="${music.title}" src="${host+music.music}"></audio>
            </li>
            `
            ul.insertAdjacentHTML("beforeend" , liTag)  
        })
    }
    

}   

playPauseId.addEventListener("click" , ()=>{
    if(playPauseId.src ==  "http://127.0.0.1:5500/images/play.png"){
        // now playing
        console.log("music is playing")
        playMusic()
    }
    else{
        // pause
        console.log("music stopped")
        pauseMusic()
    }
})


favoriteId.addEventListener("click" , async()=>{
    if(favorite.src == "http://127.0.0.1:5500/images/unfavorite.png"){
        // like music
        favorite.src = "images/favorite.png"
        await likeMusic()
    }
    else {
        favorite.src = "images/unfavorite.png"
        await unlikeMusic()
    }
})


shuffle.addEventListener("click" , ()=>{
    if(shuffle.alt == "list mode"){
        // play music in shuffle mode
        shuffle.src = "images/shuffle on.png"
        shuffle.alt = "shuffle mode"
        console.log("IN SHUFFLE MODE");
    }
    else if(shuffle.alt == "shuffle mode") {
        // play music in list mode
        shuffle.src = "images/shuffle.png"
        shuffle.alt = "list mode"
        console.log("IN LIST MODE")
    }
})


repeat.addEventListener("click" , ()=>{
    if(repeat.src == "http://127.0.0.1:5500/images/repeat.png"){
        repeat.src = "images/repeat on.png"
    }
    else {
        repeat.src = "images/repeat.png"
    }
})


musicListIconId.addEventListener("click" , async ()=>{
    musicListStyle.style.display = "block"
    await loadMusicList() 
})

closeMusicListIconId.addEventListener("click" ,()=>{
    musicListStyle.style.display = "none"
} )


previousIconId.addEventListener("click" , async ()=>{
    if(shuffle.alt == "shuffle mode"){
        // play previous  music in shuffle mode
        await prevMusicInShuffleMode()
    }
    else if(shuffle.alt == "list mode"){
        // play previous music in shuffle mode
         console.log(" previous song in list mode");
         await preMusicInListMode()
    }
})


nextIconId.addEventListener("click" , async ()=>{
    if(shuffle.alt == "shuffle mode"){
        // play next  music in shuffle mode
        console.log("next music in shuffle mode")
        await nextMusicInShuffleMode()
    }
    else if(shuffle.alt == "list mode"){
        // play next music in shuffle mode
        console.log("next music in list mode");
        await nextMusicInListMode()
    }
})


mainAudio.addEventListener("timeupdate" , async()=>{

    // update progressBar
    const musicCurrentTime = mainAudio.currentTime
    const duration = JSON.parse(localStorage.getItem("music")).duration
    let progressWidth = (musicCurrentTime / duration) * 100
    progressBarStyle.style.width = `${progressWidth}%`

    //update currentTime
    let totalMin = Math.floor(musicCurrentTime / 60)
    let totalSec = Math.floor(musicCurrentTime % 60)
    if(totalSec < 10)
        totalSec = `0${totalSec}`
    currentTime.innerHTML = `${totalMin}:${totalSec}`
})


progressArea.addEventListener("click" , async(event)=>{
    let progressWidth = progressArea.clientWidth
    let clickedOffSetX = event.offsetX
    const songDuration = JSON.parse(localStorage.getItem("music")).duration
    mainAudio.currentTime = (clickedOffSetX / progressWidth) * songDuration
})

