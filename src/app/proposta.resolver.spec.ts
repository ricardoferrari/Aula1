import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { propostaResolver } from './proposta.resolver';

describe('propostaResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => propostaResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
