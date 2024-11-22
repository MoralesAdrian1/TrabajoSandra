"use client";
import React, { useEffect, useRef, useState } from "react";
import { Box, Button } from "@mui/material";

export default function Ruleta() {
  const canvasRef = useRef(null);
  const [size, setSize] = useState(500); // Tamaño dinámico de la ruleta
  const options = ["red", "blue", "yellow", "black", "white"]; // Colores válidos en inglés

  let startAngle = 0;
  const arc = Math.PI / (options.length / 2);
  let spinTimeout = null;

  let spinArcStart = 10;
  let spinTime = 0;
  let spinTimeTotal = 0;

  useEffect(() => {
    // Configura un evento de resize para hacer la ruleta responsiva
    const handleResize = () => {
      const newSize = Math.min(window.innerWidth * 0.8, 500); // Máximo 500px, ajusta al 80% del ancho
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
  }, [size]); // Redibuja la ruleta cuando cambie el tamaño

  const drawRouletteWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const outsideRadius = size / 2 - 20;
    const textRadius = size / 2 - 40;
    const insideRadius = size / 2 - 80;

    ctx.clearRect(0, 0, size, size);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    ctx.font = `${size / 25}px Helvetica, Arial`; // Ajustar tamaño de fuente proporcionalmente

    for (let i = 0; i < options.length; i++) {
      const angle = startAngle + i * arc;

      // Asignar el color del segmento basado en el texto de la opción
      ctx.fillStyle = options[i];

      ctx.beginPath();
      ctx.arc(size / 2, size / 2, outsideRadius, angle, angle + arc, false);
      ctx.arc(size / 2, size / 2, insideRadius, angle + arc, angle, true);
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
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.save();
    ctx.font = `${size / 15}px Helvetica, Arial`;
    const text = options[index];
    ctx.fillStyle = "black";
    ctx.fillText(text, size / 2 - ctx.measureText(text).width / 2, size / 2 + 10);
    ctx.restore();
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
    </Box>
  );
}
