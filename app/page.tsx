import styles from "./page.module.scss";
import SearchBar from "./components/SearchBar/SearchBar";
import PopularMovies from "./components/PopularMovies/PopularMovies";

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.heading}>
        <div>
          <h1>Welcome to MyCineWorld</h1>
        </div>
      </div>
      <SearchBar />
      <PopularMovies />
    </div>
  );
}
