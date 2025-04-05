import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/">
              <a className="flex items-center">
                <span className="text-primary text-2xl font-bold">ROAS</span>
                <span className="text-gray-700 text-2xl font-light">Calc</span>
              </a>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#">
              <a className="text-gray-600 hover:text-primary font-medium text-sm">Produto</a>
            </Link>
            <Link href="#">
              <a className="text-gray-600 hover:text-primary font-medium text-sm">Casos de Uso</a>
            </Link>
            <Link href="#">
              <a className="text-gray-600 hover:text-primary font-medium text-sm">Preços</a>
            </Link>
            <Button variant="default">Fale Conosco</Button>
          </nav>
          
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="#">
              <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">
                Produto
              </a>
            </Link>
            <Link href="#">
              <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">
                Casos de Uso
              </a>
            </Link>
            <Link href="#">
              <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">
                Preços
              </a>
            </Link>
            <Link href="#">
              <a className="block px-3 py-2 rounded-md text-base font-medium text-primary bg-primary-50 hover:bg-primary-100">
                Fale Conosco
              </a>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
