import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { User } from 'src/app/_models/User';
import { ActivatedRoute } from '@angular/router';
import {NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation} from 'ngx-gallery-9';
@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
user: User;
    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];
  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.route.data
      .subscribe(data =>
         {this.user = data['user'];
        });
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
         imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();
  }

  // loaduser(){
  //   this.userService.getUser(+ this.route.snapshot.params['id'])
  //     .subscribe((user: User) => {this.user = user; },
  //     error => {
  //       this.alertify.error(error);
  //     });
    // tslint:disable-next-line: typedef
    getImages()
    {
      const imageUrls = [];
      for (const photo of this.user.photos) {
        imageUrls.push({
          small: photo.url,
          medium: photo.url,
          big: photo.url,
          description: photo.description
        });
      }

      return imageUrls;
    }
  }

