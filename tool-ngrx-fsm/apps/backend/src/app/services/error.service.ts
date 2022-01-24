export interface RequestError {
  code: number;
  message: string;
  description: { [reason: string]: string };
}

export type AppErrors = ServerError | UsernameTakenError | EmailInvalidError | AccountAlreadyExistsError | InsecurePasswordError;

export class ApplicationErrors {
  public static get ServerError(): BadResult<ServerError> {
    return BadResult.create(new ServerError());
  }

  public static get NotFoundError(): BadResult<NotFoundError> {
    return BadResult.create(new NotFoundError());
  }

  public static get UsernameTakenError(): BadResult<UsernameTakenError> {
    return BadResult.create(new UsernameTakenError());
  }

  public static get EmailInvalidError(): BadResult<EmailInvalidError> {
    return BadResult.create(new EmailInvalidError());
  }

  public static get AccountAlreadyExistsError(): BadResult<AccountAlreadyExistsError> {
    return BadResult.create(new AccountAlreadyExistsError());
  }

  public static get InsecurePasswordError(): BadResult<InsecurePasswordError> {
    return BadResult.create(new InsecurePasswordError());
  }

  public static get UserCouldNotBeFound(): BadResult<UserCouldNotBeFound> {
    return BadResult.create(new UserCouldNotBeFound());
  }

  public static get WrongPasswordError(): BadResult<WrongPasswordError> {
    return BadResult.create(new WrongPasswordError());
  }
}

class ServerError extends ApplicationErrors implements RequestError {
  message = 'Server Error!';

  code = 500;

  description = {};
}

class NotFoundError extends ApplicationErrors implements RequestError {
  message = 'Not found!';

  code = 404;

  description = {};
}

class UsernameTakenError extends ApplicationErrors implements RequestError {
  message = 'Username is already taken';

  code = 400;

  description = {};
}

class EmailInvalidError extends ApplicationErrors implements RequestError {
  message = 'Email is invalid';

  code = 400;

  description = {};
}

class AccountAlreadyExistsError extends ApplicationErrors implements RequestError {
  message = 'Account already exist';

  code = 400;

  description = {};
}

class InsecurePasswordError extends ApplicationErrors implements RequestError {
  message = 'Password is insecure';

  code = 400;

  description = {};
}

class UserCouldNotBeFound extends ApplicationErrors implements RequestError {
  message = 'User could not be found';

  code = 404;

  description = {};
}

class WrongPasswordError extends ApplicationErrors implements RequestError {
  message = 'Password does not match';

  code = 400;

  description = {};
}

/**
 * @description this and BadResult and Either will create a wrapper for return value of a function that
 * errors need to be handled.
 */
export class GoodResult<VALUE> {
  constructor(public readonly value: VALUE) {}

  public Failed(): this is BadResult<RequestError> {
    return false;
  }

  public Succeeded(): this is GoodResult<VALUE> {
    return true;
  }

  public static create<VALUE>(value: VALUE): GoodResult<VALUE> {
    return new GoodResult<VALUE>(value);
  }
}

/**
 * @description this and GoodResult and Either will create a wrapper for return value of a function that
 * errors need to be handled.
 */
export class BadResult<ERR extends RequestError = AppErrors> {
  constructor(public readonly error: ERR) {}

  public Failed(): this is BadResult<ERR> {
    return true;
  }

  public Succeeded(): this is GoodResult<null> {
    return false;
  }

  public static create<VALUE extends RequestError = AppErrors>(value: VALUE): BadResult<VALUE> {
    return new BadResult<VALUE>(value);
  }

  IsUsernameTakenError(): this is BadResult<UsernameTakenError> {
    return this.error instanceof UsernameTakenError;
  }

  IsEmailInvalidError(): this is BadResult<EmailInvalidError> {
    return this.error instanceof EmailInvalidError;
  }

  IsAccountAlreadyExistsError(): this is BadResult<AccountAlreadyExistsError> {
    return this.error instanceof AccountAlreadyExistsError;
  }

  IsInsecurePasswordError(): this is BadResult<InsecurePasswordError> {
    return this.error instanceof InsecurePasswordError;
  }

  IsUserCouldNotBeFound(): this is BadResult<UserCouldNotBeFound> {
    return this.error instanceof UserCouldNotBeFound;
  }

  IsWrongPasswordError(): this is BadResult<WrongPasswordError> {
    return this.error instanceof WrongPasswordError;
  }
}

/**
 * @description this and GoodResult and BadResult will create a wrapper for return value of a function that
 * errors need to be handled.
 */
export type Either<T, Y extends RequestError = AppErrors> = GoodResult<T> | BadResult<Y>;
