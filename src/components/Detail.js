import React from 'react';

class Detail extends React.Component {
  render() {
    var songs = this.props.data;
    return (
      <div className="detail">
        <h1>{songs.name}</h1>
        <p>歌手: {songs.singer}</p>
      </div>
    );
  }
}

Detail.defaultProps = {
};


export default Detail;
