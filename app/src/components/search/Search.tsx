import React, { useEffect, useState } from "react";
import searchIcon from "../../images/searchicon.svg";
import "./Search.css";

function Search({className}: {className: string}) {
    const [query, setQuery] = useState("");
    const [error, setError] = useState("");
    useEffect(() => {
        setError(query ? "Search not yet implemented" : "");
    })
    return (<div className={`Search ${className || ""}`}>
        
        <input className="Search__input" id="SearchInput" type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <label className="Search__label" htmlFor="SearchInput"><img src={searchIcon} alt="" />Search</label>
    </div>)
}

export default Search;