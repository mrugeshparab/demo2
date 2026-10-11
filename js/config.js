/* =====================================================================
   EDIT HERE: all personal details live in SITE, SKILLS, EXPERIENCE,
   EDUCATION and PROJECTS. Leave a link as '' to hide it.
   ===================================================================== */
var SITE={
 title:'[Your Name] | Portfolio',
 description:'Portfolio of [Your Name], [Your Role / Title]. Selected projects, skills and experience.',
 name:'[Your Name]',
 role:'[Your Role / Title]',
 about:'[Write 2-3 sentences about who you are, what you build or study, and what you want to work on next. Share only what you are comfortable making public.]',
 email:'your.email@example.com',
 location:'[City, Country]',
 phone:'',                 /* optional, e.g. '+00 000 000 0000' */
 github:'',                /* e.g. 'https://github.com/your-username' */
 linkedin:'',              /* e.g. 'https://www.linkedin.com/in/your-username/' */
 resume:'',                /* e.g. 'assets/resume.pdf' */
 copyrightHolder:'[Your Name]',
 interests:[]            /* optional typing line under the role, e.g. ['Web design','Data','Teaching'] */
};
var SKILLS=['[Skill]','[Skill]','[Skill]','[Skill]','[Skill]','[Skill]'];
var EXPERIENCE=[
 {title:'[Job Title]',org:'[Company / Organization]',dates:'[Month Year] - Present',desc:'[One or two lines on what you did.]'},
 {title:'[Job Title]',org:'[Company / Organization]',dates:'[Month Year] - [Month Year]',desc:'[One or two lines on what you did.]'}
];
var EDUCATION=[
 {title:'[Degree / Program]',org:'[University / College], [City, Country]',dates:'[Start Year] - [End Year]',desc:''}
];
/* PROJECTS = the pages of the sketchbook (and the list under it). Add as many as you like.
   - ONE project: the book shows a single picture and no arrows.
   - TWO OR MORE: the book gets arrows, a page counter and drag-to-turn automatically.
   To add a project:
     1. Make a wide (about 2:1, e.g. 2000x1020) image of it and save it in assets/ as plate-02.webp, plate-03.webp ...
        (tools/make_spread.py can build one from any picture: python tools/make_spread.py my-photo.jpg 02)
     2. Optional smaller phone copy: plate-02-sm.webp (about 900 px wide).
     3. Copy one { ... } block below, paste it after a comma, and change its text and image names.
   img/imgSm = image paths, alt = short description for screen readers, view/code = optional links ('' hides them).
   A missing image shows a labelled placeholder, so you can add the text first and the picture later. */
var PROJECTS=[
 {title:'[Project One]',category:'[Category]',desc:'[Short description: what it does, who it is for, and what you used to build it.]',img:'assets/plate-01.webp',imgSm:'assets/plate-01-sm.webp',alt:'Portrait of a smiling man in a grey t-shirt on a cream sketchbook page',view:'',code:''}
 /* ,{title:'[Project Two]',category:'[Category]',desc:'[Short description]',img:'assets/plate-02.webp',imgSm:'assets/plate-02-sm.webp',alt:'[Describe the image]',view:'',code:''} */
];
