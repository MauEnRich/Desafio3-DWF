import React, { useEffect, useState } from 'react';
import Menu from './Menu';  // Ajusta la ruta

const API_URL = "http://localhost:8080/api/empleados";

const EmpleadosCrud = () => {
  const [empleados, setEmpleados] = useState([]);
  const [form, setForm] = useState({
    idEmpleado: null,
    numeroDui: '',
    nombrePersona: '',
    usuario: '',
    numeroTelefono: '',
    correoInstitucional: '',
    rol: '',
    fechaNacimiento: '',
    password: ''
  });

  const fetchEmpleados = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setEmpleados(data);
  };

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = form.idEmpleado ? "PUT" : "POST";
    const url = form.idEmpleado ? `${API_URL}/${form.idEmpleado}` : API_URL;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setForm({
      idEmpleado: null,
      numeroDui: '',
      nombrePersona: '',
      usuario: '',
      numeroTelefono: '',
      correoInstitucional: '',
      rol: '',
      fechaNacimiento: '',
      password: ''
    });
    fetchEmpleados();
  };

  const handleEdit = (empleado) => {
    setForm({ ...empleado });
    if (empleado.fechaNacimiento) {
      setForm(prev => ({
        ...prev,
        fechaNacimiento: new Date(empleado.fechaNacimiento).toISOString().split('T')[0]
      }));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este empleado?")) {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchEmpleados();
    }
  };

  return (
    <>
      <style>{`
        html, body, #root {
          height: 100%;
          margin: 0;
          font-family: Arial, sans-serif;
          background-color: #f0f2f5;
        }

        body, #root {
          display: flex;
          justify-content: center; /* Centra horizontal */
          align-items: center;     /* Centra vertical */
        }

        .container {
          max-width: 1000px;
          width: 100%;
          background: white;
          padding: 25px 30px;
          border-radius: 10px;
          box-shadow: 0 0 20px rgba(0,0,0,0.1);
          text-align: center;
          overflow-y: auto;
          max-height: 90vh; /* para que no crezca demasiado verticalmente */
        }

        h2 {
          color: #333;
          margin-bottom: 25px;
        }

        form.form {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 12px;
          margin-bottom: 30px;
          justify-items: center;
          text-align: left;
        }

        form.form input {
          width: 100%;
          max-width: 300px;
          padding: 10px;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 4px;
          transition: border-color 0.3s ease;
        }

        form.form input:focus {
          border-color: #007bff;
          outline: none;
        }

        form.form button {
          grid-column: 1 / -1;
          padding: 12px 40px;
          font-size: 16px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          justify-self: center;
        }

        form.form button:hover {
          background-color: #0056b3;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 0 8px rgba(0,0,0,0.1);
          margin: 0 auto;
          text-align: left;
        }

        thead {
          background-color: #007bff;
          color: white;
        }

        th, td {
          padding: 12px 15px;
          border-bottom: 1px solid #ddd;
          font-size: 14px;
        }

        tbody tr:hover {
          background-color: #f1f1f1;
        }

        button {
          padding: 6px 10px;
          margin-right: 6px;
          font-size: 13px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button:hover {
          opacity: 0.85;
        }

        button:first-of-type {
          background-color: #28a745;
          color: white;
        }

        button:last-of-type {
          background-color: #dc3545;
          color: white;
        }
      `}</style>

      <div className="container">
        <Menu />
       <br />
       <br />    

         <h2>CRUD de Empleados</h2>
        <br />
        <form onSubmit={handleSubmit} className="form">
          <input type="text" name="numeroDui" value={form.numeroDui} onChange={handleChange} placeholder="DUI" required />
          <input type="text" name="nombrePersona" value={form.nombrePersona} onChange={handleChange} placeholder="Nombre" required />
          <input type="text" name="usuario" value={form.usuario} onChange={handleChange} placeholder="Usuario" required />
          <input type="text" name="numeroTelefono" value={form.numeroTelefono} onChange={handleChange} placeholder="Teléfono" required />
          <input type="email" name="correoInstitucional" value={form.correoInstitucional} onChange={handleChange} placeholder="Correo" required />
          <input type="text" name="rol" value={form.rol} onChange={handleChange} placeholder="Rol (ADMIN/USER)" required />
          <input type="date" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} required />
          <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Contraseña" required />
          <button type="submit">{form.idEmpleado ? "Actualizar" : "Guardar"}</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>DUI</th>
              <th>Nombre</th>
              <th>Usuario</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Fecha Nac.</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map(emp => (
              <tr key={emp.idEmpleado}>
                <td>{emp.numeroDui}</td>
                <td>{emp.nombrePersona}</td>
                <td>{emp.usuario}</td>
                <td>{emp.numeroTelefono}</td>
                <td>{emp.correoInstitucional}</td>
                <td>{emp.rol}</td>
                <td>{new Date(emp.fechaNacimiento).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleEdit(emp)}>Editar</button>
                  <button onClick={() => handleDelete(emp.idEmpleado)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmpleadosCrud;
