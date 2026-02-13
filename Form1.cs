using stats_rim.Stats;

namespace stats_rim
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            WireEvents();
        }
        private void WireEvents()
        {
            num_Str.ValueChanged += Recalculate;
            num_Agi.ValueChanged += Recalculate;
            num_Vit.ValueChanged += Recalculate;
            num_Int.ValueChanged += Recalculate;
            num_Dex.ValueChanged += Recalculate;
            num_Luk.ValueChanged += Recalculate;
            //num_BaseLevel.ValueChanged += Recalculate;
        }

        private void Recalculate(object sender, EventArgs e)
        {
            int str = (int)num_Str.Value;
            int agi = (int)num_Agi.Value;
            int vit = (int)num_Vit.Value;
            int intel = (int)num_Int.Value;
            int dex = (int)num_Dex.Value;
            int luk = (int)num_Luk.Value;
            //int baseLevel = (int)num_BaseLevel.Value;

            Primary primary = new Primary(str, agi, vit, intel, dex, luk);
            Secondary secondary = new Secondary(primary);

            // ===== ATK =====
            txt_StatAtk.Text = secondary.GetATK().ToString();
            txt_StatAtk2.Text = secondary.GetATK().ToString();

            // ===== MATK =====
            txt_StatMatk.Text = secondary.GetMATK().ToString();
            txt_StatMatk2.Text = secondary.GetMATK().ToString();

            // ===== DEF =====
            txt_StatDef.Text = secondary.GetDEF().ToString();
            txt_StatDef2.Text = secondary.GetDEF().ToString();

            // ===== MDEF =====
            txt_StatMDef.Text = secondary.GetMDEF().ToString();
            txt_StatMDef2.Text = secondary.GetMDEF().ToString();

            // ===== HIT =====
            txt_StatHit.Text = secondary.GetHIT().ToString();

            // ===== FLEE =====
            txt_StatFlee.Text = secondary.GetFLEE().ToString();
            txt_StatFlee2.Text = secondary.GetFLEE().ToString();

            // ===== CRIT =====
            txt_StatCrit.Text = secondary.GetCRIT().ToString();

            // ===== ASPD =====
            txt_StatAspd.Text = secondary.GetASPD().ToString("0.00");
        }
    }
}
