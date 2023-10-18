import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma= new PrismaClient();

export async function GET(req, res) {

    try {

        const orders = await prisma.order.findMany()

        return NextResponse.json({ status: "Success", result: orders });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function POST(req, res) {

    try {

        let reqBody = await req.json();

        const { title, token, subTotal, itemDiscount, tax, total, discount, grandTotal, firstName, middleName, lastName, mobile, email, city, country, userld } = reqBody;

        const order = await prisma.order.create({
            data: {
                title,
                token,
                subTotal,
                itemDiscount,
                tax,
                total,
                discount,
                grandTotal,
                firstName,
                middleName,
                lastName,
                mobile,
                email,
                city,
                country,
                userld
            }
        })

        return NextResponse.json({ status: "Success", result: order });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function PUT(req, res) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id')
        let reqBody = await req.json();

        const { title, token, subTotal, itemDiscount, tax, total, discount, grandTotal, firstName, middleName, lastName, mobile, email, city, country, userld } = reqBody;

        const order = await prisma.order.create({
            where: { id },
            data: {
                title,
                token,
                subTotal,
                itemDiscount,
                tax,
                total,
                discount,
                grandTotal,
                firstName,
                middleName,
                lastName,
                mobile,
                email,
                city,
                country,
                userld
            }
        })


        return NextResponse.json({ status: "Success", result: order });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function DELETE(req, res) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id')
        const order = await prisma.order.delete({
            where: { id }
        })
        return NextResponse.json({ status: "Success", result: order });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}
