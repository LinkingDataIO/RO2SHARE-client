import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { SHAREService } from '../../shared/services/share/share.service'
import { StorageService } from '../../shared/services/storage/storage.service'
import { ROService} from '../../shared/services/ro/ro.service'
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr'


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [SHAREService, StorageService, ROService,]
})
export class DashboardComponent implements OnInit {
    public shareResults: Array<any> = [];
    public user: Object;
    public searching: boolean = true;


    constructor(private shareService: SHAREService,
                private storageService: StorageService,
                private roService: ROService,
                public toastr: ToastsManager, 
                private vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.user = this.storageService.read<Object>('user');
        this.shareService.getResults(this.user['orcid']).then(shareResults => {
            this.shareResults = shareResults;
            this.searching = false;
        });
    }

    claim(researchObject: Object){
        let claimResult = false;
        researchObject['type'] = 'work';
        this.roService.claim(this.user['orcid'], researchObject).then(claimResult => {
            this.toastr.success('Creative Work Claimed!', 'Success!', {toastLife: 3000, showCloseButton: false});
            researchObject['claimed'] = true;
        });
    }
}
