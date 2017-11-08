const API_KEY = 'DillonCh-4ce2-442c-b779-8d0905e2d5e4';
const isAudiobook = s => /audiobook|[^\w]cd[^\w]|cds/i.test(s);
const isLeather = s => /[^\w]leather|deluxe/i.test(s);
const isLot = s => /[^\w]set[^\w]|lot of|[^\w]lot[^\w]/i.test(s);
const isSigned = s => /signed|inscribed|autograph/i.test(s);
const sellingStatuses = ['EndedWithSales', 'Active'];
let jsonCallbackCounter = 0;

class Searcher {
    search(query) {
        return Promise.all([
            this.searchSoldListings(query),
            this.searchLiveListings(query)
        ])
            .then(([sold, live]) => {
                return sold.concat(live)
                    .sort(function (a, b) {
                        return b.price - a.price;
                    });
            });
    }

    buildApiUrl({controller, filters = [], q, callback}) {
        filters.unshift({
            name: 'HideDuplicateItems',
            value: 'true'
        });
        filters.map((f, i) => {
            const v = `&itemFilter(${i + 1})`;
            return `${v}.name=${f.name}${v}.value=${f.value}`;
        });
        return `http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=${controller}&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=${API_KEY}&GLOBAL-ID=EBAY-US&RESPONSE-DATA-FORMAT=JSON&callback=${callback}&REST-PAYLOAD${filters.join('')}&paginationInput.entriesPerPage=100&sortOrder=PricePlusShippingHighest&categoryId=267&keywords=${encodeURIComponent(q)}`;
    }

    apiFetch(options) {
        return new Promise((res, rej) => {
            const callback = `jsonp_${jsonCallbackCounter++}`;
            const url = this.buildApiUrl({...options, callback});
            const script = document.createElement('script');
            script.onerror = rej;
            script.src = url;

            window[callback] = data => {
                script.parentNode.removeChild(script);
                res(data);
                delete window[callback];
            };

            document.head.appendChild(script);
        })
            .then(listings => this.transformEbayResponse(listings));
    }

    transformEbayResponse(listings) {
        //  their JSON is all wrapped in single item arrays :/
        const [ firstKey ] = Object.keys(listings);
        const resultSet = listings[firstKey][0].searchResult[0].item;
        return resultSet
            .filter(l => !!l.galleryURL && l.galleryURL.length > 0 && sellingStatuses.includes(l.sellingStatus[0].sellingState[0]))
            .map(l => {
                const [ title ] = l.title;
                const price = Math.round(parseFloat(l.sellingStatus[0].convertedCurrentPrice[0].__value__));
                const date = new Date(l.listingInfo[0].endTime[0]).getTime();

                return {
                    id: l.itemId[0],
                    price: price,
                    imageUrl: l.galleryURL[0],
                    name: title,
                    sortDate: date,
                    date: l.listingInfo[0].endTime[0],
                    url: l.viewItemURL[0],
                    signed: isSigned(title),
                    lot: isLot(title),
                    audiobook: isAudiobook(title),
                    leather: isLeather(title),
                    sold: l.sellingStatus[0].sellingState[0] === sellingStatuses[0]
                };
            });
    }

    searchSoldListings(query) {
        return this.apiFetch({
            controller: 'findCompletedItems',
            q: query,
            filters: [
                {
                    name: 'SoldItemsOnly',
                    value: 'true'
                }
            ]
        });
    }

    searchLiveListings(query) {
        return this.apiFetch({
            q: query,
            controller: 'findItemsAdvanced'
        });
    }
}

const searcher = new Searcher();
export default searcher;
