import {Page, NavController, NavParams} from "ionic-angular";

@Page({
    templateUrl: 'build/pages/users/users.html'
})
export class UsersPage {
    selectedUser:any;
    users:Array<{username:string, displayName:string, profileImageURL:string}>;

    usersRef:Firebase;
    usersUrl:string;

    constructor(public nav:NavController, navParams:NavParams) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedUser = navParams.get('user');

        // Retrieve a users of users from the database
        this.usersUrl = "https://hybrid-browsing.firebaseio.com/users";
        this.usersRef = new Firebase(this.usersUrl);
        this.users = [];
        // Get the entire user database
        this.usersRef.on("value", (snapshot:FirebaseDataSnapshot) => {
            // For each user in the database
            snapshot.forEach((userSnapshot:FirebaseDataSnapshot) => {
                let user = userSnapshot.val();
                if (user) {
                    // Push user on to an Array
                    this.users.push(user);
                }
            });
        });
    }

    itemTapped(event, user) {
        this.nav.push(UsersPage, {
            user: user
        });
    }
}
