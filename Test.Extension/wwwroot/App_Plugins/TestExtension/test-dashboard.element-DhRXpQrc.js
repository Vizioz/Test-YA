var ke = Object.defineProperty;
var je = (s, e, t) => e in s ? ke(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var ne = (s, e, t) => je(s, typeof e != "symbol" ? e + "" : e, t);
import { UmbElementMixin as ze } from "@umbraco-cms/backoffice/element-api";
import { UMB_AUTH_CONTEXT as Q } from "@umbraco-cms/backoffice/auth";
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const q = globalThis, ee = q.ShadowRoot && (q.ShadyCSS === void 0 || q.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, te = Symbol(), ae = /* @__PURE__ */ new WeakMap();
let Ae = class {
  constructor(e, t, r) {
    if (this._$cssResult$ = !0, r !== te) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ee && e === void 0) {
      const r = t !== void 0 && t.length === 1;
      r && (e = ae.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && ae.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const He = (s) => new Ae(typeof s == "string" ? s : s + "", void 0, te), Me = (s, ...e) => {
  const t = s.length === 1 ? s[0] : e.reduce((r, i, n) => r + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + s[n + 1], s[0]);
  return new Ae(t, s, te);
}, qe = (s, e) => {
  if (ee) s.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const r = document.createElement("style"), i = q.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, s.appendChild(r);
  }
}, le = ee ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const r of e.cssRules) t += r.cssText;
  return He(t);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Fe, defineProperty: Le, getOwnPropertyDescriptor: We, getOwnPropertyNames: Be, getOwnPropertySymbols: Ve, getPrototypeOf: Je } = Object, v = globalThis, he = v.trustedTypes, Ge = he ? he.emptyScript : "", V = v.reactiveElementPolyfillSupport, D = (s, e) => s, F = { toAttribute(s, e) {
  switch (e) {
    case Boolean:
      s = s ? Ge : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, e) {
  let t = s;
  switch (e) {
    case Boolean:
      t = s !== null;
      break;
    case Number:
      t = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(s);
      } catch {
        t = null;
      }
  }
  return t;
} }, se = (s, e) => !Fe(s, e), ce = { attribute: !0, type: String, converter: F, reflect: !1, useDefault: !1, hasChanged: se };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), v.litPropertyMetadata ?? (v.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let I = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = ce) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(e, r, t);
      i !== void 0 && Le(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, r) {
    const { get: i, set: n } = We(this.prototype, e) ?? { get() {
      return this[t];
    }, set(o) {
      this[t] = o;
    } };
    return { get: i, set(o) {
      const a = i == null ? void 0 : i.call(this);
      n == null || n.call(this, o), this.requestUpdate(e, a, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ce;
  }
  static _$Ei() {
    if (this.hasOwnProperty(D("elementProperties"))) return;
    const e = Je(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(D("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(D("properties"))) {
      const t = this.properties, r = [...Be(t), ...Ve(t)];
      for (const i of r) this.createProperty(i, t[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [r, i] of t) this.elementProperties.set(r, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, r] of this.elementProperties) {
      const i = this._$Eu(t, r);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const i of r) t.unshift(le(i));
    } else e !== void 0 && t.push(le(e));
    return t;
  }
  static _$Eu(e, t) {
    const r = t.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((t) => t(this));
  }
  addController(e) {
    var t;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((t = e.hostConnected) == null || t.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$EO) == null || t.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const r of t.keys()) this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return qe(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var r;
      return (r = t.hostConnected) == null ? void 0 : r.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var r;
      return (r = t.hostDisconnected) == null ? void 0 : r.call(t);
    });
  }
  attributeChangedCallback(e, t, r) {
    this._$AK(e, r);
  }
  _$ET(e, t) {
    var n;
    const r = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, r);
    if (i !== void 0 && r.reflect === !0) {
      const o = (((n = r.converter) == null ? void 0 : n.toAttribute) !== void 0 ? r.converter : F).toAttribute(t, r.type);
      this._$Em = e, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var n, o;
    const r = this.constructor, i = r._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const a = r.getPropertyOptions(i), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? a.converter : F;
      this._$Em = i, this[i] = l.fromAttribute(t, a.type) ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? null, this._$Em = null;
    }
  }
  requestUpdate(e, t, r) {
    var i;
    if (e !== void 0) {
      const n = this.constructor, o = this[e];
      if (r ?? (r = n.getPropertyOptions(e)), !((r.hasChanged ?? se)(o, t) || r.useDefault && r.reflect && o === ((i = this._$Ej) == null ? void 0 : i.get(e)) && !this.hasAttribute(n._$Eu(e, r)))) return;
      this.C(e, t, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: r, reflect: i, wrapped: n }, o) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, o ?? t ?? this[e]), n !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var r;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, o] of i) {
        const { wrapped: a } = o, l = this[n];
        a !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, o, l);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (r = this._$EO) == null || r.forEach((i) => {
        var n;
        return (n = i.hostUpdate) == null ? void 0 : n.call(i);
      }), this.update(t)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((r) => {
      var i;
      return (i = r.hostUpdated) == null ? void 0 : i.call(r);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t) => this._$ET(t, this[t]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
I.elementStyles = [], I.shadowRootOptions = { mode: "open" }, I[D("elementProperties")] = /* @__PURE__ */ new Map(), I[D("finalized")] = /* @__PURE__ */ new Map(), V == null || V({ ReactiveElement: I }), (v.reactiveElementVersions ?? (v.reactiveElementVersions = [])).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis, L = R.trustedTypes, ue = L ? L.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, we = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, Ee = "?" + y, Ke = `<${Ee}>`, S = document, j = () => S.createComment(""), z = (s) => s === null || typeof s != "object" && typeof s != "function", re = Array.isArray, Ze = (s) => re(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", J = `[ 	
\f\r]`, N = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, de = /-->/g, pe = />/g, A = RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), me = /'/g, fe = /"/g, Ce = /^(?:script|style|textarea|title)$/i, Qe = (s) => (e, ...t) => ({ _$litType$: s, strings: e, values: t }), g = Qe(1), O = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), _e = /* @__PURE__ */ new WeakMap(), E = S.createTreeWalker(S, 129);
function Se(s, e) {
  if (!re(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ue !== void 0 ? ue.createHTML(e) : e;
}
const Xe = (s, e) => {
  const t = s.length - 1, r = [];
  let i, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = N;
  for (let a = 0; a < t; a++) {
    const l = s[a];
    let u, h, c = -1, p = 0;
    for (; p < l.length && (o.lastIndex = p, h = o.exec(l), h !== null); ) p = o.lastIndex, o === N ? h[1] === "!--" ? o = de : h[1] !== void 0 ? o = pe : h[2] !== void 0 ? (Ce.test(h[2]) && (i = RegExp("</" + h[2], "g")), o = A) : h[3] !== void 0 && (o = A) : o === A ? h[0] === ">" ? (o = i ?? N, c = -1) : h[1] === void 0 ? c = -2 : (c = o.lastIndex - h[2].length, u = h[1], o = h[3] === void 0 ? A : h[3] === '"' ? fe : me) : o === fe || o === me ? o = A : o === de || o === pe ? o = N : (o = A, i = void 0);
    const m = o === A && s[a + 1].startsWith("/>") ? " " : "";
    n += o === N ? l + Ke : c >= 0 ? (r.push(u), l.slice(0, c) + we + l.slice(c) + y + m) : l + y + (c === -2 ? a : m);
  }
  return [Se(s, n + (s[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
let X = class xe {
  constructor({ strings: e, _$litType$: t }, r) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const a = e.length - 1, l = this.parts, [u, h] = Xe(e, t);
    if (this.el = xe.createElement(u, r), E.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (i = E.nextNode()) !== null && l.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const c of i.getAttributeNames()) if (c.endsWith(we)) {
          const p = h[o++], m = i.getAttribute(c).split(y), $ = /([.?@])?(.*)/.exec(p);
          l.push({ type: 1, index: n, name: $[2], strings: m, ctor: $[1] === "." ? et : $[1] === "?" ? tt : $[1] === "@" ? st : W }), i.removeAttribute(c);
        } else c.startsWith(y) && (l.push({ type: 6, index: n }), i.removeAttribute(c));
        if (Ce.test(i.tagName)) {
          const c = i.textContent.split(y), p = c.length - 1;
          if (p > 0) {
            i.textContent = L ? L.emptyScript : "";
            for (let m = 0; m < p; m++) i.append(c[m], j()), E.nextNode(), l.push({ type: 2, index: ++n });
            i.append(c[p], j());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Ee) l.push({ type: 2, index: n });
      else {
        let c = -1;
        for (; (c = i.data.indexOf(y, c + 1)) !== -1; ) l.push({ type: 7, index: n }), c += y.length - 1;
      }
      n++;
    }
  }
  static createElement(e, t) {
    const r = S.createElement("template");
    return r.innerHTML = e, r;
  }
};
function T(s, e, t = s, r) {
  var o, a;
  if (e === O) return e;
  let i = r !== void 0 ? (o = t._$Co) == null ? void 0 : o[r] : t._$Cl;
  const n = z(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((a = i == null ? void 0 : i._$AO) == null || a.call(i, !1), n === void 0 ? i = void 0 : (i = new n(s), i._$AT(s, t, r)), r !== void 0 ? (t._$Co ?? (t._$Co = []))[r] = i : t._$Cl = i), i !== void 0 && (e = T(s, i._$AS(s, e.values), i, r)), e;
}
class Ye {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: r } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? S).importNode(t, !0);
    E.currentNode = i;
    let n = E.nextNode(), o = 0, a = 0, l = r[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let u;
        l.type === 2 ? u = new ie(n, n.nextSibling, this, e) : l.type === 1 ? u = new l.ctor(n, l.name, l.strings, this, e) : l.type === 6 && (u = new rt(n, this, e)), this._$AV.push(u), l = r[++a];
      }
      o !== (l == null ? void 0 : l.index) && (n = E.nextNode(), o++);
    }
    return E.currentNode = S, i;
  }
  p(e) {
    let t = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, t), t += r.strings.length - 2) : r._$AI(e[t])), t++;
  }
}
let ie = class Ie {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, r, i) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = r, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = T(this, e, t), z(e) ? e === d || e == null || e === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : e !== this._$AH && e !== O && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ze(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== d && z(this._$AH) ? this._$AA.nextSibling.data = e : this.T(S.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var n;
    const { values: t, _$litType$: r } = e, i = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = X.createElement(Se(r.h, r.h[0]), this.options)), r);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(t);
    else {
      const o = new Ye(i, this), a = o.u(this.options);
      o.p(t), this.T(a), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = _e.get(e.strings);
    return t === void 0 && _e.set(e.strings, t = new X(e)), t;
  }
  k(e) {
    re(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let r, i = 0;
    for (const n of e) i === t.length ? t.push(r = new Ie(this.O(j()), this.O(j()), this, this.options)) : r = t[i], r._$AI(n), i++;
    i < t.length && (this._$AR(r && r._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, t); e && e !== this._$AB; ) {
      const i = e.nextSibling;
      e.remove(), e = i;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
};
class W {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, r, i, n) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = n, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = d;
  }
  _$AI(e, t = this, r, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) e = T(this, e, t, 0), o = !z(e) || e !== this._$AH && e !== O, o && (this._$AH = e);
    else {
      const a = e;
      let l, u;
      for (e = n[0], l = 0; l < n.length - 1; l++) u = T(this, a[r + l], t, l), u === O && (u = this._$AH[l]), o || (o = !z(u) || u !== this._$AH[l]), u === d ? e = d : e !== d && (e += (u ?? "") + n[l + 1]), this._$AH[l] = u;
    }
    o && !i && this.j(e);
  }
  j(e) {
    e === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
let et = class extends W {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === d ? void 0 : e;
  }
};
class tt extends W {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== d);
  }
}
class st extends W {
  constructor(e, t, r, i, n) {
    super(e, t, r, i, n), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = T(this, e, t, 0) ?? d) === O) return;
    const r = this._$AH, i = e === d && r !== d || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, n = e !== d && (r === d || i);
    i && this.element.removeEventListener(this.name, this, r), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class rt {
  constructor(e, t, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    T(this, e);
  }
}
const G = R.litHtmlPolyfillSupport;
G == null || G(X, ie), (R.litHtmlVersions ?? (R.litHtmlVersions = [])).push("3.3.0");
const it = (s, e, t) => {
  const r = (t == null ? void 0 : t.renderBefore) ?? e;
  let i = r._$litPart$;
  if (i === void 0) {
    const n = (t == null ? void 0 : t.renderBefore) ?? null;
    r._$litPart$ = i = new ie(e.insertBefore(j(), n), n, void 0, t ?? {});
  }
  return i._$AI(s), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const C = globalThis;
class k extends I {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t;
    const e = super.createRenderRoot();
    return (t = this.renderOptions).renderBefore ?? (t.renderBefore = e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = it(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return O;
  }
}
var ve;
k._$litElement$ = !0, k.finalized = !0, (ve = C.litElementHydrateSupport) == null || ve.call(C, { LitElement: k });
const K = C.litElementPolyfillSupport;
K == null || K({ LitElement: k });
(C.litElementVersions ?? (C.litElementVersions = [])).push("4.2.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot = (s) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(s, e);
  }) : customElements.define(s, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const nt = { attribute: !0, type: String, converter: F, reflect: !1, hasChanged: se }, at = (s = nt, e, t) => {
  const { kind: r, metadata: i } = t;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), r === "setter" && ((s = Object.create(s)).wrapped = !0), n.set(t.name, s), r === "accessor") {
    const { name: o } = t;
    return { set(a) {
      const l = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(o, l, s);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, s, a), a;
    } };
  }
  if (r === "setter") {
    const { name: o } = t;
    return function(a) {
      const l = this[o];
      e.call(this, a), this.requestUpdate(o, l, s);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function lt(s) {
  return (e, t) => typeof t == "object" ? at(s, e, t) : ((r, i, n) => {
    const o = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, r), o ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(s, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function P(s) {
  return lt({ ...s, state: !0, attribute: !1 });
}
var ht = async (s, e) => {
  let t = typeof e == "function" ? await e(s) : e;
  if (t) return s.scheme === "bearer" ? `Bearer ${t}` : s.scheme === "basic" ? `Basic ${btoa(t)}` : t;
}, ct = { bodySerializer: (s) => JSON.stringify(s, (e, t) => typeof t == "bigint" ? t.toString() : t) }, ut = (s) => {
  switch (s) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, dt = (s) => {
  switch (s) {
    case "form":
      return ",";
    case "pipeDelimited":
      return "|";
    case "spaceDelimited":
      return "%20";
    default:
      return ",";
  }
}, pt = (s) => {
  switch (s) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, Oe = ({ allowReserved: s, explode: e, name: t, style: r, value: i }) => {
  if (!e) {
    let a = (s ? i : i.map((l) => encodeURIComponent(l))).join(dt(r));
    switch (r) {
      case "label":
        return `.${a}`;
      case "matrix":
        return `;${t}=${a}`;
      case "simple":
        return a;
      default:
        return `${t}=${a}`;
    }
  }
  let n = ut(r), o = i.map((a) => r === "label" || r === "simple" ? s ? a : encodeURIComponent(a) : B({ allowReserved: s, name: t, value: a })).join(n);
  return r === "label" || r === "matrix" ? n + o : o;
}, B = ({ allowReserved: s, name: e, value: t }) => {
  if (t == null) return "";
  if (typeof t == "object") throw new Error("Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.");
  return `${e}=${s ? t : encodeURIComponent(t)}`;
}, Te = ({ allowReserved: s, explode: e, name: t, style: r, value: i }) => {
  if (i instanceof Date) return `${t}=${i.toISOString()}`;
  if (r !== "deepObject" && !e) {
    let a = [];
    Object.entries(i).forEach(([u, h]) => {
      a = [...a, u, s ? h : encodeURIComponent(h)];
    });
    let l = a.join(",");
    switch (r) {
      case "form":
        return `${t}=${l}`;
      case "label":
        return `.${l}`;
      case "matrix":
        return `;${t}=${l}`;
      default:
        return l;
    }
  }
  let n = pt(r), o = Object.entries(i).map(([a, l]) => B({ allowReserved: s, name: r === "deepObject" ? `${t}[${a}]` : a, value: l })).join(n);
  return r === "label" || r === "matrix" ? n + o : o;
}, mt = /\{[^{}]+\}/g, ft = ({ path: s, url: e }) => {
  let t = e, r = e.match(mt);
  if (r) for (let i of r) {
    let n = !1, o = i.substring(1, i.length - 1), a = "simple";
    o.endsWith("*") && (n = !0, o = o.substring(0, o.length - 1)), o.startsWith(".") ? (o = o.substring(1), a = "label") : o.startsWith(";") && (o = o.substring(1), a = "matrix");
    let l = s[o];
    if (l == null) continue;
    if (Array.isArray(l)) {
      t = t.replace(i, Oe({ explode: n, name: o, style: a, value: l }));
      continue;
    }
    if (typeof l == "object") {
      t = t.replace(i, Te({ explode: n, name: o, style: a, value: l }));
      continue;
    }
    if (a === "matrix") {
      t = t.replace(i, `;${B({ name: o, value: l })}`);
      continue;
    }
    let u = encodeURIComponent(a === "label" ? `.${l}` : l);
    t = t.replace(i, u);
  }
  return t;
}, Pe = ({ allowReserved: s, array: e, object: t } = {}) => (r) => {
  let i = [];
  if (r && typeof r == "object") for (let n in r) {
    let o = r[n];
    if (o != null) if (Array.isArray(o)) {
      let a = Oe({ allowReserved: s, explode: !0, name: n, style: "form", value: o, ...e });
      a && i.push(a);
    } else if (typeof o == "object") {
      let a = Te({ allowReserved: s, explode: !0, name: n, style: "deepObject", value: o, ...t });
      a && i.push(a);
    } else {
      let a = B({ allowReserved: s, name: n, value: o });
      a && i.push(a);
    }
  }
  return i.join("&");
}, _t = (s) => {
  var t;
  if (!s) return "stream";
  let e = (t = s.split(";")[0]) == null ? void 0 : t.trim();
  if (e) {
    if (e.startsWith("application/json") || e.endsWith("+json")) return "json";
    if (e === "multipart/form-data") return "formData";
    if (["application/", "audio/", "image/", "video/"].some((r) => e.startsWith(r))) return "blob";
    if (e.startsWith("text/")) return "text";
  }
}, $t = async ({ security: s, ...e }) => {
  for (let t of s) {
    let r = await ht(t, e.auth);
    if (!r) continue;
    let i = t.name ?? "Authorization";
    switch (t.in) {
      case "query":
        e.query || (e.query = {}), e.query[i] = r;
        break;
      case "cookie":
        e.headers.append("Cookie", `${i}=${r}`);
        break;
      case "header":
      default:
        e.headers.set(i, r);
        break;
    }
    return;
  }
}, $e = (s) => gt({ baseUrl: s.baseUrl, path: s.path, query: s.query, querySerializer: typeof s.querySerializer == "function" ? s.querySerializer : Pe(s.querySerializer), url: s.url }), gt = ({ baseUrl: s, path: e, query: t, querySerializer: r, url: i }) => {
  let n = i.startsWith("/") ? i : `/${i}`, o = (s ?? "") + n;
  e && (o = ft({ path: e, url: o }));
  let a = t ? r(t) : "";
  return a.startsWith("?") && (a = a.substring(1)), a && (o += `?${a}`), o;
}, ge = (s, e) => {
  var r;
  let t = { ...s, ...e };
  return (r = t.baseUrl) != null && r.endsWith("/") && (t.baseUrl = t.baseUrl.substring(0, t.baseUrl.length - 1)), t.headers = Ue(s.headers, e.headers), t;
}, Ue = (...s) => {
  let e = new Headers();
  for (let t of s) {
    if (!t || typeof t != "object") continue;
    let r = t instanceof Headers ? t.entries() : Object.entries(t);
    for (let [i, n] of r) if (n === null) e.delete(i);
    else if (Array.isArray(n)) for (let o of n) e.append(i, o);
    else n !== void 0 && e.set(i, typeof n == "object" ? JSON.stringify(n) : n);
  }
  return e;
}, Z = class {
  constructor() {
    ne(this, "_fns");
    this._fns = [];
  }
  clear() {
    this._fns = [];
  }
  getInterceptorIndex(s) {
    return typeof s == "number" ? this._fns[s] ? s : -1 : this._fns.indexOf(s);
  }
  exists(s) {
    let e = this.getInterceptorIndex(s);
    return !!this._fns[e];
  }
  eject(s) {
    let e = this.getInterceptorIndex(s);
    this._fns[e] && (this._fns[e] = null);
  }
  update(s, e) {
    let t = this.getInterceptorIndex(s);
    return this._fns[t] ? (this._fns[t] = e, s) : !1;
  }
  use(s) {
    return this._fns = [...this._fns, s], this._fns.length - 1;
  }
}, yt = () => ({ error: new Z(), request: new Z(), response: new Z() }), bt = Pe({ allowReserved: !1, array: { explode: !0, style: "form" }, object: { explode: !0, style: "deepObject" } }), vt = { "Content-Type": "application/json" }, Ne = (s = {}) => ({ ...ct, headers: vt, parseAs: "auto", querySerializer: bt, ...s }), At = (s = {}) => {
  let e = ge(Ne(), s), t = () => ({ ...e }), r = (o) => (e = ge(e, o), t()), i = yt(), n = async (o) => {
    let a = { ...e, ...o, fetch: o.fetch ?? e.fetch ?? globalThis.fetch, headers: Ue(e.headers, o.headers) };
    a.security && await $t({ ...a, security: a.security }), a.body && a.bodySerializer && (a.body = a.bodySerializer(a.body)), (a.body === void 0 || a.body === "") && a.headers.delete("Content-Type");
    let l = $e(a), u = { redirect: "follow", ...a }, h = new Request(l, u);
    for (let f of i.request._fns) f && (h = await f(h, a));
    let c = a.fetch, p = await c(h);
    for (let f of i.response._fns) f && (p = await f(p, h, a));
    let m = { request: h, response: p };
    if (p.ok) {
      if (p.status === 204 || p.headers.get("Content-Length") === "0") return { data: {}, ...m };
      let f = (a.parseAs === "auto" ? _t(p.headers.get("Content-Type")) : a.parseAs) ?? "json";
      if (f === "stream") return { data: p.body, ...m };
      let H = await p[f]();
      return f === "json" && (a.responseValidator && await a.responseValidator(H), a.responseTransformer && (H = await a.responseTransformer(H))), { data: H, ...m };
    }
    let $ = await p.text();
    try {
      $ = JSON.parse($);
    } catch {
    }
    let U = $;
    for (let f of i.error._fns) f && (U = await f($, p, h, a));
    if (U = U || {}, a.throwOnError) throw U;
    return { error: U, ...m };
  };
  return { buildUrl: $e, connect: (o) => n({ ...o, method: "CONNECT" }), delete: (o) => n({ ...o, method: "DELETE" }), get: (o) => n({ ...o, method: "GET" }), getConfig: t, head: (o) => n({ ...o, method: "HEAD" }), interceptors: i, options: (o) => n({ ...o, method: "OPTIONS" }), patch: (o) => n({ ...o, method: "PATCH" }), post: (o) => n({ ...o, method: "POST" }), put: (o) => n({ ...o, method: "PUT" }), request: n, setConfig: r, trace: (o) => n({ ...o, method: "TRACE" }) };
};
const b = At(Ne({
  baseUrl: "http://localhost:14327"
}));
class ye {
  static getItems(e) {
    return ((e == null ? void 0 : e.client) ?? b).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mindburn/api/v1/items",
      ...e
    });
  }
  static createItem(e) {
    return ((e == null ? void 0 : e.client) ?? b).post({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mindburn/api/v1/items",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e == null ? void 0 : e.headers
      }
    });
  }
  static deleteItem(e) {
    return (e.client ?? b).delete({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mindburn/api/v1/items/{id}",
      ...e
    });
  }
  static getItem(e) {
    return (e.client ?? b).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mindburn/api/v1/items/{id}",
      ...e
    });
  }
  static updateItem(e) {
    return (e.client ?? b).put({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mindburn/api/v1/items/{id}",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e == null ? void 0 : e.headers
      }
    });
  }
}
var wt = Object.defineProperty, Et = Object.getOwnPropertyDescriptor, De = (s) => {
  throw TypeError(s);
}, x = (s, e, t, r) => {
  for (var i = r > 1 ? void 0 : r ? Et(e, t) : e, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = (r ? o(e, t, i) : o(i)) || i);
  return r && i && wt(e, t, i), i;
}, oe = (s, e, t) => e.has(s) || De("Cannot " + t), M = (s, e, t) => (oe(s, e, "read from private field"), t ? t.call(s) : e.get(s)), be = (s, e, t) => e.has(s) ? De("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(s) : e.set(s, t), Ct = (s, e, t, r) => (oe(s, e, "write to private field"), e.set(s, t), t), St = (s, e, t) => (oe(s, e, "access private method"), t), w, Y, Re;
let _ = class extends ze(k) {
  constructor() {
    super(), be(this, Y), this._items = [], this._loading = !1, this._error = null, this._showCreateForm = !1, this._editingItem = null, this._formData = {
      name: "",
      description: ""
    }, be(this, w), Ct(this, w, St(this, Y, Re).call(this));
  }
  connectedCallback() {
    super.connectedCallback(), setTimeout(() => this._loadItems(), 0);
  }
  async _loadItems() {
    this._loading = !0, this._error = null;
    try {
      await M(this, w), console.log("🚀 Loading items using manual fetch...");
      const t = await (await this.getContext(Q)).getOpenApiConfiguration().token(), r = await fetch("/umbraco/mindburn/api/v1/items", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${t}`,
          "Content-Type": "application/json"
        }
      });
      if (console.log("📊 Manual fetch response:", r.status, r.statusText), !r.ok)
        throw new Error(`HTTP ${r.status}: ${r.statusText}`);
      const i = await r.json();
      this._items = i, console.log("✅ Items loaded successfully:", this._items);
    } catch (s) {
      console.error("💥 Failed to load items:", s), this._error = s instanceof Error ? s.message : `Failed to load items: ${JSON.stringify(s)}`;
    } finally {
      this._loading = !1;
    }
  }
  async _createItem() {
    if (!this._formData.name.trim()) {
      this._error = "Name is required";
      return;
    }
    this._loading = !0, this._error = null;
    try {
      await M(this, w);
      const s = {
        name: this._formData.name,
        description: this._formData.description
      };
      console.log("🚀 Creating item using manual fetch...");
      const r = await (await this.getContext(Q)).getOpenApiConfiguration().token(), i = await fetch("/umbraco/mindburn/api/v1/items", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${r}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(s)
      });
      if (console.log("📊 Manual fetch response:", i.status, i.statusText), !i.ok)
        throw new Error(`HTTP ${i.status}: ${i.statusText}`);
      const n = await i.json();
      console.log("✅ Item created successfully:", n), await this._loadItems(), this._resetForm();
    } catch (s) {
      console.error("💥 Failed to create item:", s), this._error = s instanceof Error ? s.message : "Failed to create item";
    } finally {
      this._loading = !1;
    }
  }
  async _updateItem() {
    if (!this._editingItem || !this._formData.name.trim()) {
      this._error = "Name is required";
      return;
    }
    this._loading = !0, this._error = null;
    try {
      await M(this, w);
      const s = {
        name: this._formData.name,
        description: this._formData.description
      };
      console.log("🚀 Updating item using direct API call...");
      const e = await ye.updateItem({
        path: { id: this._editingItem.id },
        body: s
      });
      if (e.error)
        throw console.error("❌ API returned error:", e.error), new Error(`API Error: ${JSON.stringify(e.error, null, 2)}`);
      console.log("✅ Item updated successfully:", e.data), await this._loadItems(), this._resetForm();
    } catch (s) {
      console.error("💥 Failed to update item:", s), this._error = s instanceof Error ? s.message : "Failed to update item";
    } finally {
      this._loading = !1;
    }
  }
  async _deleteItem(s) {
    if (confirm("Are you sure you want to delete this item?")) {
      this._loading = !0, this._error = null;
      try {
        await M(this, w), console.log("🚀 Deleting item using direct API call...");
        const e = await ye.deleteItem({
          path: { id: s }
        });
        if (e.error)
          throw console.error("❌ API returned error:", e.error), new Error(`API Error: ${JSON.stringify(e.error, null, 2)}`);
        console.log("✅ Item deleted successfully"), await this._loadItems();
      } catch (e) {
        console.error("💥 Failed to delete item:", e), this._error = e instanceof Error ? e.message : "Failed to delete item";
      } finally {
        this._loading = !1;
      }
    }
  }
  _showCreateFormHandler() {
    this._showCreateForm = !0, this._editingItem = null, this._formData = { name: "", description: "" };
  }
  _editItem(s) {
    this._editingItem = s, this._showCreateForm = !0, this._formData = {
      name: s.name,
      description: s.description
    };
  }
  _resetForm() {
    this._showCreateForm = !1, this._editingItem = null, this._formData = { name: "", description: "" }, this._error = null;
  }
  _onNameInput(s) {
    const e = s.target;
    this._formData = { ...this._formData, name: e.value };
  }
  _onDescriptionInput(s) {
    const e = s.target;
    this._formData = { ...this._formData, description: e.value };
  }
  render() {
    return g`
      <div class="header">
        <h1>Test Section Dashboard</h1>
        <uui-button
          label="Create New Item"
          look="primary"
          @click=${this._showCreateFormHandler}
          ?disabled=${this._loading}
        >
          Create New Item
        </uui-button>
      </div>

      ${this._error ? g`<div class="error">${this._error}</div>` : d}

      ${this._showCreateForm ? this._renderForm() : d}

      ${this._loading ? g`<div class="loading">Loading...</div>` : d}

      ${this._items.length === 0 && !this._loading ? g`<div class="empty-state">No items found. Create your first item!</div>` : this._renderItems()}
    `;
  }
  _renderForm() {
    return g`
      <div class="form-container">
        <h3>${this._editingItem ? "Edit Item" : "Create New Item"}</h3>
        
        <div class="form-field">
          <uui-label for="name" slot="label" required>Name</uui-label>
          <uui-input
            id="name"
            label="Name"
            .value=${this._formData.name}
            @input=${this._onNameInput}
            ?disabled=${this._loading}
          ></uui-input>
        </div>

        <div class="form-field">
          <uui-label for="description" slot="label">Description</uui-label>
          <uui-textarea
            id="description"
            label="Description"
            .value=${this._formData.description}
            @input=${this._onDescriptionInput}
            ?disabled=${this._loading}
          ></uui-textarea>
        </div>

        <div class="form-actions">
          <uui-button
            label=${this._editingItem ? "Update" : "Create"}
            look="primary"
            @click=${this._editingItem ? this._updateItem : this._createItem}
            ?disabled=${this._loading}
          >
            ${this._editingItem ? "Update" : "Create"}
          </uui-button>
          <uui-button
            label="Cancel"
            @click=${this._resetForm}
            ?disabled=${this._loading}
          >
            Cancel
          </uui-button>
        </div>
      </div>
    `;
  }
  _renderItems() {
    return g`
      <div class="items-grid">
        ${this._items.map((s) => g`
          <div class="item-card">
            <div class="item-header">
              <div>
                <h4>${s.name}</h4>
                <p>${s.description}</p>
                <small>Created: ${new Date(s.createdAt).toLocaleString()}</small>
                ${s.updatedAt ? g`<br><small>Updated: ${new Date(s.updatedAt).toLocaleString()}</small>` : d}
              </div>
              <div class="item-actions">
                <uui-button
                  label="Edit"
                  look="secondary"
                  @click=${() => this._editItem(s)}
                  ?disabled=${this._loading}
                >
                  Edit
                </uui-button>
                <uui-button
                  label="Delete"
                  look="secondary"
                  color="danger"
                  @click=${() => this._deleteItem(s.id)}
                  ?disabled=${this._loading}
                >
                  Delete
                </uui-button>
              </div>
            </div>
          </div>
        `)}
      </div>
    `;
  }
};
w = /* @__PURE__ */ new WeakMap();
Y = /* @__PURE__ */ new WeakSet();
Re = async function() {
  return console.log("🔐 Starting auth initialization..."), new Promise(async (s) => {
    await this.consumeContext(Q, async (e) => {
      const t = e.getOpenApiConfiguration();
      console.log("🔍 Auth configuration:", {
        base: t.base,
        hasTokenFunction: typeof t.token == "function",
        withCredentials: t.withCredentials
      });
      const r = t.base.replace(/\/umbraco\/?$/, "");
      console.log("🌐 Setting baseUrl to:", r), console.log("🌐 Original base:", t.base), b.setConfig({
        baseUrl: ""
      }), console.log("🔧 Client config after setup:", b.getConfig());
      try {
        const i = `${r}/umbraco/mindburn/api/v1/items`;
        console.log("🧪 Testing manual fetch to:", i);
        const n = await t.token(), o = await fetch(i, {
          headers: {
            Authorization: `Bearer ${n}`,
            "Content-Type": "application/json"
          }
        });
        console.log("🧪 Manual fetch response:", o.status, o.statusText);
      } catch (i) {
        console.error("🧪 Manual fetch failed:", i);
      }
      b.interceptors.request.use(async (i) => {
        const n = await t.token();
        return console.log("🔑 Adding token to request:", n ? `${n.substring(0, 20)}...` : "NO TOKEN"), console.log("🔗 Request URL:", i.url), console.log("🔍 Full request object:", i), console.log("🔍 Request URL type:", typeof i.url), n ? {
          ...i,
          headers: {
            ...i.headers,
            Authorization: `Bearer ${n}`
          }
        } : i;
      }), console.log("🔐 Auth initialization complete"), s();
    });
  });
};
_.styles = Me`
    :host {
      display: block;
      padding: var(--uui-size-layout-1);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--uui-size-space-5);
    }

    .items-grid {
      display: grid;
      gap: var(--uui-size-space-4);
      margin-bottom: var(--uui-size-space-5);
    }

    .item-card {
      border: 1px solid var(--uui-color-border);
      border-radius: var(--uui-border-radius);
      padding: var(--uui-size-space-4);
      background: var(--uui-color-surface);
    }

    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--uui-size-space-2);
    }

    .item-actions {
      display: flex;
      gap: var(--uui-size-space-2);
    }

    .form-container {
      border: 1px solid var(--uui-color-border);
      border-radius: var(--uui-border-radius);
      padding: var(--uui-size-space-4);
      background: var(--uui-color-surface);
      margin-bottom: var(--uui-size-space-5);
    }

    .form-actions {
      display: flex;
      gap: var(--uui-size-space-2);
      margin-top: var(--uui-size-space-4);
    }

    .error {
      color: var(--uui-color-danger);
      margin-bottom: var(--uui-size-space-4);
    }

    .empty-state {
      text-align: center;
      padding: var(--uui-size-space-6);
      color: var(--uui-color-text-alt);
    }

    .loading {
      text-align: center;
      padding: var(--uui-size-space-4);
    }

    .form-field {
      margin-bottom: var(--uui-size-space-4);
    }

    uui-input,
    uui-textarea {
      width: 100%;
    }
  `;
x([
  P()
], _.prototype, "_items", 2);
x([
  P()
], _.prototype, "_loading", 2);
x([
  P()
], _.prototype, "_error", 2);
x([
  P()
], _.prototype, "_showCreateForm", 2);
x([
  P()
], _.prototype, "_editingItem", 2);
x([
  P()
], _.prototype, "_formData", 2);
_ = x([
  ot("test-dashboard")
], _);
const Nt = _;
export {
  _ as TestDashboardElement,
  Nt as default
};
//# sourceMappingURL=test-dashboard.element-DhRXpQrc.js.map
