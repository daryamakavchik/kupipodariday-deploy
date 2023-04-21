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
  [ErrorCode.LoginOrPasswordIncorrect, 'Некорректная пара логин-пароль'],
  [ErrorCode.UserAlreadyExist, 'Такой пользователь уже существует'],
  [ErrorCode.AccessDenied, 'Доступ запрещен'],
  [ErrorCode.UserNotFound, 'Пользователь не найден'],
  [ErrorCode.UsersNotFound, 'Поиск пользователей не дал результатов'],
  [ErrorCode.WishNotFound, 'Подарок не найден'],
  [ErrorCode.NoRightsForEdit, 'Недостаточно прав для редактирования'],
  [ErrorCode.NoRightsForRemove, 'Недостаточно прав для удаления'],
  [ErrorCode.CantEdit, 'Невозможно редактировать, т.к. есть сборы'],
  [ErrorCode.CantOfferForSelf, 'Невозможно скинуться на свой подарок'],
  [ErrorCode.OfferIsLarge, 'Размер вклада слишком большой'],
  [ErrorCode.ListNotFound, 'Список подарков не найден'],
  [ErrorCode.ValidationError, 'Переданы некоректные значения'],
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
