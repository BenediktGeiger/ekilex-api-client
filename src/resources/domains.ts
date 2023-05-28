import { HttpClient } from '../http/http-client';
import { RequestParams } from '../http/http-client';

export type DomainOrigin = {
	code: string;
	label: string;
};

export type Domain = {
	name: string;
	origin: string;
	code: string;
	value: string;
};

export class Domains {
	private httpClient: HttpClient;

	constructor(httpClient: HttpClient) {
		this.httpClient = httpClient;
	}

	getOrigins(): Promise<Domain[]> {
		const request: RequestParams = {
			method: 'GET',
			path: 'domainorigins',
		};

		return this.httpClient.request(request);
	}

	get(domainCode: string): Promise<Domain[]> {
		const sanitizedDomainCode = encodeURIComponent(domainCode);
		const request: RequestParams = {
			method: 'GET',
			path: `domains/${sanitizedDomainCode}`,
		};

		return this.httpClient.request(request);
	}
}
