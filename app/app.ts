import {App, IonicApp, Platform} from "ionic-angular";
import {StatusBar} from "ionic-native";
import {LoginPage} from "./pages/login/login";
import {UsersPage} from "./pages/users/users";

@App({
    templateUrl: 'build/app.html',
    config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class MyApp {
    rootPage:any = LoginPage;
    pages:Array<{title:string, component:any}>

    constructor(private app:IonicApp, private platform:Platform) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            {title: 'Login', component: LoginPage},
            {title: 'Users', component: UsersPage}
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        let nav = this.app.getComponent('nav');
        nav.setRoot(page.component);
    }
}
