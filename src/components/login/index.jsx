import "./style.scss";

import React from "react";

import { Login } from "./login";
import { Register } from "./register";

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginActive: true,
    };
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  componentDidMount() {
    //Add .right by default
    this.rightSide.classList.add("right");
  }

  changeState() {
    const { isLoginActive } = this.state;

    if (isLoginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }
    this.setState((prevState) => ({
      isLoginActive: !prevState.isLoginActive,
    }));
  }

  handleSuccessfulAuth() {
    this.props.handleLogin();
    this.props.history.push("/");
  }

  render() {
    const { isLoginActive } = this.state;
    const current = isLoginActive ? "Register" : "Login";
    const currentActive = isLoginActive ? "login" : "register";
    return (
      <div className="App">
        <div className="login">
          <div className="container" ref={(ref) => (this.container = ref)}>
            {isLoginActive && (
              <Login
                containerRef={(ref) => (this.current = ref)}
                handleSuccessfulAuth={this.handleSuccessfulAuth}
              />
            )}
            {!isLoginActive && (
              <Register containerRef={(ref) => (this.current = ref)} />
            )}
          </div>
          <RightSide
            current={current}
            currentActive={currentActive}
            containerRef={(ref) => (this.rightSide = ref)}
            onClick={this.changeState.bind(this)}
          />
        </div>
      </div>
    );
  }
}

const RightSide = (props) => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};
