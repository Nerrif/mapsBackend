
function generateTask() {
  const nonce = Math.random().toString(36).substring(2);
  const difficulty = 6; // кількість нулів на початку хешу
  return { nonce, difficulty };
}
module.exports = generateTask