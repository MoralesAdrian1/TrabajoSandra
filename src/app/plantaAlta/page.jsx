import { Typography } from "@mui/material";
import Image from "next/image";
import styles from "../styles/PlantaBaja.module.css"

export default function PlantaBaja() {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src="/mapa/plantaAlta.png" // Cambia la ruta a la de tu imagen
          alt="Imagen de fondo"
          width={800} // Ajusta al tamaño original de tu imagen
          height={400} // Ajusta al tamaño original de tu imagen
          className={styles.image}
        />
      </div>
    </div>
  );
}
