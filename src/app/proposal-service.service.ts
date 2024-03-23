import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, timeout } from 'rxjs';
import { ErrorEnum, ErrorEnumMessage } from './errors-enum';


export interface ProductResolved {
  proposal: boolean | undefined;
  error?: ErrorEnum;
}


@Injectable({
  providedIn: 'root'
})
export class ProposalServiceService {

  loadProposal(): Observable<ProductResolved> {
    const source: Observable<boolean> = new Observable<boolean>((observer) => {
      setTimeout(() => {
        observer.error({name: ErrorEnum.ProposalNotFoundError ,message:ErrorEnumMessage.ProposalNotFoundError});
      }, 5000);
      setTimeout(() => {
        observer.next(true);
      }, 4000);
    });

    return source.pipe(
      map(response => {
        return { proposal: response};
      }),
      timeout(3000),
      catchError((error) => of({ proposal: undefined, error: error.name}))
    );
  }


}
