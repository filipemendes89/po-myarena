import { Injectable } from "@angular/core"
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router"
import { PoNotificationService } from "@po-ui/ng-components"
import { Observable } from "rxjs"
import { AppService } from "../app.service"

@Injectable({
  providedIn: "root",
})
export class MembersClassGuard implements CanActivate {
  constructor(
    private appService: AppService,
    private router: Router,
    private poNotification: PoNotificationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Se o usuário estiver sem sessão,
    // o enviamos para a tela de login
    if (this.appService.getPessoa() || this.appService.isAdmin()) {
      return true;
    }

    this.poNotification.error("Você precisa completar seu cadastro para acessar essa página")
    return this.router.navigateByUrl('people/profile')
  }
}