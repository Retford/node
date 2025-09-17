import { CreateTable } from './create-table.use-case';
describe('CreateTableUseCase', () => {
  test('should create table with default values', async () => {
    const createTable = new CreateTable();
    const table = createTable.execute({ base: 2 });
    const rows = table.split('\n').length;

    expect(createTable).toBeInstanceOf(CreateTable);
    expect(table).toContain('2 x 1');
    expect(table).toContain('2 x 10 = 20');
    expect(rows).toBe(10);
  });

  test('should reate table with custom values', async () => {
    const createTable = new CreateTable();
    const table = createTable.execute({ base: 3, limit: 20 });
    const rows = table.split('\n').length;

    const base = table.split('x')[0];

    expect(rows).toBe(20);
    expect(table).toContain('3 x 1');
    expect(table).toContain('3 x 20 = 60');
    expect(base).toBe('3 ');
  });
});
