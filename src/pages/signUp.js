import React, { useState } from 'react';
import { auth, db  } from '../components/auth/firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; // Firestore 사용 시
import { TextField, Button, Box, Dialog, DialogTitle, DialogContent } from '@mui/material';

const SignUpModal = ({ open, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // 이벤트 버블링 방지
    try {
      const createdUser = await createUserWithEmailAndPassword(auth, email, password);
      //const user = createdUser.user;
      console.log(createdUser);

      // firestore에 사용자 정보 저장
      await addDoc(collection(db, "users"), {
        name: name,
        email: email,
      });
      
    } catch (error) {

      alert(`회원가입 실패 : ${error.message}`);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
    <DialogTitle sx={{textAlign: 'center', fontWeight: 700, fontSize: 30}}>SignUp</DialogTitle>
    <DialogContent>
        <Box component="form" onSubmit={handleSignUp} sx={{padding : 2}}>
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
  );
};

export default SignUpModal;
