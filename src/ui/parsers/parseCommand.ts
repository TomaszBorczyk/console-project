export interface TerminalCommand {
    command: string;
    options?: Array<string>;
}

export function parseCommand(command: string): TerminalCommand {
    let commandParts: Array<string> = command.match(/\S+/g) || [];
    if (commandParts.length !== 0) {
        return {
            command: commandParts[0],
            options: commandParts.slice(1)
        };
    } else {
        return {command: null};
    }
}
