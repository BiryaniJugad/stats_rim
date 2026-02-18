using System;

namespace stats_rim.Stats
{
    internal class Secondary
    {
        private Primary _p;

        public Secondary(Primary primary)
        {
            _p = primary;
        }

        // ====== ATK (iRO Classic) ======
        // ATK = STR + floor(STR/10)^2
        public int GetATK()
        {
            int strBonus = (_p.STR / 10) * (_p.STR / 10);
            return _p.STR + strBonus + (_p.DEX / 5) + (_p.LUK / 3);
        }

        // ====== MATK MIN ======
        // Min MATK = INT + floor(INT/7)^2
        public int GetMATKMin()
        {
            int intBonus = (_p.INT / 7) * (_p.INT / 7);
            return _p.INT + intBonus;
        }
        
        // ====== MATK MAX ======
        // Max MATK = INT + floor(INT/5)^2
        public int GetMATKMax()
        {
            int intBonus = (_p.INT / 5) * (_p.INT / 5);
            return _p.INT + intBonus;
        }


        // ====== HIT ======
        // HIT = 175 + DEX + floor(LUK/3)
        public int GetHIT()
        {
            return 175 + _p.DEX + (_p.LUK / 3);
        }

        // ====== FLEE ======
        // FLEE = 100 + AGI + floor(LUK/5)
        public int GetFLEE()
        {
            return 100 + _p.AGI + (_p.LUK / 5);
        }

        // ====== CRIT ======
        // CRIT = floor(LUK * 0.3) + 1
        public int GetCRIT()
        {
            return (int)(_p.LUK * 0.3) + 1;
        }

        // ====== DEF (Soft DEF only) ======
        // DEF = floor(VIT/2)
        public int GetDEF()
        {
            return _p.VIT / 2;
        }

        // ====== MDEF (Soft MDEF) ======
        // MDEF = floor(INT/2) + floor(VIT/5)
        public int GetMDEF()
        {
            return (_p.INT / 2) + (_p.VIT / 5);
        }

        // ====== ASPD (kept your existing approximation since file has no formula section captured) ======
        public double GetASPD()
        {
            double weaponDelay = 150;
            double reduction = (200 - _p.AGI - (_p.DEX / 4.0));
            double aspd = 200 - (weaponDelay * reduction / 100);

            if (aspd > 190) aspd = 190;
            if (aspd < 150) aspd = 150;

            return Math.Round(aspd, 2);
        }
    }
}
