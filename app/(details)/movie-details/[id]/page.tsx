import React from "react";
import { getMovieByID, getMovieImagesByID } from "../../../api/movie-services";
import style from "./page.module.scss";
import { preImgURL } from "../../../config";
import Image from "next/image";
import { Genre } from "../../../types/movie";
import BackButton from "@/app/components/ui/BackButton/BackButton";

type tParams = Promise<{ id: string }>;

const MovieDetails = async (props: { params: tParams }) => {
  const { id } = await props.params;
  const {
    poster_path,
    genres,
    title,
    original_title,
    overview,
    production_countries,
    release_date,
    vote_average,
    origin_country,
    homepage,
  } = await getMovieByID(id);

  const { backdrops, logos, posters } = await getMovieImagesByID(id);
  return (
    <div className={style.movieDetailsContainer}>
      <h1>{title}</h1>
      <BackButton />
      <div className={style.heading}>
        <div className={style.poster}>
          <Image
            alt={original_title || "no alt tag found"}
            src={preImgURL + poster_path}
            width={450}
            height={450}
          />
        </div>
        <div className={style.headerSideBar}>
          <div>
            original title:{" "}
            <span className="genreButton">{original_title}</span>
          </div>
          <div>
            original country:{" "}
            <span className="genreButton">
              {production_countries?.[0]
                ? production_countries[0].name
                : origin_country
                ? origin_country
                : "unknown"}
            </span>
          </div>
          <div>
            release date: <span className="genreButton">{release_date}</span>
          </div>
          <div>
            imdb score: <span className="genreButton">{vote_average}</span>
          </div>
          <div>
            genres:{" "}
            {genres?.map((genre: Genre) => (
              <span className="genreButton" key={genre.id}>
                {genre.name || "unknown genre"}
              </span>
            ))}
          </div>

          {homepage && (
            <div>
              movie web site:{" "}
              <span className="genreButton">
                <a href={homepage}>{homepage}</a>
              </span>
            </div>
          )}
        </div>
      </div>
      <div className={style.overview}>{overview}</div>
      <div className={style.posters}>
        {backdrops?.map((obj: { file_path: React.Key | null | undefined }) => (
          <div key={obj.file_path}>
            <Image
              alt={original_title || "no alt tag found"}
              src={preImgURL + obj.file_path}
              width={300}
              height={300}
            />
          </div>
        ))}
        {posters?.map((obj: { file_path: React.Key | null | undefined }) => (
          <div key={obj.file_path}>
            <Image
              alt={original_title || "no alt tag found"}
              src={preImgURL + obj.file_path}
              width={300}
              height={300}
            />
          </div>
        ))}
        {logos?.map((obj: { file_path: React.Key | null | undefined }) => (
          <div key={obj.file_path}>
            <Image
              alt={original_title || "no alt tag found"}
              src={preImgURL + obj.file_path}
              width={300}
              height={300}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;
