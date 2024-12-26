import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
const prisma = new PrismaClient()

async function main() {
    const alice = await prisma.user.upsert({
        where: {
            number: '1234567890'
        },
        update: {},
        create: {
            number: '1234567890',
            password: await bcrypt.hash('alice', 10),
            name: 'alice',
            Balance: {
                create: {
                    amount: 20000,
                    locked: 0
                }
            },
            OnRampTransaction: {
                create: {
                    status: "Success",
                    token: "token_123",
                    provider: "HDFC Bank",
                    amount: 20000,
                    startTime: new Date(),
                }
            }
        }
    });
    const bob = await prisma.user.upsert({
        where: {
            number: '9876543210'
        },
        update: {},
        create: {
            number: '9876543210',
            password: await bcrypt.hash('alice', 10),
            name: 'bob',
            Balance: {
                create: {
                    amount: 20000,
                    locked: 0
                }
            },
            OnRampTransaction: {
                create: {
                    status: "Failure",
                    token: "token_456",
                    provider: "Axis Bank",
                    amount: 50000,
                    startTime: new Date(),
                },
            },
        },
    });
    console.log(alice, bob)
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })