import { React, useState } from 'react';
import { auth, db } from './firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { TextField, Button, Box, Dialog, DialogTitle, DialogContent, Snackbar, Alert } from '@mui/material';
import AuthAlert from './authAlert';

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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid; // Firebase UID

      await setDoc(doc(db, "users", uid), {
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
      const errorMessage = AuthAlert(error.code)
      setSnackbarMessage(errorMessage);
      setAlertSeverity('error'); // 회원가입 실패 시 alertSeverity를 'error'로 설정
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    // 가입창을 닫아도 사라지지 않고, autoHideDuration:{3000} 지난 후 사라짐
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
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // 위치 설정
      >
        <Alert
          onClose={handleCloseSnackbar}
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
