import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service.client';
import { User } from '../../../models/user.model.client';
import { Router } from '@angular/router';
import { WebsiteService} from '../../../services/website.service.client';
import { Website} from '../../../models/website.model.client';
import { NgForm } from '@angular/forms';
import {SharedService} from '../../../services/shared.service.client';


@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {
  @ViewChild('f') createForm: NgForm;

  wid: String;
  userId: String;
  user: any;
  name: String;
  developerId: String;
  websitename: String;
  websites: Website[];
  description: String;
  newWebsite: any;

  // inject route info in constructor
  constructor(
    private websiteService: WebsiteService,
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService) { }

  getUser() {
    // this.user = JSON.parse(localStorage.getItem("user"));
    this.user = this.sharedService.user;
    this.userId = this.user['_id'];
  }

  create() {

    this.websitename = this.createForm.value.websitename;
    this.description = this.createForm.value.description;
    if (this.websitename === "") {
      alert('Please input class name');
    } else {
      if (this.user.role !== 'ORGANIZER') {
        this.newWebsite = {
          _id: this.websiteService.newId(),
          name: this.websitename,
          developerId: this.userId,
          description: this.description,
          competition: 0
        };
      } else {
        this.newWebsite = {
          _id: this.websiteService.newId(),
          name: this.websitename + ' (Trading Competition)',
          developerId: this.userId,
          description: this.description,
          competition: 1
        };
      }
      this.websiteService.createWebsite(this.userId, this.newWebsite)
        .subscribe((websites) => {
          // this.websites = websites;
          this.router.navigate(['user', 'website']);
        });
      console.log(this.newWebsite);
    }
  }

  // notify the changes of the route
  ngOnInit() {
    // invoke a function that can pass the value of the parameters
    this.route.params.subscribe((params: any) => {
      this.wid = params['wid'];
    });

    this.getUser();

    this.user = this.sharedService.user;

    this.userId = this.user['_id'];

    this.websiteService.findAllClasses()
      .subscribe((classes) => {
        this.websites = classes;
        console.log(classes);
      });

    // this.websiteService.findWebsitesByUser(this.userId)
    //   .subscribe((websites) => {
    //     this.websites = websites;
    //   });
  }

}





