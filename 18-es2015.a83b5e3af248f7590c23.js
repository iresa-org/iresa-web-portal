(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{hFq2:function(t,n,a){"use strict";a.r(n),a.d(n,"QueueModule",(function(){return R}));var i=a("2kYt"),e=a("4HxU"),c=a("C05f"),o=a("YtkY"),r=a("EM62"),l=a("FlRo");let s=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=r.Fb({type:t,selectors:[["iresa-portal-sound-bars"]],decls:11,vars:0,consts:[[1,"bars"],[1,"bar"]],template:function(t,n){1&t&&(r.Rb(0,"div",0),r.Mb(1,"div",1),r.Mb(2,"div",1),r.Mb(3,"div",1),r.Mb(4,"div",1),r.Mb(5,"div",1),r.Mb(6,"div",1),r.Mb(7,"div",1),r.Mb(8,"div",1),r.Mb(9,"div",1),r.Mb(10,"div",1),r.Qb())},styles:[".bars[_ngcontent-%COMP%]{height:30px;position:relative}.bar[_ngcontent-%COMP%]{bottom:1px;height:3px;position:absolute;width:3px;-webkit-animation:sound 0ms linear -.8s infinite alternate;animation:sound 0ms linear -.8s infinite alternate}@-webkit-keyframes sound{0%{opacity:.35;height:3px}to{opacity:.8;height:28px}}@keyframes sound{0%{opacity:.35;height:3px}to{opacity:.8;height:28px}}.bar[_ngcontent-%COMP%]:first-child{left:1px;-webkit-animation-duration:474ms;animation-duration:474ms}.bar[_ngcontent-%COMP%]:nth-child(2){left:5px;-webkit-animation-duration:433ms;animation-duration:433ms}.bar[_ngcontent-%COMP%]:nth-child(3){left:9px;-webkit-animation-duration:407ms;animation-duration:407ms}.bar[_ngcontent-%COMP%]:nth-child(4){left:13px;-webkit-animation-duration:458ms;animation-duration:458ms}.bar[_ngcontent-%COMP%]:nth-child(5){left:17px;-webkit-animation-duration:.4s;animation-duration:.4s}.bar[_ngcontent-%COMP%]:nth-child(6){left:21px;-webkit-animation-duration:427ms;animation-duration:427ms}.bar[_ngcontent-%COMP%]:nth-child(7){left:25px;-webkit-animation-duration:441ms;animation-duration:441ms}.bar[_ngcontent-%COMP%]:nth-child(8){left:29px;-webkit-animation-duration:419ms;animation-duration:419ms}.bar[_ngcontent-%COMP%]:nth-child(9){left:33px;-webkit-animation-duration:487ms;animation-duration:487ms}.bar[_ngcontent-%COMP%]:nth-child(10){left:37px;-webkit-animation-duration:442ms;animation-duration:442ms}"],changeDetection:0}),t})();var m=a("iHdW"),b=a("3rlO");function d(t,n){1&t&&r.Mb(0,"mat-header-cell")}function u(t,n){1&t&&r.Mb(0,"iresa-portal-sound-bars")}function f(t,n){if(1&t&&(r.Rb(0,"mat-cell"),r.Ac(1,u,1,0,"iresa-portal-sound-bars",1),r.ec(2,"async"),r.Qb()),2&t){const t=n.$implicit,a=r.dc(3);r.Ab(1),r.jc("ngIf",t.curr&&r.fc(2,1,a.playing$))}}function p(t,n){1&t&&(r.Rb(0,"mat-header-cell"),r.Bc(1," Name "),r.Qb())}function h(t,n){if(1&t&&(r.Rb(0,"mat-cell"),r.Bc(1),r.Qb()),2&t){const t=n.$implicit;r.Ab(1),r.Dc(" ",t.name," ")}}function g(t,n){1&t&&(r.Rb(0,"mat-header-cell"),r.Bc(1," Artists "),r.Qb())}function w(t,n){if(1&t&&(r.Rb(0,"mat-cell"),r.Bc(1),r.ec(2,"loadArtistGroup"),r.Qb()),2&t){const t=n.$implicit;r.Ab(1),r.Dc(" ",r.fc(2,1,t.artists)," ")}}function M(t,n){1&t&&(r.Rb(0,"mat-header-cell"),r.Bc(1," Duration "),r.Qb())}function C(t,n){if(1&t&&(r.Rb(0,"mat-cell"),r.Bc(1),r.ec(2,"songTime"),r.Qb()),2&t){const t=n.$implicit;r.Ab(1),r.Dc(" ",r.fc(2,1,t.duration_ms)," ")}}function y(t,n){1&t&&r.Mb(0,"mat-header-row")}function A(t,n){1&t&&r.Mb(0,"mat-row")}function k(t,n){if(1&t&&(r.Rb(0,"mat-table",3),r.Pb(1,4),r.Ac(2,d,1,0,"mat-header-cell",5),r.Ac(3,f,3,3,"mat-cell",6),r.Ob(),r.Pb(4,7),r.Ac(5,p,2,0,"mat-header-cell",5),r.Ac(6,h,2,1,"mat-cell",6),r.Ob(),r.Pb(7,8),r.Ac(8,g,2,0,"mat-header-cell",5),r.Ac(9,w,3,3,"mat-cell",6),r.Ob(),r.Pb(10,9),r.Ac(11,M,2,0,"mat-header-cell",5),r.Ac(12,C,3,3,"mat-cell",6),r.Ob(),r.Ac(13,y,1,0,"mat-header-row",10),r.Ac(14,A,1,0,"mat-row",11),r.Qb()),2&t){const t=r.dc().ngIf,n=r.dc();r.jc("dataSource",t),r.Ab(13),r.jc("matHeaderRowDef",n.displayedColumns),r.Ab(1),r.jc("matRowDefColumns",n.displayedColumns)}}function O(t,n){1&t&&(r.Rb(0,"p"),r.Bc(1,"Queue is empty"),r.Qb())}function v(t,n){if(1&t&&(r.Rb(0,"div"),r.Ac(1,k,15,3,"mat-table",2),r.Ac(2,O,2,0,"p",1),r.Qb()),2&t){const t=n.ngIf;r.Ab(1),r.jc("ngIf",t.length>0),r.Ab(1),r.jc("ngIf",0===t.length)}}let x=(()=>{class t{constructor(t){this.playback=t,this.displayedColumns=["curr","name","artists","duration_ms"],this._dataSource=new c.a([])}ngOnInit(){}get dataSource$(){return this.playback.queue$.pipe(Object(o.a)(t=>this.loadDataSource(t)))}get playing$(){return this.playback.playing$}loadDataSource(t){return t.length>0?t.map(t=>{const n={};return this.displayedColumns.forEach(a=>{t[a]&&(n[a]=t[a])}),n}):[]}}return t.\u0275fac=function(n){return new(n||t)(r.Lb(e.r))},t.\u0275cmp=r.Fb({type:t,selectors:[["iresa-portal-queue"]],decls:4,vars:3,consts:[[1,"title"],[4,"ngIf"],["class","mat-elevation-z8",3,"dataSource",4,"ngIf"],[1,"mat-elevation-z8",3,"dataSource"],["matColumnDef","curr"],[4,"matHeaderCellDef"],[4,"matCellDef"],["matColumnDef","name"],["matColumnDef","artists"],["matColumnDef","duration_ms"],[4,"matHeaderRowDef"],[4,"matRowDef","matRowDefColumns"]],template:function(t,n){1&t&&(r.Rb(0,"h3",0),r.Bc(1,"Currently Playing"),r.Qb(),r.Ac(2,v,3,2,"div",1),r.ec(3,"async")),2&t&&(r.Ab(2),r.jc("ngIf",r.fc(3,1,n.dataSource$)))},directives:[i.k,l.j,l.c,l.e,l.b,l.g,l.i,l.d,l.a,s,l.f,l.h],pipes:[i.b,m.a,b.a],styles:["table[_ngcontent-%COMP%]{width:100%}.mat-cell[_ngcontent-%COMP%]:first-child, .mat-header-cell[_ngcontent-%COMP%]:first-child{flex:0.2}"],changeDetection:0}),t})();var P=a("sEIs"),D=a("0FR3");let R=(()=>{class t{}return t.\u0275mod=r.Jb({type:t}),t.\u0275inj=r.Ib({factory:function(n){return new(n||t)},imports:[[i.c,l.k,D.b,D.g,P.i.forChild([{path:"",component:x}])]]}),t})()}}]);