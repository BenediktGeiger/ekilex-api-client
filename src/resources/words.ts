import { RequestParams, HttpClient } from '../http/http-client';
import { DatasetCode } from './datasets';
import { Method } from '../http/http-client';

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
	usages: {
		id: number;
		value: string;
		lang: string;
		[key: string]: any;
	}[];
	lexemeFreeforms: unknown[];
	lexemeNoteLangGroups: unknown[];
	lexemeRelations: unknown[];
	collocationPosGroups: unknown[];
	secondaryCollocations: unknown[];
	sourceLinks: unknown[];
	meaning: {
		definitions: {
			id: number;
			value: string;
			lang: string;
			[key: string]: any;
		}[];
	};
	meaningWords: unknown | null;
	synonymLangGroups: {
		lang: string;
		synonyms: {
			words: {
				wordId: number;
				wordValue: string;
				wordValuePrese: string;
			}[];
		}[];
		[key: string]: any;
	}[];
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

export type WordCreateResponse = {
	success: boolean;
	messsage: string;
	id: number;
};

export type WordCreateDto = {
	lexemeDataset: DatasetCode;
	meaningId?: number;
	value: string;
	valuePrese: string;
	lang: string;
	displayMorphCode: string;
	genderCode: string;
	aspectCode: string;
	vocalForm: string;
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

	private getWordCreatePath(wordCreateDto: WordCreateDto) {
		const dataset = encodeURIComponent(wordCreateDto.lexemeDataset);

		return `word/create?crudRoleDataset=${dataset}`;
	}

	search(searchTerm: string, datasets: Array<DatasetCode> = []): Promise<WordSearchResponse> {
		const request: RequestParams = {
			method: Method.Get,
			path: this.getSearchPath(searchTerm, datasets),
		};

		return this.httpClient.request(request);
	}

	getDetails(wordId: number, datasets: Array<DatasetCode> = []): Promise<WordDetailsResponse> {
		const request: RequestParams = {
			method: Method.Get,
			path: this.getWordDetailsPath(wordId, datasets),
		};

		return this.httpClient.request(request);
	}

	create(payload: WordCreateDto): Promise<WordCreateResponse> {
		// TODO alidate and sanitize payload
		const request: RequestParams = {
			method: Method.Post,
			path: this.getWordCreatePath(payload),
			data: payload,
		};
		return this.httpClient.request(request);
	}
}
