import React, { useEffect, useState } from 'react';
import { getToken } from '../auth';
import Menu from './Menu';  // Ajusta la ruta según dónde esté

const CargosDashboard = () => {
  const [cargos, setCargos] = useState([]);
  const [cargo, setCargo] = useState('');
  const [descripcionCargo, setDescripcionCargo] = useState('');
  const [jefatura, setJefatura] = useState(false);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    cargarCargos();
  }, []);

  const cargarCargos = () => {
    fetch('http://localhost:8080/api/cargos', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('No autorizado');
        return res.json();
      })
      .then(data => setCargos(data))
      .catch(() => setError('No se pudieron cargar los cargos'));
  };

  const resetFormulario = () => {
    setCargo('');
    setDescripcionCargo('');
    setJefatura(false);
    setEditandoId(null);
  };

  const crearCargo = e => {
    e.preventDefault();
    setError('');
    setMensaje('');
    const nuevo = { cargo, descripcionCargo, jefatura };

    fetch('http://localhost:8080/api/cargos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(nuevo)
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al crear cargo');
        return res.json();
      })
      .then(c => {
        setCargos([...cargos, c]);
        setMensaje('Cargo creado correctamente');
        resetFormulario();
      })
      .catch(() => setError('Error al crear cargo (¿Tienes rol ADMIN?)'));
  };

  const editarCargo = c => {
    setEditandoId(c.idCargo);
    setCargo(c.cargo);
    setDescripcionCargo(c.descripcionCargo);
    setJefatura(c.jefatura);
    setError('');
    setMensaje('');
  };

  const actualizarCargo = e => {
    e.preventDefault();
    setError('');
    setMensaje('');
    const actualizado = { cargo, descripcionCargo, jefatura };

    fetch(`http://localhost:8080/api/cargos/${editandoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(actualizado)
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al actualizar cargo');
        return res.json();
      })
      .then(c => {
        setCargos(cargos.map(item => (item.idCargo === editandoId ? c : item)));
        setMensaje('Cargo actualizado correctamente');
        resetFormulario();
      })
      .catch(() => setError('Error al actualizar cargo (¿Tienes rol ADMIN?)'));
  };

  const eliminarCargo = id => {
    if (!window.confirm('¿Seguro que quieres eliminar este cargo?')) return;

    fetch(`http://localhost:8080/api/cargos/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al eliminar cargo');
        setCargos(cargos.filter(c => c.idCargo !== id));
        setMensaje('Cargo eliminado correctamente');
      })
      .catch(() => setError('Error al eliminar cargo (¿Tienes rol ADMIN?)'));
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f2f5',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: 20,
      flexDirection: 'column',
    },
    content: {
      width: '100%',
      maxWidth: 800,
      backgroundColor: '#fff',
      borderRadius: 10,
      boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
      padding: 30,
      color: '#222',
      marginTop: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: '700',
      marginBottom: 25,
      textAlign: 'center',
      color: '#2c3e50',
    },
    subtitle: {
      fontSize: 22,
      fontWeight: '600',
      marginBottom: 20,
      marginTop: 35,
      color: '#34495e',
      borderBottom: '2px solid #e1e8ed',
      paddingBottom: 6,
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
    },
    input: {
      padding: 12,
      fontSize: 16,
      borderRadius: 6,
      border: '1.5px solid #ccc',
      outline: 'none',
      transition: 'border-color 0.3s',
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 16,
      userSelect: 'none',
      cursor: 'pointer',
      color: '#555',
    },
    buttonGroup: {
      marginTop: 10,
      display: 'flex',
      gap: 12,
    },
    button: {
      flex: 1,
      padding: '12px 0',
      fontSize: 17,
      fontWeight: '600',
      borderRadius: 6,
      border: 'none',
      backgroundColor: '#2980b9',
      color: 'white',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      boxShadow: '0 4px 8px rgba(41,128,185,0.3)',
    },
    buttonHover: {
      backgroundColor: '#1c5980',
    },
    buttonCancel: {
      backgroundColor: '#bdc3c7',
      color: '#2c3e50',
      boxShadow: 'none',
    },
    messageError: {
      color: '#e74c3c',
      fontWeight: '700',
      marginBottom: 15,
      textAlign: 'center',
    },
    messageSuccess: {
      color: '#27ae60',
      fontWeight: '700',
      marginBottom: 15,
      textAlign: 'center',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: 20,
      fontSize: 16,
    },
    th: {
      textAlign: 'left',
      borderBottom: '2px solid #dfe6ec',
      padding: '12px 15px',
      backgroundColor: '#f7f9fc',
      color: '#34495e',
      fontWeight: '600',
    },
    td: {
      padding: '12px 15px',
      borderBottom: '1px solid #e1e8ed',
      color: '#2c3e50',
    },
    actionsTd: {
      display: 'flex',
      gap: 12,
    },
    actionButton: {
      padding: '6px 14px',
      fontSize: 14,
      borderRadius: 6,
      border: 'none',
      cursor: 'pointer',
      color: 'white',
      fontWeight: '600',
      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
      transition: 'background-color 0.3s',
    },
    editButton: {
      backgroundColor: '#27ae60',
    },
    deleteButton: {
      backgroundColor: '#e74c3c',
    },
  };

  return (
    <div style={styles.container}>
      <Menu /> {/* Aquí agregamos el menú */}

      <div style={styles.content}>
        <h1 style={styles.title}>Cargos Dashboard</h1>

        {error && <p style={styles.messageError}>{error}</p>}
        {mensaje && <p style={styles.messageSuccess}>{mensaje}</p>}

        <h2 style={styles.subtitle}>{editandoId ? 'Editar Cargo' : 'Crear Cargo'}</h2>
        <form
          onSubmit={editandoId ? actualizarCargo : crearCargo}
          style={styles.form}
        >
          <input
            type="text"
            placeholder="Cargo"
            value={cargo}
            onChange={e => setCargo(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Descripción"
            value={descripcionCargo}
            onChange={e => setDescripcionCargo(e.target.value)}
            required
            style={styles.input}
          />
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={jefatura}
              onChange={e => setJefatura(e.target.checked)}
            />
            ¿Es jefatura?
          </label>

          <div style={styles.buttonGroup}>
            <button
              type="submit"
              style={styles.button}
            >
              {editandoId ? 'Actualizar Cargo' : 'Crear Cargo'}
            </button>
            {editandoId && (
              <button
                type="button"
                style={{ ...styles.button, ...styles.buttonCancel }}
                onClick={resetFormulario}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        <h2 style={styles.subtitle}>Lista de Cargos</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Cargo</th>
              <th style={styles.th}>Descripción</th>
              <th style={styles.th}>Jefatura</th>
              <th style={styles.th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cargos.map(c => (
              <tr key={c.idCargo}>
                <td style={styles.td}>{c.cargo}</td>
                <td style={styles.td}>{c.descripcionCargo}</td>
                <td style={styles.td}>{c.jefatura ? 'Sí' : 'No'}</td>
                <td style={{ ...styles.td, ...styles.actionsTd }}>
                  <button
                    style={{ ...styles.actionButton, ...styles.editButton }}
                    onClick={() => editarCargo(c)}
                  >
                    Editar
                  </button>
                  <button
                    style={{ ...styles.actionButton, ...styles.deleteButton }}
                    onClick={() => eliminarCargo(c.idCargo)}
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
  );
};

export default CargosDashboard;
