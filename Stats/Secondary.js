// Secondary.js
import { Primary } from './Primary.js';

export class Secondary
{
    constructor(primary)
    {
        /** @type {Primary} */
        this._p = primary;
    }

    // ===== ATK =====
    getATK()
    {
        const strBonus = Math.floor(this._p.STR / 10) * *2;
        return this._p.STR + strBonus + Math.floor(this._p.DEX / 5) + Math.floor(this._p.LUK / 3);
    }

    // ===== MATK MIN =====
    getMATKMin()
    {
        const intBonus = Math.floor(this._p.INT / 7) * *2;
        return this._p.INT + intBonus;
    }

    // ===== MATK MAX =====
    getMATKMax()
    {
        const intBonus = Math.floor(this._p.INT / 5) * *2;
        return this._p.INT + intBonus;
    }

    // ===== HIT =====
    getHIT()
    {
        return 175 + this._p.DEX + Math.floor(this._p.LUK / 3);
    }

    // ===== FLEE =====
    getFLEE()
    {
        return 100 + this._p.AGI + Math.floor(this._p.LUK / 5);
    }

    // ===== CRIT =====
    getCRIT()
    {
        return Math.floor(this._p.LUK * 0.3) + 1;
    }

    // ===== DEF =====
    getDEF()
    {
        return Math.floor(this._p.VIT / 2);
    }

    // ===== MDEF =====
    getMDEF()
    {
        return Math.floor(this._p.INT / 2) + Math.floor(this._p.VIT / 5);
    }

    // ===== ASPD =====
    getASPD()
    {
        const weaponDelay = 150;
        const reduction = 200 - this._p.AGI - (this._p.DEX / 4);
        let aspd = 200 - (weaponDelay * reduction / 100);

        if (aspd > 190) aspd = 190;
        if (aspd < 150) aspd = 150;

        return Math.round(aspd * 100) / 100;
    }
}
