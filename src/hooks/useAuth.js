import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../components/auth/firebaseConfig"; // Firebase 설정 경로

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/"); // 로그인 페이지로 리다이렉션
      } else {
        navigate("/homepage"); // 홈페이지로 리다이렉션
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return null; // 훅은 JSX를 반환하지 않음
};

export default useAuth;
