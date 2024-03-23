import { inject } from '@angular/core';
import { ProposalServiceService } from './proposal-service.service';
import { ResolveFn } from '@angular/router';
import { ErrorEnum } from './errors-enum';

export interface ProductResolved {
  proposal: boolean | undefined;
  error?: ErrorEnum;
}

export const propostaResolver: ResolveFn<ProductResolved> = () => {
  return inject(ProposalServiceService).loadProposal();
};
