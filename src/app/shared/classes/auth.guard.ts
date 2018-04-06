import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {DataStorageService} from "../services/data-storage.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AutGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {
    if(!DataStorageService.isAuthorization){
      this.router.navigate(['/login']);
    }
    return DataStorageService.isAuthorization;
  }
}
