import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './loginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/homePage');
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!email.endsWith('@song.co.kr')) {
      alert('유효하지 않은 이메일 주소입니다.');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('로그인 성공!');
      // 로그인 성공 후 처리 로직
    } catch (error) {
      alert('로그인 실패: ' + error.message);
    }
  };

  return (
    <div className='form-container'>
    <form onSubmit={handleLogin}>
      <h1>Hunet</h1>
      <div className='login-input user-id'>
      <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 주소"
          required
        />
      </div>
      <div className='login-input user-pw'>
      <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          required
        />
      </div>
      <button type="submit" className='login-submit' onClick={goHome}>로그인</button>
      <div className='login-bottom'>Contents Management System</div>
    </form>
    </div>
  );
};

export default LoginForm;