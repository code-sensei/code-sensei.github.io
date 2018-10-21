webpackJsonp([8],{

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddRecordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_file_file__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loader_loader__ = __webpack_require__(166);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the AddRecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddRecordPage = /** @class */ (function () {
    function AddRecordPage(navCtrl, navParams, fileProvider, loader) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fileProvider = fileProvider;
        this.loader = loader;
        this.date = Date.now().toLocaleString();
    }
    AddRecordPage.prototype.add = function () {
        var _this = this;
        var loader = this.loader.create({
            content: 'Adding Record'
        });
        loader.present();
        var details = {
            date: this.date,
            to: this.to,
            from: this.from,
            subject: this.subject,
            signature: this.signature,
            fileNo: this.fileNo
        };
        //   add record to firebase using file provider
        this.fileProvider.addRecord(details).then(function () {
            loader.dismiss();
            _this.date = '',
                _this.to = '',
                _this.from = '',
                _this.subject = '',
                _this.signature = '',
                _this.fileNo = '';
        });
    };
    AddRecordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddRecordPage');
    };
    AddRecordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-add-record',template:/*ion-inline-start:"/Volumes/SAMSUNG/Daemon/Work/Eze/NIWA/src/pages/add-record/add-record.html"*/'<!-- \n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<!-- <ion-header>\n\n  <ion-navbar>\n    <ion-title>login</ion-title>\n  </ion-navbar>\n\n</ion-header>\n-->\n\n<ion-content>\n    <h3 class="heading">\n        Add file record\n    </h3>\n    <p class="sub-heading">\n        Add a new file record to the database\n    </p>\n    <div class="form">\n        <ion-item>\n            <ion-label floating color="app_dark">File Number</ion-label>\n            <ion-input type="text" [(ngModel)]="fileNo"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label floating color="app_dark">Date</ion-label>\n            <ion-input type="date" [(ngModel)]="date"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label color="app_dark">To</ion-label>\n            <ion-select [(ngModel)]="to" multiple="false">\n                <ion-option value="Legal">Legal</ion-option>\n                <ion-option value="Marketing">Marketing</ion-option>\n                <ion-option value="IT">I.T Services</ion-option>\n                <ion-option value="Management">Management</ion-option>\n                <ion-option value="HR">Human Resources</ion-option>\n            </ion-select>\n        </ion-item>\n        <ion-item>\n            <ion-label color="app_dark">From</ion-label>\n            <ion-select [(ngModel)]="from" multiple="false">\n                <ion-option value="Legal">Legal</ion-option>\n                <ion-option value="Marketing">Marketing</ion-option>\n                <ion-option value="IT">I.T Services</ion-option>\n                <ion-option value="Management">Management</ion-option>\n                <ion-option value="HR">Human Resources</ion-option>\n            </ion-select>\n        </ion-item>\n        <ion-item>\n            <ion-label floating color="app_dark">Subject</ion-label>\n            <ion-input type="text" [(ngModel)]="subject"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label floating color="app_dark">Signature</ion-label>\n            <ion-input type="text" [(ngModel)]="signature"></ion-input>\n        </ion-item>\n    </div>\n    <button ion-button round style="margin: 20px; padding: 20px; height: 50px; width: 100px;" (click)="add()" color="app_dark">Add Record</button>\n</ion-content>'/*ion-inline-end:"/Volumes/SAMSUNG/Daemon/Work/Eze/NIWA/src/pages/add-record/add-record.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_file_file__["a" /* FileProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_loader_loader__["a" /* LoaderProvider */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_file_file__["a" /* FileProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
    ], AddRecordPage);
    return AddRecordPage;
}());

