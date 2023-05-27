require('module-alias/register');

import { Endpoints } from './resources/endpoints';

export interface ConfigParams {
	apiKey?: string;
}

function isConfigValid(config: ConfigParams): boolean {
	const regex = /^[0-9a-fA-F]{32}$/;

	return regex.test(String(config.apiKey));
}

export class EkilexClient {
	public config: ConfigParams;

	protected _endpoints: Endpoints | undefined;

	constructor(config: ConfigParams = {}) {
		if (!isConfigValid(config)) {
			throw new Error('Invalid config, API-Key is missing');
		}
		this.config = config;
		this.init();
	}

	private init() {
		this._endpoints = undefined;
	}

	get endpoints() {
		if (!this._endpoints) {
			this._endpoints = new Endpoints(this.config);
		}
		return this._endpoints;
	}
}

// @vanakaru/ekilex-api-client
