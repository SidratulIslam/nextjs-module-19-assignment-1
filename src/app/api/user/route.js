import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma= new PrismaClient();
export async function GET(req, res) {
    try {
        const users = await prisma.user.findMany()
        return NextResponse.json({ status: "Success", result: users });
      } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
      }
}

export async function POST(req, res) {
    try {

        const reqBody = await req.json();
        const { firstName, middleName, lastName, mobile, email, password, admin } = reqBody;

        const user = await prisma.user.create({
            data: {
                firstName,
                middleName,
                lastName,
                mobile,
                email,
                password,
                admin
            }
        });

        return NextResponse.json({ status: "Success", result: user });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function PUT(req, res) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id');
        let reqBody = await req.json();
        const { firstName, middleName, lastName, mobile, email, password, admin } = reqBody;

        const user = await prisma.user.update({
            where: { id },
            data: {
                firstName,
                middleName,
                lastName,
                mobile,
                email,
                password,
                admin
            }
        })

        return NextResponse.json({ status: "Success", result: user });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function DELETE(req, res) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id')
        const user = await prisma.user.delete({
            where: { id }
        })
        return NextResponse.json({ status: "Success", result: user });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}
