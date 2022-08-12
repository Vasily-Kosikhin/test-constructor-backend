import ApiError from '../exeptions/api-error.js';
import tokenService from '../service/token-service.js';

export default function (req, res, next) {
  try {
    const authorisationHeader = req.headers.authorisation;
    if (!authorisationHeader) {
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = authorisationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
}
