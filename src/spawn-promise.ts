import { spawn, SpawnOptions } from 'node:child_process';
import { Stream } from 'node:stream';

interface SpawnOptionsPromise extends SpawnOptions {
    encoding?: string
}

export default function (cmd: string, args: string[], opts: SpawnOptionsPromise, input: string) {
    return new Promise((resolve, reject) => {
        let stdout: any = []
        let stderr: any = []
        const options = Object.assign({}, opts)

        // ensure no override
        if (options.stdio) {
            delete options.stdio
        }

        const child = spawn(cmd, args, options)

        child.on('error', err => reject(new SpawnError(1, err)))
        /* istanbul ignore next */
        child.stdout?.on('error', err => reject(new SpawnError(1, err)))
        /* istanbul ignore next */
        child.stderr?.on('error', err => reject(new SpawnError(1, err)))
        /* istanbul ignore next */
        child.stdin?.on('error', err => reject(new SpawnError(1, err)))

        child.stdout?.on('data', data => stdout.push(data))
        child.stderr?.on('data', data => stderr.push(data))

        child.stdin?.end(input)

        child.on('close', code => {
            /* istanbul ignore next */
            stdout = [undefined, 'buffer'].indexOf(options.encoding) > -1 ? Buffer.concat(stdout) : stdout.join('').trim()
            /* istanbul ignore next */
            stderr = [undefined, 'buffer'].indexOf(options.encoding) > -1 ? Buffer.concat(stderr) : stderr.join('').trim()

            if (code === 0) {
                return resolve({ stdout, stderr })
            }

            const error = new SpawnError(code, `command exited with code: ${code}`, stdout, stderr)

            // emulate actual Child Process Errors
            error.path = cmd
            error.syscall = 'spawn ' + cmd
            error.spawnargs = args

            return reject(error)
        })
    })
}

export class SpawnError extends Error {
    code: number;
    stdout: Stream | Buffer;
    stderr: Stream | Buffer;
    path: string | undefined;
    syscall: string | undefined;
    spawnargs: string[] | undefined;
    // constructor(message, options) {
    //     super(message, options);
    constructor(code: number | null, message: undefined | string | Error, stdout?: Stream, stderr?: Stream) {
        super(message?.toString())
        /* istanbul ignore next */
        this.code = code || 1
        this.stdout = stdout || Buffer.from('')
        this.stderr = stderr || Buffer.from('')
    }
}