<template>
  <main id="home" class="view" role="main">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position:absolute;width:0;height:0"><defs><symbol viewBox="0 0 64 64" id="reload"><title>Share Icons Copy</title><path d="M59.177 29.5s-1.25 0-1.25 2.5c0 14.471-11.786 26.244-26.253 26.244C17.206 58.244 5.417 46.47 5.417 32c0-13.837 11.414-25.29 25.005-26.26v6.252c0 .622-.318 1.635.198 1.985a1.88 1.88 0 0 0 1.75.19l21.37-8.545c.837-.334 1.687-1.133 1.687-2.384C55.425 1.99 53.944 2 53.044 2h-21.37C15.134 2 1.667 15.46 1.667 32c0 16.543 13.467 30 30.007 30 16.538 0 29.918-13.458 29.993-30 .01-2.5-1.24-2.5-1.24-2.5h-1.25" fill-rule="evenodd"></path></symbol><symbol viewBox="0 -2 59.75 60.25" id="loading"><path fill="#ccc" d="M29.691-.527c-15.648 0-28.333 12.685-28.333 28.333s12.685 28.333 28.333 28.333c15.648 0 28.333-12.685 28.333-28.333S45.339-.527 29.691-.527zm.184 53.75c-14.037 0-25.417-11.379-25.417-25.417S15.838 2.39 29.875 2.39s25.417 11.379 25.417 25.417-11.38 25.416-25.417 25.416z"></path><path fill="none" stroke="#108ee9" stroke-width="3" stroke-linecap="round" stroke-miterlimit="10" d="M56.587 29.766c.369-7.438-1.658-14.699-6.393-19.552"></path></symbol><symbol viewBox="0 0 48 48" id="check-circle-o"><g fill-rule="evenodd"><path d="M24 48c13.255 0 24-10.745 24-24S37.255 0 24 0 0 10.745 0 24s10.745 24 24 24zm0-3c11.598 0 21-9.402 21-21S35.598 3 24 3 3 12.402 3 24s9.402 21 21 21z"></path><path d="M12.2 23.2L10 25.3l10 9.9L37.2 15 35 13 19.8 30.8z"></path></g></symbol></defs></svg>
    <div id="dpr" class="box"></div>
    <div id="rem" class="box"></div>
    <div class="page">
      <div class="navbar">
        <div class="nav-item is-on">
          选项卡一
        </div>
        <div class="nav-item">
          选项卡二
        </div>
        <div class="nav-item">
          选项卡三
        </div>
        <div class="nav-item">
          选项卡四
        </div>
      </div>
      <ul class="list">
        <li class="item">文本</li>
        <li class="item">文本</li>
        <li class="item">文本</li>
        <li class="item">文本</li>
        <li class="item">文本</li>
        <li class="item">文本</li>
        <li class="item">文本</li>
        <li class="item">文本</li>
      </ul>
      <div style="font-size: .16rem;">16px ~ 8pt, 微小的 </div>
      <div style="font-size: .24rem;">24px ~ 12pt, 最小文本说明 </div>
      <div style="font-size: .28rem;">28px ~ 14pt, 页面辅助信息 </div>
      <div style="font-size: .30rem;">30px ~ 15pt, 主标题 </div>
      <div style="font-size: .32rem;">32px ~ 16pt, 单行列表内，右方操作说明的信息文字</div>
      <div style="font-size: .34rem;">34px ~ 17pt, 单行列表内，左方标题文字 </div>
      <div style="font-size: .36rem;">36px ~ 18pt, 页面顶部标题，大按钮字体 </div>
      <div style="font-size: .60rem;">60px ~ 30pt, 金额展示 </div>

      <h3>Spacing</h3>
      <ul class="wireframe-list">
        <li>
          <div class="wf-box wf-tiny"></div> 8 ~ tiny
        </li>
        <li>
          <div class="wf-box wf-small"></div> 16 ~ tiny
        </li>
        <li>
          <div class="wf-box wf-base"></div> 24 ~ base
        </li>
        <li>
          <div class="wf-box wf-large"></div> 48 ~ large
        </li>
        <li>
          <div class="wf-box wf-x-large"></div> 48 ~ x-large
        </li>
      </ul>

      <p>文本段落文本段落文本段落文本段落文本段落</p>

      <div class="btn-container">
        <md-button @click="handleClick">点我</md-button>
        <button class="btn">button</button>
        <button class="btn" type="button">button</button>
        <button class="btn" type="submit">submit</button>
        <button class="btn" type="reset">reset</button>

        <input class="btn" type="button" value="input button">
        <input class="btn" type="submit" value="input submit">
        <input class="btn" type="reset" value="input reset">
        <a class="btn" role="button">超链接按钮</a>
        <div class="btn" role="button">div按钮</div>

        <button type="button" class="btn btn-icon">
          <span class="icon"><img src="data:image/png;base64,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"></span>
          <span>有bug, button按钮</span>
        </button>

        <button type="button" class="btn btn-icon"><svg class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#loading"></use></svg><span>svg icon button</span></button>

        <a role="button" class="btn btn-icon">
          <span class="icon"><img src="data:image/png;base64,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"></span>
          <span>超链接按钮</span>
        </a>
        <a role="button" class="btn btn-icon"><svg class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#check-circle-o"></use></svg><span>svg icon</span></a>
      </div>


      <div class="tabbar is-fixed">
        <a class="tab-item is-on">
          <div class="tab-item-icon"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAKQWlDQ1BJQ0MgUHJvZmlsZQAASA2dlndUU9kWh8+9N73QEiIgJfQaegkg0jtIFQRRiUmAUAKGhCZ2RAVGFBEpVmRUwAFHhyJjRRQLg4Ji1wnyEFDGwVFEReXdjGsJ7601896a/cdZ39nnt9fZZ+9917oAUPyCBMJ0WAGANKFYFO7rwVwSE8vE9wIYEAEOWAHA4WZmBEf4RALU/L09mZmoSMaz9u4ugGS72yy/UCZz1v9/kSI3QyQGAApF1TY8fiYX5QKUU7PFGTL/BMr0lSkyhjEyFqEJoqwi48SvbPan5iu7yZiXJuShGlnOGbw0noy7UN6aJeGjjAShXJgl4GejfAdlvVRJmgDl9yjT0/icTAAwFJlfzOcmoWyJMkUUGe6J8gIACJTEObxyDov5OWieAHimZ+SKBIlJYqYR15hp5ejIZvrxs1P5YjErlMNN4Yh4TM/0tAyOMBeAr2+WRQElWW2ZaJHtrRzt7VnW5mj5v9nfHn5T/T3IevtV8Sbsz55BjJ5Z32zsrC+9FgD2JFqbHbO+lVUAtG0GQOXhrE/vIADyBQC03pzzHoZsXpLE4gwnC4vs7GxzAZ9rLivoN/ufgm/Kv4Y595nL7vtWO6YXP4EjSRUzZUXlpqemS0TMzAwOl89k/fcQ/+PAOWnNycMsnJ/AF/GF6FVR6JQJhIlou4U8gViQLmQKhH/V4X8YNicHGX6daxRodV8AfYU5ULhJB8hvPQBDIwMkbj96An3rWxAxCsi+vGitka9zjzJ6/uf6Hwtcim7hTEEiU+b2DI9kciWiLBmj34RswQISkAd0oAo0gS4wAixgDRyAM3AD3iAAhIBIEAOWAy5IAmlABLJBPtgACkEx2AF2g2pwANSBetAEToI2cAZcBFfADXALDIBHQAqGwUswAd6BaQiC8BAVokGqkBakD5lC1hAbWgh5Q0FQOBQDxUOJkBCSQPnQJqgYKoOqoUNQPfQjdBq6CF2D+qAH0CA0Bv0BfYQRmALTYQ3YALaA2bA7HAhHwsvgRHgVnAcXwNvhSrgWPg63whfhG/AALIVfwpMIQMgIA9FGWAgb8URCkFgkAREha5EipAKpRZqQDqQbuY1IkXHkAwaHoWGYGBbGGeOHWYzhYlZh1mJKMNWYY5hWTBfmNmYQM4H5gqVi1bGmWCesP3YJNhGbjS3EVmCPYFuwl7ED2GHsOxwOx8AZ4hxwfrgYXDJuNa4Etw/XjLuA68MN4SbxeLwq3hTvgg/Bc/BifCG+Cn8cfx7fjx/GvyeQCVoEa4IPIZYgJGwkVBAaCOcI/YQRwjRRgahPdCKGEHnEXGIpsY7YQbxJHCZOkxRJhiQXUiQpmbSBVElqIl0mPSa9IZPJOmRHchhZQF5PriSfIF8lD5I/UJQoJhRPShxFQtlOOUq5QHlAeUOlUg2obtRYqpi6nVpPvUR9Sn0vR5Mzl/OX48mtk6uRa5Xrl3slT5TXl3eXXy6fJ18hf0r+pvy4AlHBQMFTgaOwVqFG4bTCPYVJRZqilWKIYppiiWKD4jXFUSW8koGStxJPqUDpsNIlpSEaQtOledK4tE20Otpl2jAdRzek+9OT6cX0H+i99AllJWVb5SjlHOUa5bPKUgbCMGD4M1IZpYyTjLuMj/M05rnP48/bNq9pXv+8KZX5Km4qfJUilWaVAZWPqkxVb9UU1Z2qbapP1DBqJmphatlq+9Uuq43Pp893ns+dXzT/5PyH6rC6iXq4+mr1w+o96pMamhq+GhkaVRqXNMY1GZpumsma5ZrnNMe0aFoLtQRa5VrntV4wlZnuzFRmJbOLOaGtru2nLdE+pN2rPa1jqLNYZ6NOs84TXZIuWzdBt1y3U3dCT0svWC9fr1HvoT5Rn62fpL9Hv1t/ysDQINpgi0GbwaihiqG/YZ5ho+FjI6qRq9Eqo1qjO8Y4Y7ZxivE+41smsImdSZJJjclNU9jU3lRgus+0zwxr5mgmNKs1u8eisNxZWaxG1qA5wzzIfKN5m/krCz2LWIudFt0WXyztLFMt6ywfWSlZBVhttOqw+sPaxJprXWN9x4Zq42Ozzqbd5rWtqS3fdr/tfTuaXbDdFrtOu8/2DvYi+yb7MQc9h3iHvQ732HR2KLuEfdUR6+jhuM7xjOMHJ3snsdNJp9+dWc4pzg3OowsMF/AX1C0YctFx4bgccpEuZC6MX3hwodRV25XjWuv6zE3Xjed2xG3E3dg92f24+ysPSw+RR4vHlKeT5xrPC16Il69XkVevt5L3Yu9q76c+Oj6JPo0+E752vqt9L/hh/QL9dvrd89fw5/rX+08EOASsCegKpARGBFYHPgsyCRIFdQTDwQHBu4IfL9JfJFzUFgJC/EN2hTwJNQxdFfpzGC4sNKwm7Hm4VXh+eHcELWJFREPEu0iPyNLIR4uNFksWd0bJR8VF1UdNRXtFl0VLl1gsWbPkRoxajCCmPRYfGxV7JHZyqffS3UuH4+ziCuPuLjNclrPs2nK15anLz66QX8FZcSoeGx8d3xD/iRPCqeVMrvRfuXflBNeTu4f7kufGK+eN8V34ZfyRBJeEsoTRRJfEXYljSa5JFUnjAk9BteB1sl/ygeSplJCUoykzqdGpzWmEtPi000IlYYqwK10zPSe9L8M0ozBDuspp1e5VE6JA0ZFMKHNZZruYjv5M9UiMJJslg1kLs2qy3mdHZZ/KUcwR5vTkmuRuyx3J88n7fjVmNXd1Z752/ob8wTXuaw6thdauXNu5Tnddwbrh9b7rj20gbUjZ8MtGy41lG99uit7UUaBRsL5gaLPv5sZCuUJR4b0tzlsObMVsFWzt3WazrWrblyJe0fViy+KK4k8l3JLr31l9V/ndzPaE7b2l9qX7d+B2CHfc3em681iZYlle2dCu4F2t5czyovK3u1fsvlZhW3FgD2mPZI+0MqiyvUqvakfVp+qk6oEaj5rmvep7t+2d2sfb17/fbX/TAY0DxQc+HhQcvH/I91BrrUFtxWHc4azDz+ui6rq/Z39ff0TtSPGRz0eFR6XHwo911TvU1zeoN5Q2wo2SxrHjccdv/eD1Q3sTq+lQM6O5+AQ4ITnx4sf4H++eDDzZeYp9qukn/Z/2ttBailqh1tzWibakNml7THvf6YDTnR3OHS0/m/989Iz2mZqzymdLz5HOFZybOZ93fvJCxoXxi4kXhzpXdD66tOTSna6wrt7LgZevXvG5cqnbvfv8VZerZ645XTt9nX297Yb9jdYeu56WX+x+aem172296XCz/ZbjrY6+BX3n+l37L972un3ljv+dGwOLBvruLr57/17cPel93v3RB6kPXj/Mejj9aP1j7OOiJwpPKp6qP6391fjXZqm99Oyg12DPs4hnj4a4Qy//lfmvT8MFz6nPK0a0RupHrUfPjPmM3Xqx9MXwy4yX0+OFvyn+tveV0auffnf7vWdiycTwa9HrmT9K3qi+OfrW9m3nZOjk03dp76anit6rvj/2gf2h+2P0x5Hp7E/4T5WfjT93fAn88ngmbWbm3/eE8/syOll+AAADVElEQVR4Ae2cS2siQRhFy0fUhRjxgQu34i7//09k4UIUEXElKigKIgma6OQrqJ7WsYNhgn0Wt0CqUs/b9/StuDLz+vp6dioYB7IYJRLiHRAQ2IsgIAICcwAmRwkREJgDMDlKiIDAHIDJUUIEBOYATI4SIiAwB2BylBABgTkAk6OECAjMAZgcJURAYA7A5CghAgJzACZHCREQmAMwOUqIgMAcgMlRQgQE5gBMjhIiIDAHYHKUEAGBOQCTo4QICMwBmBwlREBgDsDkKCECAnMAJkcJERCYAzA5SoiAwByAyVFCBATmAEyOEiIgMAdgcpAJOZ///T2cW30/9TJpj6T+n+7/G/NTA/L+/u56vZ5br9fRc5xOJzcej91wOHQ2Hspms3H9ft/NZrPQ9W09GAzcdDq9mGNrbQ/bK5Sk88J4GnVqQEqlkqvX6xfPvNvtXD6fd41G4wLUfD533W7XrVYrZyaGcjwefTPUob/dboemrz8/P/1+nU7HLRaLaCzpvGhCCo18CmcmHnk4HNzT05P/7Pf7aJ71FwoFl8vl3MfHh2/bNTOZTPxcg3sNIVr81bA1Btr2iMNLOi++9tHt1BJy60Ht7c9kMv4TT4KZf91vf1cqFX8FPT8/39ou6gv7Wkd839Bve8X7o4UpNFBALAFmvn2sHUo2m/V9ZlroD/NeXl5cPE1hTbwO622NtUNJOi+Mp1Gjriy7UrbbrTfd2qFY++3tzdn/Art6rNhbHa6pVqsVpt6s7Rq0q8q+KBSLxWhO0nnRhBQaf1+XFA6/PrJcLnvjl8ulq9Vq0XCz2fTfvKrVqgcRDdzZsFTY9TYajfwXhrAs6bwwnkadIf4Ipl0tloB4sesqft3Ex+5tJ+1x67x79/zteaiEhIe7hmH9/wvjuz1unRe0PLpGAnm0CaTzBIRE40uLgAgIzAGYHCVEQGAOwOQoIQICcwAmRwkREJgDMDlKiIDAHIDJUUIEBOYATI4SIiAwB2BylBABgTkAk6OECAjMAZgcJURAYA7A5CghAgJzACZHCREQmAMwOUqIgMAcgMlRQgQE5gBMjhIiIDAHYHKUEAGBOQCTo4QICMwBmBwlREBgDsDkKCECAnMAJkcJERCYAzA5SoiAwByAyVFCYED+ACg89cOH+URmAAAAAElFTkSuQmCC"></div>
          <div class="tab-item-label">
            首页
          </div>
        </a>
        <a class="tab-item">
          <div class="tab-item-icon"><img src="data:image/png;base64,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"></div>
          <div class="tab-item-label">
            消息
          </div>
        </a>
        <a class="tab-item">
          <div class="tab-item-icon"><img src="data:image/png;base64,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"></div>
          <div class="tab-item-label">
            发现
          </div>
        </a>
        <a class="tab-item">
          <div class="tab-item-icon"><img src="data:image/png;base64,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"></div>
          <div class="tab-item-label">
            我的
          </div>
        </a>
      </div>
    </div>
  </main>
