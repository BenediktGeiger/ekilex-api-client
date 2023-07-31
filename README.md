# EKILEX-NODEJS-API-CLIENT

## Status

This NodeJs API-Client is still WIP

## Getting started

To install this package, you can run this on your terminal:

```bash
npm install @vanakaru/ekilex-api-client
```

<div>Node.js

```ts
import { EkilexClient } from '@vanakaru/ekilex-api-client';
```

Next, configure the library - you'll need an API-KEY in advance:

-   Get your API key from [Ekilex user profile page](https://ekilex.ee/userprofile)
-   More information from the [official Ekilex API Github Page](https://github.com/keeleinstituut/ekilex/wiki/Ekilex-API)
-   Ekilex `test` environment: https://ekitest.tripledev.ee/ekilex/
-   Ekilex `production` environment: https://ekilex.ee

```ts
import { EkilexClient } from '@vanakaru/ekilex-api-client';

const ekilexClient = new EkilexClient({
	apiKey: '123456789', // api key from your ekilex user profile page
	environment: 'prod', // or 'test' depending in which environment you created your key
});

const result = await ekilexClient.words.search('tubli', ['eki']);

/* Example Response
{
    "totalCount": 1,
    "words": [
        {
            "wordId": 247445,
            "wordValue": "tubli",
            "wordValuePrese": "tubli",
            "homonymNr": 1,
            "lang": "est",
            "datasetCodes": [
                "eki",
                "les"
            ],
            ...
        }
    ]
}
*/

// Retrieve WordId from result
const wordId = result.words[0].wordId;

const wordDetails = await ekilexClient.words.getDetails(wordId);

/* Example Response
{
    "word": {
        "wordId": 247445,
        "wordValue": "tubli",
        "wordValuePrese": "tubli",
        "homonymNr": 1,
        "lang": "est",
        "morphophonoForm": "tubli",
        "prefixoid": false,
        "suffixoid": false,
        "foreign": false,
        "lexemesTagNames": [
            "kakskeelne: vaste puudub (prantsuse)",
            "koostamisel",
            "süno valmis"
        ],
        "lastActivityEventOn": "2022-10-27T22:31:01.177+00:00",
        "manualEventOn": "2022-10-27T22:31:01.177+00:00"
    },
    "wordTypes": [...],
    "paradigms": [...],
    "lexemes": [...],
    "wordEtymology": [...],
    "odWordRecommendations": [...],
    "wordRelationDetails": {...}
}

*/
```
