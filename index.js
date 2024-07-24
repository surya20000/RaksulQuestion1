const fs = require('fs')
const readLine = require('readline')
const filePath = './dummy.txt'
const readInterface = readLine.createInterface({
    input:fs.createReadStream(filePath),
    console:false
})

const wordsCounts = {};

readInterface.on('line',(line) =>{
    const words = line.toLowerCase().match(/\b\w+\b/g);
    if(words){
        for (const word of words){
            if(wordsCounts[word]){
                wordsCounts[word]++
            }else{
                wordsCounts[word] = 1
            }
        }
    }
})

readInterface.on('close',() =>{
    const sortedWordCounts = Object.entries(wordsCounts).sort((a,b) =>b[1] - a[1])
    const top10Words = sortedWordCounts.slice(0,10);  
    console.log("10 most common words in the file are:");
    for (const [word,count] of top10Words){
        console.log(`${word}:  ${count}`);
    }
})
