import bcrypt from "bcrypt";
import prisma from "../src/config/prisma.js";

const main = async () => {

    const existingAdmin =
        await prisma.admins.findUnique({
            where: {
                email: "admin@nhpc.in"
            }
        });

    if (existingAdmin) {

        console.log("Admin already exists.");

        process.exit(0);

    }

    const passwordHash =
        await bcrypt.hash("Admin@123", 10);

    await prisma.admins.create({

        data: {

            full_name: "System Administrator",

            email: "admin@nhpc.in",

            password_hash: passwordHash,

            role: "SUPER_ADMIN",

            is_active: true

        }

    });

    console.log("Admin created successfully.");

    process.exit(0);

};

main()
.catch(console.error)
.finally(async () => {
    await prisma.$disconnect();
});