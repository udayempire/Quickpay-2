import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

interface Credentials{
    phone: string,
    password: string
}

interface session{
    token:{
        sub:string,
        name?:string,
        email?:string
    };
    session:{
        user:{
            id?:string,
            name?:string,
            email?:string
        }
    }
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                phone: { label: "Phone Number", type: "text", placeholder: "1231231231", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            async authorize(credentials?:Credentials ) {
                const {phone,password} = credentials
                const hashedPassword = await bcrypt.hash(password, 10);
                const existingUser = await db.user.findFirst({
                    where: {
                        number:phone
                    }
                });
                if (existingUser) {
                    const passwordValidation = await bcrypt.compare(password, existingUser.password);
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.email
                        }
                    }
                    return null;
                }
                try {
                    const user = await db.user.create({
                        data: {
                            number:phone,
                            password: hashedPassword
                        }
                    })
                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.number
                    }
                } catch (e) {
                    console.error(e)
                }
                return null
            },
        }),
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ token, session }: session) {
            session.user.id = token.sub
            return session
        }
    }
}