//# sourceMappingURL=add-record.js.map

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileViewerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FileViewerPage = /** @class */ (function () {
    function FileViewerPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.file = this.navParams.data.file;
        this.readFile();
    }
    FileViewerPage.prototype.readFile = function () {
        //   var file = new File('https://firebasestorage.googleapis.com/v0/b/niwa-99b34.appspot.com/o/test.php?alt=media&token=793678c8-3ca1-42a6-812a-54f22284142b', 'Test.php')
        var file;
        // var url = this.file.link
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://firebasestorage.googleapis.com/v0/b/niwa-99b34.appspot.com/o/Readme.txt?alt=media&token=50be502f-51e7-4cca-9f5c-334288a854ae', 'Readme.txt");
        xhr.responseType = "blob"; //force the HTTP response, response-type header to be blob
        xhr.onload = function () {
            console.log('XHR');
            file = xhr.response; //xhr.response is now a blob object
            var reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = function (evt) {
                //   document.getElementById("fileContents").innerHTML = evt.target.result
            };
            reader.onerror = function (evt) {
                document.getElementById("fileContents").innerHTML = "error reading file";
            };
        };
        xhr.send();
    };
    FileViewerPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FileViewerPage');
    };
    FileViewerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-file-viewer',template:/*ion-inline-start:"/Volumes/SAMSUNG/Daemon/Work/Eze/NIWA/src/pages/file-viewer/file-viewer.html"*/'<!--\n  Generated template for the FileViewerPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar color="app_dark">\n        <ion-title>File Viewer</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <div class="container">\n        <!-- <app-ngx-editor [placeholder]="\'Enter text here...\'" [spellcheck]="true" style="min-height: 90vh !important;" [(ngModel)]="htmlContent">\n                    \n                        </app-ngx-editor> -->\n        <!-- <ckeditor [(ngModel)]="htmlContent" [config]="{uiColor: \'#8E2DE2\'}" [readonly]="false" (change)="onChange($event)" (editorChange)="onEditorChange($event)" (ready)="onReady($event)" (focus)="onFocus($event)" (blur)="onBlur($event)" (contentDom)="onContentDom($event)"\n                            (fileUploadRequest)="onFileUploadRequest($event)" (fileUploadResponse)="onFileUploadResponse($event)" (paste)="onPaste($event)" (drop)="onDrop($event)" debounce="500">\n                        </ckeditor> -->\n        <ion-row>\n            <ion-col>\n                <p>From: <span class="hint">{{file.from}}</span></p>\n            </ion-col>\n            <ion-col col-6>\n                <p>Title: <span class="hint">{{file.title}}</span></p>\n            </ion-col>\n            <ion-col>\n                <p>Date Sent: <span class="hint">{{file.sent}}</span></p>\n            </ion-col>\n        </ion-row>\n        <hr class="hint" />\n        <div class="fileContents" id="fileContents" #fileContents>\n            {{file.content}}\n        </div>\n    </div>\n\n</ion-content>'/*ion-inline-end:"/Volumes/SAMSUNG/Daemon/Work/Eze/NIWA/src/pages/file-viewer/file-viewer.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], FileViewerPage);
    return FileViewerPage;
}());

//# sourceMappingURL=file-viewer.js.map

/***/ }),

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(83);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import { LoaderProvider } from '../../providers/loader/loader';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, auth, loader) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth = auth;
        this.loader = loader;
    }
    LoginPage.prototype.login = function () {
        var _this = this;
        var loader = this.loader.create({
            content: 'Logging In'
        });
        loader.present();
        this.auth.login(this.email, this.password).then(function () {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
            loader.dismiss();
        });
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Volumes/SAMSUNG/Daemon/Work/Eze/NIWA/src/pages/login/login.html"*/'<!-- \n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<!-- <ion-header>\n\n  <ion-navbar>\n    <ion-title>login</ion-title>\n  </ion-navbar>\n\n</ion-header>\n-->\n\n<ion-content>\n    <h3 class="heading">\n        Glad to see you back\n    </h3>\n    <p class="sub-heading">\n        Log into an existing account\n    </p>\n    <div class="form">\n        <ion-item>\n            <ion-label floating color="app_dark">Email</ion-label>\n            <ion-input type="email" [(ngModel)]="email"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label floating color="app_dark">Password</ion-label>\n            <ion-input type="password" [(ngModel)]="password"></ion-input>\n        </ion-item>\n    </div>\n    <button ion-button round style="margin: 20px; padding: 20px; height: 50px; width: 100px;" (click)="login()" color="app_dark">Login</button>\n</ion-content>'/*ion-inline-end:"/Volumes/SAMSUNG/Daemon/Work/Eze/NIWA/src/pages/login/login.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* AuthProvider */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* AuthProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SendFilesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the SendFilesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SendFilesPage = /** @class */ (function () {
    function SendFilesPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    SendFilesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SendFilesPage');
    };
    SendFilesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-send-files',template:/*ion-inline-start:"/Volumes/SAMSUNG/Daemon/Work/Eze/NIWA/src/pages/send-files/send-files.html"*/'<!--\n  Generated template for the SendFilesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>send-files</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Volumes/SAMSUNG/Daemon/Work/Eze/NIWA/src/pages/send-files/send-files.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], SendFilesPage);
    return SendFilesPage;
}());

