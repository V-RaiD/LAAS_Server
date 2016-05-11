const MALE = 'M';
const FEMALE = 'F';
exports.MALE = MALE;
exports.FEMALE = FEMALE;
exports.GENDERS = [MALE, FEMALE];

const EUSER = 0;        //end user - the main target client
const SUSER = 1;        //service agent
const PDUSER = 2;       //Pick and Drop agent
const AUSER = 3;        //Admin user
exports.EUSER = EUSER;
exports.SUSER = SUSER;
exports.PDUSER = PDUSER;
exports.AUSER = AUSER;
exports.UTYPE = [EUSER, SUSER, PDUSER, AUSER];

const CTMALE = 0;   //Cloth Type Male
const CTFEMALE = 1; //Cloth Type FEMALE
const CTKIDB = 2;   //Cloth Type Kid Boy
const CTKIDG = 3;   //Cloth Type Kid Girl
exports.CTMALE = CTMALE;
exports.CTFEMALE = CTFEMALE;
exports.CTKIDB = CTKIDB;
exports.CTKIDG = CTKIDG;
exports.CLOTHTYPE = [CTMALE, CTFEMALE, CTKIDB, CTKIDG];

const WASH = 0;   //typeOfService
const IRON = 1;
const WASHIRON = 2;
const DRYCLEAN = 3;
exports.WASH = WASH;
exports.IRON = IRON;
exports.WASHIRON = WASHIRON;
exports.DRYCLEAN = DRYCLEAN;
exports.TOS = [WASH, IRON, WASHIRON, DRYCLEAN];

const CLASSICW = 0;
const SUPERW = 1;
const ULTRAW = 2;
exports.CLASSICW = CLASSICW;
exports.SUPERW = SUPERW;
exports.ULTRAW = ULTRAW;
exports.TOW = [CLASSICW, SUPERW, ULTRAW];

const SELECTO = 0;
const COMMONO = 1;
const BULKO = 2;
exports.SELECTO = SELECTO;
exports.COMMONO = COMMONO;
exports.BULKO = BULKO;
exports.OTYPE = [SELECTO, COMMONO, BULKO];

const OBUCKET = 0;    //Order in bucket
const OPLACED = 1;    //order placed
const OWITHPD = 2;    //order given to pick and drop agent
const OWITHS = 3;     //order given to service agent
const OPROCESSS = 4;  //order under process at service agent
const OTOENDS = 5;     //order is about to finish at service agent
const OPACKS = 6;      //order packed at service agent
const ODELVPD = 7;      //order out for delivery with pick and drop agent
const ORECEVU = 8;      //order recieved by User
const OPAYD = 9;        //order payment done
const OPARTOD = 10;      //partial order done
exports.OBUCKET = OBUCKET;
exports.OPLACED = OPLACED;
exports.OWITHPD = OWITHPD;
exports.OWITHS = OWITHS;
exports.OPROCESSS = OPROCESSS;
exports.OTOENDS = OTOENDS;
exports.OPACKS = OPACKS;
exports.ODELVPD = ODELVPD;
exports.ORECEVU = ORECEVU;
exports.OPAYD = OPAYD;
exports.OPARTOD = OPARTOD;
exports.OSTATUS = [OBUCKET, OPLACED, OWITHPD, OWITHS, OPROCESSS, OTOENDS, OPACKS, ODELVPD, ORECEVU, OPAYD, OPARTOD];
