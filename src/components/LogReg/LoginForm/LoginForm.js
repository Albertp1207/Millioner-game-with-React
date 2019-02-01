import React,{Component} from "react";

class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            userName:"",
            password:""
        }
    }
    change(w,event){
        // console.log(w+ ":"+event.target.value)
       let changer = this.state[w];
       changer = event.target.value
       this.setState({
           [w]:changer
       })
    }
    login =() => {
        let {userName, password} = this.state;
        if(!userName || !password) {
            alert("write ALL")
            return;
        }

        this.props.login(userName,password)
    }
    render(){
        let {name,password} = this.state;
        return (
            <div className="logOrReg" id="LoginForm">
                {/* <div className="mainLog"> */}
                    <div className="logRow">
                        <label>User Name</label>
                        <input onChange={this.change.bind(this,"userName")} type="text" value={name} />
                    </div>
                    <div className="logRow">
                        <label>Password</label>
                        <input onChange={this.change.bind(this,"password")} type="password" value={password} />
                    </div>
                    <div className="logBs">
                        <button onClick ={this.login}>Log In</button>
                        <label onClick={this.props.onReg}>Sign Up</label>
                    </div>
                {/* </div> */}
            </div>
        )
    }
}

export default LoginForm;