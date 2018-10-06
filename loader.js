function load_articles(articles, containing_div) {
	for (i = 0; i < articles.length; i++) {
		if (articles[i] === '') 
			continue;
		var client = new XMLHttpRequest();
		client.open('GET', articles[i]);
		client.onreadystatechange = function() {
			if (this.readyState === this.DONE) {
				var new_div = document.createElement('div');
				if (this.status === 200) {
					new_div.innerHTML = this.responseText;
				} else {
					new_div.innerHTML = 'Unable to load article';
				}
				containing_div.appendChild(new_div);
			}
		}
		client.send();
	}
}

function main(index_file, containing_div) {
	var client = new XMLHttpRequest();
	client.open('GET', index_file);
	client.onreadystatechange = function() {
		if (this.readyState === this.DONE) {
			if (this.status != 200) {
				containing_div.innerHTML = 'ERROR. Unable to load index file';
				return;
			}
			load_articles(client.responseText.split(/\r?\n/), containing_div);
		}
	}
	client.send()
}

var containing_div = document.getElementById(document.currentScript.getAttribute('containing_div'));
if (!containing_div) {
	console.log('Couldn\'t find containing div');
} else {
	main(document.currentScript.getAttribute('index_file'), containing_div);
}
/*
client.onreadystatechange = function() {
	if (this.readyState === this.DONE) {
		document.getElementById('articles').innerHTML += client.responseText
	}
}
client.send()*/
