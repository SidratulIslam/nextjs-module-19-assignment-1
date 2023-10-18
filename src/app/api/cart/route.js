import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma= new PrismaClient();

export async function GET(req, res) {
    BigInt.prototype.toJSON = function() {
        return this.toString();
    }


    try {

        const carts = await prisma.cart.findMany();

        const cartStats = await prisma.cart.aggregate({
            _avg: {
                id: true,
            },
            _count: {
                id: true,
            },
            _max: {
                id: true,
            },
            _min: {
                id: true,
            },
            _sum: {
                id: true,
            },
        });

        const cartByCountry = await prisma.cart.groupBy({
            by: ['country'],
            _count: {
                country: true,
            },
        });

        return NextResponse.json({ status: "Success", result: {carts, cartStats, cartByCountry}});
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function POST(req, res) {

    try {

        let reqBody = await req.json();

        const { title, sessionld, token, status, firstName, middleName, lastName, mobile, email, city, country, userld } = reqBody;

        const cart = prisma.cart.create({
            data: {
                title,
                sessionld,
                token,
                status,
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

        const category = prisma.category.create({
            data: {
                title: 'toTestTransactionWith',
                metaTitle: 'toTestTransactionWith',
                slug: 'toTestTransactionWith',
                content: JSON.stringify(reqBody)
            }
        })

        let result = await prisma.$transaction([cart, category])

        return NextResponse.json({ status: "Success", result: result });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function PUT(req, res) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id')
        let reqBody = await req.json();

        const { title, sessionld, token, status, firstName, middleName, lastName, mobile, email, city, country, userld } = reqBody;

        const cart = await prisma.cart.update({
            where: { id },
            data: {
                title,
                sessionld,
                token,
                status,
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


        return NextResponse.json({ status: "Success", result: cart });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function DELETE(req, res) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id')
        const cart = await prisma.cart.delete({
            where: { id }
        })
        return NextResponse.json({ status: "Success", result: cart });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}
