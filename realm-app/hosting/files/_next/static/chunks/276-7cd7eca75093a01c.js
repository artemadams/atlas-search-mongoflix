"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[276],{4436:function(e,t,n){var r=n(5893);n(7294);t.Z=function(e){var t=e.title,n=e.subtitle;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("h3",{className:"text-gray-700 text-2xl font-medium block mt-16",children:t}),(0,r.jsx)("span",{className:"mt-3 text-sm text-gray-500",children:n})]})}},2369:function(e,t,n){var r=n(5893);n(7294);t.Z=function(e){var t=e.children;return(0,r.jsx)("main",{className:"my-8",children:(0,r.jsx)("div",{className:"container mx-auto px-6",children:t})})}},3193:function(e,t,n){var r=n(5893),s=(n(7294),n(1664));t.Z=function(){return(0,r.jsx)("footer",{className:"bg-gray-200",children:(0,r.jsxs)("div",{className:"container mx-auto px-6 py-3 flex justify-between items-center",children:[(0,r.jsx)("div",{className:"text-xl font-bold text-green-500 hover:text-green-400 cursor-pointer",children:(0,r.jsx)(s.default,{href:"/",children:"MongoFlix"})}),(0,r.jsx)("p",{className:"py-2 text-gray-500 sm:py-0",children:"All rights reserved"})]})})}},2484:function(e,t,n){n.d(t,{Z:function(){return c}});var r=n(5893),s=n(7294),i=n(1664),l=n(7804),o=function(e){var t=e.text,n=void 0===t?"":t,s=e.highlight,i=void 0===s?"":s;if(!i.trim()||i.includes("(")||i.includes(")"))return(0,r.jsx)("span",{children:n});var l=new RegExp("(".concat(i,")"),"gi"),o=n.split(l);return(0,r.jsx)("span",{children:o.filter(String).map((function(e,t){return l.test(e)?(0,r.jsx)("mark",{className:"bg-green-400",children:e},t):(0,r.jsx)("span",{children:e},t)}))})},a=function(e,t){var n,r,s=null===e||void 0===e?void 0:e.find((function(e){return e.path===t})),i=null===s||void 0===s||null===(n=s.texts)||void 0===n?void 0:n.find((function(e){return"hit"===e.type}));return null!==(r=null===i||void 0===i?void 0:i.value)&&void 0!==r?r:""},c=function(e){var t,n,c,u=e.movie,d=e.showDetail,f=void 0===d||d,m=a(u.highlights,"title"),x=a(u.highlights,"plot"),h=a(u.highlights,"genres"),v=a(u.highlights,"countries"),p=(0,s.useState)(!1);p[0],p[1];return(0,r.jsx)(i.default,{href:"/movies/".concat(u._id),children:(0,r.jsxs)("div",{className:"bg-white w-full max-w-sm mx-auto rounded-xl shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition relative",children:[(0,r.jsxs)("div",{className:"flex items-end justify-end h-80 w-full bg-cover relative",children:[u.poster&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("span",{className:"h-80 w-full relative overflow-hidden",children:[(0,r.jsx)("img",{src:"https://source.unsplash.com/random/1920x1080",alt:"blur bg",className:"absolute min-w-full max-w-full max-h-full blur-md object-contain -z-10 scale-[3]"}),(0,r.jsx)("img",{src:u.poster,alt:u.title,className:"absolute min-w-full max-w-full max-h-full blur-md object-contain -z-10 scale-[3]"})]}),(0,r.jsx)("img",{src:u.poster,alt:u.title,className:"absolute min-w-full max-w-full max-h-full z-10 object-contain"})]}),(0,r.jsx)("button",{className:"absolute z-10 p-2 rounded-full bg-green-600 text-white mx-5 -mb-4 hover:bg-green-500 focus:outline-none focus:bg-green-500",children:(0,r.jsx)(l.o1U,{className:"w-5 h-5"})})]}),(0,r.jsxs)("div",{className:"px-5 py-3 relative",children:[(0,r.jsx)("h3",{className:"text-gray-800 uppercase text-2xl font-semibold",children:(0,r.jsx)(o,{text:u.title,highlight:m})}),f&&(0,r.jsxs)(r.Fragment,{children:[u.year&&u.genres&&(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("h4",{className:"text-gray-600 text-sm font-medium",children:[u.year," -",(0,r.jsx)(o,{text:null!==(t=u.genres.join(", "))&&void 0!==t?t:"",highlight:h})]})}),u.countries&&(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("h4",{className:"text-gray-600 text-sm font-medium",children:(0,r.jsx)(o,{text:null!==(n=u.countries.join(", "))&&void 0!==n?n:"",highlight:v})})}),(0,r.jsx)("h4",{className:"text-gray-600 text-sm mt-2",children:(0,r.jsx)(o,{text:null!==(c=u.plot)&&void 0!==c?c:"",highlight:x})})]})]})]})})}},2276:function(e,t,n){n.r(t),n.d(t,{default:function(){return Z},handleError:function(){return q}});var r=n(4051),s=n.n(r),i=n(5893),l=n(9008),o=n(7294),a=n(4436),c=n(2369),u=n(3193),d=n(1664),f=n(1163),m=n(7804),x=n(3815),h=n(8100),v=n(8687),p=function(e){var t=e.list,n=e.selectedList,r=e.addItem,s=e.removeItem;return(0,i.jsx)("div",{id:"dropdown",className:"absolute shadow top-100 bg-white z-40 w-full lef-0 rounded max-h-select overflow-y-auto ",children:(0,i.jsx)("div",{className:"flex flex-col w-full",children:t.map((function(e,t){return n.includes(e.title)?(0,i.jsx)("div",{className:"cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100",onClick:function(){return s(e.title)},children:(0,i.jsx)("div",{className:"flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative bg-green-300",children:(0,i.jsx)("div",{className:"w-full items-center flex",children:(0,i.jsxs)("div",{className:"mx-2 leading-6 ",children:[e.title," ",(0,i.jsx)("span",{className:"text-gray-700 text-sm font-light",children:e.subtitle})]})})})},t):(0,i.jsx)("div",{className:"cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100",onClick:function(){return r(e.title)},children:(0,i.jsx)("div",{className:"flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:bg-green-100",children:(0,i.jsx)("div",{className:"w-full items-center flex",children:(0,i.jsxs)("div",{className:"mx-2 leading-6 ",children:[e.title," ",(0,i.jsx)("span",{className:"text-gray-700 text-sm font-light",children:e.subtitle})]})})})},t)}))})})},g=function(e){var t=e.items,n=e.selectedItems,r=e.setSelectedItems,s=e.placeholder,l=(0,o.useState)(!1),a=l[0],c=l[1],u=function(e){var t=n.filter((function(t){return t!==e}));r(t)};return(0,i.jsx)("div",{className:"autcomplete-wrapper",children:(0,i.jsx)("div",{className:"autcomplete relative my-3 max-w-lg mx-auto",children:(0,i.jsx)("div",{className:"w-full flex flex-col items-center mx-auto",children:(0,i.jsxs)("div",{className:"w-full",children:[(0,i.jsx)("div",{className:"flex flex-col items-center relative",children:(0,i.jsx)("div",{className:"w-full",children:(0,i.jsxs)("div",{className:"p-1 flex border border-gray-200 bg-white rounded focus-within:border-green-500 focus-within:outline-none focus-within: :shadow-outline",children:[(0,i.jsxs)("div",{className:"flex flex-auto flex-wrap",children:[n.map((function(e,t){return(0,i.jsxs)("div",{className:"flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300 ",children:[(0,i.jsx)("div",{className:"text-xs font-normal leading-none max-w-full flex-initial",children:e}),(0,i.jsx)("div",{className:"flex flex-auto flex-row-reverse",children:(0,i.jsx)("div",{onClick:function(){return u(e)},children:(0,i.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"100%",height:"100%",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"feather feather-x cursor-pointer hover:text-teal-400 rounded-full w-4 h-4 ml-2",children:[(0,i.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,i.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})})]},t)})),(0,i.jsx)("div",{className:"flex-1",children:(0,i.jsx)("input",{placeholder:s,className:"bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800"})})]}),(0,i.jsx)("div",{className:"text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200",onClick:function(){c(!a)},children:(0,i.jsx)("button",{className:"cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none",children:(0,i.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"100%",height:"100%",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"feather feather-chevron-up w-4 h-4",children:(0,i.jsx)("polyline",{points:"18 15 12 9 6 15"})})})})]})})}),a?(0,i.jsx)(p,{list:t,selectedList:n,addItem:function(e){r(n.concat(e)),c(!1)},removeItem:u}):null]})})})})};function j(e,t,n,r,s,i,l){try{var o=e[i](l),a=o.value}catch(error){return void n(error)}o.done?t(a):Promise.resolve(a).then(r,s)}function b(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function w(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){b(e,t,n[t])}))}return e}var y=function(){var e,t=(e=s().mark((function e(t,n){var r;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,x.bm)();case 2:return r=e.sent,e.abrupt("return",(0,v.request)(x.wj,t,{title:n},r));case 4:case"end":return e.stop()}}),e)})),function(){var t=this,n=arguments;return new Promise((function(r,s){var i=e.apply(t,n);function l(e){j(i,r,s,l,o,"next",e)}function o(e){j(i,r,s,l,o,"throw",e)}l(void 0)}))});return function(e,n){return t.apply(this,arguments)}}(),N=function(e){var t,n=e.genresWithCount,r=e.countries,s=e.filters,l=e.setFilters,a=(0,f.useRouter)(),c=(0,o.useState)(!0),u=c[0],x=c[1],v=(0,o.useState)(""),p=v[0],j=v[1],b=(0,h.ZP)(["\n    query GetAutocompleteTitle($title: String!) {\n        autocompleteTitle(input: $title) {\n            _id\n            title\n            poster\n        }\n    }\n",p],y).data;if(null===b||void 0===b?void 0:b.error)return q(b.error);var N=null!==(t=null===b||void 0===b?void 0:b.autocompleteTitle)&&void 0!==t?t:[];return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("header",{children:(0,i.jsxs)("div",{className:"container mx-auto px-6 py-3",children:[(0,i.jsx)("div",{className:"flex items-center justify-between",children:(0,i.jsx)(d.default,{href:"/",children:(0,i.jsx)("div",{className:"w-full text-green-500 text-2xl font-semibold cursor-pointer",children:"MongoFlix"})})}),(0,i.jsxs)("div",{className:"relative mt-6 max-w-lg mx-auto",children:[(0,i.jsx)("span",{className:"absolute inset-y-0 left-0 pl-3 flex items-center",children:(0,i.jsx)(m.W1M,{className:"h-5 w-5"})}),(0,i.jsx)("form",{onSubmit:function(e){e.preventDefault(),x(!1)},children:(0,i.jsx)("input",{className:"w-full border rounded-md pl-10 pr-4 py-2 focus:border-green-500 focus:outline-none focus:shadow-outline",type:"text",placeholder:"Search",onChange:function(e){return t=e.target.value,x(!0),j(t),void l(w({},s,{term:t}));var t},onBlur:function(){return x(!1)},onFocus:function(){return x(!0)},value:p})}),N.length>0&&u&&(0,i.jsx)("ul",{className:"absolute inset-x-0 top-full bg-green-200 border border-green-500 rounded-md z-20",children:N.map((function(e){return(0,i.jsx)("li",{className:"px-4 py-2 hover:bg-green-300 cursor-pointer",onClick:function(){return t=e._id,j(""),void a.push({pathname:"/movies/".concat(t)});var t},children:e.title},e._id)}))})]}),(0,i.jsx)(g,{items:n.map((function(e){return{title:e._id,subtitle:e.count}})),selectedItems:s.genres,setSelectedItems:function(e){l(w({},s,{genres:e}))},placeholder:"Select Genres"}),(0,i.jsx)(g,{items:r.map((function(e){return{title:e,subtitle:null}})),selectedItems:s.countries,setSelectedItems:function(e){l(w({},s,{countries:e}))},placeholder:"Select Countries"})]})})})},k=n(2484),I=function(e){var t=e.movies;return(0,i.jsx)("div",{className:"grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6",children:t.map((function(e){return(0,i.jsx)(k.Z,{movie:e},e._id)}))})};function S(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function P(e,t,n,r,s,i,l){try{var o=e[i](l),a=o.value}catch(error){return void n(error)}o.done?t(a):Promise.resolve(a).then(r,s)}function A(e){return function(){var t=this,n=arguments;return new Promise((function(r,s){var i=e.apply(t,n);function l(e){P(i,r,s,l,o,"next",e)}function o(e){P(i,r,s,l,o,"throw",e)}l(void 0)}))}}function C(e){return function(e){if(Array.isArray(e))return S(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"===typeof e)return S(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return S(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var _=function(){var e=A(s().mark((function e(t,n){var r;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,x.bm)();case 2:return r=e.sent,e.abrupt("return",(0,v.request)(x.wj,t,{sortByInput:"METACRITIC_DESC",queryInput:{poster_exists:!0,genres_in:n.genres.length>0?n.genres:void 0,countries_in:n.countries.length>0?n.countries:void 0},limit:50},r));case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),F=function(){var e=A(s().mark((function e(t,n){var r;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,x.bm)();case 2:return r=e.sent,e.abrupt("return",(0,v.request)(x.wj,t,{filter:n},r));case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),M=function(){var e=A(s().mark((function e(t){var n;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,x.bm)();case 2:return n=e.sent,e.abrupt("return",(0,v.request)(x.wj,t,null,n));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),q=function(e){return console.error(e),(0,i.jsxs)("p",{children:["An error occurred: $",e]})};function Z(){var e,t,n=(0,o.useState)({term:"",genres:[],countries:[]}),r=n[0],s=n[1],d=(0,h.ZP)(["\n    query GetFilteredMovies($filter: FilteredMoviesInput!) {\n        filteredMovies(input: $filter) {\n            _id\n            title\n            poster\n            cast\n            directors\n            plot\n            fullplot\n            year\n            score\n            genres\n            countries\n            highlights {\n                path\n                score\n                texts {\n                    value\n                    type\n                }\n            }\n        }\n    }\n",r],F).data;if(null===d||void 0===d?void 0:d.error)return q(error);var f,m=null!==(t=null===d||void 0===d?void 0:d.filteredMovies)&&void 0!==t?t:[],x=(0,h.ZP)(["\n    query GetMovies($sortByInput: MovieSortByInput!, $queryInput: MovieQueryInput!, $limit: Int!) {\n        movies(sortBy: $sortByInput, query: $queryInput, limit: $limit) {\n            _id\n            title\n            poster\n            genres\n            countries\n            cast\n            directors\n            plot\n            fullplot\n            year\n        }\n    }\n",r],_).data;if(null===x||void 0===x?void 0:x.error)return q(x.error);var v,p=null!==(f=null===x||void 0===x?void 0:x.movies)&&void 0!==f?f:[],g=(0,h.ZP)(["\n    query GetFacetsGenres {\n        facetsGenres {\n            count\n            facet {\n                genresFacet {\n                    buckets {\n                        _id\n                        count\n                    }\n                }\n            }\n        }\n    }\n"],M).data;if(null===g||void 0===g?void 0:g.error)return q(g.error);var j=null!==(v=null===(e=null===g||void 0===g?void 0:g.facetsGenres[0])||void 0===e?void 0:e.facet.genresFacet.buckets)&&void 0!==v?v:[],b=C(new Set(p.map((function(e){return e.countries})).flat())).sort((function(e,t){return e>t}));return(0,i.jsxs)("div",{className:"flex flex-col items-center justify-center min-h-screen",children:[(0,i.jsxs)(l.default,{children:[(0,i.jsx)("title",{children:"MongoFlix"}),(0,i.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,i.jsxs)("div",{className:"bg-gray-100 w-full min-h-screen",children:[(0,i.jsx)(N,{genresWithCount:j,countries:b,filters:r,setFilters:s}),(0,i.jsxs)(c.Z,{children:[(0,i.jsx)(a.Z,{title:"Movie Search",subtitle:"".concat(m.length>0?m.length:p.length," Movies")}),(0,i.jsx)(I,{movies:m.length>0?m:p})]}),(0,i.jsx)(u.Z,{})]})]})}},3815:function(e,t,n){n.d(t,{wj:function(){return c},bm:function(){return d}});var r=n(4051),s=n.n(r),i=n(9566);function l(e,t,n,r,s,i,l){try{var o=e[i](l),a=o.value}catch(error){return void n(error)}o.done?t(a):Promise.resolve(a).then(r,s)}function o(e){return function(){var t=this,n=arguments;return new Promise((function(r,s){var i=e.apply(t,n);function o(e){l(i,r,s,o,a,"next",e)}function a(e){l(i,r,s,o,a,"throw",e)}o(void 0)}))}}var a=":APP_ID",c="https://".concat("eu-central-1.aws.realm.mongodb.com","/api/client/v2.0/app/").concat(a,"/graphql"),u=new i.gV({id:a,baseUrl:"https://eu-central-1.aws.realm.mongodb.com"}),d=function(){var e=o(s().mark((function e(){var t;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(u.currentUser){e.next=5;break}return e.next=3,u.logIn(i.cN.anonymous());case 3:e.next=7;break;case 5:return e.next=7,u.currentUser.refreshCustomData();case 7:return t=u.currentUser.accessToken,e.abrupt("return",{Authorization:"Bearer ".concat(t)});case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();(function(){var e=o(s().mark((function e(t){var n,r,i,l;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.length){e.next=19;break}return":APP_ID",n=new Realm.App({id:":APP_ID"}),r=Realm.Credentials.anonymous(),e.prev=4,e.next=7,n.logIn(r);case 7:return i=e.sent,e.next=10,i.functions.searchAutoComplete(t);case 10:l=e.sent,setAutoComplete((function(){return l})),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(4),console.error(e.t0);case 17:e.next=20;break;case 19:setAutoComplete([]);case 20:case"end":return e.stop()}}),e,null,[[4,14]])})))})(),function(){var e=o(s().mark((function e(){var t,n,r,i;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return":APP_ID",t=new Realm.App({id:":APP_ID",baseUrl:c}),n=Realm.Credentials.anonymous(),e.prev=3,e.next=6,t.logIn(n);case 6:return r=e.sent,e.next=9,r.functions.getAllMovies();case 9:i=e.sent,setMovie((function(){return i})),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(3),console.error(e.t0);case 16:case"end":return e.stop()}}),e,null,[[3,13]])})))}()}}]);