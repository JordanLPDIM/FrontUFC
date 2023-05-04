import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { GenericPopupComponent } from 'src/app/shared/components/generic-popup/generic-popup.component';
import { FighterFormComponent } from '../../components/fighter-form/fighter-form.component';
import { Fighter } from '../../models/fighter';
import { FighterService } from '../../services/fighter.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-fighter-list',
  templateUrl: './fighter-list.component.html',
  styleUrls: ['./fighter-list.component.scss']
})
  
export class FighterListComponent implements OnInit, OnDestroy{

  private destroy$: Subject<boolean> = new Subject<boolean>();

  //fighters$: Observable<Fighter[]>;

  displayedColumns: string[] = ['firstName', 'lastName', 'category', 'update', 'delete'];
  fighters$: Observable<Fighter[]> = this.fighterService.get();
  categories: Observable<Category[]> = this.categoryService.get();

  
  constructor(private fighterService: FighterService, private categoryService: CategoryService, private dialog: MatDialog, private _snackBar: MatSnackBar, private router: Router){}
  
  openFighterForm(fighter?: Fighter) {
    const dialogRef = this.dialog.open(FighterFormComponent, {
      height: '85%',
      width: '60%',
      data: {
        isCreateForm: fighter ? false : true,
        fighter: fighter ? fighter : undefined
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.fetchData();
          this.router.navigate(['/fighters']);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
  
   ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.fighters$ = this.fighterService.get();
  }
  
  delete(id: number) {
    const ref = this.dialog.open(GenericPopupComponent, {
      data: {
        title: 'Confirmation de suppression',
        message: 'êtes-vous sûr de vouloir supprimer ce combattant ?',
        typeMessage: 'none',
        yesButtonVisible: true,
        noButtonVisible: true,
        cancelButtonVisible: false,
        defaultButton: 'No',
        yesButtonLabel: 'Oui',
        noButtonLabel: 'Non',
      },
    })

    ref.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.fighterService.delete(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(result => {
              this._snackBar.open(result, '', {
                duration: 2000,
                panelClass: ['bg-success']
              });
              this.fetchData();
              this.router.navigate(['/fighters']);
            });
        }
      });
  }

  showfighterDetails(fighterId : number){
   this.router.navigate(['/fighters/' + fighterId]);
  }






}