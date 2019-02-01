import React, { Component } from 'react';
import LoginForm from "./LoginForm/LoginForm";
import RegForm from "./RegForm/RegForm"
// import RegForm from "./RegForm";
// import LoginForm from "./LoginForm";
// log reg nuyn validation, jarangum te logOrRegim ...



class LogReg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // userName:"",
            // password:"",
            reg:false
        }
        this.login = this.login.bind(this);
        this.isThereUser = this.isThereUser.bind(this);
        this.reg = this.reg.bind(this)
        
    }
    isThereUser(user,users){
        let retUs= null
        users.forEach((us,i)=>{
            if(user === us.userName){
                retUs = us;
                return;
            }
        })
        return retUs;
    }
    login(userName,password){
        fetch('http://5c34a058ae60ba0014da4235.mockapi.io/users')
            .then(response => response.json())
            .then(json =>{
                let user = this.isThereUser(userName,json);
                // let isPassTrue;
                // console.log(user)
                if(user) {
                    if(user.password === password){
                        this.props.onLog(userName,user.id,user.record)
                    } else {
                        alert("WRONG PASSWORD")
                    };
                    
                } else {
                    alert("WE DON'T HAVE ANY USER WITH THAT USERNAME");
                }              

            })
        // this.props.onLog(userName,password)
    }
    reg(userName,password) {
        console.log(this);

        fetch('http://5c34a058ae60ba0014da4235.mockapi.io/users')
            .then(response => response.json())
            .then(json =>{
                let user = this.isThereUser(userName,json);              
                if(user) {
                    alert("This user name is already taken");
                } else {
                    let obj = {
                       userName:userName,
                       password:password,
                       record:0 
                    }
                    fetch("http://5c34a058ae60ba0014da4235.mockapi.io/users",{
                        method:"POST",
                        body:JSON.stringify(obj),
                        headers:{
                            "Content-Type":"application/json"
                        }
                    }).then(res => res.json())
                    .then(response => {
                        this.props.onLog(userName,response.id,0)                        
                    })
                        
                }

            })

    }
    toReg =()=> {
        this.setState({reg:!this.state.reg})
    }
    render(){
        return (
            <div>
               {this.state.reg? <RegForm onRegister={this.reg} onLog={this.toReg}/> :<LoginForm onReg={this.toReg}login={this.login}/>}
            </div>
        )
    }
}

export default LogReg;