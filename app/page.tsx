import styles from "./page.module.scss";
import SearchBar from "./components/SearchBar/SearchBar";
import PopularMovies from "./components/PopularMovies/PopularMovies";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.heading}>
        <div>
          <h1>Welcome to MyCineWorld</h1>
          <Link href="/watchlist">
            <button>Watch List</button>
          </Link>
        </div>
      </div>
      <SearchBar />
      <PopularMovies />
    </div>
  );
}
