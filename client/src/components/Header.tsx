import { Link } from "wouter";
import logoSvg from "../assets/logo.svg";

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center">
                <img 
                  src={logoSvg} 
                  alt="InfinitePay" 
                  className="h-10" 
                />
                <span className="ml-2 font-semibold text-[#1A3353]">InfinitePay</span>
              </div>
            </Link>
          </div>
          <div className="text-sm text-gray-600">
            Calculadora de ROAS
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
