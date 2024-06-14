import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'; // Iconos de FontAwesome
import API_BASE_URL from "../../config";
import './EditarPerfil.css'; // Importa el archivo de estilos CSS

const EditProfile = () => {
  const { usuario, actualizarUsuario } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    id_rol: 1
    // Agrega más campos según tus necesidades
  });
  const [loading, setLoading] = useState(true); // Estado para manejar la carga inicial
  const [alert, setAlert] = useState(null); // Estado para manejar la alerta

  useEffect(() => {
    if (usuario) {
      setFormData({
        nombre: usuario.nombre,
        email: usuario.email,
        telefono: usuario.telefono,
        password: usuario.password,
        id_rol: 1
      });
      setLoading(false); // Cuando el usuario está disponible, detenemos la carga
    }
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/${usuario.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const responseData = await response.json();
      console.log('Respuesta del servidor:', responseData);
  
      if (!response.ok) {
        console.error('Error al actualizar:', responseData);
        showAlert('error', 'Error al actualizar el perfil');
      } else {
        console.log('Datos actualizados con éxito');
        showAlert('success', 'Perfil actualizado exitosamente');
        
        // Actualizar el contexto de autenticación
        actualizarUsuario({
            nombre: formData.nombre,
            email: formData.email,
            telefono: formData.telefono,
            password: formData.password,
            // Puedes agregar más campos aquí si son necesarios
          }); // Suponiendo que `responseData` contiene los datos actualizados del usuario
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      showAlert('error', 'Error en la solicitud');
    }
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert(null);
    }, 5000); // Ocultar la alerta después de 5 segundos
  };

  if (loading) {
    return <p>Cargando datos del usuario...</p>;
  }

  return (
    <div className="profile-container">
      <h2 className="profile-title">Información de la Cuenta</h2>
      {alert && (
        <div className={`alert alert-${alert.type}`}>
          <FontAwesomeIcon icon={alert.type === 'success' ? faCheckCircle : faTimesCircle} />
          <span>{alert.message}</span>
        </div>
      )}
      <div className="profile-row">
        <label className="profile-label">Nombre:</label>
        <input
          className="profile-input"
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
      </div>
      <div className="profile-row">
        <label className="profile-label">Correo:</label>
        <input
          className="profile-input"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="profile-row">
        <label className="profile-label">Contraseña:</label>
        <input
          className="profile-input"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div className="profile-row">
        <label className="profile-label">Teléfono:</label>
        <input
          className="profile-input"
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
        />
      </div>
      <div className="profile-row">
        <button className="profile-button" onClick={handleSubmit}>Guardar Cambios</button>
      </div>
    </div>
  );
};

export default EditProfile;
