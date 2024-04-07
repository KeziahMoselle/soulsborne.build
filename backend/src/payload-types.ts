/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    users: User;
    archetypes: Archetype;
    restrictions: Restriction;
    'er-affinities': ErAffinity;
    'er-ammunitions': ErAmmunition;
    'er-armors': ErArmor;
    'er-ashes-of-war': ErAshesOfWar;
    'er-builds': ErBuild;
    'er-classes': ErClass;
    'er-incantations': ErIncantation;
    'er-incantation-types': ErIncantationType;
    'er-shields': ErShield;
    'er-skills': ErSkill;
    'er-sorceries': ErSorcery;
    'er-sorcery-types': ErSorceryType;
    'er-statistics': ErStatistic;
    'er-status-effects': ErStatusEffect;
    'er-talismans': ErTalisman;
    'er-weapon-types': ErWeaponType;
    'er-weapons': ErWeapon;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {};
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  name: string;
  roles: ('admin' | 'editor' | 'user')[];
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "archetypes".
 */
export interface Archetype {
  id: number;
  name?: string | null;
  description?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "restrictions".
 */
export interface Restriction {
  id: number;
  name?: string | null;
  description?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "er-affinities".
 */
export interface ErAffinity {
  id: number;
  name?: string | null;
  description?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  type?: ('Physical' | 'Magic' | 'Flame' | 'Golden' | 'Occult') | null;
  affected_statistics?: (number | ErStatistic)[] | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "er-statistics".
 */
export interface ErStatistic {
  id: number;
  name?: string | null;
  description?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  softcaps?:
    | {
        level?: number | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "er-ammunitions".
 */
export interface ErAmmunition {
  id: number;
  ammunition_type?: ('Bolt' | 'Greatbolt') | null;
  name?: string | null;
  description?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  attack?: {
    physical?: number | null;
    magic?: number | null;
    fire?: number | null;
    lightning?: number | null;
    holy?: number | null;
    critical?: number | null;
  };
  passives?: (number | null) | ErStatusEffect;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "er-status-effects".
 */
export interface ErStatusEffect {
  id: number;
  name?: string | null;
  description?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  effect?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "er-armors".
 */
export interface ErArmor {
  id: number;
  armor_type?: ('Helm' | 'Chest' | 'Gauntlet' | 'Leg') | null;
  name?: string | null;
  description?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  weight?: number | null;
  damage_negation?: {
    physical?: number | null;
    vs_strike?: number | null;
    vs_slash?: number | null;
    vs_pierce?: number | null;
    magic?: number | null;
    fire?: number | null;
    lightning?: number | null;
    holy?: number | null;
  };
  resistance?: {
    immunity?: number | null;
    robustness?: number | null;
    focus?: number | null;
    vitality?: number | null;
    poise?: number | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "er-ashes-of-war".
 */
export interface ErAshesOfWar {
  id: number;
  name?: string | null;
  skill?: (number | null) | ErSkill;
  description?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  location?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  availability?: (number | ErWeaponType)[] | null;
  affinity?: (number | null) | ErAffinity;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "er-skills".
 */
export interface ErSkill {
  id: number;
  name?: string | null;
  fp_cost?: number | null;
  description?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  location?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "er-weapon-types".
 */
export interface ErWeaponType {
  id: number;
  name?: string | null;
  description?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "er-builds".
 */
export interface ErBuild {
  id: number;
  name?: string | null;
  description?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  youtube_url?: string | null;
  restrictions?: (number | Restriction)[] | null;
  archetype?: (number | Archetype)[] | null;
  is_two_handed?: boolean | null;
  mainhand_weapons?:
    | {
        weapon?: (number | null) | ErWeapon;
        ash_of_war?: (number | null) | ErAshesOfWar;
        affinity?: (number | null) | ErAffinity;
        id?: string | null;
      }[]
    | null;
  offhand_weapons?:
    | {
        weapon?:
          | ({
              relationTo: 'er-weapons';
              value: number | ErWeapon;
            } | null)
          | ({
              relationTo: 'er-shields';
              value: number | ErShield;
            } | null);
        ash_of_war?: (number | null) | ErAshesOfWar;
        affinity?: (number | null) | ErAffinity;
        id?: string | null;
      }[]
    | null;
  arrows?: (number | ErAmmunition)[] | null;
  bolts?: (number | ErAmmunition)[] | null;
  armors?: (number | ErArmor)[] | null;
  talismans?: (number | ErTalisman)[] | null;
  starting_class?: (number | null) | ErClass;
  statistics?:
    | {
        stat?: (number | null) | ErStatistic;
        value?: number | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "er-weapons".
 */
export interface ErWeapon {
  id: number;
  weapon_type?: (number | null) | ErWeaponType;
  skill?: (number | null) | ErSkill;
  name?: string | null;
  description?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  weight?: number | null;
  attack?: {
    physical?: number | null;
    magic?: number | null;
    fire?: number | null;
    lightning?: number | null;
    holy?: number | null;
    critical?: number | null;
  };
  defense?: {
    physical?: number | null;
    magic?: number | null;
    fire?: number | null;
    lightning?: number | null;
    holy?: number | null;
    boost?: number | null;
  };
  scaling?:
    | {
        statistic: number | ErStatistic;
        letter: 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'TODO';
        id?: string | null;
      }[]
    | null;
  requirements?:
    | {
        statistic: number | ErStatistic;
        value: number;
        id?: string | null;
      }[]
    | null;
  passives?: (number | null) | ErStatusEffect;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "er-shields".
 */
export interface ErShield {
  id: number;
  shield_type?: ('Small Shield' | 'Medium Shield' | 'Greatshield') | null;
  skill?: (number | null) | ErSkill;
  name?: string | null;
  description?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  weight?: number | null;
  attack?: {
    physical?: number | null;
    magic?: number | null;
    fire?: number | null;
    lightning?: number | null;
    holy?: number | null;
    critical?: number | null;
  };
  defense?: {
    physical?: number | null;
    magic?: number | null;
    fire?: number | null;
    lightning?: number | null;
    holy?: number | null;
    boost?: number | null;
  };
  scaling?:
    | {
        statistic: number | ErStatistic;
        letter: 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'TODO';
        id?: string | null;
      }[]
    | null;
  requirements?:
    | {
        statistic: number | ErStatistic;
        value: number;
        id?: string | null;
      }[]
    | null;
  passives?: (number | null) | ErStatusEffect;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "er-talismans".
 */
export interface ErTalisman {
  id: number;
  weight?: number | null;
  name?: string | null;
  description?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  effect?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "er-classes".
 */
export interface ErClass {
  id: number;
  name?: string | null;
  rune_level?: number | null;
  weapons?: (number | ErWeapon)[] | null;
  shields?: (number | ErShield)[] | null;
  statistics?:
    | {
        stat?: (number | null) | ErStatistic;
        value?: number | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "er-incantations".
 */
export interface ErIncantation {
  id: number;
  name?: string | null;
  description?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  effect?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  incantation_type?: (number | null) | ErIncantationType;
  slots?: number | null;
  cost?: number | null;
  requirements?:
    | {
        statistic: number | ErStatistic;
        value: number;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "er-incantation-types".
 */
export interface ErIncantationType {
  id: number;
  name?: string | null;
  description?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "er-sorceries".
 */
export interface ErSorcery {
  id: number;
  name?: string | null;
  description?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  effect?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  sorcery_type?: (number | null) | ErSorceryType;
  slots?: number | null;
  cost?: number | null;
  requirements?:
    | {
        statistic: number | ErStatistic;
        value: number;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "er-sorcery-types".
 */
export interface ErSorceryType {
  id: number;
  name?: string | null;
  description?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}