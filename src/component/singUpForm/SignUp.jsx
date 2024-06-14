import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Img from "../../assets/chris-lee-70l1tDAI6rM-unsplash 1.jpg";
import "./SignUp.css";
import { Link } from "react-router-dom";
import API_BASE_URL from "../../config";

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [apiResponse, setApiResponse] = useState(null);

  const onSubmit = async (data) => {
    const payload = {
      nombre: data.nombre,
      email: data.email,
      telefono: data.celular,
      password: data.password,
      id_rol: 1 // Asignamos manualmente el ID del rol
    };

    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/crear`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        setApiResponse({ success: true, data: result });
      } else {
        setApiResponse({ success: false, message: result.message || "Error al crear usuario" });
      }
    } catch (error) {
      setApiResponse({ success: false, message: "Error de red" });
    }
  };

  return (
    <div id="whole-signupForm">
      <div id="signUpDiv" className="sigForm">
        <form id="signuoForm" onSubmit={handleSubmit(onSubmit)}>
          <h2>Creemos tu cuenta!</h2>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              className="inputText"
              type="text"
              {...register("nombre", {
                required: true,
                minLength: 5,
                maxLength: 30,
              })}
              id="nombre"
              placeholder="Enter your name"
            />
            {errors.nombre?.type === "required" && (
              <p>El campo nombre es requerido</p>
            )}
            {errors.nombre?.type === "minLength" && (
              <p>El campo nombre debe tener al menos 5 caracteres</p>
            )}
            {errors.nombre?.type === "maxLength" && (
              <p>El campo nombre debe tener menos de 30 caracteres</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="celular">Celular</label>
            <input
              className="inputText"
              type="text"
              {...register("celular", {
                required: true,
                minLength: 10,
                maxLength: 15,
              })}
              id="celular"
              placeholder="Enter your celphone"
            />
            {errors.celular?.type === "required" && (
              <p>El campo celular es requerido</p>
            )}
            {errors.celular?.type === "minLength" && (
              <p>El campo celular debe tener al menos 10 caracteres</p>
            )}
            {errors.celular?.type === "maxLength" && (
              <p>El campo celular debe tener menos de 15 caracteres</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="correo">Correo Electrónico</label>
            <input
              className="inputText"
              type="text"
              {...register("email", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
              })}
              id="correo"
              placeholder="Enter your email"
            />
            {errors.email?.type === "required" && (
              <p>El campo correo es requerido</p>
            )}
            {errors.email?.type === "pattern" && (
              <p>El formato del email es incorrecto</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="contrasena">Contraseña</label>
            <input
              className="inputText"
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
              })}
              id="contrasena"
              placeholder="Enter your password"
            />
            {errors.password?.type === "required" && (
              <p>El campo contraseña es requerido</p>
            )}
            {errors.password?.type === "minLength" && (
              <p>La contraseña debe tener al menos 6 caracteres</p>
            )}
            {errors.password?.type === "maxLength" && (
              <p>La contraseña debe tener menos de 20 caracteres</p>
            )}
          </div>
          <div className="form-group" id="checkBox">
            <input
              type="checkbox"
              {...register("signUpCheckbox", { required: true })}
            />
            <label id="checkBoxLabel">
              I agree to the <a id="termsPolicy">terms & policy</a>
            </label>

            {errors.signUpCheckbox?.type === "required" && (
              <p>Debes aceptar los términos y políticas</p>
            )}
          </div>
          <button id="botonRegistrarse" type="submit">
            ¡Regístrate!
          </button>
        </form>
        {apiResponse && (
          <div className={apiResponse.success ? "success-message" : "error-message"}>
            {apiResponse.success ? (
              <div>
                <p>Usuario creado con éxito:</p>
              </div>
            ) : (
              <p>{apiResponse.message}</p>
            )}
          </div>
        )}
        <div id="signUpDiv" className="form-group">
          <div id="or">
            <hr className="horizontal-line" />
            <h6>or</h6>
            <hr className="horizontal-line" />
          </div>
          <span className="centered-span">
            ¿tienes cuenta?{" "}
            <Link id="iSesion" to="/login">
              Inicia sesión
            </Link>
          </span>
        </div>
      </div>
      <div id="signUpDiv">
        <img src={Img} alt="img de apoyo" id="imagenRegistro" />
      </div>
    </div>
  );
};

export default SignUp;
