import { useEffect, useRef, useState } from "react";
import { MagnifyingGlass } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState(false);
  const searchBarRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params = new URLSearchParams({ q: query });
    navigate(`/search?${params}`);
  };

  const handleOpenSearch = () => {
    setFocus(true);
  };

  const handleOnBlur = (event: React.FocusEvent<HTMLFormElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setFocus(false);
    }
  };

  useEffect(() => {
    searchBarRef.current?.focus();
  }, [focus]);

  const searchBarNotActive = (
    <span
      className="tooltip tooltip-bottom hover:tooltip-open"
      data-tip="Search"
    >
      <button
        className="btn btn-ghost btn-circle"
        aria-label="Open search"
        onClick={handleOpenSearch}
      >
        <MagnifyingGlass size={24} />
      </button>
    </span>
  );

  const searchBarActive = (
    <div className="flex">
      <input
        aria-label="Search"
        ref={searchBarRef}
        className="input pr-14"
        placeholder="Search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <button
        className="btn btn-primary btn-square -ml-12 rounded-tl-none rounded-bl-none"
        disabled={!query}
        aria-label="Search"
      >
        <MagnifyingGlass size={24} />
      </button>
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx({
        "absolute left-0 z-50 w-full px-2": focus,
      })}
      onBlur={handleOnBlur}
    >
      {focus ? searchBarActive : searchBarNotActive}
    </form>
  );
};

export default SearchBar;
