import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../shared/services/auth/auth.service'
import { StorageService } from '../shared/services/storage/storage.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [AuthService, StorageService]
})
export class LoginComponent implements OnInit {

	user: Object;

    constructor(public router: Router,
    			private activatedRoute: ActivatedRoute,
    			private authService: AuthService,
    			private storageService: StorageService) { }

    ngOnInit() {
    	this.activatedRoute.queryParams.subscribe((params: Params) => {
    	    let code = params['code'];
    	    if (typeof code !== 'undefined' && localStorage.getItem('isLoggedin') === null) {
    	    	let user = this.authService.auth(code).then(user => {
    	    		this.user = user;
    	    		this.storageService.write('user', this.user);
    	    		this.storageService.write('isLoggedin', 'true');
    	    		this.router.navigateByUrl('/dashboard');
    	    	});
    	    }
    	  });
    }

    onLoggedin() {
    	var oauthWindow = window.open("https://orcid.org/oauth/authorize?client_id=APP-NNXW1QUFSJRHMC0C&response_type=code&scope=/authenticate&redirect_uri=http://localhost:4200/login", "_self", "toolbar=no, scrollbars=yes, width=500, height=600, top=500, left=500");
    }

}
