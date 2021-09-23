import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatCardModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatButtonModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatRadioModule,
    Material.MatTableModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatToolbarModule,
    Material.MatButtonModule,
    Material.MatDialogModule,
    Material.MatIconModule,
    Material.MatGridListModule,
    FlexLayoutModule,
  ],
  exports:[
    Material.MatCardModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatButtonModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatRadioModule,
    Material.MatTableModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatToolbarModule,
    Material.MatButtonModule,
    Material.MatDialogModule,
    Material.MatIconModule,
    Material.MatGridListModule,
    FlexLayoutModule,
  ]
})
export class MaterialModule { }
