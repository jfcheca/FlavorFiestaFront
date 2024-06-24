import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Img from "../../assets/chris-lee-70l1tDAI6rM-unsplash 1.jpg";
import "./SignUp.css";
import { Link } from "react-router-dom";
import API_BASE_URL from "../../config";
import CryptoJS from 'crypto-js'; // Importar la librería crypto-js

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const [apiResponse, setApiResponse] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (data) => {
    // Encriptar la contraseña
    const encryptedPassword = CryptoJS.SHA256(data.password).toString();
    console.log(encryptedPassword)
    const payload = {
      nombre: data.nombre,
      email: data.email,
      telefono: data.celular,
      password: encryptedPassword,
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
        // Si el usuario se crea con éxito, hacer la segunda solicitud para activar la cuenta
        await fetch(`${API_BASE_URL}/auth/tokenActivarCuenta`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: data.email }),
        });

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
              <p className="error-message">El campo nombre es requerido</p>
            )}
            {errors.nombre?.type === "minLength" && (
              <p className="error-message">El campo nombre debe tener al menos 5 caracteres</p>
            )}
            {errors.nombre?.type === "maxLength" && (
              <p className="error-message">El campo nombre debe tener menos de 30 caracteres</p>
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
              <p className="error-message">El campo celular es requerido</p>
            )}
            {errors.celular?.type === "minLength" && (
              <p className="error-message">El campo celular debe tener al menos 10 caracteres</p>
            )}
            {errors.celular?.type === "maxLength" && (
              <p className="error-message">El campo celular debe tener menos de 15 caracteres</p>
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
              <p className="error-message">El campo correo es requerido</p>
            )}
            {errors.email?.type === "pattern" && (
              <p className="error-message">El formato del email es incorrecto</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="contrasena">Contraseña</label>
            <div className="password-wrapper">
              <input
                className="inputText"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                })}
                id="contrasena"
                placeholder="Enter your password"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="password-icon"
                onClick={toggleShowPassword}
              />
            </div>
            {errors.password?.type === "required" && (
              <p className="error-message">El campo contraseña es requerido</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="error-message">La contraseña debe tener al menos 6 caracteres</p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="error-message">La contraseña debe tener menos de 20 caracteres</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="confirmarContrasena">Confirmar Contraseña</label>
            <div className="password-wrapper">
              <input
                className="inputText"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => value === watch('password') || "Las contraseñas no coinciden",
                })}
                id="confirmarContrasena"
                placeholder="Confirm your password"
              />
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                className="password-icon"
                onClick={toggleShowConfirmPassword}
              />
            </div>
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword.message}</p>
            )}
          </div>
          <div className="form-group error-checkbox" id="checkBox">
            <input
              type="checkbox"
              {...register("signUpCheckbox", { required: true })}
            />
            <label id="checkBoxLabel">
              I agree to the <a id="termsPolicy">terms & policy</a>
            </label>
          </div>
          {errors.signUpCheckbox?.type === "required" && (
            <p className="error-message">Debes aceptar los términos y políticas</p>
          )}
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
