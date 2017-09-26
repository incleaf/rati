import React, { Component } from 'react';

const Login = ({ handleLoginClick }) => {
  return (
    <div>
      <p>A tiny service that helps you to memorize vocabulary easily</p><br />
      <button className="app__btn-loginout" onClick={handleLoginClick}>
        <a href="javascript:void(0);">Login (via Google)</a>
      </button>
    </div>
  );
}
export default Login;