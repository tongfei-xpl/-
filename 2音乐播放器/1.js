// 要操作的元素
let play_pause=document.querySelector('.play-pause'),
    player_track=document.querySelector('.player-track'),
    album_cover=document.querySelector('.album-cover'),
    bg=document.querySelector('.bg'),
    album_name=document.querySelector('.album-name'),
    track_name=document.querySelector('.track-name'),
    track_time=document.querySelector('.track-time'),
    current_time=document.querySelector('.current-time'),
    total_time=document.querySelector('.total-time'),
    progress_box=document.querySelector('.progress-box'),
    hover_time=document.querySelector('.hover-time'),
    hover_bar=document.querySelector('.hover-bar'),
    progress_bar=document.querySelector('.progress-bar'),
    play_prev=document.querySelector('.play-prev'),
    play_next=document.querySelector('.play-next');


var key = '';

var nemedata = []; // 歌曲名称
var urldata = []; // 歌曲链接
var trackData = [];

var number1 = []; // 歌曲ID的存放数组
var number2 = 0; // 歌曲ID

data.forEach(e=>{
    key += `<div class="menu-div"><h4 id="o${++number2}">${e.name}</h4></div>`

    nemedata.push(e.name)
    urldata.push(e.url)
    trackData.push('')

    number1.push(`${number2}`)
})
// console.log(number1);

document.querySelector('.inmenu').innerHTML=`<br>${key}<br>`

number1.forEach(e=>{
    document.getElementById(`o${e}`).onclick=function(){
        cur_index=e;
        selectTrack(-1);
    }
})




// 专辑名数组
let albums0 = nemedata;
let albums = urldata;

// let albums0=['Warriors','世界は恋に落ちている','海市蜃楼','八重樱','ハレハレヤ','昭阳','Epoch Winter','bones','狂々撫子','Cyberange','室内系的TrackMaker','恋愛サーキュレーション','Iron Lotus','ピルグリム','Alize','达拉崩吧'];
// let albums=['http://music.163.com/song/media/outer/url?id=1832581866.mp3','http://music.163.com/song/media/outer/url?id=424496995.mp3','https://cw-sycdn.kuwo.cn/38228368fccf7dc4902661785d182138/63576db2/resource/n1/75/98/2369598765','http://music.163.com/song/media/outer/url?id=437250669.mp3','http://music.163.com/song/media/outer/url?id=1295189418.mp3','http://music.163.com/song/media/outer/url?id=1922867184.mp3','http://music.163.com/song/media/outer/url?id=1984353064.mp3','http://music.163.com/song/media/outer/url?id=1992986866.mp3','http://music.163.com/song/media/outer/url?id=409326722.mp3','http://music.163.com/song/media/outer/url?id=1375725396.mp3','http://music.163.com/song/media/outer/url?id=537787665.mp3','http://music.163.com/song/media/outer/url?id=579954.mp3','http://music.163.com/song/media/outer/url?id=1887467088.mp3','http://music.163.com/song/media/outer/url?id=551337741.mp3','http://music.163.com/song/media/outer/url?id=32341945.mp3','http://music.163.com/song/media/outer/url?id=476114873.mp3'];

// 歌曲信息数组
let track_names=trackData;

// let track_names=['','','','','','','','','','','','','','','','','','','','','',''];

// 定义变量
let progress_t, //鼠标在进度条上悬停的位置
    progress_loc, //鼠标在进度条上悬停的音频位置
    c_m, //悬停音频位置(分钟)
    ct_minutes, //悬停播放位置(分)
    ct_seconds, //悬停播放位置(秒)
    cur_minutes, //当前播放时间(分)
    cur_seconds, //当前播放时间(秒)
    dur_minutes, //音频总时长(分)
    dur_seconds, //音频总时长(秒)
    play_progress; //播放进度
// 当前歌曲下标
let cur_index=-1;

// 初始化
function initPlayer(){
    audio=new Audio(); //创建音频对象
    audio.loop=false; //不循环播放
    
    selectTrack(0);
    // 绑定播放暂停按钮的点击事件
    play_pause.addEventListener('click',playPause);
    // 进度条鼠标移动事件
    progress_box.addEventListener('mousemove',function(e){
        showHover(e);
    });
    // 进度条鼠标离开事件
    progress_box.addEventListener('mouseout',hideHover);
    // 进度条点击事件
    progress_box.addEventListener('click',playFromClickedPos);
    // 音频播放位置改变事件
    audio.addEventListener('timeupdate',updateCurTime);
    // 上一首按钮点击事件
    play_prev.addEventListener('click',function(){
        selectTrack(-1);
    });
    // 下一首按钮点击事件
    play_next.addEventListener('click',function(){
        selectTrack(1);
    });
}

