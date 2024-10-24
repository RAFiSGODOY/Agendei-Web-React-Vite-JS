import "./login.css";
import logo from "../../assets/logo.png";
import background from "../../assets/fundo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../constants/api";

function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassoword] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    async function ExecuteLogin() {
        if (email == "" || password == "") {
            return setAlertMessage("E-mail ou senha inválida!")

        } else {


            try {
                setAlertMessage("")
                const response = await api.post("/admin/login", {
                    email,
                    password
                })
                if (response.data) {
                    localStorage.setItem("sessionToken", response.data.token);
                    localStorage.setItem("sessionId", response.data.id_admin);
                    localStorage.setItem("sessionEmail", response.data.email);
                    localStorage.setItem("sessionName", response.data.name);
                    api.defaults.headers.common['Authorization'] = "Bearer " + response.data.token;
                    navigate("/appointments");
                } else {
                    setAlertMessage("Usuário ou senha inválidos")
                }
            } catch (error) {
                if (error.response?.data.error)
                    setAlertMessage(error.response?.data.error)
                else
                    setAlertMessage("Erro ao se conectar")

            }

        }
    }


    return (
        <div className="row">
            <div className="col-sm-5 col-lg-7 d-flex justify-content-center align-items-center text-center">
                <form className="form-signin">
                    <img src={logo} className="logo mb-4" />
                    <h5 className="mb-5">Gerencie seus Agendamentos de forma descomplicada.</h5>
                    <h5 className="mb-4 text-secondary">acesse sua conta</h5>
                    <div className="mt-4">
                        <input type="email" placeholder="E-mail"
                            className="form-control" onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>
                    <div className="mt-2">
                        <input type="password" placeholder="Senha"
                            className="form-control" onChange={(e) => setPassoword(e.target.value)}
                        />
                    </div>
                    <div className="mt-3 mb-5">
                        <button onClick={ExecuteLogin} className="btn btn-primary w-100" type="button">Login</button>
                    </div>
                    {alertMessage.length > 0 &&
                        <div className="alert alert-danger" role="alert">
                            {alertMessage}
                        </div>
                    }
                    <div>
                        <span className="me-1">Não tenho uma conta.</span>
                        <Link to="/register">Criar agora!</Link>
                    </div>
                </form>

            </div>
            <div className="col-sm-7 col-lg-5">
                <img src={background} className="background-signin" />

            </div>


        </div>
    )
}

export default Login;