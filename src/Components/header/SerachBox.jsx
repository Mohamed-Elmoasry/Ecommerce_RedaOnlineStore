import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function SerachBox() {
  const [suggestion, setSuggestion] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setSuggestion([]);
    }
  };

  useEffect(() => {
    const fetchSuggestion = async () => {
      if (!searchTerm.trim()) {
        setSuggestion([]);
        return;
      }

      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(
            searchTerm
          )}`
        );
        const data = await res.json();
        setSuggestion(data.products.slice(0, 5) || []);
      } catch (error) {
        console.log("Search Error :", error);
        setSuggestion([]);
      }
    };

    const debounce = setTimeout(() => {
      fetchSuggestion();
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  return (
    <div className="SerachBos_Container">
      {/* نضيف key على الـ form أو input بحيث يمسح suggestions عند تغيير الصفحة */}
      <form
        key={location.pathname}
        onSubmit={handleSubmit}
        className="search-box"
      >
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search For Products..."
          onChange={(e) => setSearchTerm(e.target.value)}
          autoComplete="off"
        />
        <button className="Submit">
          <FaSearch />
        </button>
      </form>

      {suggestion.length > 0 && (
        <ul className="suggestion">
          {suggestion.map((item) => (
            <Link key={item.id} to={`/products/${item.id}`}>
              <li>
                <img src={item.images[0]} alt={item.title} />
                <span>{item.title}</span>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
