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
