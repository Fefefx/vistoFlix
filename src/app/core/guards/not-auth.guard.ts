import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import { Observable } from "rxjs";
import { StorageKeys } from "../enums/storage-keys";
import { User } from "../model/user";
import { Storage } from "../providers/storage";

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router){}

  canActivate(): Promise<boolean | UrlTree> {
    return this.guard();
  }

  canActivateChild(): Promise<boolean | UrlTree> {
    return this.guard();
  }

  private async guard(): Promise<boolean | UrlTree> {
    const userLogged = Storage.getItem<User>(StorageKeys.USER);
    if (userLogged) {
      return this.router.parseUrl('/series')
    }
    return true;
  }

}
