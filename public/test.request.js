var xhr = new XMLHttpRequest();

xhr.open('GET', 'comment', false);

xhr.send();

if(xhr.status !== 200) {
	alert(xhr.status);
} else {
	console.log(JSON.parse(xhr.responseText));
}