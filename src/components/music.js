import React from 'react';

class Music extends React.Component{
  //音乐播放完毕执行函数
  handleEnded(e) {
    //切换播放状态
    this.props.play();

    e.stopPropagation();
    e.preventDefault();

  }
  //组件加载完成之后
  componentDidMount(){

    //监听键盘的按键事件
    //上方向键：加音量
    //下方向键：减音量
    //左方向键：前一首歌
    //右方向键：下一首歌
    //空格键  ：暂停
    document.addEventListener('keyup',function(e){
      // var audio = ReactDOM.findDOMNode(this.refs.audio);
      var audio = document.getElementsByTagName('audio')[0];
      console.log(e.keyCode);
      //调节音量大小
      if(e.keyCode == 38 && audio.volume < 1){
        audio.volume += 0.1;
      }
      if(e.keyCode == 40 && audio.volume > 0){
        audio.volume -= 0.1;
      }
      //切换歌曲
      //通过模仿点击CD事件达到切换的效果
      //下一首
      if(e.keyCode == 39 && this.props.index < 7){
        let cd = document.getElementsByClassName('CD')[this.props.index + 1];
        cd.click();
      }
      //上一首
      if(e.keyCode == 37 && this.props.index > 0){
        let cd = document.getElementsByClassName('CD')[this.props.index - 1];
        cd.click();
      }
      //暂停歌曲
      if(e.keyCode == 32){
        let cd = document.getElementsByClassName('CD')[this.props.index];
        cd.click();
      }
    }.bind(this),false);
  }

  render() {
    var songs = this.props.data;
    return (
      <audio onEnded={this.handleEnded.bind(this)}>
        <source src = {songs}/>
        你的浏览器暂不支持H5的audio，建议使用Chrome浏览器访问。
      </audio>
    );
  }
}

Music.defaultProps = {
};

export default Music;
