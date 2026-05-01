const { PrismaClient } = require('@prisma/client');

/**
 * Instância única do Prisma Client para ser reutilizada na aplicação.
 * Isso previne múltiplas conexões desnecessárias ao banco de dados.
 */
const prisma = new PrismaClient();

module.exports = prisma;
