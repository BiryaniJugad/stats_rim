using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace stats_rim.Stats
{
    internal class Secondary
    {
        private Primary _p;

        public Secondary(Primary primary)
        {
            _p = primary;
        }

        // ====== ATK (Pre-Renewal) ======
        // StatusATK = STR + floor(STR/10)^2 + floor(DEX/5) + floor(LUK/3)
        public int GetATK()
        {
            int strBonus = (_p.STR / 10) * (_p.STR / 10);
            return _p.STR + strBonus + (_p.DEX / 5) + (_p.LUK / 3);
        }

        // ====== MATK (Pre-Renewal) ======
        // MATK = INT + floor(INT/7)^2 + floor(DEX/5)
        public int GetMATK()
        {
            int intBonus = (_p.INT / 7) * (_p.INT / 7);
            return _p.INT + intBonus + (_p.DEX / 5);
        }

        // ====== HIT ======
        // HIT = 175 + BaseLevel + DEX + floor(LUK/3)
        public int GetHIT()
        {
            return 175 + _p.BaseLevel + _p.DEX + (_p.LUK / 3);
        }

        // ====== FLEE ======
        // FLEE = 100 + BaseLevel + AGI + floor(LUK/5)
        public int GetFLEE()
        {
            return 100 + _p.BaseLevel + _p.AGI + (_p.LUK / 5);
        }

        // ====== CRIT ======
        // CRIT = floor(LUK/3)
        public int GetCRIT()
        {
            return _p.LUK / 3;
        }

        // ====== DEF (Soft DEF only) ======
        // SoftDEF = floor(VIT/2)
        public int GetDEF()
        {
            return _p.VIT / 2;
        }

        // ====== MDEF (Soft MDEF) ======
        // SoftMDEF = floor(INT/2) + floor(VIT/5)
        public int GetMDEF()
        {
            return (_p.INT / 2) + (_p.VIT / 5);
        }

        // ====== ASPD (Pre-Renewal Approximation with Breakpoints) ======
        // ASPD = 200 - (WeaponDelay × (200 - AGI - floor(DEX/4)) / 100)
        // Here using assumed weapon delay of 150 (example)
        public double GetASPD()
        {
            double weaponDelay = 150; // Example for sword-type weapon
            double reduction = (200 - _p.AGI - (_p.DEX / 4.0));
            double aspd = 200 - (weaponDelay * reduction / 100);

            if (aspd > 190) aspd = 190; // Pre-renewal cap
            if (aspd < 150) aspd = 150; // Minimum baseline

            return Math.Round(aspd, 2);
        }
    }

}
