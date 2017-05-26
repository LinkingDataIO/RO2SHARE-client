import { Component, OnInit, ViewContainerRef } from '@angular/core'
import { StorageService } from '../../shared/services/storage/storage.service'
import { GithubService } from '../../shared/services/github/github.service'
import { ROService} from '../../shared/services/ro/ro.service'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr'

@Component({
    selector: 'app-github',
    templateUrl: './github.component.html',
    styleUrls: ['./github.component.scss'],
    providers: [ROService, StorageService, GithubService]
})

export class GithubComponent implements OnInit {
    public ros: Array<any> = [];
    public githubRepos: Object;
    public user: Object;

    constructor(private roService: ROService,
        private storageService: StorageService,
        private activatedRoute: ActivatedRoute,
        private githubService: GithubService,
        public router: Router,
        public toastr: ToastsManager, 
        private vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.user = this.storageService.read<Object>('user');
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            let code = params['code'];
            if (typeof code !== 'undefined' && localStorage.getItem('githubRepos') === null) {
                let repos = this.githubService.auth(code, this.user['orcid']).then(repos => {
                    this.githubRepos = repos;
                    this.storageService.write('githubRepos', this.githubRepos);
                    this.router.navigateByUrl('/github');
                });
            } else {
                this.githubRepos = this.storageService.read<Array<any>>('githubRepos');
            }
          });
    }

    claim(researchObject: Object){
        let claimResult = false;
        researchObject['type'] = 'repo';
        this.roService.claim(this.user['orcid'], researchObject).then(claimResult => {
            this.toastr.success('Repositoty Claimed!', 'Success!', {toastLife: 3000, showCloseButton: false});
            researchObject['claimed'] = true;
            this.storageService.write('githubRepos', this.githubRepos);
        });
    }
}
