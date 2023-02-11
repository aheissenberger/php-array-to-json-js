import spawn from './spawn-promise'

export default async function phparray2json(phparray: string, phpExecPath?: string) {
    const phpCode = '<?php echo json_encode(' + phparray + ');'
    const result: any = await spawn(phpExecPath ? phpExecPath : 'php', [], {}, phpCode);
    return result?.stdout?.toString() ?? ''
}