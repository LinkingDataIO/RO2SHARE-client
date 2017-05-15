import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../../../../shared/services/storage/storage.service'
import { ROService} from '../../../../shared/services/ro/ro.service'

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    providers: [ROService, StorageService]

})
export class ModalComponent implements OnInit {
    closeResult: string;
    user: Object;
    public ros: Array<any> = [];
    public discos: Array<any> = [];
    

    constructor(private modalService: NgbModal,
                private roService: ROService,
                private storageService: StorageService) { }

    ngOnInit() {
        this.user = this.storageService.read<Object>('user');
        this.roService.mine(this.user['orcid']).then(ros => this.ros = ros);
    }

    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            console.log(reason);
            this.discos.push(reason);
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
}
