import React, { useEffect, useState } from 'react';
import { getToken } from '../auth'; // tu función para obtener el token JWT
import Menu from './Menu';  // Ajusta la ruta según dónde esté

const styles = {
  container: {
    maxWidth: 1100,
    margin: '20px auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: 20,
    backgroundColor: '#f7f9fc',
    borderRadius: 8,
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: 20,
  },
  message: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 4,
  },
  error: {
    color: '#e74c3c',
    backgroundColor: '#fddede',
    border: '1px solid #e74c3c',
  },
  success: {
    color: '#27ae60',
    backgroundColor: '#d4f7dc',
    border: '1px solid #27ae60',
  },
  form: {
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 6,
    boxShadow: '0 0 10px rgba(0,0,0,0.05)',
  },
  formHeading: {
    marginBottom: 15,
    color: '#34495e',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: 8,
    marginBottom: 15,
    borderRadius: 4,
    border: '1px solid #ccc',
    fontSize: 14,
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    marginBottom: 15,
    color: '#34495e',
    userSelect: 'none',
  },
  checkboxInput: {
    marginRight: 8,
  },
  buttonsContainer: {
    display: 'flex',
    gap: 10,
  },
  button: {
    padding: '10px 16px',
    borderRadius: 4,
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: 14,
    color: '#fff',
    backgroundColor: '#3498db',
    transition: 'background-color 0.3s ease',
  },
  buttonCancel: {
    backgroundColor: '#95a5a6',
  },
  buttonHover: {
    backgroundColor: '#2980b9',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0,0,0,0.05)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  th: {
    backgroundColor: '#2980b9',
    color: '#fff',
    padding: 12,
    textAlign: 'left',
  },
  td: {
    padding: 12,
    borderBottom: '1px solid #ddd',
    color: '#2c3e50',
  },
  actionButton: {
    marginRight: 8,
    padding: '6px 12px',
    borderRadius: 4,
    border: 'none',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#4caf50',
    transition: 'background-color 0.3s ease',
  },
  actionButtonDelete: {
    backgroundColor: '#e74c3c',
  },
};

