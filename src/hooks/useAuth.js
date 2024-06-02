import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../components/auth/firebaseConfig";

// 로그인 여부 확인
const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      } else {
        navigate("/homepage");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return null;
};

export default useAuth;
