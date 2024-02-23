import express from 'express';
import passport from 'passport';
import { getGames, insertGame, deleteGame } from '../lib/db.js';

export const adminRouter = express.Router();

async function loginRoute(req, res) {
  let message;
  if (req.session.messages && req.session.messages.length > 0) {
    message = req.session.messages.join(', ');
    req.session.messages = [];
  }
  return res.render('login', {
    title: 'Innskráning',
    message,
  });
}

async function adminRoute(req, res) {

  return res.render('admin', {
    title: 'Stjórnborð',
    games: await getGames(),
    loggedIn: req.isAuthenticated(),
    user: req.user ?? null,
    time: new Date().toISOString(),
  });
}

// TODO færa á betri stað
// Hjálpar middleware sem athugar hvort notandi sé innskráður og hleypir okkur
// þá áfram, annars sendir á /login
export function ensureLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/login');
}

function skraRoute(req, res, next) {
  return res.render('skra', {
    title: 'Skrá leik',
  });
}

function skraRouteInsert(req, res, next) {
  // TODO mjög hrátt allt saman, vantar validation!
  const { home_name, home_score, away_name, away_score } = req.body;

  const result = insertGame(home_name, home_score, away_name, away_score);

  res.redirect('/leikir');
}

async function deleteRoute(req, res, next) {
  const { id } = req.params;

  const result = await deleteGame(id);

  if (result) {
    return res.redirect('/admin');
  }

  return next(new Error('Villa við að eyða leik'));
}

adminRouter.get('/login', loginRoute);
adminRouter.get('/admin', ensureLoggedIn, adminRoute);
adminRouter.get('/skra', skraRoute);
adminRouter.post('/skra', skraRouteInsert);

adminRouter.post(
  '/admin/delete/:id',
  ensureLoggedIn,
  deleteRoute
);

adminRouter.post(
  '/login',

  // Þetta notar strat að ofan til að skrá notanda inn
  passport.authenticate('local', {
    failureMessage: 'Notandanafn eða lykilorð vitlaust.',
    failureRedirect: '/login',
  }),

  // Ef við komumst hingað var notandi skráður inn, senda á /admin
  (req, res) => {
    if (req.user?.admin) {
      res.redirect('/admin');
    } else {
      res.redirect('/')
    }
  },
);

adminRouter.get('/logout', (req, res) => {
  req.logout((e) => {
    if (e) {
      logger.error('error logging out', e);
      return res.render('error', {
        title: 'Villa',
        message: 'Ekki tókst að skrá út',
      });
    }
    return res.redirect('/');
  })
})
