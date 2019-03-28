
<template>
    <div>
        <div id="player-box" class="player" style="height: 812px">
            <video src="" poster="" autoplay="autoplay" type="video/mp4" preload="auto" loop="loop" x5-video-player-type="h5" x5-video-player-fullscreen="portraint" webkit-playsinline="true" playsinline="true" raw-controls="true" x-webkit-airplay="true" x5-video-orientation="portraint" class="video-player" ></video>
            <div class="playTip icon-bofang" style="display: none"></div>
            <div class="open-tb-tip" style="display: none"></div>
            <div class="video-desc">
                <p class="author-name" v-text=""></p>
                <p class="desc" v-text=""></p>
            </div>
            <div class="play-control" style="display: none;">
                <ul>
                    <li class="icon-ai10"></li>
                    <li class="icon-bofang" style="display: none;"></li> <li class="icon-ai07" style=""></li>
                    <li class="icon-ai09"></li>
                </ul>
            </div>
            <span style="display: none" v-text="">mei-pai</span>
            <div style="display: none;">
                <div class="prev_video">
                    <img src="" lazy="loading" style="height: 812px;">
                </div>
            </div>
            <div  style="display: none"></div>
        </div>
        <div class="turnoff">
            <ul>
                <li>
                    <a class="control-icon"><img id="avatar" src="" class="author-avatar">
                    </a>
                </li> 
                <li class="control-icon">
                    <i class="icon-xin">
                        <p class="statistics-num" v-text=""></p>
                    </i>
                    <span></span>
                </li>
                <li class="control-icon">
                    <i class="icon-wodepinglun">
                        <p class="statistics-num"v-text=""></p>
                    </i> 
                    <span></span>
                </li> 
                <li>
                    <a class="icon-fenxiang control-icon"></a>
                </li>
                <li>
                    <span class="unread">⋅</span>
                    <a class="icon-baokuan control-icon" style="display: table-caption;"></a>
                </li> 
                <li>
                    <a data-clipboard-text="" id="open-tb" class="icon-taobao control-icon" style="display: none;"></a>
                </li>
            </ul>
        </div>
        <div class="share-background" style="display: none;">
          <div class="share-pannel">
            <h4>分享到</h4>
            <div style="height: 60%;">
              <ul>
                <li class="share-item">
                  <div>
                    <a href="" target="_blank" @click="">
                      <i class="icon-xiazai"></i>
                      <p>保存至相册</p>
                  </a>
              </div>
          </li>
          <li class="share-item">
              <div data-clipboard-text="https://h5.kuaiyinshi.com/?video_id=5c6ab0e102f47s1hrjfdjc5437_H264_1_5d969e66218c95&amp;source=kuai-shou" id="share-url">
                <a>
                  <i class="icon-lianjie"></i>
                  <p>复制链接</p>
              </a>
          </div>
      </li>
  </ul>
</div>
<div class="share-cancel">
  <p>取消</p>
</div>
</div>
</div>
</div>
</template>
<script>


    export default {
        data(){
           return { 
            videoList:[],
            }
        }
    }
</script>
<style scoped>
.video-player {
    width: 100%;
    height: 100%;
}
.open-tb-tip, .playTip {
    position: absolute;
    text-align: center;
    top: 50%;
    margin-top: -55px;
    color: #fff;
}
.playTip {
    line-height: 110px;
    left: 55%;
    margin-left: -55px;
    font-size: 60px;
    border-radius: 50%;
    opacity: .7;
}
.open-tb-tip {
    line-height: 70px;
    left: 15%;
    font-size: 20px;
    border-radius: 5px;
    opacity: .8;
    background: #000;
}
.open-tb-tip, .playTip {
    position: absolute;
    text-align: center;
    top: 50%;
    margin-top: -55px;
    color: #fff;
}
.video-desc {
    position: absolute;
    z-index: 9;
    width: 100%;
    height: 48px;
    bottom: 60px;
    border-radius: 0 0 3px 3px;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    color: #fff;
    padding: 0 1px 0 4px;
}
.author-name {
    text-shadow: #454b52 0.1em 0.1em 0.1em;
    font-weight: 700;
}
.author-name, .statistics-num {
    font-size: 14px;
}
.video-desc .desc {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 13px;
    line-height: 16px;
    text-shadow: #454b52 0.1em 0.1em 0.1em;
}
.play-control {
    position: fixed;
    left: 0;
    bottom: 2.59rem;
    height: 2.59rem;
    width: 100%;
    background-color: #000;
    background-color: rgba(0,0,0,.2);
    z-index: 999;
}
.play-control>ul>li {
    float: left;
    width: 33%;
    line-height: 3rem;
    font-size: 2rem;
    text-align: center;
}
.prev_video {
    position: absolute;
    top: 0;
    left: 0;
}
.next_video>img, .prev_video>img {
    width: 100%;
}
fieldset, img {
    border: 0;
}
.turnoff {
    position: absolute;
    z-index: 98;
    right: 0;
    top: 20%;
}
li {
    list-style: none;
}
.control-icon {
    display: block;
    width: 58px;
    height: 36px;
    line-height: 18px;
    margin-bottom: 18px;
    text-align: center;
    font-size: 1.8rem;
    color: #fff;
    text-shadow: #454b52 0.1em 0.1em 0.1em;
}
a {
    color: #c7c7c7;
    -webkit-backface-visibility: hidden;
    text-decoration: none;
}
.author-avatar {
    width: 35px;
    border-radius: 50%;
    margin-right: 5px;
}
.unread {
    float: right;
    margin-right: 1em;
    background: #e74c3c;
    width: 1em;
    border-radius: 50%;
    font-size: .75em;
    line-height: 1;
    text-align: center;
    color: #e74c3c;
}
.share-background {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1050;
    overflow: hidden;
    outline: 0;
    overflow-x: hidden;
    overflow-y: auto;
}

</style>
