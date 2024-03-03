import './App.css';
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listeCouleur: ['green', 'red', 'yellow', 'blue'],
      coups: [],
      coupsJoueurs: [],
      activeColor: '',
      userBlock: true,
      gameOver: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.reStart = this.reStart.bind(this);
  }

  componentDidMount() {
    this.nextColor();
  }

  reStart() {
    window.location.reload(false);
  }

  handleClick(color) {
    console.log('clic')
    let newTableau = this.state.coupsJoueurs;
    newTableau.push(color)
    this.setState({
      coupsJoueurs: newTableau
    })
    this.checkColor()
  }

  checkColor() {
    this.state.coupsJoueurs.forEach((colorJ, i) => {
      if (colorJ !== this.state.coups[i]) {
        console.log('perdu')
        this.setState({
          gameOver: true
        })
      }
      // si dernier est atteint
      else if (i===this.state.coups.length-1) {
        this.setState({
          userBlock: true,
          coupsJoueurs: []
        })
        this.nextColor()
      }
    });
  }

  launchLevel(i) {
    console.log(i);
    this.setState({
      activeColor: this.state.coups[i]
    })
    setTimeout(() => {
      this.setState({
        activeColor:''
      })
    }, 800);
    setTimeout(() => {
      i = i + 1;
      if (i < this.state.coups.length) {
        this.launchLevel(i)
      } else {
        this.setState({
          activeColor: '',
          userBlock: false
        })
      }
      // console.log(color);
    }, 1000);
  }


  /**
   * Permet de choisir une couleur aléatoire dans un tableau de couleurs et
   * de l'ajouter dans la tableau des coups
   */
  nextColor() {
    let minColor = 0
    let maxColor = 4 // 4 exclus
    let indexColor = Math.floor(Math.random() * (maxColor - minColor)) + minColor
    let color = this.state.listeCouleur[indexColor];
    console.log(color);
    let newTableau = this.state.coups;
    newTableau.push(color)
    this.setState({
      coups: newTableau
    })
    console.log(this.state.coups);
    setTimeout(() => {
      
      this.launchLevel(0);
    }, 1000);
  }


  renderColors() {
    let colors = [];
    for (let i = 0; i < 4; i++) {
      colors.push(
        <Color
          key={i}
          color={this.state.listeCouleur[i]}
          activeColor={this.state.activeColor}
          onClickUser={this.handleClick}
          userBlock={this.state.userBlock}

        />
      )

    }
    return colors;
  }

  render() {

    return (
      <div className="App">
        <div className='container-app' >
          {this.renderColors()}
          {this.state.gameOver && <div className='container-gameOver'> <p>Fin de partie</p> <p>Vous avez réussi à effectuer {this.state.coups.length-1} {this.state.coups.length-1 === 1 || this.state.coups.length-1 === 0 ? 'manche' : 'manches'}</p> <button onClick={this.reStart} >Recommencer</button> </div>}
        </div>
      </div>
    );
  }
}

class Color extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeColor: this.props.activeColor,
      activeByUser: false
    }
  }

  render() {

    return (
      <div className='color-parent'>
        <div 
          onClick={() => { !this.props.userBlock && this.props.onClickUser(this.props.color)}} 
          onMouseDown={ () => {
            console.log('MouseDown');
            if (!this.props.userBlock) {
              this.setState({
                activeByUser: true
              })
            }
          }} 
          onMouseUp={ () => {
            console.log('MouseDown');
            if (!this.props.userBlock) {
              this.setState({
                activeByUser: false
              })
            }
          }}
          
          className={`color color-${this.props.color}`} 
          // style={{ filter: this.props.activeColor === this.props.color ? 'brightness(250%)' : 'brightness(50%)' }}>
          style={{ filter: this.props.activeColor === this.props.color || this.state.activeByUser ? 'brightness(250%)' : 'brightness(50%)' }}>
          </div>
      </div>
    );
  }
}


export default App;