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
    usersRef:Firebase;
    isLoggedIn:boolean;
    authData:any;
    firebaseUrl:string;

    constructor(public nav:NavController) {
        this.firebaseUrl = "https://hybrid-browsing.firebaseio.com";
        this.firebaseRef = new Firebase(this.firebaseUrl);
        this.usersRef = this.firebaseRef.child("users");
        this.firebaseRef.onAuth((user) => {
            if (user) {
                this.authData = user;

                if (this.authData.twitter)
                    this.addTwitterUser();

                this.isLoggedIn = true;

                this.nav.push(ListPage);
            }
        });
    }

    addTwitterUser() {
        this.usersRef.child(this.authData.twitter.username).set({
            displayName: this.authData.twitter.displayName,
            profileImageURL: this.authData.twitter.profileImageURL,
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
