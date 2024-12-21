export interface ITableHandler {
	create(): Promise<void>;
	delete(): Promise<void>;
}
