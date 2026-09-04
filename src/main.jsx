import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const money = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
const Icon = ({ name, size = 20 }) => {
  const paths = {
    chevron: <path d="m9 18 6-6-6-6" />, back: <path d="m15 18-6-6 6-6" />, check: <path d="m5 12 4 4L19 6" />,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Zm-3-10 2 2 4-4" />, bolt: <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>, star: <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.3-6.2 3.3 1.2-6.8-5-4.9 6.9-1L12 2Z" />
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
};

function ProductCard({ product, active, onClick }) {
  return <button className={`product-card ${active ? 'active' : ''}`} onClick={onClick}>
    <img src={product.image_url} alt="" />
    <span>{product.category}</span><strong>{product.name}</strong><small>{product.tagline}</small>
  </button>;
}

function Shop({ mode }) {
  const go = (path) => window.location.assign(path);
  const isEmpty = mode === 'top-brands' || mode === 'nearby-stores';
  if (isEmpty) return <main className="shop-shell"><header className="shop-header"><a className="shop-logo" href="/shop"><span>1</span>1Fi</a><p>Shop</p></header><section className="shop-empty"><button className="back-link" onClick={() => go('/shop')}>&lt; Shop</button><div className="empty-icon">{mode === 'top-brands' ? 'TB' : 'NS'}</div><h1>{mode === 'top-brands' ? 'Top Brands' : 'Nearby Stores'}</h1><p>This section is intentionally kept blank for the assignment.</p></section><nav className="bottom-nav"><button className="active">Home</button><button>Explore</button><button>Shop</button><button>Profile</button></nav></main>;
  return <main className="shop-shell"><header className="shop-header"><a className="shop-logo" href="/shop"><span>1</span>1Fi</a><p>Shop</p></header><section className="shop-hero"><p>SHOP WITH 1FI</p><h1>Find more ways to make your money work for you.</h1><span>Curated rewards, local offers, and flexible ways to own what you love.</span></section><section className="shop-options"><p className="section-label">EXPLORE SHOP</p><button className="shop-option" onClick={() => go('/shop/top-brands')}><i className="option-icon brands">T</i><span><strong>Top Brands</strong><small>Offers from brands you love</small></span><Icon name="chevron" /></button><button className="shop-option" onClick={() => go('/shop/nearby-stores')}><i className="option-icon nearby">N</i><span><strong>Nearby Stores</strong><small>Discover offers around you</small></span><Icon name="chevron" /></button><button className="shop-option marketplace-option" onClick={() => go('/shop/marketplace')}><i className="option-icon market">1</i><span><strong>1Fi Marketplace</strong><small>Own more. Invest as you pay.</small></span><Icon name="chevron" /></button></section><nav className="bottom-nav"><button>Home</button><button>Explore</button><button className="active">Shop</button><button>Profile</button></nav></main>;
}

function Checkout({ product, variant, plan, monthly, onComplete }) {
  const [confirmed, setConfirmed] = useState(false);
  return <main className="checkout-page"><header className="topbar"><a className="brand" href={`/shop/marketplace?product=${product.slug}`}><span className="logo-mark">1</span><span>1Fi <b>Marketplace</b></span></a><div className="secure"><Icon name="shield" size={17} /> Secure checkout</div></header><section className="checkout-content"><a className="back-link" href={`/shop/marketplace?product=${product.slug}`}>&lt; Back to product</a><div className="checkout-grid"><div className="checkout-confirmation"><span className="success-icon"><Icon name="check" size={29} /></span><p className="eyebrow">READY TO GO</p><h1>Your plan is reserved.</h1><p>One final secure step and <b>{product.name}</b> is yours.</p><div className="checkout-product"><img src={variant.image_url || product.image_url} alt="" /><div><small>{variant.color_name} - {variant.label}</small><strong>{product.name}</strong><span>{money(variant.price)}</span></div></div></div><aside className="order-summary"><p className="eyebrow">ORDER SUMMARY</p><h2>Flexible payments</h2><div className="summary-row"><span>Monthly payment</span><strong>{money(monthly)} <small>/ month</small></strong></div><div className="summary-row"><span>Tenure</span><strong>{plan.tenure_months} months</strong></div><div className="summary-row"><span>Interest</span><strong>{plan.interest_rate === 0 ? '0% - no cost' : `${plan.interest_rate}% p.a.`}</strong></div>{plan.cashback > 0 && <div className="summary-cashback">You will get {money(plan.cashback)} cashback</div>}<button className="complete-order" onClick={() => { setConfirmed(true); onComplete(); }}>{confirmed ? <>Order confirmed <Icon name="check" /></> : <>Confirm & continue <Icon name="arrow" /></>}</button></aside></div></section></main>;
}

function App() {
  const search = new URLSearchParams(location.search);
  const isCheckout = location.pathname === '/checkout';
  const shopMode = location.pathname.match(/^\/shop(?:\/(top-brands|nearby-stores))?$/)?.[1] || (location.pathname === '/shop' || location.pathname === '/' ? 'home' : null);
  const isShop = Boolean(shopMode);
  const isMarketplace = location.pathname === '/shop/marketplace';
  const initialSlug = isCheckout ? search.get('product') || 'iphone-17-pro' : isMarketplace ? search.get('product') || 'iphone-17-pro' : location.pathname.match(/^\/products\/([^/]+)/)?.[1] || 'iphone-17-pro';
  const [products, setProducts] = useState([]);
  const [slug, setSlug] = useState(initialSlug);
  const [product, setProduct] = useState(null);
  const [variantIndex, setVariantIndex] = useState(0);
  const [planId, setPlanId] = useState(null);
  const [notice, setNotice] = useState('');

  useEffect(() => { fetch('/api/products').then(r => r.json()).then(setProducts).catch(() => setNotice('Could not load marketplace catalog.')); }, []);
  useEffect(() => {
    setProduct(null); setVariantIndex(0); setPlanId(null);
    fetch(`/api/products/${slug}`).then(r => r.ok ? r.json() : Promise.reject()).then(data => { setProduct(data); const requestedVariant = Number(search.get('variant')); const requestedPlan = Number(search.get('plan')); setVariantIndex(Math.max(0, data.variants.findIndex(item => item.id === requestedVariant))); setPlanId(data.emiPlans.some(item => item.id === requestedPlan) ? requestedPlan : data.emiPlans.find(p => p.isRecommended)?.id ?? data.emiPlans[0]?.id); }).catch(() => setNotice('That product is not available right now.'));
  }, [slug]);
  const variant = product?.variants[variantIndex];
  const selectedPlan = product?.emiPlans.find(p => p.id === planId);
  const selectProduct = (next) => { history.pushState({}, '', `/shop/marketplace?product=${next.slug}`); setSlug(next.slug); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const planMonthly = useMemo(() => selectedPlan && variant ? Math.round(selectedPlan.monthly_payment * variant.price / product.variants[0].price) : 0, [selectedPlan, variant, product]);

  if (isShop) return <Shop mode={shopMode} />;
  if (!product) return <main className="loading"><div className="logo-mark">1</div><p>Curating your marketplace...</p></main>;
  if (isCheckout) return <Checkout product={product} variant={variant} plan={selectedPlan} monthly={planMonthly} onComplete={() => setNotice('Order confirmed! In a production flow, you would now complete KYC and payment authorization.')} />;
  return <main>
    <header className="topbar"><a className="brand" href="/shop"><span className="logo-mark">1</span><span>1Fi <b>Marketplace</b></span></a><div className="secure"><Icon name="shield" size={17} /> Secure checkout</div></header>
    <section className="catalog-strip"><div><p className="eyebrow">THE 1FI STORE</p><h2>What are you investing in?</h2></div><div className="product-rail">{products.map(p => <ProductCard key={p.id} product={p} active={p.slug === slug} onClick={() => selectProduct(p)} />)}</div></section>
    <section className="breadcrumb"><button onClick={() => window.location.assign('/shop')}><Icon name="back" size={16} /> All products</button><span>/</span><span>{product.category}</span><span>/</span><b>{product.name}</b></section>
    <section className="product-layout">
      <div className="visual-panel" style={{ '--accent': product.accent }}><span className="badge">{product.badge}</span><img src={variant?.image_url || product.image_url} alt={`${product.name} in ${variant?.color_name}`} /><div className="visual-orb one" /><div className="visual-orb two" /><p>Images are illustrative</p></div>
      <div className="details-panel">
        <div className="heading-row"><div><p className="eyebrow">{product.category}</p><h1>{product.name}</h1></div><div className="rating"><Icon name="star" size={15} /> {product.rating} <span>({product.review_count})</span></div></div>
        <p className="description">{product.description}</p>
        <div className="price-row"><div><span>Marketplace price</span><strong>{money(variant.price)}</strong><del>{money(variant.mrp)}</del></div><em>Save {money(variant.mrp - variant.price)}</em></div>
        <div className="choice-group"><div className="label-row"><label>Choose configuration</label><strong>{variant.label}</strong></div><div className="variant-list">{product.variants.map((item, i) => <button key={item.id} className={`variant ${i === variantIndex ? 'selected' : ''}`} onClick={() => setVariantIndex(i)}><i style={{ background: item.swatch }} /><span>{item.label}</span><small>{item.color_name}</small></button>)}</div></div>
        <div className="benefits"><div><Icon name="bolt" /><span><b>Pay smarter</b><small>Start with a flexible EMI</small></span></div><div><Icon name="shield" /><span><b>Your investment stays yours</b><small>EMIs backed by your mutual funds</small></span></div></div>
      </div>
    </section>
    <section className="plans-section"><div className="plans-heading"><div><p className="eyebrow">FLEXIBLE PAYMENTS</p><h2>Pick the plan that fits your month</h2><p>Your mutual funds remain invested while you pay in easy monthly instalments.</p></div><div className="how-it-works"><span>How 1Fi EMI works</span><Icon name="arrow" size={17} /></div></div>
      <div className="plans">{product.emiPlans.map(plan => { const monthly = Math.round(plan.monthly_payment * variant.price / product.variants[0].price); return <button key={plan.id} className={`plan ${plan.id === planId ? 'selected' : ''}`} onClick={() => setPlanId(plan.id)}><span className="radio" />{plan.isRecommended && <b className="recommended">RECOMMENDED</b>}<div className="plan-main"><small>Pay every month</small><strong>{money(monthly)}</strong><span>for {plan.tenure_months} months</span></div><div className="plan-meta"><span><b>{plan.interest_rate === 0 ? '0% interest' : `${plan.interest_rate}% interest`}</b><small>{plan.label}</small></span>{plan.cashback > 0 && <em>+ {money(plan.cashback)} cashback</em>}</div></button>; })}</div>
    </section>
    <footer className="checkout-bar"><div><span>Your selected plan</span><strong>{selectedPlan?.tenure_months} months · {money(planMonthly)}<small>/mo</small></strong></div><button onClick={() => window.location.assign(`/checkout?product=${product.slug}&variant=${variant.id}&plan=${selectedPlan.id}`)}>Continue to checkout <Icon name="arrow" /></button></footer>
    {notice && <div className="toast" role="status">{notice}<button aria-label="Close" onClick={() => setNotice('')}>×</button></div>}
  </main>;
}
createRoot(document.getElementById('root')).render(<App />);
