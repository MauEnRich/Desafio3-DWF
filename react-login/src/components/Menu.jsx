import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../auth';

const Menu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const activeStyle = {
    fontWeight: 'bold',
    color: '#2563eb', // Azul más fuerte al estar activo
  };

  const styles = {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '30px',
    },
    container: {
      display: 'flex',
      gap: '25px',
      padding: '15px 30px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      alignItems: 'center',
    },
    link: {
      textDecoration: 'none',
      color: '#374151',
      fontSize: '16px',
      transition: 'color 0.3s',
    },
    logoutButton: {
      cursor: 'pointer',
      backgroundColor: '#ef4444',
      color: '#fff',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '6px',
      fontWeight: '600',
      transition: 'background-color 0.3s',
    },
  };

  return (
    <div style={styles.wrapper}>
      <nav style={styles.container}>
        <NavLink
          to="/dashboard"
          style={({ isActive }) => (isActive ? { ...styles.link, ...activeStyle } : styles.link)}
        >
          Departamentos
        </NavLink>

        <NavLink
          to="/cargos"
          style={({ isActive }) => (isActive ? { ...styles.link, ...activeStyle } : styles.link)}
        >
          Cargos
        </NavLink>

        <NavLink
          to="/Contrataciones"
          style={({ isActive }) => (isActive ? { ...styles.link, ...activeStyle } : styles.link)}
        >
          Contrataciones
        </NavLink>

         <NavLink
          to="/empleados"
          style={({ isActive }) => (isActive ? { ...styles.link, ...activeStyle } : styles.link)}
        >
          Empleados
        </NavLink>

        <button
          onClick={handleLogout}
          style={styles.logoutButton}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#dc2626')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#ef4444')}
        >
          Cerrar Sesión
        </button>
      </nav>
    </div>
  );
};

export default Menu;
