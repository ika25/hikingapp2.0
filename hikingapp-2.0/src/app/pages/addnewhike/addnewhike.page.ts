import { MapPage } from './../map/map.page';
import { Component, NgModuleFactoryLoader, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { AddNewHikeService } from './addnewhikeservice';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize, map, takeUntil } from 'rxjs/operators';
import { ToastController, ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UserService } from 'src/app/services/user/user.service';

// add new hike functionality, when user clicks plus button from home screen 
//add new hike feature is invoked.
@Component({
  selector: 'app-addnewhike',
  templateUrl: './addnewhike.page.html',
  styleUrls: ['./addnewhike.page.scss'],
})
export class AddnewhikePage implements OnInit {

  AddNewForm: FormGroup;
  task: AngularFireUploadTask;
  public selectedImage;
  public selectedImageSrc;
  public editKey = '';
  public isEditMode = false;
  public existingImage = '';

  uid: string;
  start_lat: any;
  start_lng: any;
  end_lat: any;
  end_lng: any;
  calorieData: any;

  constructor(
    private storage: AngularFireStorage,
    private addnewService: AddNewHikeService,
    private router: Router,
    public fb: FormBuilder,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    public toastController: ToastController,
    private stor: Storage,
    private modalCtrl: ModalController,
    private userService: UserService
  ) { }


  async ionViewWillEnter() {
    this.route.params.subscribe(param => {
      if (param['key'] && param['key'] != '') {
        this.editKey = param['key'];
        this.isEditMode = true;
        this.getData(this.editKey);
      } else {
        this.isEditMode = false;
      }
    });
    this.uid = await this.stor.get('uid');
  }

  go_back() {
    this.navCtrl.back();
  }

  ngOnInit() {
    this.AddNewForm = this.fb.group({
      name: [''],
      level: [''],
      distance: [''],
      starts: [''],
      ends: [''],
      image: ['', []]
    });
  }

  formSubmit() {
    if (!this.AddNewForm.valid) {
      console.log('form not valid');
      return false;
    } else {
      this.uploadAndSave(this.selectedImage);
    }
  }

  //get existing data for update
  getData(key) {
    this.addnewService.getNewHikeSpot(key).subscribe(data => {
      this.AddNewForm.patchValue(data);
      this.calorieData = data;
      this.start_lat = this.calorieData.start_lat;
      this.start_lng = this.calorieData.start_lng;
      this.end_lat = this.calorieData.end_lat
      this.end_lng = this.calorieData.end_lng
      this.existingImage = data['image'];
    });
  }

  // User can select the file and  upload the image of new hike to add
  //Below function is used to upload.
  async onFileSelect(event: FileList) {
    const file = event.item(0)
    if (file.type.split('/')[0] !== 'image') {
      const toast = await this.toastController.create({
        message: 'Invalid image file format. Only image file allowed',
        color: 'danger',
        duration: 4000
      });
      toast.present();
      return;
    }
    this.selectedImage = file;
    var reader = new FileReader();
    let self = this;
    reader.onload = function (e) {
      self.selectedImageSrc = e.target.result;
    }
    reader.readAsDataURL(file);
  }

  // This is the function used when the user selects the file and submit.
  //the image/file get stored in firestore.
  public async uploadAndSave(file) {
    let url = '';
    if (this.selectedImage != null && this.selectedImage != undefined) {
      const path = `freakyStorage/${new Date().getTime()}_${file.name}`;
      const fileRef = this.storage.ref(path);
      this.task = this.storage.upload(path, file);
      await this.task.snapshotChanges().toPromise()
      url = await fileRef.getDownloadURL().toPromise();
    }
    this.AddNewForm.get('image').setValue(url);
    if (this.isEditMode) {
      var data: any = this.AddNewForm.value;
      // add user's uid, start's lat/lng, end's lat/lng in hike data
      data['uid'] = this.uid;
      data['start_lat'] = this.start_lat ? this.start_lat : (this.calorieData?.start_lat ? this.calorieData?.start_lat : this.userService.lat);
      data['start_lng'] = this.start_lng ? this.start_lng : (this.calorieData?.start_lng ? this.calorieData?.start_lng : this.userService.lng);
      data['end_lat'] = this.end_lat ? this.end_lat : (this.calorieData?.end_lat ? this.calorieData?.end_lat : this.userService.lat);
      data['end_lng'] = this.end_lng ? this.end_lng : (this.calorieData?.end_lng ? this.calorieData?.end_lng : this.userService.lng);

      this.addnewService.updateNewHikeSpot(this.editKey, data).then(res => {
        this.AddNewForm.reset();
        this.router.navigate(['/home/calories']);
      }).catch(error => console.log(error));
    } else {
      // add user's uid, start's lat/lng, end's lat/lng in hike data
      const data = {
        uid: this.uid,
        start_lat: this.start_lat ? this.start_lat : (this.calorieData?.start_lat ? this.calorieData?.start_lat : this.userService.lat),
        start_lng: this.start_lng ? this.start_lng : (this.calorieData?.start_lng ? this.calorieData?.start_lng : this.userService.lng),
        end_lat: this.end_lat ? this.end_lat : (this.calorieData?.end_lat ? this.calorieData?.end_lat : this.userService.lat),
        end_lng: this.end_lng ? this.end_lng : (this.calorieData?.end_lng ? this.calorieData?.end_lng : this.userService.lng),
        ...this.AddNewForm.value
      }
      this.addnewService.createNewHikeSpot(data).then(res => {
        this.AddNewForm.reset();
        this.router.navigate(['/home/calories']);
      }).catch(error => console.log(error));
    }
  }
  /**
   * show map to select location.
   * @param type 
   */
  async showMap(type = '') {
    var modal = await this.modalCtrl.create({
      component: MapPage,
      componentProps: {
        type,
        lat: type == 'start' ? (this.calorieData?.start_lat ? this.calorieData?.start_lat : this.userService.lat) : (this.calorieData?.end_lat ? this.calorieData?.end_lat : this.userService.lat),
        lng: type == 'start' ? (this.calorieData?.start_lng ? this.calorieData?.start_lng : this.userService.lng) : (this.calorieData?.end_lng ? this.calorieData?.end_lng : this.userService.lng)
      }
    });
    modal.onDidDismiss().then(data => {
      if (data.role == 'selected') {
        if (type == 'start') {
          this.start_lat = data.data.lat;
          this.start_lng = data.data.lng;
          const dist = this.userService.calcCrow(this.start_lat, this.start_lng, this.end_lat, this.end_lng);

          const formData = {
            name: this.AddNewForm.value.name,
            level: this.AddNewForm.value.level,
            image: this.AddNewForm.value.image,
            distance: dist,
            starts: data.data.location // address
          }
          this.AddNewForm.patchValue(formData);
        } else {
          this.end_lat = data.data.lat;
          this.end_lng = data.data.lng;
          const dist = this.userService.calcCrow(this.start_lat, this.start_lng, this.end_lat, this.end_lng);

          const formData = {
            name: this.AddNewForm.value.name,
            level: this.AddNewForm.value.level,
            image: this.AddNewForm.value.image,
            distance: dist,
            starts: this.AddNewForm.value.starts,
            ends: data.data.location // address
          }
          this.AddNewForm.patchValue(formData);
        }
      }
    });
    modal.present();
  }
}