import React from "react";

function Message(props) {
    const {timeTaken, result} = props;
    if(!result) 
        return <h2>Waiting for results...</h2>
    const {planet_name, status} = result;
    if(status === "false") 
        return <h2>We've tried so hard but weren't able to find her.</h2>
    return <h2>We did it! She was hiding on {planet_name}. But we found her in {timeTaken} hours.</h2>
}

function Result(props) {
    return <div className={props.className}>
        <h4>RESULTS</h4>
        <Message {...props}/>
    </div>
}

export default Result;