//# sourceMappingURL=send-files.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecordsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the RecordsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RecordsPage = /** @class */ (function () {
    function RecordsPage(navCtrl, navParams, loader) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loader = loader;
        this.records = [];
        this.getRecords();
    }
    RecordsPage.prototype.getRecords = function () {
        var _this = this;
        var loader = this.loader.create({
            content: 'Loading Records'
        });
        loader.present();
        __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('Records/').on('value', function (snap) {
            for (var key in snap.val()) {
                if (snap.val().hasOwnProperty(key)) {
                    var record = snap.val()[key];
                    _this.records.push(record);
                }
            }
            loader.dismiss();
        });
    };
    RecordsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RecordsPage');
    };
    RecordsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-records',template:/*ion-inline-start:"/Volumes/SAMSUNG/Daemon/Work/Eze/NIWA/src/pages/records/records.html"*/'<!--\n  Generated template for the RecordsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar color="app_dark">\n        <ion-title>File Records</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <table class="table">\n        <thead>\n            <tr>\n                <th scope="col">File Number</th>\n                <th scope="col">Subject</th>\n                <th scope="col">From</th>\n                <th scope="col">To</th>\n                <th scope="col">Date</th>\n                <th scope="col">Signature</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr *ngFor="let record of records; let i = index">\n                <th scope="row">{{record.fileNo}}</th>\n                <td>{{record.subject}}</td>\n                <td>{{record.from}}</td>\n                <td>{{record.to}}</td>\n                <td>{{record.date}}</td>\n                <td>{{record.signature}}</td>\n            </tr>\n        </tbody>\n    </table>\n</ion-content>'/*ion-inline-end:"/Volumes/SAMSUNG/Daemon/Work/Eze/NIWA/src/pages/records/records.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
    ], RecordsPage);
    return RecordsPage;
}());

//# sourceMappingURL=records.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(83);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import { LoaderProvider } from '../../providers/loader/loader';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, navParams, auth, loader) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth = auth;
        this.loader = loader;
    }
    SignupPage.prototype.register = function () {
        var _this = this;
        var loader = this.loader.create({
            content: 'Registering'
        });
        loader.present();
        this.auth.signup(this.email, this.dept, this.password).then(function () {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
            loader.dismiss();
        });
    };
    SignupPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignupPage');
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"/Volumes/SAMSUNG/Daemon/Work/Eze/NIWA/src/pages/signup/signup.html"*/'<!--\n  Generated template for the SignupPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-content>\n    <h3 class="heading">\n        Want to get started?\n    </h3>\n    <p class="sub-heading">\n        Create a new account\n    </p>\n    <div class="form">\n        <ion-item>\n            <ion-label floating color="app_dark">Email</ion-label>\n            <ion-input type="email" [(ngModel)]="email"></ion-input>\n        </ion-item>\n        <ion-item style="padding-top: 30px">\n            <ion-label color="app_dark">Department</ion-label>\n            <ion-select [(ngModel)]="dept" multiple="false">\n                <ion-option value="Legal">Legal</ion-option>\n                <ion-option value="Marketing">Marketing</ion-option>\n                <ion-option value="IT">I.T Services</ion-option>\n                <ion-option value="Management">Management</ion-option>\n                <ion-option value="HR">Human Resources</ion-option>\n            </ion-select>\n        </ion-item>\n        <ion-item>\n            <ion-label floating color="app_dark">Password</ion-label>\n            <ion-input type="password" [(ngModel)]="password"></ion-input>\n        </ion-item>\n    </div>\n    <button ion-button round style="margin: 5px; padding: 20px; height: 50px; width: 100px;" (click)="register()" color="app_dark">Login</button>\n</ion-content>'/*ion-inline-end:"/Volumes/SAMSUNG/Daemon/Work/Eze/NIWA/src/pages/signup/signup.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* AuthProvider */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* AuthProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 120:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 120;

