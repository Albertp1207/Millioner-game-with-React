import React, { Component } from 'react';
class Adder extends Component {
    constructor(props){
        super(props);
        this.state = {
            question:"",
            a1:"",
            a2:"",
            a3:"",
            a4:"",
            trueAnswer:"",
            level:""
        }
    }
    change(w,event){
        console.log(w+ ":"+event.target.value)
       let changer = this.state[w];
       changer = event.target.value
       this.setState({
           [w]:changer
       })
    }

    add(){
        let {question,a1,a2,a3,a4,trueAnswer,level} = this.state;
        for(let key in this.state) {
            console.log(this.state[key]);
            if(!this.state[key]) {
                alert("write ALL")
                return;
            }
        }
        let obj = {
            question: question,
            answers: [a1,a2,a3,a4],
            trueAnswer: trueAnswer,
            level: level              
        }
        this.setState({
            question:"",
            a1:"",
            a2:"",
            a3:"",
            a4:"",
            trueAnswer:"",
            level:""
        });
        console.log(obj);
        fetch('http://5c34a058ae60ba0014da4235.mockapi.io/questions', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });
    }
    render(){
        return(
            <div id="adder">
                <h3>Add Question</h3>
                <div className="adL"><label>question </label><input onChange={this.change.bind(this,"question")} value={this.state.question}type="text" /></div>
                <div className="adL"><label>answer 1</label><input onChange={this.change.bind(this,"a1")}  value={this.state.a1}type="text" /></div>
                <div className="adL"><label>answer 2</label><input onChange={this.change.bind(this,"a2")} value={this.state.a2}type="text" /></div>
                <div className="adL"><label>answer 3</label><input onChange={this.change.bind(this,"a3")} value={this.state.a3}type="text" /></div>
                <div className="adL"><label>answer 4</label><input onChange={this.change.bind(this,"a4")} value={this.state.a4}type="text" /></div>
                <div className="adL">
                    <label>true answer</label>                
                    <select name="wAt" onChange={this.change.bind(this,"trueAnswer")}>
                        <option value={this.state.a1}>{this.state.a1}</option>
                        <option value={this.state.a2}>{this.state.a2}</option>
                        <option value={this.state.a3}>{this.state.a3}</option>
                        <option value={this.state.a4}>{this.state.a4}</option>
                    </select>
                </div>
                <div className="adL">
                    <label>level</label>
                    <select name="lAt" onChange={this.change.bind(this,"level")}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
                {/* <div className="adL"><label>true answer</label><input onChange={this.change.bind(this,"trueAnswer")}value={this.state.trueAnswer} type="text"/></div> */}
                {/* <div className="adL"><label>level </label><input onChange={this.change.bind(this,"level")}value={this.state.level} type="text"/></div> */}
                <button onClick = {this.add.bind(this)}>Add</button>
            </div>
        )
    }
}

export default Adder;