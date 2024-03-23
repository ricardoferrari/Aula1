import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, timeout } from 'rxjs';


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
      }, 10000);
      setTimeout(() => {
        observer.next(true);
      }, 15000);
    });

    return source.pipe(
      map(response => {
        return { proposal: response};
      }),
      timeout(10000),
      catchError(() => of({ proposal: undefined, error: 'Proposal not found'}))
    );
  }


}
