using ReaLTaiizor.Controls;

namespace stats_rim
{
   partial class Form1
    {
   
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        private void InitializeComponent()
        {
            lbl_Str = new Label();
            lbl_Agi = new Label();
            lbl_Vit = new Label();
            lbl_Int = new Label();
            lbl_Dex = new Label();
            lbl_Luk = new Label();
            lbl_Stats = new Label();
            lbl_JobBonus = new Label();
            pnl_Stats = new System.Windows.Forms.Panel();
            txt_ResStr = new TextBox();
            txt_ResAgi = new TextBox();
            txt_StatGuild = new TextBox();
            txt_StatPoint = new TextBox();
            txt_StatFlee2 = new TextBox();
            lbl_11 = new Label();
            txt_StatFlee = new TextBox();
            txt_StatAspd = new TextBox();
            txt_StatMDef2 = new TextBox();
            txt_StatDef2 = new TextBox();
            lbl_10 = new Label();
            lbl_9 = new Label();
            lbl_Guild = new Label();
            txt_StatMDef = new TextBox();
            txt_StatDef = new TextBox();
            lbl_Aspd = new Label();
            txt_Flee = new Label();
            lbl_Mdef = new Label();
            lbl_Def = new Label();
            txt_StatCrit = new TextBox();
            txt_StatHit = new TextBox();
            num_Luk = new NumericUpDown();
            num_Dex = new NumericUpDown();
            num_Int = new NumericUpDown();
            num_Vit = new NumericUpDown();
            num_Agi = new NumericUpDown();
            num_Str = new NumericUpDown();
            txt_StatMatk2 = new TextBox();
            txt_StatAtk2 = new TextBox();
            lbl_4 = new Label();
            lbl_3 = new Label();
            lbl_8 = new Label();
            lbl_7 = new Label();
            txt_StatMatk = new TextBox();
            txt_StatAtk = new TextBox();
            lbl_StatP = new Label();
            lbl_Crit = new Label();
            lbl_Matk = new Label();
            lbl_Hit = new Label();
            lbl_Atk = new Label();
            lbl_StatInfo = new Label();
            txt_PtsDex = new TextBox();
            txt_PtsInt = new TextBox();
            txt_PtsLuk = new TextBox();
            txt_PtsVit = new TextBox();
            txt_PtsAgi = new TextBox();
            txt_PtsStr = new TextBox();
            lbl_PtsReq = new Label();
            txt_ResLuk = new TextBox();
            txt_ResDex = new TextBox();
            txt_ResInt = new TextBox();
            txt_ResVit = new TextBox();
            lbl_5 = new Label();
            lbl_6 = new Label();
            lbl_2 = new Label();
            lbl_1 = new Label();
            pnl_Buffs = new System.Windows.Forms.Panel();
            lbl_Buffs = new Label();
            lbl_Blessings = new Label();
            lbl_Increase = new Label();
            lbl_Angelus = new Label();
            lbl_Impo = new Label();
            lbl_Wind = new Label();
            lbl_Gloria = new Label();
            check_Gloria = new System.Windows.Forms.CheckBox();
            lbl_Items = new Label();
            label1 = new Label();
            cmb_Blessings = new ComboBox();
            comboBox1 = new ComboBox();
            comboBox2 = new ComboBox();
            comboBox3 = new ComboBox();
            comboBox4 = new ComboBox();
            comboBox5 = new ComboBox();
            pnl_Stats.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)num_Luk).BeginInit();
            ((System.ComponentModel.ISupportInitialize)num_Dex).BeginInit();
            ((System.ComponentModel.ISupportInitialize)num_Int).BeginInit();
            ((System.ComponentModel.ISupportInitialize)num_Vit).BeginInit();
            ((System.ComponentModel.ISupportInitialize)num_Agi).BeginInit();
            ((System.ComponentModel.ISupportInitialize)num_Str).BeginInit();
            pnl_Buffs.SuspendLayout();
            SuspendLayout();
            // 
            // lbl_Str
            // 
            lbl_Str.AutoSize = true;
            lbl_Str.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_Str.Location = new Point(23, 58);
            lbl_Str.Name = "lbl_Str";
            lbl_Str.Size = new Size(37, 26);
            lbl_Str.TabIndex = 1;
            lbl_Str.Text = "Str";
            // 
            // lbl_Agi
            // 
            lbl_Agi.AutoSize = true;
            lbl_Agi.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_Agi.Location = new Point(20, 94);
            lbl_Agi.Name = "lbl_Agi";
            lbl_Agi.Size = new Size(42, 26);
            lbl_Agi.TabIndex = 2;
            lbl_Agi.Text = "Agi";
            // 
            // lbl_Vit
            // 
            lbl_Vit.AutoSize = true;
            lbl_Vit.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_Vit.Location = new Point(19, 129);
            lbl_Vit.Name = "lbl_Vit";
            lbl_Vit.Size = new Size(39, 26);
            lbl_Vit.TabIndex = 3;
            lbl_Vit.Text = "Vit";
            // 
            // lbl_Int
            // 
            lbl_Int.AutoSize = true;
            lbl_Int.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_Int.Location = new Point(20, 162);
            lbl_Int.Name = "lbl_Int";
            lbl_Int.Size = new Size(39, 26);
            lbl_Int.TabIndex = 4;
            lbl_Int.Text = "Int";
            // 
            // lbl_Dex
            // 
            lbl_Dex.AutoSize = true;
            lbl_Dex.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_Dex.Location = new Point(19, 197);
            lbl_Dex.Name = "lbl_Dex";
            lbl_Dex.Size = new Size(45, 26);
            lbl_Dex.TabIndex = 5;
            lbl_Dex.Text = "Dex";
            // 
            // lbl_Luk
            // 
            lbl_Luk.AutoSize = true;
            lbl_Luk.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_Luk.Location = new Point(19, 234);
            lbl_Luk.Name = "lbl_Luk";
            lbl_Luk.Size = new Size(46, 26);
            lbl_Luk.TabIndex = 6;
            lbl_Luk.Text = "Luk";
            // 
            // lbl_Stats
            // 
            lbl_Stats.AutoSize = true;
            lbl_Stats.Font = new Font("Sylfaen", 13.8F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_Stats.Location = new Point(66, 11);
            lbl_Stats.Name = "lbl_Stats";
            lbl_Stats.Size = new Size(59, 29);
            lbl_Stats.TabIndex = 12;
            lbl_Stats.Text = "Stats";
            // 
            // lbl_JobBonus
            // 
            lbl_JobBonus.AutoSize = true;
            lbl_JobBonus.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_JobBonus.Location = new Point(155, 13);
            lbl_JobBonus.Name = "lbl_JobBonus";
            lbl_JobBonus.Size = new Size(97, 26);
            lbl_JobBonus.TabIndex = 13;
            lbl_JobBonus.Text = "Job Bonus";
            // 
            // pnl_Stats
            // 
            pnl_Stats.BackColor = SystemColors.ActiveBorder;
            pnl_Stats.Controls.Add(txt_ResStr);
            pnl_Stats.Controls.Add(lbl_Luk);
            pnl_Stats.Controls.Add(lbl_Stats);
            pnl_Stats.Controls.Add(lbl_Dex);
            pnl_Stats.Controls.Add(lbl_JobBonus);
            pnl_Stats.Controls.Add(lbl_Int);
            pnl_Stats.Controls.Add(txt_ResAgi);
            pnl_Stats.Controls.Add(lbl_Vit);
            pnl_Stats.Controls.Add(txt_StatGuild);
            pnl_Stats.Controls.Add(lbl_Agi);
            pnl_Stats.Controls.Add(txt_StatPoint);
            pnl_Stats.Controls.Add(lbl_Str);
            pnl_Stats.Controls.Add(txt_StatFlee2);
            pnl_Stats.Controls.Add(lbl_11);
            pnl_Stats.Controls.Add(txt_StatFlee);
            pnl_Stats.Controls.Add(txt_StatAspd);
            pnl_Stats.Controls.Add(txt_StatMDef2);
            pnl_Stats.Controls.Add(txt_StatDef2);
            pnl_Stats.Controls.Add(lbl_10);
            pnl_Stats.Controls.Add(lbl_9);
            pnl_Stats.Controls.Add(lbl_Guild);
            pnl_Stats.Controls.Add(txt_StatMDef);
            pnl_Stats.Controls.Add(txt_StatDef);
            pnl_Stats.Controls.Add(lbl_Aspd);
            pnl_Stats.Controls.Add(txt_Flee);
            pnl_Stats.Controls.Add(lbl_Mdef);
            pnl_Stats.Controls.Add(lbl_Def);
            pnl_Stats.Controls.Add(txt_StatCrit);
            pnl_Stats.Controls.Add(txt_StatHit);
            pnl_Stats.Controls.Add(num_Luk);
            pnl_Stats.Controls.Add(num_Dex);
            pnl_Stats.Controls.Add(num_Int);
            pnl_Stats.Controls.Add(num_Vit);
            pnl_Stats.Controls.Add(num_Agi);
            pnl_Stats.Controls.Add(num_Str);
            pnl_Stats.Controls.Add(txt_StatMatk2);
            pnl_Stats.Controls.Add(txt_StatAtk2);
            pnl_Stats.Controls.Add(lbl_4);
            pnl_Stats.Controls.Add(lbl_3);
            pnl_Stats.Controls.Add(lbl_8);
            pnl_Stats.Controls.Add(lbl_7);
            pnl_Stats.Controls.Add(txt_StatMatk);
            pnl_Stats.Controls.Add(txt_StatAtk);
            pnl_Stats.Controls.Add(lbl_StatP);
            pnl_Stats.Controls.Add(lbl_Crit);
            pnl_Stats.Controls.Add(lbl_Matk);
            pnl_Stats.Controls.Add(lbl_Hit);
            pnl_Stats.Controls.Add(lbl_Atk);
            pnl_Stats.Controls.Add(lbl_StatInfo);
            pnl_Stats.Controls.Add(txt_PtsDex);
            pnl_Stats.Controls.Add(txt_PtsInt);
            pnl_Stats.Controls.Add(txt_PtsLuk);
            pnl_Stats.Controls.Add(txt_PtsVit);
            pnl_Stats.Controls.Add(txt_PtsAgi);
            pnl_Stats.Controls.Add(txt_PtsStr);
            pnl_Stats.Controls.Add(lbl_PtsReq);
            pnl_Stats.Controls.Add(txt_ResLuk);
            pnl_Stats.Controls.Add(txt_ResDex);
            pnl_Stats.Controls.Add(txt_ResInt);
            pnl_Stats.Controls.Add(txt_ResVit);
            pnl_Stats.Controls.Add(lbl_5);
            pnl_Stats.Controls.Add(lbl_6);
            pnl_Stats.Controls.Add(lbl_2);
            pnl_Stats.Controls.Add(lbl_1);
            pnl_Stats.Location = new Point(30, 281);
            pnl_Stats.Name = "pnl_Stats";
            pnl_Stats.Size = new Size(835, 276);
            pnl_Stats.TabIndex = 14;
            // 
            // txt_ResStr
            // 
            txt_ResStr.Location = new Point(186, 59);
            txt_ResStr.Name = "txt_ResStr";
            txt_ResStr.PlaceholderText = "0";
            txt_ResStr.ReadOnly = true;
            txt_ResStr.Size = new Size(47, 27);
            txt_ResStr.TabIndex = 75;
            txt_ResStr.TextAlign = HorizontalAlignment.Center;
            // 
            // txt_ResAgi
            // 
            txt_ResAgi.Location = new Point(185, 92);
            txt_ResAgi.Name = "txt_ResAgi";
            txt_ResAgi.PlaceholderText = "0";
            txt_ResAgi.ReadOnly = true;
            txt_ResAgi.Size = new Size(47, 27);
            txt_ResAgi.TabIndex = 74;
            txt_ResAgi.TextAlign = HorizontalAlignment.Center;
            // 
            // txt_StatGuild
            // 
            txt_StatGuild.Location = new Point(496, 233);
            txt_StatGuild.Name = "txt_StatGuild";
            txt_StatGuild.ReadOnly = true;
            txt_StatGuild.Size = new Size(125, 27);
            txt_StatGuild.TabIndex = 73;
            txt_StatGuild.TextAlign = HorizontalAlignment.Center;
            // 
            // txt_StatPoint
            // 
            txt_StatPoint.Location = new Point(496, 200);
            txt_StatPoint.Name = "txt_StatPoint";
            txt_StatPoint.PlaceholderText = "0";
            txt_StatPoint.ReadOnly = true;
            txt_StatPoint.Size = new Size(125, 27);
            txt_StatPoint.TabIndex = 72;
            txt_StatPoint.Text = "60";
            txt_StatPoint.TextAlign = HorizontalAlignment.Center;
            // 
            // txt_StatFlee2
            // 
            txt_StatFlee2.Location = new Point(762, 129);
            txt_StatFlee2.Name = "txt_StatFlee2";
            txt_StatFlee2.PlaceholderText = "0";
            txt_StatFlee2.ReadOnly = true;
            txt_StatFlee2.Size = new Size(50, 27);
            txt_StatFlee2.TabIndex = 71;
            txt_StatFlee2.Text = "1";
            txt_StatFlee2.TextAlign = HorizontalAlignment.Center;
            // 
            // lbl_11
            // 
            lbl_11.AutoSize = true;
            lbl_11.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_11.Location = new Point(738, 129);
            lbl_11.Name = "lbl_11";
            lbl_11.Size = new Size(22, 26);
            lbl_11.TabIndex = 70;
            lbl_11.Text = "+";
            // 
            // txt_StatFlee
            // 
            txt_StatFlee.Location = new Point(687, 131);
            txt_StatFlee.Name = "txt_StatFlee";
            txt_StatFlee.PlaceholderText = "0";
            txt_StatFlee.ReadOnly = true;
            txt_StatFlee.Size = new Size(50, 27);
            txt_StatFlee.TabIndex = 69;
            txt_StatFlee.Text = "1";
            txt_StatFlee.TextAlign = HorizontalAlignment.Center;
            // 
            // txt_StatAspd
            // 
            txt_StatAspd.Location = new Point(687, 165);
            txt_StatAspd.Name = "txt_StatAspd";
            txt_StatAspd.PlaceholderText = "0";
            txt_StatAspd.ReadOnly = true;
            txt_StatAspd.Size = new Size(125, 27);
            txt_StatAspd.TabIndex = 68;
            txt_StatAspd.Text = "150";
            txt_StatAspd.TextAlign = HorizontalAlignment.Center;
            // 
            // txt_StatMDef2
            // 
            txt_StatMDef2.Location = new Point(762, 96);
            txt_StatMDef2.Name = "txt_StatMDef2";
            txt_StatMDef2.PlaceholderText = "0";
            txt_StatMDef2.ReadOnly = true;
            txt_StatMDef2.Size = new Size(50, 27);
            txt_StatMDef2.TabIndex = 66;
            txt_StatMDef2.TextAlign = HorizontalAlignment.Center;
            // 
            // txt_StatDef2
            // 
            txt_StatDef2.Location = new Point(762, 59);
            txt_StatDef2.Name = "txt_StatDef2";
            txt_StatDef2.PlaceholderText = "0";
            txt_StatDef2.ReadOnly = true;
            txt_StatDef2.Size = new Size(50, 27);
            txt_StatDef2.TabIndex = 65;
            txt_StatDef2.TextAlign = HorizontalAlignment.Center;
            // 
            // lbl_10
            // 
            lbl_10.AutoSize = true;
            lbl_10.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_10.Location = new Point(738, 95);
            lbl_10.Name = "lbl_10";
            lbl_10.Size = new Size(22, 26);
            lbl_10.TabIndex = 64;
            lbl_10.Text = "+";
            // 
            // lbl_9
            // 
            lbl_9.AutoSize = true;
            lbl_9.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_9.Location = new Point(739, 55);
            lbl_9.Name = "lbl_9";
            lbl_9.Size = new Size(22, 26);
            lbl_9.TabIndex = 63;
            lbl_9.Text = "+";
            // 
            // lbl_Guild
            // 
            lbl_Guild.AutoSize = true;
            lbl_Guild.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_Guild.Location = new Point(381, 230);
            lbl_Guild.Name = "lbl_Guild";
            lbl_Guild.Size = new Size(61, 26);
            lbl_Guild.TabIndex = 41;
            lbl_Guild.Text = "Guild";
            lbl_Guild.Click += lbl_Guild_Click;
            // 
            // txt_StatMDef
            // 
            txt_StatMDef.Location = new Point(687, 95);
            txt_StatMDef.Name = "txt_StatMDef";
            txt_StatMDef.PlaceholderText = "0";
            txt_StatMDef.ReadOnly = true;
            txt_StatMDef.Size = new Size(50, 27);
            txt_StatMDef.TabIndex = 62;
            txt_StatMDef.TextAlign = HorizontalAlignment.Center;
            // 
            // txt_StatDef
            // 
            txt_StatDef.Location = new Point(687, 59);
            txt_StatDef.Name = "txt_StatDef";
            txt_StatDef.PlaceholderText = "0";
            txt_StatDef.ReadOnly = true;
            txt_StatDef.Size = new Size(50, 27);
            txt_StatDef.TabIndex = 61;
            txt_StatDef.TextAlign = HorizontalAlignment.Center;
            // 
            // lbl_Aspd
            // 
            lbl_Aspd.AutoSize = true;
            lbl_Aspd.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_Aspd.Location = new Point(631, 165);
            lbl_Aspd.Name = "lbl_Aspd";
            lbl_Aspd.Size = new Size(55, 26);
            lbl_Aspd.TabIndex = 60;
            lbl_Aspd.Text = "Aspd";
            // 
            // txt_Flee
            // 
            txt_Flee.AutoSize = true;
            txt_Flee.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            txt_Flee.Location = new Point(631, 132);
            txt_Flee.Name = "txt_Flee";
            txt_Flee.Size = new Size(47, 26);
            txt_Flee.TabIndex = 59;
            txt_Flee.Text = "Flee";
            // 
            // lbl_Mdef
            // 
            lbl_Mdef.AutoSize = true;
            lbl_Mdef.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_Mdef.Location = new Point(630, 97);
            lbl_Mdef.Name = "lbl_Mdef";
            lbl_Mdef.Size = new Size(56, 26);
            lbl_Mdef.TabIndex = 58;
            lbl_Mdef.Text = "Mdef";
            // 
            // lbl_Def
            // 
            lbl_Def.AutoSize = true;
            lbl_Def.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_Def.Location = new Point(630, 60);
            lbl_Def.Name = "lbl_Def";
            lbl_Def.Size = new Size(41, 26);
            lbl_Def.TabIndex = 57;
            lbl_Def.Text = "Def";
            // 
            // txt_StatCrit
            // 
            txt_StatCrit.Location = new Point(496, 167);
            txt_StatCrit.Name = "txt_StatCrit";
            txt_StatCrit.PlaceholderText = "0";
            txt_StatCrit.ReadOnly = true;
            txt_StatCrit.Size = new Size(125, 27);
            txt_StatCrit.TabIndex = 56;
            txt_StatCrit.Text = "1";
            txt_StatCrit.TextAlign = HorizontalAlignment.Center;
            // 
            // txt_StatHit
            // 
            txt_StatHit.Location = new Point(496, 132);
            txt_StatHit.Name = "txt_StatHit";
            txt_StatHit.PlaceholderText = "0";
            txt_StatHit.ReadOnly = true;
            txt_StatHit.Size = new Size(125, 27);
            txt_StatHit.TabIndex = 55;
            txt_StatHit.Text = "1";
            txt_StatHit.TextAlign = HorizontalAlignment.Center;
            // 
            // num_Luk
            // 
            num_Luk.Location = new Point(67, 235);
            num_Luk.Margin = new Padding(3, 4, 3, 4);
            num_Luk.Name = "num_Luk";
            num_Luk.Size = new Size(61, 27);
            num_Luk.TabIndex = 51;
            // 
            // num_Dex
            // 
            num_Dex.Location = new Point(67, 199);
            num_Dex.Margin = new Padding(3, 4, 3, 4);
            num_Dex.Name = "num_Dex";
            num_Dex.Size = new Size(61, 27);
            num_Dex.TabIndex = 54;
            // 
            // num_Int
            // 
            num_Int.Location = new Point(67, 164);
            num_Int.Margin = new Padding(3, 4, 3, 4);
            num_Int.Name = "num_Int";
            num_Int.Size = new Size(61, 27);
            num_Int.TabIndex = 53;
            // 
            // num_Vit
            // 
            num_Vit.Location = new Point(67, 129);
            num_Vit.Margin = new Padding(3, 4, 3, 4);
            num_Vit.Name = "num_Vit";
            num_Vit.Size = new Size(61, 27);
            num_Vit.TabIndex = 52;
            // 
            // num_Agi
            // 
            num_Agi.Location = new Point(67, 93);
            num_Agi.Margin = new Padding(3, 4, 3, 4);
            num_Agi.Name = "num_Agi";
            num_Agi.Size = new Size(61, 27);
            num_Agi.TabIndex = 51;
            // 
            // num_Str
            // 
            num_Str.Location = new Point(67, 57);
            num_Str.Margin = new Padding(3, 4, 3, 4);
            num_Str.Name = "num_Str";
            num_Str.Size = new Size(61, 27);
            num_Str.TabIndex = 50;
            // 
            // txt_StatMatk2
            // 
            txt_StatMatk2.Location = new Point(571, 96);
            txt_StatMatk2.Name = "txt_StatMatk2";
            txt_StatMatk2.PlaceholderText = "0";
            txt_StatMatk2.ReadOnly = true;
            txt_StatMatk2.Size = new Size(50, 27);
            txt_StatMatk2.TabIndex = 49;
            txt_StatMatk2.TextAlign = HorizontalAlignment.Center;
            // 
            // txt_StatAtk2
            // 
            txt_StatAtk2.Location = new Point(571, 59);
            txt_StatAtk2.Name = "txt_StatAtk2";
            txt_StatAtk2.PlaceholderText = "0";
            txt_StatAtk2.ReadOnly = true;
            txt_StatAtk2.Size = new Size(50, 27);
            txt_StatAtk2.TabIndex = 48;
            txt_StatAtk2.TextAlign = HorizontalAlignment.Center;
            // 
            // lbl_4
            // 
            lbl_4.AutoSize = true;
            lbl_4.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_4.Location = new Point(158, 163);
            lbl_4.Name = "lbl_4";
            lbl_4.Size = new Size(22, 26);
            lbl_4.TabIndex = 47;
            lbl_4.Text = "+";
            lbl_4.Click += lbl_4_Click;
            // 
            // lbl_3
            // 
            lbl_3.AutoSize = true;
            lbl_3.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_3.Location = new Point(158, 128);
            lbl_3.Name = "lbl_3";
            lbl_3.Size = new Size(22, 26);
            lbl_3.TabIndex = 46;
            lbl_3.Text = "+";
            // 
            // lbl_8
            // 
            lbl_8.AutoSize = true;
            lbl_8.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_8.Location = new Point(549, 103);
            lbl_8.Name = "lbl_8";
            lbl_8.Size = new Size(22, 26);
            lbl_8.TabIndex = 45;
            lbl_8.Text = "~";
            // 
            // lbl_7
            // 
            lbl_7.AutoSize = true;
            lbl_7.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_7.Location = new Point(549, 55);
            lbl_7.Name = "lbl_7";
            lbl_7.Size = new Size(22, 26);
            lbl_7.TabIndex = 44;
            lbl_7.Text = "+";
            // 
            // txt_StatMatk
            // 
            txt_StatMatk.Location = new Point(496, 97);
            txt_StatMatk.Name = "txt_StatMatk";
            txt_StatMatk.PlaceholderText = "0";
            txt_StatMatk.ReadOnly = true;
            txt_StatMatk.Size = new Size(50, 27);
            txt_StatMatk.TabIndex = 43;
            txt_StatMatk.TextAlign = HorizontalAlignment.Center;
            // 
            // txt_StatAtk
            // 
            txt_StatAtk.Location = new Point(496, 59);
            txt_StatAtk.Name = "txt_StatAtk";
            txt_StatAtk.PlaceholderText = "0";
            txt_StatAtk.ReadOnly = true;
            txt_StatAtk.Size = new Size(50, 27);
            txt_StatAtk.TabIndex = 42;
            txt_StatAtk.TextAlign = HorizontalAlignment.Center;
            // 
            // lbl_StatP
            // 
            lbl_StatP.AutoSize = true;
            lbl_StatP.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_StatP.Location = new Point(383, 198);
            lbl_StatP.Name = "lbl_StatP";
            lbl_StatP.Size = new Size(117, 26);
            lbl_StatP.TabIndex = 40;
            lbl_StatP.Text = "Status Point";
            // 
            // lbl_Crit
            // 
            lbl_Crit.AutoSize = true;
            lbl_Crit.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_Crit.Location = new Point(383, 167);
            lbl_Crit.Name = "lbl_Crit";
            lbl_Crit.Size = new Size(77, 26);
            lbl_Crit.TabIndex = 39;
            lbl_Crit.Text = "Critical";
            // 
            // lbl_Matk
            // 
            lbl_Matk.AutoSize = true;
            lbl_Matk.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_Matk.Location = new Point(384, 97);
            lbl_Matk.Name = "lbl_Matk";
            lbl_Matk.Size = new Size(58, 26);
            lbl_Matk.TabIndex = 38;
            lbl_Matk.Text = "Matk";
            // 
            // lbl_Hit
            // 
            lbl_Hit.AutoSize = true;
            lbl_Hit.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_Hit.Location = new Point(384, 132);
            lbl_Hit.Name = "lbl_Hit";
            lbl_Hit.Size = new Size(41, 26);
            lbl_Hit.TabIndex = 36;
            lbl_Hit.Text = "Hit";
            // 
            // lbl_Atk
            // 
            lbl_Atk.AutoSize = true;
            lbl_Atk.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_Atk.Location = new Point(385, 60);
            lbl_Atk.Name = "lbl_Atk";
            lbl_Atk.Size = new Size(44, 26);
            lbl_Atk.TabIndex = 15;
            lbl_Atk.Text = "Atk";
            // 
            // lbl_StatInfo
            // 
            lbl_StatInfo.AutoSize = true;
            lbl_StatInfo.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_StatInfo.Location = new Point(527, 16);
            lbl_StatInfo.Name = "lbl_StatInfo";
            lbl_StatInfo.Size = new Size(177, 26);
            lbl_StatInfo.TabIndex = 34;
            lbl_StatInfo.Text = "Status Information";
            // 
            // txt_PtsDex
            // 
            txt_PtsDex.Location = new Point(261, 196);
            txt_PtsDex.Name = "txt_PtsDex";
            txt_PtsDex.PlaceholderText = "0";
            txt_PtsDex.ReadOnly = true;
            txt_PtsDex.Size = new Size(60, 27);
            txt_PtsDex.TabIndex = 33;
            txt_PtsDex.Text = "1";
            txt_PtsDex.TextAlign = HorizontalAlignment.Center;
            // 
            // txt_PtsInt
            // 
            txt_PtsInt.Location = new Point(261, 163);
            txt_PtsInt.Name = "txt_PtsInt";
            txt_PtsInt.PlaceholderText = "0";
            txt_PtsInt.ReadOnly = true;
            txt_PtsInt.Size = new Size(60, 27);
            txt_PtsInt.TabIndex = 32;
            txt_PtsInt.Text = "1";
            txt_PtsInt.TextAlign = HorizontalAlignment.Center;
            // 
            // txt_PtsLuk
            // 
            txt_PtsLuk.Location = new Point(261, 229);
            txt_PtsLuk.Name = "txt_PtsLuk";
            txt_PtsLuk.PlaceholderText = "0";
            txt_PtsLuk.ReadOnly = true;
            txt_PtsLuk.Size = new Size(60, 27);
            txt_PtsLuk.TabIndex = 31;
            txt_PtsLuk.Text = "1";
            txt_PtsLuk.TextAlign = HorizontalAlignment.Center;
            // 
            // txt_PtsVit
            // 
            txt_PtsVit.Location = new Point(261, 131);
            txt_PtsVit.Name = "txt_PtsVit";
            txt_PtsVit.PlaceholderText = "0";
            txt_PtsVit.ReadOnly = true;
            txt_PtsVit.Size = new Size(60, 27);
            txt_PtsVit.TabIndex = 28;
            txt_PtsVit.Text = "1";
            txt_PtsVit.TextAlign = HorizontalAlignment.Center;
            // 
            // txt_PtsAgi
            // 
            txt_PtsAgi.Location = new Point(261, 93);
            txt_PtsAgi.Name = "txt_PtsAgi";
            txt_PtsAgi.PlaceholderText = "0";
            txt_PtsAgi.ReadOnly = true;
            txt_PtsAgi.Size = new Size(60, 27);
            txt_PtsAgi.TabIndex = 27;
            txt_PtsAgi.Text = "1";
            txt_PtsAgi.TextAlign = HorizontalAlignment.Center;
            // 
            // txt_PtsStr
            // 
            txt_PtsStr.Location = new Point(261, 59);
            txt_PtsStr.Name = "txt_PtsStr";
            txt_PtsStr.PlaceholderText = "0";
            txt_PtsStr.ReadOnly = true;
            txt_PtsStr.Size = new Size(60, 27);
            txt_PtsStr.TabIndex = 26;
            txt_PtsStr.Text = "1";
            txt_PtsStr.TextAlign = HorizontalAlignment.Center;
            // 
            // lbl_PtsReq
            // 
            lbl_PtsReq.AutoSize = true;
            lbl_PtsReq.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_PtsReq.Location = new Point(259, 13);
            lbl_PtsReq.Name = "lbl_PtsReq";
            lbl_PtsReq.Size = new Size(81, 26);
            lbl_PtsReq.TabIndex = 15;
            lbl_PtsReq.Text = "Pts Req.";
            // 
            // txt_ResLuk
            // 
            txt_ResLuk.Location = new Point(185, 229);
            txt_ResLuk.Name = "txt_ResLuk";
            txt_ResLuk.PlaceholderText = "0";
            txt_ResLuk.ReadOnly = true;
            txt_ResLuk.Size = new Size(47, 27);
            txt_ResLuk.TabIndex = 25;
            txt_ResLuk.TextAlign = HorizontalAlignment.Center;
            // 
            // txt_ResDex
            // 
            txt_ResDex.Location = new Point(185, 196);
            txt_ResDex.Name = "txt_ResDex";
            txt_ResDex.PlaceholderText = "0";
            txt_ResDex.ReadOnly = true;
            txt_ResDex.Size = new Size(47, 27);
            txt_ResDex.TabIndex = 24;
            txt_ResDex.TextAlign = HorizontalAlignment.Center;
            // 
            // txt_ResInt
            // 
            txt_ResInt.Location = new Point(185, 163);
            txt_ResInt.Name = "txt_ResInt";
            txt_ResInt.PlaceholderText = "0";
            txt_ResInt.ReadOnly = true;
            txt_ResInt.Size = new Size(47, 27);
            txt_ResInt.TabIndex = 23;
            txt_ResInt.TextAlign = HorizontalAlignment.Center;
            // 
            // txt_ResVit
            // 
            txt_ResVit.Location = new Point(185, 131);
            txt_ResVit.Name = "txt_ResVit";
            txt_ResVit.PlaceholderText = "0";
            txt_ResVit.ReadOnly = true;
            txt_ResVit.Size = new Size(47, 27);
            txt_ResVit.TabIndex = 22;
            txt_ResVit.TextAlign = HorizontalAlignment.Center;
            // 
            // lbl_5
            // 
            lbl_5.AutoSize = true;
            lbl_5.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_5.Location = new Point(158, 193);
            lbl_5.Name = "lbl_5";
            lbl_5.Size = new Size(22, 26);
            lbl_5.TabIndex = 20;
            lbl_5.Text = "+";
            // 
            // lbl_6
            // 
            lbl_6.AutoSize = true;
            lbl_6.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_6.Location = new Point(157, 227);
            lbl_6.Name = "lbl_6";
            lbl_6.Size = new Size(22, 26);
            lbl_6.TabIndex = 19;
            lbl_6.Text = "+";
            // 
            // lbl_2
            // 
            lbl_2.AutoSize = true;
            lbl_2.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_2.Location = new Point(158, 89);
            lbl_2.Name = "lbl_2";
            lbl_2.Size = new Size(22, 26);
            lbl_2.TabIndex = 16;
            lbl_2.Text = "+";
            // 
            // lbl_1
            // 
            lbl_1.AutoSize = true;
            lbl_1.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_1.Location = new Point(158, 53);
            lbl_1.Name = "lbl_1";
            lbl_1.Size = new Size(22, 26);
            lbl_1.TabIndex = 15;
            lbl_1.Text = "+";
            // 
            // pnl_Buffs
            // 
            pnl_Buffs.BackColor = SystemColors.ActiveBorder;
            pnl_Buffs.Controls.Add(comboBox5);
            pnl_Buffs.Controls.Add(comboBox4);
            pnl_Buffs.Controls.Add(comboBox3);
            pnl_Buffs.Controls.Add(comboBox2);
            pnl_Buffs.Controls.Add(comboBox1);
            pnl_Buffs.Controls.Add(cmb_Blessings);
            pnl_Buffs.Controls.Add(label1);
            pnl_Buffs.Controls.Add(lbl_Items);
            pnl_Buffs.Controls.Add(check_Gloria);
            pnl_Buffs.Controls.Add(lbl_Gloria);
            pnl_Buffs.Controls.Add(lbl_Wind);
            pnl_Buffs.Controls.Add(lbl_Impo);
            pnl_Buffs.Controls.Add(lbl_Angelus);
            pnl_Buffs.Controls.Add(lbl_Increase);
            pnl_Buffs.Controls.Add(lbl_Blessings);
            pnl_Buffs.Controls.Add(lbl_Buffs);
            pnl_Buffs.Location = new Point(31, 160);
            pnl_Buffs.Margin = new Padding(3, 4, 3, 4);
            pnl_Buffs.Name = "pnl_Buffs";
            pnl_Buffs.Size = new Size(1003, 94);
            pnl_Buffs.TabIndex = 15;
            // 
            // lbl_Buffs
            // 
            lbl_Buffs.AutoSize = true;
            lbl_Buffs.Font = new Font("Sylfaen", 12F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lbl_Buffs.Location = new Point(4, 4);
            lbl_Buffs.Name = "lbl_Buffs";
            lbl_Buffs.Size = new Size(60, 26);
            lbl_Buffs.TabIndex = 76;
            lbl_Buffs.Text = "Buffs";
            lbl_Buffs.TextAlign = ContentAlignment.MiddleLeft;
            // 
            // lbl_Blessings
            // 
            lbl_Blessings.AutoSize = true;
            lbl_Blessings.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_Blessings.Location = new Point(4, 34);
            lbl_Blessings.Name = "lbl_Blessings";
            lbl_Blessings.Size = new Size(93, 26);
            lbl_Blessings.TabIndex = 77;
            lbl_Blessings.Text = "Blessings:";
            lbl_Blessings.TextAlign = ContentAlignment.MiddleLeft;
            // 
            // lbl_Increase
            // 
            lbl_Increase.AutoSize = true;
            lbl_Increase.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_Increase.Location = new Point(119, 34);
            lbl_Increase.Name = "lbl_Increase";
            lbl_Increase.Size = new Size(124, 26);
            lbl_Increase.TabIndex = 78;
            lbl_Increase.Text = "Increase Agi:";
            lbl_Increase.TextAlign = ContentAlignment.MiddleLeft;
            // 
            // lbl_Angelus
            // 
            lbl_Angelus.AutoSize = true;
            lbl_Angelus.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_Angelus.Location = new Point(262, 34);
            lbl_Angelus.Name = "lbl_Angelus";
            lbl_Angelus.Size = new Size(87, 26);
            lbl_Angelus.TabIndex = 79;
            lbl_Angelus.Text = "Angelus:";
            lbl_Angelus.TextAlign = ContentAlignment.MiddleLeft;
            // 
            // lbl_Impo
            // 
            lbl_Impo.AutoSize = true;
            lbl_Impo.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_Impo.Location = new Point(382, 34);
            lbl_Impo.Name = "lbl_Impo";
            lbl_Impo.Size = new Size(164, 26);
            lbl_Impo.TabIndex = 80;
            lbl_Impo.Text = "Impositio Manus:";
            lbl_Impo.TextAlign = ContentAlignment.MiddleLeft;
            // 
            // lbl_Wind
            // 
            lbl_Wind.AutoSize = true;
            lbl_Wind.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_Wind.Location = new Point(572, 34);
            lbl_Wind.Name = "lbl_Wind";
            lbl_Wind.Size = new Size(115, 26);
            lbl_Wind.TabIndex = 81;
            lbl_Wind.Text = "Wind Walk";
            lbl_Wind.TextAlign = ContentAlignment.MiddleLeft;
            // 
            // lbl_Gloria
            // 
            lbl_Gloria.AutoSize = true;
            lbl_Gloria.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lbl_Gloria.Location = new Point(721, 34);
            lbl_Gloria.Name = "lbl_Gloria";
            lbl_Gloria.Size = new Size(74, 26);
            lbl_Gloria.TabIndex = 82;
            lbl_Gloria.Text = "Gloria?";
            lbl_Gloria.TextAlign = ContentAlignment.MiddleLeft;
            // 
            // check_Gloria
            // 
            check_Gloria.AutoSize = true;
            check_Gloria.Location = new Point(746, 60);
            check_Gloria.Name = "check_Gloria";
            check_Gloria.Size = new Size(31, 24);
            check_Gloria.TabIndex = 83;
            check_Gloria.Text = "\r\n";
            check_Gloria.UseVisualStyleBackColor = true;
            // 
            // lbl_Items
            // 
            lbl_Items.AutoSize = true;
            lbl_Items.Font = new Font("Sylfaen", 12F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lbl_Items.Location = new Point(842, 9);
            lbl_Items.Name = "lbl_Items";
            lbl_Items.Size = new Size(72, 26);
            lbl_Items.TabIndex = 84;
            lbl_Items.Text = "Items:";
            lbl_Items.TextAlign = ContentAlignment.MiddleLeft;
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Font = new Font("Sylfaen", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            label1.Location = new Point(843, 35);
            label1.Name = "label1";
            label1.Size = new Size(142, 26);
            label1.TabIndex = 85;
            label1.Text = "Speed Position:";
            label1.TextAlign = ContentAlignment.MiddleLeft;
            // 
            // cmb_Blessings
            // 
            cmb_Blessings.FormattingEnabled = true;
            cmb_Blessings.Location = new Point(7, 60);
            cmb_Blessings.Name = "cmb_Blessings";
            cmb_Blessings.RightToLeft = RightToLeft.No;
            cmb_Blessings.Size = new Size(90, 28);
            cmb_Blessings.TabIndex = 86;
            cmb_Blessings.Text = "    Level ";
            // 
            // comboBox1
            // 
            comboBox1.FormattingEnabled = true;
            comboBox1.Location = new Point(266, 60);
            comboBox1.Name = "comboBox1";
            comboBox1.Size = new Size(90, 28);
            comboBox1.TabIndex = 87;
            comboBox1.Text = "    Level ";
            // 
            // comboBox2
            // 
            comboBox2.FormattingEnabled = true;
            comboBox2.Location = new Point(124, 61);
            comboBox2.Name = "comboBox2";
            comboBox2.RightToLeft = RightToLeft.No;
            comboBox2.Size = new Size(90, 28);
            comboBox2.TabIndex = 88;
            comboBox2.Text = "    Level ";
            // 
            // comboBox3
            // 
            comboBox3.FormattingEnabled = true;
            comboBox3.Location = new Point(388, 59);
            comboBox3.Name = "comboBox3";
            comboBox3.Size = new Size(90, 28);
            comboBox3.TabIndex = 87;
            comboBox3.Text = "    Level ";
            // 
            // comboBox4
            // 
            comboBox4.FormattingEnabled = true;
            comboBox4.Location = new Point(579, 59);
            comboBox4.Name = "comboBox4";
            comboBox4.Size = new Size(90, 28);
            comboBox4.TabIndex = 89;
            comboBox4.Text = "    Level ";
            // 
            // comboBox5
            // 
            comboBox5.FormattingEnabled = true;
            comboBox5.Location = new Point(849, 59);
            comboBox5.Name = "comboBox5";
            comboBox5.Size = new Size(136, 28);
            comboBox5.TabIndex = 90;
            comboBox5.Text = "   Position Type ";
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            BackColor = SystemColors.Control;
            ClientSize = new Size(1171, 756);
            Controls.Add(pnl_Buffs);
            Controls.Add(pnl_Stats);
            Margin = new Padding(3, 4, 3, 4);
            Name = "Form1";
            Padding = new Padding(3, 85, 3, 4);
            Text = "Ragnarok";
            Load += Form1_Load;
            pnl_Stats.ResumeLayout(false);
            pnl_Stats.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)num_Luk).EndInit();
            ((System.ComponentModel.ISupportInitialize)num_Dex).EndInit();
            ((System.ComponentModel.ISupportInitialize)num_Int).EndInit();
            ((System.ComponentModel.ISupportInitialize)num_Vit).EndInit();
            ((System.ComponentModel.ISupportInitialize)num_Agi).EndInit();
            ((System.ComponentModel.ISupportInitialize)num_Str).EndInit();
            pnl_Buffs.ResumeLayout(false);
            pnl_Buffs.PerformLayout();
            ResumeLayout(false);
        }

        private void Form1_Load(object sender, EventArgs e)
        {
        }

        private void lbl_Guild_Click(object sender, EventArgs e)
        {
            throw new NotImplementedException();
        }

        private void lbl_4_Click(object sender, EventArgs e)
        {
            throw new NotImplementedException();
        }

        #endregion
        private Label lbl_Str;
        private Label lbl_Agi;
        private Label lbl_Vit;
        private Label lbl_Int;
        private Label lbl_Dex;
        private Label lbl_Luk;
        private Label lbl_Stats;
        private Label lbl_JobBonus;
        private Label lbl_Mdef;
        private Label lbl_PtsReq;
        private Label lbl_StatInfo;
        private Label lbl_Atk;
        private Label lbl_Hit;
        private Label lbl_Guild;
        private Label lbl_StatP;
        private Label lbl_Crit;
        private Label lbl_Matk;
        private Label lbl_Def;
        private Label lbl_Aspd;
        private Label txt_Flee;
        private Label lbl_1;
        private Label lbl_2;
        private Label lbl_3;
        private Label lbl_4;
        private Label lbl_5;
        private Label lbl_6;
        private Label lbl_7;
        private Label lbl_8;
        private Label lbl_9;
        private Label lbl_10;
        private Label lbl_11;
        private System.Windows.Forms.Panel pnl_Stats;
        private TextBox txt_ResLuk;
        private TextBox txt_ResDex;
        private TextBox txt_ResInt;
        private TextBox txt_ResVit;
        private TextBox txt_PtsLuk;
        private TextBox txt_StatMDef;
        private TextBox txt_StatDef2;
        private TextBox txt_PtsVit;
        private TextBox txt_PtsAgi;
        private TextBox txt_PtsStr;
        private TextBox txt_PtsInt;
        private TextBox txt_PtsDex;
        private TextBox txt_StatMatk;
        private TextBox txt_StatAtk;
        private TextBox txt_StatAtk2;
        private TextBox txt_StatMatk2;
        private TextBox txt_StatCrit;
        private TextBox txt_StatAspd;
        private TextBox txt_StatMDef2;
        private TextBox txt_StatHit;
        private TextBox txt_StatFlee2;
        private TextBox txt_StatDef;
        private TextBox txt_StatFlee;
        private TextBox txt_StatGuild;
        private TextBox txt_StatPoint;
        private NumericUpDown num_Luk;
        private NumericUpDown num_Dex;
        private NumericUpDown num_Int;
        private NumericUpDown num_Vit;
        private NumericUpDown num_Agi;
        private NumericUpDown num_Str;
        private System.Windows.Forms.Panel pnl_Buffs;
        private TextBox txt_ResStr;
        private TextBox txt_ResAgi;
        private Label lbl_Buffs;
        private Label lbl_Increase;
        private Label lbl_Blessings;
        private ComboBox comboBox5;
        private ComboBox comboBox4;
        private ComboBox comboBox3;
        private ComboBox comboBox2;
        private ComboBox comboBox1;
        private ComboBox cmb_Blessings;
        private Label label1;
        private Label lbl_Items;
        private System.Windows.Forms.CheckBox check_Gloria;
        private Label lbl_Gloria;
        private Label lbl_Wind;
        private Label lbl_Impo;
        private Label lbl_Angelus;
    }
}
