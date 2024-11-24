"use client";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom"; // Importamos ReactDOM para usar Portals
import { Box, Button, Modal, Typography } from "@mui/material";
import { styled } from "@mui/system";
import confetti from "canvas-confetti"; // Importamos la biblioteca

const GlowingButton = styled(Button)(({ theme, gradient }) => ({
  position: "relative",
  overflow: "hidden",
  background: gradient,
  color: "white",
  textTransform: "uppercase",
  fontWeight: "bold",
  fontSize: "0.8rem", // Tamaño reducido del texto
  padding: "0.5rem 1rem", // Reduce el tamaño del botón
  borderRadius: "5px",
  cursor: "pointer",
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-150%",
    width: "150%",
    height: "100%",
    background: "rgba(255, 255, 255, 0.4)",
    transform: "skewX(-45deg)",
    animation: "glowAnimation 3s linear infinite", // Animación continua
  },
  "@keyframes glowAnimation": {
    "0%": {
      left: "-150%",
    },
    "100%": {
      left: "150%",
    },
  },
  "&:hover": {
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)",
  },
}));

export default function Ruleta() {
  const canvasRef = useRef(null);
  const [size, setSize] = useState(500); // Tamaño dinámico de la ruleta
  const [result, setResult] = useState(null); // Resultado de la ruleta
  const [isResultModalOpen, setResultModalOpen] = useState(false); // Controla el modal del resultado
  const options = [
    "#8B0000", // Soft Red
    "#00008B", // Soft Blue
    "#FFD700", // Soft Yellow
    "#000000", // Soft Black
    "#F0F8FF", // Soft White
  ]; // Colores derivados de la gama #82b684

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
      const text = ["Rojo", "Azul", "Amarillo", "Negro", "Blanco"][i];
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
    setTimeout(() => {
      triggerConfetti();
    }, 300);
  };

  const triggerConfetti = () => {
    const confettiContainer = document.getElementById("confetti-container");
    if (confettiContainer) {
      const confettiCanvas = document.createElement("canvas");
      confettiContainer.appendChild(confettiCanvas);

      const confettiInstance = confetti.create(confettiCanvas, { resize: true });
      confettiInstance({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.5, y: 10 }, // Centrado sobre el modal
      });

      // Limpia el canvas después de un tiempo
      setTimeout(() => {
        confettiCanvas.remove();
      }, 3000);
    }
  };

  const easeOut = (t, b, c, d) => {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  };

  return (
    <>
      {/* Portal para el contenedor de confeti */}
      {ReactDOM.createPortal(
        <div
          id="confetti-container"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 3000, // Más alto que cualquier modal
            pointerEvents: "none",
          }}
        ></div>,
        document.body
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 2,
          bgcolor: "#82b684",
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

        <GlowingButton
          gradient="linear-gradient(90deg, #8B0000, #00008B)"
          onClick={spin}
        >
          Girar Ruleta
        </GlowingButton>

        <Modal open={isResultModalOpen} onClose={() => setResultModalOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "#82b684",
              boxShadow: 24,
              p: 4,
              textAlign: "center",
              borderRadius: "10px",
              width: "300px",
            }}
          >
            {result && (
              <Typography
                variant="h2"
                sx={{
                  color: result,
                }}
              >
                {
                  {
                    "#8B0000": "Rojo",
                    "#00008B": "Azul",
                    "#FFD700": "Amarillo",
                    "#000000": "Negro",
                    "#F0F8FF": "Blanco",
                  }[result]
                }
              </Typography>
            )}

            <GlowingButton
              gradient="linear-gradient(90deg, #8B0000, #00008B)"
              onClick={() => setResultModalOpen(false)}
            >
              Cerrar
            </GlowingButton>
          </Box>
        </Modal>
      </Box>
    </>
  );
}
