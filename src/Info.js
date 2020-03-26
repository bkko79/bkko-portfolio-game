import React from 'react';
import ReactPlayer from 'react-player';
import { CSSTransition } from 'react-transition-group';
import { IoMdPricetag } from 'react-icons/io';
import { GiTwoCoins } from 'react-icons/gi';
import './sass/info.scss';
import './sass/transition.css';

export default class Info extends React.Component {
  state = {
    cartridgeTouched: false,
  }

  setCartridgeTouched = () => {
    this.setState({
      cartridgeTouched: !this.state.cartridgeTouched,
    })
  }

  render(){
    const { Games, currentGame, inProps } = this.props;
    const title = Games[currentGame].title;
    const movie = Games[currentGame].main_movie;
    const desc = Games[currentGame].desc;
    const release = new Date(Games[currentGame].release);
    const price = Games[currentGame].price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const point = Math.floor(Games[currentGame].price * 0.05);
    const link = Games[currentGame].link;
    const scGroup = Games[currentGame].scgroup;
    const bgGroup = [];
    Array.from(Array(3)).forEach(() => {
      scGroup.map((sc) => (bgGroup.push(sc)) )
    });
    return (
      <div className="info-wrapper">
        <div className="screenshot-wrapper">
          {bgGroup.map((sc, i) => (
            <div key={i} className="screenshot">
              <CSSTransition in={inProps} timeout={600} classNames="sc">
                <img rel="preload" src={require(`${sc}`)} alt={i} />
              </CSSTransition>
            </div>
          ))}
        </div>
        <CSSTransition in={inProps} timeout={500} classNames="title">
          <div className="title-wrapper wf-roundedmplus1c">
              <h1>{title}</h1>
          </div>
        </CSSTransition>
        <div className="release-date-wrapper">
          <div className="release-date-title wf-notosansjapanese">
            配信日
          </div>
          <div className="release-date wf-notosansjapanese">
            {release.toLocaleString("ja-jp", {year:'numeric'})}
            {release.toLocaleString("ja-jp", {month:'short'})}
            {release.toLocaleString("ja-jp", {day:'numeric'})}
          </div>
        </div>
        <IoMdPricetag className="price-tag" size='200' color='linen'/>
        <div className="price-wrapper wf-notosansjapanese">
          <div className="price-text">{price}円</div>
          <div className="point-text"><GiTwoCoins color='gold'/>+{point}</div>
        </div>
        <CSSTransition in={inProps} timeout={500} classNames="info">
          <div className={`info-desc ${this.state.cartridgeTouched && 'cartridgeTouched'}`}>
            <div className="info-desc-text wf-roundedmplus1c">
              {desc.split('\n').map((item, i) => { return <p key={i}>{item}</p>; })}
            </div>
          </div>
        </CSSTransition>
        <CSSTransition in={inProps} timeout={500} classNames="info">
          <div className={`youtube ${this.state.cartridgeTouched && 'cartridgeTouched'}`}>
            <ReactPlayer 
              url={movie}
              control='false'
              width='100%'
              height='100%'
            />
          </div>
        </CSSTransition>
        <div className="detail-wrapper" onTouchStart={this.setCartridgeTouched} />
        <div className="purchase-wrapper">
          <a href={link} target="_blank" rel="noopener noreferrer">
            <div className="purchase-message wf-notosansjapanese">買う</div>
          </a>
        </div>
      </div>
    );
  }
}