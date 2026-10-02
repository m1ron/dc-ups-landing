// Entry for the landing page: imports and init order, nothing else.
import { initReveal } from './components/reveal.js';
import { initStickyBar } from './layout/sticky-bar.js';
import { initDemo } from './components/demo.js';
import { initFeatures } from './components/feature.js';
import { initSpecs } from './components/specs.js';
import { initFaq } from './components/faq.js';
import { initOrder } from './components/order.js';

initReveal();
initStickyBar();
initDemo();
initFeatures();
initSpecs();
initFaq();
initOrder();
