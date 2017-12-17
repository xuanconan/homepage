import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service.client';
import { User } from '../../../models/user.model.client';
import { Router } from '@angular/router';
import { WebsiteService} from '../../../services/website.service.client';
import { Website } from '../../../models/website.model.client';
import { NgForm } from '@angular/forms';
import {Page} from '../../../models/page.model.client';
import {PageService} from '../../../services/page.service.client';
import {WidgetService} from '../../../services/widget.service.client';
import {Input} from '@angular/core';
import {Widget} from '../../../models/widget.model.client';
import {WidgetListComponent} from '../widget-list/widget-list.component';

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit {

  // @Input()
  wid: String;
  userId: String;
  pid: String;
  wgid: String;
  widget: any;
  type: String;
  HEADING = 'HEADING'; YOUTUBE = 'YOUTUBE'; TEXT = 'TEXT'; HTML = 'HTML'; IMAGE = 'IMAGE';


  constructor(
    private userService: UserService,
    private websiteService: WebsiteService,
    private widgetService: WidgetService,
    private pageService: PageService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // invoke a function that can pass the value of the parameters
    this.route.params.subscribe((params: any) => {

      this.wid = params['wid'];

      this.pid = params['pid'];

      this.wgid = params['wgid'];

      this.widgetService.findWidgetById(this.wgid)
        .subscribe((widget: any) => {
          this.widget = widget;
          this.widget.type = widget.type;
          console.log(widget);
          console.log(widget.type);

        });
    });

  }

}
