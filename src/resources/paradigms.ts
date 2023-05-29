import { HttpClient } from '../http/http-client';
import { RequestParams } from '../http/http-client';

export type Form = {
	id: number;
	paradigmId: number;
	morphGroup1: string;
	morphGroup2: null;
	morphGroup3: null;
	displayLevel: number;
	morphCode: string;
	morphExists: boolean;
	value: string;
	valuePrese: string;
	components: string[];
	displayForm: string;
	audioFile: string;
	orderBy: number;
	questionable: boolean;
};

export type ParadigmDetails = {
	id: number;
	wordId: number;
	wordClass: string;
	comment: string | null;
	inflectionTypeNr: string;
	inflectionType: string;
	secondary: boolean;
	forms: Form[];
};

export class Paradigms {
	private httpClient: HttpClient;

	constructor(httpClient: HttpClient) {
		this.httpClient = httpClient;
	}

	getDetails(wordId: number): Promise<ParadigmDetails[]> {
		const sanitizedWordId = encodeURIComponent(wordId);

		const request: RequestParams = {
			method: 'GET',
			path: `paradigm/details/${sanitizedWordId}`,
		};

		return this.httpClient.request(request);
	}
}
