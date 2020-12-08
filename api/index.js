//                   ____
//                 _.' :  `._
//             .-.'`.  ;   .'`.-.
//    __      / : ___\ ;  /___ ; \      __
//  ,'_ ""--.:__;".-.";: :".-.":__;.--"" _`,
//  :' `.t""--.. '<@.`;_  ',@>` ..--""j.' `;
//       `:-.._J '-.-'L__ `-- ' L_..-;'
//         "-.__ ;  .-"  "-.  : __.-"
//            L ' /.------.\ ' J
//              "-.   "--"   .-"
//             __.l"-:_JL_;-";.__
//          .-j/'.;  ;""""  / .'\"-.
//        .' /:`. "-.:     .-" .';  `.
//     .-"  / ;  "-. "-..-" .-"  :    "-.
//  .+"-.  : :      "-.__.-"      ;-._   \
//  ; \  `.; ;                    : : "+. ;
//  :  ;   ; ;                    : ;  : \:
// : `."-; ;  ;                  :  ;   ,/;
//  ;    -: ;  :                ;  : .-"'  :
//  :\     \  : ;             : \.-"      :
//   ;`.    \  ; :            ;.'_..--  / ;
//   :  "-.  "-:  ;          :/."      .'  :
//     \       .-`.\        /t-""  ":-+.   :
//      `.  .-"    `l    __/ /`. :  ; ; \  ;
//        \   .-" .-"-.-"  .' .'j \  /   ;/
//         \ / .-"   /.     .'.' ;_:'    ;
//          :-""-.`./-.'     /    `.___.'
//                \ `t  ._  /
//                "-.t-._:'
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
require('dotenv').config();
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { PORT } = process.env;

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
	server.listen(PORT, () => {
		console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
	});
});
