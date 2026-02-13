using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace stats_rim.Stats
{
    internal class Primary
    {
        public int STR { get; set; }
        public int AGI { get; set; }
        public int VIT { get; set; }
        public int INT { get; set; }
        public int DEX { get; set; }
        public int LUK { get; set; }
        //public int BaseLevel { get; set; }

        public Primary(int str, int agi, int vit, int intel, int dex, int luk)
        {
            STR = str;
            AGI = agi;
            VIT = vit;
            INT = intel;
            DEX = dex;
            LUK = luk;
            //BaseLevel = baseLevel;
        }
    }
}
