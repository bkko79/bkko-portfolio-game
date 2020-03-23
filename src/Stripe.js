import React from 'react';
import './sass/stripe.scss';

export default class Stripe extends React.Component {
  getRgba = (chip, i) => {
    let text = 'rgba(';
    chip.map((color) => (
      text += `${color},`
    ));
    text += '0.8)';
    let width = window.innerWidth * 3;
    let height = (Math.random() * 100) + 100;
    let styles = {
      position: 'absolute',
      top: `${(150 * i)-300}px`,
      left: `-${(width / 2) -(window.innerWidth / 2)}px`,
      width: `${width}px`,
      height: `${height}px`,
      backgroundColor: text,
      boxShadow: '0 0.2rem 1.2rem rgba(0,0,0,0.2)',
      transform: 'rotate(20deg)',
    }
    return styles;
  } 

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.colorSet !== nextProps.colorSet;
  }

  render(){
    const { colorSet } = this.props;
    let colorGroup = [];
    Array.from(Array(2)).forEach(() => {
      colorSet.map((chip) => (colorGroup.push(chip)) )
    });
    return(
      <div className="bgblock-wrapper">
      {colorGroup.map((chip,i) => (
          <div key={i} className="bgblock" style={this.getRgba(chip, i)} />
      ))}
      </div>
    )
  }
}