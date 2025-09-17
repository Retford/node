import { SaveFile } from './save-file.use-case';
import fs from 'fs';

describe('SaveFileUseCase', () => {
  const customOptions = {
    fileContent: 'custom content',
    fileDestination: 'custom-outputs/file-destination',
    fileName: 'custom-table-name',
  };

  const fileCustomPath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

  afterEach(() => {
    const outputFileExists = fs.existsSync('outputs');
    if (outputFileExists) fs.rmSync('outputs', { recursive: true });

    const outputFileCustomExists = fs.existsSync('custom-outputs');
    if (outputFileCustomExists)
      fs.rmSync('custom-outputs', { recursive: true });
  });

  test('should save file with default values', () => {
    const saveFile = new SaveFile();

    const fileCustomPath = 'outputs/table.txt';
    const customOptions = {
      fileContent: 'Test content',
    };

    const result = saveFile.execute(customOptions);

    const checkFile = fs.existsSync(fileCustomPath);
    const fileContent = fs.readFileSync(fileCustomPath, { encoding: 'utf-8' });

    expect(result).toBeTruthy();
    expect(checkFile).toBeTruthy();
    expect(fileContent).toBe(customOptions.fileContent);
  });

  test('should save file with custom values', () => {
    const saveFile = new SaveFile();

    const result = saveFile.execute(customOptions);
    const checkFile = fs.existsSync(fileCustomPath);
    const fileContent = fs.readFileSync(fileCustomPath, { encoding: 'utf-8' });

    expect(result).toBeTruthy();
    expect(checkFile).toBeTruthy();
    expect(fileContent).toBe(customOptions.fileContent);
  });

  test('should return false if directory could not be created', () => {
    const saveFile = new SaveFile();
    const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
      throw new Error('This is a custom error message from testing');
    });

    const result = saveFile.execute({ fileContent: 'Hola' });

    expect(result).toBeFalsy();

    mkdirSpy.mockRestore();
  });

    test('should return false if file could not be created', () => {
      const saveFile = new SaveFile();
      const writeFileSpy = jest
        .spyOn(fs, 'writeFileSync')
        .mockImplementation(() => {
          throw new Error('This is a custom error message from testing');
        });
      const result = saveFile.execute(customOptions);
      expect(result).toBeFalsy();

      writeFileSpy.mockRestore();
    });
});
