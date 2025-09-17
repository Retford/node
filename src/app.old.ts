import fs from 'fs';
import { yarg } from './configs/plugin/args.plugin';

(async () => {
  await main();
})();

async function main() {
  const { b: base, l: limit, s: show } = yarg;
  let outputMessage = '';
  const headerMessage = `
=======================================
    Tabla del ${base}
=======================================`;

  for (let i = 1; i <= limit; i++) {
    const result = base * i;
    outputMessage += `${base} x ${i} = ${result}\n`;
  }

  outputMessage = headerMessage + '\n' + '\n' + outputMessage;

  const output = 'outputs';
  fs.mkdirSync(output, { recursive: true });

  fs.writeFileSync(`${output}/tabla-${base}.txt`, outputMessage);

  if (show) {
    console.log(outputMessage);

    console.log('ended');
  } else {
    console.log('ended');
  }
}