// 播放暂停
function playPause(){
    setTimeout(function(){
        if(audio.paused){
            player_track.classList.add('active');
            play_pause.querySelector('.fa').classList='fa fa-pause';
            album_cover.classList.add('active');
            audio.play();
        }else{
            player_track.classList.remove('active');
            play_pause.querySelector('.fa').classList='fa fa-play';
            album_cover.classList.remove('active');
            audio.pause();
        }
    },300);
}

// 显示悬停播放位置弹层
function showHover(e){
    // 计算鼠标在进度条上的悬停位置(当前鼠标的X坐标-进度条在窗口中的left位置)
    progress_t=e.clientX - progress_box.getBoundingClientRect().left;
    // 计算鼠标在进度条上悬停时的音频位置
    // audio.duration 音频总时长
    progress_loc=audio.duration * (progress_t / progress_box.getBoundingClientRect().width);
    // 设置悬停进度条的宽度(较深部分)
    hover_bar.style.width=progress_t+'px';
    // 将悬停音频位置转为分钟
    c_m=progress_loc / 60;
    ct_minutes=Math.floor(c_m); //分
    ct_seconds=Math.floor(progress_loc - ct_minutes * 60); //秒

    if(ct_minutes<10){
        ct_minutes='0'+ct_minutes;
    }
    if(ct_seconds<10){
        ct_seconds='0'+ct_seconds;
    }
    if(isNaN(ct_minutes) || isNaN(ct_seconds)){
        hover_time.innerText='--:--';
    }else{
        hover_time.innerText=ct_minutes+':'+ct_seconds;
    }

    // 设置悬停播放位置弹层的位置并显示
    hover_time.style.left=progress_t+'px';
    hover_time.style.marginLeft='-20px';
    hover_time.style.display='block';
}

// 隐藏悬停播放位置弹层
function hideHover(){
    hover_bar.style.width='0px';
    hover_time.innerText='00:00';
    hover_time.style.left='0px';
    hover_time.style.marginLeft='0px';
    hover_time.style.display='none';
}

// 从点击的位置开始播放
function playFromClickedPos(){
    // 设置当前播放时间
    audio.currentTime=progress_loc;
    // 设置进度条宽度
    progress_bar.style.width=progress_t+'px';
    // 隐藏悬停播放位置弹层
    hideHover();
}

// 改变当前播放时间
function updateCurTime(){
    // 当前播放时间(分)
    cur_minutes=Math.floor(audio.currentTime / 60);
    // 当前播放时间(秒)
    cur_seconds=Math.floor(audio.currentTime - cur_minutes * 60);
    // 音频总时长(分)
    dur_minutes=Math.floor(audio.duration / 60);
    // 音频总时长(秒)
    dur_seconds=Math.floor(audio.duration - dur_minutes * 60);
    // 计算播放进度
    play_progress=audio.currentTime / audio.duration * 100;

    if(cur_minutes<10){
        cur_minutes='0'+cur_minutes;
    }
    if(cur_seconds<10){
        cur_seconds='0'+cur_seconds;
    }
    if(dur_minutes<10){
        dur_minutes='0'+dur_minutes;
    }
    if(dur_seconds<10){
        dur_seconds='0'+dur_seconds;
    }

    // 设置播放时间
    if(isNaN(cur_minutes) || isNaN(cur_seconds)){
        current_time.innerText='00:00';
    }else{
        current_time.innerText=cur_minutes+':'+cur_seconds;
    }
    // 设置总时长
    if(isNaN(dur_minutes) || isNaN(dur_seconds)){
        total_time.innerText='00:00';
    }else{
        total_time.innerText=dur_minutes+':'+dur_seconds;
    }
    // 设置进度条宽度
    progress_bar.style.width=play_progress+'%';

    // 播放完毕, 恢复样式
    if(play_progress==100){
        play_pause.querySelector('.fa').classList='fa fa-play';
        progress_bar.style.width='0px';
        current_time.innerText='00:00';
        player_track.classList.remove('active');
        album_cover.classList.remove('active');
        selectTrack(1);
    }
}

