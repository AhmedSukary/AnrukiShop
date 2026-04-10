import { Header } from "./components/header.js";
import { Footer } from "./components/footer.js";
import { Nav } from "./components/nav.js";
import { renderProductsSummary } from "./features/products/products.js";

Header();
Nav();
await renderProductsSummary();
Footer();

