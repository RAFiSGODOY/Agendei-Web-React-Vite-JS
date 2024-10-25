import "./appointments.css";
import Navbar from "../../components/navbar/navbar.jsx";;
import { Link, useNavigate } from "react-router-dom";
import Appointment from "../../components/appointment/appointment.jsx";
import api from "../../constants/api.js";

import { useEffect, useState } from "react";

function Appointments() {

    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [alertMessage, setAlertMessage] = useState("");
    const [doctor, setIdDoctor] = useState("");
    const [doctors, setDoctors] = useState([]);
    const [dt_start, setDT_START] = useState("");
    const [dt_end, setDT_END] = useState("");

    function ClickEdit(id_appointment) {
        navigate("/appointments/edit/" + id_appointment);
    }

    function ClickDelete(id_appointment) {
        console.log("Excluir " + id_appointment);
    }

    async function LoadAppointments(){

        try {

            const response = await api.get("/admin/appointments" ,{
                params: {
                    id_doctor: doctor,
                    dt_start: dt_start,
                    dt_end: dt_end
                }
            })

            if(response.data){
                setAppointments(response.data);

            }
            
        } catch (error) {
            if (error.response?.data.error)
                setAlertMessage(error.response?.data.error)
            else
                setAlertMessage("Erro ao listar Agendamentos")

        }
    }

    useEffect(() =>{

        LoadAppointments();
        LoadDoctors();

    }, [])

    async function LoadDoctors(){

        try {

            const response = await api.get("/doctors");

            if(response.data){
                setDoctors(response.data);
            }
        } catch (error) {
            if(error.response.status == 401){
                navigate("/");
            }
            if (error.response?.data.error)
                setAlertMessage(error.response?.data.error)

            else
                setAlertMessage("Erro ao listar Médicos")

        }
    }

    function ChangeDoctor(doc){
        setIdDoctor(doc.target.value)
        setDT_START(doc.target.value)
        setDT_END(doc.target.value)

    }

    return <div className="container-fluid mt-page">
        <Navbar />

        <div className="d-flex justify-content-between align-items-center">
            <div>
                <h2 className="d-inline">Agendamentos</h2>
                <Link to="/appointments/add"
                    className="btn btn-outline-primary ms-5 mb-2">
                    Novo Agendamento
                </Link>
            </div>

            <div className="d-flex justify-content-end">
                <input id="startDate" className="form-control" type="date"  onChange={(doc) => setDT_START(doc.target.value)}/>
                <span className="m-2">Até</span>
                <input id="endtDate" className="form-control" type="date" onChange={(doc)=> setDT_END(doc.target.value)} />

                <div className="form-control ms-3 me-3">
                    <select name="doctor" id="doctor" value={doctor} onChange={ChangeDoctor}>
                        <option value="">Todos os médicos</option>

                        {
                            doctors.map((doc) => {
                                return <option key={doc.id_doctor}
                                    value={doc.id_doctor}>
                                
                                    {doc.name}
                                </option>
                            })
                        }
                    </select>
                </div>

                <button onClick={LoadAppointments} className="btn btn-primary" type="button">Filtrar</button>
            </div>

        </div>

        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Paciente</th>
                        <th scope="col">Médico</th>
                        <th scope="col">Serviço</th>
                        <th scope="col">Data/Hora</th>
                        <th scope="col" className="text-end">Valor</th>
                        <th scope="col" className="col-buttons"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        appointments.map((ap) => {
                            return <Appointment key={ap.id_appointment}
                                id_appointment={ap.id_appointment}
                                user={ap.user}
                                doctor={ap.doctor}
                                service={ap.service}
                                booking_date={ap.booking_date}
                                booking_hour={ap.booking_hour}
                                price={ap.price}
                                clickEdit={ClickEdit}
                                clickDelete={ClickDelete}
                            />
                        })
                    }
                </tbody>
            </table>
        </div>
        {alertMessage.length > 0 &&
                        <div className="alert alert-danger" role="alert">
                            {alertMessage}
                        </div>
                    }
    </div>
}

export default Appointments;