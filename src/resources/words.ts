import { HttpClient } from '../http/http-client';
import { RequestParams } from '../http/http-client';
import { Datasets } from '../types/datasets';

export type Word = {
	wordId: number;
	wordValue: string;
	wordValuePrese: string;
	homonymNr: number;
	lang: string;
	prefixoid: boolean;
	suffixoid: boolean;
	foreign: boolean;
	datasetCodes: Datasets[];
	lastActivityEventOn: string;
};

export type Forms = {
	id: number;
	value: string;
	valuePrese: string;
	components: string[];
	displayForm: string;
	morphCode: string;
	morphValue: string; // TODO make conditional type out of all ainsuse nimetav, etc..
	morphFrequency: null | number; // TODO check second valuie
	formFrequency: null | number; // TODO check second value
};

export type Paradigm = {
	paradigmId: number;
	comment: string | null;
	inflectionType: string;
	inflectionTypeNr: string;
	wordClass: string;
	forms: Forms[];
	formsExist: boolean;
};

export type WordSearchResponse = {
	totalCount: number;
	words: Word[];
};

export type WordDetailsResponse = {
	word: Word & { morphophonoForm: string; lexemesTagNames: string[]; manualEventOn: string };
	wordTypes: string[]; // TODO check
	paradigms: Paradigm[];
	// lexemes: //TODO add
	// wordEtymology: // TODO add
	// odWordRecommendations: // TODO add
	// wordRelationDetails: // TODO add
	firstDefinitionValue: string | null;
	activeTagComplete: boolean;
};

export class Words {
	private httpClient: HttpClient;

	constructor(httpClient: HttpClient) {
		this.httpClient = httpClient;
	}

	private getSearchPath(searchTerm: string, datasets: Datasets[]) {
		const sanitizedSearchTerm = encodeURIComponent(searchTerm);

		const path = `word/search/${sanitizedSearchTerm}`;

		const uniqueDatasetList = Array.from(new Set(datasets));

		if (!uniqueDatasetList.length) {
			return path;
		}

		return `${path}/${uniqueDatasetList.join(',')}`;
	}

	private getWordDetailsPath(wordId: number, datasets: Datasets[]) {
		const sanitizedWordId = encodeURIComponent(wordId);

		const path = `word/details/${sanitizedWordId}`;

		const uniqueDatasetList = Array.from(new Set(datasets));

		if (!uniqueDatasetList.length) {
			return path;
		}

		return `${path}/${uniqueDatasetList.join(',')}`;
	}

	search(searchTerm: string, datasets: Array<Datasets> = []): Promise<WordSearchResponse> {
		const request: RequestParams = {
			method: 'GET',
			path: this.getSearchPath(searchTerm, datasets),
		};

		return this.httpClient.request(request);
	}

	getDetails(wordId: number, datasets: Array<Datasets> = []): Promise<WordDetailsResponse> {
		const request: RequestParams = {
			method: 'GET',
			path: this.getWordDetailsPath(wordId, datasets),
		};

		return this.httpClient.request(request);
	}
}
