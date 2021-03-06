import React from 'react';
import {CSSTransition} from 'react-transition-group';
import './sass/stripe.scss';

export default class Stripe extends React.Component {
  state = {
    width: window.innerWidth,
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.colorSet !== nextProps.colorSet || this.state.width !== nextState.width;
  }

  getRgba = (chip, i) => {
    let text = 'rgba(';
    chip.map((color) => (
      text += `${color},`
    ));
    text += '0.8)';
    let width = this.state.width * 1.5;
    let height = (Math.random() * 200) + 200;
    let styles = {
      position: 'absolute',
      top: `${(300 * i)-450}px`,
      left: `-${(width / 2) -(window.innerWidth / 2)}px`,
      width: `${width}px`,
      height: `${height}px`,
      backgroundColor: text,
      boxShadow: '0 0.2rem 1.2rem rgba(0,0,0,0.2)',
      transform: 'rotate(20deg)',
    }
    return styles;
  } 

  render(){
    const { colorSet, inProps } = this.props;
    let colorGroup = [];
    Array.from(Array(1)).forEach(() => {
      colorSet.map((chip) => (colorGroup.push(chip)) )
    });
    return(
        <div className="bgblock-wrapper">
        {colorGroup.map((chip,i) => (
          <CSSTransition key={i} in={inProps} timeout={1000} classNames="stripe">
            <div className="bgblock" style={this.getRgba(chip, i)} />
          </CSSTransition>
        ))}
        </div>
    )
  }
}