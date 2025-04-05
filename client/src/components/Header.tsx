import { Link } from "wouter";

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center">
                <span className="text-primary text-2xl font-bold">ROAS</span>
                <span className="text-gray-700 text-2xl font-light">Calc</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
