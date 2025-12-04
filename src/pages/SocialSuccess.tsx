import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "../api/axios";

const SocialSuccess: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) {
      history.replace("/login");
      return;
    }

    // Guardamos token
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Consultar perfil del usuario
    api.get("/auth/profile")
      .then((res) => {
        const user = res.data;

        console.log("USUARIO LOGUEADO:", user);

        // 1️⃣ Si NO tiene contraseña -> enviar a CREAR CONTRASEÑA
        if (!user.password || user.password === null) {
          history.replace("/password");
          return;
        }

        // 2️⃣ Si NO tiene rol -> seleccionar rol
        if (!user.role || user.role === null) {
          history.replace("/selectrole");
          return;
        }

        // 3️⃣ Usuario cuidador
        if (user.role === "CUIDADOR") {
          history.replace("/care");
          return;
        }

        // 4️⃣ Usuario paciente
        if (user.role === "PACIENTE") {
          history.replace("/patient");
          return;
        }
      })
      .catch(() => {
        history.replace("/login");
      });
  }, [history]);

  return <p>Procesando inicio de sesión...</p>;
};

export default SocialSuccess;
