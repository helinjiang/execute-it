import {exec, ExecOptions, ChildProcess} from 'child_process';

export function runByExec(
  command: string,
  options: {cmd?: string} & ExecOptions,
): Promise<ChildProcess> {
  // export function runByExec(command: string, options?: any) {
  // console.log('[runByExec] command, options', command, options);

  return new Promise((resolve, reject) => {
    // https://nodejs.org/dist/latest-v10.x/docs/api/child_process.html#child_process_child_process_exec_command_options_callback
    const cmd = exec(command, options, function (err, stdout, stderr) {
      // 此回调触发时，同时也会触发 close 事件

      // 有些情况下err为null，但是存在 stderr ，也意味着出现错误
      // 因为jest每行都打印在stderr上，所以去掉对这个的判定
      // if (err || stderr) {
      //     reject(stderr);
      //     return;
      // }

      resolve(cmd);
    });

    cmd?.stdout?.on('data', data => {
      console.log(`${data}`);
    });

    cmd?.stderr?.on('data', data => {
      console.error(`${data}`);
    });
  });
}
