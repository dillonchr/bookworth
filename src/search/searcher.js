export default {
    search(query) {
        return Promise.all([
            this.searchSoldListings(query),
            this.searchLiveListings(query)
        ])
            .then(results => {
                return results
                    .reduce((c, r) => c.concat(r), [])
                    .sort(function (a, b) {
                        return b.price - a.price;
                    });
            })
    },
    apiFetch(q) {
        return fetch(process.env.REACT_APP_API_URL || 'http://localhost:7789/ebay', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(q),
        })
            .then(res => res.ok && res.json())
    },
    searchSoldListings(query) {
        return this.apiFetch({title: query, sold: true, live: false});
    },
    searchLiveListings(query) {
        return this.apiFetch({title: query, live: true, sold: false});
    }
};
