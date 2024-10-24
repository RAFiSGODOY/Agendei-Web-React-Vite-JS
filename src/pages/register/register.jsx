
import { Link , useNavigate } from "react-router-dom";
import "./register.css";
import logo from "../../assets/logo.png";
import background from "../../assets/fundo.png";
import api from "../../constants/api";
import { useState } from "react";


function Register() {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassoword] = useState("");
    const [passwordconfirm, setPassowordConfirm] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    async function ExecuteRegister() {
        setAlertMessage("")
        if(password==passwordconfirm){
          try {
            
            const response = await api.post("/admin/register", {
                name,
                email,
                password
            })
            if (response.data) {
                localStorage.setItem("sessionToken", response.data.token);
                localStorage.setItem("sessionId", response.data.id_admin);
                localStorage.setItem("sessionEmail", response.data.email);
                localStorage.setItem("sessionName", response.data.name);
                api.defaults.headers.common['Authorization'] = "Bearer " + response.data.token;
                navigate("/");
            } else {
                setAlertMessage("Erro ao criar conta")
            }
        } catch (error) {
            if(error.response?.data.error)
            setAlertMessage(error.response?.data.error)
        else 
        setAlertMessage("Erro ao se conectar")

        }  
        } else {
            setAlertMessage("As senhas precisam ser iguais!")
        }
        
    }

    return (
        <div className="row">
            <div className="col-sm-5 col-lg-7 d-flex justify-content-center align-items-center text-center">
                <form className="form-signin">
                    <img src={logo}  className="logo mb-4"/>
                    <h5 className="mb-5">Crie sua conta agora mesmo.</h5>
                    <h5 className="mb-4 text-secondary">Preencha os campos abaixo</h5>
                    <div className="mt-4">
                        <input type="text" placeholder="Nome"
                        className="form-control"   onChange={(e) => setName(e.target.value)}
                        />

                    </div>
                    <div className="mt-2">
                        <input type="email" placeholder="E-mail"
                        className="form-control"  onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>
                    <div className="mt-2">
                        <input type="password" placeholder="Senha" 
                        className="form-control"   onChange={(e) => setPassoword(e.target.value)}
                        />
                    </div>
                    <div className="mt-2">
                        <input type="password" placeholder="Confirme sua senha" 
                        className="form-control"   onChange={(e) => setPassowordConfirm(e.target.value)}
                        />
                    </div>
                    <div className="mt-3 mb-5"> 
                        <button onClick={ExecuteRegister} className="btn btn-primary w-100" type="button">Criar minha conta</button>
                    </div>
                    {alertMessage.length > 0 &&
                        <div className="alert alert-danger" role="alert">
                            {alertMessage}
                        </div>
                    }

                    <div>
                        <span className="me-1">Já tenho uma conta.</span>
                        <Link to="/">Fazer login!</Link>
                    </div>
                </form>

            </div>
            <div className="col-sm-7 col-lg-5">
            <img src={background} className="background-signin"/>

            </div>


        </div>
    )
}

export default Register;