import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { PoPageLogin } from '@po-ui/ng-templates'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _router:Router) {}
  loginSubmit(formData:PoPageLogin) {
    console.log(formData)
    this._router.navigate(['/home']);
  }
}
