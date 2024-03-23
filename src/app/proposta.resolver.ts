import { inject } from '@angular/core';
import { ProposalServiceService } from './proposal-service.service';
import { ResolveFn } from '@angular/router';

export interface ProductResolved {
  proposal: boolean | undefined;
  error?: string;
}

export const propostaResolver: ResolveFn<ProductResolved> = () => {
  return inject(ProposalServiceService).loadProposal();
};
