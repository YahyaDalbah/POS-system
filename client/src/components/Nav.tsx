import { useState } from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  const [activeLink, setActiveLink] = useState(-1);

  const links = [
    {
      text: "menu",
      to: "/",
    },
    {
      text: "products",
      to: "/products",
    },
  ];

  const handleLinkClick = (i: number) => {
    setActiveLink(i);
  };

  return (
    <nav className="">
      <h1 className="text-white text-center pr-10 py-12 text-3xl mb-10">
        Yahya POS
      </h1>
      <div className="w-full">
        {/* <Link to={"/"}>pos page</Link> */}
        {links.map((link, i) => (
          <div
            key={i}
            className={`${
              activeLink === i ? "bg-lightGray text-white" : ""
            } mx-3 p-4 rounded-xl font-normal`}
          >
            <Link onClick={() => handleLinkClick(i)} to={link.to}>
              {link.text}
            </Link>
          </div>
        ))}
        {/* <Link to={"/uoms"}>units of measure</Link> */}
      </div>
    </nav>
  );
}
