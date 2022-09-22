import {useState, useEffect} from "react";
import MovieCard from "./MovieCard";
import './App.css';
import SearchIcon from './search.svg';

const API_KEY = 'http://www.omdbapi.com/?apikey=b6bece89';

const App = () => {
    const [movies,setMovies] = useState([]);
    const [searchTerms,setSearchTerms] = useState('');

    const searchMovie = async(title) => {
        const response = await fetch(`${API_KEY}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);  
    }
    useEffect(() => {
        searchMovie('Godfather');
        }, []);
        
    return(
        <div className="app">
            <h1>Filmİzle</h1>
            <div className="search">
                <input 
                    placeholder="Film veya dizi ara"
                    value={searchTerms}
                    onChange={(e) => setSearchTerms(e.target.value)}
                />
                <img 
                    src={SearchIcon}
                    alt='Search'
                    onClick={() => searchMovie(searchTerms)}
                />
            </div>
            { 
                movies.length > 0 ? (
                    <div className="container">
                        {movies.map((movie)=> (<MovieCard movies={movie}/>))}
                    </div>
                ) : (
                        <div className="empty">
                            <h2>Film bulunamadı.</h2>
                        </div>
                    )
            }
        </div>
    );
}

export default App;