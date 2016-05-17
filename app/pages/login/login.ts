import {Page, NavController} from "ionic-angular";
import {ListPage} from "../list/list";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Page({
    templateUrl: "build/pages/login/login.html",
})
export class LoginPage {
    firebaseRef:Firebase;
    isLoggedIn:boolean;
    authData:any;
    firebaseUrl:string;

    authDataProfileName:string;
    authDataProfileLocation:string;

    nav:NavController;

    constructor(public navCon:NavController) {
        this.nav = navCon;
        this.firebaseUrl = "https://hybrid-browsing.firebaseio.com";
        this.firebaseRef = new Firebase(this.firebaseUrl);
        this.firebaseRef.onAuth((user) => {
            if (user) {
                this.authData = user;

                this.authDataProfileName = this.authData.twitter.displayName;
                this.authDataProfileLocation = this.authData.twitter.cachedUserProfile.location;

                this.isLoggedIn = true;

                this.nav.push(ListPage);
            }
        });
    }

    authWithTwitter() {
        this.firebaseRef.authWithOAuthPopup("twitter", (error) => {
            if (error) {
                console.log(error);
            }
        }, {remember: "sessionOnly"});
    }
}
