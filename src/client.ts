import { Endpoints } from './resources/endpoints';
import { HttpClient } from './http/http-client';
export interface ConfigParams {
	apiKey?: string;
}

function isConfigValid(config: ConfigParams): config is Required<ConfigParams> {
	const regex = /^[0-9a-fA-F]{32}$/;

	return regex.test(String(config.apiKey));
}

export class EkilexClient {
	public config: ConfigParams;
	private httpClient: HttpClient;

	protected _endpoints: Endpoints | undefined;

	constructor(config: ConfigParams) {
		if (!isConfigValid(config)) {
			throw new Error('Invalid config, API-Key is missing');
		}
		this.config = config;
		this.httpClient = new HttpClient(config.apiKey, 'https://ekilex.ee/api/');
		this.init();
	}

	private init() {
		this._endpoints = undefined;
	}

	get endpoints() {
		if (!this._endpoints) {
			this._endpoints = new Endpoints(this.httpClient);
		}
		return this._endpoints;
	}
}
