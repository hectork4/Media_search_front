import './App.css';
import React, { Suspense } from 'react';
import { Link, Route } from 'wouter'
import Detail from './pages/Detail';
import SearchResults from './pages/SearchResults';
import ErrorPage from "./pages/ErrorPage";
import Login from './pages/Login';
import RegisterPage from './pages/Register';
import Context from './context/StaticContext';
import { GifContextProvider } from './context/gifsContext';
import { UserContextProvider } from './context/UserContext';
import Header from './components/Header';

const HomePage = React.lazy(() => import('./pages/Home')) 

function App() {
  
  return (
    <Context.Provider value={{nombre:'Sam'}}>
      <UserContextProvider>
      <div className="App">
        <Suspense fallback={null}>
        <section className="App-content">
        <GifContextProvider>
          <Header />
        <Link to="/">
              <figure className="App-logo">
                <img alt='logo' src='/logo.png' />
              </figure>
            </Link>           
              <Route 
                path='/' 
                component={HomePage}
              />
              <Route 
                path='/search/:keyword/:rating?' 
                component={SearchResults}
              />
              <Route 
                path='/gif/:id' 
                component={Detail}
              />
              <Route 
                path='/login' 
                component={Login}
              />
              <Route 
                path='/register' 
                component={RegisterPage}
              />
              <Route 
                path='/404' 
                component={ErrorPage}
              />
          </GifContextProvider>
        </section>
        </Suspense>
      </div>
      </UserContextProvider>
    </Context.Provider>
  );
}

export default App;