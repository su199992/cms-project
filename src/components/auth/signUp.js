import React, { useState } from 'react';
import { auth, db } from './firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { TextField, Button, Box, Dialog, DialogTitle, DialogContent, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert'; // 올바른 경로에서 Alert 가져오기

const SignUpModal = ({ open, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState();
  const [alertSeverity, setAlertSeverity] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const createdUser = await createUserWithEmailAndPassword(auth, email, password);
      console.log(createdUser);

      await addDoc(collection(db, "users"), {
        name: name,
        email: email,
      });
      setAlertSeverity('success');
      setSnackbarMessage('회원가입 완료');
      setSnackbarOpen(true);

      // 회원가입이 완료되면 입력 필드 리셋
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      //console.error(error);
      setAlertSeverity('error'); // 회원가입 실패 시 alertSeverity를 'error'로 설정
      setSnackbarOpen(true);
      // 에러 코드에 대한 안내 문구 반환하기
      // 사전 유효성 검증 여부 등을 고려해 발생 빈도 순으로 분기처리하는게 좋다.
      switch (error.code) {
        case "auth/user-not-found" || "auth/wrong-password":
          return setSnackbarMessage("이메일 혹은 비밀번호가 일치하지 않습니다.");
        case "auth/email-already-in-use":
          return setSnackbarMessage("이미 사용 중인 이메일입니다.");
        case "auth/weak-password":
          return setSnackbarMessage("비밀번호는 6글자 이상이어야 합니다.");
        case "auth/network-request-failed":
          return setSnackbarMessage("네트워크 연결에 실패 하였습니다.");
        case "auth/invalid-email":
          return setSnackbarMessage("잘못된 이메일 형식입니다.");
        case "auth/internal-error":
          return setSnackbarMessage("잘못된 요청입니다.");
        default:
          return setSnackbarMessage("로그인에 실패 하였습니다.");
      }
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Box>
        <Dialog open={open} onClose={onClose}>
          <DialogTitle sx={{ textAlign: 'center', fontWeight: 700, fontSize: 30 }}>SignUp</DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={handleSignUp} sx={{ padding: 2 }}>
              <TextField
                label="Name"
                type="text"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                sx={{
                  width: '100%',
                  marginBottom: 3
                }}
              />
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{
                  width: '100%',
                  marginBottom: 3
                }}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{
                  width: '100%',
                  marginBottom: 3
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  height: 56,
                  fontSize: 22,
                  fontWeight: 700,
                  width: '100%',
                  textTransform: 'none'
                }}>
                SignUp
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar} // handleCloseSnackbar로 수정
          severity={alertSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar> 
    </>
  );
};

export default SignUpModal;
