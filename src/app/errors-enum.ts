export enum ErrorEnum {
  TimeoutError = 'TimeoutError',
  ProposalNotFoundError = 'ProposalNotFoundError',
}

export enum ErrorEnumMessage {
  TimeoutError = 'Tempo excedido para carregar a proposta. Por favor, tente novamente.',
  ProposalNotFoundError = 'Proposta não encontrada. Por favor, tente novamente.',
}

export function getErrorMessage(errorEnum: ErrorEnum): string {
  return ErrorEnumMessage[errorEnum];
}
