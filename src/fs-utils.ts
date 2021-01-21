import path from 'path';
import fs from 'graceful-fs';
import { WriteFileOptions } from 'fs';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import nodeFsUtils from 'nodejs-fs-utils';

export function outputFileSync(
  file: string,
  data: string | NodeJS.ArrayBufferView,
  options?: WriteFileOptions,
): void {
  const dir = path.dirname(file);

  // 如果目录不存在则创建之
  if (!fs.existsSync(dir)) {
    nodeFsUtils.mkdirsSync(dir);
  }

  fs.writeFileSync(file, data, options);
}

export function removeSync(dir: string): void {
  return nodeFsUtils.removeSync(dir);
}
