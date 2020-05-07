import tetris from './commodore/tetris/tetris.js'
import kernalV2 from './commodore/text-process.js'
import { overflowX } from './commodore/DOM-mutators.js'

const presentation = "LD=1500^$meta/Hi there! I'm a junior programmer, looking to be part in nice projects.\n" +
    "The options menu has a switch language, espa\u00f1ol is available.\n" +
    "If you are from RRHH, hope you like my portfolio and maybe we can meet-up and chit-chat.\n" +
    `If you are a programmer, this prompt is a simulation of a commodore 64 prompt,` +
    ` i included some commentary files (load"$",8) about this project, or check my repository` +
    ` any feedback would be appreciated.\n` +
    "I started learning over December past year, more or less at the same time i did open mi GitHub account.\n" +
    "I hope you like my work, i did enjoy writing it a lot."

const presentationESP = "LD=1500^$meta/ Buenas! soy un programador junior en buscando formar parte de proyectos interesantes.\n" +
    "Si usted es una persona de recursos humanos ojala que le guste mi trabajo y podamos hablar un poco más.\n" +
    `Si usted es un programador, incluí algunos archivos adicionales (load"$",8) ` +
    `comentando este mismo código, también está el repositorio.\n` +
    "Empece a programar en diciembre del a\u00f1o pasado, más o menos al mismo tiempo que abrí mi cuenta en GitHub.\n" +
    "Ojala que les guste mi trabajo, disfrute mucho escribiéndolo."

const aboutCommodore = "CP=3LD=1500^$meta/A Commodore 64 was my first computer, it seems like.. ages.. ago.\n" +
    "I remember my little me as a tree year old kid feeling no other than perplexity about the 'Magic Box'.\n" +
    "A TV that can follow your orders.\n"
    + " Maybe I did choose this project to show code, because to me, " +
    "this perspective of wonder how: I want to know, is as important as it was 30 years ago.\n" +
    "This project is a JavaScript mimic of the commodore 64 user interface as I remember.\n" +
    "If you never had contact with one of these beauties you can check up the online emulator" +
    'https://virtualconsoles.com/online-emulators/c64/.\n' +
    "But to clarify, I do not remember the legend as content-editable as it is in the emulator!\n" +
    " I included some archives commenting some functions of this code," +
    " basically it simulates the command prompt, its color functions, and the math command PRINT."

const sobreCommodoreESP = "CP=3LD=1500^$meta/La Commodore 64 fue mi primera computadora, parece como si hubiera sido en otra era de la humanidad.\n" +
    "Me recuerdo a mi mismo siendo un nene de no mucho más de tresa\u00f1os y sintiendo no menos que absoluta perplejidad " +
    "frente a 'la caja mágica'.\n" +
    "Una televisión que puede seguir tus ordenes..\n" +
    "Y probablemente la pregunta de como puede esto ser posible llego incluso antes de poder hacer la pregunta apropiadamente.\n" +
    "Quizás elegí este proyecto para mostrar mi código porque esta perspectiva de interés en conocer es tan importante para mí " +
    "ahora como lo era en aquel momento.\n" +
    "Este proyecto es una mímica en JavaScript del interface de usuario de la Commodore 64 tal y como la recuerdo.\n" +
    "Si usted nunca tuvo contacto con una de estas bellezas puede chequear el emulador online" +
    "https://virtualconsoles.com/online-emulators/c64/'.\n" +
    "Para aclarar, no recuerdo que la leyenda sea contenido-editable como lo es en el emulador! " +
    "Incluí algunos archivos más comentando específicamente de las funciones de este código" +
    "básicamente simula el prompt de comandos, las funciones de cambios de color, y PRINT, un comando imprimir cálculos matemáticos."

const P64MathFunction = "CP=3LD=1500^$meta/This function is heavy in regEx, you prompt `PRINT *something*` and it applies math if appropriate," +
    " this is difficult thing and I don't know if my regEx covers all possible inputs " +
    "and probably I will not know for a long time.\n" +
    "Maybe you wonder why I decided to resolve part of the validation inside a function that it suppose to do math...\n" +
    "The original PRINT c64 function accepted character values as valid entries, returning 0 in that case.\n" +
    "After playing with the emulator, I understood that PRINT is not a math function as I supposed long ago " +
    "PRINT accepts characters because in reality is a programming function in BASIC V2 (the commodore SO).\n" +
    "If the characters returns 0 is because they are been treated as undefined variables.\n" +
    "I won't try to cover a programming application in a mimic, I will be satisfied if I can cover the math functions.\n" +
    "Spaces are completely ignored, and they succeed the function printing nothing.\n" +
    "Something like 'PRINT 2+2 2+4', is joined like 2+22+2.\n" +
    "Entries like PRINTASDF, are also valid.\n" +
    "I see what I can write with this."

