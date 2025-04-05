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
          <div className={style.infoField}>
            <div className={style.infoTitle}>original title</div>
            <span className="genreButton">{original_title}</span>
          </div>
          <div className={style.infoField}>
            <div className={style.infoTitle}>original country</div>
            <span className="genreButton">
              {production_countries?.[0]
                ? production_countries[0].name
                : origin_country
                ? origin_country
                : "unknown"}
            </span>
          </div>
          <div className={style.infoField}>
            <div className={style.infoTitle}>release date</div>
            <span className="genreButton">{release_date}</span>
          </div>
          <div className={style.infoField}>
            <div className={style.infoTitle}>imdb score</div>
            <span className="genreButton">{vote_average}</span>
          </div>
          <div className={style.infoField}>
            <div className={style.infoTitle}>genres</div>
            {genres?.map((genre: Genre) => (
              <div className="genreButton" key={genre.id}>
                {genre.name || "unknown genre"}
              </div>
            ))}
          </div>

          {homepage && (
            <div className={style.infoField}>
              <div className={style.infoTitle}>movie web site</div>
              <span className="genreButton">
                <a href={homepage}>{homepage}</a>
              </span>
            </div>
          )}
        </div>
      </div>
      <div className={style.overview}>
        <div className={style.infoTitle}>Story</div>
        {overview}
      </div>
      <div className={style.posters}>
        {backdrops?.map((obj: { file_path: React.Key | null | undefined }) => (
          <div key={obj.file_path}>
            <Image
              alt={original_title || "no alt tag found"}
              src={preImgURL + obj.file_path}
              width={350}
              height={350}
            />
          </div>
        ))}
        {posters?.map((obj: { file_path: React.Key | null | undefined }) => (
          <div key={obj.file_path}>
            <Image
              alt={original_title || "no alt tag found"}
              src={preImgURL + obj.file_path}
              width={350}
              height={350}
            />
          </div>
        ))}
        {logos?.map((obj: { file_path: React.Key | null | undefined }) => (
          <div key={obj.file_path}>
            <Image
              alt={original_title || "no alt tag found"}
              src={preImgURL + obj.file_path}
              width={350}
              height={350}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;
