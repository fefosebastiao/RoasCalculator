import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Set the document title
document.title = "Calculadora de ROAS | Entenda seu Retorno sobre Investimento em Anúncios";

createRoot(document.getElementById("root")!).render(<App />);
