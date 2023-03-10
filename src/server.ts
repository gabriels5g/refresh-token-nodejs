import fastify from "fastify";

const app = fastify();

app.get("/", async (request, reply) => {
  reply.send({ message: "Olá, mundo" });
});

app.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando em ${address}`);
});
