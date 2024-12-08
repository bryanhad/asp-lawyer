export enum Language {
    ID = 'id',
    EN = 'en',
}

export enum EntityType {
    MEMBER = 'MEMBER',
    PRACTICE_AREA = 'PRACTICE_AREA',
    ACHIEVEMENT = 'ACHIEVEMENT',
    BLOG = 'BLOG',
    // USER = 'USER',
}

export enum MemberTranslationKey {
    DEGREE = 'DEGREE',
    POSITION = 'POSITION',
    QUOTE = 'QUOTE',
    BIO = 'BIO',
    EXPERIENCE = 'EXPERIENCE',
    EDUCATION = 'EDUCATION',
    ACHIEVEMENT = 'ACHIEVEMENT',
}

export enum MemberRole {
    PARTNER = 'PARTNER',
    ASSOCIATE = 'ASSOCIATE',
    SUPPORT = 'SUPPORT',
}

export enum PracticeAreaTranslationKey {
    FULL_NAME = 'FULL_NAME',
    SHORT_NAME = 'SHORT_NAME',
    DESC = 'DESC',
    CONTENT = 'CONTENT',
}

export enum AchievementsTranslationKey {
    TITLE = 'TITLE',
    DESC = 'DESC',
}

export enum BlogTranslationKey {
    TITLE = 'TITLE',
    CONTENT = 'CONTENT',
}


/**
 * Perhaps in the future..
 * Cuz I need to actually finish this project fast :)
 */

// export enum UserRole {
//     SUPER_ADMIN = 'SUPER_ADMIN',
//     ADMIN = 'ADMIN',
//     USER = 'USER',
// }

// export enum Permission {
//     MANAGE_ANY = 'MANAGE_ANY', // can update & delete anyone's stuffs
//     MANAGE_OWN = 'MANAGE_OWN', // can update & delete own's stuffs
//     UPDATE = 'UPDATE', // can only update
// }
