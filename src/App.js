import React, { Component } from 'react';
import Main from "./components/Main/main"
import Adder from "./components/Adder/Adder"
import LogReg from "./components/LogReg/LogReg"
import Header from "./components/Header/Header"
class App extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      questionData:null,
      randomList:[],
      points:0,
      isFinish:false,
      userName:null,
      userId:null,
      userRecord:null
    }
    this.startGame=this.startGame.bind(this);
    this.onNext= this.onNext.bind(this);
    this.onStart=this.onStart.bind(this);
    this.onLog = this.onLog.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  startGame(){
    let arr=[];
    for(let i =0; i<4;i++){
      let randomItem
      do {
        randomItem = Math.floor(Math.random()*8)        
      } while(arr.indexOf(randomItem)>-1)
      arr.push(randomItem)
    }
    this.req(arr.pop());
    this.setState({randomList:arr})

  }
  req(id){
    // let {randomList,c} = this.state;
    // let newRandomList = randomList.slice();
    // let id = newRandomList ? newRandomList.pop(): Math.floor(Math.random()*8);
    fetch('http://5c34a058ae60ba0014da4235.mockapi.io/questions/'+id)
      .then(response => response.json())
      .then(json => {
        this.setState({questionData:json})
      })
  }
  changeUserRec(userId,record){
    fetch("http://5c34a058ae60ba0014da4235.mockapi.io/users/"+userId,
      {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "PUT",
          body: JSON.stringify({record:record})
    }
    )
  }
  onNext(l){
    let {randomList,points,userRecord,userId} = this.state;
    let newRandomList = randomList.slice();    
    points += +l;
    let record = points;
    if(!newRandomList.length) {
      if(userRecord< record) {
        record = record
        this.changeUserRec(userId,record);
      } else {
        record = userRecord
      }
      alert("FINISH");
      this.setState({isFinish:true,points:points,userRecord:record})
      return
    }
    this.req(newRandomList.pop());
    this.setState({randomList:newRandomList,points:points})
  } 
  onStart(){
    this.setState({
      isChoose:false,
      isTrue:null,
      isFinish:false,
      points:0

    });
    this.startGame();
  }


  onLog(userName,id,record){
    this.setState({userName:userName,userId:id,userRecord:record})
  }
  logOut(){
    this.setState({userName:null,userId:null})
  }
  render() {
    if(!this.state.userName){
      return <LogReg onLog={this.onLog} />     

    }
    return (
      <div id="game">
        {!this.state.questionData ?
          <button id="starter" onClick= {this.startGame}>Start Game</button>:
          <div  id="main">
          {!this.state.isFinish ?<Main questionData={this.state.questionData} toNext={this.onNext} startAgain={this.onStart} />:
            <button id="startA" onClick={this.onStart}>Start Again</button>
          }
          <div id="score">
            <label>points:{this.state.points}</label>
          </div> 
        </div> } 
        

        <Adder />   
        <Header userRecord={this.state.userRecord} onLogOut={this.logOut} userName={this.state.userName} />
      </div>   
        
    )
  }
}

export default App;

