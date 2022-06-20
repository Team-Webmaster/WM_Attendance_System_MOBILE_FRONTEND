import axios from "axios";
import authHeader from "./auth-header";

class AuthService {
    login(loginData) {
        return axios.post('https://localhost:5001/api/User/authorize', loginData)
            .then((res) => {
                if (res.data.token) {
                    localStorage.setItem('WM_User', JSON.stringify({ token: res.data.token }));
                }
                return res;
            })
            .catch((err) => { return err.response; });
    }
    register(registerData) {
        return axios.post('https://localhost:5001/api/User/register', registerData)
            .then((res) => { return res; })
            .catch((err) => { return err.response; });
    }
    logout() {
        localStorage.removeItem('WM_User');
    }
    getCurrentUser() {
        return axios.get('https://localhost:5001/api/User/auth', { headers: authHeader() })
            .then((res) => { return res; })
            .catch((err) => { return err.response; });
    }
}

export default new AuthService();