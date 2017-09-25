import React, { Component } from 'react';

const Login = ({ handleLoginClick }) => {
  return (
    <div>
      <h2>로그인</h2>
      <button onClick={handleLoginClick}>
        구글 로그인
      </button>
    </div>
  );
}
export default Login;