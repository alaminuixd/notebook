import React from "react";
import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-gray-100 border-b border-gray-200 py-5">
      <div className="mx-auto max-w-7xl p-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <h1 className="logo-style">
            <Link to="/">Note App</Link>
          </h1>
          <div>
            <Link to="/create" className="flex btn-add">
              <PlusIcon size={20} strokeWidth={3} />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
