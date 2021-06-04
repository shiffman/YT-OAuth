async function setup() {
  noCanvas();
  const results = await fetch('/oauth');
  const json = await results.json();
  console.log(json);
  createA(json.loginLink, 'login');
}
