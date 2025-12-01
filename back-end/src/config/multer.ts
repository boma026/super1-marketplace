import multer from "multer";
import path from "path";
import fs from "fs";
const uploadDir = "uploads/services";

// Cria o diretório de upload se não existir
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  // Define o destino dos arquivos enviados
  destination: (req, file, cb) => {
    cb(null, "uploads/services");
  },
  // Gera um nome único para cada arquivo enviado
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

// Exporta o middleware de upload configurado
export const upload = multer({ storage });
