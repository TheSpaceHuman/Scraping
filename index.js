const request = require('request');
const needle = require('needle');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('data.csv');


//Write Headers
writeStream.write(`Title,Link \n`);

request('http://constanta.burodizayna.ru/catalog/kutternyie-nozhi/', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    
    const $ = cheerio.load(html);
    
    $('.right-content_items > .right-content_item').each((i, el) => {
      const title = $(el).find('span.name').text();
      const link = $(el).find('a').attr('href');
      
      //Write row to CSV
      writeStream.write(`${title}, ${link} \n`);

      console.log(`Create ${title}`);
    });
    console.log(`DONE!`);
  }
})

// needle.get('http://constanta.burodizayna.ru/catalog/kutternyie-nozhi/', function(error, response) {
//   if (!error && response.statusCode == 200)

//     var $ = cheerio.load(response.body);
    
//     $('.right-content_items > .right-content_item').each((i, el) => {
//       var title = $(el).find('span.name').text();
//       var link = $(el).find('a').attr('href');
      
//       //Write row to CSV
//       writeStream.write(`${title}, ${link} \n`);


//       console.log(`Create ${title} DONE!`);
//     });
// });
