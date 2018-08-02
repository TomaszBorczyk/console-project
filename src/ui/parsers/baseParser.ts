export interface BaseParser<T, K> {
    getResponse: (input: T) => K;
}
