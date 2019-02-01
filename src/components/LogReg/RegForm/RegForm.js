import React,{Component} from "react"

export default class RegForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            userName:"",
            password:""
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
    register = ()=>{
        let {userName,password} = this.state;
        if(!userName || !password) {
            alert("WRITE ALL");
            return;
        }
        this.props.onRegister(this.state.userName,this.state.password);
    }
    render(){
        let {userName,password} = this.state
        return (
            <div className="logOrReg">
                <div className="logRow">
                    <label>User Name</label>
                    <input onChange={this.change.bind(this,"userName")} type="text" value={userName} />
                </div>
                <div className="logRow">
                    <label>Password</label>
                    <input onChange={this.change.bind(this,"password")} type="password" value={password} />
                </div>
                <div className="logBs">
                    <button onClick ={this.register}>Sign Up</button>
                    <label onClick={this.props.onLog}>Log In</label>
                </div>
            </div>
        )
    }
}