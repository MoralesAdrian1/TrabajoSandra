// InstruccionesModal.jsx
"use client";
import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Image from 'next/image';
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { IconButton } from '@mui/material';
import { Height } from '@mui/icons-material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  Height: 700,
  bgcolor: '#82b684',
  border: '2px solid #000',
  boxShadow: 24,
  p: 1,
};

export default function InstruccionesModal({ open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-instrucciones-title"
      aria-describedby="modal-instrucciones-description"
    >
      <Box sx={modalStyle}>
      <Image
          src="/instrucciones2.png"
          alt="Instrucciones"
          width={350}
          height={700}
        />
        <IconButton
            onClick={handleClose}
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
  );
}
