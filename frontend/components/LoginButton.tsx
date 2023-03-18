import axios from 'axios';

function LoginButton() {
  const handleLogin = async () => {
    const response = await axios.get('http://localhost:3000/auth/google_oauth2');
    window.location.href = response.data.url
    console.log('hoge')
  }


  return (
    <button onClick={handleLogin}>
      ログイン
    </button>
  )
}

export default LoginButton
