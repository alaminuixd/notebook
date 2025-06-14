import React from "react";
import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-green-1 border-b border-green-2">
      <div className="mx-auto max-w-7xl p-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <h1 className="logo-style">Note App</h1>
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
