import { HttpClient } from '../http/http-client';
import { RequestParams } from '../http/http-client';
import { Method } from '../http/http-client';

export type EndpointsReturnType = {
	requestMethod: string;
	uriPatterns: Array<string>;
};
export class Endpoints {
	private httpClient: HttpClient;

	constructor(httpClient: HttpClient) {
		this.httpClient = httpClient;
	}

	getAll(): Promise<EndpointsReturnType[]> {
		const request: RequestParams = {
			method: Method.Get,
			path: 'endpoints',
		};

		return this.httpClient.request(request);
	}
}
