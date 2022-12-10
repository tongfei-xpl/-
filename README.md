# ***注意***：开始栏在首页的`index.html`     

## ***音乐播放器——音频修改***

###  	添加音乐

#### 		在`html`文件中第*50*行写

>  html
>
>  `<img src="2316.jpg" alt="">`

#### 然后在*93*行写

> html
>
> `<div class="menu-div"><h4 id="o##">*****</h4></div>`
>
> `***** 是歌曲名称`
>
> `## 是歌曲有序排序`



#### 		在`js`文件中第*19*，*20*，*22*行写

> JS
>
> `let albums0=['歌曲名称'];`
>
> `let albums=['歌曲地址链接'];`
>
> *注意：*歌曲名称和地址链接写在最后，不然可能会导致错乱
>
> `let track_names=['',''];`
>
> 多添加一个空字符串

#### 		在`js`文件第*300*行写

> JS
>
> `document.getElementById('o##').onclick=function(){`
>
> `  cur_index=16;`
>
> `  selectTrack(-1);`
>
> `}`
>
> `## 是刚才录入的歌曲有序排序`





##   

##    



