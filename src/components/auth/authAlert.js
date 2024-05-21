import React, { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';

const AuthAlert = ({ errorCode, successMessage }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [alertMessage, setalertMessage] = useState('');

  useEffect(() => {
    if (errorCode) {
      setSnackbarMessage(getErrorMessage(errorCode));
      setSnackbarOpen(true);
      setalertMessage('error');
    } else if (successMessage) {
      setSnackbarMessage(successMessage);
      setSnackbarOpen(true);
      setalertMessage('success');
    }
  }, [errorCode, successMessage]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "passwordConfirm":
        return "비밀번호가 일치하지 않습니다.";
      case "auth/invalid-credential":
        return "등록되지 않은 사용자입니다.";
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "이메일 혹은 비밀번호가 일치하지 않습니다.";
      case "auth/email-already-in-use":
        return "이미 사용 중인 이메일입니다.";
      case "auth/weak-password":
        return "비밀번호는 6글자 이상이어야 합니다.";
      case "auth/network-request-failed":
        return "네트워크 연결에 실패 하였습니다.";
      case "auth/invalid-email":
        return "잘못된 이메일 형식입니다.";
      case "auth/internal-error":
        return "잘못된 요청입니다.";
      default:
        return "로그인에 실패 하였습니다.";
    }
  };

  return (
    <Snackbar 
      open={snackbarOpen} 
      autoHideDuration={3000} 
      onClose={handleCloseSnackbar} 
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert 
        onClose={handleCloseSnackbar} 
        severity={alertMessage} 
        sx={{ width: '100%' }}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
};

export default AuthAlert;
