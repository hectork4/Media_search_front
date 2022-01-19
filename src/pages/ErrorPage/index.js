import React, { useCallback } from "react";
import SearchForm from "../../components/SearchForm/index";
import { Link, useLocation } from "wouter";

const gifsErrors = ['d2jjuAZzDSVLZ5kI', 'Bp3dFfoqpCKFyXuSzP', 'hv5AEBpH3ZyNoRnABG', 'hLwSzlKN8Fi6I'];

export default function ErrorPage() {
  const randomImage = () => {
    return `https://media.giphy.com/media/${gifsErrors[Math.floor(Math.random() * gifsErrors.length) + 1 ]}/giphy.gif`
  }

  const [path, pushLocation] = useLocation()
  const handleSubmit = useCallback(({keyword, rating}) =>{
        pushLocation(`/search/${keyword}/${rating}`)
    }, [pushLocation])

  return (
    <>
      <header className="o-header">
        <SearchForm onSubmit={handleSubmit} />
      </header>
      <div className="App-wrapper">
        <div className="App-main page-error">
            <span class="code-error">404</span>
            <span class="msg-error">Sometimes gettings lost isn't that bad</span>
            <img class="gif-error" src={randomImage()} alt="alt-page-404"/>
            <Link href='/' class="btn">Go to home</Link>
        </div>
      </div>
    </>
  );
}