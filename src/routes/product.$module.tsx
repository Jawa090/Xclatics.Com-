import { createFileRoute, notFound } from "@tanstack/react-router";
import { products, pageHead } from "@/lib/site-content";
import { ProductDetail } from "@/components/content-page";
export const Route = createFileRoute("/product/$module")({ staticData: { sitemap: true }, loader: ({params}) => { if (!products.some(p => p.id === params.module)) throw notFound(); }, head: ({params}) => { const p = products.find(p => p.id === params.module); return pageHead(p?.label ?? "Product unavailable", p?.intro ?? "Explore the Xclatix platform."); }, component: ProductPage });
function ProductPage() { const { module } = Route.useParams(); const product = products.find(p => p.id === module); return product ? <ProductDetail product={product} /> : null; }