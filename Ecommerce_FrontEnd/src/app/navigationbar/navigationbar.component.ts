import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigationbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.css']
})
export class NavigationbarComponent implements OnInit {
currentUserRole;
currentUser;

  constructor(private router:Router) { }

  ngOnInit() {
    this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
    if(this.currentUser){
      this.currentUserRole=this.currentUser.role;
      console.log(this.currentUser.role);
    }
  }

  Logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
