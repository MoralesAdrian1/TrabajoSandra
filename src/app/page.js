"use client";
import { useState } from "react";
import { Box, Button, IconButton, Modal } from "@mui/material";
import Ruleta from "@/components/ruleta";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Button
        onClick={handleOpenModal}
        variant="contained"
        color="primary"
        sx={{
          mt: 3,
          px: { xs: 2, sm: 4 },
          fontSize: { xs: "12px", sm: "16px" },
        }}
      >
        Abrir Ruleta
      </Button>
      <Button
        variant="contained"
        href="/plantaBaja"
        color="primary"
        sx={{
          mt: 3,
          px: { xs: 2, sm: 4 },
          fontSize: { xs: "12px", sm: "16px" },
        }}
      >
        planta baja
      </Button>
      <Button
        variant="contained"
        href="/plantaAlta"
        color="primary"
        sx={{
          mt: 3,
          px: { xs: 2, sm: 4 },
          fontSize: { xs: "12px", sm: "16px" },
        }}
      >
        planta Alta
      </Button>
      <Button
        variant="contained"
        href="/kioscos"
        color="primary"
        sx={{
          mt: 3,
          px: { xs: 2, sm: 4 },
          fontSize: { xs: "12px", sm: "16px" },
        }}
      >
       kiskos
      </Button>




      {/* Modal que contiene la Ruleta */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
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
              sx={{ fontSize: 40, color: "red", bgcolor: "white" }}
            />
          </IconButton>
        </Box>
      </Modal>
    </div>
  );
}
