import { ServerApp } from './presentation/server.app';

describe('App', () => {
  test('should call Server.run with values', async () => {
    const serverRunMock = jest.fn();
    ServerApp.run = serverRunMock;

    process.argv = [
      'node',
      'src/app.ts',
      '-b',
      '10',
      '-l',
      '30',
      '-s',
      '-n',
      'test-file',
      '-d',
      'test-directory',
    ];

    await import('./app');

    expect(serverRunMock).toHaveBeenCalledWith({
      base: 10,
      limit: 30,
      showTable: true,
      fileName: 'test-file',
      fileDestination: 'test-directory',
    });
  });
});
