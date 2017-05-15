import { Component, OnInit } from '@angular/core';
import { SHAREService } from '../../shared/services/share/share.service'
import { StorageService } from '../../shared/services/storage/storage.service'
import { ROService} from '../../shared/services/ro/ro.service'


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [SHAREService, StorageService, ROService]
})
export class DashboardComponent implements OnInit {
    public shareResults: Array<any> = [];
    public user: Object;


    constructor(private shareService: SHAREService,
                private storageService: StorageService,
                private roService: ROService) {}

    ngOnInit() {
        this.user = this.storageService.read<Object>('user');
        this.shareService.getResults(this.user['orcid']).then(shareResults => this.shareResults = shareResults);
    }

    claim(researchObject: Object){
        let claimResult = false;
        this.roService.claim(this.user['orcid'], researchObject).then(claimResult => { console.log(claimResult)});
    }
}
