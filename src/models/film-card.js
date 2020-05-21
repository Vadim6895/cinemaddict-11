export default class FilmCard {
  constructor(data) {
    this.id = data[`id`];
    this.poster = data.film_info[`poster`];
    this.title = data.film_info[`title`];
    this.rating = data.film_info[`total_rating`].toString();
    this.movieLength = data.film_info[`runtime`];
    this.genre = data.film_info[`genre`];
    this.description = data.film_info[`description`];
    // this.productionDate = data.film_info.release[`date`];
    this.productionDate = data.film_info.release[`date`] ? new Date(data.film_info.release[`date`]) : null;
    this.originalTitle = data.film_info[`alternative_title`];
    this.director = data.film_info[`director`];
    this.screenwriters = data.film_info[`writers`];
    this.actors = data.film_info[`actors`];
    this.country = data.film_info.release[`release_country`];
    this.ageRating = data.film_info[`age_rating`];
    this.comments = data[`comments`];
    this.commentsNumber = this.comments.length;

    this.isWatchlist = Boolean(data.user_details[`watchlist`]);
    this.isAlreadyWatched = Boolean(data.user_details[`already_watched`]);
    this.isFavorite = Boolean(data.user_details[`favorite`]);

    this.watchingDate = data.user_details[`watching_date`] ? new Date(data.user_details[`watching_date`]) : null;
  }

  filmCardToRAW() {
    return {
      "comments": this.comments,
      "film_info": {
        "actors": this.actors,
        "age_rating": this.ageRating,
        "alternative_title": this.originalTitle,
        "description": this.description,
        "director": this.director,
        "genre": this.genre,
        "poster": this.poster,
        "release": this.productionDate.toISOString(),
        "runtime": this.movieLength,
        "title": this.title,
        "total_rating": this.rating,
        "writers": this.screenwriters
      },
      "id": this.id,
      "user_details": {
        "already_watched": this.isAlreadyWatched ? this.isAlreadyWatched.toISOString() : ``,
        "favorite": this.isFavorite,
        "watching_date": this.watchingDate,
        "watchlist": this.isWatchlist
      }
    };
  }


  static parseFilmCard(data) {
    return new FilmCard(data);
  }

  static parseFilmCards(data) {
    return data.map(FilmCard.parseFilmCard);
  }
}