</template>

<script>
import { Button, Toast } from 'mand-mobile';

export default {
  name: 'home-view',
  components: {
    [Button.name]: Button,
  },
  mounted() {
    this.renderFlexible('dpr', window.lib.flexible.dpr);
    this.renderFlexible('rem', window.lib.flexible.rem);
  },
  methods: {
    renderFlexible(id, value) {
      document.getElementById(id).innerHTML = value;
    },
    handleClick() {
      Toast.info('不错哟~');
    },
  },
};
</script>

<style scoped>
    /**
    * clearfix
    */
    .group:before,
    .group:after {
      content: " ";
      display: table;
    }

    .group:after {
      clear: both;
      visibility: hidden;
      font-size: 0;
      height: 0;
    }

    .group {
      *zoom: 1;
    }

    .navbar {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      text-align: center;
      margin-bottom: 0.1rem;
      background-color: #fff;
    }
      .nav-item {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        line-height: 0.6rem;
        padding: 0.1rem 0.15rem;
        font-size: 0.28rem;
      }
      .navbar .nav-item.is-on {
        border-bottom: 3px solid #F44360;
        color: #F44360;
        margin-bottom: -3px;
      }

    .tabbar {
      position: relative;
      background-color: #fafafa;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      text-align: center;
      padding-top: 1px;
    }
    .tabbar:before {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #000;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      z-index: 2;
    }
    .tabbar > .tab-item.is-on {
      background-color: #eee;
      color: #F44360;
    }
    .tabbar.is-fixed {
      position: fixed;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
    }

    .tab-item {
      display: block;
      padding: 0.096rem 0;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
    }
    .tab-item-icon {
      width: 0.48rem;
      height: 0.48rem;
      margin: 0 auto 0.05rem;
    }
    .tab-item-icon:empty {
      display: none
    }
    .tab-item-icon > * {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    .tab-item-label {
      font-size: .24rem;
      line-height: 1;
    }


    .list { margin-bottom: 0.1rem; }
      .list .item {
        position: relative;
        z-index: 1;
        text-align: center;
        line-height: 0.6rem;
        margin-bottom: 0.1rem;
        padding: 0.1rem 0.15rem;
        background-color: #fff;
        font-size: 0.32rem;
      }

      .list .item:before {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid #000;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        z-index: 2;
      }

      .list .item:after {
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 1px;
        border-bottom: 1px solid #000;
        -webkit-transform-origin: 0 100%;
        transform-origin: 0 100%;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        z-index: 2;
      }
    .btn {
      -webkit-appearance: none;
      outline: 0 none;
      border: 0 none;
      font-size: .36rem;
      height: .84rem;
      line-height: .84rem;
      border-radius: .1rem;
      color: #000;
      background-color: #fff;
      border: 1px solid #ddd;
      display: inline-block;
      vertical-align: middle;
      width: 100%;
      text-align: center;
    }

    .btn-icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }

      .btn-icon .icon { width: .48rem;height: .48rem;margin-right: 0.08rem; }
        .btn-icon .icon img { width: 100%;height: 100%;display: block; }
    .btn-container { padding: .2rem; }
    .btn-container .btn { margin: 0.08rem 0; }
    .page {
      background-color: #f8f8f8;
      padding-bottom: 0.96rem;
    }
    .box {
      background-color: #81C2D3;
      border: 1px solid #ddd;
      padding: 0.2rem;
      text-align: center;
      font-size: 0.24rem;
      color: #fff;
    }

    .wireframe-list li {
      padding: 0.2rem;
    }

    .wf-box {
      display: inline-block;
      vertical-align: middle;
      border: 2px dotted #00A699;
      font-size: 0;
      overflow: hidden;
    }
    .wf-tiny {
      width: 0.16rem;
      height: 0.16rem;
    }
    .wf-small {
      width: 0.32rem;
      height: 0.32rem;
    }
    .wf-base {
      width: 0.48rem;
      height: 0.48rem;
    }
    .wf-large {
      width: 0.96rem;
      height: 0.96rem;
    }
    .wf-x-large {
      width: 1.28rem;
      height: 1.28rem;
    }
</style>
