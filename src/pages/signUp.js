import React, { useState } from 'react';
import { auth, db } from '../components/auth/firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Firestore 사용 시
import { TextField, Button, Box, Dialog, DialogTitle, DialogContent } from '@mui/material';

const SignUpModal = ({ open, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (email, password) => {
    //e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Firestore에 사용자 정보 저장
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email
      });
      alert("User registered with email: ", email);
    } catch (error) {
        alert("Error signing up: ", error.message);
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
