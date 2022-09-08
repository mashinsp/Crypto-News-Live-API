const PORT = process.env.PORT || 8080;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
let info = []
let news = [
    {
        name: 'bitcoin',
        address: 'https://blockchain.news/tag/Bitcoin'
    },
    {
        name: 'bitcoinPriceAnalysis',
        address: 'https://blockchain.news/tag/Bitcoin'
    },
    {
        name: 'etherium',
        address: 'https://blockchain.news/tag/Ethereum'
    },
    {
        name: 'cardano',
        address: 'https://blockchain.news/tag/Cardano'
    },
    {
        name: 'ripple',
        address: 'https://blockchain.news/tag/Ripple'
    },
    {
        name: 'stablecoin',
        address: 'https://blockchain.news/tag/Stablecoin'
    },
    {
        name: 'CBDC',
        address: 'https://blockchain.news/tag/CBDC'
    },
    {
        name: 'defi',
        address: 'https://blockchain.news/tag/DeFi'
    },
    {
        name: 'nft',
        address: 'https://blockchain.news/NFT'
    }
]
const app = express();

news.forEach((news) => {
    axios.get(news.address)
    .then(response => {
            const $ = cheerio.load(response.data);
            $('div.col-xl-8half').each(function() {
              const link = $(this).find('a').attr('href');
              const title = $(this).find('strong').text();
              info.push({
              title,
              link,
              srouce: 'Blockchain news'
                    });
                })   
            }).catch(err => console.log(err));
})

app.get('/news/:tagid', (req,res) => {

    const tagid = req.params.tagid;
    
    const srcAdd = news.filter(source => source.name == tagid)[0].address;
    
    axios.get(srcAdd)
        .then(response => {
            const $ = cheerio.load(response.data);
            let srcData = [];

            $('div.col-xl-8half').each(function(i,element) {
                const link = $(element).find('a').attr('href');
                const title = $(element).find('strong').text();

                srcData.push({
                    title,
                    link,
                    source: 'blockchain news'
                });
            })
            res.json(srcData);  
        }).catch(err => console.log(err))
})

app.get('/news', (req, res) => {
    res.json(info)
})
app.listen(PORT, () => console.log('running'));