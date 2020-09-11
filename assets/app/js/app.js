// szedje már össze magát!
let wordsFilenames = {};
for (let filename in filenamesWords) {
    for (let word of filenamesWords[filename].split(' ')) {
        if (wordsFilenames.hasOwnProperty(word)) {
            wordsFilenames[word.toLowerCase()].push(filename);
        } else {
            wordsFilenames[word.toLowerCase()] = [filename];
        }
    }
}
let words = Object.keys(wordsFilenames);

// ragazmámeg, dezső!
function generate() {
    let countParagraphs = parseInt($('#input-paragraphs').val());
    let countSentencesPerParagraph = parseInt($('#input-sentences-per-paragraph').val());
    let countWordsPerSentenceMin = parseInt($('#input-words-per-sentence-min').val());
    let countWordsPerSentenceMax = parseInt($('#input-words-per-sentence-max').val());
    let addLinks = $('#input-add-links').prop('checked');

    let outputHTML = '';

    if (countParagraphs < 1 || countSentencesPerParagraph < 1 || countWordsPerSentenceMin < 1 || countWordsPerSentenceMax < 1) {
        alert("E! Pozitív egész számokat kelleteszlesz megadni minden mezőben.");
    } else if (countWordsPerSentenceMin > countWordsPerSentenceMax) {
        alert("Nana! Aegymondatban lévő kifejezések minimális száma nem lehet nagyobb, mint a maximális ugyanez.");
    } else {
        for (let i = 0; i < countParagraphs; i++) {
            let paragraph = '';
            for (let j = 0; j < countSentencesPerParagraph; j++) {
                let sentenceWords = [];
                for (let k = 0; k < getRandomInteger(countWordsPerSentenceMin, countWordsPerSentenceMax); k++) {
                    let word = words[getRandomInteger(0, words.length - 1)].toLowerCase();
                    if (k == 0) {
                        word = word.capitalize();
                    }

                    if (addLinks) {
                        let filenames = wordsFilenames[word.toLowerCase()];
                        if (!filenames) {
                            filenames = wordsFilenames['"' + word.toLowerCase() + '"'];
                        }
                        if (filenames && filenames.length === 1) { // one link
                            sentenceWords.push("<a href='http://napirajz.hu/wp-content/uploads/" + filenames[0] + "' target='_blank'>" + word.replace(/_/g, ' ') + "</a>");
                        } else if (filenames && filenames.length > 1) { // multiple links
                            let links = '';
                            for (k in filenames) {
                                links += "<a href=\"http://napirajz.hu/wp-content/uploads/" + filenames[k] + "\" target=\"_blank\">" + filenames[k] + "</a><br>";
                            }
                            links = links.trim('<br>');
                            sentenceWords.push("<a href='javascript:void(0)' data-toggle='popover' data-html='true' data-placement='top' data-content='" + links + "'><em>" + word.replace(/_/g, ' ') + "</em></a>");
                        } else { // no link..?
                            sentenceWords.push(word.replace(/_/g, ' '));
                        }

                    } else {
                        sentenceWords.push(word.replace(/_/g, ' '));
                    }

                }
                paragraph += sentenceWords.join(' ') + '. ';
            }
            paragraph.trim();
            outputHTML += '<p>' + paragraph + '</p>';
        }
        $('#output').html(outputHTML).removeClass('hidden');
        $('[data-toggle="popover"]').popover();
    }
}

// vékony, nagybetűs, grófos romantikust tessék adni!
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

// a guppi az
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}