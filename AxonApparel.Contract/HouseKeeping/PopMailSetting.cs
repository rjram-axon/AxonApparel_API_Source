using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PopMailSetting
    {
        public Nullable<int> Userid { get; set; }
        public string ToEmailID { get; set; }
        public string CcEmailID { get; set; }
        public string AllowMailing { get; set; }
        public string AllowUserPopupSettings { get; set; }
        public string AllowUserMailSettings { get; set; }
        public string AccountName { get; set; }
        public string EMailPassword { get; set; }
        public string FromEmailID { get; set; }
        public string FromDisplayName { get; set; }
        public Nullable<int> EmailValidation { get; set; }
        public Nullable<int> EncodeType { get; set; }
        public string SMTPHost { get; set; }
        public Nullable<int> SMTPPort { get; set; }
        public string POP3Host { get; set; }
        public Nullable<int> POP3Port { get; set; }
        public Nullable<int> SMTPHostValidation { get; set; }
        public string UseAuthentication { get; set; }
        public string UsePOPAuthentication { get; set; }
        public Nullable<int> AsHtml { get; set; }
        public Nullable<int> ConnectTimeout { get; set; }
        public Nullable<int> MessageTimeout { get; set; }
        public Nullable<int> ConnectRetry { get; set; }
        public Nullable<int> MaxRecipients { get; set; }
        public int settingid { get; set; }

    }
}
