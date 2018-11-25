
        
        function aps_adboard_romancecpmGroup(b, k) {
	if (b == null || k == null) {
		return
	}
	var f;
	try {
		for (var g = 0, n = k.length; g < n; g++) {
			var a = b[g],
				l;
			if (a && a.pid) {
				if (a.adSrc_n && a.adSrc_n != "nil") {
					l = bigscreen ? a.adSrc : a.adSrc_n
				} else {
					l = a.adSrc
				}
				if (l.indexOf("http:") == 0) {
					l = l.split("http:")[1]
				}
				f = $("body").find("[cpmId=" + a.pid + "]");
				f.attr({
					href: a.apsClickUrl
				}).find("img").attr({
					src: l
				});
				if (f.parents(".firstScreen").length > 0 && f.hasClass("big") && $(".firstScreen").attr("data-dacu") != "true") {
					f.closest("li").css("background", a.tone)
				} else {
					f.find(".img-name").html(a.title).end().find(".img-desc").html(a.subtitle)
				}
			} else {
				var h = $("body").find("[cpmId=" + k[g] + "]"),
					c = h.find("img");
				l = c.attr("d-src");
				h.attr({
					href: h.attr("d-href")
				});
				c.attr({
					src: l
				});
				if (h.parents(".firstScreen").length > 0 && h.hasClass("big") && $(".firstScreen").attr("data-dacu") != "true") {
					var m = c.closest("li");
					m.css("background", m.attr("d-color"))
				} else {
					h.find(".img-name").html(h.find(".img-name").attr("d-title")).end().find(".img-desc").html(h.find(".img-desc").attr("d-title"))
				}
			}
		}
	} catch (j) {
		throw new Error(j)
	}
}

function aps_adboard_outTime(g) {
	for (var e = 0, f = g.length; e < f; e++) {
		var c = $("body").find("[cpmId=" + g[e] + "]"),
			b = c.find("img");
		srcAttr = b.attr("d-src");
		c.attr({
			href: c.attr("d-href")
		});
		b.attr({
			src: srcAttr
		});
		if (c.parents(".firstScreen").length > 0 && c.hasClass("big") && $(".firstScreen").attr("data-dacu") != "true") {
			var a = b.closest("li");
			a.css("background", a.attr("d-color"))
		} else {
			c.find(".img-name").html(c.find(".img-name").attr("d-title")).end().find(".img-desc").html(c.find(".img-desc").attr("d-title"))
		}
	}
}

