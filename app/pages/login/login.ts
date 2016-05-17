import {Page, NavController} from "ionic-angular";
import {UsersPage} from "../users/users";

@Page({
    templateUrl: "build/pages/login/login.html",
})
export class LoginPage {
    firebaseRef:Firebase;
    firebaseUrl:string;
    usersRef:Firebase;
    isLoggedIn:boolean;
    authData:any;

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

                this.nav.push(UsersPage);
            }
        });
    }

    addTwitterUser() {
        this.usersRef.child(this.authData.twitter.username).set({
            username: this.authData.twitter.username,
            displayName: this.authData.twitter.displayName,
            profileImageURL: this.authData.twitter.profileImageURL
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
