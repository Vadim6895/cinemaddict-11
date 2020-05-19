import {FILMS_CARDS_ARR} from "./components/generate-data-film-card.js";

import UserRankHeaderProfileComponent from "./components/user-rank-header-profile.js";
import FilterController from "./controllers/filter-controller.js";
import FooterStatisticsComponent from "./components/footer-statistics-template.js";
import PageController from "./controllers/page-controller.js";

import {render} from "./utils/render.js";
import {RenderPosition} from "./utils/const.js";

import FilmCardsModel from "./models/film-cards.js";

const NO_FILMS = `<h2 class="films-list__title">There are no movies in our database</h2>`;


// ----------------new-statistics------------------------
import StatisticsComponent from "./components/statistics-template.js";
// -----------------------------------------------------


const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const filmCardsModel = new FilmCardsModel();
filmCardsModel.setFilmCards(FILMS_CARDS_ARR);

let userRankProfile = new UserRankHeaderProfileComponent(filmCardsModel);
render(headerElement, userRankProfile, RenderPosition.BEFOREEND);

const filterController = new FilterController(mainElement, filmCardsModel);
filterController.render();

const pageController = new PageController(filmCardsModel, mainElement);

if (FILMS_CARDS_ARR.length) {
  pageController.render();

} else {
  mainElement.insertAdjacentHTML(RenderPosition.BEFOREEND, NO_FILMS);
}


const statistics = new StatisticsComponent(filmCardsModel);
render(mainElement, statistics, RenderPosition.BEFOREEND);
statistics.hide();

// ---------------------footer-count-movies--------------------
const footerStatistics = document.querySelector(`.footer__statistics`);
render(footerStatistics, new FooterStatisticsComponent(FILMS_CARDS_ARR), RenderPosition.BEFOREEND);

const MenuItem = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
  STATISTICS: `stats`
};

filterController.setOnchange((menuItem) => {
  switch (menuItem) {
    case MenuItem.ALL:
      statistics.hide();
      pageController.show();
      break;
    case MenuItem.WATCHLIST:
      statistics.hide();
      pageController.show();
      break;
    case MenuItem.HISTORY:
      statistics.hide();
      pageController.show();
      break;
    case MenuItem.FAVORITES:
      statistics.hide();
      pageController.show();
      break;
    case MenuItem.STATISTICS:
      statistics.show();
      pageController.hide();
  }
});
