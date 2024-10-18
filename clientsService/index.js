const clients = {};

const addClient = (region, client) => {
  if (!clients[region]) {
    console.log("not client region");
    clients[region] = [];
  }
  clients[region].push(client);
  console.log(clients[region].length);
};

const removeClient = (id, region) => {
  const filtered = clients[region].filter((client) => client.id !== id);
  clients[region] = filtered;
};

module.exports = { addClient, removeClient, clients };
