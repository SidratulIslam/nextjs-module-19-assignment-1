import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma= new PrismaClient();

export async function GET(req, res) {

    try {

        const product_reviews = await prisma.product_review.findMany()

        return NextResponse.json({ status: "Success", result: product_reviews });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function POST(req, res) {

    try {

        let reqBody = await req.json();

        const {  title , rating , content , productld } = reqBody;

        const product_review = await prisma.product_review.create({
            data: {
                title,
                rating,
                content,
                productld
            }
        })

        return NextResponse.json({ status: "Success", result: product_review });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function PUT(req, res) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id')
        let reqBody = await req.json();

        const {  title , rating , content , productld } = reqBody;

        const product_review = await prisma.product_review.update({
            where: { id },
            data: {
                title,
                rating,
                content,
                productld
            }
        })


        return NextResponse.json({ status: "Success", result: product_review });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function DELETE(req, res) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id')
        const product_review = await prisma.product_review.delete({
            where: { id }
        })
        return NextResponse.json({ status: "Success", result: product_review });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}