/***/ }),

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/add-record/add-record.module": [
		296,
		7
	],
	"../pages/file-editor/file-editor.module": [
		297,
		6
	],
	"../pages/file-viewer/file-viewer.module": [
		298,
		5
	],
	"../pages/hero/hero.module": [
		299,
		4
	],
	"../pages/login/login.module": [
		300,
		3
	],
	"../pages/records/records.module": [
		301,
		2
	],
	"../pages/send-files/send-files.module": [
		302,
		1
	],
	"../pages/signup/signup.module": [
		303,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 161;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// import { HttpClient } from '@angular/common/http';


/*
  Generated class for the FileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var FileProvider = /** @class */ (function () {
    function FileProvider() {
        console.log('Hello FileProvider Provider');
    }
    FileProvider.prototype.addRecord = function (details) {
        return __WEBPACK_IMPORTED_MODULE_1_firebase__["database"]().ref("Records/" + details.fileNo + "/").set(details).then(function () {
            //   toast record added
            console.log('Saved');
        });
    };
    FileProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], FileProvider);
    return FileProvider;
}());

//# sourceMappingURL=file.js.map

/***/ }),

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoaderProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// import { HttpClient } from '@angular/common/http';


/*
  Generated class for the LoaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var LoaderProvider = /** @class */ (function () {
    function LoaderProvider(loader) {
        this.loader = loader;
        console.log('Hello LoaderProvider Provider');
    }
    LoaderProvider.prototype.create = function (action) {
        this.loader.create({
            content: action,
            dismissOnPageChange: true
        }).present();
    };
    LoaderProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
    ], LoaderProvider);
    return LoaderProvider;
}());

//# sourceMappingURL=loader.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileEditorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the FileEditorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FileEditorPage = /** @class */ (function () {
    function FileEditorPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    FileEditorPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FileEditorPage');
    };
    FileEditorPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-file-editor',template:/*ion-inline-start:"/Volumes/SAMSUNG/Daemon/Work/Eze/NIWA/src/pages/file-editor/file-editor.html"*/'<!--\n  Generated template for the FileEditorPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>file-editor</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Volumes/SAMSUNG/Daemon/Work/Eze/NIWA/src/pages/file-editor/file-editor.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], FileEditorPage);
    return FileEditorPage;
}());

