import React from 'react';

class Music extends React.Component{
  //音乐播放完毕执行函数
  handleEnded(e) {
    //切换播放状态
    this.props.play();

    e.stopPropagation();
    e.preventDefault();

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
