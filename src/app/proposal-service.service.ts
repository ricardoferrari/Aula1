import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';


export interface ProductResolved {
  proposal: boolean | undefined;
  error?: string;
}


@Injectable({
  providedIn: 'root'
})
export class ProposalServiceService {

  loadProposal(): Observable<ProductResolved> {
    const source: Observable<boolean> = new Observable<boolean>((observer) => {
      setTimeout(() => {
        observer.error('Proposal not found');
      }, 1000);
      // setTimeout(() => {
      //   observer.next(true);
      // }, 2000);
    });

    return source.pipe(
      map(_proposal => {
        return { proposal: _proposal};
      }),
      catchError(() => of({ proposal: undefined, error: 'Proposal not found'}))
    );
  }


}