//# sourceMappingURL=file-editor.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(235);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_hero_hero__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_file_editor_file_editor__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_file_viewer_file_viewer__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_login_login__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_send_files_send_files__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_signup_signup__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_auth_auth__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_firebase_app__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_add_record_add_record__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_file_file__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_records_records__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_loader_loader__ = __webpack_require__(166);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
__WEBPACK_IMPORTED_MODULE_14_firebase_app__["initializeApp"]({
    apiKey: 'AIzaSyBz67-ddYMx0OOohxqQjz-yMZnCx-8Ff5M',
    authDomain: 'niwa-99b34.firebaseapp.com',
    databaseURL: 'https://niwa-99b34.firebaseio.com',
    projectId: 'niwa-99b34',
    storageBucket: 'niwa-99b34.appspot.com',
    messagingSenderId: '739693279410'
});
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_hero_hero__["a" /* HeroPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_file_editor_file_editor__["a" /* FileEditorPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_file_viewer_file_viewer__["a" /* FileViewerPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_send_files_send_files__["a" /* SendFilesPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_add_record_add_record__["a" /* AddRecordPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_records_records__["a" /* RecordsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/add-record/add-record.module#AddRecordPageModule', name: 'AddRecordPage', segment: 'add-record', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/file-editor/file-editor.module#FileEditorPageModule', name: 'FileEditorPage', segment: 'file-editor', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/file-viewer/file-viewer.module#FileViewerPageModule', name: 'FileViewerPage', segment: 'file-viewer', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/hero/hero.module#HeroPageModule', name: 'HeroPage', segment: 'hero', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/records/records.module#RecordsPageModule', name: 'RecordsPage', segment: 'records', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/send-files/send-files.module#SendFilesPageModule', name: 'SendFilesPage', segment: 'send-files', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/signup/signup.module#SignupPageModule', name: 'SignupPage', segment: 'signup', priority: 'low', defaultHistory: [] }
                    ]
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_hero_hero__["a" /* HeroPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_file_editor_file_editor__["a" /* FileEditorPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_file_viewer_file_viewer__["a" /* FileViewerPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_send_files_send_files__["a" /* SendFilesPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_add_record_add_record__["a" /* AddRecordPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_records_records__["a" /* RecordsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_13__providers_auth_auth__["a" /* AuthProvider */],
                __WEBPACK_IMPORTED_MODULE_16__providers_file_file__["a" /* FileProvider */],
                __WEBPACK_IMPORTED_MODULE_18__providers_loader_loader__["a" /* LoaderProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_hero_hero__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_hero_hero__["a" /* HeroPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Volumes/SAMSUNG/Daemon/Work/Eze/NIWA/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Volumes/SAMSUNG/Daemon/Work/Eze/NIWA/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// import { HttpClient } from '@angular/common/http';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AuthProvider = /** @class */ (function () {
    function AuthProvider() {
        console.log('Hello AuthProvider Provider');
    }
    AuthProvider.prototype.login = function (email, password) {
        return __WEBPACK_IMPORTED_MODULE_1_firebase__["auth"]().signInWithEmailAndPassword(email, password).then(function () {
            console.log('User logged in successfully');
        }).catch(function (err) {
            console.error('Counld NOT login user');
        });
    };
    AuthProvider.prototype.signup = function (email, dept, password) {
        return __WEBPACK_IMPORTED_MODULE_1_firebase__["auth"]().createUserWithEmailAndPassword(email, password).then(function () {
            console.log('User createed successfully');
            __WEBPACK_IMPORTED_MODULE_1_firebase__["database"]().ref("Users/" + dept).set({
                email: email,
                sentFiles: [],
                receivedFiles: []
            }).then(function () {
                console.log('User added to the database');
            }).catch(function (err) {
                console.error('User could NOT be added to the database: \n Reason: ', err.message);
            });
        }).catch(function (err) {
            console.error('User account could NOT be created: \n Reason: ', err.message);
        });
    };
    AuthProvider.prototype.logout = function () {
        return __WEBPACK_IMPORTED_MODULE_1_firebase__["auth"]().signOut();
    };
    AuthProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], AuthProvider);
    return AuthProvider;
}());

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeroPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__signup_signup__ = __webpack_require__(111);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the HeroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HeroPage = /** @class */ (function () {
    function HeroPage(navCtrl, navParams, modal) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modal = modal;
    }
    HeroPage.prototype.openLogin = function () {
        // this.modal.create(LoginPage).present()
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    HeroPage.prototype.openSignup = function () {
        //   this.modal.create(SignupPage).present()
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__signup_signup__["a" /* SignupPage */]);
    };
    HeroPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HeroPage');
    };
    HeroPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-hero',template:/*ion-inline-start:"/Volumes/SAMSUNG/Daemon/Work/Eze/NIWA/src/pages/hero/hero.html"*/'<div class="page">\n    <div class="header">\n        <h3 class="heading">N.I.W.A</h3>\n        <p class="desc">Your friendly file tracking assistant</p>\n        <div class="cta">\n            <button type="button" class="btn btn-primary btn-round" (click)="openSignup()">Get Started</button>\n            <button type="button" class="btn btn-primary btn-round btn-outline" (click)="openLogin()">Login</button>\n        </div>\n    </div>\n</div>\n\n<!-- MODAL TEMPLATES -->\n\n<!-- SIGNUP TEMPLATE -->\n<ng-template #signup let-modal>\n    <div class="modal-header">\n        <h4 class="modal-title" id="modal-basic-title">Register an account</h4>\n        <button type="button" class="close" aria-label="Close" (click)="modal.dismiss(\'Cross click\')">\n                    <span aria-hidden="true">&times;</span>\n                  </button>\n    </div>\n    <div class="modal-body">\n        <form>\n            <!-- EMAIL -->\n            <div class="form-group">\n                <label for="registerEmail">Email address</label>\n                <input name="email" #email type="email" class="form-control" id="registerEmail" aria-describedby="emailHelp" placeholder="Enter email">\n                <small id="emailHelp" class="form-text text-muted">We\'ll never share your email with anyone else.</small>\n            </div>\n            <!-- DEPARTMENT SELECT -->\n            <div class="form-group">\n                <label for="exampleFormControlSelect1">Department</label>\n                <select name="dept" #dept class="form-control" id="exampleFormControlSelect1">\n                          <option>Legal</option>\n                          <option>IT Services</option>\n                          <option>Marketing</option>\n                          <option>Human Resources</option>\n                          <option>Management</option>\n                        </select>\n            </div>\n            <!-- PASSWORD -->\n            <div class="form-group">\n                <label for="registerPassword">Password</label>\n                <input name="password" #password type="password" class="form-control" id="registerPassword" placeholder="Password">\n            </div>\n            <button style="margin: 5px !important;" class="btn btn-primary btn-outline unique" (click)="register()">Register</button>\n            <a routerLink="/home" style="display: none" #home></a>\n        </form>\n    </div>\n</ng-template>\n\n<!-- LOGIN TEMPLATE -->\n<ng-template #login let-modal>\n    <div class="modal-header">\n        <h4 class="modal-title" id="modal-basic-title">Login to existing account</h4>\n        <button type="button" class="close" aria-label="Close" (click)="modal.dismiss(\'Cross click\')">\n                            <span aria-hidden="true">&times;</span>\n                          </button>\n    </div>\n    <div class="modal-body">\n        <form>\n            <!-- EMAIL -->\n            <div class="form-group">\n                <label for="loginEmail">Email address</label>\n                <input name="l_email" #l_email type="email" class="form-control" id="loginEmail" aria-describedby="emailHelp" placeholder="Enter email">\n            </div>\n            <!-- PASSWORD -->\n            <div class="form-group">\n                <label for="loginPassword">Password</label>\n                <input name="l_password" #l_password type="password" class="form-control" id="loginPassword" placeholder="Password">\n            </div>\n            <!-- <a routerLink="/home" queryParams="{email: l_email, password: l_password" (click)="this.modal.dismissAll()"> -->\n            <button style="margin: 5px !important;" class="btn btn-primary btn-outline unique" (click)="login()">Login</button>\n            <a routerLink="/home" style="display: none" #home></a>\n            <!-- </a> -->\n            <!-- <button style="margin: 5px !important;" class="btn btn-primary btn-outline unique" (click)="login()">Login</button> -->\n        </form>\n    </div>\n</ng-template>'/*ion-inline-end:"/Volumes/SAMSUNG/Daemon/Work/Eze/NIWA/src/pages/hero/hero.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */]])
    ], HeroPage);
    return HeroPage;
}());

