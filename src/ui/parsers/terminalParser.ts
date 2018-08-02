import {BaseParser} from './baseParser';
import {interpretCommand, TerminalCommand} from './commandInterpreter';

export enum Mode {
    DEFAULT
}

export interface TerminalResponse {
    message?: string;
    mode: Mode;
}

export class TerminalParser implements BaseParser<string, TerminalResponse> {
    public getResponse(command: string): TerminalResponse {
        let terminalCommand: TerminalCommand = interpretCommand(command);
        const mode: Mode = this.getTerminalMode(terminalCommand.command);
        const message: string = this.getTerminalMessage(terminalCommand.command);
        return {message, mode};
    }

    private getTerminalMessage(value: string): string {
        switch (value) {
            case null: return '';
            default: return `${value}: command not found`;
        }
    }

    private getTerminalMode(value: string): Mode {
        switch (value) {
            default: return Mode.DEFAULT;
        }
    }
}
