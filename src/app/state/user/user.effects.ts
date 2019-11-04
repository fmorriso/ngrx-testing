import { Injectable } from '@angular/core';
import { UserService } from '@core/services/user.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import {
  AddUser,
  AddUserFail,
  AddUserSuccess,
  LoadUser,
  LoadUserFail,
  LoadUserSuccess,
  LoadUsers,
  LoadUsersFail,
  LoadUsersSuccess,
  UpdateUser,
  UpdateUserFail,
  UpdateUserSuccess,
  UserActionTypes
} from './user.actions';

@Injectable()
export class UserEffects {
  @Effect()
  addUser: Observable<Action> = this.actions$
    .pipe(
      ofType<AddUser>(UserActionTypes.AddUser),
      map(action => action.payload),
      exhaustMap(payload => this.userService.addUser(payload.user)),
      map(user => new AddUserSuccess({ user })),
      catchError(error => of(new AddUserFail({ error })))
  );

  @Effect()
  loadUsers: Observable<Action> = this.actions$
    .pipe(
      ofType<LoadUsers>(UserActionTypes.LoadUsers),
      exhaustMap(() => this.userService.getUsers()),
      map(users => new LoadUsersSuccess({ users })),
      catchError(error => of(new LoadUsersFail({ error })))
    );

  @Effect()
  updateUser: Observable<Action> = this.actions$
    .pipe(
    ofType<UpdateUser>(UserActionTypes.UpdateUser),
      map(action => action.payload),
      exhaustMap(payload => this.userService.updateUser(payload.user)),
      map(
        user =>
          new UpdateUserSuccess({
            update: {
              id: user.id,
              changes: user
            }
          })
      ),
      catchError(error => of(new UpdateUserFail({ error })))
    );

  constructor(private actions$: Actions, private userService: UserService) {}
}