//# sourceMappingURL=hero.js.map

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__file_viewer_file_viewer__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__send_files_send_files__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__add_record_add_record__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__hero_hero__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__records_records__ = __webpack_require__(110);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, auth, modal) {
        this.navCtrl = navCtrl;
        this.auth = auth;
        this.modal = modal;
        this.receivedFiles = [
            {
                title: 'File One',
                content: 'Lorem ipsum dolor sit amet...',
                sent: '8th October, 2018',
                from: 'Legal'
            },
            {
                title: 'File Two',
                content: 'Lorem ipsum dolor sit amet...',
                sent: '9th October, 2018',
                from: 'Marketing'
            },
        ];
        this.sentFiles = [
            {
                title: 'File One',
                content: 'Lorem ipsum dolor sit amet...',
                sent: '8th October, 2018',
                from: 'Legal'
            },
            {
                title: 'File Two',
                content: 'Lorem ipsum dolor sit amet...',
                sent: '9th October, 2018',
                from: 'Marketing'
            },
        ];
    }
    HomePage.prototype.viewRFile = function (i) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__file_viewer_file_viewer__["a" /* FileViewerPage */], { file: this.receivedFiles[i] });
    };
    HomePage.prototype.viewSFile = function (i) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__file_viewer_file_viewer__["a" /* FileViewerPage */], { file: this.sentFiles[i] });
    };
    HomePage.prototype.toSendPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__send_files_send_files__["a" /* SendFilesPage */]);
    };
    HomePage.prototype.addRecord = function () {
        this.modal.create(__WEBPACK_IMPORTED_MODULE_5__add_record_add_record__["a" /* AddRecordPage */]).present();
    };
    HomePage.prototype.toRecords = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__records_records__["a" /* RecordsPage */]);
    };
    HomePage.prototype.logout = function () {
        var _this = this;
        this.auth.logout().then(function () {
            console.log('User Logged out');
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__hero_hero__["a" /* HeroPage */]);
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Volumes/SAMSUNG/Daemon/Work/Eze/NIWA/src/pages/home/home.html"*/'<!-- NAV GOES HERE -->\n<ul class="nav nav-justified nav-pills">\n    <li class="nav-item">\n        <a class="nav-link hoverable active">Dashboard</a>\n    </li>\n    <!-- <li class="nav-item">\n        <a class="nav-link hoverable" (click)="toSendPage()">Send Files</a>\n    </li> -->\n    <li class="nav-item">\n        <a class="nav-link hoverable" (click)="toRecords()">File Records</a>\n    </li>\n    <li class="nav-item">\n        <a class="nav-link hoverable" (click)="addRecord()">Add Record</a>\n    </li>\n    <li class="nav-item">\n        <ion-icon name="power" color="danger" (click)="logout()"></ion-icon>\n        <!-- <a class="nav-link hoverable log-out" (click)="logout()">Log Out</a> -->\n    </li>\n</ul>\n\n<!-- MAIN US HERE -->\n<div class="list-group container">\n    <h3 class="heading">Received Files</h3>\n    <div class="row">\n        <a (click)="viewRFile(i)" *ngFor="let file of receivedFiles; let i = index" class="col-lg-3 col-md-4 col-sm-6 col-xs-12 list-group-item list-group-item-action flex-column align-items-start">\n            <div class="d-flex w-100 justify-content-between">\n                <h5 class="mb-1">{{file.title}}</h5>\n                <small>{{file.sent}}</small>\n            </div>\n            <p class="mb-1">{{file.content}}</p>\n            <small>{{file.from}}</small>\n        </a>\n    </div>\n</div>\n\n<div class="list-group container">\n    <h3 class="heading">Sent Files</h3>\n    <div class="row">\n        <a (click)="viewSFile(i)" *ngFor="let file of sentFiles; let i = index" class="col-lg-3 col-md-4 col-sm-6 col-xs-12 list-group-item list-group-item-action flex-column align-items-start">\n            <div class="d-flex w-100 justify-content-between">\n                <h5 class="mb-1">{{file.title}}</h5>\n                <small>{{file.sent}}</small>\n            </div>\n            <p class="mb-1">{{file.content}}</p>\n            <small>{{file.from}}</small>\n        </a>\n    </div>\n</div>'/*ion-inline-end:"/Volumes/SAMSUNG/Daemon/Work/Eze/NIWA/src/pages/home/home.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__["a" /* AuthProvider */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__["a" /* AuthProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ })

},[212]);
//# sourceMappingURL=main.js.map