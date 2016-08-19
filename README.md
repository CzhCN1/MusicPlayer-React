# MusicPlayer-React
&emsp;&emsp;MusicPlayer-React是一款网络音乐推荐的WEB应用，采用React+ES6的组件开发方法。   
&emsp;&emsp;项目地址：**苒朵音乐** http://gentlemanczh.com/MusicPlayer-React/

## 苒朵音乐
> 每天八首的神秘音乐，为您带来工作之余的极致享受。  
> 拒绝烂大街，发掘优秀冷门音乐，你的曲库从此不再歌荒。  

&emsp;&emsp;苒朵音乐取英语random谐音，所推荐的歌曲是随机推荐的，并不提供用户搜索等功能。曲库音乐均是小众冷门的良曲，带给用户神秘和发掘的感受，拒绝烂大街的“神曲”。
## 功能介绍
1. 歌曲均以黑胶CD的形式展示，音乐播放时伴有CD旋转动画。
2. 多种控制方式：可点击界面的CD、点击控制条、键盘(空格播放、左右切歌、上下调节音量)。
3. 右键点击喜欢的CD，查看歌曲信息，良曲get!

# 组件介绍
## 核心组件 AppComponent
&emsp;&emsp;该组件是本应用的核心组件，用于管理其他的子组件。负责整个应用的状态管理，子组件prop的分配，协调各组件工作等。

## 歌曲组件 CD
&emsp;&emsp;该组件负责将歌曲信息生成相应的CD组件，根据核心组件传来的参数控制virtualDOM的类名、样式等。

## H5音乐组件 Music
&emsp;&emsp;本应用的音频播放方式采用HTML5的**audio元素**替换古老的Flash。负责对应用最关键的音乐播放、暂停等操作进行控制。

## 控制条组件 Controller
&emsp;&emsp;控制条组件负责对点击事件的处理，协调应用的歌曲播放切换。

## 引导页组件 Guide
&emsp;&emsp;引导页组件，为初次使用本应用的用户做了简单的使用方法说明。通过LocalStorage对访问状态做了记录，之后的访问则只会显示欢迎页。

# 贡献
&emsp;&emsp;如果您有更好的建议和意见可以在issue中大方提出，更加期待您的pull request。

# License
MIT License
