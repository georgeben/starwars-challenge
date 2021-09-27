import { Router } from "express";
import { makeInvoker } from "awilix-express";
import expressJoi from "express-joi-validation";
import MoviesController from "interfaces/http/controllers/MoviesController";
import catchErrors from "interfaces/http/middleware/catchErrors";
import MethodNotAllowedHandler from "interfaces/http/middleware/methodNotAllowed";
import {
  idParamSchema,
  createCommentSchema,
  characterQueryParamsSchema,
} from "interfaces/http/validations/movie.validation";

const router = Router();
const api = makeInvoker(MoviesController);
const validate = expressJoi.createValidator({
  passError: true,
});

/**
 * @api {get} /movies/ List movies
 * @apiGroup Movies
 * @apiName ListMovies
 * @apiDescription Lists all starwars movies sorted by release_date from earliest to newest
 * @apiVersion 1.0.0
 * @apiSuccessExample Success Response:
 * {
 *     "success": true,
 *     "status_code": 200,
 *     "message": "Successfully fetched user data",
 *     "data": {
 *        "movies": [
 *           {
 *               "title": "A New Hope",
 *               "episode_id": 4,
 *               "opening_crawl": "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
 *               "release_date": "1977-05-25",
 *               "numberOfComments": 2
 *           },
 *           {
 *               "title": "The Empire Strikes Back",
 *               "episode_id": 5,
 *               "opening_crawl": "It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.\r\n\r\nThe evil lord Darth Vader,\r\nobsessed with finding young\r\nSkywalker, has dispatched\r\nthousands of remote probes into\r\nthe far reaches of space....",
 *               "release_date": "1980-05-17",
 *               "numberOfComments": 0
 *           },
 *           {
 *               "title": "Return of the Jedi",
 *               "episode_id": 6,
 *               "opening_crawl": "Luke Skywalker has returned to\r\nhis home planet of Tatooine in\r\nan attempt to rescue his\r\nfriend Han Solo from the\r\nclutches of the vile gangster\r\nJabba the Hutt.\r\n\r\nLittle does Luke know that the\r\nGALACTIC EMPIRE has secretly\r\nbegun construction on a new\r\narmored space station even\r\nmore powerful than the first\r\ndreaded Death Star.\r\n\r\nWhen completed, this ultimate\r\nweapon will spell certain doom\r\nfor the small band of rebels\r\nstruggling to restore freedom\r\nto the galaxy...",
 *               "release_date": "1983-05-25",
 *                "numberOfComments": 0
 *           },
 *           {
 *               "title": "The Phantom Menace",
 *               "episode_id": 1,
 *               "opening_crawl": "Turmoil has engulfed the\r\nGalactic Republic. The taxation\r\nof trade routes to outlying star\r\nsystems is in dispute.\r\n\r\nHoping to resolve the matter\r\nwith a blockade of deadly\r\nbattleships, the greedy Trade\r\nFederation has stopped all\r\nshipping to the small planet\r\nof Naboo.\r\n\r\nWhile the Congress of the\r\nRepublic endlessly debates\r\nthis alarming chain of events,\r\nthe Supreme Chancellor has\r\nsecretly dispatched two Jedi\r\nKnights, the guardians of\r\npeace and justice in the\r\ngalaxy, to settle the conflict....",
 *               "release_date": "1999-05-19",
 *                "numberOfComments": 0
 *           },
 *           {
 *               "title": "Attack of the Clones",
 *               "episode_id": 2,
 *               "opening_crawl": "There is unrest in the Galactic\r\nSenate. Several thousand solar\r\nsystems have declared their\r\nintentions to leave the Republic.\r\n\r\nThis separatist movement,\r\nunder the leadership of the\r\nmysterious Count Dooku, has\r\nmade it difficult for the limited\r\nnumber of Jedi Knights to maintain \r\npeace and order in the galaxy.\r\n\r\nSenator Amidala, the former\r\nQueen of Naboo, is returning\r\nto the Galactic Senate to vote\r\non the critical issue of creating\r\nan ARMY OF THE REPUBLIC\r\nto assist the overwhelmed\r\nJedi....",
 *               "release_date": "2002-05-16",
 *                "numberOfComments": 0,
 *           },
 *           {
 *               "title": "Revenge of the Sith",
 *               "episode_id": 3,
 *               "opening_crawl": "War! The Republic is crumbling\r\nunder attacks by the ruthless\r\nSith Lord, Count Dooku.\r\nThere are heroes on both sides.\r\nEvil is everywhere.\r\n\r\nIn a stunning move, the\r\nfiendish droid leader, General\r\nGrievous, has swept into the\r\nRepublic capital and kidnapped\r\nChancellor Palpatine, leader of\r\nthe Galactic Senate.\r\n\r\nAs the Separatist Droid Army\r\nattempts to flee the besieged\r\ncapital with their valuable\r\nhostage, two Jedi Knights lead a\r\ndesperate mission to rescue the\r\ncaptive Chancellor....",
 *               "release_date": "2005-05-19",
 *                "numberOfComments": 0
 *           }
 *       ],
 *       "count": 6
 *     },
 *     "links": []
 * }
 */
