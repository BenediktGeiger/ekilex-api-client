import fetch from 'node-fetch';

export interface Headers {
	[key: string]: string | string[];
}

export interface NormalizedRequest {
	method: string;
	url: string;
	headers: Headers;
	body?: string;
}

export function flatHeaders(headers: Headers): [string, string][] {
	return Object.entries(headers).flatMap(([header, values]) =>
		Array.isArray(values) ? values.map((value): [string, string] => [header, value]) : [[header, values]]
	);
}

export type QueryParams = string | number | string[] | number[] | { [key: string]: QueryParams };

export interface RequestParams {
	method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
	path: string;
	data?: { [key: string]: unknown } | string;
	query?: { [key: string]: QueryParams };
	extraHeaders?: Headers;
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

	private async doRequest(request: NormalizedRequest) {
		const response = await fetch(request.url, {
			method: request.method,
			headers: flatHeaders(request.headers),
			body: request.body,
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

		const url = this.basePath + requestParams.path;

		if (requestParams.method === 'POST') {
			// TODO prepare body
		}

		const headers = {
			...requestParams.extraHeaders,
			'ekilex-api-key': this.apiKey,
		};
		let retries = 0;
		while (retries < maxRetries) {
			retries++;

			try {
				const response = this.doRequest({
					method: requestParams.method,
					url,
					headers,
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
