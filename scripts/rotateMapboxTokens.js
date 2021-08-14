const mbxTokens = require('@mapbox/mapbox-sdk/services/tokens');
const tokensService = mbxTokens({ accessToken: process.env.STOKEN });

const action = process.argv[2];

const grillspotsTokenNote = 'grillspots-rotating-token';

const getGrillspotsTokens = async () => {
  const tokensResp = await tokensService.listTokens().send();
  const tokens = await tokensResp.body;
  const grillspotsTokens = tokens.filter((token) => token.note === grillspotsTokenNote);
  return grillspotsTokens;
}

const deleteOldestToken = async () => {
  const tokens = await getGrillspotsTokens();
  const oldestToken = tokens.reduce((previous, current) => {
    const previousDate = new Date(previous.created);
    const currentDate = new Date(current.created);
    return previousDate < currentDate ? previous : current;
  });

  await tokensService.deleteToken({
    tokenId: oldestToken.id
  }).send();
}

const createNewGrillspotsToken = async () => {
  const newToken = await tokensService.createToken({
    note: grillspotsTokenNote,
    scopes: [
      'styles:tiles',
      'styles:read',
      'fonts:read',
      'datasets:read',
      'vision:read'
    ]
  }).send();
  const body = await newToken.body;
  console.log(body.token);
}

const rotateTokens = async () => {
  const grillspotsTokens = await getGrillspotsTokens();

  await deleteOldestToken(grillspotsTokens);
  await createNewGrillspotsToken();
}

const listAllTokens = async () => {
  const tokensResp = await tokensService.listTokens().send();
  const tokens = await tokensResp.body;
  console.log(tokens);
}

const listGrillspotsTokens = async () => {
  const grillspotsTokens = await getGrillspotsTokens();
  console.log(grillspotsTokens);
}

const getLatestGrill = async () => {
  const grillspotsTokens = await getGrillspotsTokens();
  const latestToken = grillspotsTokens.reduce((previous, current) => {
    const previousDate = new Date(previous.created);
    const currentDate = new Date(current.created);
    return previousDate > currentDate ? previous : current;
  });
  console.log(latestToken.token);
}

(async () => {
  switch (action) {
    case "list-all":
      await listAllTokens();
      break;
    case "list-grill":
      await listGrillspotsTokens();
      break;
    case "rotate":
      await rotateTokens();
      break;
    case "delete-oldest-grill":
      await deleteOldestToken();
      break;
    case "create-new-grill":
      await createNewGrillspotsToken();
      break;
    case "get-latest-grill":
      await getLatestGrill();
      break;
  }
})();


