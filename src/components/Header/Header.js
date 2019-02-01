import React from "react";

export default (props)=>{
    return (
        <div id="header">
            <div id="infoGame">
                <h2>Who Wants To Be A Milliner</h2>
            </div>
            <div id="infoUser">
                <label>User: {props.userName}</label>
                <label>Record: {props.userRecord}</label>
                <button onClick={props.onLogOut}>Log Out</button>
            </div>

        </div>
    )
}