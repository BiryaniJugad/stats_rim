
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
            webView1 = new Microsoft.Web.WebView2.WinForms.WebView2();
            ((System.ComponentModel.ISupportInitialize)webView1).BeginInit();
            SuspendLayout();
            // 
            // webView1
            // 
            webView1.AllowExternalDrop = true;
            webView1.CreationProperties = null;
            webView1.DefaultBackgroundColor = Color.White;
            webView1.Dock = DockStyle.Fill;
            webView1.Location = new Point(0, 0);
            webView1.Name = "webView1";
            webView1.Size = new Size(982, 653);
            webView1.TabIndex = 16;
            webView1.ZoomFactor = 1D;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            BackColor = SystemColors.Control;
            ClientSize = new Size(982, 653);
            Controls.Add(webView1);
            Margin = new Padding(3, 4, 3, 4);
            Name = "Form1";
            Text = "Ragnarok";
            WindowState = FormWindowState.Maximized;
            Load += Form1_Load;
            ((System.ComponentModel.ISupportInitialize)webView1).EndInit();
            ResumeLayout(false);
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
        private Microsoft.Web.WebView2.WinForms.WebView2 webView1;
    }
}
