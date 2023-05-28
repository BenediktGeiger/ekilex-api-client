import { Endpoints } from './resources/endpoints';
import { Words } from './resources/words';
import { Datasets } from './resources/datasets';
import { Classifiers } from './resources/classifiers';
import { Domains } from './resources/domains';
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
	protected _words: Words | undefined;
	protected _datasets: Datasets | undefined;
	protected _classifiers: Classifiers | undefined;
	protected _domains: Domains | undefined;

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

	get words() {
		if (!this._words) {
			this._words = new Words(this.httpClient);
		}
		return this._words;
	}

	get datasets() {
		if (!this._datasets) {
			this._datasets = new Datasets(this.httpClient);
		}
		return this._datasets;
	}

	get classifiers() {
		if (!this._classifiers) {
			this._classifiers = new Classifiers(this.httpClient);
		}
		return this._classifiers;
	}

	get domains() {
		if (!this._domains) {
			this._domains = new Domains(this.httpClient);
		}
		return this._domains;
	}
}
