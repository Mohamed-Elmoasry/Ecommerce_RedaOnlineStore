import { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { PiSignInBold } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa6";

const NavLinks = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about" },
  { title: "Accessories", link: "/accessories" },
  { title: "Blog", link: "/blog" },
  { title: "Contact", link: "/contact" },
];

export default function BtmHeader() {
  const location = useLocation();

  const [categories, setCategories] = useState([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  // جلب الكاتيجوريز مرة واحدة
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(
          "https://dummyjson.com/products/categories"
        );

        // لو API رجع array من objects بدل strings، نحولهم لـ string
        const data = res.data.map((item) => {
          if (typeof item === "string") return item;
          if (item.slug) return item.slug;
          return item.name || JSON.stringify(item);
        });

        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };

    getCategories();
  }, []);

  return (
    <div className="btm-header">
      <div className="container">
        <nav className="nav">
          {/* Categories */}
          <div className="category-nav">
            <div
              className="category-btn"
              onClick={() => setIsCategoryOpen((prev) => !prev)}
            >
              <IoMenu />
              <p>Browse category</p>
              <IoMdArrowDropdown />
            </div>

            <div
              className={`category-nav-list ${
                isCategoryOpen ? "active" : ""
              }`}
            >
              {categories.map((category, index) => (
                <Link
                  key={index} // index آمن مع data ثابتة
                  to={`/category/${category}`}
                  onClick={() => setIsCategoryOpen(false)}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <ul className="nav-links">
            {NavLinks.map((item) => (
              <li
                key={item.link}
                className={location.pathname === item.link ? "active" : ""}
              >
                <Link to={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth icons */}
        <div className="sgin-regi-icons">
          <Link to="/login">
            <PiSignInBold />
          </Link>
          <Link to="/register">
            <FaUserPlus />
          </Link>
        </div>
      </div>
    </div>
  );
}
