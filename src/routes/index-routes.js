import express from 'express';
import { getGames } from '../lib/db.js';
import { calculateStandings } from '../lib/score.js';

export const indexRouter = express.Router();

async function indexRoute(req, res) {

  return res.render('index', {
    title: 'Forsíða',
    loggedIn: req.isAuthenticated(),
    user: req.user ?? null,
    time: new Date().toISOString(),
  });
}

async function leikirRoute(req, res) {

  return res.render('leikir', {
    title: 'Leikir',
    loggedIn: req.isAuthenticated(),
    user: req.user ?? null,
    games: await getGames(),
    time: new Date().toISOString(),
  });
}

async function stadaRoute(req, res) {

  const games = await getGames();

  return res.render('stada', {
    title: 'Staðan',
    stada: await calculateStandings(games),
    loggedIn: req.isAuthenticated(),
    user: req.user ?? null,
    time: new Date().toISOString(),
  });
}

indexRouter.get('/', indexRoute);
indexRouter.get('/leikir', leikirRoute);
indexRouter.get('/stada', stadaRoute);
