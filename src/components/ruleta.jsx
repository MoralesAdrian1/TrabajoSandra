"use client";
import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

export default function Ruleta() {
  const canvasRef = useRef(null);
  const [size, setSize] = useState(500); // Tamaño dinámico de la ruleta
  const [result, setResult] = useState(null); // Resultado de la ruleta
  const [isResultModalOpen, setResultModalOpen] = useState(false); // Controla el modal del resultado
  const options = ["red", "blue", "yellow", "black", "white"]; // Colores válidos en inglés

  let startAngle = 0;
  const arc = Math.PI / (options.length / 2);
  let spinTimeout = null;

  let spinArcStart = 10;
  let spinTime = 0;
  let spinTimeTotal = 0;

  useEffect(() => {
    const handleResize = () => {
      const newSize = Math.min(window.innerWidth * 0.8, 500);
      setSize(newSize);
    };

    handleResize(); // Ajusta el tamaño inicial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      drawRouletteWheel();
    }
  }, [size]);

  const drawRouletteWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
  
    const outsideRadius = size / 2 - 20; // Radio externo
    const textRadius = size / 2 - 40; // Donde se dibuja el texto
    const insideRadius = 0; // Cambiado a 0 para extender los segmentos hasta el centro
  
    ctx.clearRect(0, 0, size, size);
  
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
  
    ctx.font = `${size / 25}px Helvetica, Arial`;
  
    for (let i = 0; i < options.length; i++) {
      const angle = startAngle + i * arc;
  
      ctx.fillStyle = options[i];
  
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, outsideRadius, angle, angle + arc, false);
      ctx.lineTo(size / 2, size / 2); // Línea hacia el centro
      ctx.fill();
      ctx.stroke();
  
      ctx.save();
      ctx.fillStyle = "white";
      ctx.translate(
        size / 2 + Math.cos(angle + arc / 2) * textRadius,
        size / 2 + Math.sin(angle + arc / 2) * textRadius
      );
      ctx.rotate(angle + arc / 2 + Math.PI / 2);
      const text = options[i];
      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      ctx.restore();
    }
  
    // Flecha
    ctx.fillStyle = "purple";
    ctx.beginPath();
    ctx.moveTo(size / 2 - 4, size / 2 - (outsideRadius + 5));
    ctx.lineTo(size / 2 + 4, size / 2 - (outsideRadius + 5));
    ctx.lineTo(size / 2 + 4, size / 2 - (outsideRadius - 5));
    ctx.lineTo(size / 2 + 9, size / 2 - (outsideRadius - 5));
    ctx.lineTo(size / 2 + 0, size / 2 - (outsideRadius - 13));
    ctx.lineTo(size / 2 - 9, size / 2 - (outsideRadius - 5));
    ctx.lineTo(size / 2 - 4, size / 2 - (outsideRadius - 5));
    ctx.lineTo(size / 2 - 4, size / 2 - (outsideRadius + 5));
    ctx.fill();
  };

  const spin = () => {
    spinArcStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3 + 4 * 1000;
    rotateWheel();
  };

  const rotateWheel = () => {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
      stopRotateWheel();
      return;
    }
    const spinAngle =
      spinArcStart - easeOut(spinTime, 0, spinArcStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI) / 180;
    drawRouletteWheel();
    spinTimeout = setTimeout(rotateWheel, 30);
  };

  const stopRotateWheel = () => {
    clearTimeout(spinTimeout);
    const degrees = (startAngle * 180) / Math.PI + 90;
    const arcd = (arc * 180) / Math.PI;
    const index = Math.floor((360 - (degrees % 360)) / arcd);

    setResult(options[index]); // Establecer el resultado seleccionado
    setResultModalOpen(true); // Abrir el modal del resultado
  };

  const easeOut = (t, b, c, d) => {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 2,
      }}
    >
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      ></canvas>
      <Button
        onClick={spin}
        variant="contained"
        color="primary"
        sx={{
          mt: 3,
          px: { xs: 2, sm: 4 },
          fontSize: { xs: "12px", sm: "16px" },
        }}
      >
        Girar Ruleta
      </Button>

      {/* Modal para mostrar el resultado */}
      {/* Modal para mostrar el resultado */}
<Modal
  open={isResultModalOpen}
  onClose={() => setResultModalOpen(false)}
>
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
      textAlign: "center",
      borderRadius: "10px",
      width: "300px",
    }}
  >
    <Typography variant="h6" sx={{ mb: 2 }}>
      ¡Resultado!
    </Typography>
    {result && (
      <>
        <Typography
          variant="h4"
          sx={{
            color: result === "white" ? "black" : result,
          }}
        >
          {
            {
              red: "Rojo",
              blue: "Azul",
              yellow: "Amarillo",
              black: "Negro",
              white: "Blanco",
            }[result]
          }
        </Typography>
      </>
    )}
    <Button
      onClick={() => setResultModalOpen(false)}
      variant="contained"
      sx={{ mt: 3 }}
    >
      Cerrar
    </Button>
  </Box>
</Modal>

    </Box>
  );
}
