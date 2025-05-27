import React, { useEffect, useState } from 'react';
import { getToken, logout } from '../auth';
import { useNavigate } from 'react-router-dom';
import Menu from './Menu';  // Ajusta la ruta según dónde esté

const Dashboard = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/');
      return;
    }

    fetch('http://localhost:8080/api/departamentos', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (res.status === 401) {
          logout();
          navigate('/');
          throw new Error('No autorizado');
        }
        if (!res.ok) throw new Error('Error al cargar departamentos');
        return res.json();
      })
      .then(data => setDepartamentos(data))
      .catch(err => setError(err.message));
  }, [navigate]);

  const crearDepartamento = (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    fetch('http://localhost:8080/api/departamentos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify({
        nombreDepartamento: nombre,
        descripcionDepartamento: descripcion
      })
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al crear departamento (¿tienes rol ADMIN?)');
        return res.json();
      })
      .then(dep => {
        setDepartamentos([...departamentos, dep]);
        setMensaje('Departamento creado correctamente');
        setNombre('');
        setDescripcion('');
      })
      .catch(err => setError(err.message));
  };

  const iniciarEdicion = (dep) => {
    setEditandoId(dep.idDepartamento);
    setNombre(dep.nombreDepartamento);
    setDescripcion(dep.descripcionDepartamento);
    setMensaje('');
    setError('');
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setNombre('');
    setDescripcion('');
    setMensaje('');
    setError('');
  };

  const guardarCambios = (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    fetch(`http://localhost:8080/api/departamentos/${editandoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify({
        nombreDepartamento: nombre,
        descripcionDepartamento: descripcion
      })
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al actualizar departamento');
        return res.json();
      })
      .then(depActualizado => {
        setDepartamentos(departamentos.map(dep => dep.idDepartamento === editandoId ? depActualizado : dep));
        setMensaje('Departamento actualizado correctamente');
        cancelarEdicion();
      })
      .catch(err => setError(err.message));
  };

  const eliminarDepartamento = (id) => {
    setError('');
    setMensaje('');

    if (!window.confirm('¿Seguro que quieres eliminar este departamento?')) return;

    fetch(`http://localhost:8080/api/departamentos/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al eliminar departamento');
        setDepartamentos(departamentos.filter(dep => dep.idDepartamento !== id));
        setMensaje('Departamento eliminado correctamente');
      })
      .catch(err => setError(err.message));
  };

  const styles = {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      flexDirection: 'column',
      padding: 20,
    },
    container: {
      maxWidth: 800,
      width: '100%',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#222',
      padding: 20,
      backgroundColor: '#fafafa',
      borderRadius: 8,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    title: {
      textAlign: 'center',
      marginBottom: 20,
      fontWeight: '700',
      fontSize: 28,
      color: '#222',
    },
    subtitle: {
      fontWeight: '600',
      marginBottom: 15,
      color: '#333',
    },
    messageError: {
      color: '#d32f2f',
      backgroundColor: '#ffebee',
      borderRadius: 5,
      padding: '8px 12px',
      marginBottom: 15,
      fontWeight: '600',
    },
    messageSuccess: {
      color: '#388e3c',
      backgroundColor: '#e8f5e9',
      borderRadius: 5,
      padding: '8px 12px',
      marginBottom: 15,
      fontWeight: '600',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      marginBottom: 30,
    },
    input: {
      padding: '10px 12px',
      fontSize: 16,
      borderRadius: 5,
      border: '1px solid #ccc',
      outline: 'none',
      transition: 'border-color 0.3s',
    },
    buttonsGroup: {
      display: 'flex',
      gap: 12,
    },
    button: {
      padding: '10px 16px',
      fontSize: 16,
      fontWeight: '600',
      borderRadius: 5,
      border: 'none',
      cursor: 'pointer',
      backgroundColor: '#4a90e2',
      color: '#fff',
      transition: 'background-color 0.3s',
    },
    buttonCancel: {
      backgroundColor: '#aaa',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      borderRadius: 5,
      overflow: 'hidden',
    },
    th: {
      backgroundColor: '#4a90e2',
      color: '#fff',
      fontWeight: '600',
      padding: '12px 15px',
      textAlign: 'left',
    },
    td: {
      padding: '10px 15px',
      borderBottom: '1px solid #ddd',
      color: '#333',
    },
    actionsTd: {
      display: 'flex',
      gap: 8,
    },
    actionButton: {
      border: 'none',
      borderRadius: 4,
      padding: '6px 10px',
      fontWeight: '600',
      cursor: 'pointer',
      color: '#fff',
      transition: 'background-color 0.3s',
    },
    editButton: {
      backgroundColor: '#4caf50',
    },
    deleteButton: {
      backgroundColor: '#e94e4e',
    },
  };

  return (
    <div>
   
      <div style={styles.wrapper}>
        <div style={styles.container}>
             <Menu />
          <h1 style={styles.title}>Dashboard</h1>

          {error && <p style={styles.messageError}>{error}</p>}
          {mensaje && <p style={styles.messageSuccess}>{mensaje}</p>}

          <h2 style={styles.subtitle}>{editandoId ? 'Editar Departamento' : 'Crear Departamento'}</h2>
          <form style={styles.form} onSubmit={editandoId ? guardarCambios : crearDepartamento}>
            <input
              style={styles.input}
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <input
              style={styles.input}
              type="text"
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
            <div style={styles.buttonsGroup}>
              <button
                style={styles.button}
                type="submit"
              >
                {editandoId ? 'Guardar cambios' : 'Guardar'}
              </button>
              {editandoId && (
                <button
                  style={{ ...styles.button, ...styles.buttonCancel }}
                  type="button"
                  onClick={cancelarEdicion}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>

          <h2 style={styles.subtitle}>Lista de Departamentos</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Nombre</th>
                <th style={styles.th}>Descripción</th>
                <th style={styles.th}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {departamentos.map(dep => (
                <tr key={dep.idDepartamento}>
                  <td style={styles.td}>{dep.idDepartamento}</td>
                  <td style={styles.td}>{dep.nombreDepartamento}</td>
                  <td style={styles.td}>{dep.descripcionDepartamento}</td>
                  <td style={{ ...styles.td, ...styles.actionsTd }}>
                    <button
                      style={{ ...styles.actionButton, ...styles.editButton }}
                      onClick={() => iniciarEdicion(dep)}
                    >
                      Editar
                    </button>
                    <button
                      style={{ ...styles.actionButton, ...styles.deleteButton }}
                      onClick={() => eliminarDepartamento(dep.idDepartamento)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
