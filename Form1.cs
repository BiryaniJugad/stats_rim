using Microsoft.Web.WebView2.Core;
using System.IO;

namespace stats_rim
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        // KINI RA DAPAT ANG NAA:
        private async void Form1_Load(object sender, EventArgs e)
        {
            await webView1.EnsureCoreWebView2Async(null);
            string htmlPath = Path.Combine(Application.StartupPath, "UI", "index.html");
            if (File.Exists(htmlPath))
            {
                webView1.CoreWebView2.Navigate(htmlPath);
            }
            else
            {
                MessageBox.Show("File not found: " + htmlPath);
            }
        }
    }
}