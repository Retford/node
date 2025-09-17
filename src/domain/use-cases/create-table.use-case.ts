export interface CreateTableUseCase {
  execute: (options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
  base: number;
  limit?: number;
}

export class CreateTable implements CreateTableUseCase {
  constructor(/**
   * DI - Dependency Injection
   */) {}

  execute({ base, limit = 10 }: CreateTableOptions) {
    let outputMessage = '';
    for (let i = 1; i <= limit; i++) {
      const result = base * i;
      outputMessage += `${base} x ${i} = ${result}`;
      if (i < limit) outputMessage += '\n';
    }

    return outputMessage;
  }
}
