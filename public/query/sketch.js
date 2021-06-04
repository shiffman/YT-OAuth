async function getSubs(pageToken) {
  let url = '/getSub';
  if (pageToken) url += `?pageToken=${pageToken}`;
  let response = await fetch(url);
  let json = await response.json();
  let { nextPageToken, items } = json;
  return { nextPageToken, items };
}

// async function getMembers(pageToken) {
//   let url = '/getMembers';
//   if (pageToken) url += `?pageToken=${pageToken}`;
//   let response = await fetch(url);
//   let json = await response.json();
//   let { nextPageToken, items } = json;
//   return { nextPageToken, items };
// }

async function setup() {
  noCanvas();
  select('#subscriptions').mousePressed(async () => {
    let allChannels = [];
    let { nextPageToken, items } = await getSubs();
    allChannels = allChannels.concat(items);
    console.log(nextPageToken);
    while (nextPageToken) {
      let results = await getSubs(nextPageToken);
      allChannels = allChannels.concat(results.items);
      nextPageToken = results.nextPageToken;
      console.log(nextPageToken);
    }
    console.log(allChannels);
    const csv1 = allChannels.map(
      (elt) => `${elt.snippet.resourceId.channelId},${elt.snippet.title}`
    );
    const csv2 = `data:text/csv;charset=utf-8${csv1.join('\n')}`;
    const encodedUri = encodeURI(csv2);
    const download = document.createElement('a');
    download.setAttribute('href', encodedUri);
    download.setAttribute('download', 'subscriptions.csv');
    download.click();
    // document.body.appendChild(download);
  });

  // select('#members').mousePressed(async () => {
  //   let allMembers = [];
  //   let { nextPageToken, items } = await getMembers();
  //   allMembers = allChannels.concat(items);
  //   console.log(nextPageToken);
  //   while (nextPageToken) {
  //     let results = await getMembers(nextPageToken);
  //     allMembers = allMembers.concat(results.items);
  //     nextPageToken = results.nextPageToken;
  //     console.log(nextPageToken);
  //   }
  //   console.log(allMembers);
  //   // const csv1 = allChannels.map(
  //   //   (elt) => `${elt.snippet.resourceId.channelId},${elt.snippet.title}`
  //   // );
  //   // const csv2 = `data:text/csv;charset=utf-8${csv1.join('\n')}`;
  //   // const encodedUri = encodeURI(csv2);
  //   // const download = document.createElement('a');
  //   // download.setAttribute('href', encodedUri);
  //   // download.setAttribute('download', 'subscriptions.csv');
  //   // download.click();
  //   // document.body.appendChild(download);
  // });
}
