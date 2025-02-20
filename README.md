# HTML + JS + CSS 静态文件双歌词滚动

## 使用

1. lyric 文件夹下设置了左右两首曲子的歌词和翻译，对应于 audio 文件夹下的声音文件，可以根据歌曲进行替换，同时需要更改 index.html 中对歌曲文件的引用

2. 只显示单副歌词也是可以的，只要在 index.html 中注释掉某副歌词的 origin.js 或 trans.js 文件即可，例如把第一幅歌词屏蔽掉：

```html
<!-- <script src="./lyric/origin1.js"></script> -->
```


## 演示

这里以歌曲：[裏表ラバーズ×ロストワンの号哭](https://music.163.com/#/song?id=28613680) 为例进行演示：

[https://double-lyric.singfor.live](https://double-lyric.singfor.live)
