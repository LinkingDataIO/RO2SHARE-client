import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { OpenaireRoutingModule } from './openaire-routing.module';
import { OpenaireComponent } from './openaire.component';
import { PageHeaderModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        OpenaireRoutingModule,
        PageHeaderModule,
        NgbModule.forRoot(),
    ],
    declarations: [OpenaireComponent]
})
export class OpenaireModule { }
