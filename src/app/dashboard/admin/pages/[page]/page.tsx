import { getPageSections } from "@/app/actions/page-sections";
import { PAGE_DEFINITIONS, type PageKey } from "@/lib/page-definitions";
import { notFound } from "next/navigation";
import PageEditorClient from "./PageEditorClient";

export default async function PageEditorPage({ params }: { params: Promise<{ page: string }> }) {
    const { page } = await params;

    const pageDef = PAGE_DEFINITIONS[page as PageKey];
    if (!pageDef) notFound();

    const existingSections = await getPageSections(page);

    return (
        <PageEditorClient
            pageKey={page}
            pageLabel={pageDef.label}
            sectionDefs={pageDef.sections as unknown as { key: string; label: string; description: string }[]}
            existingSections={existingSections.map((s) => ({
                ...s,
                items: s.items as unknown,
                updatedAt: s.updatedAt.toISOString(),
            }))}
        />
    );
}
