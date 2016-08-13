import React from 'react';


class CD extends React.Component {

  render() {
    //设置CD的位置样式
    var  CDstyle= this.props.arrange.pos;

    //设置中心图片的样式
    var styleObj = {
      backgroundImage : 'url(' + this.props.data.imageURL +')'
    };
    return (
      <section className = "CD" style={CDstyle}>
        <div className = "centerImg" style={styleObj}>
        </div>
      </section>
    );
  }
}

CD.defaultProps = {
};


export default CD;
