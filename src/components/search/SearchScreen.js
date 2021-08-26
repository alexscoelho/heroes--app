import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { HeroeCard } from "../heroes/HeroeCard";
import { useForm } from "../hooks/useForm";
import { getHeroesByName } from "../selectors/getHeroesByName";
const queryString = require("query-string");

export const SearchScreen = ({ history }) => {
  const location = useLocation();
  const { q = "" } = queryString.parse(location.search);

  const [formValues, handleInputChange] = useForm({
    query: q,
  });
  const { query } = formValues;

  const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`?q=${query}`);
  };
  return (
    <div>
      <h1>Search Screen</h1>
      <hr />

      <div className='row'>
        <div className='col-5'>
          <h4>Search Form</h4>
          <hr />

          <form onSubmit={handleSearch}>
            <input
              onChange={handleInputChange}
              type='text'
              name='query'
              placeholder='Find your hero'
              className='form-control'
              value={query}
            />
            <button
              type='submit'
              className='btn m-1 btn-block btn-outline-primary'
            >
              Search..
            </button>
          </form>
        </div>
        <div className='col-7'>
          <h4>Results</h4>
          <hr />

          {q === "" && <div className='alert alert-info'>Search hero</div>}

          {q !== "" && !heroesFiltered.length && (
            <div className='alert alert-danger'>There is no hero with {q} </div>
          )}

          {heroesFiltered.map((heroe) => (
            <HeroeCard key={heroe.id} {...heroe} />
          ))}
        </div>
      </div>
    </div>
  );
};
