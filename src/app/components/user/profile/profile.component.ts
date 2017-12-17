import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service.client';
import { User } from '../../../models/user.model.client';
import { Router } from '@angular/router';
import { WebsiteService } from '../../../services/website.service.client';
import { NgForm } from '@angular/forms';
import {environment} from '../../../../environments/environment';
import { SharedService } from '../../../services/shared.service.client';
import {CanActivate} from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('f') updateForm: NgForm;
  baseUrl = environment.baseUrl;
  user: any;
  userId: String;
  username: String;
  email: String;
  firstName: String;
  lastName: String;
  class: String;
  youtubeUrl: SafeResourceUrl;
  // inject route info in constructor
  constructor(
          private userService: UserService,
          private activatedRoute: ActivatedRoute,
          private sharedService: SharedService,
          private router: Router,
          public sanitizer: DomSanitizer) { }

  updateVideoUrl() {
    // const aurl = 'https://www.youtube.com/embed/qdA32j7_U6U';
    return this.youtubeUrl = this.sanitizer
      .bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/Ga3maNZ0x0w?autoplay=1&cc_load_policy=1&controls=0');
  }

  getUser() {
    this.user = this.sharedService.user;
    this.username = this.user['username'];
    this.firstName = this.user['firstName'];
    this.lastName = this.user['lastName'];
    this.email = this.user['email'];
    this.userId = this.user['_id'];
    this.class = this.user.class;
  }

  // issue a logout request to the server. On successful logout, set the currentUser to null.
  // Use the code below as an example.
  logout() {
    this.userService.logout()
      .subscribe((status) => {
        this.router.navigate(['']);
      });
  }

  update() {
    // console.log(user);
    this.username = this.updateForm.value.username;
    this.firstName = this.updateForm.value.firstName;
    this.lastName = this.updateForm.value.lastName;
    this.email = this.updateForm.value.email;

    const updatedUser = {
      _id: this.userId,
      username: this.username,
      password: this.user.password,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      class: this.class
    };

    console.log(updatedUser);

    this.userService.updateUser(this.userId, updatedUser).
    subscribe((newuser) => {
      // console.log(status);
      this.user = newuser;
      console.log(this.user);
      window.location.reload(false); // reload page
    });
  }

  deleteUser() {
    this.userService.deleteUser(this.userId).subscribe((status) => {
      console.log(status);
    });
  }

  gotoAdmin() {
    if (this.user.role !== 'ADMIN') {
      alert('Access forbidden');
    } else {
      this.router.navigate(['user', 'admin']);
    }
  }

  // notify the changes of the route
  ngOnInit() {

    console.log(this.sharedService.user);
    this.user = this.sharedService.user;

    this.getUser();

    // invoke a function that can pass the value of the parameters
    // this.activatedRoute.params.subscribe((params) => {
    //   this.userId = params['userId'];
    // });

    // this.user = this.userService.findUserById(this.userId);
    this.userService.findUserById(this.userId).subscribe((user: User) => {
        this.user = user;
        console.log(this.user);
    });
    // alert('userId: ' + this.userId);
  }


}
