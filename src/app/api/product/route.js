import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma= new PrismaClient();

export async function GET(req, res) {

    try {

        const products = await prisma.product.findMany()

        return NextResponse.json({ status: "Success", result: products });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function POST(req, res) {

    try {

        let reqBody = await req.json();

        const { firstName, metaTitle, slug, summary, price, discount } = reqBody;

        const product = await prisma.product.create({
            data: {
                firstName,
                metaTitle,
                slug,
                summary,
                price,
                discount
            }
        });

        return NextResponse.json({ status: "Success", result: product });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function PUT(req, res) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id')
        let reqBody = await req.json();

        const { firstName, metaTitle, slug, summary, price, discount } = reqBody;

        const product = await prisma.product.update({
            where: { id },
            data: {
                firstName,
                metaTitle,
                slug,
                summary,
                price,
                discount
            }
        })


        return NextResponse.json({ status: "Success", result: product });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function DELETE(req, res) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id')
        const product = await prisma.product.delete({
            where: { id }
        });

        return NextResponse.json({ status: "Success", result: product });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}
