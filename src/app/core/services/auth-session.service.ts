import { Injectable } from '@angular/core';
import { UserRepositoryService } from '../repositories/user-repository.service';
import { Storage } from '../providers/storage';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { StorageKeys } from '../enums/storage-keys';

@Injectable({
  providedIn: 'root'
})
export class AuthSessionService {

  constructor(private _userRepository: UserRepositoryService, private router: Router) {}

  async login(email: string, password: string) {
    const user = await this._userRepository.getUser(email, password);
    if (!user.length) {
      return true;
    }
    Storage.setItem(StorageKeys.USER, user[0]);
    this.router.navigate(['/series']);
    return false;
  }

  logout() {
    Storage.removeItem(StorageKeys.USER);
    this.router.navigate(['/login'])
  }

  get loggedUser() {
    return Storage.getItem<User>(StorageKeys.USER);
  }

}
