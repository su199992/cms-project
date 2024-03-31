import React, { useState } from 'react';
import { auth } from '../components/auth/firebaseConfig'; // auth 객체 직접 임포트
import { updatePassword } from 'firebase/auth';

const ChangePasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  //const auth = useAuth();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.');
      return;
    }

    try {
      const user = auth.currentUser;
      await updatePassword(user, newPassword);
      alert('비밀번호가 변경되었습니다.');
      // 비밀번호 변경 성공 후의 리디렉션 또는 추가적인 처리
    } catch (error) {
      setError('비밀번호 변경 중 오류가 발생했습니다: ' + error.message);
    }
  };

  return (
    <div>
      <h2>비밀번호 변경</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleChangePassword}>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="새 비밀번호"
          required
        />  
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="새 비밀번호 확인"
          required
        />
        <button type="submit">비밀번호 변경</button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
