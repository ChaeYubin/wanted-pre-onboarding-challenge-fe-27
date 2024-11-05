const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload(); // 새로고침
  };

  return (
    <button type="button" onClick={handleLogout}>
      로그아웃
    </button>
  );
};

export default LogoutButton;
