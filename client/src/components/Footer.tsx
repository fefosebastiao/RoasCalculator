import { Link } from "wouter";
import {
  LinkedinIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="text-white text-xl font-bold">ROAS</span>
              <span className="text-gray-400 text-xl font-light">Calc</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Calculadora de ROAS que ajuda profissionais de marketing a entender e otimizar o retorno sobre investimento em anúncios.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <TwitterIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Produto</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Calculadora de ROAS</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Analytics</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Integrações</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Planos e Preços</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Guias</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Webinars</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Suporte</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Sobre</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Carreiras</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Contato</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Parceiros</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} ROASCalc. Todos os direitos reservados.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm">Termos de Uso</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">Política de Privacidade</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
