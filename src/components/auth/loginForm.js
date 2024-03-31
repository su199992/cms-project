import React, { useState } from 'react';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebaseConfig';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!email.endsWith('@song.co.kr')) {
      alert('로그인 실패: 유효하지 않은 이메일 주소입니다.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // 사용자가 초기 비밀번호로 로그인한 경우 비밀번호 변경 페이지로 이동
      if (password === '1234') {
        navigate('/changePassword');
      } else {
        // 초기 비밀번호가 아닌 경우 홈페이지로 이동
        navigate('/homePage');
      }
    } catch (error) {
      alert(`로그인 실패: ${error.message}`);
    }
  };

  return (
  <Container
    sx={{
      display: 'flex', // Flex 컨테이너로 만듦
      flexDirection: 'column', // 자식 요소를 세로로 정렬
      justifyContent: 'center', // 자식 요소를 세로 중앙에 정렬
      alignItems: 'center', // 자식 요소를 가로 중앙에 정렬
      height: '100vh', // 컨테이너의 높이를 뷰포트 높이의 100%로 설정
    }}
  >
  <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 600,
        height: 450,
        border: '1px solid', 
        borderColor: 'grey.500',
        boxSizing: 'border-box'
      }}
    >
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        sx={{
          fontSize: 80,
          color: 'red',
          marginTop: 2  
        }}>
        Hunet
      </Typography>
      <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
        <TextField
          label="이메일 주소"
          type="email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{
            width: '100%',
          }}
        />
        <TextField
          label="비밀번호"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          margin="normal"
          sx={{
            width: '100%',
            marginBottom: 4,
          }}
        />
        <Button 
          type="submit" 
          variant="contained" 
          fullWidth
          sx={{
            height: 56,
            fontSize: 22,
            backgroundColor: 'grey',
            marginBottom: 5
          }}>
          로그인
        </Button>
      </Box>
      <Typography variant="body2" 
        sx={{ 
          fontSize: 20,
          fontWeight: 700
          }}>
        Contents Management System
      </Typography>
    </Box>
    </Container>
  );
};

export default LoginForm;