const P64MathFunctionESP = "CP=3DE=30LD=1100^$metaEsta función es muy severa en el uso de regEx, probablemente más de lo que mi experiencia está preparada " +
    "para manejar. La función hace lo siguiente: promptea PRINT *algo*, cualquier cosa, y devuelve operaciones matemáticas" +
    "si la expresión es aplicable.\n" +
    "Esto no es fácil de hacer, quizá se me escapo algo, no lo se.\n" +
    "Quizás usted se pregunte porque incluí parte de la validación dentro de la función matemática en sí" +
    " y es que el comando PRINT original aceptaba cualquier caracter como valido devolviendo 0 si no había algo matemático.\n" +
    "Después de jugar un rato con el emulador, entendí que en realidad PRINT no es una función matemática como lo creí hace tanto" +
    " tiempo es una función de programación en BASIC V2 -el SO de Commodore- y si un caracter devuelve 0 es porque es interpretado" +
    " como una variable indefinida. Por supuesto no voy a tratar de cubrir los aspectos de programación en una mímica, me doy " +
    "por satisfecho con las funciones matemáticas.\n" +
    "Los espacios son ignorados completamente y no hacen diferencia alguna.\n" +
    " Algo como 'PRINT 2+2 2+4', se junta como 2+22+2.\n" +
    "Voy a ver que puedo escribir con esto."

const P64pokeFunction = "CP=6LDE=30LD=1100^$meta/This function is named as a mock-up of the original POKE C64 command for display color changes.\n" +
    "It changes the cursor color and text color by pressing CONTROL + 1 to 8.\n" +
    "CONTROL + 9 || 0 is a switch, it changes the background color of the next character, just like the original.\n" +
    "Its like the 'Paint' of the original Commodore.\n"

const P64pokeFunctionESP = "CP=5DE=30LD=1100^$meta/Llame a esta función como una referencia al comando original POKE" +
    " que era para cambios de color a nivel IO.\n" +
    "Esta función toma el comando CTRL + 1 al 8 y cambia el color de letra y cursor según el número.\n" +
    "CTRL 9 y 0 es un switch, cambia el color del fondo para los siguientes caracteres.\n" +
    "Era como el 'Paint' de la época."

const p64kernal = "CP=7DE=30LD=1000^$meta/The function Kernal in my code is a reference of the original name of basic IO system of the commodore.\n" +
    "Legend says that the commodore 'Kernal' was meant to be more appropriately named.\n" +
    "His real name, was 'Kernel'.\n" +
    "Like the Linux core, but some big shot programmer misspelled the name in some repository " +
    "and since nobody dared to contradict him, the history annals the commodore Kernel " +
    "as a stand for KERNAL: Keyboard Entry Read, Network, And Link.\n" +
    "Its just like my function, probably could have been more appropriately named... like...\n" +
    "handleTextPrint(), as it prints text as specified.\n" +
    "The choice of passing this function strings as styling parameters its just fantasy coding, " +
    "and i hope to be seen just as creative gesture.\n" +
    "Of course, I know how to do it in a more standard channel, like passing a prop object."

const p64kernalESP = "CP=7DE=30LD=1000^$meta/La función Kernal en mi código fue nombrada como una referencia al nombre del BIOS original de la Commodore.\n" +
    "Se rumorea por ahí que el nombre 'Kernal' iba a llevar un nombre mas apropiado.\n" +
    "Su nombre real era Kernel, como el core de Linux, pero alguno de los programadores tuvo un typo en algún manual y así quedo.\n" +
    "Así pues, teóricamente Kernal es sigla de Keyboard Entry Read, Network, And Link.\n" +
    " Justo como mi función, que también pudo haber sido más apropiadamente denominada, probablemente debería llamarse imprimirTexto(), " +
    "dado que su función es imprimir texto en la pantalla según especificado.\n" +
    "La opción de pasarle parámetros de estilo a esta función como strings es 'código de fantasía', un gesto creativo, " +
    "pero también puedo hacerlo como se haría normalmente: pasando parámetros la función."


const javascript = "CP=8LD=1500^$meta/GitHub I have code samples of many things " +
    "API calls (also j query Ajax calls), DOM manipulation, promises, loops, methods.\n" +
    "You can check up for this code in GitHub, it's my most complex project to date, is all vanilla JavaScript.\n" +
    "The vast majority of my repos are JavaScript related."

