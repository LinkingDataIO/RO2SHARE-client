import { Component, OnInit, ViewContainerRef } from '@angular/core'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'
import { StorageService } from '../../../../shared/services/storage/storage.service'
import { ROService} from '../../../../shared/services/ro/ro.service'
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect'
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect'
import { IMultiSelectSettings } from 'angular-2-dropdown-multiselect'
import { DiSCOService } from '../../../../shared/services/disco/disco.service'
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr'
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    providers: [ROService, StorageService, DiSCOService]
})
export class ModalComponent implements OnInit {
    closeResult: string;
    user: Object;
    searching: boolean = true;
    options: Object = {};
    public ros: Array<any> = [];
    public discos: Array<any> = [];
    public disco: Object = {description: '', ros: []};
    public downloadUrl: string = environment.serviceUrl + "/disco/download?uri=";
    public edit: boolean = false;
    myOptions: IMultiSelectOption[];
    mySettings: IMultiSelectSettings = {
        enableSearch: true,
        checkedStyle: 'fontawesome',
        buttonClasses: 'btn btn-block btn-disco',
    };
    

    constructor(private modalService: NgbModal,
                private roService: ROService,
                private storageService: StorageService,
                private discoService: DiSCOService,
                public toastr: ToastsManager, 
                private vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.myOptions = [];
        this.user = this.storageService.read<Object>('user');
        this.roService.mine(this.user['orcid']).then(ros => {
            this.ros = ros;
            for (let entry of this.ros) {
                this.myOptions.push({id: entry['uri'], name: entry['title']});
            }
        });
        this.discoService.mine(this.user['orcid']).then(discos => {
            this.discos = discos;
            this.searching = false;
        });
    }

    open(content, disco, edit) {
        console.log(disco);
        this.edit = edit;
        this.disco['ros'] = disco['ros'];
        this.disco['description'] = disco['description'];
        this.disco['uri'] = disco['uri'];
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            this.disco = {description: '', ros: []};
        }, (reason) => {
            if(edit) {
                this.discoService.update(this.user['orcid'], reason).then(update => {
                    this.disco = {description: '', ros: []};
                    this.discoService.mine(this.user['orcid']).then(discos => {
                        this.discos = discos;
                        this.toastr.success('Disco updated!', 'Success!', {toastLife: 3000, showCloseButton: false});
                    });
                    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                });

            } else {
                this.discoService.create(this.user['orcid'], reason).then(create => {
                    this.disco = {description: '', ros: []};
                    this.discoService.mine(this.user['orcid']).then(discos => {
                        this.discos = discos;
                        this.toastr.success('Disco created!', 'Success!', {toastLife: 3000, showCloseButton: false});
                    });
                    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                });
            }
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

    onChange() { }
}
