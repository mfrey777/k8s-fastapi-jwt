import { Action } from 'redux';

// declare module '@eneto/api-client' {
export interface ApiRes<T> {
  data: T;
  statusCode: number;
  path: string;
  timestamp?: Date;
  message?: string;
}

export interface PublicMessageState {
  msg: string;
}

//   interface ListState {
//     id: number;
//     name: string;
//     description: string;
//     createdAt: Date;
//     updatedAt: Date;
//   }

//   interface NewUser {
//     name: string;
//     secondName: string;
//     lastName: string;
//     secondLastName: string;
//     email: string;
//     address: string;
//     listId: number;
//   }

//   interface UserState {
//     id: number;
//     name: string;
//     secondName: string;
//     lastName: string;
//     secondLastName: string;
//     email: string;
//     address: string;
//     createdAt: Date;
//     updatedAt: Date;
//   }

//   interface UsersState {
//     users: UserState[];
//   }

//   interface ListsState {
//     lists: ListState[];
//   }

//   interface AppState {
//     users: UsersState;
//     currentUser: UserState;
//     lists: ListsState;
//     currentList: ListState;
//   }

export interface AppAction<T = string, P = any> extends Action {
  type: T;
  payload: P;
}
// }
