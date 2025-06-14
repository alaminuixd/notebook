import React from "react";
import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-gray-200">
      <div className="mx-auto max-w-7xl p-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold font-poppins">Note App</h1>
          <div>
            <Link to="/create" className="btn btn-add flex gap-2">
              <PlusIcon size={23} strokeWidth={3} />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
