import React from 'react';

class Guide extends React.Component {
  handleClick(){
    this.props.next();
  }

  render() {
    //遮罩层样式
    let overlayStyle = {
      background : 'rgba(0, 0, 0, 0.6)'
    };

    let config = this.props.config;
    let step = this.props.step;
    let guideUnits = [];

    //检测是否浏览过引导页
    if(localStorage.randuoMusic == 'done' && (step === 0)){
      return (
        <div className="guidePage">
          <div className="overlay" style={overlayStyle}/>
          <div className="guide-hello">
            <h3>欢迎回来</h3>
            <p>苒朵音乐已为您准备了优美的音乐</p>
            <p>开始欣赏吧！</p>
            <div className="scratch"/>
            <div className="next-btn" onClick={this.handleClick.bind(this)} >开始使用</div>
            <div className="information">
              <p>版本:v0.1</p>
              <p>作者:CZH</p>
              <p>邮箱:czh_xaut@163.com</p>
              <p>开源协议:MIT</p>
              <p>
                项目地址: https://github.com/CzhCN1/MusicPlayer-React
              </p>
            </div>
          </div>
        </div>
      );
    }
    //如果引导页面结束
    //该组件返回null
    if(step == config.length){
      //用localStorage保存是否看过引导页的状态
      if(!localStorage.randuoMusic){
        localStorage.randuoMusic = 'done';
      }
      return null;
    }

    //如果当前是欢迎界面
    if(step === 0){
      let pList = [];
      for(let i = 1;i<config.hello.length;i++){
        pList.push(<p key={i}>{config.hello[i]}</p>)
      }
      guideUnits.push(
        <div className="guide-hello">
          <h3>{config.hello[0]}</h3>
          {pList}
          <div className="scratch"/>
          <div className="next-btn" onClick={this.handleClick.bind(this)} >NEXT</div>
        </div>
      )
    }else if(step === (config.length - 1)){
    //如果当前是引导的结束界面
    let pList = [];
    for(let i = 1;i<config.bye.length;i++){
      pList.push(<p key={i}>{config.bye[i]}</p>)
    }
    guideUnits.push(
      <div className="guide-bye">
        <h3>{config.bye[0]}</h3>
        {pList}
        <div className="scratch"/>
        <div className="next-btn" onClick={this.handleClick.bind(this)} >开始使用</div>
        <div className="information">
          <p>版本:v0.1</p>
          <p>作者:CZH</p>
          <p>邮箱:czh_xaut@163.com</p>
          <p>开源协议:MIT</p>
          <p>
            项目地址: https://github.com/CzhCN1/MusicPlayer-React
          </p>
        </div>
      </div>
    )
    }else{
    //如果当前是引导的中间页
      overlayStyle.background = 'none';
      //拿到焦点目标
      let target = config['step'+step][2];
      //获取箭头的方向类型
      let arrowType = config['step'+step][1];
      //获取文本内容
      let text = config['step'+step][0];
      // 如果该目标节点已经渲染
      if(target){
        //相应的样式
        let styleObj = {
          position : 'absolute',
          zIndex : '999998',
          boxShadow : 'rgba(0, 0, 0, 0.6) 0px 0px 1px 10000px',
          padding : '10px'
        };
        //取出聚焦目标的相关位置参数
        styleObj.width = target.offsetWidth;
        styleObj.height = target.offsetHeight;
        var left = target.style.left,
            top = target.style.top;
        if(!(left && top)){
          left = window.getComputedStyle(target,null).left;
          top = window.getComputedStyle(target,null).top;
        }
        styleObj.marginLeft = window.getComputedStyle(target,null)['margin-left'] ? window.getComputedStyle(target,null)['margin-left'] : '0px';
        styleObj.marginTop = window.getComputedStyle(target,null)['margin-top'] ? window.getComputedStyle(target,null)['margin-top'] : '0px';
        styleObj.top = (parseInt(top) - 10);
        styleObj.left = (parseInt(left) - 10);
        //添加聚焦div
        guideUnits.push(
          <div className="overlay-hole" style={styleObj}>
            <div style={{
                width: '100%',
                height: '100%',
                position:'absolute',
                top: '0',
                left: '0',
                boxShadow: 'inset 0 0 10px 10px rgba(0, 0, 0, 0.6)'
              }}/>
          </div>
        )

        //箭头图片的样式
        //样式路径通过类名添加
        let arrowStyle = {
          position : 'absolute',
          zIndex : '999999'
        };
        let arrowClass = 'arrow-' + arrowType;
        //文本样式
        let textStyle = {
          position : 'absolute',
          width : '350px',
          zIndex : '999999'
        };
        //如果是上下箭头
        if(arrowType == 'top' || arrowType == 'bottom'){
          arrowStyle.width = '75px';
          arrowStyle.height = '86px';
          //如果是上箭头
          if(arrowType == 'top'){
            //箭头图片位置设置
            arrowStyle.top = styleObj.top + styleObj.height - 50;
            arrowStyle.left = styleObj.left + styleObj.width / 2 - 150;
            guideUnits.push(
              <div className = {arrowClass} style={arrowStyle} />
            );
            //添加文本内容位置设置
            textStyle.top = arrowStyle.top + 100;
            textStyle.left = arrowStyle.left - 195;

          }
          //如果是下箭头
          if(arrowType == 'bottom'){
            //箭头图片位置设置
            arrowStyle.top = styleObj.top - 90;
            arrowStyle.left = styleObj.left + styleObj.width / 2 - 150;
            guideUnits.push(
              <div className = {arrowClass} style={arrowStyle} />
            );
            //添加文本内容位置设置
            textStyle.top = arrowStyle.top - 110;
            textStyle.left = arrowStyle.left - 100;
          }

        }else{
          //如果是左右箭头
          arrowStyle.width = '105px';
          arrowStyle.height = '56px';
          //如果是左箭头
          if(arrowType == 'left'){
            //箭头图片位置设置
            arrowStyle.top = styleObj.top + styleObj.height / 2;
            arrowStyle.left = styleObj.left + styleObj.width;
            guideUnits.push(
              <div className = {arrowClass} style={arrowStyle} />
            );
            //添加文本内容位置设置
            textStyle.top = arrowStyle.top - 20;
            textStyle.left = arrowStyle.left + 110;
          }
          //如果是右箭头
          if(arrowType == 'right'){
            //箭头图片位置设置
            arrowStyle.top = styleObj.top + 130;
            arrowStyle.left = styleObj.left - 90;
            guideUnits.push(
              <div className = {arrowClass} style={arrowStyle} />
            );
            //添加文本内容位置设置
            textStyle.top = arrowStyle.top - 20;
            textStyle.left = arrowStyle.left - 360;
          }
        }
        guideUnits.push(
          <div className = 'guide-text' style={textStyle}>
            {text}
            <div className="next-btn"  onClick={this.handleClick.bind(this)} >NEXT</div>
          </div>
        );
      }
    }

    return (
      <div className="guidePage">
        <div className="overlay" style={overlayStyle}/>
        {guideUnits}
      </div>
    );
  }
}

Guide.defaultProps = {
};


export default Guide;
