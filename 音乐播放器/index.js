var lrc = `[00:00.00]情非得已
[00:01.00] 作词 : 张国祥
[00:02.00] 作曲 :汤小康
[00:12.57]难以忘记初次见你
[00:16.86]一双迷人的眼睛
[00:21.46]在我脑海里
[00:23.96]你的身影挥散不去
[00:30.16]握你的双手感觉你的温柔
[00:34.94]真的有点透不过气
[00:39.68]你的天真 我想珍惜
[00:43.88]看到你受委屈我会伤心
[00:48.18]喔
[00:50.34]只怕我自己会爱上你
[00:55.07]不敢让自己靠的太近
[00:59.55]怕我没什么能够给你
[01:04.03]爱你也需要很大的勇气
[01:08.19]只怕我自己会爱上你
[01:12.91]也许有天会情不自禁
[01:17.38]想念只让自己苦了自己
[01:21.84]爱上你是我情非得已
[01:28.81]难以忘记初次见你
[01:33.17]一双迷人的眼睛
[01:37.70]在我脑海里你的身影 挥散不去
[01:46.36]握你的双手感觉你的温柔
[01:51.12]真的有点透不过气
[01:55.91]你的天真 我想珍惜
[02:00.15]看到你受委屈我会伤心
[02:04.49]喔
[02:06.54]只怕我自己会爱上你
[02:11.24]不敢让自己靠的太近
[02:15.75]怕我没什么能够给你
[02:20.20]爱你也需要很大的勇气
[02:24.57]只怕我自己会爱上你
[02:29.23]也许有天会情不自禁
[02:33.68]想念只让自己苦了自己
[02:38.14]爱上你是我情非得已
[03:04.06]什么原因耶
[03:07.73]我竟然又会遇见你
[03:13.02]我真的真的不愿意
[03:16.63]就这样陷入爱的陷阱
[03:20.70]喔
[03:22.91]只怕我自己会爱上你
[03:27.57]不敢让自己靠的太近
[03:32.04]怕我没什么能够给你
[03:36.56]爱你也需要很大的勇气
[03:40.74]只怕我自己会爱上你
[03:45.46]也许有天会情不自禁
[03:49.99]想念只让自己苦了自己
[03:54.51]爱上你是我情非得已
[03:58.97]爱上你是我情非得已
[04:27:00]
[04:27:00]
[04:27:00]
[04:27:00]
[04:27:00]
[04:27:00]
[04:27:00]
[04:27:00]`;
// 最开始获取到的歌词列表是字符串类型（不好操作）
var lrcArr = lrc.split('\n');
// 接收修正后的歌词数组
var result = [];
// 获取所要用到的dom列表
doms = {
    audio: document.querySelector("audio"),
    ul: document.querySelector("ul"),
    container: document.querySelector(".container")
}
// 将歌词数组转成由对象组成的数组，对象有time和word两个属性（为了方便操作）
for (var i = 0; i < lrcArr.length; i++) {
    var lrcData = lrcArr[i].split(']');
    var lrcTime = lrcData[0].substring(1);
    var obj = {
        time: parseTime(lrcTime),
        word: lrcData[1]
    }
    result.push(obj);
}
// 将tiem转换为秒的形式
function parseTime(lrcTime) {
    lrcTimeArr = lrcTime.split(":")
    return +lrcTimeArr[0] * 60 + +lrcTimeArr[1];
}
// 获取当前播放到的歌词的下标
function getIndex() {
    var Time = doms.audio.currentTime;
    for (var i = 0; i < result.length; i++) {
        if (result[i].time > Time) {
            return i - 1;
        }
    }
}
// 创建歌词列表
function createElements() {
    var frag = document.createDocumentFragment(); // 文档片段
    for (var i = 0; i < result.length; i++) {
        var li = document.createElement("li");
        li.innerText = result[i].word;
        frag.appendChild(li);
    }
    doms.ul.appendChild(frag);
}
createElements();
// 获取显示窗口的可视高度
var containerHeight = doms.container.clientHeight;
// 获取歌词列表的可视高度
var liHeight = doms.ul.children[0].clientHeight;
// 设置最大最小偏移量，防止显示效果不佳
var minOffset = 0;
var maxOffset = doms.ul.clientHeight - containerHeight;
// 控制歌词滚动移动的函数
function setOffset() {
    var index = getIndex();
    // 计算滚动距离
    var offset = liHeight * index - containerHeight / 2 + liHeight / 2;
    if (offset < minOffset) {
        offset = minOffset;
    };
    if (offset > maxOffset) {
        offset = maxOffset;
    };
    // 滚动
    doms.ul.style.transform = `translateY(-${offset}px)`;
    // 清除之前的active
    var li = doms.ul.querySelector(".active")
    if (li) {
        li.classList.remove("active");
    }
    // 为当前所唱到的歌词添加active
    li = doms.ul.children[index];
    if (li) {
        li.classList.add("active");
    }
};
// 当audio的播放时间更新时，触发该事件
doms.audio.addEventListener("timeupdate", setOffset);