const ContratacionesDashboard = () => {
  const [contrataciones, setContrataciones] = useState([]);
  const [departamentoId, setDepartamentoId] = useState('');
  const [empleadoId, setEmpleadoId] = useState('');
  const [cargoId, setCargoId] = useState('');
  const [tipoContratacionId, setTipoContratacionId] = useState('');
  const [fechaContratacion, setFechaContratacion] = useState('');
  const [salario, setSalario] = useState('');
  const [estado, setEstado] = useState(true);

  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [editarId, setEditarId] = useState(null);

  useEffect(() => {
    cargarContrataciones();
  }, []);

  const cargarContrataciones = () => {
    fetch('http://localhost:8080/api/contrataciones', {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar contrataciones');
        return res.json();
      })
      .then(data => setContrataciones(data))
      .catch(err => setError(err.message));
  };

  const guardarContratacion = (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    const body = {
      departamento: { idDepartamento: parseInt(departamentoId) },
      empleado: { idEmpleado: parseInt(empleadoId) },
      cargo: { idCargo: parseInt(cargoId) },
      tipoContratacion: { idTipoContratacion: parseInt(tipoContratacionId) },
      fechaContratacion,
      salario: parseFloat(salario),
      estado,
    };

    const url = editarId
      ? `http://localhost:8080/api/contrataciones/${editarId}`
      : 'http://localhost:8080/api/contrataciones';

    const method = editarId ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(body),
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al guardar contratación');
        return res.json();
      })
      .then(() => {
        setMensaje(`Contratación ${editarId ? 'actualizada' : 'creada'} correctamente`);
        limpiarFormulario();
        cargarContrataciones();
      })
      .catch(err => setError(err.message));
  };

  const eliminarContratacion = (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar esta contratación?')) return;

    fetch(`http://localhost:8080/api/contrataciones/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al eliminar contratación');
        setMensaje('Contratación eliminada correctamente');
        cargarContrataciones();
      })
      .catch(err => setError(err.message));
  };

  const editar = (contratacion) => {
    setEditarId(contratacion.idContratacion);
    setDepartamentoId(contratacion.departamento?.idDepartamento || '');
    setEmpleadoId(contratacion.empleado?.idEmpleado || '');
    setCargoId(contratacion.cargo?.idCargo || '');
    setTipoContratacionId(contratacion.tipoContratacion?.idTipoContratacion || '');
    setFechaContratacion(contratacion.fechaContratacion?.split('T')[0] || '');
    setSalario(contratacion.salario || '');
    setEstado(contratacion.estado);
    setMensaje('');
    setError('');
  };

  const limpiarFormulario = () => {
    setEditarId(null);
    setDepartamentoId('');
    setEmpleadoId('');
    setCargoId('');
    setTipoContratacionId('');
    setFechaContratacion('');
    setSalario('');
    setEstado(true);
  };

  return (
    <div style={styles.container}>
       <Menu /> 
      <h1 style={styles.heading}>Contrataciones Dashboard</h1>

      {error && <p style={{ ...styles.message, ...styles.error }}>{error}</p>}
      {mensaje && <p style={{ ...styles.message, ...styles.success }}>{mensaje}</p>}

      <form onSubmit={guardarContratacion} style={styles.form}>
        <h2 style={styles.formHeading}>{editarId ? 'Editar' : 'Crear'} Contratación</h2>

        <input
          type="number"
          placeholder="ID Departamento"
          value={departamentoId}
          onChange={e => setDepartamentoId(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="number"
          placeholder="ID Empleado"
          value={empleadoId}
          onChange={e => setEmpleadoId(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="number"
          placeholder="ID Cargo"
          value={cargoId}
          onChange={e => setCargoId(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="number"
          placeholder="ID Tipo Contratación"
          value={tipoContratacionId}
          onChange={e => setTipoContratacionId(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="date"
          placeholder="Fecha Contratación"
          value={fechaContratacion}
          onChange={e => setFechaContratacion(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="number"
          step="0.01"
          placeholder="Salario"
          value={salario}
          onChange={e => setSalario(e.target.value)}
          required
          style={styles.input}
        />

        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={estado}
            onChange={e => setEstado(e.target.checked)}
            style={styles.checkboxInput}
          />
          Estado (activo)
        </label>

        <div style={styles.buttonsContainer}>
          <button
            type="submit"
            style={styles.button}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
          >
            {editarId ? 'Actualizar' : 'Guardar'}
          </button>

          {editarId && (
            <button
              type="button"
              onClick={limpiarFormulario}
              style={{ ...styles.button, ...styles.buttonCancel }}
              onMouseOver={e => (e.currentTarget.style.backgroundColor = '#7f8c8d')}
              onMouseOut={e => (e.currentTarget.style.backgroundColor = styles.buttonCancel.backgroundColor)}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <h2 style={{ ...styles.heading, marginTop: 40 }}>Lista de Contrataciones</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Departamento</th>
            <th style={styles.th}>Empleado</th>
            <th style={styles.th}>Cargo</th>
            <th style={styles.th}>Tipo Contratación</th>
            <th style={styles.th}>Fecha</th>
            <th style={styles.th}>Salario</th>
            <th style={styles.th}>Estado</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {contrataciones.length === 0 ? (
            <tr>
              <td colSpan="9" style={{ ...styles.td, textAlign: 'center', fontStyle: 'italic' }}>
                No hay contrataciones disponibles
              </td>
            </tr>
          ) : (
            contrataciones.map(c => (
              <tr key={c.idContratacion}>
                <td style={styles.td}>{c.idContratacion}</td>
                <td style={styles.td}>{c.departamento?.nombreDepartamento || 'N/A'}</td>
                <td style={styles.td}>{c.empleado?.nombreEmpleado || 'N/A'}</td>
                <td style={styles.td}>{c.cargo?.cargo || 'N/A'}</td>
                <td style={styles.td}>{c.tipoContratacion?.nombreTipo || 'N/A'}</td>
                <td style={styles.td}>{new Date(c.fechaContratacion).toLocaleDateString()}</td>
                <td style={styles.td}>{c.salario}</td>
                <td style={styles.td}>{c.estado ? 'Activo' : 'Inactivo'}</td>
                <td style={styles.td}>
                  <button
                    style={styles.actionButton}
                    onClick={() => editar(c)}
                    onMouseOver={e => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
                    onMouseOut={e => (e.currentTarget.style.backgroundColor = styles.actionButton.backgroundColor)}
                  >
                    Editar
                  </button>
                  <button
                    style={{ ...styles.actionButton, ...styles.actionButtonDelete }}
                    onClick={() => eliminarContratacion(c.idContratacion)}
                    onMouseOver={e => (e.currentTarget.style.backgroundColor = '#c0392b')}
                    onMouseOut={e => (e.currentTarget.style.backgroundColor = styles.actionButtonDelete.backgroundColor)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContratacionesDashboard;
