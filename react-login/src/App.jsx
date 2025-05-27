import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import CargosDashboard from './components/Cargos';
import ContratacionesDashboard from './components/Contrataciones'; // ya importado
import Empleados from './components/Empleados';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cargos" element={<CargosDashboard />} />
        <Route path="/contrataciones" element={<ContratacionesDashboard />} />
         <Route path="/empleados" element={<Empleados />} />
      </Routes>
    </Router>
  );
}

export default App;
