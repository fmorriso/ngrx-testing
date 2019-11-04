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
  addUser: Observable<Action> = this.actions$.pipe(
    ofType<AddUser>(UserActionTypes.AddUser),
    map(action => action.payload),
    exhaustMap(payload => this.userService.addUser(payload.user)),
    map(user => new AddUserSuccess({ user })),
    catchError(error => of(new AddUserFail({ error })))
  );

 /*
 https://ngrx.io/guide/migration/v7
    .ofType<AddUser>(UserActionTypes.AddUser)
    .pipe(
      map(action => action.payload),
      exhaustMap(payload => this.userService.addUser(payload.user)),
      map(user => new AddUserSuccess({ user })),
      catchError(error => of(new AddUserFail({ error })))
    );*/

  @Effect()
  loaduserold: observable<action> = this.actions$
    .oftype<loaduser>(useractiontypes.loaduser)
    .pipe(
      map(action => action.payload),
      exhaustmap(payload => this.userservice.getuser(payload.id)),
      map(user => new loadusersuccess({ user })),
      catcherror(error => of(new loaduserfail({ error })))
    );

  @Effect()
  loadUsers: Observable<Action> = this.actions$
    .ofType<LoadUsers>(UserActionTypes.LoadUsers)
    .pipe(
      exhaustMap(() => this.userService.getUsers()),
      map(users => new LoadUsersSuccess({ users })),
      catchError(error => of(new LoadUsersFail({ error })))
    );

  @Effect()
  updateUser: Observable<Action> = this.actions$
    .ofType<UpdateUser>(UserActionTypes.UpdateUser)
    .pipe(
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