// 切换歌曲(flag: 0=初始, 1=下一首, -1=上一首)
function selectTrack(flag){
    if(flag==0 || flag==1){
        ++cur_index;
    }else{
        --cur_index;
    }

    if(cur_index>-1 && cur_index<albums.length){
        if(flag==0){
            play_pause.querySelector('.fa').classList='fa fa-play';
        }else{
            play_pause.querySelector('.fa').classList='fa fa-pause';
        }
        progress_bar.style.width='0px';
        current_time.innerText='00:00';
        total_time.innerText='00:00';
        // 当前专辑名
        let cur_album=albums[cur_index];
        let cur_album0=albums0[cur_index];
        // 当前歌曲信息(歌手 - 歌名)
        let cur_track_name=track_names[cur_index];
        // 设置音频路径
        audio.src=cur_album;
        if(flag!=0){
            // 当切换上一首,下一首时,自动播放
            audio.play();
            player_track.classList.add('active');
            album_cover.classList.add('active');
        }

        // 设置专辑名
        album_name.innerText=cur_album0;
        // 设置歌曲信息
        track_name.innerText=cur_track_name;
        // 设置封面
        album_cover.querySelector('.active').classList.remove('active');
        album_cover.getElementsByTagName('img')[cur_index].classList.add('active');
        // 将封面设置为背景大图
        bg.style.backgroundImage='url('+album_cover.getElementsByTagName('img')[cur_index].getAttribute('src')+')';
    }else{
        // 切换溢出专辑数组时, 恢复cur_index
        if(flag==0 || flag==1){
            --cur_index;
        }else{
            ++cur_index;
        }
    }
}

// document.getElementById('o1').onclick=function(){
//     cur_index=1;
//     selectTrack(-1);
// }
// document.getElementById('o2').onclick=function(){
//     cur_index=2;
//     selectTrack(-1);
// }
// document.getElementById('o3').onclick=function(){
//     cur_index=3;
//     selectTrack(-1);
// }
// document.getElementById('o4').onclick=function(){
//     cur_index=4;
//     selectTrack(-1);
// }
// document.getElementById('o5').onclick=function(){
//     cur_index=5;
//     selectTrack(-1);
// }
// document.getElementById('o6').onclick=function(){
//     cur_index=6;
//     selectTrack(-1);
// }
// document.getElementById('o7').onclick=function(){
//     cur_index=7;
//     selectTrack(-1);
// }
// document.getElementById('o8').onclick=function(){
//     cur_index=8;
//     selectTrack(-1);
// }
// document.getElementById('o9').onclick=function(){
//     cur_index=9;
//     selectTrack(-1);
// }
// document.getElementById('o10').onclick=function(){
//     cur_index=10;
//     selectTrack(-1);
// }
// document.getElementById('o11').onclick=function(){
//     cur_index=11;
//     selectTrack(-1);
// }
// document.getElementById('o12').onclick=function(){
//     cur_index=12;
//     selectTrack(-1);
// }
// document.getElementById('o13').onclick=function(){
//     cur_index=13;
//     selectTrack(-1);
// }
// document.getElementById('o14').onclick=function(){
//     cur_index=14;
//     selectTrack(-1);
// }
// document.getElementById('o15').onclick=function(){
//     cur_index=15;
//     selectTrack(-1);
// }
// document.getElementById('o16').onclick=function(){
//     cur_index=16;
//     selectTrack(-1);
// }

// 初始化播放器
initPlayer();



var a = 1;

function ifa(){
    a++;
}
function ifa1(){
    a=1;
}

var func = debounce(ifa, 550)
function debounce(fn, delay){
    var timerId;
    return function(){
        clearTimeout(timerId)
        timerId = setTimeout(fn, delay)
    }
}
var func1 = debounce1(ifa1, 550)
function debounce1(fn1, delay1){
    var timerId1;
    return function(){
        clearTimeout(timerId1)
        timerId1 = setTimeout(fn1, delay1)
    }
}

document.getElementById('menu').style.visibility='hidden';

// 判断a，1是否全等，并对a进行赋值，赋值后 a 不全等于 1 ，执行else 
document.getElementById('menu-button').onclick=function(){
    if(a === 1){
        document.getElementById('menu').style.animationName='menu-box';
        document.getElementById('menu').style.visibility='visible';
        func()
        // 当a=1时，页面程显示状态
    }else{
        document.getElementById('menu').style.animationName='box-menu';
        setTimeout(function(){document.getElementById('menu').style.visibility='hidden';},480);
        func1()
    }
}
