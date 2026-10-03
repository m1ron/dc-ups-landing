// Entry for the landing page: imports and init order, nothing else.
import { initReveal } from './components/reveal.js';
import { initFeatures } from './components/feature.js';
import { initOrder } from './components/order.js';
import { initStickyBar } from './layout/sticky-bar.js';
import { initDemo } from './sections/demo.js';
import { initSpecs } from './sections/specs.js';
import { initFaq } from './sections/faq.js';

initReveal();
initStickyBar();
initDemo();
initFeatures();
initSpecs();
initFaq();
initOrder();
