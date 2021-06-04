async function setup() {
  noCanvas();
  console.log('hello');
  const results = await fetch('/getYT');
  const json = await results.json();
  for (let sub of json.subscriptions) {
    createDiv(sub.snippet.title);
  }
}
