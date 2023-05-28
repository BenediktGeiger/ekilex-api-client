import { HttpClient } from '../http/http-client';
import { RequestParams } from '../http/http-client';

export type Classifier = {
	name: string;
	code: string;
	value: string;
};

export type ClassifierName =
	| 'LABEL_TYPE'
	| 'LANGUAGE'
	| 'DOMAIN'
	| 'GOVERNMENT_TYPE'
	| 'REGISTER'
	| 'FREQUENCY_GROUP'
	| 'GENDER'
	| 'POS'
	| 'MORPH'
	| 'DERIV'
	| 'WORD_TYPE'
	| 'ETYMOLOGY_TYPE'
	| 'MEANING_REL_TYPE'
	| 'LEX_REL_TYPE'
	| 'WORD_REL_TYPE'
	| 'FORM_REL_TYPE'
	| 'DISPLAY_MORPH'
	| 'PROCESS_STATE'
	| 'USAGE_AUTHOR_TYPE'
	| 'USAGE_TYPE'
	| 'VALUE_STATE'
	| 'POS_GROUP'
	| 'ASPECT'
	| 'DEFINITION_TYPE'
	| 'REGION'
	| 'SEMANTIC_TYPE';

export class Classifiers {
	private httpClient: HttpClient;

	constructor(httpClient: HttpClient) {
		this.httpClient = httpClient;
	}

	get(classifierName: ClassifierName): Promise<Classifier[]> {
		const sanitizedClassifierName = encodeURIComponent(classifierName);
		const request: RequestParams = {
			method: 'GET',
			path: `classifiers/${sanitizedClassifierName}`,
		};

		return this.httpClient.request(request);
	}
}
