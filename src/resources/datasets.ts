import { HttpClient } from '../http/http-client';
import { RequestParams } from '../http/http-client';
import { Method } from '../http/http-client';

export type DatasetCode =
	| 'vkk-amet'
	| 'ait'
	| 'avt'
	| 'aso'
	| 'arh'
	| 'aos'
	| 'EELBÜTK'
	| 'bks'
	| 'bot'
	| 'ett'
	| 'mab'
	| 'õtb'
	| 'spaa'
	| 'tot'
	| 'evkit'
	| 'vkm'
	| 'ehpr'
	| 'est'
	| 'eki'
	| 'est_test'
	| 'elteh'
	| 'ent'
	| 'eko'
	| 'ety'
	| 'cefr'
	| 'eõt'
	| 'fkm'
	| 'fil'
	| 'usk'
	| 'fon'
	| 'gal'
	| 'get'
	| 'gmt'
	| 'GER'
	| 'den'
	| 'hym'
	| 'ida'
	| 'iht_200915'
	| 'imm'
	| 'ing'
	| 'kce'
	| 'kas'
	| 'kem'
	| 'kkt'
	| 'kok'
	| 'eiops'
	| 'kool_KV'
	| 'kth'
	| 'kjtb'
	| 'xxx'
	| 'LoB'
	| 'kfs'
	| 'lim'
	| 'linguae'
	| 'lkt'
	| 'lon'
	| 'pre'
	| 'lpr'
	| 'lko'
	| 'les'
	| 'mef'
	| 'mes'
	| 'met'
	| 'mtkl'
	| 'mea'
	| 'mil'
	| 'mon'
	| 'mut'
	| 'mte'
	| 'nht'
	| 'nfs'
	| 'neen'
	| 'nmus'
	| 'oos'
	| 'org'
	| 'p3m_vana'
	| 'prs'
	| 'pot'
	| 'pol'
	| 'p3m'
	| 'pur'
	| 'plt'
	| 'rara'
	| 'rtrv'
	| 'rkb'
	| 'rts'
	| 'rob'
	| 'plan'
	| 'sem'
	| 'sarh'
	| 'sisek'
	| 'skt'
	| 'sup'
	| 'TLV'
	| 'tet'
	| 'TH'
	| 'tee'
	| 'tt'
	| 'teks'
	| 'vrk'
	| 'terv'
	| 'to'
	| 'ttt'
	| 'tts'
	| 'glu'
	| 'tur'
	| 'nuk'
	| 'tnpF'
	| 'ust'
	| 'usu'
	| 'default'
	| 'vke'
	| 'vlk'
	| 'vibu'
	| 'ÕTERM';

export type Dataset = {
	code: DatasetCode;
	type: 'TERM' | 'LEX' | 'NONE';
	name: string;
	description: string;
	contact: string;
	imageUrl: string;
	public: boolean;
	visible: boolean;
	superior: boolean;
};

export class Datasets {
	private httpClient: HttpClient;

	constructor(httpClient: HttpClient) {
		this.httpClient = httpClient;
	}

	getAll(): Promise<Dataset[]> {
		const request: RequestParams = {
			method: Method.Get,
			path: 'datasets',
		};

		return this.httpClient.request(request);
	}
}
