import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProposalServiceService } from '../proposal-service.service';
import { map, retry, tap } from 'rxjs';

@Component({
  selector: 'app-proposta',
  standalone: true,
  imports: [],
  templateUrl: './proposta.component.html',
  styleUrl: './proposta.component.scss'
})
export class PropostaComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private propostaService: ProposalServiceService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      const { proposta } = data;
      const { proposal, error } = proposta;
      if (error !== undefined) {
        console.error(error);
        this.propostaService.loadProposal().pipe(
          tap(console.log),
          map((proposal) => {
            if (proposal.error !== undefined) {
              throw new Error('Error loading proposal again');
            }
            return proposal;
          }),
          retry(2)
        ).subscribe({
          next: (proposal) => {
            console.log('OK ===', proposal);
          },
          error: (error) => {
            console.error(error);
          }
        });
        return;
      }
      console.log('OK ===', proposal);
    });
  }
}
