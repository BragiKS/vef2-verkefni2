import xss from 'xss';
import { body } from 'express-validator';
import { getTeams } from './db.js';

export function createGameValidationMiddleware() {
  return [
    body('date')
      .trim()
      .custom((value) => {
        const date = new Date(value);
        return !Number.isNaN(date.getTime());
      })
      .withMessage('Dagsetning verður að vera gild'),
    body('home').custom((value, { req }) => {
      if (value === req.body.away) {
        throw new Error('Heimalið og útilið verða að vera mismundandi');
      }
      return true;
    }),
    body('home').custom(async (value) => {
      const teams = (await getTeams()) ?? [];
      if (!teams.find((t) => t.id.toString() === value)) {
        throw new Error('Heimalið verður að vera gilt');
      }
      return true;
    }),
    body('away').custom(async (value) => {
      const teams = (await getTeams()) ?? [];
      if (!teams.find((t) => t.id.toString() === value)) {
        throw new Error('Úti-lið verður að vera gilt');
      }
      return true;
    }),
    body('home_score')
      .isInt({ min: 0, max: 99 })
      .withMessage(
        'Stig heimaliðs verður að vera heiltala stærri en núll, hámark 99.',
      ),
    body('away_score')
      .isInt({ min: 0, max: 99 })
      .withMessage(
        'Stig úti-liðs verður að vera heiltala stærri en núll, hámark 99.',
      ),
  ];
}

export function registrationValidationMiddleware(textField) {
  return [
    body('name')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Nafn má ekki vera tómt'),
    body('name')
      .isLength({ max: 64 })
      .withMessage('Nafn má að hámarki vera 64 stafir'),
    body('location')
      .optional()
      .isLength({ max: 256 })
      .withMessage('Staðsetning má að hámarki vera 256 stafir'),
    body('url')
      .optional()
      .isLength({ max: 256 })
      .withMessage('Slóð verður að vera gild slóð, að hámarki 256 stafir'),
    body(textField)
      .isLength({ max: 400 })
      .withMessage(
        `${
          textField === 'comment' ? 'Athugasemd' : 'Lýsing'
        } má að hámarki vera 400 stafir`,
      ),
  ];
}

// Viljum keyra sér og með validation, ver gegn „self XSS“
export function xssSanitizationMiddleware() {
  return [
    body('date').customSanitizer((v) => xss(v)),
    body('home').customSanitizer((v) => xss(v)),
    body('away').customSanitizer((v) => xss(v)),
    body('home_score').customSanitizer((v) => xss(v)),
    body('away_score').customSanitizer((v) => xss(v)),
  ];
}

export function sanitizationMiddleware() {
  return [
    body('date').trim().escape(),
    body('home').trim().escape(),
    body('away').trim().escape(),
    body('home_score').trim().escape(),
    body('away_score').trim().escape(),
  ];
}
