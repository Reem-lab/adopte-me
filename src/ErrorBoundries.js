import {Component } from "react";
import { Link, Redirect } from "react-router-dom";

class ErrorBoundries extends Component {
    state = {
        hasError: false,
        redirect: false
    }

    static getDriverStateFromError(){
        return { hasError: true }
    }

    componentDidCatch(error, info){
        console.error('ErrorBoundary caught an error', error. info);
        setTimeout(() =>this.setState({redirect: true }), 5000)
    }

    render(){

        if(this.state.redirect){
            return <Redirect to="/" />
        }else if(this.state.hasError){
            return (
                <h2>
                There was an error with this listing. <Link to="/">Click here</Link>{" "}
                to back to the home page or wait five seconds.
              </h2>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundries;