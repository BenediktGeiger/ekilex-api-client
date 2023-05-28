import { HttpClient } from '../http/http-client';
import { RequestParams } from '../http/http-client';
import { DatasetCode } from './datasets';

export type Word = {
	wordId: number;
	wordValue: string;
	wordValuePrese: string;
	homonymNr: number;
	lang: string;
	prefixoid: boolean;
	suffixoid: boolean;
	foreign: boolean;
	datasetCodes: DatasetCode[];
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

export type Lexeme = {
	wordId: number;
	wordValue: string;
	wordValuePrese: string;
	wordLang: string;
	wordHomonymNr: number;
	wordGenderCode: number | string | null;
	wordAspectCode: number | string | null;
	wordDisplayMorphCode: number | string | null;
	wordTypeCodes: number | string | null;
	prefixoid: boolean;
	suffixoid: boolean;
	foreign: boolean;
	lexemeId: number;
	meaningId: number;
	datasetName: string;
	datasetCode: DatasetCode;
	level1: number;
	level2: number;
	levels: string;
	lexemeValueStateCode: number | string | null;
	lexemeValueState: number | string | null;
	lexemeProficiencyLevelCode: number | string | null;
	lexemeProficiencyLevel: number | string | null;
	reliability: number | string | null;
	tags: string[];
	complexity: string;
	weight: number;
	wordTypes: number | string | null;
	pos: number | string | null;
	derivs: number | string | null;
	registers: number | string | null;
	governments: unknown[];
	grammars: unknown[];
	usages: unknown[];
	lexemeFreeforms: unknown[];
	lexemeNoteLangGroups: unknown[];
	lexemeRelations: unknown[];
	collocationPosGroups: unknown[];
	secondaryCollocations: unknown[];
	sourceLinks: unknown[];
	meaning: unknown;
	meaningWords: unknown | null;
	synonymLangGroups: unknown[];
	lexemeOrMeaningClassifiersExist: boolean;
	public: boolean;
};

export type WordSearchResponse = {
	totalCount: number;
	words: Word[];
};

export type WordDetailsResponse = {
	word: Word & { morphophonoForm: string; lexemesTagNames: string[]; manualEventOn: string };
	wordTypes: string[]; // TODO check
	paradigms: Paradigm[];

	lexemes: Lexeme[];
	wordEtymology: unknown[];
	odWordRecommendations: unknown[];
	wordRelationDetails: unknown;
	firstDefinitionValue: string | null;
	activeTagComplete: boolean;
};

export class Words {
	private httpClient: HttpClient;

	constructor(httpClient: HttpClient) {
		this.httpClient = httpClient;
	}

	private getSearchPath(searchTerm: string, datasets: DatasetCode[]) {
		const sanitizedSearchTerm = encodeURIComponent(searchTerm);

		const path = `word/search/${sanitizedSearchTerm}`;

		const uniqueDatasetList = Array.from(new Set(datasets));

		if (!uniqueDatasetList.length) {
			return path;
		}

		return `${path}/${uniqueDatasetList.join(',')}`;
	}

	private getWordDetailsPath(wordId: number, datasets: DatasetCode[]) {
		const sanitizedWordId = encodeURIComponent(wordId);

		const path = `word/details/${sanitizedWordId}`;

		const uniqueDatasetList = Array.from(new Set(datasets));

		if (!uniqueDatasetList.length) {
			return path;
		}

		return `${path}/${uniqueDatasetList.join(',')}`;
	}

	search(searchTerm: string, datasets: Array<DatasetCode> = []): Promise<WordSearchResponse> {
		const request: RequestParams = {
			method: 'GET',
			path: this.getSearchPath(searchTerm, datasets),
		};

		return this.httpClient.request(request);
	}

	getDetails(wordId: number, datasets: Array<DatasetCode> = []): Promise<WordDetailsResponse> {
		const request: RequestParams = {
			method: 'GET',
			path: this.getWordDetailsPath(wordId, datasets),
		};

		return this.httpClient.request(request);
	}
}
