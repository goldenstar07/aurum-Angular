import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {DataStorageService} from "../services/data-storage.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    if(!DataStorageService.isAdmin){
      this.router.navigate(['/login']);
    }
    return DataStorageService.isAdmin;
  }
}
