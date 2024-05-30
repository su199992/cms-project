import { React, useState } from "react";
import { auth, db } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { TextField, Button, Box, Dialog, DialogTitle, DialogContent } from "@mui/material";
import AuthAlert from "./authAlert";

const SignUpModal = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorCode, setErrorCode] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // 비밀번호와 비밀번호 확인이 일치하지 않으면 에러 설정
    if (password !== confirmPassword) {
      setErrorCode("passwordConfirm");
      return; // 회원가입 시도 중지
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid; // Firebase UID
      await setDoc(doc(db, "users", uid), {
        name: name,
        email: email,
      });
      setSuccessMessage("회원가입 완료");
      // 회원가입이 완료되면 입력 필드 리셋
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      onClose();
    } catch (error) {
      setErrorCode(error.code);
    }
  };

  return (
    <>
      <Box>
        <Dialog open={open} onClose={onClose}>
          <DialogTitle sx={{ textAlign: "center", fontWeight: 700, fontSize: 30 }}>SignUp</DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={handleSignUp} sx={{ padding: 2 }}>
              <TextField
                label="Name"
                type="text"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                sx={{ width: "100%", marginBottom: 3 }}
              />
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ width: "100%", marginBottom: 3 }}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{ width: "100%", marginBottom: 3 }}
              />
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                sx={{ width: "100%", marginBottom: 3 }}
              />
              <Button type="submit" variant="contained" sx={{ height: 56, fontSize: 22, fontWeight: 700, width: "100%", textTransform: "none" }}>
                SignUp
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
      <AuthAlert errorCode={errorCode} successMessage={successMessage} />
    </>
  );
};

export default SignUpModal;
