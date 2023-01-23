import {TerminalCommand} from '../../parsers/parseCommand';

export abstract class BaseApp {
    protected _name: string;
    protected _description: string;

    public abstract execute(command: TerminalCommand): string;

    public get name(): string {
        return this._name;
    }

    public get description(): string {
        return this._description;
    }

    protected getErrorMessage(content: string): string {
        return `${this.name}: ${content}`;
    }
}
