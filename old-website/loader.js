function makeRequest (method, url, index) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
      	console.log('"' + url + '"');
      	console.log(xhr.response);
        resolve([xhr.response, index]);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
}

function load_posts(posts, containing_div) {
	var post_requests = [];
	for (i = 0; i < posts.length; i++) {
		post_requests.push(makeRequest('GET', posts[i], i));
	}
	Promise.all(post_requests).then(function(responses) {
		console.log(responses);
		var divs = [];
		for (i = 0; i < responses.length; i++) {
			div = document.createElement('div');
			div.innerHTML = responses[i][0];
			divs.push([responses[i][1], div]);
		}
		divs.sort(function(a, b) { return b[0] - a[0] });
		console.log(divs);
		for (i = 0; i < divs.length; i++) {
			containing_div.appendChild(divs[i][1]);
			containing_div.appendChild(document.createElement('hr'));
		}
	});
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
			load_posts(client.responseText.trim().split(/\r?\n/), containing_div);
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
