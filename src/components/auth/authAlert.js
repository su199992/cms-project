
const AuthAlert = (errorCode) => {
    // 에러 코드에 대한 안내 문구 반환하기
    // 사전 유효성 검증 여부 등을 고려해 발생 빈도 순으로 분기처리하는게 좋다.
    switch (errorCode) {
    case "auth/invalid-credential" :
        return "등록되지 않은 사용자입니다.";
    case "auth/user-not-found" || "auth/wrong-password":
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
}

export default AuthAlert;