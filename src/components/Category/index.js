import React from "react";
import { Link } from "wouter";

import "./styles.css";

export default function Category({ name, options = [] }) {
  return (
    <div className='Category'>
      <h3 className="Category-title">{name}</h3>
      <ol className="Category-list">
        {options.map((singleOption) => (          
          singleOption && <li key={singleOption.id}>
            <Link 
              className="Category-link" 
              to={`/search/${singleOption.title}`}
            >
              {singleOption.title}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}