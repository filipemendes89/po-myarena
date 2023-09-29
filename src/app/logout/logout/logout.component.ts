import { Component } from '@angular/core'
import { AuthService } from '@auth0/auth0-angular'

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(private auth: AuthService) {
    
  }

  ngOnInit() {
    this.auth.logout()
  }
}
