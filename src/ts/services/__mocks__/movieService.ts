import { IMovie } from "../../models/Movie";

export let testData: IMovie[] = [
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

export async function getData(searchText: string): Promise<IMovie[]> {
  return new Promise((resolve, reject) => {
    if (searchText === "") {
      resolve([]);
    }

    if (searchText !== "error") {
      resolve(testData);
    } else {
      reject([]);
    }
  });
}
