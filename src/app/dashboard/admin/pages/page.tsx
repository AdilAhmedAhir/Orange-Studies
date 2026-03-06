import { getAllPageStats } from "@/app/actions/page-sections";
import PageSettingsClient from "./PageSettingsClient";

export default async function PageSettingsPage() {
    const pages = await getAllPageStats();
    return <PageSettingsClient pages={pages} />;
}
