import { FighterService } from './../../services/fighter.service';
import { Fighter } from '../../models/fighter';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from '../../models/category';
import { CategoryService } from './../../services/category.service';
import { Router } from '@angular/router';

export interface fighterFormData {
  isCreateForm: boolean;
  fighter: Fighter;
}

@Component({
  selector: 'app-fighter-form',
  templateUrl: './fighter-form.component.html',
  styleUrls: ['./fighter-form.component.scss']
})
export class FighterFormComponent implements OnDestroy, OnInit {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  categories: Category[];
  categoriesSubscription: Subscription; 
  

  fighterForm = this.fb.group({
    id: [0, [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    category: [0, [Validators.required]],
    dateOfBirth: ['', [Validators.required]]
  });

  constructor(public dialogRef: MatDialogRef<FighterFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: fighterFormData, private fb: FormBuilder, 
    private fighterService : FighterService, private _snackBar: MatSnackBar, private categoryService : CategoryService, private router: Router) {

      if(!data.isCreateForm){
        this.setfighterForm(data.fighter);
      }

  }

  ngOnInit(): void {
    this.categoriesSubscription = this.categoryService.get()
      .subscribe(categories => {
        this.categories = categories;
      }); 
  }



  ngOnDestroy(): void {
   
    this.categoriesSubscription.unsubscribe();
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  setfighterForm(fighter: Fighter) {
    
    this.fighterForm.setValue({
      id: fighter.id,
      firstName: fighter.firstName,
      lastName: fighter.lastName,
      category: fighter.category.id, 
      dateOfBirth: fighter.dateOfBirth
    });
  }

  get title(){
    if(this.data.isCreateForm){
      return 'Formulaire de création';
    }
    return 'Formulaire de modification';
  }

  get submitBtnName(){
    if(this.data.isCreateForm){
      return 'Ajouter';
    }
    return 'Modifier';
  }

  onSubmit(){
    if(this.fighterForm.valid){
      this.fighterForm.value.dateOfBirth = new Date(this.fighterForm.value.dateOfBirth).toISOString();
      if(this.data.isCreateForm){
        this.fighterForm.value.id = Date.now() + Math.random();
        this.fighterService.create(this.fighterForm.value as unknown as Fighter)
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {
          this._snackBar.open(result, '', {
            duration: 2000,
            panelClass: ['bg-success']
          });

          this.dialogRef.close(true);
          this.router.navigate(['/fighters']);
        });
      }else{
        this.fighterService.update(this.fighterForm.value as unknown as Fighter)
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {
          this._snackBar.open(result, '', {
            duration: 2000,
            panelClass: ['bg-success']
          });
          this.dialogRef.close(true);
          this.router.navigate(['/fighters']);
        });
      }
    }
  }
}
