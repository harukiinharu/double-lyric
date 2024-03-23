// 歌词翻译滚动类
class LyricUl {
  constructor(mainaudio, container, lyricTime, lyricOrigin, lyricTrans) {
    this.ul = document.createElement('ul')
    this.ul.className = 'lyriclist'
    container.appendChild(this.ul)
    addLi(this.ul, lyricOrigin, lyricTrans)

    this.lyricTime = lyricTime
    this.lyricTime[this.lyricTime.length] = this.lyricTime[this.lyricTime.length - 1] + 100

    this.$li1 = $(this.ul).find('li')
    this.oldLine = -1
    this.currentLine = -1
    this.currentTime
    this.pHeight = (20 + 16) * 2
    this.tyMax = 1 * this.pHeight
    this.ty

    this.mainaudio = mainaudio
  }

  ontimeupdate() {
    this.currentTime = this.mainaudio.currentTime
    this.currentLine = getCurrentLine(this.lyricTime, this.currentTime)

    if (this.oldLine != this.currentLine) {
      this.ty = -this.currentLine * this.pHeight
      if (-this.ty > this.tyMax) this.ul.style.transform = 'translateY(' + (this.ty + this.tyMax).toString() + 'px)'
      else this.ul.style.transform = 'translateY(0px)'
      if (this.oldLine != -1) this.$li1.get(this.oldLine).className = ''
      if (this.currentLine != -1) this.$li1.get(this.currentLine).className = 'on'
      this.oldLine = this.currentLine
    }
  }
}

// 在 ul 中添加包含有歌词、翻译的 li
function addLi(ul, lyricOrigin, lyricTrans) {
  for (key in lyricOrigin) {
    let value1 = lyricOrigin[key].replace(/\s*/g, '')
    let value2 = lyricTrans[key].replace(/\s*/g, '')

    if (value1 == '' && value2 == '') continue

    if (value1 == '') value1 = '　'
    else if (value2 == '') value2 = '　'
    let value = '<p>' + value1 + '</p>' + '<p>' + value2 + '</p>'
    ul.innerHTML += '<li>' + value + '</li>'
  }
}

// 二分法查找当前歌词位置
function getCurrentLine(lyricTime, currentTime) {
  if (currentTime < lyricTime[0]) return -1
  let left = 0
  let right = lyricTime.length - 1
  let mid
  while (left <= right) {
    mid = left + parseInt((right - left) / 2)
    if (currentTime < lyricTime[mid]) right = mid
    else left = mid
    if (right - left == 1) return left
  }
  return -1
}

// 检查歌词与翻译时间线是否一致
function checkLyric(lyricOrigin, lyricTrans) {
  if (lyricTrans.length != lyricOrigin.length) {
    alert('Error: 歌词与翻译数量不同')
  }

  let os = Object.keys(lyricOrigin)
  let ts = Object.keys(lyricTrans)
  for (let i = 0; i < os.length; i++) {
    if (os[i] != ts[i]) {
      alert('Error: 歌词与翻译序列不完全一致')
      return false
    }
  }

  let oldT = 0
  let lyricTime = []
  let i = 0
  for (key in lyricOrigin) {
    lyricTime[i] = parseFloat(key.substr(1, 3)) * 60 + parseFloat(key.substring(4, 10))
    if (lyricTime[i] > oldT) {
      oldT = lyricTime[i]
    } else {
      alert('Error: 歌词与翻译的时间不是顺序递增')
      return false
    }
    i += 1
  }

  return lyricTime
}

// 开始
var mainaudio = $('#mainaudio')[0]
var container = $('#container')[0]

var hasLyric1 = false
var hasLyric2 = false

try {
  var lyricTime1 = checkLyric(lyricOrigin1, lyricTrans1)
  if (lyricTime1 !== false) {
    var lyricUl1 = new LyricUl(mainaudio, container, lyricTime1, lyricOrigin1, lyricTrans1)
  }
  hasLyric1 = true
} catch (error) {
  console.log('未找到第一副歌词与翻译')
}

try {
  var lyricTime2 = checkLyric(lyricOrigin2, lyricTrans2)
  if (lyricTime2 !== false) {
    var lyricUl2 = new LyricUl(mainaudio, container, lyricTime2, lyricOrigin2, lyricTrans2)
  }
  hasLyric2 = true
} catch (error) {
  console.log('未找到第二副歌词与翻译')
}

if (!hasLyric1 && !hasLyric2) console.log('没有任何一副歌词!')
else if (hasLyric1 && !hasLyric2) mainaudio.ontimeupdate = lyricUl1.ontimeupdate
else if (!hasLyric1 && hasLyric2) mainaudio.ontimeupdate = lyricUl2.ontimeupdate
else {
  mainaudio.ontimeupdate = () => {
    lyricUl1.ontimeupdate()
    lyricUl2.ontimeupdate()
  }
}
