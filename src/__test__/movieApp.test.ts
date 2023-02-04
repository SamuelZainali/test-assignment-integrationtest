/***
 * @jest-environment jsdom
 */
import { IMovie } from "../ts/models/Movie";
import * as movieApp from "../ts/movieApp";
import { getData } from "../ts/services/__mocks__/movieService";

jest.mock("../ts/services/movieservice.ts");

beforeEach(() => {
  document.body.innerHTML = "";
});

describe("Tests for init", () => {
  test("Should spy on handleSubmit()", () => {
    document.body.innerHTML = `
        <form id="searchForm">
            <input type="text" id="searchText" placeholder="Enter title here" />
            <button type="submit" id="search">Search</button>
        </form>
        `;

    let spyOnHandleSubmit = jest
      .spyOn(movieApp, "handleSubmit")
      .mockReturnValue(
        new Promise<void>((resolve) => {
          resolve();
        })
      );

    movieApp.init();

    (document.querySelector("#searchForm") as HTMLFormElement)?.submit();
    expect(spyOnHandleSubmit).toHaveBeenCalledTimes(1);
    spyOnHandleSubmit.mockRestore();
  });
});

describe("Tests for handleSubmit", () => {
  test("Should use getData and create HTML if a movie is found", async () => {
    document.body.innerHTML = `
        <form id="searchForm">
            <input type="text" id="searchText" placeholder="Enter title here" />
            <button type="submit" id="Search">Sök</button>
        </form>
        <div id="movie-container"></div>
        `;

    const searchText = document.querySelector(
      "#searchText"
    ) as HTMLInputElement;
    searchText.value = "Shutter Island";

    const movies = await getData("Shutter Island");
    const createdContainer = document.getElementsByClassName("movie");

    await movieApp.handleSubmit();

    expect(movies[0].Title).toBe("Shutter Island");
    expect(createdContainer).toBeTruthy();
  });

  test("Should call createHtml() method", async () => {
    document.body.innerHTML = `
        <form id="searchForm">
            <input type="text" id="searchText" placeholder="Enter title here" />
            <button type="submit" id="search">Search</button>
        </form>
        <div id="movie-container"></div>
        `;

    let searchText = document.querySelector("#searchText") as HTMLInputElement;
    searchText.value = "Shutter Island";

    const createHtmlSpy = jest.spyOn(movieApp, "createHtml").mockReturnValue();

    await movieApp.handleSubmit();

    expect(createHtmlSpy).toHaveBeenCalled();
    createHtmlSpy.mockRestore();
  });

  test("Should display 'No results found' message when no movies are returned", async () => {
    document.body.innerHTML = `
        <form id="searchForm">
            <input type="text" id="searchText" placeholder="Enter title here" />
            <button type="submit" id="search">Search</button>
        </form>
        <div id="movie-container"></div>
        `;

    let searchInput = document.querySelector("#searchText") as HTMLInputElement;
    searchInput.value = "";

    const displayNoResultSpy = jest
      .spyOn(movieApp, "displayNoResult")
      .mockImplementation(() => {});

    await movieApp.handleSubmit();

    expect(displayNoResultSpy).toHaveBeenCalled();
    displayNoResultSpy.mockRestore();
  });

  test("Should get error and call on displayNoResult", async () => {
    document.body.innerHTML = `
        <form id="searchForm">
            <input type="text" id="searchText" placeholder="Skriv titel här" />
            <button type="submit" id="search">Sök</button>
        </form>
        <div id="movie-container"></div>
        `;

    const searchText = document.querySelector(
      "#searchText"
    ) as HTMLInputElement;
    searchText.value = "error";

    let disPlayNoResultSpy = jest
      .spyOn(movieApp, "displayNoResult")
      .mockReturnValue();

    await movieApp.handleSubmit();

    expect(disPlayNoResultSpy).toBeCalled();
    disPlayNoResultSpy.mockRestore();
  });
});

describe("Tests for createHtml", () => {
  test("Should display movies correctly by creating elements", () => {
    document.body.innerHTML = `
            <div id="movie-container"></div>
        `;

    const container = document.querySelector(
      "#movie-container"
    ) as HTMLDivElement;

    let movieList: IMovie[] = [
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

    movieApp.createHtml(movieList, container);

    expect(movieList[0].Title).toEqual("Shutter Island");
    expect(movieList.length).toBe(4);

    expect(container.innerHTML).toContain("h3");
    expect(container.innerHTML).toContain("img");
  });
});

describe("Tests for displayNoResult", () => {
  test("Should create and display 'No results' message", () => {
    document.body.innerHTML = `
            <div id="movie-container"></div>
        `;

    const container = document.querySelector(
      "#movie-container"
    ) as HTMLDivElement;
    const resultElement = `<p>No results</p>`;

    movieApp.displayNoResult(container);

    let resultHtml = document.querySelector("#movie-container")?.innerHTML;
    let htmlClass =
      document.querySelector("#movie-container")?.firstElementChild;

    expect(resultHtml).toEqual(resultElement);
  });
});
