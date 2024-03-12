import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const navigate = useNavigate()

  const handleLogin = (event) => {
    event.preventDefault();
    // 로그인 처리 로직

    // 아이디,패스워드 하드코딩
    if(username === "1" && password === "1") {
      navigate("/HomePage"); // 로그인 성공 시 홈페이지로 이동
    } else {
      alert("로그인 정보가 잘못되었습니다.");
    }

    // "아이디 기억하기"가 체크되어 있다면, 여기에 로컬 스토리지에 저장하는 로직을 추가할 수 있습니다.
    if(rememberMe) {
      localStorage.setItem('rememberUsername', username);
    } else {
      localStorage.removeItem('rememberUsername');
    }
  };

  return (
    <div className='form-container'>
    <form onSubmit={handleLogin}>
      <h1>Hunet</h1>
      <div className='login-input user-id'>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='ID'
        />
      </div>
      <div className='login-input user-pw'>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
      </div>
      <div className='login-check'>
        <input
          type="checkbox"
          id="rememberMe"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <label htmlFor="rememberMe">아이디 기억하기</label>
      </div>
      <button type="submit" className='login-submit'>로그인</button>
      <div className='login-bottom'>Contents Management System</div>
    </form>
    </div>
  );
};

export default LoginForm;