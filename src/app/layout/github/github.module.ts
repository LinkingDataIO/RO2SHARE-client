import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { GithubRoutingModule } from './github-routing.module';
import { GithubComponent } from './github.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        GithubRoutingModule,
        PageHeaderModule
    ],
    declarations: [GithubComponent]
})
export class GithubModule { }
