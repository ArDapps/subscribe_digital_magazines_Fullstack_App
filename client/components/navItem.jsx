import React from "react";
import Link from "next/link";
export const NavItem = ({ title, path }) => {
  return (
    <div>
      <Link
        href={path}
        className="text-sm font-semibold leading-6 text-gray-900"
      >
        {title}
      </Link>
    </div>
  );
};
