import fetch from 'node-fetch';
import { MarkRequired } from './types';

export interface Headers {
	[key: string]: string;
}

export interface NormalizedRequest {
	method: string;
	url: string;
	headers: Headers;
	body?: { [key: string]: unknown };
}

export enum DataType {
	JSON = 'application/json',
	GraphQL = 'application/graphql',
	URLEncoded = 'application/x-www-form-urlencoded',
	Binary = 'application/octet-stream',
}

export enum Method {
	Get = 'GET',
	Post = 'POST',
	Put = 'PUT',
	Patch = 'PATCH',
	Delete = 'DELETE',
	Head = 'HEAD',
	Options = 'OPTIONS',
	Connect = 'CONNECT',
}

export type QueryParams = string | number | string[] | number[] | { [key: string]: QueryParams };

export interface RequestParams {
	method: Method;
	path: string;
	data?: { [key: string]: unknown } | string;
	query?: { [key: string]: QueryParams };
	headers?: Headers;
	retries?: number;
}

export class HttpClient {
	private apiKey: string;
	private basePath: string;

	static readonly RETRY_WAIT_TIME = 1000;

	constructor(apiKey: string, basePath: string) {
		this.apiKey = apiKey;
		this.basePath = basePath;
	}

	private async doRequest(requestParams: MarkRequired<RequestParams, 'headers'>) {
		const url = this.basePath + requestParams.path;

		const response = await fetch(url, {
			method: requestParams.method,
			headers: requestParams.headers,
			...(Boolean(requestParams.data) && { body: JSON.stringify(requestParams.data) }),
		});

		if (!response?.ok) {
			throw new Error('Unable to reach Ekilex-Api');
		}

		return response.json();
	}

	private async sleep(waitTimeinMs: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, waitTimeinMs));
	}

	async request(requestParams: RequestParams) {
		const maxRetries = requestParams.retries ?? 1;

		const enrichedHeaders: Headers = {
			...requestParams.headers,
			'ekilex-api-key': this.apiKey,
			...([Method.Post, Method.Patch, Method.Put].includes(requestParams.method) && {
				'Content-Type': DataType.JSON,
			}),
		};
		let retries = 0;
		while (retries < maxRetries) {
			retries++;

			try {
				const response = this.doRequest({
					...requestParams,
					headers: enrichedHeaders,
				});

				return response;
			} catch (error) {
				if (retries < maxRetries) {
					await this.sleep(HttpClient.RETRY_WAIT_TIME);
					continue;
				}

				throw new Error('Cannot make request to Ekilex APi');
			}
		}
	}
}
