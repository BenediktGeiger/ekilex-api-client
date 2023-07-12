import { HttpClient } from '../http/http-client';
import { RequestParams } from '../http/http-client';
import { Method } from '../http/http-client';

export type SourceProperty = {
	sourceId: number | null;
	id: number;
	type: string;
	valueText: string;
	valueDate: string | null;
};

export type SourceSearchResponse = {
	id: number;
	type: string;
	sourceNames: string[];
	sourceProperties: SourceProperty[];
};

export class Sources {
	private httpClient: HttpClient;

	constructor(httpClient: HttpClient) {
		this.httpClient = httpClient;
	}

	private getSearchPath(searchTerm: string) {
		const sanitizedSearchTerm = encodeURIComponent(searchTerm);

		return `source/search/${sanitizedSearchTerm}`;
	}

	search(searchTerm: string): Promise<SourceSearchResponse[]> {
		const request: RequestParams = {
			method: Method.Get,
			path: this.getSearchPath(searchTerm),
		};

		return this.httpClient.request(request);
	}
}
