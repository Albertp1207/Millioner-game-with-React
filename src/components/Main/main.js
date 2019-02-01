import React, { Component } from 'react';
class Main extends Component {
    constructor(props){
        super(props);
        let {questionData}= props;
        let {trueAnswer} = questionData;
        let trueNum;
        // for(let i=0; i<4;i++) {
        //     if(questionData.answers[i] === trueAnswer) {
        //         trueNum=i;
        //         break;
        //     }
        // }
        this.state={
            isChoose:false,
            isTrue:null,
            trueNum:trueNum,
            clickedNum:null
            // points:0
        }
    }
    componentDidMount(){
        this.findTrueAnswersId();
    }
    componentDidUpdate(prevProps){
        // alert(prevProps.questionData.question+ " !!! " + this.props.questionData.question)
        if(prevProps.questionData.question === this.props.questionData.question) {
            return
        }
        this.findTrueAnswersId();
    }

    findTrueAnswersId(){
        let {questionData} = this.props;
        let {trueAnswer} = questionData;
        for(let i=0; i<4;i++) {
            if(questionData.answers[i] === trueAnswer) {
                this.setState({trueNum:i})
                break;
            }
        }
    }
    clickAnswer = (target)=>{      
        if(!target.hasAttribute("answerId")) return;
        if(this.state.isChoose){return}

        console.log(this.state.trueNum + " _ " + target.getAttribute("answerid"))
        let answerId = Number(target.getAttribute("answerid"))
        
        
        let {trueNum} = this.state;
        // let points=this.state.points;
        let isTrue = false
        if(answerId === trueNum) {
            // alert("ASD")
            isTrue = true;
            // points = points + +level;

        } else {
            isTrue = false
        }
        this.setState({
            isChoose:true,
            isTrue:isTrue,  
            clickedNum:answerId    
            // points:points      
        })
    }

    toNext=()=>{
        this.setState({
            isChoose:false,
            isTrue:null,
            clickedNum:null
        });
        this.props.toNext(this.props.questionData.level);
    }
    startAgain=()=>{
        this.setState({
            isChoose:false,
            isTrue:null,
            clickedNum:null
        });
        this.props.startAgain();
    }
    classer = (n)=>{
        if(!this.state.isChoose) {
            return
        }
        if(n == this.state.clickedNum) {
            if(this.state.isTrue) {
                return "trueB"
            }
            return "falseB"
        } else if(n== this.state.trueNum) {
            return "trueB"
        }
        return null
    }
    
    render(){
        let {questionData} = this.props;
        let {question,answers} = questionData;
        let classForDiv = this.state.isChoose ? " choosedDiv" : " unChoosedDiv";
        return (
            <div onClick={(ev)=>this.clickAnswer(ev.target)} className={"mainQuestion"+classForDiv}>
                <div id="question">
                    <p>{question}</p>
                </div>
                <div id="answers">
                    <button className={this.classer(0)} answerid={0} >{answers[0]}</button>
                    <button className={this.classer(1)} answerid={1} >{answers[1]}</button>
                    <button className={this.classer(2)} answerid={2} >{answers[2]}</button>
                    <button className={this.classer(3)} answerid={3}>{answers[3]}</button>
                </div>
                <div id="controls">
                    {this.state.isChoose? 
                        (this.state.isTrue ? <button onClick={this.toNext}>next</button> :
                                             <button onClick={this.startAgain}>again</button>):
                        null
                    }
                </div>
                {/* <div id="score">
                    <label>points:{this.state.points}</label>
                </div> */}
            </div>
        )
    }
}

export default Main;



//haneci et answeri pah@ menak id-n em vercnum gtnum jisht patasxani hamar@ michev sxmel@ inchvor meki vra,, bayc vorde gtnem jisht patasxani hamar@, mi hat func sargi vor@ henc constructorum, u componentDidupdate-i mej kanchum em bayc tenc asuma sxala setstate kanchel construtorum, ,, isk nuyn kod@ mihat grel constructorum mi hat heto didUpdate-um oka ?