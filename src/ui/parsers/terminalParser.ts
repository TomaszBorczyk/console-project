import {BaseParser} from './baseParser';
import {interpretCommand, TerminalCommand} from './commandInterpreter';

export enum Mode {
    DEFAULT
}

export interface TerminalResponse {
    mode: Mode;
    command: TerminalCommand;
    message?: string;
}

export class TerminalParser implements BaseParser<string, TerminalResponse> {
    public getResponse(command: string): TerminalResponse {
        let terminalCommand: TerminalCommand = interpretCommand(command);
        const mode: Mode = this.getTerminalMode(terminalCommand.command);
        const message: string = this.getTerminalMessage(terminalCommand);
        return {
            mode: mode,
            command: terminalCommand,
            message: message
        };
    }

    private getTerminalMessage(command: TerminalCommand): string {
        switch (command.command) {
            case 'ls': return null;
            case 'cd': return null;
            case null: return null;
            default: return `${command.command}: command not found`;
        }
    }

    private getTerminalMode(value: string): Mode {
        switch (value) {
            default: return Mode.DEFAULT;
        }
    }
}
