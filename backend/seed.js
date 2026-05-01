const prisma = require('./database/index');

async function main() {
  const user = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "Atleta Delício",
      bio: "Foco no ritmo e no código!"
    },
  });
  console.log("Usuário de teste criado/verificado:", user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
