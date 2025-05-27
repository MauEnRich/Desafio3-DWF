import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const LoginForm = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [btnHover, setBtnHover] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(usuario, password);
      navigate('/dashboard');
    } catch {
      setError('Credenciales inválidas');
    }
  };

  const styles = {
    container: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f7f9fc', // fondo muy claro, casi blanco
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    },
    form: {
      width: '320px',
      padding: '32px 30px',
      borderRadius: '12px',
      backgroundColor: '#fff', // blanco puro para el formulario
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)', // sombra sutil
      color: '#333', // texto oscuro suave
      textAlign: 'center',
    },
    title: {
      marginBottom: '24px',
      fontWeight: '600',
      fontSize: '1.8rem',
      color: '#222',
    },
    error: {
      color: '#e03e3e', // rojo suave para error
      marginBottom: '18px',
      fontWeight: '500',
    },
    input: {
      width: '100%',
      padding: '12px 14px',
      marginBottom: '20px',
      borderRadius: '6px',
      border: '1.5px solid #ddd',
      fontSize: '1rem',
      color: '#222',
      outline: 'none',
      boxSizing: 'border-box',
      transition: 'border-color 0.25s ease',
    },
    inputFocus: {
      borderColor: '#3b82f6', // azul suave cuando está enfocado
      boxShadow: '0 0 5px rgba(59, 130, 246, 0.3)',
    },
    button: {
      width: '100%',
      padding: '12px',
      borderRadius: '6px',
      border: 'none',
      backgroundColor: btnHover ? '#2563eb' : '#3b82f6', // azul claro y un poco más oscuro al hover
      color: '#fff',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      userSelect: 'none',
    },
  };

  // Para manejar el foco y cambiar estilos en inputs, usamos estado local por input
  const [usuarioFocus, setUsuarioFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form} noValidate>
        <h2 style={styles.title}>Iniciar Sesión</h2>
        {error && <p style={styles.error}>{error}</p>}

        <input
          type="text"
          placeholder="Nombre de usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
          style={{
            ...styles.input,
            ...(usuarioFocus ? styles.inputFocus : {}),
          }}
          onFocus={() => setUsuarioFocus(true)}
          onBlur={() => setUsuarioFocus(false)}
          autoComplete="username"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            ...styles.input,
            ...(passwordFocus ? styles.inputFocus : {}),
          }}
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
          autoComplete="current-password"
        />

        <button
          type="submit"
          style={styles.button}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
