const DEFAULT_PORT = 3000;

/**
 * @typedef Environment
 * @property {number} port
 * @property {string} sessionSecret
 * @property {string} connectionString
 */

let parsedEnv = null;

/**
 * Validate the environment variables and return them as an object or `null` if
 * validation fails.
 * @param {NodeJS.ProcessEnv} env
 * @param {import('./logger').Logger} logger
 * @returns {Environment | null}
 */
export function environment(env, logger) {
  // If we've already parsed the environment, return the cached value
  // i.e. this is singleton and can be called multiple times in different files
  if (parsedEnv) {
    return parsedEnv;
  }

  const {
    PORT: port,
    SESSION_SECRET: sessionSecret,
    DATABASE_URL: connectionString,
  } = env;

  let error = false;

  if (!sessionSecret || sessionSecret.length < 32) {
    logger.error(
      'SESSION_SECRET must be defined as string and be at least 32 characters long',
    );
    error = true;
  }

  if (!connectionString || connectionString.length === 0) {
    logger.error('DATABASE_URL must be defined as a string');
    error = true;
  }

  let usedPort;
  const parsedPort = Number.parseInt(port ?? '', 10);
  if (port && Number.isNaN(parsedPort)) {
    logger.error('PORT must be defined as a number', port);
    usedPort = parsedPort;
    error = true;
  } else if (parsedPort) {
    usedPort = parsedPort;
  } else {
    logger.info('PORT not defined, using default port', DEFAULT_PORT);
    usedPort = DEFAULT_PORT;
  }

  if (error) {
    return null;
  }

  parsedEnv = {
    port: usedPort,
    // We've validate both above so the `?? ''` is just to satisfy the types
    sessionSecret: sessionSecret ?? '',
    connectionString: connectionString ?? '',
  };

  return parsedEnv;
}
