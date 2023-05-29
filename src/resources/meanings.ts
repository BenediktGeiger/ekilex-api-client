import { HttpClient } from '../http/http-client';
import { RequestParams } from '../http/http-client';
import { DatasetCode } from './datasets';

export type MeaningWord = {
	wordId: number;
	wordValue: string;
	wordValuePrese: string;
	homonymNr: number;
	lang: string;
	wordTypeCodes: null | unknown;
	prefixoid: boolean;
	suffixoid: boolean;
	foreign: boolean;
	matchingWord: boolean;
	mostPreferred: boolean;
	leastPreferred: boolean;
	datasetCodes: string[];
	public: boolean;
};

export type Meaning = {
	meaningId: number;
	meaningDomains: null | unknown;
	meaningWords: MeaningWord[];
	meaningWordsExist: boolean;
};

export type MeaningSearchResponse = {
	meaningCount: number;
	wordCount: number;
	resultCount: number;
	results: Meaning[];
	resultExist: boolean;
	resultDownloadNow: boolean;
	resultDownloadLater: boolean;
};

export type LangGroup = {
	lang: string;
	selected: boolean;
	definitions: Array<{
		id: number;
		value: string;
		lang: string;
		complexity: string;
		orderBy: 62504;
		typeCode: string;
		typeValue: string;
		datasetCodes: string[];
		notes: unknown[];
		sourceLinks: unknown[];
		editDisabled: boolean;
		public: boolean;
	}>;
};

export type Freeform = {
	id: number;
	parentId: number | null;
	type: string;
	valueText: string;
	valuePrese: string;
	valueDate: string | null;
	lang: string | null;
	complexity: unknown | null;
	orderBy: unknown | null;
	children: unknown[];
	modifiedBy: unknown | null;
	modifiedOn: unknown | null;
	public: unknown | null;
};

export type MeaningDetailsResponse = {
	meaningId: number;
	lexemeIds: number[];
	definitions: unknown | null;
	definitionLangGroups: LangGroup[];
	lexemes: unknown | null;
	// TODO add lexemeLangGroups:
	lexemeDatasetCodes: string[];
	firstWordValue: string;
	// TODO add domains:
	semanticTypes: Array<{
		name: string;
		code: string;
		value: string;
	}>;
	freeforms: Freeform[];
	learnerComments: string;
	images: unknown[];
	medias: unknown[];
	forums: unknown[];
	noteLangGroups: unknown[];
	// TODO add relations:
	// TODO add viewRelations:
	synonymLangGroups: unknown | null;
	tags: unknown[];
	activeTagComplete: boolean;
	lastActivityEventOn: string | null;
	lastApproveEventOn: string | null;
	manualEventOn: string | null;
};

export class Meanings {
	private httpClient: HttpClient;

	constructor(httpClient: HttpClient) {
		this.httpClient = httpClient;
	}

	private getSearchPath(searchTerm: string, datasets: DatasetCode[]) {
		const sanitizedSearchTerm = encodeURIComponent(searchTerm);

		const path = `meaning/search/${sanitizedSearchTerm}`;

		const uniqueDatasetList = Array.from(new Set(datasets));

		if (!uniqueDatasetList.length) {
			return path;
		}

		return `${path}/${uniqueDatasetList.join(',')}`;
	}

	private getMeaningDetailsPath(wordId: number, datasets: DatasetCode[]) {
		const sanitizedWordId = encodeURIComponent(wordId);

		const path = `meaning/details/${sanitizedWordId}`;

		const uniqueDatasetList = Array.from(new Set(datasets));

		if (!uniqueDatasetList.length) {
			return path;
		}

		return `${path}/${uniqueDatasetList.join(',')}`;
	}

	search(searchTerm: string, datasets: Array<DatasetCode> = []): Promise<MeaningSearchResponse> {
		const request: RequestParams = {
			method: 'GET',
			path: this.getSearchPath(searchTerm, datasets),
		};

		return this.httpClient.request(request);
	}

	getDetails(wordId: number, datasets: Array<DatasetCode> = []): Promise<MeaningDetailsResponse> {
		const request: RequestParams = {
			method: 'GET',
			path: this.getMeaningDetailsPath(wordId, datasets),
		};

		return this.httpClient.request(request);
	}
}