function aps_adboard_errors(g) {
	for (var e = 0, f = g.length; e < f; e++) {
		var c = $("body").find("[cpmId=" + g[e] + "]"),
			b = c.find("img");
		srcAttr = b.attr("d-src");
		c.attr({
			href: c.attr("d-href")
		});
		b.attr({
			src: srcAttr
		});
		if (c.parents(".firstScreen").length > 0 && c.hasClass("big") && $(".firstScreen").attr("data-dacu") != "true") {
			var a = b.closest("li");
			a.css("background", a.attr("d-color"))
		} else {
			c.find(".img-name").html(c.find(".img-name").attr("d-title")).end().find(".img-desc").html(c.find(".img-desc").attr("d-title"))
		}
	}
}
        
 
      $(window).resize(function() {
		if (document.documentElement.clientWidth >= 1200) {
			$("body").addClass("root1200");
			bigscreen = true
		} else {
			$("body").removeClass("root1200");
			bigscreen = false
		}
	});  
        
       ! function(a, b) {
	"use strict";
	var c, d, e = b(a),
		f = !1,
		g = [],
		h = {},
		i = [],
		j = {
			timeout: 10,
			buffer: 100,
			loadingClass: "lazy-loading",
			srcValue: "lazy-src",
			bgValue: "lazy-bg"
		},
		k = {
			_init: function() {
				c = this
			},
			listen: function(a, d, e) {
				var k, l = a,
					m = (d || "img").toLowerCase();
				"object" != (typeof a).toLowerCase() && (l = b(a || "img[" + j.srcValue + "]")), e && (k = i.push(e) - 1), "bat" === m && (h[k] = {
					objs: [],
					cbIndex: k
				}), l.each(function() {
					var a = b(this);
					g.push({
						type: m,
						obj: a,
						cbIndex: k
					}), "img" == m && a.addClass(j.loadingClass)
				}), f || c._startListen(), c.detect()
			},
			_startListen: function() {
				e.bind("scroll.lazyelem resize.lazyelem", function() {
					g.length && (clearTimeout(d), d = setTimeout(function() {
						c.detect()
					}, j.timeout))
				}), f = !0
			},
			detect: function() {
				for (var a = 0; a < g.length; a++) {
					var b = g[a],
						d = b.obj,
						k = b.cbIndex;
					if (!c._isHidden(d) && c._isTrigger(d)) {
						switch (b.type) {
						case "fn":
							break;
						case "img":
							var l = d.attr(j.srcValue);
							l && d.attr("src", l).removeAttr(j.srcValue);
							break;
						case "bg":
							var m = d.attr(j.bgValue);
							m && d.css("background-image", "url(" + m + ")").removeAttr(j.bgValue);
							break;
						case "dom":
							var n = d.children("script");
							n.length && n.replaceWith(c._minHtml(n.html()));
							break;
						case "bat":
							h[k].objs.push(d)
						}
						g.splice(a--, 1), "bat" !== b.type && k >= 0 && i[k](d)
					}
				}
				c._bat(), 0 === g.length && (e.unbind("scroll.lazyelem resize.lazyelem"), f = !1)
			},
			_bat: function() {
				for (var a in h) {
					var b, c;
					h.hasOwnProperty(a) && (b = h[a].objs, c = i[h[a].cbIndex], b.length && (c(b), h[a].objs = []))
				}
			},
			_isTrigger: function(a) {
				var b = e.height(),
					c = e.scrollTop(),
					d = a.height(),
					f = a.offset().top;
				return f + d > c - j.buffer && f < c + b + j.buffer
			},
			_isHidden: function(a) {
				var c = a[0];
				return "none" !== a.css("display") && b.contains(c.ownerDocument, c) ? c.offsetWidth <= 0 && c.offsetHeight <= 0 ? !0 : !1 : !0
			},
			_minHtml: function(a) {
				var b = /\n+/g,
					c = /<!--.*?-->/gi,
					d = /\/\*.*?\*\//gi,
					e = /[ ]+</gi;
				return a = a.replace(b, ""), a = a.replace(c, ""), a = a.replace(d, ""), a = a.replace(e, "<")
			},
			config: function(a) {
				b.extend(j, a)
			},
			clear: function(a) {
				if (a) for (var b = 0; b < g.length; b++) a === g[b].obj[0] && g.splice(b, 1);
				else g = [], h = {}, i = []
			}
		};
	k._init(), a.lazyelem = k
}(window, window.jQuery || window.Zepto);
      var SFE = SFE || {};
        
      SFE.base = function(a) {
       var l = {
          
			getSku: function(a) {
				var b = a.partNumber + "|1|",
					c = "",
					d = a.linkType,
					e = a.vendorCode;
				return d && "1" != d ? "2" == d ? c = "4|" : "3" == d ? c = "5|" : "4" == d ? c = "6|" : "5" == d ? c = "7|" : "6" == d ? c = "8|" : "7" == d && (c = "9|") : c = e && "" != e ? "0000000000" == e || "0" == e ? "3|" : "2|" + a.vendorCode : "|", 'data-sku="' + b + c + '"'
			},
			getRealPartNumber: function(a) {
				return a.replace(/\b(0+)/gi, "")
			},
			getProPic: function(a) {
				var b, c = 3 == a.productType || 5 == a.productType ? a.supplierCode : a.shopCode,
					f = a.picVersion ? "&ver=" + a.picVersion : "";
				return b = f.length > 0 ? d.isWebp ? "&from=mobile" : "" : d.isWebp ? "?from=mobile" : "", SFE.URL_CONST.IMG_HOST[e] + "/uimg/b2c/newcatentries/" + c + "-" + a.sugGoodsCode + "_2_" + a.picSize + ".jpg" + f + b
			},
			getWhitePic: function(a) {
				var b, c = 3 == a.productType || 5 == a.productType ? a.supplierCode : a.shopCode,
					f = a.picVersion ? "&ver=" + a.picVersion : "";
				return b = f.length > 0 ? d.isWebp ? "&from=mobile" : "" : d.isWebp ? "?from=mobile" : "", SFE.URL_CONST.IMG_HOST[e] + "/uimg/b2c/qrqm/" + c + a.sugGoodsCode + "_" + a.picSize + ".jpg" + f + b
			},
			getUrl: function(a, b) {
				var c = "";
				if (a.trickPoint && a.trickPoint.length > 0 && (c = "?srcPoint=" + a.trickPoint), a.linkUrl && "" != a.linkUrl) return 0 == a.linkUrl.indexOf("http://") || 0 == a.linkUrl.indexOf("https://") ? a.linkUrl + c : "//" + a.linkUrl + c;
				var d = 3 == a.productType || 5 == a.productType ? a.supplierCode : a.shopCode,
					e = a.sugGoodsCode,
					f = sn.productDomain;
				return "/" != f.substring(f.length - 1) && (f += "/"), b && null != b ? d && d.length > 0 ? f + d + "/" + e + ".html?srcPoint=" + b + "&src=" + b : f + e + ".html?srcPoint=" + b + "&src=" + b : d && d.length > 0 ? f + d + "/" + e + ".html" + c : f + e + ".html" + c
			}
		
       },
           d = {
			getEnv: function() {
				var a = window.location.hostname;
				if (window.nowEnv && void 0 != window.nowEnv && "" != window.nowEnv) return window.nowEnv;
				var b = /^(\w*)(pre)(.*)(\.cnsuning\.com)$/,
					c = /^(\w*)(prexg)(.*)(\.cnsuning\.com)$/,
					d = /^(\w*)(xgpre)(.*)(\.cnsuning\.com)$/,
					e = /^(\w*)(sit)(.*)(\.cnsuning\.com)$/;
				return b.test(a) ? c.test(a) || d.test(a) ? "PREXG" : "PRE" : e.test(a) ? "SIT" : "PRD"
			},
			getQueryString: function(a, b) {
				var c = window.location.search,
					d = "",
					e = {};
				if (b) d = b.split("?")[1].split("&");
				else {
					if (!window.location.search) return;
					d = c.substr(1).split("&")
				}
				for (var f = 0; f < d.length; f++) {
					var g = d[f].split("=");
					e[g[0]] = g[1]
				}
				return a ? e[a] : b ? e[a] : e
			},
			loadScript: function(a, b) {
				var c = document.createElement("script");
				c.type = "text/javascript", void 0 !== b && (c.readyState ? c.onreadystatechange = function() {
					"loaded" != c.readyState && "complete" != c.readyState || (c.onreadystatechange = null, b())
				} : c.onload = function() {
					b()
				}), c.src = a, document.body.appendChild(c)
			},
			isWebp: function() {
				return isSupportWebp = !! [].map && 0 == document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp")
			},
			isLocalStorageSupported: function() {
				var b = "test",
					c = window.localStorage,
					d = !! a.browser.msie && parseInt(a.browser.version);
				if (d && d <= 7 || "undefined" == typeof JSON) return !1;
				try {
					return c.setItem(b, "testValue"), c.removeItem(b), !0
				} catch (e) {
					return !1
				}
			},
			serialize: function(a) {
				var b = "",
					c = !1;
				for (key in a) c && (b += "&"), b += key + "=" + a[key], c = !0;
				return b
			}
		},
           v = function() {
			function b(b) {
				var c = a(b);
				if (c.length > 0) return a(window).scrollTop() + a(window).height() > c.offset().top && c.offset().top + c.height() > a(window).scrollTop()
			}

			function c() {
				function c() {
					a.ajax({
						type: "get",
						cache: !0,
						dataType: "jsonp",
						url: "https://lib.suning.com/api/jsonp/cb/gFooter-getFootercb.jsonp",
						jsonpCallback: "getFootercb",
						success: function(a) {
							if (g = a, f(g), i) {
								var b = a;
								localStorage.setItem(key, JSON.stringify({
									time: (new Date).getTime(),
									footerContent: b
								}))
							}
						}
					})
				}

				function f(b) {
					var c, d, e, f, g, h = "";
					if (b) {
						if (b.five_logo) {
							var i = b.five_logo.tag;
							i && (c = i.length);
							for (var j = 0; j < c; j++) e = b.five_logo.tag[j], h += '<dl><dt><a href="' + e.linkUrl + '" target="_blank" rel="nofollow" name="' + e.productSpecialFlag + '"><img src="http://image.suning.cn' + e.picUrl + '" alt="' + e.elementDesc + '" /></a></dt><dd><p><strong><a href="' + e.linkUrl + '" target="_blank" rel="nofollow" name="' + e.productSpecialFlag + '">' + e.elementName + "</a></strong></p><p>" + e.elementDesc + "</p></dd></dl>";
							a(".ng-promise").prepend(h), h = ""
						}
						if (b.footLink_list) {
							var k = b.footLink_list.nodes;
							if (k) {
								c = k.length;
								for (var j = 0; j < c; j++) {
									if (h += "<dl>", e = k[j], h += "<dt>" + k[j].tag[0].elementName + "</dt>", g = e.nodes) {
										d = g[0].tag.length;
										for (var l = 0; l < d; l++) f = g[0].tag[l], h += '<dd><a href="' + f.linkUrl + '" target="_blank" rel="nofollow" name="' + f.elementDesc + '">' + f.elementName + "</a></dd>"
									}
									h += "</dl>"
								}
								a(".ng-help-box").html(h), h = ""
							}
						}
						if (b.footer_one) {
							var i = b.footer_one.tag;
							if (i) {
								c = i.length;
								for (var j = 0; j < c; j++) e = i[j], h += '<a href="' + e.linkUrl + '" target="_blank" name="' + e.elementDesc + '">' + e.elementName + "</a>", j != c - 1 && (h += "<span>|</span>");
								a(".ng-url-list").eq(0).html(h), h = ""
							}
						}
						if (b.footer_two) {
							var i = b.footer_two.tag;
							if (i) {
								c = i.length;
								for (var j = 0; j < c; j++) e = i[j], h += '<a href="' + e.linkUrl + '" target="_blank" name="' + e.elementDesc + '">' + e.elementName + "</a>", j != c - 1 && (h += "<span>|</span>");
								a(".ng-url-list").eq(1).html(h), h = ""
							}
						}
						a(".ng-app-down").show(), a(".ng-copyright").show(), a(".ng-authentication").show(), lazyelem.detect()
					}
				}
				var g;
				if ((b(".ng-footer") || b(".ng-s-footer")) && !e) {
					e = !0;
					var h, i = d.isLocalStorageSupported();
					if (key = "lazyFooter", i && localStorage.getItem(key)) {
						h = JSON.parse(localStorage.getItem(key)), storeTime = parseInt(h.time) + 18e5;
						(new Date).getTime() > storeTime ? c() : (g = h.footerContent, f(g))
					} else c()
				}
			}
			var e = !1;
			c(), a(window).resize(function() {
				c()
			}).scroll(function() {
				c()
			})
		};
          toolbarDataFlag= !1;
         
          toolbarOpen=function(b) {   
			var c, b = a(b),
				d = this;
			b.hover(
                function() {
				var e = a(this);
				clearTimeout(c);
                c = setTimeout(function() {
					
                    e.find("a.ng-bar-node").addClass("ng-bar-node-hover").siblings(".ng-d-box").slideDown(100);
                    console.log("aaaaa",e);
				}, 150);
			},
                    function() {
				var b = a(this);
				clearTimeout(c); 
                c = setTimeout(function() {
					b.find("a.ng-bar-node").removeClass("ng-bar-node-hover").siblings(".ng-d-box").slideUp(100)
				}, 150);
                
              console.log("aaaaa",c);
			})
              
              b.find("a.ng-bar-node").click(function() {
				a(this).toggleClass("ng-bar-node-hover").siblings(".ng-d-box").slideToggle(100), b.hasClass("lazy-bar-box") && !d.toolbarDataFlag && (d.toolbarDataFlag = !0, d.getToolbarData())
			})
		}
           toolbarOpen(".ng-site-nav-box");
          toolbarOpen(".shop-handle");
        
          toolbarOpen(".service-handle"); 
         
               getToolbarData = function (){
           function b(){
                var b ="https://lib.suning.com/api/jsonp/cb/headToolbar-getTBcb.jsonp";
               a.ajax({
                   type:"get",
                   dataType: "jsonp",
					url: b,
					jsonpCallback: "getTBcb",
                   success: function(b) {
                      
                           var c ="";
                           if (b) {
                               if (b.toolbra_daogou) {
                                   var d = b.toolbra_daogou.nodes;
							        e = d.length;
                                    c = "";
                                   for (var f = 0; f < e; f++){
                                     c += f == e - 1 ? '<dl class="sn-site-list rnb">' : '<dl class="sn-site-list">';
                                        c += "<dt>" + b.toolbra_daogou.tag[f].elementName + "</dt>";
                                
                                       c += "<dd>"
                                for (var g = 0; g < d[f].tag.length; g++){ 
                 c += '<p><a>' + d[f].tag[g].elementName + "</a></p>";
						
                                                                         
                                  }
                                       c += "</dd></dl>"; 
                                   
                                   }
                              
                                     a(".ng-sn-site-nav").prepend(c); 
                                 
                                   a(".ng-sn-site-nav .head-loading").remove();
                                   
                               } 
                                if (b.toolbar_shangjia) {
                                    var h = b.toolbar_shangjia.tag,e=h.length;
                                    c="";
                                    for (var f= 0; f < e;f++) {
                                        c += '<a target="_blank">' + h[f].elementName + "</a>";
                                    }
                                    a(".shop-center-child").html(c);
                                }   
                               if (b.toolbar_fuwu) {
						var h = b.toolbar_fuwu.tag,
							e = h.length;
						c = "";
						for (var f = 0; f < e; f++){
                          c += '<a target="_blank">' + h[f].elementName + "</a>";
                        }
						a(".service-center-child").prepend(c);
                        a(".service-center-child .head-loading").remove(); a(".service-center-child a").show();
					}
                           }
                       
                      
                     
                   }
                   
               })
           }
             
        b();
       
      
            }
          getToolbarData();
          
          return {productFomate: l,footerLazyLoad: v}
      }(jQuery);
        $(function(){
            SFE.base.footerLazyLoad();
            
        });
        
      var Util = Util || {};
      Util.ieVersion = function(c) {
	var a = document.createElement("b");
	a.innerHTML = "<!--[if IE " + c + "]><i></i><![endif]-->";
	return a.getElementsByTagName("i").length === 1
}; 
      Util.isiPad = function() {
	var b = navigator.userAgent;
	var a = "iPad";
	var c = false;
	if (b.indexOf(a) > 0) {
		c = true
	}
	return c
};
      Util.Slide = function(a, b) {
	this.opt = $.extend({
		event: "click",
		mouseOverDelay: 0,
		auto: true,
		delay: 5000,
		duration: 500,
		showLabel: true,
		onchange: function(c) {},
		onchangestart: function(c) {},
		oninitend: function(c) {}
	}, b);
	this.container = $(a);
	this.items = this.container.find("li");
	this.index = 0;
	this.pager = null;
	this.animating = false;
	this.screen = false;
	this.mouseIn = false;
	this._init()
};
   Util.Slide.prototype = {
	_init: function() {
		var a = this;
		this.opt.showLabel && this._createLabel();
		this.to(0, true);
		this.container.on("mouseenter mousemove", function() {
			a.mouseIn = true;
			a.autoPause()
		});
		this.container.on("mouseleave", function() {
			a.mouseIn = false;
			if (a.isInScreen()) {
				a.autoStart()
			}
		});
		if (this.isInScreen()) {
			a.autoStart();
			a.screen = true
		}
		$(window).scroll(function() {
			if (a.isInScreen() && a.screen == false) {
				a.screen = true;
				a.autoStart()
			} else {
				if (!a.isInScreen() && a.screen == true) {
					a.screen = false;
					a.autoPause()
				}
			}
		});
		this.opt.oninitend.call(this, this.container)
	},
	_createLabel: function() {
		var e = this,
			f = [],
			g, c, b;
		f.push('<div class="banner-nav">');
		for (c = 1; c <= this.items.size(); c++) {
			f.push('<a href="javascript:;" class="page-item">' + c + "</a>")
		}
		f.push("</div>");
		this.pager = typeof this.opt.showLabel == "string" ? this.container.find(this.opt.showLabel) : $(f.join("")).appendTo(this.container.parent().find(".banner-nav-wrapper"));
		if (this.opt.mouseOverDelay) {
			this.pager.find("a").hover(function() {
				var a = $(this).index();
				g = setTimeout(function() {
					e.to(a)
				}, e.opt.mouseOverDelay)
			}, function() {
				clearTimeout(g)
			})
		} else {
			this.pager.find("a").bind(this.opt.event, function() {
				e.to($(this).index())
			})
		}
	},
	autoStart: function() {
		var a = this;
		this.timer = setInterval(function() {
			a.next()
		}, this.opt.delay)
	},
	autoPause: function() {
		clearInterval(this.timer)
	},
	prev: function() {
		this.to(this.index == 0 ? this.items.size() - 1 : this.index - 1, true)
	},
	next: function() {
		this.to(this.index == this.items.size() - 1 ? 0 : this.index + 1, false)
	},
	to: function(b, a) {
		var c = this;
		if (this.animating) {
			return false
		}
		this.opt.onchangestart.call(this, b);
		this.animating = true;
		this.items.eq(b).stop().fadeIn(this.opt.duration, function() {
			c.animating = false
		}).siblings().fadeOut(this.opt.duration);
		lazyelem.detect();
		if (!this.items.eq(b).attr("data-bgflag") || a) {
			if (this.items.eq(b).find("a[cpmId]")) {
				cpmRequire(this.items.eq(b))
			}
			if (this.items.eq(b).find("a[cptId]")) {
				this.items.eq(b).find("a[cptId]").each(function() {
					pid = $(this).attr("cptId");
					if (pid) {
						try {
							apsAdboardCptPvObj.aps_adboard_loadAdCptPv(pid, b.cptTime)
						} catch (f) {}
					}
				})
			}
			this.items.eq(b).attr("data-bgflag", "true")
		}
		this.pager && this.pager.find("a").eq(b).addClass("current").siblings().removeClass("current");
		this.index = b;
		this.opt.onchange.call(this, b)
	},
	isInScreen: function() {
		var a = this.container;
		if (a.length > 0) {
			return ($(document).scrollTop() + $(window).height() - 100 > a.offset().top) && (a.offset().top + a.height() - 100 > $(document).scrollTop())
		}
	}
};
     Util.verticalLoop = function(a, b) {
	this.opt = $.extend({
		event: "click",
		mouseOverDelay: 0,
		auto: true,
		delay: 5000,
		duration: 500,
		showLabel: false,
		onchange: function(c) {},
		onchangestart: function(c) {},
		oninitend: function(c) {}
	}, b);
	this.container = $(a);
	this.items = this.container.find("li");
	this.index = 0;
	this.pager = null;
	this.animating = false;
	this.screen = false;
	this.mouseIn = false;
	this._init()
};
Util.verticalLoop.prototype = {
	_init: function() {
		var a = this;
		this.container.find("ul").clone().appendTo(this.container);
		this.to(0);
		this.container.on("mouseenter mousemove", function() {
			a.mouseIn = true;
			a.autoPause()
		});
		this.container.on("mouseleave", function() {
			a.mouseIn = false;
			if (a.isInScreen()) {
				a.autoStart()
			}
		});
		if (this.isInScreen()) {
			a.autoStart();
			a.screen = true
		}
		$(window).scroll(function() {
			if (a.isInScreen() && a.screen == false) {
				a.screen = true;
				a.autoStart()
			} else {
				if (!a.isInScreen() && a.screen == true) {
					a.screen = false;
					a.autoPause()
				}
			}
		});
		this.opt.oninitend.call(this, this.container)
	},
	autoStart: function() {
		var a = this;
		this.timer = setInterval(function() {
			a.next()
		}, this.opt.delay)
	},
	autoPause: function() {
		clearInterval(this.timer)
	},
	next: function() {
		this.to(this.index)
	},
	to: function(a) {
		var g = this.container.find("ul").eq(0),
			c = this.container.find("ul").eq(1),
			f = g.find("li").length,
			e = parseInt(f / 2),
			b = this;
		g.animate({
			marginTop: 0 - (a * 2 * 48) + "px"
		}, 1000, function() {
			if (a == e) {
				g.css("marginTop", 0);
				b.index = 1
			} else {
				b.index = a + 1
			}
		})
	},
	isInScreen: function() {
		var a = this.container;
		if (a.length > 0) {
			return ($(document).scrollTop() + $(window).height() - 100 > a.offset().top) && (a.offset().top + a.height() - 100 > $(document).scrollTop())
		}
	}
};
      
 Util.CountDown = function(b) {
	function a(c) {
		this.opts = c || {};
		this.obj = this.opts.obj;
		this.nowTime = this.opts.nowTime;
		this.startTime = this.opts.startTime;
		this.endTime = this.opts.endTime;
		this.dayNode = this.opts.dayNode || ".day-node";
		this.hourNode = this.opts.hourNode || ".hour-node";
		this.minuteNode = this.opts.minuteNode || ".minute-node";
		this.secondNode = this.opts.secondNode || ".second-node";
		this.beforeStart = this.opts.beforeStart ||
		function() {};
		this.isStart = this.opts.isStart ||
		function() {};
		this.callback = this.opts.callback ||
		function() {};
		this.speed = this.opts.speed || 1000;
		this.timeOffset = 0;
		this.gap = [];
		this.auto = null
	}
	a.prototype = {
		init: function() {
			var c = this;
			c.timeOffset = c.nowTime - new Date().getTime();
			c.timer();
			c.run()
		},
		timer: function() {
			var c = this,
				e = this.nowTime;
			if (c.startTime && parseInt(c.startTime) > parseInt(e)) {
				c.gap = c.parse(c.startTime - e);
				c.html();
				this.beforeStart()
			} else {
				if (c.endTime && parseInt(c.endTime) > parseInt(e)) {
					c.gap = c.parse(c.endTime - e);
					c.html();
					this.isStart()
				}
			}
			if (parseInt(c.endTime) < parseInt(this.nowTime)) {
				clearTimeout(c.auto);
				this.callback()
			}
			this.nowTime = new Date().getTime() + this.timeOffset
		},
		parse: function(f) {
			var c = this,
				e = f / c.speed;
			c.second = Math.round(e % 60);
			c.minute = Math.floor((e / 60) % 60);
			c.hour = Math.floor((e / 60 / 60) % 24);
			c.day = Math.floor(e / 60 / 60 / 24);
			if (c.second < 10) {
				c.second = "0" + c.second
			}
			if (c.minute < 10) {
				c.minute = "0" + c.minute
			}
			if (c.hour < 10) {
				c.hour = "0" + c.hour
			}
			if (c.day < 10) {
				c.day = "0" + c.day
			}
			return [c.second, c.minute, c.hour, c.day]
		},
		html: function() {
			var c = this;
			c.obj.find(this.dayNode).html(c.gap[3]);
			c.obj.find(this.hourNode).html(c.gap[2]);
			c.obj.find(this.minuteNode).html(c.gap[1]);
			c.obj.find(this.secondNode).html(c.gap[0])
		},
		run: function() {
			var c = this;
			c.auto = setInterval(function() {
				c.timer()
			}, 500)
		}
	};
	new a(b).init()
}; 
      var index = index || {};
          index.cmsBgDom = [];
    Util.getRandomNum = function() {
	return parseInt(Math.random() * 5) + 1
};
      Util.isLocalStorageSupported = function() {
	var c = "test",
		b = window.localStorage;
	if (Util.ieVersion(7) || Util.ieVersion(6) || typeof JSON == "undefined") {
		return false
	}
	try {
		b.setItem(c, "testValue");
		b.removeItem(c);
		return true
	} catch (a) {
		return false
	}
};
      function cpmRequire(f) {
	var l = f.find("[cpmId]"),
		p = [];
	l.each(function() {
		p.push($(this).attr("cpmId"))
	});
	var q = "w",
		j = p.length,
		h = [],
		r = Math.ceil(j / 5);
	for (var g = 0; g < r; g++) {
		h[g] = [];
		for (var c = 0; c < 5; c++) {
			var b = g * 5 + c;
			if (b < j) {
				h[g].push(p[b])
			}
		}
	}
	for (var a = 0; a < r; a++) {
		try {
			apsAdboardGroupObj.aps_adboard_loadAdCpmGroup(h[a], q)
		} catch (k) {
			aps_adboard_errors(h[a])
		}
	}
}    
      index.nav = function() {
           
         
            var g;
	var c = false;
	var s = $(".dacu-list-wrapper"),
		a = $(".index-sort-list-box"),
		j = $(".index-sort-detail");
                  /*******************************/   
     var o = function o() {
		var z = $(window).scrollTop();
		var h = $(window).height();
		var A = 600;
		f == false ? l = t + u + A : "";
		z > l ? m() : b();
		z > l ? f = true : f = false;
		if (z <= l) {
			b();
			f = false
		}
	}
      var m = function m() {
		r.find(".dacu-list-wrapper").hide();
		y.fadeIn(0);
		r.addClass("ng-sort-fixed");
		r.removeClass("ng-sort-index");
		$(".ng-bar-node-mini-cart").addClass("ng-bar-node-mini-cart-fixed");
		$(".cart-child").addClass("ng-bar-node-mini-cart-child-fixed");
		$(".reg-bar-node , #username-node-slide ,#username-node").addClass("reg-bar-node-fixed");
		$(".ng-search").find(".g-search").addClass("g-search-fixed");
		$(".ng-nav-bar").addClass("ng-nav-bar-fixed");
		$(".ng-nav-index").hide()
	}
      var b = function b() {
		r.find(".dacu-list-wrapper").show();
		r.addClass("ng-sort-index");
		r.removeClass("ng-sort-fixed");
		r.find(".ng-sort-list-box").show();
		$(".ng-bar-node-mini-cart").removeClass("ng-bar-node-mini-cart-fixed");
		$(".cart-child").removeClass("ng-bar-node-mini-cart-child-fixed");
		$(".reg-bar-node , #username-node-slide ,#username-node").removeClass("reg-bar-node-fixed");
		$(".ng-search").find(".g-search").removeClass("g-search-fixed");
		$(".ng-nav-bar").removeClass("ng-nav-bar-fixed");
		$(".ng-nav-index").show();
		y.fadeOut(100)
	} 
            
        /**********************/    
     var k = function k(N) {
         
		var F = $(this).scrollTop();
		var z = a.offset().top;
		if (sn.isHome) {
			if (F > (z + 40)) {
				j.animate({
					top: F - z
				}, 100)
			} else {
				j.animate({
					top: 0
				}, 100)
			}
		}
		var D = "",
			C = "",
			I = "",
			B = "",
			A = "";
		e.html(" ");
            console.log("1111111",c);
		if (c && typeof threeData != "undefined" && typeof threeData[N] != "undefined") {
  			if (!threeData[N].nodes) {
				return
			}
			var h = threeData[N],
				P = threeData[N],
				M, L, E, O, G = P.nodes.length;
			var h = threeData[N];
			if (P.nodes[1]) {
				C += '<div class="sort-btn">';
				if (P.nodes[1].tag) {
					for (var J = 0; J < P.nodes[1].tag.length; J++) {
						M = P.nodes[1].tag[J];
						C += '<a href="' + M.linkUrl + '" target="_blank" name="' + M.trickPoint + '" title="' + M.elementName + '">' + M.elementName + "</a>"
					}
				}
				C += "</div>"
			}
			I += '<div class="cate-list">';
			for (var J = 4; J < G; J++) {
				if (P.nodes[J] && P.nodes[J].tag && P.nodes[J].nodes) {
					I += "<dl>";
					L = P.nodes[J].nodes;
					I += '<dt><a href="' + P.nodes[J].tag[0].linkUrl + '" target="_blank" title="' + P.nodes[J].tag[0].elementName + '" name="' + P.nodes[J].tag[0].trickPoint + '">' + P.nodes[J].tag[0].elementName + "</a></dt>";
					if (L[0].tag) {
						if (J == 2) {
							I += '<dd class="first">'
						} else {
							I += "<dd>"
						}
						for (var H = 0; H < L[0].tag.length; H++) {
							if (L[0].tag[H].elementDesc == "orange") {
								I += '<a href="' + L[0].tag[H].linkUrl + '" target="_blank" name="' + L[0].tag[H].trickPoint + '" title="' + L[0].tag[H].elementName + '" class="orange">' + L[0].tag[H].elementName + "</a>"
							} else {
								I += '<a href="' + L[0].tag[H].linkUrl + '" target="_blank" name="' + L[0].tag[H].trickPoint + '" title="' + L[0].tag[H].elementName + '">' + L[0].tag[H].elementName + "</a>"
							}
						}
					}
					I += "</dd>";
					I += "</dl>"
				}
			}
			I += "</div>";
			if (sn.isNewHome) {
				B += '<div class="actShow">';
				if (P.nodes[2]) {
					B += '<div class="brandList clearfix">';
					img = P.nodes[2].tag;
					if (img) {
						for (var J = 0; J < img.length; J++) {
							picUrl = sn.imgHost + img[J].picUrl;
							B += '<a href="' + img[J].linkUrl + '" data-src="' + img[J].elementName + '" name="' + img[J].trickPoint + '" target="_blank"><img lazy-src="https:' + picUrl + '" src="https://res.suning.cn/public/v3/images/blank.gif"></a>'
						}
					}
					B += "</div>"
				}
				if (P.nodes[3]) {
					B += '<div class="actList clearfix">';
					O = P.nodes[3].tag;
					if (O) {
						for (var J = 0; J < O.length; J++) {
							picUrl = sn.imgHost + O[J].picUrl;
							if (O[J].advistismentCode) {
								B += '<a d-href="' + O[J].linkUrl + '" d-title="' + O[J].elementName + '" d-name="' + O[J].trickPoint + '" target="_blank" cpmId="' + O[J].advistismentCode + '"><img d-src="' + sn.imgHost + O[J].picUrl + '" d-alt="' + O[J].elementDesc + '"></a>'
							} else {
								B += '<a href="' + O[J].linkUrl + '" title="' + O[J].elementName + '" name="' + O[J].trickPoint + '" target="_blank"><img lazy-src="https:' + sn.imgHost + O[J].picUrl + '" src="https://res.suning.cn/public/v3/images/blank.gif"></a>'
							}
						}
					}
					B += "</div>"
				}
				B += "</div>"
			}
			D = C + I + B;
			e.html(D);
			lazyelem.listen(e.find("img[lazy-src]"), "img");
			lazyelem.detect();
			cpmRequire(e)
		} else {
			setTimeout(function() {
				k(N)
			}, 300)
		}
	}
      
      /*******************************/     
        var v = function v() {
		j.stop(true, true).animate({
			width: "0px"
		}, 100, function() {
			a.find("li").removeClass("current");
			$(this).removeClass("index-sort-detail-border")
		})
	}
	$(".index-sort-list-box").mouseover(function() {
		clearTimeout(g);
		g = setTimeout(function() {
			 
          n();
		}, 100)
	});
        function n() {
		   var A = isLocalStorageSupported(),
			z = "indexnav";
			if (!c) {
			if (A && localStorage.getItem(z)) {
				localDate = JSON.parse(localStorage.getItem(z));
				storeTime = parseInt(localDate.time) + 30 * 60 * 1000;
				var h = new Date().getTime();
				if (h > storeTime) {
					$.ajax({
						url: "https://lib.suning.com/api/jsonp/cb/sortList_v6-threeSortLoad.jsonp",
						type: "get",
						dataType: "jsonp",
						jsonp: "callback",
						jsonpCallback: "threeSortLoad",
						cache: true,
						success: function(C) {
							if (C && C.allsort && C.allsort.nodes) {
								threeData = C.allsort.nodes;
								c = true;
								if (A) {
									var B = C.allsort.nodes;
									localStorage.setItem(z, 
										JSON.stringify({
										time: new Date().getTime(),
										navContent: B
									}))
								}
							}
						}
					})
				} else {
					threeData = localDate.navContent;
					c = true
				}
			} else {
				$.ajax({
					url: "https://lib.suning.com/api/jsonp/cb/sortList_v6-threeSortLoad.jsonp",
					type: "get",
					dataType: "jsonp",
					jsonp: "callback",
					jsonpCallback: "threeSortLoad",
					cache: true,
					success: function(C) {
						if (C && C.allsort && C.allsort.nodes) {
							threeData = C.allsort.nodes;
							c = true;
							if (A) {
								var B = C.allsort.nodes;
								localStorage.setItem(z, JSON.stringify({
									time: new Date().getTime(),
									navContent: B
								}))
							}
						}
					}
				})
			}
		}	
		}
       
          $(".dacu-tab a").hover(function() {
		var z = $(this),
			h = z.index(),
			A = $(".dacu-list-wrapper .dacu-list-tab");
		z.addClass("dacu-btn-cur").siblings().removeClass("dacu-btn-cur");
		A.eq(h).show().siblings().hide();
		lazyelem.detect()
	}, function() {});
            function q() {
		var C, B;
		var A, z;
		var h = 0;
        
		a.find("li").live({
			mouseenter: function(D) {
				C = D.pageX, B = D.pageY;
				h == 1 ? delay = 0 : delay = 200
			},
			mouseleave: function(D) {
				A = D.pageX, z = D.pageY;
				if (A <= C + 5) {
					Math.abs(z - B) <= 28 ? h = 0 : h = 1
				} else {
					h = 0
				}
			}
		});
		a.live("mouseleave", function() {
			h = 0
		});
        console.log("梁泽西",a);  
	}
	
          var i = null;   
	var e = $(".index-sort-detail"); 
          
         if (!Util.isiPad()) {
		a.find("li").live({
			mouseenter: function() {
				var h = $(this);
				clearTimeout(i);
				i = setTimeout(function() {
					h.addClass("current").siblings("li").removeClass("current");
					var z = h.index();
					k(z);
					j.addClass("index-sort-detail-border");
					if (bigscreen) {
						j.css("width", 999)
					} else {
						j.css("width", 798)
					}
				}, 200)
			},
			mouseleave: function() {
				clearTimeout(i)
			}
		});
		var x;
		a.hover(function() {
			clearTimeout(x)
		}, function() {
			clearTimeout(x);
			x = setTimeout(function() {
				v()
			}, 200)
		})
	} else {
		a.find("li").on("click", function() {
			p($(this))
		});


          
          
          
       var f, r = $(".index-sort"); 
        $(window).scroll(function() {
		o()
	});
	var w;
               /*******************************/   
       r.hover(function() {
		if (f) {
			clearTimeout(w);
			w = setTimeout(function() {
				s.slideDown()
			}, 200)
		}
	},
	 function() {
		if (f) {
			clearTimeout(w);
			w = setTimeout(function() {
				$(".index-sort-detail").animate({
					width: "0px"
				}, 100, function() {
					$(".index-sort-detail").removeClass("index-sort-detail-border");
					s.slideUp()
				})
			}, 200)
		}
	});     
        var u = r.height();
                 
	var u = r.height();
	var t = $(".ng-nav-bar").offset().top;
	var y = $(".ng-fix-bar");
	var l;
 
    
            
         
		}};
       var commodity = {
	getUrl: function(h, e) {
		var b = "";
		if (h.trickPoint && h.trickPoint.length > 0) {
			b = "?srcPoint=" + h.trickPoint
		}
		if (h.linkUrl && h.linkUrl != "") {
			if (h.linkUrl.indexOf("http://") == 0 || h.linkUrl.indexOf("https://") == 0) {
				return h.linkUrl + b
			} else {
				return "//" + h.linkUrl + b
			}
		} else {
			var c = h.linkType;
			var a = h.vendorCode;
			var f = h.partNumber;
			var g = sn.productDomain;
			if (g.substring(g.length - 1) != "/") {
				g = g + "/"
			}
			if (e && null != e) {
				if (a && a.length > 0) {
					return g + a + "/" + f + ".html?srcPoint=" + e + "&src=" + e
				} else {
					return g + f + ".html?srcPoint=" + e + "&src=" + e
				}
			} else {
				if (a && a.length > 0) {
					return g + a + "/" + f + ".html" + b
				} else {
					return g + f + ".html" + b
				}
			}
		}
	},
	getSku: function(f) {
		var c = f.partNumber + "|1|";
		var e = "";
		var b = f.linkType;
		var a = f.vendorCode;
		if (b && b != "1") {
			if (b == "2") {
				e = "4|"
			} else {
				if (b == "3") {
					e = "5|"
				} else {
					if (b == "4") {
						e = "6|"
					} else {
						if (b == "5") {
							e = "7|"
						} else {
							if (b == "6") {
								e = "8|"
							} else {
								if (b == "7") {
									e = "9|"
								}
							}
						}
					}
				}
			}
		} else {
			if (a && a != "") {
				if (a == "0000000000") {
					e = "3|"
				} else {
					e = "2|" + f.vendorCode
				}
			} else {
				e = "|"
			}
		}
		return 'data-sku="' + c + e + '"'
	}
};
   index.toutiaoloop = function() {
	var a = new Util.verticalLoop(".first-right .toutiao", {
		mouseOverDelay: 200,
		duration: 500,
		delay: 5000
	})
};
        Util.baoguangFun = function(a) {
	if (typeof _analyseExpoTags == "function") {
		_analyseExpoTags("a", a)
	} else {
		setTimeout(function() {
			Util.baoguangFun(a)
		}, 2000)
	}
};
        index.banner = function() {
	var a = new Util.Slide(".banner", {
		mouseOverDelay: 200,
		duration: 500,
		delay: 5000
	}),
		e = $(".banner-wrapper"),
		c = e.find(".btn-left"),
		b = e.find(".btn-right");
	c.click(function() {
		a.prev()
	});
	b.click(function() {
		a.next()
	});
	e.hover(function() {
		c.show();
		b.show()
	}, function() {
		c.hide();
		b.hide()
	})
};
        index.getwebp = function(b) {
	if ($.isWebp) {
		var a = $(b).find("img");
		a.each(function() {
			var c = $(this),
				e = "";
			if (c.attr("lazy-src") != "") {
				e = c.attr("lazy-src")
			} else {
				if (c.attr("src") != "") {
					e = c.attr("src")
				}
			}
			if (e && e.indexOf("?") == -1) {
				e = e + "?from=mobile"
			} else {
				if (e) {
					e = e + "&from=mobile"
				}
			}
			if (c.attr("lazy-src") != "") {
				c.attr("lazy-src", e)
			} else {
				if (c.attr("src") != "") {
					e = c.attr("src", e)
				}
			}
		})
	}
};
        
        index.priceDOM = [];
      Util.listloop = function(b) {
	var e = {
		wrap: "",
		loopBox: "",
		loopChild: "",
		triggerLeft: ".switch-prev",
		triggerRight: ".switch-next",
		curCount: "",
		totalCount: "",
		hasCount: false,
		isLoop: true,
		isLazyImg: false,
		isLazyDom: false,
		delay: 0,
		hasLabel: true,
		hasLabelObj: null,
		labelObj: null,
		isRandom: false
	};
	$.extend(e, b);
	var m = $(e.wrap),
		u = m.find(e.triggerLeft),
		a = m.find(e.triggerRight),
		w = m.find(e.loopBox),
		k = w.find(e.loopChild),
		h = e.step.wide,
		p = e.scrollWidth.wide,
		z = Math.ceil(k.length / h),
		j = k.length,
		n = m.find(e.curCount),
		B = m.find(e.totalCount),
		A = $(e.hasLabelObj),
		y = 0,
		C;
	if (!bigscreen) {
		h = e.step.narrow;
		p = e.scrollWidth.narrow;
		C = k.length % h;
		z = Math.ceil(k.length / h);
		j = k.length - C
	}
	m.hover(function() {
		u.show();
		a.show()
	}, function() {
		u.hide();
		a.hide()
	});
	e.hasCount && B.html(z);
	u.unbind().click(function() {
		s()
	});
	a.unbind().click(function() {
		t()
	});
	$(document).keyup(function(i) {
		if (index.isInScreen(a)) {
			if (i.which == 37 || i.which == 75) {
				s()
			}
			if (i.which == 39 || i.which == 74) {
				t()
			}
		}
	});
	var q = b.labelObj,
		c = "",
		l;
	if (q) {
		if (z <= 1) {
			q.hide()
		}
		q.find(".prev").unbind().click(function() {
			s()
		});
		q.find(".next").unbind().click(function() {
			t()
		});
		for (l = 0; l < z; l++) {
			c += "<li></li>"
		}
		q.find("ul").html(c).find("li").click(function() {
			y = $(this).index();
			v(false, y)
		}).first().addClass("current")
	}

	function t() {
		if (z == 1 || w.is(":animated")) {
			return false
		}
		if (!e.isLoop) {
			y++;
			if (y >= z) {
				y = z - 1
			}
			v(false, y);
			return
		}
		if (y == z - 1) {
			for (var i = 0; i < h; i++) {
				k.eq(i).css({
					position: "relative",
					left: z * p + "px"
				})
			}
		}
		y++;
		v(function() {
			if (y == z) {
				y = 0;
				k.removeAttr("style");
				w.css("left", y * p)
			}
		}, y)
	}

	function s() {
		if (z == 1 || w.is(":animated")) {
			return false
		}
		if (!e.isLoop) {
			y--;
			if (y <= 0) {
				y = 0
			}
			v(false, y);
			return
		}
		if (y == 0) {
			for (var i = 1; i <= h; i++) {
				k.eq(j - i).css({
					position: "relative",
					left: -z * p + "px"
				})
			}
		}
		y--;
		v(function() {
			if (y == -1) {
				y = z - 1;
				k.removeAttr("style");
				w.css("left", -y * p)
			}
		}, y)
	}

	function v(F, E) {
		if (e.hasCount) {
			if (E > z - 1) {
				E = 0
			}
			if (E < 0) {
				E = z - 1
			}
			n.html(E + 1)
		}
		if (!F) {
			F = function() {}
		}
		w.stop(true).animate({
			left: -y * p
		}, 300, F);
		f();
		o();
		for (var i = (y * h); i < ((y + 1) * h); i++) {
			if (k.eq(i).attr("cptId")) {
				pid = k.eq(i).attr("cptId");
				if (pid) {
					try {
						apsAdboardCptPvObj.aps_adboard_loadAdCptPv(pid, index.cptTime)
					} catch (D) {}
				}
			}
		}
		r(y == z ? 0 : y);
		if (q) {
			q.find("li").removeClass("current").eq(y == z ? 0 : y).addClass("current")
		}
	}

	function f() {
		if (!e.isLazyDom) {
			return
		}
		var I = k.eq(y).find(".lazy-dom"),
			D = I.text(),
			H = D.length;
		if (H == 0) {
			return
		}
		var K = /\n+/g,
			G = /<!--.*?-->/ig,
			M = /\/\*.*?\*\//ig,
			E = /[ ]+</ig,
			J = D.replace(K, ""),
			L = J.replace(G, ""),
			F = L.replace(M, ""),
			i = F.replace(E, "<");
		I.before(i).remove();
		o()
	}

	function o() {
		lazyelem.detect()
	}

	function x() {
		var E = [],
			D, F;
		E.push('<div class="banner-pager"><div class="black"></div><div class="pager">');
		for (D = 1; D <= z; D++) {
			E.push("<a" + (D == 1 ? ' class="current"' : "") + ' href="javascript:;"></a>')
		}
		E.push("</div></div>");
		var i = $(E.join("")).appendTo(A);
		i.find("a").hover(function() {
			var G = $(this).index(),
				H = G * h,
				I = (G + 1) * h;
			F = setTimeout(function() {
				w.stop(true).animate({
					left: -G * p
				}, 300);
				r(G);
				if (e.hasCount) {
					n.html(G + 1)
				}
				y = G;
				if (e.isLazyDom) {
					var Q = k.eq(y).find(".lazy-dom"),
						K = Q.text(),
						P = K.length;
					if (P == 0) {
						return
					}
					var S = /\n+/g,
						O = /<!--.*?-->/ig,
						U = /\/\*.*?\*\//ig,
						L = /[ ]+</ig,
						R = K.replace(S, ""),
						T = R.replace(O, ""),
						N = T.replace(U, ""),
						J = N.replace(L, "<");
					Q.before(J).remove()
				}
				if (e.isLazyImg) {
					for (var M = H; M < I; M++) {
						k.eq(M).find("img[src3]").each(function() {
							var V = $(this);
							V.attr("src", V.attr("src3")).removeAttr("src3").addClass("err-product")
						})
					}
				}
			}, 100)
		}, function() {
			clearTimeout(F)
		})
	}

	function r(D) {
		m.find(".pager a").removeClass("current").eq(D).addClass("current")
	}
	if (e.hasLabel && z > 1) {
		x()
	}
	if (e.delay) {
		var g = setInterval(function() {
			t()
		}, e.delay);
		m.hover(function() {
			clearInterval(g)
		}, function() {
			g = setInterval(function() {
				t()
			}, e.delay)
		})
	}
};
           index.cmsBgFunc = function(b) {
	var c = "";
	for (var a = 0; a < 10; a++) {
		if (b.length == 0) {
			break
		}
		if (a != 0) {
			c += ","
		}
		c += $(b.shift()).attr("cms-name")
	}
	saExportUtil.sendCustomExpoData(c, 1);
	if (b.length > 0) {
		index.cmsBgFunc(b)
	} else {
		index.cmsBgFlag = false
	}
};   
        Util.getCurrentTime = function() {
	var c = $.Deferred(),
		b, a = this;
	if (this.serverOffset) {
		b = new Date().getTime() + this.serverOffset;
		c.resolve(b)
	} else {
		$.ajax({
			url: "https://f.m.suning.com/api/ct.do",
			dataType: "jsonp",
			timeout: 3000,
			success: function(e) {
				b = parseInt(e.currentTime);
				a.serverOffset = b - new Date().getTime();
				c.resolve(b)
			},
			error: function() {
				b = new Date().getTime();
				c.resolve(b)
			}
		})
	}
	return c.promise()
};
        index.msInit = function() {
            
		var c = function(h, g) {
			 
				var i = "https://tuijian.suning.com/recommend-portal/dyBase.jsonp?u=&c=&cityId=&sceneIds=9-75&count=20";
				$.ajax({
					url: i,
					dataType: "jsonp",
					timeout: 10000,
					jsonpCallback: "msNowData",
					success: function(t) {
						if (t && t.sugGoods && t.sugGoods[0] && t.sugGoods[0].skus && t.sugGoods[0].skus.length > 3) {
							var r = t.sugGoods[0],
								v = r.currentTime,
								n = r.start,
								p = r.nextTime,
								u = r.next1,
								s = r.next2,
								o = $(h).find(".t-list li"),
								q = "",
								k = $(h).find(".con-list-cur"),
								l = null,
								m = t.sugGoods[0].skus.length;
							m = m - m % 4;
							r.skus = r.skus.slice(0, m);
							$(h).find(".cc-infor i").html(v);
							o.eq(0).find("i").html(v + ":00-");
							o.eq(1).attr("data-cc", r.nextTime1).find("i").html(u + ":00-");
							o.eq(2).attr("data-cc", r.nextTime2).find("i").html(s + ":00-");
							b(p, h);
							if (!g) {
								o.hover(function() {
									var x = $(this).index(),
										y = $(this),
										z = $(".ms-floor .tab-content .con-list"),
										w = z.eq(x);
									l = setTimeout(function() {
										y.addClass("cur").siblings().removeClass("cur");
										w.addClass("con-list-cur").siblings().removeClass("con-list-cur");
										if (x != 0) {
											e(w, x, g)
										}
									}, 100)
								}, function() {
									clearTimeout(l)
								})
							}
							q += "<ul>";
							$.each(r.skus, function(A, D) {
								var x = "index3_none_recsnqgfq_1-" + (A + 1) + "_p_" + D.shopCode + "_" + D.sugGoodsCode + "_" + D.handwork,
									y = "baoguang_recsnqgfq_1-" + (A + 1) + "_" + D.shopCode + "_" + D.sugGoodsCode + "_" + D.handwork + "_none",
									E = "https://image" + Util.getRandomNum() + ".suning.cn/uimg/nmps/MBLSPZT/" + D.activityId + SFE.base.productFomate.getRealPartNumber(D.sugGoodsCode) + "picH_1_200x200.jpg",
									z = new Date(n).getTime(),
									C = $(h).find(".tab-content").attr("data-link") ? $(h).find(".tab-content").attr("data-link") : "https://qiang.suning.com",
									B = C + "?activityId=" + D.promotionId + "&timelong=" + z,
									w = parseFloat(D.price) < parseFloat(D.refPrice) ? '<span class="refprice"><i>¥</i><em>' + parseFloat(D.refPrice) + "</em></span>" : '<span class="refprice"></span>';
								q += ["<li>", 
                                      '<a href="' + B + '" target="_blank" name="' + x + '" id="' + y + '">', 
                                      '<img lazy-src="' + E + '" src="https://res.suning.cn/public/v3/images/blank.gif">',
                                      '<p class="title" title="' + D.sugGoodsName + '">' + D.sugGoodsName + "</p>", 
                                      '<p class="ms-price">', '<span class="price"><i>¥</i><em>' + parseFloat(D.price) + "</em></span>", w,
                                      "</p>", 
                                      '<p class="line"><span style="width:' + D.progressBar + 'px;"></span></p>', 
                                      '<p class="precent">已抢<i>' + D.progressBar + "</i>%</p>",
                                      "</a>", 
                                      "</li>"].join("")
							});
							q += "</ul>"; 
							k.find(".list-content").html(q);
							lazyelem.listen(k.find("img[lazy-src]"), "img");
							lazyelem.detect();
							Util.baoguangFun("baoguang_recsnqgfq_1");
							if (k.find("li").length > 3 && !g) {
								Util.listloop({
									wrap: k,
									loopBox: "ul",
									loopChild: "li",
									triggerLeft: k.find(".left-pointer"),
									triggerRight: k.find(".right-pointer"),
									step: {
										wide: 4,
										narrow: 4
									},
									scrollWidth: {
										wide: 800,
										narrow: 800
									},
									isLazyImg: true,
									isLoop: true
								})
							}
						} else {
							f();
							$(".ms-floor .cc-infor").hide();
							$(".ms-floor .time").hide()
						}
					},
					error: function() {
						f();
						$(".ms-floor .cc-infor").hide();
						$(".ms-floor .time").hide()
					}
				})
			
		};
            var b = function(g, h) {
			Util.getCurrentTime().done(function(i) {
				if (i < parseInt(g)) {
					Util.CountDown({
						obj: $(h).find(".time"),
						startTime: 0,
						endTime: g,
						nowTime: i,
						beforeStart: function() {},
						isStart: function() {
							var j = this.gap[3].toString(),
								l = this.gap[2].toString(),
								m = this.gap[1].toString(),
								k = this.gap[0].toString();
							this.obj.html('<span class="hour-node">' + l + '</span><span class="minute-node">' + m + '</span><span class="second-node">' + k + "</span>")
						},
						callback: function() {
							c(h, true)
						}
					})
				} else {
					$(h).find(".time").hide()
				}
			})
		};
var a = function() {
			$(".ms-floor .con-list").eq(0).addClass("con-list-cur").siblings().removeClass("con-list-cur");
			$(".ms-floor .t-list li").eq(0).addClass("cur").siblings().hide()
		};
            var e = function(j, h, g) {
			var i = $(".ms-floor").find(".t-list li").eq(h).attr("data-cc");
			wrapper = $(".con-list").eq(h);
			if (j.attr("data-load") == "true") {
				return
			}
			j.attr("data-load", "true");
			 
				var k =  "https://tuijian.suning.com/recommend-portal/dyBase.jsonp?u=&c=&cityId=&sceneIds=9-76&count=4&parameter=" + i;
				$.ajax({
					url: k,
					dataType: "jsonp",
					timeout: 10000,
					jsonpCallback: "yrNowData" + h,
					success: function(m) {
						if (m && m.sugGoods && m.sugGoods[0] && m.sugGoods[0].skus && m.sugGoods[0].skus.length > 3) {
							var o = m.sugGoods[0],
								p = "",
								n = m.sugGoods[0].skus.length;
							n = n - n % 4;
							o.skus = o.skus.slice(0, n);
							p += "<ul>";
							$.each(o.skus, function(u, x) {
								if (u > 3) {
									return false
								}
								var r = "index3_none_recsnqgyr_" + h + "-" + (u + 1) + "_p_" + x.shopCode + "_" + x.sugGoodsCode + "_" + x.handwork,
									s = "baoguang_recsnqgyr_" + h + "-" + (u + 1) + "_" + x.shopCode + "_" + x.sugGoodsCode + "_" + x.handwork + "_none",
									y = "https://image" + Util.getRandomNum() + ".suning.cn/uimg/nmps/MBLSPZT/" + x.activityId + SFE.base.productFomate.getRealPartNumber(x.sugGoodsCode) + "picH_1_200x200.jpg",
									t = new Date(i).getTime(),
									w = $(j).find(".tab-content").attr("data-link") ? $(j).find(".tab-content").attr("data-link") : "//qiang.suning.com",
									v = w + "?activityId=" + x.promotionId + "&timelong=" + t,
									q = parseFloat(x.price) < parseFloat(x.refPrice) ? '<span class="refprice"><i>楼</i><em>' + parseFloat(x.refPrice) + "</em></span>" : '<span class="refprice"></span>';
								p += ["<li>", '<a href="' + v + '" target="_blank" name="' + r + '" id="' + s + '">', '<img lazy-src="' + y + '" src="https://res.suning.cn/public/v3/images/blank.gif">', '<p class="title">' + x.sugGoodsName + "</p>", '<p class="ms-price">', '<span class="price"><i>¥</i><em>' + parseFloat(x.price) + "</em></span>", q, "</p>", '<p class="pretext">即将秒杀 敬请期待</p>', "</a>", "</li>"].join("")
							});
							p += "</ul>";
							wrapper.find(".list-content").html(p);
							lazyelem.listen(wrapper.find("img[lazy-src]"), "img");
							lazyelem.detect();
							Util.baoguangFun("baoguang_recsnqgyr_" + h)
						} else {
							a()
						}
					},
					error: function() {
						a()
					}
				})
            }
            
            
	
            console.log("55555555555555555");
            lazyelem.listen(".ms-floor", "fn", function(g) {
		c(g)
	})
        };
        index.haohuoNew = function() {
	lazyelem.listen(".hh-module", "fn", function(b) {
     
		if ($(b).attr("data-tuijian") == "true") {
            
	 console.log("9999999999999999nihao");
				var g = "hhcb",
					c = "https://tuijian.suning.com/recommend-portal/dyBase.jsonp?u=&c=&cityId=&sceneIds=18-99&count=10";
				$.ajax({
					url: c,
					dataType: "jsonp",
					timeout: 10000,
					jsonpCallback: g,
					success: function(j) {
                        
						if (j && j.sugGoods && j.sugGoods[0].skus && j.sugGoods[0].skus.length > 0) {
							var i = [],
								k = [];
							$.each(j.sugGoods[0].skus, function(l, m) {
								if (e(i, m.catGroupId) == -1) {
									i.push(m.catGroupId);
									k.push(m)
								}
								if (k.length > 5) {
									return false
								}
							});
							if (k.length > 5) {
								f(k)
							} else {
								index.tjNumber("index_hh_number", k.length);
								if (typeof hhCmsData != "undefined" && hhCmsData.length > (6 - k.length)) {
									$.each(hhCmsData, function(l, m) {
										if (e(i, m.id) == -1) {
											i.push(m.id);
											k.push(m)
										}
										if (k.length > 5) {
											return false
										}
									});
									if (k.length > 5) {
										f(k)
									} else {
										a()
									}
								} else {
									a()
								}
							}
						} else {
							index.tjNumber("index_hh_number", 0);
							a()
						}
					},
					error: function() {
						a()
					}
				});

				function e(j, l) {
					var k = j.length;
					while (k--) {
						if (j[k] === l) {
							return k
						}
					}
					return -1
				}

				function f(m) {
					var n = "<ul>",
						l = m.length > 6 ? 6 : m.length;
					var p;
					for (var j = 0; j < l; j++) {
						if (!m[j].fromCms) {
							var k = "index3_none_rechhtjrk_1-" + (j + 1) + "_p_" + m[j].contentId + "_" + m[j].sugGoodsCode + "_" + m[j].handwork;
							var o = "baoguang_rechhtjrk_1-" + (j + 1) + "_" + m[j].contentId + "_" + m[j].sugGoodsCode + "_" + m[j].handwork;
							p = m[j].productType == 3 || m[j].productType == 5 ? m[j].supplierCode : m[j].shopCode;
							n += '<li><a href="//news.suning.com/whaohuo/ditem_' + m[j].contentId + ".html?src=" + k + '" name="' + k + '" target="_blank" id="' + o + '"><p class="name">' + m[j].title + '</p><p class="desc"><i>' + m[j].likeCnt + '</i>人说好</p><img lazy-src="https://image' + Util.getRandomNum() + ".suning.cn/uimg/b2c/qrqm/" + p + m[j].sugGoodsCode + "_200x200.jpg?ver=" + m[j].picVersion + '" src="https://res.suning.cn/public/v3/images/blank.gif"></a></li>'
						} else {
							n += '<li><a href="' + m[j].linkUrl + '" target="_blank" name="' + m[j].trickPoint + '" cms-name="' + m[j].trickPoint + '"><p class="name">' + m[j].title + '</p><p class="desc"><i>' + m[j].desc + '</i>人说好</p><img lazy-src="https:' + sn.imgHost + m[j].picUrl + '" src="https://res.suning.cn/public/v3/images/blank.gif"></a></li>'
						}
					}
					n += "</ul>";
					$(".hh-module .content").html(n);
					index.getwebp(".hh-module ul");
					lazyelem.listen($(".hh-module ul").find("img[lazy-src]"), "img");
					Util.baoguangFun("baoguang_rechhtjrk");
					lazyelem.listen($(".hh-module ul").find("[cms-name]"), "fn", function(i) {
						index.cmsBgDom.push(i);
						if (index.cmsBgFlag) {
							return
						}
						index.cmsBgFlag = true;
						setTimeout(function() {
							index.cmsBgFunc(index.cmsBgDom)
						}, 100)
					})
				}
			
		} else {
             console.log("22222222222222222222nihao");
			a();
            
		}

		function a() {
			if (typeof hhCmsData != "undefined" && hhCmsData && hhCmsData.length > 5) {
				var e = "<ul>";
				for (var c = 0; c < 6; c++) {
					e += '<li><a href="' + hhCmsData[c].linkUrl + '" target="_blank" name="' + hhCmsData[c].trickPoint + '" cms-name="' + hhCmsData[c].trickPoint + '"><p class="name">' + hhCmsData[c].title + '</p><p class="desc"><i>' + hhCmsData[c].desc + '</i>人说好</p><img lazy-src="https:' + sn.imgHost + hhCmsData[c].picUrl + '" src="https://res.suning.cn/public/v3/images/blank.gif"></a></li>'
				}
				e += "</ul>";
				$(".hh-module .content").html(e);
				index.getwebp(".hh-module ul");
				lazyelem.listen($(".hh-module ul").find("img[lazy-src]"), "img");
				lazyelem.listen($(".hh-module ul").find("[cms-name]"), "fn", function(f) {
					index.cmsBgDom.push(f);
					if (index.cmsBgFlag) {
						return
					}
					index.cmsBgFlag = true;
					setTimeout(function() {
						index.cmsBgFunc(index.cmsBgDom)
					}, 100)
				})
			} else {
				$(".secondtj-wrapper").remove();
			}
		}
	})
};
        index.getRecommand = function() {
	lazyelem.listen(".reco-floor", "fn", function(c) {
		if ($(c).attr("data-tuijian") == "true") {
			
				var e = "https://wp.yunxiu520.com/userfiles/01/cainixihuan.jsonp";
				$.ajax({
					url: e,
					dataType: "jsonp",
					timeout: 10000,
					jsonpCallback: "recommand",
					success: function(g) {
                       
						if (g && g.data && g.data.sugGoods && g.data.sugGoods[0]) {
							if (g.data.sugGoods[0]["resCode"] == "01" || g.data.sugGoods[0]["resCode"] == "03") {
								if (g.data.sugGoods[0]["skus"].length < 15) {
								a();
								} else {
								b(g.data);
								}
							} else {
							a();
							}
						} else {
							a();
						}
						lazyelem.detect()
					},
					error: function() {
				
                      
                        
					}
				})
			
		} else {
		
		}
        function b(r) {
			var k = "",
				g = r.sugGoods[0]["skus"],
				f = r.sugGoods[0]["skus"].length,
				o = "";
			f = f - f % 5;
			for (var v = 0; v < f; v++) {
				var e = "";
				if (g[v]["promotionInfo"] != "") {
					e += "<span>" + g[v]["promotionInfo"] + "</span>"
				}
				if (g[v].promotionList && g[v].promotionList.length > 0) {
					for (var h = 0; h < g[v].promotionList.length; h++) {
						e += "<span>" + g[v].promotionList[h].bonusRulesDesc + "</span>"
					}
				}
				var q = g[v]["sugGoodsId"];
				var j = g[v]["sugGoodsCode"];
				var m = g[v]["vendorId"];
				var A = g[v]["handwork"];
				var x = "index3_none_recscnxhB_1-" + (v + 1) + "_p_" + m + "_" + j + "_" + A;
				var p = "baoguang_recscnxhB_1-" + (v + 1) + "_" + m + "_" + j + "_" + A;
				var w = g[v].productType == 3 || g[v].productType == 5 ? g[v].supplierCode : g[v].shopCode;
				var u = {
					picUrl: "",
					partNumber: j,
					shopPicUrl: "/uimg/b2c/newcatentries/",
					vendorCode: w,
					linkType: "",
					trickPoint: x,
					linkUrl: ""
				};
				var l = g[v]["productType"];
				var t = g[v]["price"];
				var s = g[v]["sugGoodsName"];
				if (t) {
					if (t.indexOf(".") <= -1) {
						t = t
					} else {
						t = t.split(".")[0] + "." + t.split(".")[1]
					}
				} else {
					t = ""
				}
				var n = "";
				if (l == "1" || l == "3") {
					n = '<i class="zyIcon"></i>'
				}
				if (l == "4" || l == "5") {
					n = '<i class="hwgZyIcon"></i>'
				}
				if (l == "6") {
					n = '<i class="hwgIcon"></i>'
				}
				if (l == "7") {
					n = '<i class="zyIcon"></i><i class="jwIcon"></i>'
				}
                
				var y = g[v].pictureUrl ? g[v].pictureUrl + "?format=400h_400w_4e_80q" : "//image" + Util.getRandomNum() + ".suning.cn" + u.shopPicUrl + w + "-" + j + "_1_400x400.jpg";
				k += '<li><a class="pro-link" name="' + x + '" href="' + commodity.getUrl(u, x) + '" target="_blank" title="' + s + '" id="' + p + '"><img lazy-src="http:' + y + '" src="https://res.suning.cn/public/v3/images/blank.gif"><p class="title">' + n + s + '</p><p class="price"><i></i>' + t + '</p><p class="cxIcon">' + e + '</p></a><a href="http://rec.suning.com/show/find/' + m + "/" + j + '.htm" class="same" target="_blank">找相似</a></li>'
			}
			$(".reco-floor ul").html(k);
			lazyelem.listen($(".reco-floor").find("img[lazy-src]"), "img");
			Util.baoguangFun("baoguang_recscnxhB_1")
		}

		
	
	})
};
index.qingdan = function() {
	lazyelem.listen(".qd-module", "fn", function(c) {
		if ($(c).attr("data-tuijian") == "true") {
			 
				var f = "qdcb",
					e = "https://tuijian.suning.com/recommend-portal/dyBase.jsonp?u=&c=&cityId=&sceneIds=18-100&count=4";
				$.ajax({
					url: e,
					dataType: "jsonp",
					timeout: 10000,
					jsonpCallback: f,
					success: function(h) {
						if (h && h.sugGoods && h.sugGoods[0].skus && h.sugGoods[0].skus.length > 3) {
							b(h.sugGoods[0].skus)
						} else {
							a()
						}
					},
					error: function() {
						a()
					}
				})
			
		} else {
			a()
		}

		function b(o) {
			var h = "",
				r = "";
			var n;
			for (var q = 0; q < 4; q++) {
				r = "";
				var k = o[q].conts[0],
					p = {};
				var l = "index3_none_recbqqdrk_1-" + (q + 1) + "_p_" + k.contentId + "_" + k.gds[0].sugGoodsCode + "_" + k.gds[0].handwork,
					e = "baoguang_recbqqdrk_1-" + (q + 1) + "_" + k.contentId + "_none_" + k.gds[0].handwork;
				p.recid = k.contentId;
				p.src = l;
				var f = o[q].conts[0].gds.length > 3 ? 3 : o[q].conts[0].gds.length;
				for (var g = 0; g < f; g++) {
					var m = o[q].conts[0].gds[g];
					n = m.productType == 3 || m.productType == 5 ? m.supplierCode : m.shopCode;
					p["vendor" + (g + 1)] = n;
					p["pro" + (g + 1)] = m.sugGoodsCode;
					p["ver" + (g + 1)] = m.picVersion || "";
					p["pictureUrl" + (g + 1)] = encodeURIComponent(m.pictureUrl) || ""
				}
				h += '<li class="item"><a id="' + e + '"><p class="name">' + k.title + '</p><p class="infor"><span>' + o[q].labelName + "</span><i>" + k.desc + "</i></p>";
				for (var g = 0; g < f; g++) {
					r += '<img lazy-src="https://image' + Util.getRandomNum() + ".suning.cn/uimg/b2c/qrqm/" + p["vendor" + (g + 1)] + p["pro" + (g + 1)] + "_200x200.jpg?ver=" + p["ver" + (g + 1)] + '" src="https://res.suning.cn/public/v3/images/blank.gif">'
				}
				h += r + "</a></li>"
			}
			$(".qd-module ul").html(h);
			index.getwebp(".qd-module ul");
			lazyelem.listen($(".qd-module ul").find("img[lazy-src]"), "img");
			Util.baoguangFun("baoguang_recbqqdrk");
			lazyelem.detect()
		}

		function a() {
			if ($(".qdApg-floor").attr("data-cms") == "true") {
				$(".qd-module ul").html($("#qingdanContent").html());
				index.getwebp(".qd-module ul");
				lazyelem.listen($(".qd-module ul").find("img[lazy-src]"), "img");
				lazyelem.listen($(".qd-module ul").find("[cms-name]"), "fn", function(h) {
					index.cmsBgDom.push(h);
					if (index.cmsBgFlag) {
						return
					}
					index.cmsBgFlag = true;
					setTimeout(function() {
						index.cmsBgFunc(index.cmsBgDom)
					}, 100)
				})
			} else {
				var e = $("body").attr("data-pageCode"),
					f = $(".qdApg-floor").attr("data-fullId"),
					g;
				index.getCMSHtml(e, f, function(i) {
					var h = new Date().getTime();
					g = i.data;
					$(".qdApg-floor .hideArea").html(g);
					$(".qdApg-floor").attr("data-cms", "true");
					$(".qd-module ul").html($("#qingdanContent").html());
					index.getwebp(".qd-module ul");
					lazyelem.listen($(".qd-module ul").find("img[lazy-src]"), "img");
					lazyelem.listen($(".qd-module ul").find("[cms-name]"), "fn", function(j) {
						index.cmsBgDom.push(j);
						if (index.cmsBgFlag) {
							return
						}
						index.cmsBgFlag = true;
						setTimeout(function() {
							index.cmsBgFunc(index.cmsBgDom)
						}, 100)
					})
				}, function() {
					$(".qdApg-floor").hide()
				}, 1)
			}
		}
	})
};
index.getCMSHtml = function(f, g, h, b, a) {
	var e = window.location.host;
	var c = "",
		i;
	i = "lazyload" + g + a;
	if (sn.isBack && ("true" == sn.isBack)) {
		c = "https://" + e + "/cms-admin-web/page/previewModel/" + f + "_" + g + "_" + previewTimes + "_" + i + ".htm"
	} else {
		c = "https:"+sn.cmsLibDomain + "/homepage/model/" + f + "_" + g + "_" + i + ".json"
	}
	$.ajax({
		url: c,
		cache: false,
		dataType: "jsonp",
		jsonpCallback: i,
		success: function(j) {
			h(j)
		},
		error: function() {
			b()
		}
	})
};
  
