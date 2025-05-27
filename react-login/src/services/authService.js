// src/services/authService.js

export async function login(usuario, password) {
  const res = await fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, password }),
  });

  if (!res.ok) {
    throw new Error('Credenciales inválidas');
  }

  const data = await res.json();
  const token = data.token; // asegúrate que tu backend envía { token: "jwt..." }
  
  localStorage.setItem('token', token);
  return token;
}
