(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"guC+":function(t,n,e){"use strict";e.r(n);var s=e("kZht");class a{}var r=e("C9Ky"),u=e("UmOu"),i=e("36v8"),o=e("7tMs");e("AeuN"),e("4HxU"),e("hJoO");class l{constructor(t,n,e,s,a){this.route=t,this.router=n,this.firestore=e,this.stationsFacade=s,this.spotifyService=a,this.subs=new o.a,this.parseState=t=>JSON.parse(t)}ngOnDestroy(){this.subs.unsubscribe()}ngOnInit(){const t={};this.subs.add(this.route.fragment.subscribe(n=>{if(null===n)this.router.navigateByUrl("/");else{n.split("&").map(t=>t.split("=")).forEach(n=>{t[n[0]]=n[1]}),this.spotifyService.setAuthToken(t);const e=this.parseState(t.state);this.stationsFacade.setSelectedId(e.stationId),this.firestore.setIdToken(e.idToken),this.router.navigateByUrl("/home")}}))}}var b=e("1VvW"),c=e("m56j"),h=e("tyKT"),D=e("jGEi"),f=s.rb({encapsulation:0,styles:[[""]],data:{}});function p(t){return s.Pb(2,[(t()(),s.tb(0,0,null,null,1,"iresa-loader",[],null,null,null,u.b,u.a)),s.sb(1,114688,null,0,i.a,[],null,null)],(function(t,n){t(n,1,0)}),null)}function d(t){return s.Pb(0,[(t()(),s.tb(0,0,null,null,1,"iresa-portal-authorize",[],null,null,null,p,f)),s.sb(1,245760,null,0,l,[b.a,b.o,c.b,h.a,D.b],null,null)],(function(t,n){t(n,1,0)}),null)}var y=s.pb("iresa-portal-authorize",l,d,{},{},[]),v=e("An66"),m=e("ofez"),g=e("pOQZ"),k=e("ApNh"),S=e("ENSU"),w=e("EsQC"),U=e("Ho/f"),j=e("zQoo"),z=e("iQ24"),A=e("XBxU"),I=e("DyCy"),J=e("UzRm"),O=e("mqr1");e.d(n,"AuthorizeModuleNgFactory",(function(){return C}));var C=s.qb(a,[],(function(t){return s.Cb([s.Db(512,s.j,s.bb,[[8,[r.a,y]],[3,s.j],s.x]),s.Db(4608,v.m,v.l,[s.t,[2,v.A]]),s.Db(4608,h.a,h.a,[m.n]),s.Db(1073742336,v.c,v.c,[]),s.Db(1073742336,g.a,g.a,[]),s.Db(1073742336,k.l,k.l,[[2,k.d],[2,S.f]]),s.Db(1073742336,w.c,w.c,[]),s.Db(1073742336,U.a,U.a,[]),s.Db(1024,m.I,(function(){return[{}]}),[]),s.Db(1024,m.j,(function(){return[{key:"stations",reducerFactory:m.s,metaReducers:[],initialState:void 0}]}),[]),s.Db(1024,m.J,m.P,[s.q,m.I,m.j]),s.Db(1024,m.H,(function(){return[j.b]}),[]),s.Db(1024,m.K,(function(t){return[t]}),[m.H]),s.Db(1024,m.b,(function(t,n,e){return[m.Q(t,n,e)]}),[s.q,m.H,m.K]),s.Db(1073873408,m.o,m.o,[m.J,m.b,m.g,m.p]),s.Db(512,z.a,z.a,[c.b]),s.Db(512,A.a,A.a,[I.a,z.a,J.a]),s.Db(1024,I.k,(function(t){return[I.g(t)]}),[A.a]),s.Db(1073742336,I.d,I.d,[I.e,I.k,[2,m.p],[2,m.o]]),s.Db(1073742336,O.a,O.a,[]),s.Db(1073742336,b.s,b.s,[[2,b.y],[2,b.o]]),s.Db(1073742336,a,a,[]),s.Db(1024,b.m,(function(){return[[{path:"",component:l}]]}),[])])}))}}]);