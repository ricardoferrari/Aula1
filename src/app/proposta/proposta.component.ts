import { ProductResolved } from './../proposta.resolver';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProposalServiceService } from '../proposal-service.service';
import { Subject, map, retry, tap } from 'rxjs';

import { DialogErrorData, ErrorModalComponent } from '../error-modal/error-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogOptions } from '../dialog-options';
import { getErrorMessage } from '../errors-enum';
@Component({
  selector: 'app-proposta',
  standalone: true,
  imports: [ErrorModalComponent],
  templateUrl: './proposta.component.html',
  styleUrl: './proposta.component.scss'
})
export class PropostaComponent implements OnInit {

  retryClick$: Subject<string>  = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private propostaService: ProposalServiceService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.registerForResolver();
    this.subscribeForRetry();
  }

  private registerForResolver() {
    this.activatedRoute.data.pipe(
      map(data => data['proposta'] as ProductResolved),
      tap((data: ProductResolved) => {
        const { proposal, error } = data;
        if (error !== undefined) {
          console.error(error);
          const message = getErrorMessage(error);
          this.openRetryDialog({type: DialogOptions.RETRY, message: message });
          return;
        }
        console.log('OK ===', proposal);
      }),
      retry(1)
    ).subscribe();
  }

  private subscribeForRetry() {
    this.retryClick$.subscribe(() => {
      this.propostaService.loadProposal()
      .subscribe((data :ProductResolved) => {
        const { proposal, error } = data;
        if (error !== undefined) {
          console.error(error);
          const message = getErrorMessage(error);
          this.openRetryDialog({type: DialogOptions.RETRY, message: message });
          return;
        }
        console.log('OK ===', proposal);
      });
    });

  }

  openRetryDialog(data: DialogErrorData) {
    const retryDialogRef = this.dialog.open(ErrorModalComponent, {
      data,
      width: '400px',
      height: '250px',
    });

    retryDialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result === DialogOptions.RETRY) {
        this.retryClick$.next(result);
      }
    });
  }
}
