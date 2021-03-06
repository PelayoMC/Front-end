import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NoFoundComponent } from '../no-found/no-found.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PipeModule } from '../pipes/pipe.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        HeaderComponent,
        SidebarComponent,
        NoFoundComponent
      ],
      imports: [
        RouterModule,
        CommonModule,
        PipeModule,
        TranslateModule.forRoot()
      ],
      exports: [
        HeaderComponent,
        SidebarComponent,
        NoFoundComponent
      ]
})
export class SharedModule {}