/***
 * @jest-environment jsdom
 */
import { IMovie } from "../ts/models/Movie";
import * as functions from "../ts/functions";

describe("Tests for movieSort", () => {
  test("Should sort movies in ascending order when desc is true", () => {
    document.body.innerHTML = `
            <div id="movie-container"></div>
        `;

    const movieList: IMovie[] = [
      {
        Title: "Shutter Island",
        imdbID: "tt1130884",
        Type: "movie",
        Poster: "img",
        Year: "2010",
      },
      {
        Title: "Inception",
        imdbID: "tt1375666",
        Type: "movie",
        Poster: "img",
        Year: "2010",
      },
      {
        Title: "Se7en",
        imdbID: "tt0114369",
        Type: "movie",
        Poster: "img",
        Year: "1995",
      },
      {
        Title: "Get Out",
        imdbID: "tt5052448",
        Type: "movie",
        Poster: "img",
        Year: "2017",
      },
    ];

    functions.movieSort(movieList, true);

    expect(movieList[0].Title).toEqual("Get Out");
    expect(movieList[1].Title).toEqual("Inception");
    expect(movieList[2].Title).toEqual("Se7en");
    expect(movieList[3].Title).toEqual("Shutter Island");
  });
  test("Should sort movies in descending order when descending is false", () => {
    document.body.innerHTML = `
            <div id="movie-container"></div>
        `;

    const movieList: IMovie[] = [
      {
        Title: "Shutter Island",
        imdbID: "tt1130884",
        Type: "movie",
        Poster: "img",
        Year: "2010",
      },
      {
        Title: "Inception",
        imdbID: "tt1375666",
        Type: "movie",
        Poster: "img",
        Year: "2010",
      },
      {
        Title: "Se7en",
        imdbID: "tt0114369",
        Type: "movie",
        Poster: "img",
        Year: "1995",
      },
      {
        Title: "Get Out",
        imdbID: "tt5052448",
        Type: "movie",
        Poster: "img",
        Year: "2017",
      },
    ];

    functions.movieSort(movieList, false);
    expect(movieList[0].Title).toEqual("Shutter Island");
    expect(movieList[1].Title).toEqual("Se7en");
    expect(movieList[2].Title).toEqual("Inception");
    expect(movieList[3].Title).toEqual("Get Out");
  });
});
