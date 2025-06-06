import { UmbElementMixin as vt } from "@umbraco-cms/backoffice/element-api";
import { UMB_AUTH_CONTEXT as O } from "@umbraco-cms/backoffice/auth";
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const F = globalThis, K = F.ShadowRoot && (F.ShadyCSS === void 0 || F.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Z = Symbol(), tt = /* @__PURE__ */ new WeakMap();
let ut = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== Z) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (K && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = tt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && tt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const yt = (r) => new ut(typeof r == "string" ? r : r + "", void 0, Z), At = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, o) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[o + 1], r[0]);
  return new ut(e, r, Z);
}, bt = (r, t) => {
  if (K) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = F.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, et = K ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return yt(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: wt, defineProperty: Et, getOwnPropertyDescriptor: Ct, getOwnPropertyNames: St, getOwnPropertySymbols: xt, getPrototypeOf: Tt } = Object, g = globalThis, st = g.trustedTypes, Pt = st ? st.emptyScript : "", q = g.reactiveElementPolyfillSupport, U = (r, t) => r, j = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? Pt : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, X = (r, t) => !wt(r, t), it = { attribute: !0, type: String, converter: j, reflect: !1, useDefault: !1, hasChanged: X };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), g.litPropertyMetadata ?? (g.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let C = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = it) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && Et(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: o } = Ct(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: i, set(n) {
      const l = i == null ? void 0 : i.call(this);
      o == null || o.call(this, n), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? it;
  }
  static _$Ei() {
    if (this.hasOwnProperty(U("elementProperties"))) return;
    const t = Tt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(U("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(U("properties"))) {
      const e = this.properties, s = [...St(e), ...xt(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(et(i));
    } else t !== void 0 && e.push(et(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return bt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) == null ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    var o;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const n = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : j).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o, n;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const l = s.getPropertyOptions(i), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((o = l.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? l.converter : j;
      this._$Em = i, this[i] = a.fromAttribute(e, l.type) ?? ((n = this._$Ej) == null ? void 0 : n.get(i)) ?? null, this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    var i;
    if (t !== void 0) {
      const o = this.constructor, n = this[t];
      if (s ?? (s = o.getPropertyOptions(t)), !((s.hasChanged ?? X)(n, e) || s.useDefault && s.reflect && n === ((i = this._$Ej) == null ? void 0 : i.get(t)) && !this.hasAttribute(o._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: o }, n) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, n] of this._$Ep) this[o] = n;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, n] of i) {
        const { wrapped: l } = n, a = this[o];
        l !== !0 || this._$AL.has(o) || a === void 0 || this.C(o, void 0, n, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((i) => {
        var o;
        return (o = i.hostUpdate) == null ? void 0 : o.call(i);
      }), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
C.elementStyles = [], C.shadowRootOptions = { mode: "open" }, C[U("elementProperties")] = /* @__PURE__ */ new Map(), C[U("finalized")] = /* @__PURE__ */ new Map(), q == null || q({ ReactiveElement: C }), (g.reactiveElementVersions ?? (g.reactiveElementVersions = [])).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const I = globalThis, L = I.trustedTypes, rt = L ? L.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, pt = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, mt = "?" + $, Ot = `<${mt}>`, w = document, D = () => w.createComment(""), M = (r) => r === null || typeof r != "object" && typeof r != "function", Q = Array.isArray, Ut = (r) => Q(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", W = `[ 	
\f\r]`, P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ot = /-->/g, nt = />/g, v = RegExp(`>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), at = /'/g, lt = /"/g, _t = /^(?:script|style|textarea|title)$/i, It = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), f = It(1), S = Symbol.for("lit-noChange"), c = Symbol.for("lit-nothing"), ht = /* @__PURE__ */ new WeakMap(), A = w.createTreeWalker(w, 129);
function ft(r, t) {
  if (!Q(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return rt !== void 0 ? rt.createHTML(t) : t;
}
const kt = (r, t) => {
  const e = r.length - 1, s = [];
  let i, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = P;
  for (let l = 0; l < e; l++) {
    const a = r[l];
    let d, u, h = -1, m = 0;
    for (; m < a.length && (n.lastIndex = m, u = n.exec(a), u !== null); ) m = n.lastIndex, n === P ? u[1] === "!--" ? n = ot : u[1] !== void 0 ? n = nt : u[2] !== void 0 ? (_t.test(u[2]) && (i = RegExp("</" + u[2], "g")), n = v) : u[3] !== void 0 && (n = v) : n === v ? u[0] === ">" ? (n = i ?? P, h = -1) : u[1] === void 0 ? h = -2 : (h = n.lastIndex - u[2].length, d = u[1], n = u[3] === void 0 ? v : u[3] === '"' ? lt : at) : n === lt || n === at ? n = v : n === ot || n === nt ? n = P : (n = v, i = void 0);
    const _ = n === v && r[l + 1].startsWith("/>") ? " " : "";
    o += n === P ? a + Ot : h >= 0 ? (s.push(d), a.slice(0, h) + pt + a.slice(h) + $ + _) : a + $ + (h === -2 ? l : _);
  }
  return [ft(r, o + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class N {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let o = 0, n = 0;
    const l = t.length - 1, a = this.parts, [d, u] = kt(t, e);
    if (this.el = N.createElement(d, s), A.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = A.nextNode()) !== null && a.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(pt)) {
          const m = u[n++], _ = i.getAttribute(h).split($), z = /([.?@])?(.*)/.exec(m);
          a.push({ type: 1, index: o, name: z[2], strings: _, ctor: z[1] === "." ? Mt : z[1] === "?" ? Nt : z[1] === "@" ? Ht : B }), i.removeAttribute(h);
        } else h.startsWith($) && (a.push({ type: 6, index: o }), i.removeAttribute(h));
        if (_t.test(i.tagName)) {
          const h = i.textContent.split($), m = h.length - 1;
          if (m > 0) {
            i.textContent = L ? L.emptyScript : "";
            for (let _ = 0; _ < m; _++) i.append(h[_], D()), A.nextNode(), a.push({ type: 2, index: ++o });
            i.append(h[m], D());
          }
        }
      } else if (i.nodeType === 8) if (i.data === mt) a.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = i.data.indexOf($, h + 1)) !== -1; ) a.push({ type: 7, index: o }), h += $.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = w.createElement("template");
    return s.innerHTML = t, s;
  }
}
function x(r, t, e = r, s) {
  var n, l;
  if (t === S) return t;
  let i = s !== void 0 ? (n = e._$Co) == null ? void 0 : n[s] : e._$Cl;
  const o = M(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== o && ((l = i == null ? void 0 : i._$AO) == null || l.call(i, !1), o === void 0 ? i = void 0 : (i = new o(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = x(r, i._$AS(r, t.values), i, s)), t;
}
class Dt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? w).importNode(e, !0);
    A.currentNode = i;
    let o = A.nextNode(), n = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let d;
        a.type === 2 ? d = new H(o, o.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (d = new zt(o, this, t)), this._$AV.push(d), a = s[++l];
      }
      n !== (a == null ? void 0 : a.index) && (o = A.nextNode(), n++);
    }
    return A.currentNode = w, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class H {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = c, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = x(this, t, e), M(t) ? t === c || t == null || t === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : t !== this._$AH && t !== S && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ut(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== c && M(this._$AH) ? this._$AA.nextSibling.data = t : this.T(w.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = N.createElement(ft(s.h, s.h[0]), this.options)), s);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === i) this._$AH.p(e);
    else {
      const n = new Dt(i, this), l = n.u(this.options);
      n.p(e), this.T(l), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = ht.get(t.strings);
    return e === void 0 && ht.set(t.strings, e = new N(t)), e;
  }
  k(t) {
    Q(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const o of t) i === e.length ? e.push(s = new H(this.O(D()), this.O(D()), this, this.options)) : s = e[i], s._$AI(o), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class B {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, o) {
    this.type = 1, this._$AH = c, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = c;
  }
  _$AI(t, e = this, s, i) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = x(this, t, e, 0), n = !M(t) || t !== this._$AH && t !== S, n && (this._$AH = t);
    else {
      const l = t;
      let a, d;
      for (t = o[0], a = 0; a < o.length - 1; a++) d = x(this, l[s + a], e, a), d === S && (d = this._$AH[a]), n || (n = !M(d) || d !== this._$AH[a]), d === c ? t = c : t !== c && (t += (d ?? "") + o[a + 1]), this._$AH[a] = d;
    }
    n && !i && this.j(t);
  }
  j(t) {
    t === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Mt extends B {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === c ? void 0 : t;
  }
}
class Nt extends B {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== c);
  }
}
class Ht extends B {
  constructor(t, e, s, i, o) {
    super(t, e, s, i, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = x(this, t, e, 0) ?? c) === S) return;
    const s = this._$AH, i = t === c && s !== c || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== c && (s === c || i);
    i && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class zt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    x(this, t);
  }
}
const V = I.litHtmlPolyfillSupport;
V == null || V(N, H), (I.litHtmlVersions ?? (I.litHtmlVersions = [])).push("3.3.0");
const Rt = (r, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new H(t.insertBefore(D(), o), o, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const b = globalThis;
class k extends C {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Rt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return S;
  }
}
var dt;
k._$litElement$ = !0, k.finalized = !0, (dt = b.litElementHydrateSupport) == null || dt.call(b, { LitElement: k });
const J = b.litElementPolyfillSupport;
J == null || J({ LitElement: k });
(b.litElementVersions ?? (b.litElementVersions = [])).push("4.2.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ft = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const jt = { attribute: !0, type: String, converter: j, reflect: !1, hasChanged: X }, Lt = (r = jt, t, e) => {
  const { kind: s, metadata: i } = e;
  let o = globalThis.litPropertyMetadata.get(i);
  if (o === void 0 && globalThis.litPropertyMetadata.set(i, o = /* @__PURE__ */ new Map()), s === "setter" && ((r = Object.create(r)).wrapped = !0), o.set(e.name, r), s === "accessor") {
    const { name: n } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(n, a, r);
    }, init(l) {
      return l !== void 0 && this.C(n, void 0, r, l), l;
    } };
  }
  if (s === "setter") {
    const { name: n } = e;
    return function(l) {
      const a = this[n];
      t.call(this, l), this.requestUpdate(n, a, r);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function Bt(r) {
  return (t, e) => typeof e == "object" ? Lt(r, t, e) : ((s, i, o) => {
    const n = i.hasOwnProperty(o);
    return i.constructor.createProperty(o, s), n ? Object.getOwnPropertyDescriptor(i, o) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function T(r) {
  return Bt({ ...r, state: !0, attribute: !1 });
}
var qt = Object.defineProperty, Wt = Object.getOwnPropertyDescriptor, $t = (r) => {
  throw TypeError(r);
}, E = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Wt(t, e) : t, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (i = (s ? n(t, e, i) : n(i)) || i);
  return s && i && qt(t, e, i), i;
}, Y = (r, t, e) => t.has(r) || $t("Cannot " + e), R = (r, t, e) => (Y(r, t, "read from private field"), e ? e.call(r) : t.get(r)), ct = (r, t, e) => t.has(r) ? $t("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(r) : t.set(r, e), Vt = (r, t, e, s) => (Y(r, t, "write to private field"), t.set(r, e), e), Jt = (r, t, e) => (Y(r, t, "access private method"), e), y, G, gt;
let p = class extends vt(k) {
  constructor() {
    super(), ct(this, G), this._items = [], this._loading = !1, this._error = null, this._showCreateForm = !1, this._editingItem = null, this._formData = {
      name: "",
      description: ""
    }, ct(this, y), Vt(this, y, Jt(this, G, gt).call(this));
  }
  connectedCallback() {
    super.connectedCallback(), setTimeout(() => this._loadItems(), 0);
  }
  async _loadItems() {
    this._loading = !0, this._error = null;
    try {
      await R(this, y), console.log("🚀 Loading items using manual fetch...");
      const e = await (await this.getContext(O)).getOpenApiConfiguration().token(), s = await fetch("/umbraco/mindburn/api/v1/items", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${e}`,
          "Content-Type": "application/json"
        }
      });
      if (console.log("📊 Manual fetch response:", s.status, s.statusText), !s.ok)
        throw new Error(`HTTP ${s.status}: ${s.statusText}`);
      const i = await s.json();
      this._items = i, console.log("✅ Items loaded successfully:", this._items);
    } catch (r) {
      console.error("💥 Failed to load items:", r), this._error = r instanceof Error ? r.message : `Failed to load items: ${JSON.stringify(r)}`;
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
      await R(this, y);
      const r = {
        name: this._formData.name,
        description: this._formData.description
      };
      console.log("🚀 Creating item using manual fetch...");
      const s = await (await this.getContext(O)).getOpenApiConfiguration().token(), i = await fetch("/umbraco/mindburn/api/v1/items", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${s}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(r)
      });
      if (console.log("📊 Manual fetch response:", i.status, i.statusText), !i.ok)
        throw new Error(`HTTP ${i.status}: ${i.statusText}`);
      const o = await i.json();
      console.log("✅ Item created successfully:", o), await this._loadItems(), this._resetForm();
    } catch (r) {
      console.error("💥 Failed to create item:", r), this._error = r instanceof Error ? r.message : "Failed to create item";
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
      await R(this, y);
      const r = {
        name: this._formData.name,
        description: this._formData.description
      };
      console.log("🚀 Updating item using manual fetch...");
      const s = await (await this.getContext(O)).getOpenApiConfiguration().token(), i = await fetch(`/umbraco/mindburn/api/v1/items/${this._editingItem.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${s}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(r)
      });
      if (console.log("📊 Manual fetch response:", i.status, i.statusText), !i.ok)
        throw new Error(`HTTP ${i.status}: ${i.statusText}`);
      const o = await i.json();
      console.log("✅ Item updated successfully:", o), await this._loadItems(), this._resetForm();
    } catch (r) {
      console.error("💥 Failed to update item:", r), this._error = r instanceof Error ? r.message : "Failed to update item";
    } finally {
      this._loading = !1;
    }
  }
  async _deleteItem(r) {
    if (confirm("Are you sure you want to delete this item?")) {
      this._loading = !0, this._error = null;
      try {
        await R(this, y), console.log("🚀 Deleting item using manual fetch...");
        const s = await (await this.getContext(O)).getOpenApiConfiguration().token(), i = await fetch(`/umbraco/mindburn/api/v1/items/${r}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${s}`,
            "Content-Type": "application/json"
          }
        });
        if (console.log("📊 Manual fetch response:", i.status, i.statusText), !i.ok)
          throw new Error(`HTTP ${i.status}: ${i.statusText}`);
        console.log("✅ Item deleted successfully"), await this._loadItems();
      } catch (t) {
        console.error("💥 Failed to delete item:", t), this._error = t instanceof Error ? t.message : "Failed to delete item";
      } finally {
        this._loading = !1;
      }
    }
  }
  _showCreateFormHandler() {
    this._showCreateForm = !0, this._editingItem = null, this._formData = { name: "", description: "" };
  }
  _editItem(r) {
    this._editingItem = r, this._showCreateForm = !0, this._formData = {
      name: r.name,
      description: r.description
    };
  }
  _resetForm() {
    this._showCreateForm = !1, this._editingItem = null, this._formData = { name: "", description: "" }, this._error = null;
  }
  _onNameInput(r) {
    const t = r.target;
    this._formData = { ...this._formData, name: t.value };
  }
  _onDescriptionInput(r) {
    const t = r.target;
    this._formData = { ...this._formData, description: t.value };
  }
  render() {
    return f`
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

      ${this._error ? f`<div class="error">${this._error}</div>` : c}

      ${this._showCreateForm ? this._renderForm() : c}

      ${this._loading ? f`<div class="loading">Loading...</div>` : c}

      ${this._items.length === 0 && !this._loading ? f`<div class="empty-state">No items found. Create your first item!</div>` : this._renderItems()}
    `;
  }
  _renderForm() {
    return f`
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
    return f`
      <div class="items-grid">
        ${this._items.map((r) => f`
          <div class="item-card">
            <div class="item-header">
              <div>
                <h4>${r.name}</h4>
                <p>${r.description}</p>
                <small>Created: ${new Date(r.createdAt).toLocaleString()}</small>
                ${r.updatedAt ? f`<br><small>Updated: ${new Date(r.updatedAt).toLocaleString()}</small>` : c}
              </div>
              <div class="item-actions">
                <uui-button
                  label="Edit"
                  look="secondary"
                  @click=${() => this._editItem(r)}
                  ?disabled=${this._loading}
                >
                  Edit
                </uui-button>
                <uui-button
                  label="Delete"
                  look="secondary"
                  color="danger"
                  @click=${() => this._deleteItem(r.id)}
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
y = /* @__PURE__ */ new WeakMap();
G = /* @__PURE__ */ new WeakSet();
gt = async function() {
  return console.log("🔐 Starting auth initialization..."), new Promise(async (r) => {
    await this.consumeContext(O, async (t) => {
      const e = t.getOpenApiConfiguration();
      console.log("🔍 Auth configuration:", {
        base: e.base,
        hasTokenFunction: typeof e.token == "function",
        withCredentials: e.withCredentials
      });
      try {
        const s = `${e.base}/umbraco/mindburn/api/v1/items`;
        console.log("🧪 Testing manual fetch to:", s);
        const i = await e.token(), o = await fetch(s, {
          headers: {
            Authorization: `Bearer ${i}`,
            "Content-Type": "application/json"
          }
        });
        console.log("🧪 Manual fetch response:", o.status, o.statusText);
      } catch (s) {
        console.error("🧪 Manual fetch failed:", s);
      }
      console.log("🔐 Auth initialization complete"), r();
    });
  });
};
p.styles = At`
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
E([
  T()
], p.prototype, "_items", 2);
E([
  T()
], p.prototype, "_loading", 2);
E([
  T()
], p.prototype, "_error", 2);
E([
  T()
], p.prototype, "_showCreateForm", 2);
E([
  T()
], p.prototype, "_editingItem", 2);
E([
  T()
], p.prototype, "_formData", 2);
p = E([
  Ft("test-dashboard")
], p);
const Qt = p;
export {
  p as TestDashboardElement,
  Qt as default
};
//# sourceMappingURL=test-dashboard.element-CJq87HnO.js.map
