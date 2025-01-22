// src/components/RegisterPage.tsx
import React, { useState } from "react";
//import "./registerStyles.scss";
import { Grid, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    fechaNacimiento: "",
    email: "",
    telefono: "",
    direccion: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validaciones básicas
    if (Object.values(formData).some((field) => field === "")) {
      setError("Por favor, completa todos los campos.");
      setLoading(false);
      return;
    }

    try {
      // Simula un envío a la API
      console.log("Registrando paciente:", formData);

      // Navega a otra página o muestra un mensaje de éxito
      navigate("/pacientes");
    } catch (err) {
      console.error("Error al registrar paciente:", err);
      setError("Hubo un error al registrar al paciente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
      <Grid
        item
        xs={11}
        sm={8}
        md={8}
        lg={8}
        style={{
          padding: "20px",
          border: "1px solid #67e8fc",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <form onSubmit={handleRegister}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Typography variant="h5" align="center">
                Registro de Paciente
              </Typography>
            </Grid>

            {Object.keys(formData).map((field) => (
              <Grid item key={field}>
                <TextField
                  fullWidth
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  type={field === "fechaNacimiento" ? "date" : "text"}
                  name={field}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  required
                  InputLabelProps={field === "fechaNacimiento" ? { shrink: true } : undefined}
                />
              </Grid>
            ))}

            {error && (
              <Grid item>
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              </Grid>
            )}

            <Grid item container spacing={2} justifyContent="center">
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {loading ? "Registrando..." : "Registrar"}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
