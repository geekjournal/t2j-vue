(function(t){function e(e){for(var o,s,i=e[0],l=e[1],c=e[2],p=0,h=[];p<i.length;p++)s=i[p],a[s]&&h.push(a[s][0]),a[s]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(t[o]=l[o]);u&&u(e);while(h.length)h.shift()();return r.push.apply(r,c||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],o=!0,i=1;i<n.length;i++){var l=n[i];0!==a[l]&&(o=!1)}o&&(r.splice(e--,1),t=s(s.s=n[0]))}return t}var o={},a={app:0},r=[];function s(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=o,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)s.d(n,o,function(e){return t[e]}.bind(null,o));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=e,i=i.slice();for(var c=0;c<i.length;c++)e(i[c]);var u=l;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var o=n("c21b"),a=n.n(o);a.a},2:function(t,e){},"56d7":function(t,e,n){"use strict";n.r(e);var o=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ion-app",[n("router-view"),n("ion-menu",{attrs:{side:"start"}},[n("ion-header",[n("ion-toolbar",{attrs:{color:"secondary"}},[n("ion-title",[t._v("Left Menu  \n      ")]),n("ion-icon",{staticStyle:{"font-size":"25px"},attrs:{name:"close"},on:{click:t.closeMainMenu}})],1)],1),n("ion-content",{attrs:{padding:""}},[n("button",{attrs:{"ion-button":""}},[n("ion-label",[t._v("START MENU CONTENTS")])],1),n("ion-button",{attrs:{shape:"round",full:""},on:{click:t.goToAbout}},[t._v("About")]),n("ion-button",{attrs:{shape:"round",full:""},on:{click:function(e){t.openExternalURL("https://tennislink.usta.com/tournaments/rankings/rankinghome.aspx")}}},[t._v("Ranking/Record Search")]),n("ion-button",{attrs:{shape:"round",full:""},on:{click:function(e){t.openExternalURL("https://tennislink.usta.com/leagues/reports/NTRP/FindRating.aspx")}}},[t._v("Rating Search")])],1)],1),n("ion-page",{staticClass:"show-page",attrs:{main:""}}),n("ion-menu-controller")],1)},r=[],s=n("81c3"),i={name:"App",data(){return{apiURLbase:"https://api.geekjournal.com",tournaments:[],selected:{}}},methods:{openMainMenu(){console.log("openMainMenu called"),document.querySelector("ion-menu-controller").open("start")},closeMainMenu(){console.log("closeMainMenu called"),document.querySelector("ion-menu-controller").close("start")},async openActionSheet(){console.log("openActionSheet called");let t=await s["b"].Modals.showActions({title:"Photo Options",message:"Select an option to perform",options:[{title:"Upload"},{title:"Share"},{title:"Remove",style:s["a"].Destructive},{title:"Cancel",style:s["a"].Cancel}]});console.log("You selected",t)},goToAbout(){this.$router.push("about")},openExternalURL(t){open(t,"_blank")},fetchTournaments(){console.log("fetching touraments"),this.$http.get(this.apiURLbase+"/tournaments").then(function(t){console.log(t.body),this.tournaments=t.body},t=>{console.log("failed to get tournaments",t.body)})},refresh(){console.log("refresh called"),this.fetchTournaments()},goBack(){this.$router.go(-1)}},created:function(){document.addEventListener("backbutton",this.goBack,!1),this.fetchTournaments()},components:{App:p}},l=i,c=(n("034f"),n("2877")),u=Object(c["a"])(l,a,r,!1,null,null,null);u.options.__file="App.vue";var p=u.exports,h=n("8c4f"),d=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ion-app",[n("ion-header",[n("ion-toolbar",{attrs:{color:"primary"}},[n("ion-title",[t._v("\n     The Traveling Circus\n    ")]),n("ion-buttons",{attrs:{slot:"start"},slot:"start"},[n("ion-button",{on:{click:this.$parent.openMainMenu}},[n("ion-icon",{staticStyle:{"font-size":"25px"},attrs:{name:"md-menu"}})],1)],1)],1),n("div",[n("ion-button",{attrs:{clear:""},on:{click:this.$parent.openActionSheet}},[n("span",{staticStyle:{float:"middle"}},[n("ion-icon",{staticStyle:{"font-size":"25px"},attrs:{large:"",ios:"ios-funnel",md:"md-funnel"}})],1)]),n("span",{staticStyle:{float:"middle"}},[n("ion-icon",{staticStyle:{"font-size":"25px"},attrs:{name:"md-list"}})],1),n("span",{staticStyle:{float:"left"}},[n("ion-icon",{staticStyle:{"font-size":"25px"},attrs:{name:"md-search"},on:{click:this.$parent.refresh}})],1),n("ion-button",{attrs:{clear:""},on:{click:this.$parent.refresh}},[n("ion-icon",{staticStyle:{"font-size":"25px"},attrs:{name:"md-refresh"}})],1),n("span",{staticClass:"f7 b",staticStyle:{float:"right"}},[t._v("Displaying: "+t._s(this.$parent.tournaments.length)+" tournaments")]),n("button",{attrs:{"ion-button":"",block:""},on:{click:this.$parent.openActionSheet}},[t._v("show action sheet")])],1)],1),n("ion-content",{attrs:{padding:""}},[t.tournaments.length>-1?n("ion-list",[n("ion-item-divider",{attrs:{color:"light"}},[t._v("Unsorted")]),t._l(this.$parent.tournaments,function(e){return n("ion-item",{key:e.ID},[n("ion-card",[n("div",{staticClass:"f4 mw-100"},[t._v(t._s(e.name))]),n("button",{staticClass:"f3",attrs:{"ion-label":""},on:{click:function(n){t.tournamentClicked(e)}}},[t._v("Details")])])],1)})],2):t._e()],1)],1)},m=[],f={name:"Home",data(){return{apiURLbase:"https://api.geekjournal.com",tournaments:[],items:["a","b","c"]}},methods:{goToAbout(){this.$router.push("about")},openMainMenu(){console.log("openMainMenu called"),document.querySelector("ion-menu-controller").open("start")},openExternalURL(t){open(t,"_blank")},tournamentClicked(t){console.log("Tournament clicked: ",t.name,t.ID),this.$parent.selected=t,this.$router.push("/nav/"+t.ID)},async showDialogAlert(){console.log("Enter showDialog"),await s["b"].Modals.alert({title:"Alert",message:"This is an example alert box"})},fetchTournaments(){console.log("fetching touraments"),this.$http.get(this.apiURLbase+"/tournaments").then(function(t){console.log(t.body),this.tournaments=t.body,console.log("Tournaments Length ",this.tournaments.length)},t=>{console.log("failed to get tournaments",t.body)})}},created:function(){},updated:function(){},components:{}},b=f,g=Object(c["a"])(b,d,m,!1,null,null,null);g.options.__file="Home.vue";var v=g.exports,k=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ion-app",[n("ion-header",[n("ion-toolbar",{attrs:{color:"primary"}},[n("ion-title",[t._v("\n      The Traveling Circus | About\n    ")]),n("ion-buttons",{attrs:{slot:"start"},slot:"start"},[n("ion-button",{on:{click:function(e){t.goBackHome()}}},[n("ion-icon",{staticStyle:{"font-size":"25px"},attrs:{name:"arrow-back"}})],1)],1)],1)],1),n("ion-content",{attrs:{padding:""}},[t._v("\n  This is the About page.\n  ")])],1)},_=[],y={name:"About",methods:{goBackHome(){this.$router.push("/")}}},w=y,$=Object(c["a"])(w,k,_,!1,null,null,null);$.options.__file="About.vue";var S=$.exports,T=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ion-app",[n("ion-header",[n("ion-toolbar",{attrs:{color:"primary"}},[n("ion-title",[t._v("\n      The Traveling Circus | Detail\n    ")]),n("ion-buttons",{attrs:{slot:"start"},slot:"start"},[n("ion-button",{on:{click:function(e){t.goBackHome()}}},[n("ion-icon",{staticStyle:{"font-size":"25px"},attrs:{name:"arrow-back"}})],1)],1)],1)],1),n("ion-content",{attrs:{padding:""}},t._l(this.$parent.selected.mainContent,function(e){return n("div",{key:e},[n("button",{on:{click:function(n){t.selectionMade(e)}}},[n("ion-label",[n("strong",[t._v(t._s(e))])])],1)])}))],1)},x=[],M={name:"TournamentDetaillNav",data(){return{}},methods:{goBackHome(){this.$router.push("/")},selectionMade(t){console.log("picked item: ",t);let e=this.$parent.selected.url;switch(t){case"Important Info":console.log("url to route to: ",e+"#&&s=0"),open(e+"#&&s=0","_blank");break;case"Applicants":console.log("url to route to: ",e+"#&&s=1"),open(e+"#&&s=1","_blank");break;case"Competitors":console.log("url to route to: ",e+"#&&s=5"),open(e+"#&&s=5","_blank");break;case"Seeds":console.log("url to route to: ",e+"#&&s=6"),open(e+"#&&s=6","_blank");break;case"Draws":console.log("url to route to: ",e+"#&&s=7"),this.$router.push("/drawnav/"+this.$parent.selected.ID);break;case"Results":console.log("url to route to: ",e+"#&&s=8Results0"),open(e+"#&&s=8Results0","_blank");break;default:break}}},created:function(){console.log("Creating NAV for t.ID=",this.$route.params.id,this.$parent.selected.ID,this.$parent.tournaments.length)}},D=M,A=Object(c["a"])(D,T,x,!1,null,null,null);A.options.__file="TournamentDetailNav.vue";var R=A.exports,C=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ion-app",[n("ion-header",[n("ion-toolbar",{attrs:{color:"primary"}},[n("ion-title",[t._v("\n      The Traveling Circus | Draws\n    ")]),n("ion-buttons",{attrs:{slot:"start"},slot:"start"},[n("ion-button",{on:{click:function(e){t.goBack()}}},[n("ion-icon",{staticStyle:{"font-size":"25px"},attrs:{name:"arrow-back"}})],1)],1)],1)],1),n("ion-content",{attrs:{padding:""}},t._l(this.$parent.selected.drawCategories,function(e,o){return n("div",{key:e},[n("button",{on:{click:function(n){t.selectionMade(e,o)}}},[n("ion-label",[n("strong",[t._v(t._s(e)+", "+t._s(o))])])],1)])}))],1)},O=[],j={name:"DrawNav",data(){return{}},methods:{goBackHome(){this.$router.push("/")},goBack(){this.$router.go(-1)},selectionMade(t,e){console.log("picked item: ",t,e);let n=this.$parent.selected.url+"#&&s=7Draws"+(e+2);console.log("launching draw URL: ",n),open(n,"_blank")}},created:function(){console.log("Creating DrawNav for t.ID=",this.$route.params.id,this.$parent.selected.ID,this.$parent.tournaments.length)}},E=j,L=Object(c["a"])(E,C,O,!1,null,null,null);L.options.__file="DrawNav.vue";var N=L.exports;o["a"].use(h["a"]);var U=new h["a"]({mode:"history",base:"/",routes:[{path:"/",name:"home",component:v},{path:"/nav/:id",name:"TournamentDetailNav",component:R},{path:"/drawnav/:id",name:"DrawNav",component:N},{path:"/about",name:"about",component:S}]}),I=n("28dd"),z=(n("da13"),n("3c43"));const{SplashScreen:B}=s["b"];"browser"!=Object(z["platform"])()&&B.hide(),o["a"].config.ignoredElements=[/^ion-/],o["a"].config.productionTip=!1,o["a"].use(I["a"]),new o["a"]({router:U,render:t=>t(p)}).$mount("#app")},c21b:function(t,e,n){}});
//# sourceMappingURL=app.52b763d0.js.map