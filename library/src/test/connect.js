!function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.TrezorConnect = e() : t.TrezorConnect = e()
}(window, function() {
    return function(t) {
        var e = {};
        function r(n) {
            if (e[n])
                return e[n].exports;
            var o = e[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return t[n].call(o.exports, o, o.exports, r),
            o.l = !0,
            o.exports
        }
        return r.m = t,
        r.c = e,
        r.d = function(t, e, n) {
            r.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0,
                get: n
            })
        }
        ,
        r.r = function(t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }
        ,
        r.t = function(t, e) {
            if (1 & e && (t = r(t)),
            8 & e)
                return t;
            if (4 & e && "object" == typeof t && t && t.__esModule)
                return t;
            var n = Object.create(null);
            if (r.r(n),
            Object.defineProperty(n, "default", {
                enumerable: !0,
                value: t
            }),
            2 & e && "string" != typeof t)
                for (var o in t)
                    r.d(n, o, function(e) {
                        return t[e]
                    }
                    .bind(null, o));
            return n
        }
        ,
        r.n = function(t) {
            var e = t && t.__esModule ? function() {
                return t.default
            }
            : function() {
                return t
            }
            ;
            return r.d(e, "a", e),
            e
        }
        ,
        r.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }
        ,
        r.p = "./",
        r(r.s = 430)
    }({
        1: function(t, e, r) {
            t.exports = r(137)
        },
        10: function(t, e, r) {
            var n = r(14);
            t.exports = function(t) {
                if (!n(t))
                    throw TypeError(t + " is not an object!");
                return t
            }
        },
        107: function(t, e, r) {
            (function(e) {
                !function(e) {
                    "use strict";
                    var r, n = Object.prototype, o = n.hasOwnProperty, i = "function" == typeof Symbol ? Symbol : {}, s = i.iterator || "@@iterator", a = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag", c = "object" == typeof t, f = e.regeneratorRuntime;
                    if (f)
                        c && (t.exports = f);
                    else {
                        (f = e.regeneratorRuntime = c ? t.exports : {}).wrap = g;
                        var l = "suspendedStart"
                          , h = "suspendedYield"
                          , p = "executing"
                          , d = "completed"
                          , y = {}
                          , v = {};
                        v[s] = function() {
                            return this
                        }
                        ;
                        var m = Object.getPrototypeOf
                          , b = m && m(m(k([])));
                        b && b !== n && o.call(b, s) && (v = b);
                        var w = E.prototype = _.prototype = Object.create(v);
                        j.prototype = w.constructor = E,
                        E.constructor = j,
                        E[u] = j.displayName = "GeneratorFunction",
                        f.isGeneratorFunction = function(t) {
                            var e = "function" == typeof t && t.constructor;
                            return !!e && (e === j || "GeneratorFunction" === (e.displayName || e.name))
                        }
                        ,
                        f.mark = function(t) {
                            return Object.setPrototypeOf ? Object.setPrototypeOf(t, E) : (t.__proto__ = E,
                            u in t || (t[u] = "GeneratorFunction")),
                            t.prototype = Object.create(w),
                            t
                        }
                        ,
                        f.awrap = function(t) {
                            return {
                                __await: t
                            }
                        }
                        ,
                        P(O.prototype),
                        O.prototype[a] = function() {
                            return this
                        }
                        ,
                        f.AsyncIterator = O,
                        f.async = function(t, e, r, n) {
                            var o = new O(g(t, e, r, n));
                            return f.isGeneratorFunction(e) ? o : o.next().then(function(t) {
                                return t.done ? t.value : o.next()
                            })
                        }
                        ,
                        P(w),
                        w[u] = "Generator",
                        w[s] = function() {
                            return this
                        }
                        ,
                        w.toString = function() {
                            return "[object Generator]"
                        }
                        ,
                        f.keys = function(t) {
                            var e = [];
                            for (var r in t)
                                e.push(r);
                            return e.reverse(),
                            function r() {
                                for (; e.length; ) {
                                    var n = e.pop();
                                    if (n in t)
                                        return r.value = n,
                                        r.done = !1,
                                        r
                                }
                                return r.done = !0,
                                r
                            }
                        }
                        ,
                        f.values = k,
                        A.prototype = {
                            constructor: A,
                            reset: function(t) {
                                if (this.prev = 0,
                                this.next = 0,
                                this.sent = this._sent = r,
                                this.done = !1,
                                this.delegate = null,
                                this.method = "next",
                                this.arg = r,
                                this.tryEntries.forEach(L),
                                !t)
                                    for (var e in this)
                                        "t" === e.charAt(0) && o.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = r)
                            },
                            stop: function() {
                                this.done = !0;
                                var t = this.tryEntries[0].completion;
                                if ("throw" === t.type)
                                    throw t.arg;
                                return this.rval
                            },
                            dispatchException: function(t) {
                                if (this.done)
                                    throw t;
                                var e = this;
                                function n(n, o) {
                                    return a.type = "throw",
                                    a.arg = t,
                                    e.next = n,
                                    o && (e.method = "next",
                                    e.arg = r),
                                    !!o
                                }
                                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                                    var s = this.tryEntries[i]
                                      , a = s.completion;
                                    if ("root" === s.tryLoc)
                                        return n("end");
                                    if (s.tryLoc <= this.prev) {
                                        var u = o.call(s, "catchLoc")
                                          , c = o.call(s, "finallyLoc");
                                        if (u && c) {
                                            if (this.prev < s.catchLoc)
                                                return n(s.catchLoc, !0);
                                            if (this.prev < s.finallyLoc)
                                                return n(s.finallyLoc)
                                        } else if (u) {
                                            if (this.prev < s.catchLoc)
                                                return n(s.catchLoc, !0)
                                        } else {
                                            if (!c)
                                                throw new Error("try statement without catch or finally");
                                            if (this.prev < s.finallyLoc)
                                                return n(s.finallyLoc)
                                        }
                                    }
                                }
                            },
                            abrupt: function(t, e) {
                                for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                                    var n = this.tryEntries[r];
                                    if (n.tryLoc <= this.prev && o.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
                                        var i = n;
                                        break
                                    }
                                }
                                i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
                                var s = i ? i.completion : {};
                                return s.type = t,
                                s.arg = e,
                                i ? (this.method = "next",
                                this.next = i.finallyLoc,
                                y) : this.complete(s)
                            },
                            complete: function(t, e) {
                                if ("throw" === t.type)
                                    throw t.arg;
                                return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg,
                                this.method = "return",
                                this.next = "end") : "normal" === t.type && e && (this.next = e),
                                y
                            },
                            finish: function(t) {
                                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                                    var r = this.tryEntries[e];
                                    if (r.finallyLoc === t)
                                        return this.complete(r.completion, r.afterLoc),
                                        L(r),
                                        y
                                }
                            },
                            catch: function(t) {
                                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                                    var r = this.tryEntries[e];
                                    if (r.tryLoc === t) {
                                        var n = r.completion;
                                        if ("throw" === n.type) {
                                            var o = n.arg;
                                            L(r)
                                        }
                                        return o
                                    }
                                }
                                throw new Error("illegal catch attempt")
                            },
                            delegateYield: function(t, e, n) {
                                return this.delegate = {
                                    iterator: k(t),
                                    resultName: e,
                                    nextLoc: n
                                },
                                "next" === this.method && (this.arg = r),
                                y
                            }
                        }
                    }
                    function g(t, e, r, n) {
                        var o = e && e.prototype instanceof _ ? e : _
                          , i = Object.create(o.prototype)
                          , s = new A(n || []);
                        return i._invoke = function(t, e, r) {
                            var n = l;
                            return function(o, i) {
                                if (n === p)
                                    throw new Error("Generator is already running");
                                if (n === d) {
                                    if ("throw" === o)
                                        throw i;
                                    return B()
                                }
                                for (r.method = o,
                                r.arg = i; ; ) {
                                    var s = r.delegate;
                                    if (s) {
                                        var a = T(s, r);
                                        if (a) {
                                            if (a === y)
                                                continue;
                                            return a
                                        }
                                    }
                                    if ("next" === r.method)
                                        r.sent = r._sent = r.arg;
                                    else if ("throw" === r.method) {
                                        if (n === l)
                                            throw n = d,
                                            r.arg;
                                        r.dispatchException(r.arg)
                                    } else
                                        "return" === r.method && r.abrupt("return", r.arg);
                                    n = p;
                                    var u = x(t, e, r);
                                    if ("normal" === u.type) {
                                        if (n = r.done ? d : h,
                                        u.arg === y)
                                            continue;
                                        return {
                                            value: u.arg,
                                            done: r.done
                                        }
                                    }
                                    "throw" === u.type && (n = d,
                                    r.method = "throw",
                                    r.arg = u.arg)
                                }
                            }
                        }(t, r, s),
                        i
                    }
                    function x(t, e, r) {
                        try {
                            return {
                                type: "normal",
                                arg: t.call(e, r)
                            }
                        } catch (t) {
                            return {
                                type: "throw",
                                arg: t
                            }
                        }
                    }
                    function _() {}
                    function j() {}
                    function E() {}
                    function P(t) {
                        ["next", "throw", "return"].forEach(function(e) {
                            t[e] = function(t) {
                                return this._invoke(e, t)
                            }
                        })
                    }
                    function O(t) {
                        function r(e, n, i, s) {
                            var a = x(t[e], t, n);
                            if ("throw" !== a.type) {
                                var u = a.arg
                                  , c = u.value;
                                return c && "object" == typeof c && o.call(c, "__await") ? Promise.resolve(c.__await).then(function(t) {
                                    r("next", t, i, s)
                                }, function(t) {
                                    r("throw", t, i, s)
                                }) : Promise.resolve(c).then(function(t) {
                                    u.value = t,
                                    i(u)
                                }, s)
                            }
                            s(a.arg)
                        }
                        var n;
                        "object" == typeof e.process && e.process.domain && (r = e.process.domain.bind(r)),
                        this._invoke = function(t, e) {
                            function o() {
                                return new Promise(function(n, o) {
                                    r(t, e, n, o)
                                }
                                )
                            }
                            return n = n ? n.then(o, o) : o()
                        }
                    }
                    function T(t, e) {
                        var n = t.iterator[e.method];
                        if (n === r) {
                            if (e.delegate = null,
                            "throw" === e.method) {
                                if (t.iterator.return && (e.method = "return",
                                e.arg = r,
                                T(t, e),
                                "throw" === e.method))
                                    return y;
                                e.method = "throw",
                                e.arg = new TypeError("The iterator does not provide a 'throw' method")
                            }
                            return y
                        }
                        var o = x(n, t.iterator, e.arg);
                        if ("throw" === o.type)
                            return e.method = "throw",
                            e.arg = o.arg,
                            e.delegate = null,
                            y;
                        var i = o.arg;
                        return i ? i.done ? (e[t.resultName] = i.value,
                        e.next = t.nextLoc,
                        "return" !== e.method && (e.method = "next",
                        e.arg = r),
                        e.delegate = null,
                        y) : i : (e.method = "throw",
                        e.arg = new TypeError("iterator result is not an object"),
                        e.delegate = null,
                        y)
                    }
                    function S(t) {
                        var e = {
                            tryLoc: t[0]
                        };
                        1 in t && (e.catchLoc = t[1]),
                        2 in t && (e.finallyLoc = t[2],
                        e.afterLoc = t[3]),
                        this.tryEntries.push(e)
                    }
                    function L(t) {
                        var e = t.completion || {};
                        e.type = "normal",
                        delete e.arg,
                        t.completion = e
                    }
                    function A(t) {
                        this.tryEntries = [{
                            tryLoc: "root"
                        }],
                        t.forEach(S, this),
                        this.reset(!0)
                    }
                    function k(t) {
                        if (t) {
                            var e = t[s];
                            if (e)
                                return e.call(t);
                            if ("function" == typeof t.next)
                                return t;
                            if (!isNaN(t.length)) {
                                var n = -1
                                  , i = function e() {
                                    for (; ++n < t.length; )
                                        if (o.call(t, n))
                                            return e.value = t[n],
                                            e.done = !1,
                                            e;
                                    return e.value = r,
                                    e.done = !0,
                                    e
                                };
                                return i.next = i
                            }
                        }
                        return {
                            next: B
                        }
                    }
                    function B() {
                        return {
                            value: r,
                            done: !0
                        }
                    }
                }("object" == typeof e ? e : "object" == typeof window ? window : "object" == typeof self ? self : this)
            }
            ).call(this, r(13))
        },
        114: function(t, e, r) {
            "use strict";
            var n = r(16)
              , o = r(50)
              , i = r(68);
            n(n.S, "Promise", {
                try: function(t) {
                    var e = o.f(this)
                      , r = i(t);
                    return (r.e ? e.reject : e.resolve)(r.v),
                    e.promise
                }
            })
        },
        115: function(t, e, r) {
            "use strict";
            var n = r(16)
              , o = r(6)
              , i = r(3)
              , s = r(70)
              , a = r(67);
            n(n.P + n.R, "Promise", {
                finally: function(t) {
                    var e = s(this, o.Promise || i.Promise)
                      , r = "function" == typeof t;
                    return this.then(r ? function(r) {
                        return a(e, t()).then(function() {
                            return r
                        })
                    }
                    : t, r ? function(r) {
                        return a(e, t()).then(function() {
                            throw r
                        })
                    }
                    : t)
                }
            })
        },
        116: function(t, e, r) {
            var n = r(4)("iterator")
              , o = !1;
            try {
                var i = [7][n]();
                i.return = function() {
                    o = !0
                }
                ,
                Array.from(i, function() {
                    throw 2
                })
            } catch (t) {}
            t.exports = function(t, e) {
                if (!e && !o)
                    return !1;
                var r = !1;
                try {
                    var i = [7]
                      , s = i[n]();
                    s.next = function() {
                        return {
                            done: r = !0
                        }
                    }
                    ,
                    i[n] = function() {
                        return s
                    }
                    ,
                    t(i)
                } catch (t) {}
                return r
            }
        },
        117: function(t, e, r) {
            "use strict";
            var n = r(3)
              , o = r(6)
              , i = r(23)
              , s = r(18)
              , a = r(4)("species");
            t.exports = function(t) {
                var e = "function" == typeof o[t] ? o[t] : n[t];
                s && e && !e[a] && i.f(e, a, {
                    configurable: !0,
                    get: function() {
                        return this
                    }
                })
            }
        },
        118: function(t, e, r) {
            var n = r(15);
            t.exports = function(t, e, r) {
                for (var o in e)
                    r && t[o] ? t[o] = e[o] : n(t, o, e[o]);
                return t
            }
        },
        119: function(t, e, r) {
            var n = r(3).navigator;
            t.exports = n && n.userAgent || ""
        },
        120: function(t, e, r) {
            var n = r(3)
              , o = r(69).set
              , i = n.MutationObserver || n.WebKitMutationObserver
              , s = n.process
              , a = n.Promise
              , u = "process" == r(31)(s);
            t.exports = function() {
                var t, e, r, c = function() {
                    var n, o;
                    for (u && (n = s.domain) && n.exit(); t; ) {
                        o = t.fn,
                        t = t.next;
                        try {
                            o()
                        } catch (n) {
                            throw t ? r() : e = void 0,
                            n
                        }
                    }
                    e = void 0,
                    n && n.enter()
                };
                if (u)
                    r = function() {
                        s.nextTick(c)
                    }
                    ;
                else if (!i || n.navigator && n.navigator.standalone)
                    if (a && a.resolve) {
                        var f = a.resolve(void 0);
                        r = function() {
                            f.then(c)
                        }
                    } else
                        r = function() {
                            o.call(n, c)
                        }
                        ;
                else {
                    var l = !0
                      , h = document.createTextNode("");
                    new i(c).observe(h, {
                        characterData: !0
                    }),
                    r = function() {
                        h.data = l = !l
                    }
                }
                return function(n) {
                    var o = {
                        fn: n,
                        next: void 0
                    };
                    e && (e.next = o),
                    t || (t = o,
                    r()),
                    e = o
                }
            }
        },
        121: function(t, e) {
            t.exports = function(t, e, r) {
                var n = void 0 === r;
                switch (e.length) {
                case 0:
                    return n ? t() : t.call(r);
                case 1:
                    return n ? t(e[0]) : t.call(r, e[0]);
                case 2:
                    return n ? t(e[0], e[1]) : t.call(r, e[0], e[1]);
                case 3:
                    return n ? t(e[0], e[1], e[2]) : t.call(r, e[0], e[1], e[2]);
                case 4:
                    return n ? t(e[0], e[1], e[2], e[3]) : t.call(r, e[0], e[1], e[2], e[3])
                }
                return t.apply(r, e)
            }
        },
        122: function(t, e, r) {
            var n = r(71)
              , o = r(4)("iterator")
              , i = r(29);
            t.exports = r(6).getIteratorMethod = function(t) {
                if (void 0 != t)
                    return t[o] || t["@@iterator"] || i[n(t)]
            }
        },
        123: function(t, e, r) {
            var n = r(29)
              , o = r(4)("iterator")
              , i = Array.prototype;
            t.exports = function(t) {
                return void 0 !== t && (n.Array === t || i[o] === t)
            }
        },
        124: function(t, e, r) {
            var n = r(10);
            t.exports = function(t, e, r, o) {
                try {
                    return o ? e(n(r)[0], r[1]) : e(r)
                } catch (e) {
                    var i = t.return;
                    throw void 0 !== i && n(i.call(t)),
                    e
                }
            }
        },
        125: function(t, e, r) {
            var n = r(32)
              , o = r(124)
              , i = r(123)
              , s = r(10)
              , a = r(75)
              , u = r(122)
              , c = {}
              , f = {};
            (e = t.exports = function(t, e, r, l, h) {
                var p, d, y, v, m = h ? function() {
                    return t
                }
                : u(t), b = n(r, l, e ? 2 : 1), w = 0;
                if ("function" != typeof m)
                    throw TypeError(t + " is not iterable!");
                if (i(m)) {
                    for (p = a(t.length); p > w; w++)
                        if ((v = e ? b(s(d = t[w])[0], d[1]) : b(t[w])) === c || v === f)
                            return v
                } else
                    for (y = m.call(t); !(d = y.next()).done; )
                        if ((v = o(y, b, d.value, e)) === c || v === f)
                            return v
            }
            ).BREAK = c,
            e.RETURN = f
        },
        126: function(t, e) {
            t.exports = function(t, e, r, n) {
                if (!(t instanceof e) || void 0 !== n && n in t)
                    throw TypeError(r + ": incorrect invocation!");
                return t
            }
        },
        127: function(t, e, r) {
            "use strict";
            var n, o, i, s, a = r(33), u = r(3), c = r(32), f = r(71), l = r(16), h = r(14), p = r(36), d = r(126), y = r(125), v = r(70), m = r(69).set, b = r(120)(), w = r(50), g = r(68), x = r(119), _ = r(67), j = u.TypeError, E = u.process, P = E && E.versions, O = P && P.v8 || "", T = u.Promise, S = "process" == f(E), L = function() {}, A = o = w.f, k = !!function() {
                try {
                    var t = T.resolve(1)
                      , e = (t.constructor = {})[r(4)("species")] = function(t) {
                        t(L, L)
                    }
                    ;
                    return (S || "function" == typeof PromiseRejectionEvent) && t.then(L)instanceof e && 0 !== O.indexOf("6.6") && -1 === x.indexOf("Chrome/66")
                } catch (t) {}
            }(), B = function(t) {
                var e;
                return !(!h(t) || "function" != typeof (e = t.then)) && e
            }, R = function(t, e) {
                if (!t._n) {
                    t._n = !0;
                    var r = t._c;
                    b(function() {
                        for (var n = t._v, o = 1 == t._s, i = 0, s = function(e) {
                            var r, i, s, a = o ? e.ok : e.fail, u = e.resolve, c = e.reject, f = e.domain;
                            try {
                                a ? (o || (2 == t._h && F(t),
                                t._h = 1),
                                !0 === a ? r = n : (f && f.enter(),
                                r = a(n),
                                f && (f.exit(),
                                s = !0)),
                                r === e.promise ? c(j("Promise-chain cycle")) : (i = B(r)) ? i.call(r, u, c) : u(r)) : c(n)
                            } catch (t) {
                                f && !s && f.exit(),
                                c(t)
                            }
                        }; r.length > i; )
                            s(r[i++]);
                        t._c = [],
                        t._n = !1,
                        e && !t._h && M(t)
                    })
                }
            }, M = function(t) {
                m.call(u, function() {
                    var e, r, n, o = t._v, i = I(t);
                    if (i && (e = g(function() {
                        S ? E.emit("unhandledRejection", o, t) : (r = u.onunhandledrejection) ? r({
                            promise: t,
                            reason: o
                        }) : (n = u.console) && n.error && n.error("Unhandled promise rejection", o)
                    }),
                    t._h = S || I(t) ? 2 : 1),
                    t._a = void 0,
                    i && e.e)
                        throw e.v
                })
            }, I = function(t) {
                return 1 !== t._h && 0 === (t._a || t._c).length
            }, F = function(t) {
                m.call(u, function() {
                    var e;
                    S ? E.emit("rejectionHandled", t) : (e = u.onrejectionhandled) && e({
                        promise: t,
                        reason: t._v
                    })
                })
            }, C = function(t) {
                var e = this;
                e._d || (e._d = !0,
                (e = e._w || e)._v = t,
                e._s = 2,
                e._a || (e._a = e._c.slice()),
                R(e, !0))
            }, U = function(t) {
                var e, r = this;
                if (!r._d) {
                    r._d = !0,
                    r = r._w || r;
                    try {
                        if (r === t)
                            throw j("Promise can't be resolved itself");
                        (e = B(t)) ? b(function() {
                            var n = {
                                _w: r,
                                _d: !1
                            };
                            try {
                                e.call(t, c(U, n, 1), c(C, n, 1))
                            } catch (t) {
                                C.call(n, t)
                            }
                        }) : (r._v = t,
                        r._s = 1,
                        R(r, !1))
                    } catch (t) {
                        C.call({
                            _w: r,
                            _d: !1
                        }, t)
                    }
                }
            };
            k || (T = function(t) {
                d(this, T, "Promise", "_h"),
                p(t),
                n.call(this);
                try {
                    t(c(U, this, 1), c(C, this, 1))
                } catch (t) {
                    C.call(this, t)
                }
            }
            ,
            (n = function(t) {
                this._c = [],
                this._a = void 0,
                this._s = 0,
                this._d = !1,
                this._v = void 0,
                this._h = 0,
                this._n = !1
            }
            ).prototype = r(118)(T.prototype, {
                then: function(t, e) {
                    var r = A(v(this, T));
                    return r.ok = "function" != typeof t || t,
                    r.fail = "function" == typeof e && e,
                    r.domain = S ? E.domain : void 0,
                    this._c.push(r),
                    this._a && this._a.push(r),
                    this._s && R(this, !1),
                    r.promise
                },
                catch: function(t) {
                    return this.then(void 0, t)
                }
            }),
            i = function() {
                var t = new n;
                this.promise = t,
                this.resolve = c(U, t, 1),
                this.reject = c(C, t, 1)
            }
            ,
            w.f = A = function(t) {
                return t === T || t === s ? new i(t) : o(t)
            }
            ),
            l(l.G + l.W + l.F * !k, {
                Promise: T
            }),
            r(38)(T, "Promise"),
            r(117)("Promise"),
            s = r(6).Promise,
            l(l.S + l.F * !k, "Promise", {
                reject: function(t) {
                    var e = A(this);
                    return (0,
                    e.reject)(t),
                    e.promise
                }
            }),
            l(l.S + l.F * (a || !k), "Promise", {
                resolve: function(t) {
                    return _(a && this === s ? T : this, t)
                }
            }),
            l(l.S + l.F * !(k && r(116)(function(t) {
                T.all(t).catch(L)
            })), "Promise", {
                all: function(t) {
                    var e = this
                      , r = A(e)
                      , n = r.resolve
                      , o = r.reject
                      , i = g(function() {
                        var r = []
                          , i = 0
                          , s = 1;
                        y(t, !1, function(t) {
                            var a = i++
                              , u = !1;
                            r.push(void 0),
                            s++,
                            e.resolve(t).then(function(t) {
                                u || (u = !0,
                                r[a] = t,
                                --s || n(r))
                            }, o)
                        }),
                        --s || n(r)
                    });
                    return i.e && o(i.v),
                    r.promise
                },
                race: function(t) {
                    var e = this
                      , r = A(e)
                      , n = r.reject
                      , o = g(function() {
                        y(t, !1, function(t) {
                            e.resolve(t).then(r.resolve, n)
                        })
                    });
                    return o.e && n(o.v),
                    r.promise
                }
            })
        },
        128: function(t, e) {
            t.exports = function(t, e) {
                return {
                    value: e,
                    done: !!t
                }
            }
        },
        129: function(t, e) {
            t.exports = function() {}
        },
        13: function(t, e) {
            var r;
            r = function() {
                return this
            }();
            try {
                r = r || Function("return this")() || (0,
                eval)("this")
            } catch (t) {
                "object" == typeof window && (r = window)
            }
            t.exports = r
        },
        130: function(t, e, r) {
            "use strict";
            var n = r(129)
              , o = r(128)
              , i = r(29)
              , s = r(30);
            t.exports = r(73)(Array, "Array", function(t, e) {
                this._t = s(t),
                this._i = 0,
                this._k = e
            }, function() {
                var t = this._t
                  , e = this._k
                  , r = this._i++;
                return !t || r >= t.length ? (this._t = void 0,
                o(1)) : o(0, "keys" == e ? r : "values" == e ? t[r] : [r, t[r]])
            }, "values"),
            i.Arguments = i.Array,
            n("keys"),
            n("values"),
            n("entries")
        },
        131: function(t, e, r) {
            var n = r(22)
              , o = r(86)
              , i = r(51)("IE_PROTO")
              , s = Object.prototype;
            t.exports = Object.getPrototypeOf || function(t) {
                return t = o(t),
                n(t, i) ? t[i] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? s : null
            }
        },
        132: function(t, e, r) {
            var n = r(23)
              , o = r(10)
              , i = r(55);
            t.exports = r(18) ? Object.defineProperties : function(t, e) {
                o(t);
                for (var r, s = i(e), a = s.length, u = 0; a > u; )
                    n.f(t, r = s[u++], e[r]);
                return t
            }
        },
        133: function(t, e, r) {
            "use strict";
            var n = r(63)
              , o = r(44)
              , i = r(38)
              , s = {};
            r(15)(s, r(4)("iterator"), function() {
                return this
            }),
            t.exports = function(t, e, r) {
                t.prototype = n(s, {
                    next: o(1, r)
                }),
                i(t, e + " Iterator")
            }
        },
        134: function(t, e, r) {
            var n = r(52)
              , o = r(53);
            t.exports = function(t) {
                return function(e, r) {
                    var i, s, a = String(o(e)), u = n(r), c = a.length;
                    return u < 0 || u >= c ? t ? "" : void 0 : (i = a.charCodeAt(u)) < 55296 || i > 56319 || u + 1 === c || (s = a.charCodeAt(u + 1)) < 56320 || s > 57343 ? t ? a.charAt(u) : i : t ? a.slice(u, u + 2) : s - 56320 + (i - 55296 << 10) + 65536
                }
            }
        },
        135: function(t, e, r) {
            r(85),
            r(84),
            r(82),
            r(127),
            r(115),
            r(114),
            t.exports = r(6).Promise
        },
        136: function(t, e, r) {
            t.exports = {
                default: r(135),
                __esModule: !0
            }
        },
        137: function(t, e, r) {
            (function(e) {
                var n = "object" == typeof e ? e : "object" == typeof window ? window : "object" == typeof self ? self : this
                  , o = n.regeneratorRuntime && Object.getOwnPropertyNames(n).indexOf("regeneratorRuntime") >= 0
                  , i = o && n.regeneratorRuntime;
                if (n.regeneratorRuntime = void 0,
                t.exports = r(107),
                o)
                    n.regeneratorRuntime = i;
                else
                    try {
                        delete n.regeneratorRuntime
                    } catch (t) {
                        n.regeneratorRuntime = void 0
                    }
            }
            ).call(this, r(13))
        },
        138: function(t, e, r) {
            var n = r(52)
              , o = Math.max
              , i = Math.min;
            t.exports = function(t, e) {
                return (t = n(t)) < 0 ? o(t + e, 0) : i(t, e)
            }
        },
        139: function(t, e, r) {
            var n = r(30)
              , o = r(75)
              , i = r(138);
            t.exports = function(t) {
                return function(e, r, s) {
                    var a, u = n(e), c = o(u.length), f = i(s, c);
                    if (t && r != r) {
                        for (; c > f; )
                            if ((a = u[f++]) != a)
                                return !0
                    } else
                        for (; c > f; f++)
                            if ((t || f in u) && u[f] === r)
                                return t || f || 0;
                    return !t && -1
                }
            }
        },
        14: function(t, e) {
            t.exports = function(t) {
                return "object" == typeof t ? null !== t : "function" == typeof t
            }
        },
        15: function(t, e, r) {
            var n = r(23)
              , o = r(44);
            t.exports = r(18) ? function(t, e, r) {
                return n.f(t, e, o(1, r))
            }
            : function(t, e, r) {
                return t[e] = r,
                t
            }
        },
        16: function(t, e, r) {
            var n = r(3)
              , o = r(6)
              , i = r(32)
              , s = r(15)
              , a = r(22)
              , u = function(t, e, r) {
                var c, f, l, h = t & u.F, p = t & u.G, d = t & u.S, y = t & u.P, v = t & u.B, m = t & u.W, b = p ? o : o[e] || (o[e] = {}), w = b.prototype, g = p ? n : d ? n[e] : (n[e] || {}).prototype;
                for (c in p && (r = e),
                r)
                    (f = !h && g && void 0 !== g[c]) && a(b, c) || (l = f ? g[c] : r[c],
                    b[c] = p && "function" != typeof g[c] ? r[c] : v && f ? i(l, n) : m && g[c] == l ? function(t) {
                        var e = function(e, r, n) {
                            if (this instanceof t) {
                                switch (arguments.length) {
                                case 0:
                                    return new t;
                                case 1:
                                    return new t(e);
                                case 2:
                                    return new t(e,r)
                                }
                                return new t(e,r,n)
                            }
                            return t.apply(this, arguments)
                        };
                        return e.prototype = t.prototype,
                        e
                    }(l) : y && "function" == typeof l ? i(Function.call, l) : l,
                    y && ((b.virtual || (b.virtual = {}))[c] = l,
                    t & u.R && w && !w[c] && s(w, c, l)))
            };
            u.F = 1,
            u.G = 2,
            u.S = 4,
            u.P = 8,
            u.B = 16,
            u.W = 32,
            u.U = 64,
            u.R = 128,
            t.exports = u
        },
        18: function(t, e, r) {
            t.exports = !r(37)(function() {
                return 7 != Object.defineProperty({}, "a", {
                    get: function() {
                        return 7
                    }
                }).a
            })
        },
        2: function(t, e, r) {
            "use strict";
            e.__esModule = !0;
            var n, o = r(136), i = (n = o) && n.__esModule ? n : {
                default: n
            };
            e.default = function(t) {
                return function() {
                    var e = t.apply(this, arguments);
                    return new i.default(function(t, r) {
                        return function n(o, s) {
                            try {
                                var a = e[o](s)
                                  , u = a.value
                            } catch (t) {
                                return void r(t)
                            }
                            if (!a.done)
                                return i.default.resolve(u).then(function(t) {
                                    n("next", t)
                                }, function(t) {
                                    n("throw", t)
                                });
                            t(u)
                        }("next")
                    }
                    )
                }
            }
        },
        22: function(t, e) {
            var r = {}.hasOwnProperty;
            t.exports = function(t, e) {
                return r.call(t, e)
            }
        },
        23: function(t, e, r) {
            var n = r(10)
              , o = r(89)
              , i = r(64)
              , s = Object.defineProperty;
            e.f = r(18) ? Object.defineProperty : function(t, e, r) {
                if (n(t),
                e = i(e, !0),
                n(r),
                o)
                    try {
                        return s(t, e, r)
                    } catch (t) {}
                if ("get"in r || "set"in r)
                    throw TypeError("Accessors not supported!");
                return "value"in r && (t[e] = r.value),
                t
            }
        },
        255: function(t, e, r) {},
        29: function(t, e) {
            t.exports = {}
        },
        3: function(t, e) {
            var r = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
            "number" == typeof __g && (__g = r)
        },
        30: function(t, e, r) {
            var n = r(87)
              , o = r(53);
            t.exports = function(t) {
                return n(o(t))
            }
        },
        31: function(t, e) {
            var r = {}.toString;
            t.exports = function(t) {
                return r.call(t).slice(8, -1)
            }
        },
        32: function(t, e, r) {
            var n = r(36);
            t.exports = function(t, e, r) {
                if (n(t),
                void 0 === e)
                    return t;
                switch (r) {
                case 1:
                    return function(r) {
                        return t.call(e, r)
                    }
                    ;
                case 2:
                    return function(r, n) {
                        return t.call(e, r, n)
                    }
                    ;
                case 3:
                    return function(r, n, o) {
                        return t.call(e, r, n, o)
                    }
                }
                return function() {
                    return t.apply(e, arguments)
                }
            }
        },
        33: function(t, e) {
            t.exports = !0
        },
        36: function(t, e) {
            t.exports = function(t) {
                if ("function" != typeof t)
                    throw TypeError(t + " is not a function!");
                return t
            }
        },
        37: function(t, e) {
            t.exports = function(t) {
                try {
                    return !!t()
                } catch (t) {
                    return !0
                }
            }
        },
        38: function(t, e, r) {
            var n = r(23).f
              , o = r(22)
              , i = r(4)("toStringTag");
            t.exports = function(t, e, r) {
                t && !o(t = r ? t : t.prototype, i) && n(t, i, {
                    configurable: !0,
                    value: e
                })
            }
        },
        4: function(t, e, r) {
            var n = r(59)("wks")
              , o = r(43)
              , i = r(3).Symbol
              , s = "function" == typeof i;
            (t.exports = function(t) {
                return n[t] || (n[t] = s && i[t] || (s ? i : o)("Symbol." + t))
            }
            ).store = n
        },
        43: function(t, e) {
            var r = 0
              , n = Math.random();
            t.exports = function(t) {
                return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++r + n).toString(36))
            }
        },
        430: function(t, e, r) {
            "use strict";
            var n = s(r(1))
              , o = s(r(2))
              , i = r(81);
            s(r(255));
            function s(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            var a, u = void 0, c = (a = (0,
            o.default)(n.default.mark(function t() {
                return n.default.wrap(function(t) {
                    for (; ; )
                        switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2,
                            (0,
                            i.httpRequest)("./data/config.json", "json");
                        case 2:
                            u = t.sent,
                            window.top.postMessage("usb-permissions-init", "*");
                        case 4:
                        case "end":
                            return t.stop()
                        }
                }, t, void 0)
            })),
            function() {
                return a.apply(this, arguments)
            }
            );
            window.addEventListener("load", c, !1),
            window.addEventListener("message", function t(e) {
                var r = e.data;
                if (r && "usb-permissions-init" === r.type) {
                    window.removeEventListener("message", t, !1);
                    var i = u.knownHosts.find(function(t) {
                        return t.origin === r.extension
                    });
                    !function(t) {
                        document.getElementsByClassName("extension-name")[0].innerText = t;
                        var e = document.getElementsByClassName("confirm")[0]
                          , r = document.getElementsByClassName("cancel")[0];
                        e.onclick = (0,
                        o.default)(n.default.mark(function t() {
                            var e, r;
                            return n.default.wrap(function(t) {
                                for (; ; )
                                    switch (t.prev = t.next) {
                                    case 0:
                                        if (e = u.webusb.map(function(t) {
                                            return {
                                                vendorId: parseInt(t.vendorId),
                                                productId: parseInt(t.productId)
                                            }
                                        }),
                                        !(r = navigator.usb)) {
                                            t.next = 12;
                                            break
                                        }
                                        return t.prev = 3,
                                        t.next = 6,
                                        r.requestDevice({
                                            filters: e
                                        });
                                    case 6:
                                        window.top.postMessage("usb-permissions-close", "*"),
                                        t.next = 12;
                                        break;
                                    case 9:
                                        t.prev = 9,
                                        t.t0 = t.catch(3),
                                        console.log("Webusb", t.t0);
                                    case 12:
                                    case "end":
                                        return t.stop()
                                    }
                            }, t, void 0, [[3, 9]])
                        })),
                        r.onclick = function() {
                            window.top.postMessage("usb-permissions-close", "*")
                        }
                    }(i && i.label ? i.label : e.origin)
                }
            }, !1)
        },
        44: function(t, e) {
            t.exports = function(t, e) {
                return {
                    enumerable: !(1 & t),
                    configurable: !(2 & t),
                    writable: !(4 & t),
                    value: e
                }
            }
        },
        50: function(t, e, r) {
            "use strict";
            var n = r(36);
            t.exports.f = function(t) {
                return new function(t) {
                    var e, r;
                    this.promise = new t(function(t, n) {
                        if (void 0 !== e || void 0 !== r)
                            throw TypeError("Bad Promise constructor");
                        e = t,
                        r = n
                    }
                    ),
                    this.resolve = n(e),
                    this.reject = n(r)
                }
                (t)
            }
        },
        51: function(t, e, r) {
            var n = r(59)("keys")
              , o = r(43);
            t.exports = function(t) {
                return n[t] || (n[t] = o(t))
            }
        },
        52: function(t, e) {
            var r = Math.ceil
              , n = Math.floor;
            t.exports = function(t) {
                return isNaN(t = +t) ? 0 : (t > 0 ? n : r)(t)
            }
        },
        53: function(t, e) {
            t.exports = function(t) {
                if (void 0 == t)
                    throw TypeError("Can't call method on  " + t);
                return t
            }
        },
        54: function(t, e, r) {
            var n = r(14)
              , o = r(3).document
              , i = n(o) && n(o.createElement);
            t.exports = function(t) {
                return i ? o.createElement(t) : {}
            }
        },
        55: function(t, e, r) {
            var n = r(88)
              , o = r(58);
            t.exports = Object.keys || function(t) {
                return n(t, o)
            }
        },
        58: function(t, e) {
            t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
        },
        59: function(t, e, r) {
            var n = r(6)
              , o = r(3)
              , i = o["__core-js_shared__"] || (o["__core-js_shared__"] = {});
            (t.exports = function(t, e) {
                return i[t] || (i[t] = void 0 !== e ? e : {})
            }
            )("versions", []).push({
                version: n.version,
                mode: r(33) ? "pure" : "global",
                copyright: "© 2018 Denis Pushkarev (zloirock.ru)"
            })
        },
        6: function(t, e) {
            var r = t.exports = {
                version: "2.5.7"
            };
            "number" == typeof __e && (__e = r)
        },
        63: function(t, e, r) {
            var n = r(10)
              , o = r(132)
              , i = r(58)
              , s = r(51)("IE_PROTO")
              , a = function() {}
              , u = function() {
                var t, e = r(54)("iframe"), n = i.length;
                for (e.style.display = "none",
                r(72).appendChild(e),
                e.src = "javascript:",
                (t = e.contentWindow.document).open(),
                t.write("<script>document.F=Object<\/script>"),
                t.close(),
                u = t.F; n--; )
                    delete u.prototype[i[n]];
                return u()
            };
            t.exports = Object.create || function(t, e) {
                var r;
                return null !== t ? (a.prototype = n(t),
                r = new a,
                a.prototype = null,
                r[s] = t) : r = u(),
                void 0 === e ? r : o(r, e)
            }
        },
        64: function(t, e, r) {
            var n = r(14);
            t.exports = function(t, e) {
                if (!n(t))
                    return t;
                var r, o;
                if (e && "function" == typeof (r = t.toString) && !n(o = r.call(t)))
                    return o;
                if ("function" == typeof (r = t.valueOf) && !n(o = r.call(t)))
                    return o;
                if (!e && "function" == typeof (r = t.toString) && !n(o = r.call(t)))
                    return o;
                throw TypeError("Can't convert object to primitive value")
            }
        },
        67: function(t, e, r) {
            var n = r(10)
              , o = r(14)
              , i = r(50);
            t.exports = function(t, e) {
                if (n(t),
                o(e) && e.constructor === t)
                    return e;
                var r = i.f(t);
                return (0,
                r.resolve)(e),
                r.promise
            }
        },
        68: function(t, e) {
            t.exports = function(t) {
                try {
                    return {
                        e: !1,
                        v: t()
                    }
                } catch (t) {
                    return {
                        e: !0,
                        v: t
                    }
                }
            }
        },
        69: function(t, e, r) {
            var n, o, i, s = r(32), a = r(121), u = r(72), c = r(54), f = r(3), l = f.process, h = f.setImmediate, p = f.clearImmediate, d = f.MessageChannel, y = f.Dispatch, v = 0, m = {}, b = function() {
                var t = +this;
                if (m.hasOwnProperty(t)) {
                    var e = m[t];
                    delete m[t],
                    e()
                }
            }, w = function(t) {
                b.call(t.data)
            };
            h && p || (h = function(t) {
                for (var e = [], r = 1; arguments.length > r; )
                    e.push(arguments[r++]);
                return m[++v] = function() {
                    a("function" == typeof t ? t : Function(t), e)
                }
                ,
                n(v),
                v
            }
            ,
            p = function(t) {
                delete m[t]
            }
            ,
            "process" == r(31)(l) ? n = function(t) {
                l.nextTick(s(b, t, 1))
            }
            : y && y.now ? n = function(t) {
                y.now(s(b, t, 1))
            }
            : d ? (i = (o = new d).port2,
            o.port1.onmessage = w,
            n = s(i.postMessage, i, 1)) : f.addEventListener && "function" == typeof postMessage && !f.importScripts ? (n = function(t) {
                f.postMessage(t + "", "*")
            }
            ,
            f.addEventListener("message", w, !1)) : n = "onreadystatechange"in c("script") ? function(t) {
                u.appendChild(c("script")).onreadystatechange = function() {
                    u.removeChild(this),
                    b.call(t)
                }
            }
            : function(t) {
                setTimeout(s(b, t, 1), 0)
            }
            ),
            t.exports = {
                set: h,
                clear: p
            }
        },
        70: function(t, e, r) {
            var n = r(10)
              , o = r(36)
              , i = r(4)("species");
            t.exports = function(t, e) {
                var r, s = n(t).constructor;
                return void 0 === s || void 0 == (r = n(s)[i]) ? e : o(r)
            }
        },
        71: function(t, e, r) {
            var n = r(31)
              , o = r(4)("toStringTag")
              , i = "Arguments" == n(function() {
                return arguments
            }());
            t.exports = function(t) {
                var e, r, s;
                return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof (r = function(t, e) {
                    try {
                        return t[e]
                    } catch (t) {}
                }(e = Object(t), o)) ? r : i ? n(e) : "Object" == (s = n(e)) && "function" == typeof e.callee ? "Arguments" : s
            }
        },
        72: function(t, e, r) {
            var n = r(3).document;
            t.exports = n && n.documentElement
        },
        73: function(t, e, r) {
            "use strict";
            var n = r(33)
              , o = r(16)
              , i = r(83)
              , s = r(15)
              , a = r(29)
              , u = r(133)
              , c = r(38)
              , f = r(131)
              , l = r(4)("iterator")
              , h = !([].keys && "next"in [].keys())
              , p = function() {
                return this
            };
            t.exports = function(t, e, r, d, y, v, m) {
                u(r, e, d);
                var b, w, g, x = function(t) {
                    if (!h && t in P)
                        return P[t];
                    switch (t) {
                    case "keys":
                    case "values":
                        return function() {
                            return new r(this,t)
                        }
                    }
                    return function() {
                        return new r(this,t)
                    }
                }, _ = e + " Iterator", j = "values" == y, E = !1, P = t.prototype, O = P[l] || P["@@iterator"] || y && P[y], T = O || x(y), S = y ? j ? x("entries") : T : void 0, L = "Array" == e && P.entries || O;
                if (L && (g = f(L.call(new t))) !== Object.prototype && g.next && (c(g, _, !0),
                n || "function" == typeof g[l] || s(g, l, p)),
                j && O && "values" !== O.name && (E = !0,
                T = function() {
                    return O.call(this)
                }
                ),
                n && !m || !h && !E && P[l] || s(P, l, T),
                a[e] = T,
                a[_] = p,
                y)
                    if (b = {
                        values: j ? T : x("values"),
                        keys: v ? T : x("keys"),
                        entries: S
                    },
                    m)
                        for (w in b)
                            w in P || i(P, w, b[w]);
                    else
                        o(o.P + o.F * (h || E), e, b);
                return b
            }
        },
        75: function(t, e, r) {
            var n = r(52)
              , o = Math.min;
            t.exports = function(t) {
                return t > 0 ? o(n(t), 9007199254740991) : 0
            }
        },
        81: function(t, e, r) {
            "use strict";
            e.__esModule = !0,
            e.getOrigin = e.httpRequest = void 0;
            var n = i(r(1))
              , o = i(r(2));
            function i(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            r(94);
            var s;
            e.httpRequest = (s = (0,
            o.default)(n.default.mark(function t(e) {
                var r, o, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "text";
                return n.default.wrap(function(t) {
                    for (; ; )
                        switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2,
                            fetch(e, {
                                credentials: "same-origin"
                            });
                        case 2:
                            if (!(r = t.sent).ok) {
                                t.next = 22;
                                break
                            }
                            if ("json" !== i) {
                                t.next = 11;
                                break
                            }
                            return t.next = 7,
                            r.text();
                        case 7:
                            return o = t.sent,
                            t.abrupt("return", JSON.parse(o));
                        case 11:
                            if ("binary" !== i) {
                                t.next = 17;
                                break
                            }
                            return t.next = 14,
                            r.arrayBuffer();
                        case 14:
                            return t.abrupt("return", t.sent);
                        case 17:
                            return t.next = 19,
                            r.text();
                        case 19:
                            return t.abrupt("return", t.sent);
                        case 20:
                            t.next = 23;
                            break;
                        case 22:
                            throw new Error("httpRequest error: " + e + " " + r.statusText);
                        case 23:
                        case "end":
                            return t.stop()
                        }
                }, t, void 0)
            })),
            function(t) {
                return s.apply(this, arguments)
            }
            ),
            e.getOrigin = function(t) {
                var e = t.match(/^.+\:\/\/[^\/]+/);
                return Array.isArray(e) && e.length > 0 ? e[0] : "unknown"
            }
        },
        82: function(t, e, r) {
            r(130);
            for (var n = r(3), o = r(15), i = r(29), s = r(4)("toStringTag"), a = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), u = 0; u < a.length; u++) {
                var c = a[u]
                  , f = n[c]
                  , l = f && f.prototype;
                l && !l[s] && o(l, s, c),
                i[c] = i.Array
            }
        },
        83: function(t, e, r) {
            t.exports = r(15)
        },
        84: function(t, e, r) {
            "use strict";
            var n = r(134)(!0);
            r(73)(String, "String", function(t) {
                this._t = String(t),
                this._i = 0
            }, function() {
                var t, e = this._t, r = this._i;
                return r >= e.length ? {
                    value: void 0,
                    done: !0
                } : (t = n(e, r),
                this._i += t.length,
                {
                    value: t,
                    done: !1
                })
            })
        },
        85: function(t, e) {},
        86: function(t, e, r) {
            var n = r(53);
            t.exports = function(t) {
                return Object(n(t))
            }
        },
        87: function(t, e, r) {
            var n = r(31);
            t.exports = Object("z").propertyIsEnumerable(0) ? Object : function(t) {
                return "String" == n(t) ? t.split("") : Object(t)
            }
        },
        88: function(t, e, r) {
            var n = r(22)
              , o = r(30)
              , i = r(139)(!1)
              , s = r(51)("IE_PROTO");
            t.exports = function(t, e) {
                var r, a = o(t), u = 0, c = [];
                for (r in a)
                    r != s && n(a, r) && c.push(r);
                for (; e.length > u; )
                    n(a, r = e[u++]) && (~i(c, r) || c.push(r));
                return c
            }
        },
        89: function(t, e, r) {
            t.exports = !r(18) && !r(37)(function() {
                return 7 != Object.defineProperty(r(54)("div"), "a", {
                    get: function() {
                        return 7
                    }
                }).a
            })
        },
        94: function(t, e) {
            !function(t) {
                "use strict";
                if (!t.fetch) {
                    var e = {
                        searchParams: "URLSearchParams"in t,
                        iterable: "Symbol"in t && "iterator"in Symbol,
                        blob: "FileReader"in t && "Blob"in t && function() {
                            try {
                                return new Blob,
                                !0
                            } catch (t) {
                                return !1
                            }
                        }(),
                        formData: "FormData"in t,
                        arrayBuffer: "ArrayBuffer"in t
                    };
                    if (e.arrayBuffer)
                        var r = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"]
                          , n = function(t) {
                            return t && DataView.prototype.isPrototypeOf(t)
                        }
                          , o = ArrayBuffer.isView || function(t) {
                            return t && r.indexOf(Object.prototype.toString.call(t)) > -1
                        }
                        ;
                    f.prototype.append = function(t, e) {
                        t = a(t),
                        e = u(e);
                        var r = this.map[t];
                        this.map[t] = r ? r + "," + e : e
                    }
                    ,
                    f.prototype.delete = function(t) {
                        delete this.map[a(t)]
                    }
                    ,
                    f.prototype.get = function(t) {
                        return t = a(t),
                        this.has(t) ? this.map[t] : null
                    }
                    ,
                    f.prototype.has = function(t) {
                        return this.map.hasOwnProperty(a(t))
                    }
                    ,
                    f.prototype.set = function(t, e) {
                        this.map[a(t)] = u(e)
                    }
                    ,
                    f.prototype.forEach = function(t, e) {
                        for (var r in this.map)
                            this.map.hasOwnProperty(r) && t.call(e, this.map[r], r, this)
                    }
                    ,
                    f.prototype.keys = function() {
                        var t = [];
                        return this.forEach(function(e, r) {
                            t.push(r)
                        }),
                        c(t)
                    }
                    ,
                    f.prototype.values = function() {
                        var t = [];
                        return this.forEach(function(e) {
                            t.push(e)
                        }),
                        c(t)
                    }
                    ,
                    f.prototype.entries = function() {
                        var t = [];
                        return this.forEach(function(e, r) {
                            t.push([r, e])
                        }),
                        c(t)
                    }
                    ,
                    e.iterable && (f.prototype[Symbol.iterator] = f.prototype.entries);
                    var i = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
                    v.prototype.clone = function() {
                        return new v(this,{
                            body: this._bodyInit
                        })
                    }
                    ,
                    y.call(v.prototype),
                    y.call(b.prototype),
                    b.prototype.clone = function() {
                        return new b(this._bodyInit,{
                            status: this.status,
                            statusText: this.statusText,
                            headers: new f(this.headers),
                            url: this.url
                        })
                    }
                    ,
                    b.error = function() {
                        var t = new b(null,{
                            status: 0,
                            statusText: ""
                        });
                        return t.type = "error",
                        t
                    }
                    ;
                    var s = [301, 302, 303, 307, 308];
                    b.redirect = function(t, e) {
                        if (-1 === s.indexOf(e))
                            throw new RangeError("Invalid status code");
                        return new b(null,{
                            status: e,
                            headers: {
                                location: t
                            }
                        })
                    }
                    ,
                    t.Headers = f,
                    t.Request = v,
                    t.Response = b,
                    t.fetch = function(t, r) {
                        return new Promise(function(n, o) {
                            var i = new v(t,r)
                              , s = new XMLHttpRequest;
                            s.onload = function() {
                                var t, e, r = {
                                    status: s.status,
                                    statusText: s.statusText,
                                    headers: (t = s.getAllResponseHeaders() || "",
                                    e = new f,
                                    t.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function(t) {
                                        var r = t.split(":")
                                          , n = r.shift().trim();
                                        if (n) {
                                            var o = r.join(":").trim();
                                            e.append(n, o)
                                        }
                                    }),
                                    e)
                                };
                                r.url = "responseURL"in s ? s.responseURL : r.headers.get("X-Request-URL");
                                var o = "response"in s ? s.response : s.responseText;
                                n(new b(o,r))
                            }
                            ,
                            s.onerror = function() {
                                o(new TypeError("Network request failed"))
                            }
                            ,
                            s.ontimeout = function() {
                                o(new TypeError("Network request failed"))
                            }
                            ,
                            s.open(i.method, i.url, !0),
                            "include" === i.credentials ? s.withCredentials = !0 : "omit" === i.credentials && (s.withCredentials = !1),
                            "responseType"in s && e.blob && (s.responseType = "blob"),
                            i.headers.forEach(function(t, e) {
                                s.setRequestHeader(e, t)
                            }),
                            s.send(void 0 === i._bodyInit ? null : i._bodyInit)
                        }
                        )
                    }
                    ,
                    t.fetch.polyfill = !0
                }
                function a(t) {
                    if ("string" != typeof t && (t = String(t)),
                    /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))
                        throw new TypeError("Invalid character in header field name");
                    return t.toLowerCase()
                }
                function u(t) {
                    return "string" != typeof t && (t = String(t)),
                    t
                }
                function c(t) {
                    var r = {
                        next: function() {
                            var e = t.shift();
                            return {
                                done: void 0 === e,
                                value: e
                            }
                        }
                    };
                    return e.iterable && (r[Symbol.iterator] = function() {
                        return r
                    }
                    ),
                    r
                }
                function f(t) {
                    this.map = {},
                    t instanceof f ? t.forEach(function(t, e) {
                        this.append(e, t)
                    }, this) : Array.isArray(t) ? t.forEach(function(t) {
                        this.append(t[0], t[1])
                    }, this) : t && Object.getOwnPropertyNames(t).forEach(function(e) {
                        this.append(e, t[e])
                    }, this)
                }
                function l(t) {
                    if (t.bodyUsed)
                        return Promise.reject(new TypeError("Already read"));
                    t.bodyUsed = !0
                }
                function h(t) {
                    return new Promise(function(e, r) {
                        t.onload = function() {
                            e(t.result)
                        }
                        ,
                        t.onerror = function() {
                            r(t.error)
                        }
                    }
                    )
                }
                function p(t) {
                    var e = new FileReader
                      , r = h(e);
                    return e.readAsArrayBuffer(t),
                    r
                }
                function d(t) {
                    if (t.slice)
                        return t.slice(0);
                    var e = new Uint8Array(t.byteLength);
                    return e.set(new Uint8Array(t)),
                    e.buffer
                }
                function y() {
                    return this.bodyUsed = !1,
                    this._initBody = function(t) {
                        if (this._bodyInit = t,
                        t)
                            if ("string" == typeof t)
                                this._bodyText = t;
                            else if (e.blob && Blob.prototype.isPrototypeOf(t))
                                this._bodyBlob = t;
                            else if (e.formData && FormData.prototype.isPrototypeOf(t))
                                this._bodyFormData = t;
                            else if (e.searchParams && URLSearchParams.prototype.isPrototypeOf(t))
                                this._bodyText = t.toString();
                            else if (e.arrayBuffer && e.blob && n(t))
                                this._bodyArrayBuffer = d(t.buffer),
                                this._bodyInit = new Blob([this._bodyArrayBuffer]);
                            else {
                                if (!e.arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(t) && !o(t))
                                    throw new Error("unsupported BodyInit type");
                                this._bodyArrayBuffer = d(t)
                            }
                        else
                            this._bodyText = "";
                        this.headers.get("content-type") || ("string" == typeof t ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : e.searchParams && URLSearchParams.prototype.isPrototypeOf(t) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
                    }
                    ,
                    e.blob && (this.blob = function() {
                        var t = l(this);
                        if (t)
                            return t;
                        if (this._bodyBlob)
                            return Promise.resolve(this._bodyBlob);
                        if (this._bodyArrayBuffer)
                            return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                        if (this._bodyFormData)
                            throw new Error("could not read FormData body as blob");
                        return Promise.resolve(new Blob([this._bodyText]))
                    }
                    ,
                    this.arrayBuffer = function() {
                        return this._bodyArrayBuffer ? l(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(p)
                    }
                    ),
                    this.text = function() {
                        var t, e, r, n = l(this);
                        if (n)
                            return n;
                        if (this._bodyBlob)
                            return t = this._bodyBlob,
                            e = new FileReader,
                            r = h(e),
                            e.readAsText(t),
                            r;
                        if (this._bodyArrayBuffer)
                            return Promise.resolve(function(t) {
                                for (var e = new Uint8Array(t), r = new Array(e.length), n = 0; n < e.length; n++)
                                    r[n] = String.fromCharCode(e[n]);
                                return r.join("")
                            }(this._bodyArrayBuffer));
                        if (this._bodyFormData)
                            throw new Error("could not read FormData body as text");
                        return Promise.resolve(this._bodyText)
                    }
                    ,
                    e.formData && (this.formData = function() {
                        return this.text().then(m)
                    }
                    ),
                    this.json = function() {
                        return this.text().then(JSON.parse)
                    }
                    ,
                    this
                }
                function v(t, e) {
                    var r, n, o = (e = e || {}).body;
                    if (t instanceof v) {
                        if (t.bodyUsed)
                            throw new TypeError("Already read");
                        this.url = t.url,
                        this.credentials = t.credentials,
                        e.headers || (this.headers = new f(t.headers)),
                        this.method = t.method,
                        this.mode = t.mode,
                        o || null == t._bodyInit || (o = t._bodyInit,
                        t.bodyUsed = !0)
                    } else
                        this.url = String(t);
                    if (this.credentials = e.credentials || this.credentials || "omit",
                    !e.headers && this.headers || (this.headers = new f(e.headers)),
                    this.method = (r = e.method || this.method || "GET",
                    n = r.toUpperCase(),
                    i.indexOf(n) > -1 ? n : r),
                    this.mode = e.mode || this.mode || null,
                    this.referrer = null,
                    ("GET" === this.method || "HEAD" === this.method) && o)
                        throw new TypeError("Body not allowed for GET or HEAD requests");
                    this._initBody(o)
                }
                function m(t) {
                    var e = new FormData;
                    return t.trim().split("&").forEach(function(t) {
                        if (t) {
                            var r = t.split("=")
                              , n = r.shift().replace(/\+/g, " ")
                              , o = r.join("=").replace(/\+/g, " ");
                            e.append(decodeURIComponent(n), decodeURIComponent(o))
                        }
                    }),
                    e
                }
                function b(t, e) {
                    e || (e = {}),
                    this.type = "default",
                    this.status = void 0 === e.status ? 200 : e.status,
                    this.ok = this.status >= 200 && this.status < 300,
                    this.statusText = "statusText"in e ? e.statusText : "OK",
                    this.headers = new f(e.headers),
                    this.url = e.url || "",
                    this._initBody(t)
                }
            }("undefined" != typeof self ? self : this)
        }
    }).default
});
