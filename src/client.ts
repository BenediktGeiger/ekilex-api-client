import { HttpClient } from './http/http-client';
import { Endpoints } from './resources/endpoints';
import { Words } from './resources/words';
import { Datasets } from './resources/datasets';
import { Classifiers } from './resources/classifiers';
import { Domains } from './resources/domains';
import { Paradigms } from './resources/paradigms';
import { Meanings } from './resources/meanings';
import { Sources } from './resources/sources';
import { PublicWords } from './resources/public-words';
export interface ConfigParams {
	apiKey?: string;
	environment?: 'test' | 'prod';
}

const basePaths = {
	test: 'https://ekitest.tripledev.ee/ekilex/api/',
	prod: 'https://ekilex.ee/api/',
};

function isConfigValid(config: ConfigParams): config is Required<ConfigParams> {
	const regex = /^[0-9a-fA-F]{32}$/;
	const isValidApiKey = regex.test(String(config.apiKey));

	const isValidTestEnvironment = ['test', 'prod', undefined].includes(config.environment);

	return isValidApiKey && isValidTestEnvironment;
}

export class EkilexClient {
	public config: ConfigParams;
	private httpClient: HttpClient;

	protected _endpoints: Endpoints | undefined;
	protected _words: Words | undefined;
	protected _datasets: Datasets | undefined;
	protected _classifiers: Classifiers | undefined;
	protected _domains: Domains | undefined;
	protected _paradigms: Paradigms | undefined;
	protected _meanings: Meanings | undefined;
	protected _sources: Sources | undefined;
	protected _publicWords: PublicWords | undefined;

	constructor(config: ConfigParams) {
		if (!isConfigValid(config)) {
			throw new Error('Invalid config');
		}
		this.config = config;

		const basePath = this.config.environment ? basePaths[this.config.environment] : basePaths.prod;

		this.httpClient = new HttpClient(config.apiKey, basePath);
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

	get paradigms() {
		if (!this._paradigms) {
			this._paradigms = new Paradigms(this.httpClient);
		}
		return this._paradigms;
	}

	get meanings() {
		if (!this._meanings) {
			this._meanings = new Meanings(this.httpClient);
		}
		return this._meanings;
	}

	get sources() {
		if (!this._sources) {
			this._sources = new Sources(this.httpClient);
		}
		return this._sources;
	}
	get publiWords() {
		if (!this._publicWords) {
			this._publicWords = new PublicWords(this.httpClient);
		}
		return this._publicWords;
	}
}