const javascriptESP = "CP=8LD=1500^$meta/En mi GitHub tengo samples de código diversos.\n" +
    "Llamadas a Apis de Fetch y Ajax, manipulación DOM, promesas, métodos, loops.\n" +
    "el código de esta pagina esta en GitHub, es mi proyecto mas complejo a la fecha, y es todo vainilla JavaScript.\n" +
    "La mayoría de mis repositorios están relacionados con JavaScript."

const CSS = "CP=5LD=1500^$meta/This project has been made with the SASS precompiler.\n" +
    "Talking about normal CSS I poured the best of my CSS in this page, I use here any modern positioning.\n" +
    "Probably a lot to learn about CSS, but since I started learning in December I'm proud."

const CSSESP = "CP=5LD=1500^$meta/Este proyecto fue hecho con el precompilador de SAAS.\n" +
    "Hablando de CSS normal lo mejor de lo que sé en CSS esta en esta página.\n" +
    "Hay algunos repos en mi GitHub que son exclusivamente CSS con sus respectivas maquetas.\n"
"Hay mucho por aprender de CSS, pero pienso que logre mucho en poco tiempo, y estoy contento con eso.\n"

const React = "CP=4LD=1500^$meta/I have a boot-camp repository with a few basic components, some of them with state hooks.\n" +
    "I can set up the environment and do basic stuff.\n" +
    "Well, overall 'I got the big picture' of what is React about, either with classes or not. " +
    "It just requires a some more time of study, including Redux, time that i eager to get into, after I finish this project.\n"

const ReactESP = "CP=4LD=1500^$meta/Tengo un repositorio con algunos componentes básicos, algunos con state hooks.\n" +
    "Puedo setear el entorno y hacer cosas basicas\n" +
    "Necesitaría algunas semanas de estudio (incluyendo Redux) y voy a estar aceptable con React."

const Figma = "CP=5LD=1500^$meta/Figma is my dearly supporter for design necessities.\n" +
    "As a programmer you suppose not be in need of design.\n" +
    "I'm strong in the belief that if you are programmer that intents to work in user interface you should be, " +
    "at least at some extent, over this matter.\n" +
    "I tried to cover the best I could this necessity. " + "Figma is my choice for a vector design program. " +
    "How good I am at this?\n ...well ...I don't know really...\n But maybe can get a picture...\n" +
    "...except tech, fonts, and GitHub logos I made all the assets, of this portfolio."

const FigmaESP = "CP=5LD=1500^$meta/Figma es mi escudero para necesidades de dise\u00f1o.\n" +
    "Como programador, teóricamente no debería ser necesario saber dise\u00f1ar.\n" +
    "Pero soy un convencido que ser un programador que busca un lugar en interfaces de usuario debería" +
    " tener al menos una base como soporte en la materia.\n" +
    "Trate de cubrir lo mejor que pude este aspecto.\n" +
    "Figma es mi editor de elección para vectores por ser fácil de usar...\n" +
    "¿Qué tan bueno soy en esto?\n" +
    "Bueno ...no sé  ...pero quizás puedas hacerte una idea...\n" +
    "Excepto los logos de techs, GitHub, y las fonts, todos los assets de este portafolios los hice con figma."

export const index = {
    hello: presentation,
    sass: CSS,
    react: React,
    figma: Figma,
    commodore: aboutCommodore,
    mathfunction: P64MathFunction,
    pokefunction: P64pokeFunction,
    javascript: javascript,
    kernal: p64kernal,
    $: $,
    tetris: tetris,
}
export const indexSpanish = {
    hello: presentationESP,
    sass: CSSESP,
    react: ReactESP,
    figma: FigmaESP,
    commodore: sobreCommodoreESP,
    mathfunction: P64MathFunctionESP,
    pokefunction: P64pokeFunctionESP,
    javascript: javascriptESP,
    kernal: p64kernalESP,
    $: $,
    tetris: tetris,
}

async function $() {
    let actualIndex = indexConstructor()
    const meta = "DE=15&NN=1CP=7BI=1^$meta/"
    await kernalV2(meta + actualIndex)
    function indexConstructor() {
        let indexShowcase = fillBlank("\n 0 JULIAN FLOPPY DISK", '')
        Object.entries(index).forEach(entrie => {
            if (entrie[0] !== '$') {
                let BLOCKS = String(Math.floor(Math.random() * 100))
                BLOCKS[1] ? BLOCKS += "" : BLOCKS += " "
                indexShowcase += fillBlank(BLOCKS + "  " + entrie[0].toUpperCase())
            }
        })
        function fillBlank(string, closure = "PRG") {
            const SAFE = "       "
            let blank = new String
            while (!overflowX(string + blank + closure + SAFE)) {
                blank += " "
            }
            return string + blank + closure + '\n'
        }
        indexShowcase += "32234 BLOCKS FREE."
        return indexShowcase
    }
}
