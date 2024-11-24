"use client"
import Image from "next/image";
import styles from "../app/styles/PlantaBaja.module.css"; // Archivo CSS
import { Box, Button, IconButton, Modal } from "@mui/material";
import Ruleta from "@/components/ruleta";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { useState } from "react";

export default function PlantaBaja() {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);
  
  return (
    <>
    
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        {/* Imagen de fondo responsiva */}
        <Image
          src="/mapa/plantaBaja.png"
          alt="Mapa de fondo"
          layout="fill"
          objectFit="contain" // Asegura que la imagen mantenga su proporción
          className={styles.backgroundImage}
        />
        {/* Imagen superpuesta responsiva */}
        <Image
          src="/gif/open2.gif"
          alt="Indicador"
          width={50}
          height={50}
          className={styles.overlayImage}
          onClick={handleOpenModal}
        />
      </div>
    </div>

          {/* Modal que contiene la Ruleta */}
          <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#82b684",
            boxShadow: 24,
            p: { xs: 2, sm: 4 },
            textAlign: "center",
            borderRadius: "10px",
            width: { xs: "95%", sm: "90%", md: "600px" },
          }}
        >
          <Ruleta />
          <IconButton
            onClick={handleCloseModal}
            variant="outlined"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <DisabledByDefaultIcon
            sx={{ fontSize: 40, color: "#82b684", bgcolor: "red" }}
            />
          </IconButton>
        </Box>
      </Modal>
    </>

  );
}
