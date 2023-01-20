import {TerminalCommand} from '../../parsers/parseCommand';

export abstract class BaseApp {
    protected _name: string;
    public abstract execute(command: TerminalCommand): string;

    public get name(): string {
        return this._name;
    }
}
