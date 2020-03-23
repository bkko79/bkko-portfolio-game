import React from 'react';
import initialDatas from './initial-datas';
import Stripe from './Stripe';
import Info from './Info';
import Carousel from './Carousel';
import './sass/app.scss';
import logo from './imgs/logo.svg';
import heart from './imgs/heart.svg';
import search from './imgs/search.svg';

function importAll(r) {
  let images = {};
  r.keys().map((item) => { images[item.replace('./', '')] = r(item); return 1;});
  return images;
};

class App extends React.Component {
  state = {
    //First set as example for understanding very first state view
    currentGame: "animal",
    colorSet: [
      [135, 201, 235],
      [45, 139, 113],
      [148, 142, 53],
      [125, 165, 107],
      [227, 208, 175],
      [147, 84, 111],
      [87, 132, 196],
    ],
  }

  setCurentGame = (id) => {
    this.setState({
      currentGame: id,
    })
  }

  setColorSet = (newColorSet) => {
    this.setState({
      colorSet: newColorSet,
    })
  }

  render(){
    const Games = initialDatas.games;
    const { currentGame, colorSet } = this.state;
    const { setCurentGame, setColorSet } = this;
    return(
      <>
      <div className="header">
        <img src={logo} alt="nintendo logo"/>
        <div className="header-right">
          <img src={heart} height="18px" alt="nintendo heart"/>
          <img src={search} height="18px" alt="nintendo search"/>
        </div>
      </div>
      <Stripe colorSet={colorSet} />
      <Info Games={Games} currentGame={currentGame} importImage={importAll} />
      <Carousel Games={Games} setCurrentGame={setCurentGame} importImage={importAll} setColorSet={setColorSet} />
      <div className="footer"><p>©Nintendo Japan</p></div>
      </>
    )
  }
}

export default App;
