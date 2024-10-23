import "./appointment-add.css";
import Navbar from "../../components/navbar/navbar.jsx";
import { doctors, doctors_services } from "../../constants/data.js";
import { Link, useNavigate, useParams } from "react-router-dom";

function AppointmentAdd() {

    const { id_appointment } = useParams();

    return (

        <div>

            <Navbar />
            <div className="container-fluid mt-page2">
                <div className="row col-lg-4 offset-lg-4">
                    <div className="col-12 mt-2">
                        <h2>{
                            id_appointment > 0 ?
                                " Editar Agendamento" : "Novo Agendamento"
                            }

                        </h2>
                    </div>
                        <div className="col-12 mt-5">
                        <label htmlFor="doctor" className="form-label">Selecione o Médico</label>
                        <div className="form-control mb-2">
                            <select name="doctor" id="doctor">
                                <option value="0"> Médicos </option>
                                {
                                    doctors.map((doc) => {
                                        return <option key={doc.id_doctor} value={doc.id_doctor}>{doc.name}</option>
                                    })
                                }

                            </select>
                        </div>

                    </div>

                    <div className="col-12 mt-4">
                        <label htmlFor="service" className="form-label">Selecione o Serviço</label>
                        <div className="form-control mb-2">
                            <select name="doctor" id="doctor">
                                <option value="0"> Serviços </option>
                                {
                                    doctors_services.map((doc) => {
                                        return <option key={doc.id_service} value={doc.id_service}>{doc.description}</option>
                                    })
                                }

                            </select>
                        </div>

                    </div>
                    <div className="col-6 mt-4">
                        <label htmlFor="bookingDate" className="form-label">Data</label>
                        <input type='date' className="form-control" name="bookingDate" id="bookingDate" />

                    </div>
                    <div className="col-6 mt-4">
                        <label htmlFor="bookingDate" className="form-label">Horário</label>
                        <div className="form-control mb-2">
                            <select name="bookingHour" id="bookingHour" >
                                <option value="0">Horário</option>
                                <option value="09:00">09:00</option>
                                <option value="09:00">09:30</option>
                                <option value="09:00">10:00</option>
                                <option value="09:00">10:30</option>
                                <option value="09:00">11:00</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="d-flex justify-content-end mt-3">
                            <Link to="/appointments" className="btn btn-outline-danger me-3">Cancelar</Link>
                            <button className="btn btn-primary ">Salvar Agendamento</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )

}

export default AppointmentAdd;