index.paihangbangNew = function() {
	lazyelem.listen(".phb-module", "fn", function(b) {
		if ($(b).attr("data-tuijian") == "true") {
			 console.log("woshi");
				var f = "phbCate",
					c = "https://f.m.suning.com/wapIndex/getPhbList.do?u=&c=154184828110234685&cityId=311&sceneIds1=6-51&count1=6&sceneIds2=6-52&count2=10&callback=phbCate&_=1541860362740";
				$.ajax({
					url: c,
					dataType: "jsonp",
					timeout: 10000,
					jsonpCallback: f,
					success: function(h) {
					console.log("nishishui");
					},
					error: function() {
						a();
					}
				});

				
				
		} else {
			
		}
function a() {
			if ($(".secondtj-wrapper").attr("data-cms") == "true") {
				$(".phb-module .content").html($("#second_phb").html());
				index.getwebp(".phb-module");
				lazyelem.listen($(".phb-module").find("img[lazy-src]"), "img");
				lazyelem.listen($(".phb-module").find("li[data-sku]"), "fn", function(h) {
					index.priceDOM.push(h);
					if (index.getPriceFlag) {
						return
					}
					index.getPriceFlag = true;
					GetPrice.queryprice(index.priceDOM, "1", index.getpricecallback)
				});
				lazyelem.listen($(".phb-module .content").find("[cms-name]"), "fn", function(h) {
					index.cmsBgDom.push(h);
					if (index.cmsBgFlag) {
						return
					}
					index.cmsBgFlag = true;
					setTimeout(function() {
						index.cmsBgFunc(index.cmsBgDom)
					}, 100)
				});
				var g = $(".phb-module .content");
				if (g.find(".com-ul-wrapper").length > 1) {
					g.append('<a href="javascript:;" class="btn btn-left"></a><a href="javascript:;" class="btn btn-right"></a><div class="banner-nav-wrapper"></a>');
					Util.listloop({
						wrap: g,
						loopBox: ".commodity-wrapper",
						loopChild: ".com-ul-wrapper",
						triggerLeft: g.find(".btn-left"),
						triggerRight: g.find(".btn-right"),
						hasLabelObj: ".banner-nav-wrapper",
						step: {
							wide: 1,
							narrow: 1
						},
						scrollWidth: {
							wide: 369,
							narrow: 369
						},
						isLazyImg: true,
						isLoop: true
					})
				}
			} else {
				var c = $("body").attr("data-pageCode"),
					e = $(".secondtj-wrapper").attr("data-fullId"),
					f;
				index.getCMSHtml(c, e, function(i) {
					var h = new Date().getTime();
					f = i.data;
					$(".secondtj-wrapper .hideArea").html(f);
					$(".secondtj-wrapper").attr("data-cms", "true");
					$(".phb-module .content").html($("#second_phb").html());
					index.getwebp(".phb-module");
					lazyelem.listen($(".phb-module").find("img[lazy-src]"), "img");
					lazyelem.listen($(".phb-module .content").find("[cms-name]"), "fn", function(k) {
						index.cmsBgDom.push(k);
						if (index.cmsBgFlag) {
							return
						}
						index.cmsBgFlag = true;
						setTimeout(function() {
							index.cmsBgFunc(index.cmsBgDom)
						}, 100)
					});
					var j = $(".phb-module .content");
					if (j.find(".com-ul-wrapper").length > 1) {
						j.append('<a href="javascript:;" class="btn btn-left"></a><a href="javascript:;" class="btn btn-right"></a><div class="banner-nav-wrapper"></a>');
						Util.listloop({
							wrap: j,
							loopBox: ".commodity-wrapper",
							loopChild: ".com-ul-wrapper",
							triggerLeft: j.find(".btn-left"),
							triggerRight: j.find(".btn-right"),
							hasLabelObj: ".banner-nav-wrapper",
							step: {
								wide: 1,
								narrow: 1
							},
							scrollWidth: {
								wide: 369,
								narrow: 369
							},
							isLazyImg: true,
							isLoop: true
						})
					}
					lazyelem.listen($(".phb-module").find("li[data-sku]"), "fn", function(k) {
						index.priceDOM.push(k);
						if (index.getPriceFlag) {
							return
						}
						index.getPriceFlag = true;
						
					})
				}, function() {
					$(".secondtj-wrapper").hide()
				}, 3)
			}
		}
	
	})
};
        index.zhutiNew = function() {
	lazyelem.listen(".tj-module", "fn", function(b) {
		if ($(b).attr("data-tuijian") == "true") {
		
				var f = "ztcb",
					c = "https://tuijian.suning.com/recommend-portal/recommend/paramsBiz.jsonp?u=&c=&cityId=&sceneIds=16-67&count=6";
				$.ajax({
					url: c,
					dataType: "jsonp",
					timeout: 10000,
					jsonpCallback: f,
					success: function(k) {
						var j = [];
						if (k && k.sugGoods && k.sugGoods[0].skus &&   
                            k.sugGoods[0].skus.length > 3) {
							for (var h = 0; h < k.sugGoods[0].skus.length; h++) {
								if (k.sugGoods[0].skus[h].list && k.sugGoods[0].skus[h].list.length > 1) {
									j.push(k.sugGoods[0].skus[h])
								}
								if (j.length == 4) {
									break
								}
							}
							if (j.length > 3) {
								e(j)
							} else {
								a()
							}
				  		} else {
							a()
						}
					},
					error: function() {
						a()
					}
				});

				function e(l) {
					var j = "<ul>";
					for (var m = 0; m < l.length; m++) {
						if (l[m].list.length < 2) {
							a();
							return
						}
						var q = l[m].list[0],
							n = l[m].list[1];
						var k = "index3_none_recpzttj_1-" + (m + 1) + "_p_" + q.shopId + "_" + q.sugGoodsCode + "_" + l[m].handwork;
						var h = "baoguang_recpzttj_1-" + (m + 1) + "_" + q.shopId + "_" + q.sugGoodsCode + "_" + l[m].handwork;
						var p = q.productType == 3 || q.productType == 5 ? q.supplierCode : q.shopId,
							o = n.productType == 3 || n.productType == 5 ? n.supplierCode : n.shopId;
						j += '<li><a href="//cuxiao.suning.com/tesetuijian.html?mainCode=' + l[m].mainCode + "&catalogueId=" + l[m].labelCode + "&shopCode=" + q.shopId + "&sugGoodsCode=" + q.sugGoodsCode + "&supplierCode=" + q.supplierCode + "&productType=" + q.productType + "&pictureUrl=" + encodeURIComponent(q.pictureUrl) + '" target="_blank" name="' + k + '" id="' + h + '"><p class="name">' + l[m].labelName + '</p><div class="clear"></div><p class="desc">' + l[m].labelDesc + '</p><div class="clear"></div><img class="first-img" src="https:' + sn.imgHost + "/uimg/b2c/qrqm/" + p + q.sugGoodsCode + "_200x200.jpg?ver=" + q.picVersion + '" alt=""><img src="https:' + sn.imgHost + "/uimg/b2c/qrqm/" + o + n.sugGoodsCode + "_200x200.jpg?ver=" + n.picVersion + '" alt=""></a></li>'
					}
                    j += "</ul>"
					$(".tj-module .content").html(j);
					index.getwebp(".tj-module .content");
					lazyelem.listen($(".tj-module .content").find("img[lazy-src]"), "img");
					Util.baoguangFun("baoguang_recpzttj")
				}
		
		}

		function a() {
			if ($(".secondtj-wrapper").attr("data-cms") == "true") {
				$(".phb-module .content").html($("#second_phb").html());
				index.getwebp(".phb-module");
				lazyelem.listen($(".phb-module").find("img[lazy-src]"), "img");
				lazyelem.listen($(".phb-module").find("li[data-sku]"), "fn", function(h) {
					index.priceDOM.push(h);
					if (index.getPriceFlag) {
						return
					}
					index.getPriceFlag = true;
					GetPrice.queryprice(index.priceDOM, "1", index.getpricecallback)
				});
				lazyelem.listen($(".phb-module .content").find("[cms-name]"), "fn", function(h) {
					index.cmsBgDom.push(h);
					if (index.cmsBgFlag) {
						return
					}
					index.cmsBgFlag = true;
					setTimeout(function() {
						index.cmsBgFunc(index.cmsBgDom)
					}, 100)
				});
				var g = $(".phb-module .content");
				if (g.find(".com-ul-wrapper").length > 1) {
					g.append('<a href="javascript:;" class="btn btn-left"></a><a href="javascript:;" class="btn btn-right"></a><div class="banner-nav-wrapper"></a>');
					Util.listloop({
						wrap: g,
						loopBox: ".commodity-wrapper",
						loopChild: ".com-ul-wrapper",
						triggerLeft: g.find(".btn-left"),
						triggerRight: g.find(".btn-right"),
						hasLabelObj: ".banner-nav-wrapper",
						step: {
							wide: 1,
							narrow: 1
						},
						scrollWidth: {
							wide: 369,
							narrow: 369
						},
						isLazyImg: true,
						isLoop: true
					})
				}
			} else {
				var c = $("body").attr("data-pageCode"),
					e = $(".secondtj-wrapper").attr("data-fullId"),
					f;
				index.getCMSHtml(c, e, function(i) {
					var h = new Date().getTime();
					f = i.data;
					$(".secondtj-wrapper .hideArea").html(f);
					$(".secondtj-wrapper").attr("data-cms", "true");
					$(".phb-module .content").html($("#second_phb").html());
					index.getwebp(".phb-module");
					lazyelem.listen($(".phb-module").find("img[lazy-src]"), "img");
					lazyelem.listen($(".phb-module .content").find("[cms-name]"), "fn", function(k) {
						index.cmsBgDom.push(k);
						if (index.cmsBgFlag) {
							return
						}
						index.cmsBgFlag = true;
						setTimeout(function() {
							index.cmsBgFunc(index.cmsBgDom)
						}, 100)
					});
					var j = $(".phb-module .content");
					if (j.find(".com-ul-wrapper").length > 1) {
						j.append('<a href="javascript:;" class="btn btn-left"></a><a href="javascript:;" class="btn btn-right"></a><div class="banner-nav-wrapper"></a>');
						Util.listloop({
							wrap: j,
							loopBox: ".commodity-wrapper",
							loopChild: ".com-ul-wrapper",
							triggerLeft: j.find(".btn-left"),
							triggerRight: j.find(".btn-right"),
							hasLabelObj: ".banner-nav-wrapper",
							step: {
								wide: 1,
								narrow: 1
							},
							scrollWidth: {
								wide: 369,
								narrow: 369
							},
							isLazyImg: true,
							isLoop: true
						})
					}
					lazyelem.listen($(".phb-module").find("li[data-sku]"), "fn", function(k) {
						index.priceDOM.push(k);
						if (index.getPriceFlag) {
							return
						}
						index.getPriceFlag = true;
						GetPrice.queryprice(index.priceDOM, "1", index.getpricecallback)
					})
				}, function() {
					$(".secondtj-wrapper").hide()
				}, 3)
			}
		}
	})
};
        index.getenv = function() {
	switch (Util.getEnv(_hostName)) {
	case "pre":
		zsqDomain = "//jupre.m.cnsuning.com";
		codeDomain = "//codepre.cnsuning.com";
		middleDomain = "//cpre.m.cnsuning.com/channelwap.htm";
		esDomain = "//2.suning.com/";
		tryDomain = "//tpssit.cnsuning.com/tps/";
		zbDomain = "//slv.suning.com/slv-web/pc/list.jsonp";
		cmsApiDomain = "//libpre.cnsuning.com";
		msiDomain = "//mypre.cnsuning.com/";
		custHeadUrl = "//uimgpre.cnsuning.com/uimg/cmf/cust_headpic/";
		scriptDomianDir = "//presslres.suning.com/";
		httpsDomain = "https://sslpre.cnsuning.com/";
		ysDomain = "//nmpspre.cnsuning.com";
		tuijianDomain = "//tuijianxgpre.cnsuning.com";
		hwgDomain = "//gpre.cnsuning.com/index_pc.html";
		zhiboDomain = "//videopre.cnsuning.com";
		pgDomain = "//pin.m.suning.com/";
		nmqsDomain = "//nmqspre.cnsuning.com";
		fmDomain = "//fprexg.m.cnsuning.com";
		passportLogonUrl = "https://passportpre.cnsuning.com/ids/login";
		superVip = "https://supervippre.cnsuning.com/snprime-web/toIndex.do";
		vipDomain = "https://vippre.cnsuning.com/";
		newsDomain = "//crdnode-xgpre.cnsuning.com/";
		break;
	case "sit":
		zsqDomain = "//jusit.m.cnsuning.com";
		codeDomain = "//codesit.cnsuning.com";
		middleDomain = "//csit.m.cnsuning.com/channelwap.htm";
		esDomain = "//2.suning.com/";
		tryDomain = "//try.suning.com/tps/";
		zbDomain = "//slvsit.cnsuning.com/slv-web/pc/list.jsonp";
		cmsApiDomain = "//libpre.cnsuning.com";
		msiDomain = "//mysit.cnsuning.com/msi-web/";
		custHeadUrl = "//uimgpre.cnsuning.com/uimg/cmf/cust_headpic/";
		scriptDomianDir = "//sitsslres.suning.com/";
		httpsDomain = "https://sslsit.cnsuning.com/";
		ysDomain = "//nmpssit.cnsuning.com";
		tuijianDomain = "//10.19.90.232:9080";
		hwgDomain = "//gpre.cnsuning.com/index_pc.html";
		zhiboDomain = "//videosit.cnsuning.com";
		pgDomain = "//pin.m.suning.com/";
		nmqsDomain = "//nmqssit.cnsuning.com";
		fmDomain = "//f.msit.cnsuning.com";
		passportLogonUrl = "https://passportsit.cnsuning.com/ids/login";
		superVip = "https://supervippre.cnsuning.com/snprime-web/toIndex.do";
		vipDomain = "https://vippre.cnsuning.com/";
		newsDomain = "//crdnode-pre.cnsuning.com/";
		break;
	case "prd":
		codeDomain = "//code.suning.cn";
		zsqDomain = "//ju.m.suning.com";
		middleDomain = "//c.m.suning.com/channelwap.htm";
		esDomain = "//2.suning.com/";
		tryDomain = "//try.suning.com/tps/";
		zbDomain = "//slv.suning.com/slv-web/pc/list.jsonp";
		cmsApiDomain = "//lib.suning.com";
		msiDomain = "//my.suning.com/";
		custHeadUrl = "//image.suning.cn/uimg/cmf/cust_headpic/";
		scriptDomianDir = "//res.suning.cn/";
		httpsDomain = "https://ssl.suning.com/";
		ysDomain = "//ju.suning.com";
		tuijianDomain = "//tuijian.suning.com";
		hwgDomain = "//g.suning.com";
		zhiboDomain = "//video.suning.com";
		pgDomain = "//pin.m.suning.com/";
		nmqsDomain = "//nmqs.suning.com";
		fmDomain = "//f.m.suning.com";
		passportLogonUrl = "https://passport.suning.com/ids/login";
		superVip = "//supervip.suning.com/snprime-web/toIndex.do";
		vipDomain = "https://vip.suning.com/";
		newsDomain = "//news.suning.com/";
		break;
	default:
		codeDomain = "//code.suning.cn";
		zsqDomain = "//ju.m.suning.com";
		middleDomain = "//c.m.suning.com/channelwap.htm";
		esDomain = "//2.suning.com/";
		tryDomain = "//try.suning.com/tps/";
		zbDomain = "//slv.suning.com/slv-web/pc/list.jsonp";
		cmsApiDomain = "//lib.suning.com";
		msiDomain = "//my.suning.com/";
		custHeadUrl = "//image.suning.cn/uimg/cmf/cust_headpic/";
		scriptDomianDir = "//res.suning.cn/";
		httpsDomain = "https://ssl.suning.com/";
		ysDomain = "//ju.suning.com";
		tuijianDomain = "//tuijian.suning.com";
		hwgDomain = "//g.suning.com";
		zhiboDomain = "//video.suning.com";
		pgDomain = "//pin.m.suning.com/";
		nmqsDomain = "//nmqs.suning.com";
		fmDomain = "//f.m.suning.com";
		passportLogonUrl = "https://passport.suning.com/ids/login";
		superVip = "//supervip.suning.com/snprime-web/toIndex.do";
		vipDomain = "https://vip.suning.com/";
		newsDomain = "//news.suning.com/"
	}
	window.passport_config = window.passport_config || {
		base: httpsDomain + "webapp/wcs/stores/",
		loginTheme: "b2c_pop",
		successCallbackUrl: httpsDomain + "/webapp/wcs/stores/servlet/popupLoginSuccess?storeId=10052&catalogId=10051&"
	}
};
      index.floorCode = function(a) {
	var b;
	$(a).find(".code-wrapper").hover(function() {
		clearTimeout(b);
		$(this).find(".code").show();
		lazyelem.detect()
	}, function() {
		var c = $(this);
		b = setTimeout(function() {
			c.find(".code").hide()
		}, 200)
	})
};
    index.lazyFloor = function() {
	lazyelem.listen(".com-floor", "fn", function(f) {
		var i = $("body").attr("data-pageCode"),
			k = $(f).attr("data-fullId"),
			l = "lazyload" + k;
		var c = window.location.host;
		var a = "";
		if (sn.isBack && ("true" == sn.isBack)) {
			a = "http://" + c + "/cms-admin-web/page/previewModel/" + i + "_" + k + "_" + previewTimes + "_" + l + ".htm"
		} else {
          
			a ="https:"+sn.cmsLibDomain + "/homepage/model/" + i + "_" + k + "_" + l + ".json"
		}
		var b = isLocalStorageSupported(),
			h, e;
		k = "floorId" + k;
		if (b && localStorage.getItem(k) && !sn.isBack) {
			h = JSON.parse(localStorage.getItem(k));
			storeTime = parseInt(h.time) + 10 * 60 * 1000;
			var j = new Date().getTime();
			if (j > storeTime) {
				$.ajax({
					url: a,
					cache: false,
					dataType: "jsonp",
					jsonpCallback: l,
					success: function(n) {
						var m = new Date().getTime();
						e = n;
						if (b) {
							localStorage.setItem(k, JSON.stringify({
								time: m,
								floorContent: e
							}))
						}
						g(f, e)
					}
				})
			} else {
				e = h.floorContent;
				g(f, e)
			}
		} else {
			$.ajax({
				url: a,
				cache: false,
				dataType: "jsonp",
				jsonpCallback: l,
				success: function(n) {
					var m = new Date().getTime();
					e = n;
					if (b) {
						localStorage.setItem(k, JSON.stringify({
							time: m,
							floorContent: e
						}))
					}
					g(f, e)
				}
			})
		}

		function g(q, o) {
       
			if (!o || !o.data) {
				if (b && localStorage.getItem(k)) {
					h = JSON.parse(localStorage.getItem(k));
					o = h.floorContent;
					$(q).html(o.data)
				} else {
					return
				}
			} else {
				$(q).html(o.data)
			}
			var p = $(q).hasClass("g-floor") ? $(q) : $(q).find(".g-floor"),
				n;
			index.floorCode(q);

			function m(s) {
				$(s).find("li").show();
				lazyelem.listen($(s).find("img[lazy-src]"), "img");
				lazyelem.detect();
				var r = $(s);
				r.find("a").each(function(u) {
					if (r.find("a").eq(u).attr("cptId")) {
						var t = r.find("a").eq(u).attr("cptId");
						if (t) {
							try {
								apsAdboardCptPvObj.aps_adboard_loadAdCptPv(t, index.cptTime)
							} catch (v) {}
						}
					}
				});
				lazyelem.listen($(s).find("[cms-name]"), "fn", function(t) {
					index.cmsBgDom.push(t);
					if (index.cmsBgFlag) {
						return
					}
					index.cmsBgFlag = true;
					setTimeout(function() {
						index.cmsBgFunc(index.cmsBgDom)
					}, 100)
				});
				cpmRequire($(s));
				lazyelem.detect()
			}
			p.each(function() {
				var u = $(this),
					t, r, s, v = u.attr("data-kg");
				if (u.hasClass("g-floor1")) {
					n = 8;
					t = u.index(".com-floor");
					s = "recdpllc"
				} else {
					if (u.hasClass("g-floor2")) {
						n = 7;
						t = u.parent(".com-floor").index(".com-floor");
						r = u.index();
						s = "recspllc"
					} else {
						if (u.hasClass("g-floor3")) {
							n = 4;
							t = u.parent(".com-floor").index(".com-floor");
							r = u.index();
							s = "recsanpllc"
						}
					}
				}
				if (!v) {
					m(this);
					return true
				}
				 
					
					var y = "https://tuijian.suning.com/recommend-portal/recommend/paramsBiz.jsonp?u=&c=&parameter=plhd&parameterCode=" + v + "&sceneIds=19-9&count=" + n;
                  console.log("oo",y);
					$.ajax({
						url: y,
						dataType: "jsonp",
						timeout: 10000,
						jsonpCallback: "floorRec" + v,
						success: function(D) {
                          
							if (D.sugGoods[0]["resCode"] == "01" || D.sugGoods[0]["resCode"] == "03") {
								if (D.sugGoods[0]["skus"].length < n) {
									m(u)
								} else {
									B(D.sugGoods[0]["skus"])
								}
							} else {
								m(u)
							}
						},
						error: function() {
							m(u)
						}
					});

					function B(L) {
                     
						var I = u.find(".img-list").eq(0),
							G = u.find(".img-list").eq(1),
							F = u.find(".bottom-list"),
							H, J;
						var K;
						for (var E = 0; E < n; E++) {
							name = "index3_none_" + s;
							id = "baoguang_" + s;
							H = L[E].sugGoodsCode ? L[E].sugGoodsCode : "none";
							J = L[E].vendorId ? L[E].vendorId : "none";
							if (u.hasClass("g-floor1")) {
								if (E < 4) {
									K = I.find("li").eq(E)
								} else {
									K = G.find("li").eq(E - 4)
								}
								name += "_" + (t + 1) + "-" + (E + 1) + "_p_" + J + "_" + H + "_" + L[E].handwork;
								id += "_" + (t + 1) + "-" + (E + 1) + "_" + J + "_" + H + "_" + L[E].handwork;
							} else {
								if (u.hasClass("g-floor2")) {
									if (E < 4) {
										K = I.find("li").eq(E)
									} else {
										K = F.find("li").eq(E - 4)
									}
									name += "_" + (t + 1) + "-" + (E + 1 + r * 7) + "_p_" + J + "_" + H + "_" + L[E].handwork;
									id += "_" + (t + 1) + "-" + (E + 1 + r * 7) + "_" + J + "_" + H + "_" + L[E].handwork
								} 
                                else {
									if (E < 2) {
										K = I.find("li").eq(E)
									} else {
										K = F.find("li").eq(E - 2)
									}
									name += "_" + (t + 1) + "-" + (E + 1 + r * 4) + "_p_" + J + "_" + H + "_" + L[E].handwork;
									id += "_" + (t + 1) + "-" + (E + 1 + r * 4) + "_" + J + "_" + H + "_" + L[E].handwork
								}
							}
                          
							if (L[E].labelPic.indexOf("http:") == 0) {
								L[E].labelPic = L[E].labelPic.split("http:")[1]
							}
                          
							K.find("a").attr({
								href: L[E].jumpUrl,
								name: name,
								id: id
							}).end().find(".img-name").html(L[E].labelName).end().find(".img-desc").html(L[E].labelDesc).end().find("img").attr("lazy-src", L[E].labelPic);
							var D;
							if (u.hasClass("g-floor1")) {
								D = E + 1
							} else {
								if (u.hasClass("g-floor2")) {
									D = (E + 1 + r * 7)
								} else {
									D = (E + 1 + r * 4)
								}
							}
						}
						Util.baoguangFun("baoguang_" + s + "_" + (t + 1));
						u.find("li").show();
						lazyelem.listen($(q).find("img[lazy-src]"), "img");
						index.getwebp(q);
						lazyelem.detect()
					}
				
			})
		}
	})
};
     index.pingou = function() {
	lazyelem.listen(".pg-module", "fn", function(h) {
		if ($(h).attr("data-tuijian") == "true") {
			var f = "https://pin.m.suning.com/pgs/channel/pc/enrolls_11_1_1001_1_9.json",
				i = "pcEnroll";
			$.ajax({
				url: f,
				dataType: "jsonp",
				timeout: 10000,
				jsonpCallback: i,
				success: function(j) {
					if (j && j.data && j.data.list && j.data.list.length > 2) {
						g(j.data.list)
					} else {
						e()
					}
				},
				error: function() {
					e()
				}
			})
		} else {
			e()
		}
        function g(o) {
			var p = "";
			var n = o.length - o.length % 3;
			for (var l = 0; l < n; l++) {
				var m = o[l]["productCode"];
				var j = o[l]["venderCode"].length == 10 ? o[l]["venderCode"] : "00" + o[l]["venderCode"];
				var k = {
					picUrl: "",
					partNumber: m,
					shopPicUrl: "/uimg/b2c/newcatentries/",
					vendorCode: j,
					linkType: "",
					linkUrl: ""
				};
				p += "<li " + commodity.getSku(k) + '><img lazy-src="https:' + sn.imgHost + "/uimg/b2c/newcatentries/" + j + "-" + o[l].productCode + '_1_200x200.jpg" src="https://res.suning.cn/public/v3/images/blank.gif"><span class="code-icon"></span><img src="" alt="" class="code" data-src="https://pin.m.suning.com/pgs/product/' + o[l].actId + '.html"><p class="name">' + o[l].itemName + '</p><p class="pg-price">拼购价<i>&yen;</i><em>' + o[l].price.toFixed(2) + '</em></p><p class="sn-price">参考价<span class="price"><i>楼</i><em></em></span></p><p class="pg-number"><i>' + o[l].memberNum + "</i>人参</p></li>"
			}
			$(".pg-module ul").html(p);
			c();
			lazyelem.detect()
		}

	

		function e() {
			if ($(".qdApg-floor").attr("data-cms") == "true") {
				$(".pg-module ul").html($("#pinguoContent").html());
				index.getwebp(".pg-module ul");
				lazyelem.listen($(".qd-module ul").find("img[lazy-src]"), "img");
				lazyelem.listen($(".qd-module ul").find("[cms-name]"), "fn", function(m) {
					index.cmsBgDom.push(m);
					if (index.cmsBgFlag) {
						return
					}
					index.cmsBgFlag = true;
					setTimeout(function() {
						index.cmsBgFunc(index.cmsBgDom)
					}, 100)
				})
			} else {
				var j = $("body").attr("data-pageCode"),
					k = $(".qdApg-floor").attr("data-fullId"),
					l;
				index.getCMSHtml(j, k, function(n) {
					var m = new Date().getTime();
					l = n.data;
					$(".qdApg-floor .hideArea").html(l);
					$(".qdApg-floor").attr("data-cms", "true");
					$(".pg-module ul").html($("#pingouContent").html());
					lazyelem.listen($(".pg-module ul").find("[cms-name]"), "fn", function(o) {
						index.cmsBgDom.push(o);
						if (index.cmsBgFlag) {
							return
						}
						index.cmsBgFlag = true;
						setTimeout(function() {
							index.cmsBgFunc(index.cmsBgDom)
						}, 100)
					});
					c()
				}, function() {
					$(".qdApg-floor").hide()
				}, 2)
			}
		}

		function c() {
			var j = $(".pg-module").find("li");
			j.each(function() {
				var n = $(this),
					l = n.find(".code"),
					q = l.attr("data-src"),
					p = {};
				var k = window.location.protocol;
				var m;
				if (q.indexOf("http") == -1 && q.indexOf("https") == -1) {
					m = k + q
				} else {
					m = q
				}
				var o =  "http://code.suning.cn/qrcode/buildQrCodeUrlPCWap_" + a(m) + "_JPG_200_000000__30.html";
				l.attr("lazy-src", o)
			});
			index.getwebp(".pg-module");
			lazyelem.listen($(".pg-module").find("img[lazy-src]"), "img");
			j.hover(function() {
				$(this).find(".code").show();
				lazyelem.detect()
			}, function() {
				$(this).find(".code").hide()
			});
			b(".pg-module .list-wrapper");
			lazyelem.listen($(".pg-module .list").find("li[data-sku]"), "fn", function(k) {
				index.priceDOM.push(k);
				if (index.getPriceFlag) {
					return
				}
				index.getPriceFlag = true;
				
			})
		}
	});

	function a(f) {
		var g = "";
		if (null != f && "" != f.replace(/^\s*|\s*$/, "")) {
			for (var e = 0, c = f.length; e < c; e++) {
				g += f.charCodeAt(e).toString(16) + ","
			}
			if (null != g && "" != g.replace(/^\s*|\s*$/, "")) {
				g = g.substring(0, g.length - 1)
			}
		}
		return g
	}

	function b(c) {
		var e = $(c);
		if (e.find("li").length > 3) {
			Util.listloop({
				wrap: e,
				loopBox: "ul",
				loopChild: "li",
				triggerLeft: e.find(".btn-left"),
				triggerRight: e.find(".btn-right"),
				step: {
					wide: 3,
					narrow: 3
				},
				scrollWidth: {
					wide: 555,
					narrow: 555
				},
				isLazyImg: true,
				isLoop: true
			})
		}
	}
};   
        $(function() {
	lazyelem.listen();
	$(window).resize(function() {
		if (document.documentElement.clientWidth >= 1200) {
			$("body").addClass("root1200");     
			bigscreen = true
		} else {
			$("body").removeClass("root1200");
			bigscreen = false
		}
	});
            index.getRecommand();
     index.pingou();      
index.qingdan();
      index.paihangbangNew();      
	index.banner();
     index.toutiaoloop();
 index.msInit();
	index.nav();
	 index.haohuoNew();
     index.zhutiNew();
            index.lazyFloor();
            
         
}); 
       index.isInScreen = function(b) {
	var a = b;
	if (a.length > 0) {
		return ($(window).scrollTop() + $(window).height() > a.offset().top) && a.offset().top + a.height() > $(window).scrollTop()
	}
};
	  function isLocalStorageSupported() {
	var c = "test",
		b = window.localStorage;
	if (Util.ieVersion(7) || Util.ieVersion(6) || typeof JSON == "undefined") {
		return false
	}
	try {
		b.setItem(c, "testValue");
		b.removeItem(c);
		return true
	} catch (a) {
		return false
	}
}
    
  
 