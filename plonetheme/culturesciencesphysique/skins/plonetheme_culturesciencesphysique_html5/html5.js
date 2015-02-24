! function (c, a, d) {
    var b = {
        bind: function (f, e, g) {},
        unbind: function (f, e, g) {},
        trigger: function (f, e) {}
    };
    if (c.addEventListener) {
        b.bind = function (f, e, g) {
            if (!f) {
                return
            }
            f.addEventListener(e, g, false)
        };
        b.unbind = function (f, e, g) {
            if (!f) {
                return
            }
            f.removeEventListener(e, g, false)
        };
        b.trigger = function (g, e) {
            if (!g) {
                return
            }
            if (!b.eventList) {
                b.eventList = []
            }
            var f = b.eventList[e];
            if (!f) {
                f = a.createEvent("Event");
                f.initEvent(e, false, false);
                b.eventList[e] = f
            }
            g.dispatchEvent(f)
        };
        b.preventDefault = function (f) {
            f.preventDefault()
        }
    } else {
        if (c.attachEvent) {
            b.bind = function (g, e, h) {
                if (!g) {
                    return
                }
                var f = e + h;
                e = "on" + e;
                if (e in g) {
                    if (!g["e" + f]) {
                        g["e" + f] = h;
                        g[f] = function () {
                            g["e" + f](c.event)
                        };
                        g.attachEvent(e, g[f])
                    }
                } else {
                    if (!g.eventList) {
                        g.eventList = []
                    }
                    if (!g.eventList[e]) {
                        g.eventList[e] = []
                    }
                    g.eventList[e].push(h)
                }
            };
            b.unbind = function (l, h, n) {
                if (!l) {
                    return
                }
                var k = h + n;
                h = "on" + h;
                if (h in l) {
                    if (l["e" + k]) {
                        l.detachEvent(h, l[k]);
                        try {
                            delete(l[k]);
                            delete(l["e" + k])
                        } catch (m) {
                            l[k] = null;
                            l["e" + k] = null
                        }
                    }
                } else {
                    if (!l || !l.eventList || !l.eventList[h]) {
                        return
                    }
                    var j = l.eventList[h];
                    var f = j.length;
                    for (var g = 0; g < f; g++) {
                        if (j[g] == n) {
                            j.slice(g, 1);
                            return
                        }
                    }
                }
            };
            b.trigger = function (l, h) {
                if (!l) {
                    return
                }
                h = "on" + h;
                if (h in l) {
                    try {
                        l.fireEvent(h);
                        return
                    } catch (m) {}
                }
                var k = {};
                k.target = l;
                k.srcElement = l;
                if (!l || !l.eventList || !l.eventList[h]) {
                    return
                }
                var j = l.eventList[h];
                var f = j.length;
                for (var g = 0; g < f; g++) {
                    j[g].call(l, k)
                }
            };
            b.preventDefault = function (f) {
                f.returnValue = false
            }
        }
    }
    b.onHashChange = function (f) {
        if ("onhashchange" in c) {
            b.bind(c, "hashchange", f)
        } else {
            var e = "";
            c.setInterval(function () {
                if (e != c.location.hash) {
                    e = c.location.hash;
                    f()
                }
            }, 250)
        }
    };
    b.onDOMReady = function (e) {
        if (c.addEventListener) {
            c.addEventListener("DOMContentLoaded", e, false)
        } else {
            b.bind(c, "load", e)
        }
    };
    b.onMediaReady = function (e) {
        b.bind(c, "MediaContentLoaded", e)
    };
    b.onSMILReady = function (e) {
        b.bind(c, "SMILContentLoaded", e)
    };
    c.EVENTS = b
}(this, document);
! function (e, g, c) {
    var f = true;
    var d = false;

    function b(k, l) {}
    function h(k, l) {}
    if (e.qwery) {
        h = qwery
    } else {
        if (e.Sizzle) {
            h = Sizzle
        } else {
            if (e.jQuery) {
                h = function (k, l) {
                    return $(k, l)
                }
            } else {
                if (e.YAHOO && e.YAHOO.util && e.YAHOO.util.Selector) {
                    h = YAHOO.util.Selector.query
                } else {
                    if (g.querySelectorAll) {
                        d = true;
                        h = function (k, l) {
                            l = l || g;
                            return l.querySelectorAll(k)
                        }
                    } else {
                        f = false;
                        h = function (k, m) {
                            m = m || g;
                            var l = [];
                            if (/^#[^\s]+$/.test(k)) {
                                var n = g.getElementById(k.substring(1));
                                if (n) {
                                    l.push(n)
                                }
                            } else {
                                if (/^[a-z]+$/i.test(k)) {
                                    l = m.getElementsByTagName(k)
                                }
                            }
                            return l
                        }
                    }
                }
            }
        }
    }
    if (g.querySelector) {
        b = function (k, l) {
            l = l || g;
            return l.querySelector(k)
        }
    } else {
        b = function (k, m) {
            var l = h(k, m);
            if (l && l.length) {
                return l[0]
            } else {
                return null
            }
        }
    }
    function a() {
        if (f) {
            return h("*[data-timecontainer], *[smil-timecontainer], *[timeContainer]")
        }
        var m = [];
        var l = g.getElementsByTagName("*");
        var n = /^(par|seq|excl)$/i;
        for (var k = 0; k < l.length; k++) {
            if (n.test(l[k].nodeName) || l[k].getAttribute("data-timecontainer") || l[k].getAttribute("smil-timecontainer") || l[k].getAttribute("timeContainer")) {
                m.push(l[k])
            }
        }
        return m
    }
    function j() {
        if (f) {
            return h("link[rel=timesheet]")
        }
        var m = [];
        var k = g.getElementsByTagName("link");
        for (var l = 0; l < k.length; l++) {
            if (k[l].rel.toLowerCase() == "timesheet") {
                m.push(k[l])
            }
        }
        return m
    }
    e.QWERY = {
        select: b,
        selectAll: h,
        selectTimeContainers: a,
        selectExtTimesheets: j,
        supported: f,
        nativeSelector: d
    }
}(this, document);
if (!Array.indexOf) {
    Array.prototype.indexOf = function (b) {
        for (var a = 0; a < this.length; a++) {
            if (this[a] == b) {
                return a
            }
        }
        return -1
    }
}
if (!Date.now) {
    Date.now = function () {
        var a = new Date();
        return a.getTime()
    }
}! function (window, document, undefined) {
    function consoleWarn(message) {
        if (typeof (console) == "object") {
            console.warn(message)
        }
    }
    var TIMERATE = 40;
    if (window.mejs) {
        mejs.MediaElementDefaults.timerRate = TIMERATE
    }
    var TIMECONTAINERS = [];
    var OLDIE = (window.addEventListener) ? false : true;

    function checkHash() {
        var targetElement = null;
        var targetTiming = null;
        var container = null;
        var i, tmp;
        var hash = document.location.hash;
        if (hash.length) {
            var targetID = hash.substr(1).replace(/\&.*$/, "");
            targetElement = document.getElementById(targetID) || document.getElementById(targetID.substr(1))
        }
        if (!targetElement) {
            return
        }
        tmp = document.getTimeNodesByTarget(targetElement);
        if (tmp.length) {
            targetTiming = tmp[0];
            container = tmp[0].parentNode
        }
        var time = NaN;
        if (targetTiming && targetTiming.timeContainer) {
            tmp = hash.split("&");
            for (i = 0; i < tmp.length; i++) {
                if (/^t=.*/i.test(tmp[i])) {
                    time = targetTiming.parseTime(tmp[i].substr(2).replace(/,.*$/, ""));
                    break
                }
            }
        }
        var containers = [];
        var indexes = [];
        var timeNodes = [];
        var element = targetElement;
        while (container) {
            for (var index = 0; index < container.timeNodes.length; index++) {
                if (container.timeNodes[index].target == element) {
                    if (!container.timeNodes[index].isActive()) {
                        containers.push(container);
                        indexes.push(index);
                        timeNodes.push(container.timeNodes[index])
                    }
                    break
                }
            }
            element = container.getNode();
            container = container.parentNode
        }
        for (i = containers.length - 1; i >= 0; i--) {
            containers[i].selectIndex(indexes[i])
        }
        if (targetTiming && !isNaN(time)) {
            targetTiming.setCurrentTime(time)
        }
        if (targetElement.scrollIntoViewIfNeeded != undefined) {
            targetElement.scrollIntoViewIfNeeded()
        } else {
            try {
                var tabIndex = targetElement.tabIndex;
                targetElement.tabIndex = 0;
                targetElement.focus();
                targetElement.blur();
                if (tabIndex >= 0) {
                    targetElement.tabIndex = tabIndex
                } else {
                    targetElement.removeAttribute("tabIndex")
                }
            } catch (e) {}
        }
    }
    EVENTS.onSMILReady(function () {
        checkHash();
        EVENTS.onHashChange(checkHash)
    });

    function parseMediaElement(node) {
        if (window.MediaElement) {
            var m = new MediaElement(node, {
                success: function (mediaAPI, element) {
                    if ((/^(flash|silverlight)$/i).test(mediaAPI.pluginType)) {
                        var pluginElement = element.previousSibling;
                        if (element.firstChild && (/^(object|embed)$/i).test(element.firstChild.nodeName)) {
                            pluginElement = element.firstChild
                        } else {
                            if (pluginElement && ((/^me_flash/).test(pluginElement.id) || (/^me_silverlight/).test(pluginElement.id) || (pluginElement.className == "me-plugin"))) {
                                pluginElement.setAttribute("timeAction", "none")
                            }
                        }
                        element.pluginElement = pluginElement;
                        element.mediaAPI = mediaAPI
                    }
                    EVENTS.trigger(document, "MediaElementLoaded")
                },
                error: function () {
                    alert("MediaElement error")
                }
            })
        } else {
            node.setCurrentTime = function (time) {
                node.currentTime = time
            };
            EVENTS.trigger(document, "MediaElementLoaded")
        }
    }
    function parseAllMediaElements() {
        var allAudioElements = document.getElementsByTagName("audio");
        var allVideoElements = document.getElementsByTagName("video");
        var meLength = allAudioElements.length + allVideoElements.length;
        if (meLength === 0) {
            EVENTS.trigger(window, "MediaContentLoaded");
            return
        } else {
            if (OLDIE && !window.MediaElement) {
                if (0) {
                    throw "MediaElement.js is required on IE<9"
                }
            }
        }
        var meParsed = 0;

        function CountMediaElements() {
            meParsed++;
            if (meParsed >= meLength) {
                EVENTS.unbind(document, "MediaElementLoaded", CountMediaElements);
                EVENTS.trigger(window, "MediaContentLoaded")
            }
        }
        EVENTS.bind(document, "MediaElementLoaded", CountMediaElements);
        for (var i = 0; i < allAudioElements.length; i++) {
            parseMediaElement(allAudioElements[i])
        }
        for (i = 0; i < allVideoElements.length; i++) {
            parseMediaElement(allVideoElements[i])
        }
    }
    function parseTimeContainerNode(node) {
        if (!node) {
            return
        }
        if (!node.timing) {
            var smilPlayer = new smilTimeElement(node);
            smilPlayer.show()
        } else {}
    }
    function parseTimesheetNode(timesheetNode) {
        var containers = timesheetNode.childNodes;
        for (var i = 0; i < containers.length; i++) {
            if (containers[i].nodeType == 1) {
                parseTimeContainerNode(containers[i])
            }
        }
    }
    function parseAllTimeContainers() {
        TIMECONTAINERS = [];
        var allTimeContainers = QWERY.selectTimeContainers();
        for (var i = 0; i < allTimeContainers.length; i++) {
            parseTimeContainerNode(allTimeContainers[i])
        }
        var timesheets = QWERY.selectExtTimesheets();
        var tsLength = timesheets.length;
        var tsParsed = 0;

        function CountTimesheets() {
            tsParsed++;
            if (tsParsed > tsLength) {
                EVENTS.unbind(document, "SMILTimesheetLoaded", CountTimesheets);
                EVENTS.trigger(window, "SMILContentLoaded")
            }
        }
        EVENTS.bind(document, "SMILTimesheetLoaded", CountTimesheets);
        var xhr;
        for (i = 0; i < tsLength; i++) {
            if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
                xhr.open("GET", timesheets[i].href, true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                        xmlDoc.loadXML(xhr.responseText);
                        var tsNodes = xmlDoc.getElementsByTagName("timesheet");
                        if (tsNodes && tsNodes.length) {
                            parseTimesheetNode(tsNodes[0])
                        }
                        EVENTS.trigger(document, "SMILTimesheetLoaded")
                    }
                };
                xhr.send(null)
            } else {
                if (window.XMLHttpRequest) {
                    xhr = new XMLHttpRequest();
                    xhr.overrideMimeType("text/xml");
                    xhr.open("GET", timesheets[i].href, true);
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4) {
                            var tsNodes = xhr.responseXML.getElementsByTagName("timesheet");
                            if (tsNodes && tsNodes.length) {
                                parseTimesheetNode(tsNodes[0])
                            }
                            EVENTS.trigger(document, "SMILTimesheetLoaded")
                        }
                    };
                    xhr.send(null)
                } else {
                    EVENTS.trigger(document, "SMILTimesheetLoaded")
                }
            }
        }
        if (!OLDIE) {
            var docElt = document.documentElement;
            var ns = {
                xhtml: "http://www.w3.org/1999/xhtml",
                svg: "http://www.w3.org/2000/svg",
                smil: docElt.getAttribute("xmlns:smil") || "http://www.w3.org/ns/SMIL"
            };

            function nsResolver(prefix) {
                return ns[prefix] || null
            }
            var TimesheetNS = nsResolver("smil");
            timesheets = document.getElementsByTagNameNS(TimesheetNS, "timesheet");
            if (!timesheets.length) {
                timesheets = document.getElementsByTagName("timesheet")
            }
            for (i = 0; i < timesheets.length; i++) {
                parseTimesheetNode(timesheets[i])
            }
            if (docElt.getAttribute("xmlns")) {
                var containers = document.evaluate("//*[@smil:timeContainer]", document, nsResolver, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
                var thisContainer = containers.iterateNext();
                try {
                    while (thisContainer) {
                        parseTimeContainerNode(thisContainer);
                        thisContainer = containers.iterateNext()
                    }
                } catch (e) {}
            }
        }
        EVENTS.trigger(document, "SMILTimesheetLoaded")
    }
    EVENTS.onDOMReady(function () {
        EVENTS.onMediaReady(parseAllTimeContainers);
        parseAllMediaElements()
    });

    function smilInternalTimer(timerate) {
        if (!timerate) {
            timerate = TIMERATE
        }
        var self = this;
        this.onTimeUpdate = null;
        var timerID = null;
        var timeStart = 0;
        var timePause = 0;
        var paused = true;
        this.isPaused = function () {
            return paused
        };
        this.getTime = function () {
            var ms = timePause;
            if (!paused) {
                ms += Date.now() - timeStart
            }
            return (ms / 1000)
        };
        this.setTime = function (time) {
            timeStart -= (time - self.getTime()) * 1000
        };
        this.Play = function () {
            if (!paused) {
                return
            }
            timeStart = Date.now();
            timerID = setInterval(function () {
                self.onTimeUpdate()
            }, timerate);
            paused = false
        };
        this.Pause = function () {
            if (paused) {
                return
            }
            clearInterval(timerID);
            timerID = null;
            timePause = 1000 * self.getTime();
            paused = true;
            self.onTimeUpdate()
        };
        this.Stop = function () {
            if (!timerID) {
                return
            }
            clearInterval(timerID);
            timerID = null;
            timePause = 0;
            paused = true;
            self.onTimeUpdate()
        }
    }
    function smilExternalTimer(mediaPlayerNode) {
        var self = this;
        var currentTime = NaN;
        this.onTimeUpdate = null;
        var mediaPlayerAPI = mediaPlayerNode;
        if (mediaPlayerNode.mediaAPI) {
            mediaPlayerAPI = mediaPlayerNode.mediaAPI
        }
        this.isPaused = function () {
            return mediaPlayerAPI.paused
        };
        this.getTime = function () {
            return isNaN(currentTime) ? mediaPlayerAPI.currentTime : currentTime
        };
        this.setTime = function (time) {
            if (mediaPlayerAPI.seeking) {
                consoleWarn("seeking");

                function setThisTime() {
                    mediaPlayerAPI.setCurrentTime(time);
                    mediaPlayerAPI.removeEventListener("seeked", setThisTime, false)
                }
                mediaPlayerAPI.removeEventListener("seeked", setThisTime, false);
                mediaPlayerAPI.addEventListener("seeked", setThisTime, false)
            } else {
                try {
                    mediaPlayerAPI.setCurrentTime(time)
                } catch (e) {
                    consoleWarn(e);

                    function setThisTimeErr() {
                        mediaPlayerAPI.setCurrentTime(time);
                        mediaPlayerAPI.removeEventListener("canplay", setThisTimeErr, false)
                    }
                    mediaPlayerAPI.addEventListener("canplay", setThisTimeErr, false)
                }
            }
        };
        this.Play = function () {
            if (mediaPlayerAPI.addEventListener) {
                mediaPlayerAPI.addEventListener("timeupdate", self.onTimeUpdate, false)
            }
        };
        this.Pause = function () {
            if (mediaPlayerAPI.pause) {
                mediaPlayerAPI.pause()
            }
        };
        this.Stop = function () {
            if (mediaPlayerAPI.removeEventListener) {
                mediaPlayerAPI.removeEventListener("timeupdate", self.onTimeUpdate, false)
            }
        }
    }
    smilTimeItem.prototype.getNode = function () {};
    smilTimeItem.prototype.parseTime = function (timeStr) {
        if (!timeStr || !timeStr.length) {
            return undefined
        } else {
            if (timeStr == "indefinite") {
                return Infinity
            } else {
                if (/ms[\s]*$/.test(timeStr)) {
                    return parseFloat(timeStr) / 1000
                } else {
                    if (/s[\s]*$/.test(timeStr)) {
                        return parseFloat(timeStr)
                    } else {
                        if (/min[\s]*$/.test(timeStr)) {
                            return parseFloat(timeStr) * 60
                        } else {
                            if (/h[\s]*$/.test(timeStr)) {
                                return parseFloat(timeStr) * 3600
                            } else {
                                if (/^[0-9:\.]*$/.test(timeStr)) {
                                    var seconds = 0;
                                    var tmp = timeStr.split(":");
                                    for (var i = 0; i < tmp.length; i++) {
                                        seconds = (seconds * 60) + parseFloat(tmp[i])
                                    }
                                    return seconds
                                } else {
                                    return timeStr
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    smilTimeItem.prototype.parseEvents = function (eventStr, callback) {
        var events = [];
        if (!eventStr || !eventStr.length || !isNaN(eventStr)) {
            return events
        }
        var eventStrArray = eventStr.split(/;\s*/);
        for (var i = 0; i < eventStrArray.length; i++) {
            var tmp = eventStrArray[i].split(".");
            var target, evt;
            if (tmp.length >= 2) {
                target = document.getElementById(tmp[0]);
                evt = tmp[1]
            } else {
                target = this.parentTarget;
                evt = eventStr
            }
            events.push({
                target: target,
                event: evt
            });
            if (callback) {
                EVENTS.bind(target, evt, callback)
            }
        }
        return events
    };
    smilTimeItem.prototype.parseAttribute = function (attrName, dValue) {
        var node = this.getNode();
        var nodeName = node.nodeName.replace(/^smil:/, "");
        var value = "";
        if ((attrName == "timeContainer") && (/^(seq|par|excl)$/i).test(nodeName)) {
            value = nodeName
        } else {
            value = node.getAttribute(attrName) || node.getAttribute("data-" + attrName.toLowerCase()) || node.getAttribute("smil-" + attrName.toLowerCase()) || node.getAttribute("smil:" + attrName)
        }
        if (!value || !value.length) {
            return dValue
        }
        switch (attrName) {
            case "timeContainer":
            case "timeAction":
                return value.toLowerCase();
            case "repeatCount":
                return (value == "indefinite") ? Infinity : parseFloat(value);
            case "onbegin":
            case "onend":
                return function () {
                    eval(value)
                };
            case "beginInc":
            case "begin":
            case "dur":
            case "end":
            case "repeatDur":
                return this.parseTime(value);
            default:
                return value
        }
    };
    smilTimeItem.prototype.newTargetHandler = function (timeAction, target) {
        if (!target) {
            return function (state) {}
        }
        var setTargetState_intrinsic = function (state) {
            target.setAttribute("smil", state)
        };
        var setTargetState_display = function (state) {
            target.setAttribute("smil", state);
            target.style.display = (state == "active") ? "block" : "none"
        };
        var setTargetState_visibility = function (state) {
            target.setAttribute("smil", state);
            target.style.visibility = (state == "active") ? "visible" : "hidden"
        };
        var setTargetState_style = function (state) {
            target.setAttribute("smil", state);
            var active = (state == "active");
            if (!target._smilstyle) {
                target._smilstyle = target.style.cssText
            }
            target.style.cssText = active ? target._smilstyle : ""
        };
        var setTargetState_class = function (state) {
            target.setAttribute("smil", state);
            var active = (state == "active");
            if (!target._smilclass_active) {
                var activeCN = target.className + (target.className.length ? " " : "") + timeAction.replace(/class:[\s]*/, "");
                target._smilclass_active = activeCN;
                target._smilclass_idle = target.className
            }
            target.className = active ? target._smilclass_active : target._smilclass_idle
        };
        switch (timeAction) {
            case "display":
                return setTargetState_display;
                break;
            case "visibility":
                return setTargetState_visibility;
                break;
            case "style":
                return setTargetState_style;
                break;
            case "intrinsic":
                if (OLDIE) {
                    return setTargetState_display
                } else {
                    return setTargetState_intrinsic
                }
            default:
                if (/^class:/.test(timeAction)) {
                    return setTargetState_class
                } else {
                    return setTargetState_display
                }
                break
        }
        return null
    };
    smilTimeItem.prototype.addEventListener = function (events, callback) {
        for (var i = 0; i < events.length; i++) {
            var evt = events[i];
            if (evt.target) {
                EVENTS.bind(evt.target, evt.event, callback)
            }
        }
    };
    smilTimeItem.prototype.removeEventListener = function (events, callback) {
        for (var i = 0; i < events.length; i++) {
            var evt = events[i];
            if (evt.target) {
                EVENTS.unbind(evt.target, evt.event, callback)
            }
        }
    };
    smilTimeItem.prototype.dispatchEvent = function (eventType) {
        var func = this["on" + eventType];
        EVENTS.trigger(this.parentTarget, eventType);
        if (func) {
            func.call(this.parentTarget)
        }
    };

    function smilTimeItem(domNode, parentNode, targetNode) {
        var self = this;
        this.parseTime = smilTimeItem.prototype.parseTime;
        this.parseEvents = smilTimeItem.prototype.parseEvents;
        this.parseAttribute = smilTimeItem.prototype.parseAttribute;
        this.parentNode = parentNode;
        this.previousSibling = null;
        this.nextSibling = null;
        this.timeNodes = null;
        this.getNode = function () {
            return domNode
        };
        this.target = targetNode || domNode;
        if (/^(smil:){0,1}(par|seq|excl)$/i.test(this.target.nodeName)) {
            this.target = null
        }
        this.parentTarget = this.target;
        var node = this.parentNode;
        while (!this.parentTarget && node) {
            this.parentTarget = node.target;
            node = node.parentNode
        }
        var timeAction = parentNode ? parentNode.timeAction : "intrinsic";
        this.timeAction = this.parseAttribute("timeAction", timeAction);
        this.timeContainer = this.parseAttribute("timeContainer", null);
        this.begin = this.parseAttribute("begin");
        this.dur = this.parseAttribute("dur");
        this.end = this.parseAttribute("end");
        var fillDefault = parentNode ? parentNode.fillDefault : "remove";
        this.fill = this.parseAttribute("fill", fillDefault);
        this.fillDefault = this.parseAttribute("fillDefault", null);
        this.setTargetState = smilTimeItem.prototype.newTargetHandler.call(this, this.timeAction, this.target);
        this.addEventListener = smilTimeItem.prototype.addEventListener;
        this.removeEventListener = smilTimeItem.prototype.removeEventListener;
        this.dispatchEvent = smilTimeItem.prototype.dispatchEvent;
        this.onbegin = this.parseAttribute("onbegin");
        this.onend = this.parseAttribute("onend");
        var beginEvents = this.parseEvents(this.begin);
        var endEvents = this.parseEvents(this.end);

        function onbeginListener() {
            self.time_in = self.parentNode.getCurrentTime();
            self.time_out = isNaN(self.end) ? Infinity : self.end;
            self.parentNode.selectItem(self)
        }
        function onendListener() {
            self.time_in = isNaN(self.begin) ? Infinity : self.begin;
            self.time_out = self.parentNode.getCurrentTime();
            if (self.parentNode.timeContainer == "seq") {
                self.parentNode.selectIndex(self.parentNode.currentIndex + 1)
            } else {
                self.parentNode.currentIndex = -1
            }
            self.hide()
        }
        var state = "";
        this.isActive = function () {
            return (state == "active")
        };
        this.show = function () {
            if (state == "active") {
                return
            }
            state = "active";
            if (0) {
                try {} catch (e) {}
            }
            self.setTargetState(state);
            self.dispatchEvent("begin");
            self.addEventListener(endEvents, onendListener);
            self.removeEventListener(beginEvents, onbeginListener)
        };
        this.hide = function () {
            if (state == "done") {
                return
            }
            state = "done";
            if (0) {
                try {} catch (e) {}
            }
            if (self.fill != "hold") {
                self.setTargetState(state)
            }
            self.dispatchEvent("end");
            self.addEventListener(beginEvents, onbeginListener);
            self.removeEventListener(endEvents, onendListener)
        };
        this.reset = function () {
            if (state == "idle") {
                return
            }
            state = "idle";
            if (0) {
                try {} catch (e) {}
            }
            self.setTargetState(state);
            self.addEventListener(beginEvents, onbeginListener);
            self.removeEventListener(endEvents, onendListener)
        };
        if (targetNode && (targetNode != domNode)) {
            if (!targetNode.extTiming) {
                targetNode.extTiming = []
            }
            targetNode.extTiming.push(this)
        } else {
            if (this.target) {
                domNode.timing = this
            }
        }
    }
    smilTimeContainer_generic.prototype.getCurrentTime = function () {};
    smilTimeContainer_generic.prototype.setCurrentTime = function () {};
    smilTimeContainer_generic.prototype.onTimeUpdate = function () {};
    smilTimeContainer_generic.prototype.parseTimeNodes = function () {
        var timeNodes = [];
        var syncMasterNode = null;
        var segment;
        var children = this.getNode().childNodes;
        for (var i = 0; i < children.length; i++) {
            segment = children[i];
            var targets = [];
            if (segment.nodeType == 1) {
                if (segment.timing || segment.getAttribute("timing")) {
                    consoleWarn("!! " + segment.nodeName + " is already initialized !!")
                } else {
                    if (/^(smil:){0,1}item$/i.test(segment.nodeName)) {
                        var select = segment.getAttribute("select") || segment.getAttribute("smil:select");
                        targets = QWERY.selectAll(select, this.parentTarget);
                        if (segment.childNodes.length) {
                            segment.setAttribute("timeContainer", "par")
                        }
                    } else {
                        targets.push(segment)
                    }
                }
                for (var j = 0; j < targets.length; j++) {
                    var target = targets[j];
                    var node = null;
                    if (segment != target) {
                        node = new smilTimeElement(segment, this, target);
                        var beginInc = node.parseAttribute("beginInc");
                        if (isNaN(node.begin) && !isNaN(beginInc)) {
                            node.begin = j * beginInc
                        }
                    } else {
                        node = new smilTimeElement(segment, this)
                    }
                    if (node.parseAttribute("syncMaster")) {
                        syncMasterNode = target
                    }
                    if (node.timeAction != "none") {
                        timeNodes.push(node)
                    } else {
                        delete(node)
                    }
                }
            }
        }
        for (i = 0; i < timeNodes.length; i++) {
            segment = timeNodes[i];
            if (i > 0) {
                segment.previousSibling = timeNodes[i - 1]
            }
            if (i < timeNodes.length - 1) {
                segment.nextSibling = timeNodes[i + 1]
            }
            segment.parentNode = this
        }
        if (this.dur == undefined) {
            if (!isNaN(this.end - this.begin)) {
                this.dur = this.end - this.begin
            } else {
                this.dur = Infinity
            }
        }
        return {
            timeNodes: timeNodes,
            syncMasterNode: syncMasterNode
        }
    };
    smilTimeContainer_generic.prototype.computeTimeNodes = function () {};
    smilTimeContainer_generic.prototype.getMediaSync = function (syncMasterNode) {
        var mediaSyncSelector = this.parseAttribute("mediaSync");
        return QWERY.select(mediaSyncSelector) || syncMasterNode
    };
    smilTimeContainer_generic.prototype.currentIndex = -1;
    smilTimeContainer_generic.prototype.selectIndex = function (index) {
        if (this.repeatCount == Infinity) {
            index = index % this.timeNodes.length
        }
        if ((index >= 0) && (index < this.timeNodes.length) && (index != this.currentIndex)) {
            var time = this.timeNodes[index].time_in;
            if (!isNaN(time) && (time < Infinity)) {
                if (this.mediaSyncNode) {
                    this.setCurrentTime(time + 0.1);
                    this.onTimeUpdate();
                    return
                } else {
                    this.setCurrentTime(time)
                }
            }
            this.currentIndex = index;
            this.timeNodes[index].show();
            for (var i = 0; i < index; i++) {
                this.timeNodes[i].hide()
            }
            for (i = index + 1; i < this.timeNodes.length; i++) {
                this.timeNodes[i].reset()
            }
            this.dispatchEvent("change")
        }
    };
    smilTimeContainer_generic.prototype.selectItem = function (item) {
        var index = this.timeNodes.indexOf(item);
        this.selectIndex(index)
    };

    function smilTimeContainer_generic(timeContainerNode, parentNode, timerate) {
        this.parseTimeNodes = smilTimeContainer_generic.prototype.parseTimeNodes;
        this.getMediaSync = smilTimeContainer_generic.prototype.getMediaSync;
        var self = this;
        this.repeatCount = this.parseAttribute("repeatCount", 1);
        this.repeatDur = this.parseAttribute("repeatDur", NaN);
        var result = this.parseTimeNodes();
        this.timeNodes = result.timeNodes;
        this.computeTimeNodes();
        this.mediaSyncNode = this.getMediaSync(result.syncMasterNode);
        var timer = null;
        this.mediaSyncAPI = this.mediaSyncNode;
        if (this.mediaSyncNode) {
            timer = new smilExternalTimer(this.mediaSyncNode);
            if (this.mediaSyncNode.mediaAPI) {
                this.mediaSyncAPI = this.mediaSyncNode.mediaAPI
            }
        } else {
            timer = new smilInternalTimer(timerate)
        }
        this.isPaused = timer.isPaused;
        this.getCurrentTime = timer.getTime;
        this.setCurrentTime = timer.setTime;
        this.Play = timer.Play;
        this.Pause = timer.Pause;
        this.Stop = timer.Stop;
        timer.onTimeUpdate = function () {
            self.onTimeUpdate()
        };
        this.addEventListener = smilTimeItem.prototype.addEventListener;
        this.removeEventListener = smilTimeItem.prototype.removeEventListener;
        this.dispatchEvent = smilTimeItem.prototype.dispatchEvent;
        this.onbegin = this.parseAttribute("onbegin");
        this.onend = this.parseAttribute("onend");
        var beginEvents = this.parseEvents(this.begin);
        var endEvents = this.parseEvents(this.end);

        function onbeginListener() {
            self.time_in = self.parentNode.getCurrentTime();
            self.time_out = isNaN(self.end) ? Infinity : self.end;
            self.parentNode.selectItem(self)
        }
        function onendListener() {
            self.time_in = isNaN(self.begin) ? Infinity : self.begin;
            self.time_out = self.parentNode.getCurrentTime();
            self.parentNode.currentIndex = -1;
            if (self.parentNode) {
                if (self.parentNode.timeContainer == "seq") {
                    self.parentNode.selectIndex(self.parentNode.currentIndex + 1)
                } else {
                    self.parentNode.currentIndex = -1
                }
                self.hide()
            }
        }
        var state = "";
        this.isActive = function () {
            return (state == "active")
        };
        this.show = function () {
            if (state == "active") {
                return
            }
            state = "active";
            self.Play();
            self.setTargetState(state);
            self.dispatchEvent("begin");
            self.addEventListener(endEvents, onendListener);
            self.removeEventListener(beginEvents, onbeginListener);
            this.currentIndex = -1
        };
        this.hide = function () {
            if (state == "done") {
                return
            }
            state = "done";
            self.Stop();
            self.setTargetState(state);
            for (var i = 0; i < self.timeNodes.length; i++) {
                self.timeNodes[i].hide();
                if (self.timeNodes[i].fill != "hold") {
                    self.timeNodes[i].setTargetState("done")
                }
            }
            self.dispatchEvent("end");
            self.addEventListener(beginEvents, onbeginListener);
            self.removeEventListener(endEvents, onendListener)
        };
        this.reset = function () {
            if (state == "idle") {
                return
            }
            state = "idle";
            self.Stop();
            self.setTargetState(state);
            for (var i = 0; i < self.timeNodes.length; i++) {
                self.timeNodes[i].reset()
            }
            self.addEventListener(beginEvents, onbeginListener);
            self.removeEventListener(endEvents, onendListener);
            this.currentIndex = -1
        };
        TIMECONTAINERS.push(this)
    }
    smilTimeContainer_par.prototype.computeTimeNodes = function () {
        for (var i = 0; i < this.timeNodes.length; i++) {
            var segment = this.timeNodes[i];
            segment.reset();
            if (segment.begin != undefined) {
                segment.time_in = isNaN(segment.begin) ? Infinity : segment.begin
            } else {
                segment.time_in = 0
            }
            if (segment.dur != undefined) {
                segment.time_out = segment.time_in + segment.dur
            } else {
                if (segment.end != undefined) {
                    segment.time_out = isNaN(segment.end) ? Infinity : segment.end
                } else {
                    segment.time_out = this.dur
                }
            }
        }
    };
    smilTimeContainer_par.prototype.onTimeUpdate = function () {
        var time = this.getCurrentTime();
        if (this.repeatCount >= Infinity) {
            time = time % this.dur
        }
        for (var i = 0; i < this.timeNodes.length; i++) {
            if (time < this.timeNodes[i].time_in) {
                this.timeNodes[i].reset()
            } else {
                if (time >= this.timeNodes[i].time_out) {
                    this.timeNodes[i].hide()
                } else {
                    this.timeNodes[i].show()
                }
            }
        }
    };

    function smilTimeContainer_par(domNode, parentNode, timerate) {
        this.computeTimeNodes = smilTimeContainer_par.prototype.computeTimeNodes;
        this.onTimeUpdate = smilTimeContainer_par.prototype.onTimeUpdate;
        smilTimeContainer_generic.call(this, domNode, timerate);
        this.currentIndex = -1;
        this.selectIndex = function (index) {};
        this.selectItem = function (item) {
            if (!isNaN(item.time_in)) {
                this.setCurrentTime(item.time_in)
            }
            item.show()
        }
    }
    smilTimeContainer_excl.prototype.computeTimeNodes = function () {
        var segment = null;
        for (i = 0; i < this.timeNodes.length; i++) {
            segment = this.timeNodes[i];
            segment.reset();
            if (segment.begin != undefined) {
                segment.time_in = isNaN(segment.begin) ? Infinity : segment.begin
            } else {
                segment.time_in = Infinity
            }
            if (segment.end != undefined) {
                segment.time_out = isNaN(segment.end) ? Infinity : segment.end
            } else {
                if ((i < this.timeNodes.length - 1) && !isNaN(this.timeNodes[i + 1].begin)) {
                    segment.time_out = this.timeNodes[i + 1].begin
                } else {
                    if (!isNaN(segment.dur)) {
                        segment.time_out = segment.time_in + segment.dur
                    } else {
                        segment.time_out = this.dur
                    }
                }
            }
        }
        if (!segment) {
            return
        }
        if (!this.timeNodes[0].time_in) {
            this.timeNodes[0].show()
        }
        if (this.dur == undefined) {
            this.dur = segment.time_out - this.timeNodes[0].time_in
        }
    };
    smilTimeContainer_excl.prototype.onTimeUpdate = function () {
        var time = this.getCurrentTime();
        if (this.repeatCount >= Infinity) {
            time = time % this.dur
        }
        if (this.currentIndex >= 0) {
            var time_in = this.timeNodes[this.currentIndex].time_in;
            var time_out = this.timeNodes[this.currentIndex].time_out;
            var outOfBounds = (time < time_in) || (time >= time_out);
            if (!outOfBounds) {
                return
            }
        }
        var index = -1;
        var active = false;
        for (var i = 0; i < this.timeNodes.length; i++) {
            var segment = this.timeNodes[i];
            var withinBounds = (time >= segment.time_in) && (time < segment.time_out);
            if (time < segment.time_in) {
                segment.reset()
            } else {
                if (time >= segment.time_out) {
                    segment.hide()
                } else {
                    if (withinBounds) {
                        if (active) {
                            segment.reset()
                        } else {
                            active = true;
                            segment.show();
                            index = i
                        }
                    }
                }
            }
        }
        if (index >= 0) {
            this.currentIndex = index
        } else {
            if ((this.currentIndex < this.timeNodes.length - 1) && isNaN(this.timeNodes[this.currentIndex + 1].time_in)) {
                this.selectIndex(this.currentIndex + 1)
            }
        }
    };

    function smilTimeContainer_excl(domNode, parentNode, timerate) {
        this.computeTimeNodes = smilTimeContainer_excl.prototype.computeTimeNodes;
        this.onTimeUpdate = smilTimeContainer_excl.prototype.onTimeUpdate;
        smilTimeContainer_generic.call(this, domNode, parentNode, timerate);
        var self = this;
        this.currentIndex = -1;
        if (this.timeNodes.length && (this.timeNodes[0].time_in <= 0)) {
            this.currentIndex = 0
        }
        this.selectIndex = smilTimeContainer_generic.prototype.selectIndex;
        this.selectItem = smilTimeContainer_generic.prototype.selectItem;
        this.parseEvents(this.parseAttribute("first"), function () {
            self.selectIndex(0)
        });
        this.parseEvents(this.parseAttribute("prev"), function () {
            self.selectIndex(self.currentIndex - 1)
        });
        this.parseEvents(this.parseAttribute("next"), function () {
            self.selectIndex(self.currentIndex + 1)
        });
        this.parseEvents(this.parseAttribute("last"), function () {
            self.selectIndex(self.timeNodes.length - 1)
        })
    }
    smilTimeContainer_seq.prototype.computeTimeNodes = function () {
        var segment = null;
        for (var i = 0; i < this.timeNodes.length; i++) {
            segment = this.timeNodes[i];
            segment.reset();
            if (segment.begin != undefined) {
                segment.time_in = segment.begin
            } else {
                if ((i > 0) && (this.timeNodes[i - 1].time_out < Infinity)) {
                    segment.time_in = this.timeNodes[i - 1].time_out
                } else {
                    segment.time_in = 0
                }
            }
            if (!isNaN(segment.dur)) {
                segment.time_out = segment.time_in + segment.dur
            } else {
                if (i == this.timeNodes.length - 1) {
                    segment.time_out = this.dur
                } else {
                    segment.time_out = Infinity
                }
            }
        }
        if (!segment) {
            return
        }
        if ((this.dur == undefined) || (this.dur >= Infinity)) {
            this.dur = segment.time_out
        }
        if (this.end == undefined) {
            this.end = segment.time_out + this.begin
        }
    };
    smilTimeContainer_seq.prototype.onTimeUpdate = function () {
        var time = this.getCurrentTime();
        var withinBounds, outOfBounds, segment;
        if (this.repeatCount >= Infinity) {
            time = time % this.dur
        }
        if (this.currentIndex >= 0) {
            segment = this.timeNodes[this.currentIndex];
            outOfBounds = (time < segment.time_in) || (time >= segment.time_out);
            withinBounds = (time >= segment.time_in) && (time < segment.time_out);
            if (withinBounds) {
                return
            } else {
                this.timeNodes[this.currentIndex].hide()
            }
        }
        if (this.currentIndex < this.timeNodes.length - 1) {
            var time_in = this.timeNodes[this.currentIndex + 1].time_in;
            var time_out = this.timeNodes[this.currentIndex + 1].time_out;
            outOfBounds = (time < time_in) || (time >= time_out);
            if ((time_in >= Infinity) || !outOfBounds) {
                this.currentIndex++;
                this.timeNodes[this.currentIndex].show();
                return
            }
        }
        var index = -1;
        var active = false;
        for (var i = 0; i < this.timeNodes.length; i++) {
            segment = this.timeNodes[i];
            withinBounds = (time >= segment.time_in) && (time < segment.time_out);
            if (time < segment.time_in) {
                segment.reset()
            } else {
                if (time >= segment.time_out) {
                    segment.hide()
                } else {
                    if (withinBounds) {
                        if (active) {
                            segment.reset()
                        } else {
                            active = true;
                            segment.show();
                            index = i
                        }
                    }
                }
            }
        }
        if (index >= 0) {
            this.currentIndex = index
        } else {
            if ((this.currentIndex < this.timeNodes.length - 1) && isNaN(this.timeNodes[this.currentIndex + 1].time_in)) {
                this.next()
            }
        }
    };

    function smilTimeContainer_seq(domNode, parentNode, timerate) {
        this.computeTimeNodes = smilTimeContainer_seq.prototype.computeTimeNodes;
        this.onTimeUpdate = smilTimeContainer_seq.prototype.onTimeUpdate;
        smilTimeContainer_generic.call(this, domNode, parentNode, timerate);
        var self = this;
        this.currentIndex = -1;
        if (this.timeNodes.length && (this.timeNodes[0].time_in <= 0)) {
            this.currentIndex = 0
        }
        this.selectIndex = smilTimeContainer_generic.prototype.selectIndex;
        this.selectItem = smilTimeContainer_generic.prototype.selectItem;
        this.parseEvents(this.parseAttribute("first"), function () {
            self.selectIndex(0)
        });
        this.parseEvents(this.parseAttribute("prev"), function () {
            self.selectIndex(self.currentIndex - 1)
        });
        this.parseEvents(this.parseAttribute("next"), function () {
            self.selectIndex(self.currentIndex + 1)
        });
        this.parseEvents(this.parseAttribute("last"), function () {
            self.selectIndex(self.timeNodes.length - 1)
        })
    }
    function smilTimeElement(domNode, parentNode, targetNode, timerate) {
        smilTimeItem.call(this, domNode, parentNode, targetNode || domNode);
        switch (this.timeContainer) {
            case "par":
                smilTimeContainer_par.call(this, domNode, parentNode, timerate);
                break;
            case "seq":
                smilTimeContainer_seq.call(this, domNode, parentNode, timerate);
                break;
            case "excl":
                smilTimeContainer_excl.call(this, domNode, parentNode, timerate);
                break;
            default:
                this.timeContainer = null;
                this.timeNodes = [];
                break
        }
    }
    document.createTimeContainer = function (domNode, parentNode, targetNode, timerate) {
        return new smilTimeElement(domNode, parentNode, targetNode, timerate)
    };
    document.getTimeNodesByTarget = function (node) {
        var timeNodes = [];
        if (!node) {
            return timeNodes
        }
        if (node.timing) {
            timeNodes.push(node.timing)
        }
        if (node.extTiming) {
            for (var i = 0; i < node.extTiming.length; i++) {
                timeNodes.push(node.extTiming[i])
            }
        }
        timeNodes.item = function (index) {
            return timeNodes[index]
        };
        return timeNodes
    };
    document.getTimeContainersByTarget = function (node) {
        var contNodes = [];
        var timeNodes = document.getTimeNodesByTarget(node);
        for (var i = 0; i < timeNodes.length; i++) {
            if (timeNodes[i].timeContainer) {
                contNodes.push(timeNodes[i])
            }
        }
        contNodes.item = function (index) {
            return contNodes[index]
        };
        return contNodes
    };
    document.getTimeContainersByTagName = function (tagName) {
        var contNodes = [];
        tagName = tagName.toLowerCase();
        if ((/^(par|seq|excl)$/).test(tagName)) {
            for (var i = 0; i < TIMECONTAINERS.length; i++) {
                if (TIMECONTAINERS[i].timeContainer.toLowerCase() == tagName) {
                    contNodes.push(TIMECONTAINERS[i])
                }
            }
        } else {
            if (tagName == "*") {
                contNodes = TIMECONTAINERS
            }
        }
        contNodes.item = function (index) {
            return contNodes[index]
        };
        return contNodes
    }
}(this, document);

(function () {
    var b = ["controlBar", "play", "first", "prev", "next", "last", "toc", "tocList", "tocTitles", "tocDisplay", "timeline", "timeCursor", "timeSlider", "timeSegments", "currentTime", "duration", "currentIndex", "length"];
    a.prototype.playButtonHandler = function () {
        var j = this.controlElement;
        var f = this.timeContainer.mediaSyncAPI;
        if (!f || !this.play) {
            return
        }
        var g = (/(^|\s+)(playing|paused|seeking)(\s+|$)/i);
        if (!g.test(j.className)) {
            j.className += " seeking"
        }
        function h() {
            var k = j.className;
            if (f.seeking) {
                j.className = k.replace(g, " seeking")
            } else {
                if (f.paused) {
                    j.className = k.replace(g, " paused")
                } else {
                    j.className = k.replace(g, " playing")
                }
            }
        }
        function i() {
            if (f.paused) {
                j.className = j.className.replace(g, " seeking");
                f.play()
            } else {
                f.pause()
            }
        }
        EVENTS.bind(this.play, "click", i);
        f.addEventListener("play", h, false);
        f.addEventListener("playing", h, false);
        f.addEventListener("pause", h, false);
        f.addEventListener("seeked", h, false);
        f.addEventListener("canplay", h, false);
        f.addEventListener("progress", h, false);
        f.addEventListener("loadeddata", h, false);
        f.addEventListener("loadedmetadata", h, false);
        f.addEventListener("ended", function () {
            f.pause()
        }, false);
        h()
    };
    a.prototype.navButtonHandler = function () {
        var f = this.timeContainer;
        if (this.first) {
            EVENTS.bind(this.first, "click", function () {
                f.selectIndex(0)
            })
        }
        if (this.prev) {
            EVENTS.bind(this.prev, "click", function () {
                f.selectIndex(f.currentIndex - 1)
            })
        }
        if (this.next) {
            EVENTS.bind(this.next, "click", function () {
                f.selectIndex(f.currentIndex + 1)
            })
        }
        if (this.last) {
            EVENTS.bind(this.last, "click", function () {
                f.selectIndex(f.timeNodes.length - 1)
            })
        }
    };
    if (!window.getComputedStyle) {
        getComputedStyle = function (g, f) {
            return g.currentStyle
        }
    }
    function e(f) {
        var g = parseFloat(f);
        return (isNaN(g)) ? 0 : Math.ceil(g)
    }
    a.prototype._setTimelineWidth = function () {
        if (!this.timeline) {
            return
        }
        var k = this.timeline.parentNode.childNodes;
        var h = getComputedStyle(this.timeline.parentNode, null);
        var g = parseFloat(h.width);
        if (isNaN(g)) {
            return
        }
        var j = 0;
        for (var f = 0; f < k.length; f++) {
            if (k[f].nodeType == 1) {
                h = getComputedStyle(k[f], null);
                if (k[f] == this.timeline) {
                    j = e(h.width)
                } else {
                    g -= e(h.width)
                }
                g -= e(h.marginLeft);
                g -= e(h.marginRight);
                g -= e(h.paddingLeft);
                g -= e(h.paddingRight);
                g -= e(h.borderLeftWidth);
                g -= e(h.borderRightWidth)
            }
        }
        if ((j < 50) && (g > 0)) {
            this.timeline.style.width = g + "px"
        }
    };
    a.prototype.setTimelineWidth = function (g) {
        if (!this.timeline) {
            return
        }
        var n = this.timeline.parentNode.childNodes;
        var f = this.timeline.parentNode.getBoundingClientRect();
        var l = f.right - f.left;
        var m = 0;
        for (var j = 0; j < n.length; j++) {
            if (n[j].nodeType == 1) {
                f = n[j].getBoundingClientRect();
                var h = f.right - f.left;
                if (n[j] == this.timeline) {
                    m = h
                } else {
                    l -= e(h)
                }
                var k = getComputedStyle(n[j], null);
                l -= e(k.marginLeft);
                l -= e(k.marginRight);
                l -= e(k.paddingLeft);
                l -= e(k.paddingRight);
                l -= e(k.borderLeftWidth);
                l -= e(k.borderRightWidth)
            }
        }
        if (!window.XMLHttpRequest) {
            l -= 20
        }
        if (g || ((m < 50) && (l > 0))) {
            this.timeline.style.width = l + "px"
        } else {
            l = m
        }
        this.timelineWidth = l
    };
    a.prototype.timeUpdateHandler = function () {
        var l = this.timeContainer.dur;
        var h = this.timeContainer.mediaSyncAPI;
        if (!h) {
            return
        }
        function j(q) {
            q = Math.floor(q);
            var o = q % 60;
            var p = o;
            if (o < 10) {
                p = "0" + p
            }
            var m = Math.floor(q / 60);
            min = m % 60;
            p = min + ":" + p;
            if (l < 3600) {
                return p
            }
            if (min < 10) {
                p = "0" + p
            }
            var n = Math.floor(m / 60);
            p = n + ":" + p;
            return p
        }
        var i = this.currentTime;
        var f = this.timeCursor;
        var k = this.timeSlider;
        var g = this;
        if (i || f || k) {
            h.addEventListener("timeupdate", function () {
                if (g.timelineDragging) {
                    return
                }
                var m = h.currentTime;
                var n = (100 * m / l) + "%";
                if (i) {
                    i.innerHTML = j(m)
                }
                if (f) {
                    f.style.left = n
                }
                if (k) {
                    k.style.width = n
                }
            }, false)
        }
    };

    function c(f) {
        var g = f.getBoundingClientRect();
        f.rect = {
            top: g.top,
            right: g.right,
            bottom: g.bottom,
            left: g.left,
            height: g.bottom - g.top,
            width: g.right - g.left
        }
    }
    a.prototype.setCurrentTime = function (h) {
        if (!h) {
            h = window.event
        }
        var k = this.timeContainer.dur;
        var j = this.timeline.rect;
        var f = h.pageX;
        if (!f) {
            f = h.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft)
        }
        var l = (f - j.left) / j.width;
        if (l < 0) {
            l = 0
        } else {
            if (l > 0.99) {
                l = 0.99
            }
        }
        function g(q) {
            q = Math.floor(q);
            var o = q % 60;
            var p = o;
            if (o < 10) {
                p = "0" + p
            }
            var m = Math.floor(q / 60);
            min = m % 60;
            p = min + ":" + p;
            if (k < 3600) {
                return p
            }
            if (min < 10) {
                p = "0" + p
            }
            var n = Math.floor(m / 60);
            p = n + ":" + p;
            return p
        }
        var i = k * l;
        l = (100 * l) + "%";
        if (this.currentTime) {
            this.currentTime.innerHTML = g(i)
        }
        if (this.timeCursor) {
            this.timeCursor.style.left = l
        }
        if (this.timeSlider) {
            this.timeSlider.style.width = l
        }
        this.timeContainer.setCurrentTime(i)
    };
    a.prototype.timeDragHandler = function () {
        if (!this.timeline) {
            return
        }
        var g = this.controlBar || this.timeline;
        var h = this;
        var j = new RegExp("(^|\\s)dragging(\\s|$)");

        function f() {
            h.timelineDragging = true;
            c(h.timeline);
            g.className += " dragging";
            g.onmousemove = function (k) {
                h.setCurrentTime(k)
            }
        }
        function i() {
            g.onmousemove = null;
            g.className = g.className.replace(j, " ");
            h.timelineDragging = false
        }
        if (this.timeCursor) {
            this.timeCursor.onmousedown = function (k) {
                f()
            }
        } else {
            if (this.timeSlider) {
                this.timeline.onmousedown = function (k) {
                    f();
                    h.setCurrentTime(k)
                }
            }
        }
        if (this.timeCursor || this.timeSlider) {
            g.onmouseup = i;
            g.onmouseout = function (l) {
                var k = l ? l.relatedTarget : window.event.toElement;
                while (k && k != g && k != document.body) {
                    k = k.parentNode
                }
                if (k != g) {
                    i()
                }
            }
        }
    };
    a.prototype.tocDisplayHandler = function (i) {
        var g = this.toc;
        var j = this.tocDisplay;
        var h = new RegExp("(^|\\s)" + i + "(\\s|$)");

        function k() {
            g.className = g.className.replace(h, " ")
        }
        function f() {
            if (h.test(g.className)) {
                k()
            } else {
                g.className += " " + i
            }
        }
        EVENTS.bind(g, "click", k);
        EVENTS.bind(j, "click", f)
    };
    a.prototype.fillTimelineAnchors = function (f) {
        var n = this.tocList;
        var m = this.timeSegments;
        var g = this.timeContainer.dur;
        if (!n || !m || !g) {
            return
        }
        var k = [];
        var q = n.childNodes;
        for (var t = 0; t < q.length; t++) {
            if ((q[t].nodeType == 1) && (q[t].nodeName.toLowerCase() == "li")) {
                var h = q[t].getElementsByTagName("a");
                if (h && h.length) {
                    var u = h[0].href.replace(/^.*#/, "");
                    var z = document.getElementById(u) || document.getElementById(u.substr(1));
                    var p = document.getTimeNodesByTarget(z);
                    if (p.length) {
                        k.push({
                            link: h[0],
                            begin: p[0].time_in
                        })
                    }
                }
            }
        }
        if (f) {
            var l = this.timeContainer.parseAttribute("mediaSync");
            m.setAttribute("timeContainer", "excl");
            m.setAttribute("timeAction", f);
            m.setAttribute("mediaSync", l)
        }
        var w = k.length - 1;
        var j = g;
        for (t = w; t >= 0; t--) {
            var o = k[t].link;
            var y = k[t].begin;
            var r = 100 * (j - y) / g;
            var v = document.createElement("a");
            var s = document.createElement("span");
            s.appendChild(o.firstChild.cloneNode(true));
            s.style.width = this.timelineWidth + "px";
            v.appendChild(s);
            v.href = o.href;
            v.style.width = r + "%";
            m.insertBefore(v, m.firstChild);
            j = y;
            if (f) {
                v.setAttribute("begin", y)
            }
        }
        if (f) {
            var x = document.createTimeContainer(m);
            x.show()
        }
    };
    a.prototype.syncTableOfContents = function (o) {
        var q = this.timeContainer.parseAttribute("mediaSync");
        var h = this.tocList;
        if (!h) {
            return
        }
        h.setAttribute("timeContainer", "excl");
        h.setAttribute("timeAction", o);
        h.setAttribute("mediaSync", q);
        var m = h.getElementsByTagName("ul");
        for (var k = 0; k < m.length; k++) {
            m[k].setAttribute("timeContainer", "excl");
            m[k].setAttribute("timeAction", o);
            m[k].setAttribute("mediaSync", q);
            m[k].parentNode.setAttribute("timeContainer", "par")
        }
        var p = h.getElementsByTagName("li");
        for (k = 0; k < p.length; k++) {
            var n = p[k].getElementsByTagName("a").item(0);
            var f = n.href.replace(/^.*#/, "");
            var l = document.getElementById(f);
            var j = document.getTimeNodesByTarget(l);
            if (j.length) {
                p[k].setAttribute("begin", j[0].time_in + "s")
            }
        }
        var g = document.createTimeContainer(h);
        g.show()
    };

    function a(h, g) {
        this.timeContainer = h;
        this.controlElement = g;
        this.timelineDragging = false;
        if (!g.getElementsByTagName("*").length) {
            g.innerHTML = '<!-- auto-filled by timecontroller.js -->\n  <div class="smil-left">\n    <button class="smil-play"><span>â–¶||</span></button>\n  </div>\n  <div class="smil-timeline">\n    <div class="smil-timeSlider"></div>\n  </div>\n  <div class="smil-right">\n    <span class="smil-currentTime">0:00</span>\n  </div>';
            if (!(/(^|\\s)smil-controlBar(\\s|$)/).test(g.className)) {
                g.className += "smil-controlBar"
            }
        }
        function k(o) {
            var p = new RegExp("(^|\\s)" + o + "(\\s|$)");
            if (p.test(g.className)) {
                return g
            }
            if (g.querySelector) {
                return g.querySelector("." + o)
            }
            var n = g.getElementsByTagName("*");
            var l = n.length;
            for (var m = 0; m < l; m++) {
                if (p.test(n[m].className)) {
                    return n[m]
                }
            }
            return null
        }
        for (var f = 0; f < b.length; f++) {
            var j = b[f];
            this[j] = k("smil-" + j)
        }
        this.setTimelineWidth();
        this.navButtonHandler();
        this.playButtonHandler();
        this.timeUpdateHandler();
        this.timeDragHandler();
        if (this.toc && this.tocDisplay) {
            this.tocDisplayHandler("active")
        }
        if (this.toc && this.tocList) {
            this.syncTableOfContents("class:current");
            this.fillTimelineAnchors("class:current")
        }
    }
    function d() {
        var h = document.getTimeContainersByTagName("*");
        for (var g = 0; g < h.length; g++) {
            var k = h[g];
            var f = k.parseAttribute("controls");
            var j = document.querySelector(f);
            if (j) {
                k.controls = new a(k, j)
            }
        }
    }
    if (1) {
        EVENTS.onSMILReady(function () {
            setTimeout(d, 500)
        })
    } else {
        d()
    }
    document.redrawTimelines = function () {
        var h = document.getTimeContainersByTagName("*");
        for (var g = 0; g < h.length; g++) {
            var f = h[g].controls;
            if (f) {
                f.setTimelineWidth(true)
            }
        }
    };
    EVENTS.bind(window, "resize", document.redrawTimelines)
})();

(function () {
    function a(j, c) {
        function e(k) {
            var i = new RegExp("(^|[\\s;]+)" + k + "([\\s;]+|$)", "i");
            return i.test(c)
        }
        var g = j.target;
        if (!g) {
            g = j.timeNodes[0].target.parentNode
        }
        if (e("arrows")) {
            EVENTS.bind(document, "keydown", function (m) {
                var k = j.currentIndex;
                var l = j.timeNodes.length;
                var i = j.timeNodes[k];
                switch (m.keyCode) {
                    case 32:
                        EVENTS.preventDefault(m);
                        if (m.shiftKey) {
                            j.selectIndex(k - 1)
                        } else {
                            j.selectIndex(k + 1)
                        }
                        break;
                    case 35:
                        EVENTS.preventDefault(m);
                        j.selectIndex(l - 1);
                        break;
                    case 36:
                        EVENTS.preventDefault(m);
                        j.selectIndex(0);
                        break;
                    case 37:
                        EVENTS.preventDefault(m);
                        j.selectIndex(k - 1);
                        break;
                    case 38:
                        EVENTS.preventDefault(m);
                        i.reset();
                        i.show();
                        break;
                    case 39:
                        EVENTS.preventDefault(m);
                        j.selectIndex(k + 1);
                        break;
                    case 40:
                        EVENTS.preventDefault(m);
                        EVENTS.trigger(i.target, "click");
                        break;
                    default:
                        break
                }
            })
        }
        if (e("click")) {
            EVENTS.bind(g, "mousedown", function (k) {
                var i = k.which || ([0, 1, 3, 0, 2])[k.button];
                if (i == 1) {
                    j.selectIndex(j.currentIndex + 1)
                } else {
                    if (i == 2) {
                        j.selectIndex(j.currentIndex - 1)
                    }
                }
            })
        }
        if (e("scroll")) {
            function d(i) {
                if (i) {
                    if (i.ctrlKey) {
                        return
                    }
                    i.preventDefault()
                } else {
                    i = window.event;
                    if (i.ctrlKey) {
                        return
                    }
                    i.returnValue = false
                }
                var k = 0;
                if (i.wheelDelta) {
                    k = i.wheelDelta / 120
                } else {
                    if (i.detail) {
                        k = -i.detail / 3
                    }
                }
                if (k < 0) {
                    j.selectIndex(j.currentIndex + 1)
                } else {
                    if (k > 0) {
                        j.selectIndex(j.currentIndex - 1)
                    }
                }
            }
            if (window.addEventListener) {
                g.addEventListener("DOMMouseScroll", d, false)
            }
            g.onmousewheel = d
        }
        if (e("hash")) {
            var b = j.timeNodes;
            for (var f = 0; f < b.length; f++) {
                var h = b[f].target;
                if (h.id) {
                    EVENTS.bind(h, "begin", function () {
                        document.location.hash = "#" + this.id
                    })
                }
            }
        }
    }
    EVENTS.onSMILReady(function () {
        var d = document.getTimeContainersByTagName("*");
        for (var c = 0; c < d.length; c++) {
            var b = d[c].parseAttribute("navigation");
            if (b) {
                a(d[c], b)
            }
        }
    })
})();