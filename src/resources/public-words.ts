import { HttpClient } from '../http/http-client';
import { RequestParams } from '../http/http-client';
import { DatasetCode } from './datasets';

export type PublicWord = {
	wordId: number;
	value: string;
	lang: string;
	morphExists: boolean;
};

export class PublicWords {
	private httpClient: HttpClient;

	constructor(httpClient: HttpClient) {
		this.httpClient = httpClient;
	}

	private getPublicWordPath(datasetCode: DatasetCode) {
		const sanitizedDataSetCode = encodeURIComponent(datasetCode);

		return `public_word/${sanitizedDataSetCode}`;
	}

	getAll(datasetCode: DatasetCode): Promise<PublicWord[]> {
		const request: RequestParams = {
			method: 'GET',
			path: this.getPublicWordPath(datasetCode),
		};

		return this.httpClient.request(request);
	}
}
