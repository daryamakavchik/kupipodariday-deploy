import { HttpStatus } from '@nestjs/common';

export enum ErrorCode {
  LoginOrPasswordIncorrect = 100,
  UserAlreadyExist = 101,
  AccessDenied = 102,
  UserNotFound = 103,
  UsersNotFound = 104,
  WishNotFound = 105,
  NoRightsForEdit = 106,
  NoRightsForRemove = 107,
  CantEdit = 108,
  CantOfferForSelf = 109,
  OfferIsLarge = 110,
  ListNotFound = 111,
  ValidationError = 112,
}

export const code2message = new Map<ErrorCode, string>([
  [ErrorCode.LoginOrPasswordIncorrect, 'Invalid username/password combination'],
  [ErrorCode.UserAlreadyExist, 'This user already exists'],
  [ErrorCode.AccessDenied, 'Access denied'],
  [ErrorCode.UserNotFound, 'User not found'],
  [ErrorCode.UsersNotFound, 'User search failed'],
  [ErrorCode.WishNotFound, 'Gift not found'],
  [ErrorCode.NoRightsForEdit, 'No rights to edit'],
  [ErrorCode.NoRightsForRemove, 'No rights to delete'],
  [ErrorCode.CantEdit, 'Cannot edit due to existing fund raises'],
  [ErrorCode.CantOfferForSelf, 'Cannot chip in on your own present'],
  [ErrorCode.OfferIsLarge, 'Exceeded maximum contribution'],
  [ErrorCode.ListNotFound, 'Gift list not found'],
  [ErrorCode.ValidationError, 'Incorrect value'],
]);

export const code2status = new Map<ErrorCode, HttpStatus>([
  [ErrorCode.LoginOrPasswordIncorrect, HttpStatus.BAD_REQUEST],
  [ErrorCode.UserAlreadyExist, HttpStatus.BAD_REQUEST],
  [ErrorCode.AccessDenied, HttpStatus.FORBIDDEN],
  [ErrorCode.UserNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.UsersNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.WishNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.NoRightsForEdit, HttpStatus.FORBIDDEN],
  [ErrorCode.NoRightsForRemove, HttpStatus.FORBIDDEN],
  [ErrorCode.CantEdit, HttpStatus.BAD_REQUEST],
  [ErrorCode.CantOfferForSelf, HttpStatus.FORBIDDEN],
  [ErrorCode.OfferIsLarge, HttpStatus.BAD_REQUEST],
  [ErrorCode.ListNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.ValidationError, HttpStatus.BAD_REQUEST],
]);
