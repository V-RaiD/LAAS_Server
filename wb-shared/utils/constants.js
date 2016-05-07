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

const MEMBER = 'member';
const ADMIN = 'admin';
exports.MEMBER = MEMBER;
exports.ADMIN = ADMIN;
exports.MEMTYPE = [MEMBER, ADMIN];

const CTMALE = 0;   //Cloth Type Male
const CTFEMALE = 1; //Cloth Type FEMALE
const CTKIDB = 2;   //Cloth Type Kid Boy
const CTKIDG = 3;   //Cloth Type Kid Girl
exports.CTMALE = CTMALE;
exports.CTFEMALE = CTFEMALE;
exports.CTKIDB = CTKIDB;
exports.CTKIDG = CTKIDG;
exports.CLOTHTYPE = [CTMALE, CTFEMALE, CTKIDB, CTKIDG];
