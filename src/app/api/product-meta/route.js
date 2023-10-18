import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma= new PrismaClient();

export async function GET(req, res) {

    try {

        const product_metas = await prisma.product_meta.findMany()

        return NextResponse.json({ status: "Success", result: product_metas });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function POST(req, res) {

    try {

        let reqBody = await req.json();

        const { key , content , productld } = reqBody;

        const product_meta = await prisma.product_meta.create({
            data: {
                key,
                content,
                productld
            }
        })

        return NextResponse.json({ status: "Success", result: product_meta });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function PUT(req, res) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id')
        let reqBody = await req.json();

        const { title, metaTitle, slug, content } = reqBody

        const product_meta = await prisma.product_meta.update({
            where: { id },
            data: {
                title,
                metaTitle,
                slug,
                content
            }
        })


        return NextResponse.json({ status: "Success", result: product_meta });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function DELETE(req, res) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id')
        const product_meta = await prisma.product_meta.delete({
            where: { id }
        })
        return NextResponse.json({ status: "Success", result: product_meta });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}
