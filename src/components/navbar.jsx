"use client";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import StairsIcon from '@mui/icons-material/Stairs';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const GlowingButton = styled(Button)(({ theme, gradient }) => ({
  position: 'relative',
  overflow: 'hidden',
  background: gradient,
  color: 'white',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  fontSize: '0.8rem', // Tamaño reducido del texto
  padding: '0.5rem 1rem', // Reduce el tamaño del botón
  borderRadius: '5px',
  cursor: 'pointer',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-150%',
    width: '150%',
    height: '100%',
    background: 'rgba(255, 255, 255, 0.4)',
    transform: 'skewX(-45deg)',
    animation: 'glowAnimation 3s linear infinite', // Animación continua
  },
  '@keyframes glowAnimation': {
    '0%': {
      left: '-150%',
    },
    '100%': {
      left: '150%',
    },
  },
  '&:hover': {
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)',
  },
}));

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#82b684" }}>
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "column", // Configura los botones en columna
            alignItems: "center", // Centra los botones horizontalmente
            gap: 2, // Espaciado entre los botones
          }}
        >
          
          {/* Contenedor para los otros 3 botones */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1, // Espaciado entre los botones
              marginTop: 1,
            }}
          >
            <GlowingButton
              gradient="linear-gradient(90deg, #d4a20f, #ffcc00)"
              href="/"
            >
              Planta Baja
            </GlowingButton>
            <GlowingButton
              gradient="linear-gradient(90deg, #007bff, #00ccff)"
              href="/plantaAlta"
            >
              Planta Alta
            </GlowingButton>
            <GlowingButton
              gradient="linear-gradient(90deg, #d32f2f, #ff5252)"
              href="/kioscos"
            >
              Kioskos
            </GlowingButton>
          </Box>
          <GlowingButton
            sx={{ color: "black", width: "200px", marginBottom: 1 }}
            gradient="linear-gradient(90deg, #f5f5f5, #e0e0e0)"
            href="/instrucciones"
          >
            Como Jugar
          </GlowingButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