router
  .route("/")
  .get(
    catchErrors(api("getAll")),
  )
  .all(MethodNotAllowedHandler);

/**
 * @api {post} /movies/:id/comments Post comment
 * @apiGroup Comment
 * @apiName PostComment
 * @apiDescription Posts a comment for a movie anonymously👻
 * @apiVersion 1.0.0
 * @apiParam {String} content - User's comment (500 characters max)
 * @apiSuccessExample Success Response:
 * {
 *     "success": true,
 *     "status_code": 200,
 *     "message": "Successfully posted comment",
 *     "data": {
 *        "comment": {
 *           "id": 1,
 *           "movieId": 1,
 *           "content": "It's great!",
 *           "ipAddress": "::ffff:127.0.0.1",
 *           "updatedAt": "2021-09-27T08:48:19.950Z",
 *           "createdAt": "2021-09-27T08:48:19.950Z"
 *       }
 *     },
 *     "links": []
 * }
 */

/**
 * @api {get} /movies/:id/comments List comments
 * @apiGroup Comment
 * @apiName GetComment
 * @apiDescription Retrieve list of comments for a movie in reverse chronological order
 * @apiVersion 1.0.0
 * @apiSuccessExample Success Response:
 * {
 *     "success": true,
 *     "status_code": 200,
 *     "message": "Successfully posted comment",
 *     "data": {
 *        "comments": [
 *           {
 *               "id": 2,
 *               "movieId": 1,
 *               "content": "This movie sucks!",
 *               "ipAddress": "::ffff:127.0.0.1",
 *               "createdAt": "2021-09-27T09:09:29.247Z",
 *               "updatedAt": "2021-09-27T09:09:29.247Z"
 *           },
 *           {
 *               "id": 1,
 *               "movieId": 1,
 *               "content": "It's great!",
 *               "ipAddress": "::ffff:127.0.0.1",
 *               "createdAt": "2021-09-27T08:48:19.950Z",
 *               "updatedAt": "2021-09-27T08:48:19.950Z"
 *           }
 *       ]
 *     },
 *     "links": []
 * }
 */
router
  .route("/:id/comments")
  .get(
    validate.params(idParamSchema),
    catchErrors(api("getComments")),
  )
  .post(
    validate.body(createCommentSchema),
    validate.params(idParamSchema),
    catchErrors(api("postComment")),
  )
  .all(MethodNotAllowedHandler);

/**
 * @api {get} /movies/:id/characters List characters
 * @apiGroup Movies
 * @apiName GetCharacters
 * @apiDescription Retrieve list of characters in a movie
 * @apiParam {String="name", "gender", "height"} sortBy - Field to sort by
 * @apiParam {String="asc", "desc"} order - Sorting order
 * @apiParam {String="male", "female"} gender - Filter by gender
 * @apiVersion 1.0.0
 * @apiSuccessExample Success Response:
 * {
 *     "success": true,
 *     "status_code": 200,
 *     "message": "Successfully posted comment",
 *     "data": {
 *     },
 *     "links": []
 * }
 */
router
  .route("/:id/characters")
  .get(
    validate.params(idParamSchema),
    validate.query(characterQueryParamsSchema),
    catchErrors(api("getCharacterList")),
  )
  .all(MethodNotAllowedHandler);

export default router;
