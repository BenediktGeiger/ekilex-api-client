export class Endpoints {
	private config: any;
	private httpClient: any;

	constructor(config: any) {
		this.config = config;
		this.httpClient = {};
	}

	getAll(requestConfig: any) {
		return [
			{
				requestMethod: 'GET',
				uriPatterns: ['/api/endpoints'],
			},
			{
				requestMethod: 'GET',
				uriPatterns: ['/api/word/search/{word}', '/api/word/search/{word}/{datasets}'],
				pathVariables: ['word::java.lang.String', 'datasets::java.lang.String'],
			},
		];
	}
}
